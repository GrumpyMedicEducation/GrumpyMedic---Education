-- OEMS secure course functions
-- GrumpyMedic Education
-- Do not run in production until reviewed

create or replace function public.enroll_in_course(
  requested_course_slug text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid;
  selected_course_id uuid;
  enrollment_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  select id
  into selected_course_id
  from public.training_courses
  where slug = requested_course_slug
    and status = 'published';

  if selected_course_id is null then
    raise exception 'Course not found or not published';
  end if;

  insert into public.course_enrollments (
    user_id,
    course_id,
    status
  )
  values (
    current_user_id,
    selected_course_id,
    'enrolled'
  )
  on conflict (user_id, course_id)
  do update set
    updated_at = now()
  returning id into enrollment_id;

  return enrollment_id;
end;
$$;

revoke all on function public.enroll_in_course(text) from public;
grant execute on function public.enroll_in_course(text) to authenticated;


create or replace function public.start_course_session(
  requested_enrollment_id uuid,
  requested_user_agent text default null
)
returns table (
  session_id uuid,
  session_token uuid
)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid;
  new_session_id uuid;
  new_session_token uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  if not exists (
    select 1
    from public.course_enrollments
    where id = requested_enrollment_id
      and user_id = current_user_id
  ) then
    raise exception 'Enrollment not found';
  end if;

  update public.course_sessions
  set
    is_active = false,
    ended_at = coalesce(ended_at, now())
  where enrollment_id = requested_enrollment_id
    and is_active = true;

  insert into public.course_sessions (
    enrollment_id,
    user_agent
  )
  values (
    requested_enrollment_id,
    requested_user_agent
  )
  returning
    id,
    course_sessions.session_token
  into
    new_session_id,
    new_session_token;

  update public.course_enrollments
  set
    status = case
      when status = 'enrolled' then 'in_progress'
      else status
    end,
    started_at = coalesce(started_at, now()),
    updated_at = now()
  where id = requested_enrollment_id;

  insert into public.engagement_events (
    enrollment_id,
    session_id,
    event_type
  )
  values (
    requested_enrollment_id,
    new_session_id,
    'course_session_started'
  );

  return query
  select new_session_id, new_session_token;
end;
$$;

revoke all on function public.start_course_session(uuid, text) from public;
grant execute on function public.start_course_session(uuid, text) to authenticated;