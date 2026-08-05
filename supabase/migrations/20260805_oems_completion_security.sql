-- OEMS completion, attestation, and certificate security
-- GrumpyMedic Education
-- Do not run in production until reviewed

create or replace function public.submit_course_attestation(
  requested_enrollment_id uuid,
  requested_student_name text,
  requested_emt_number text,
  requested_attestation_text text,
  requested_user_agent text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid;
  new_attestation_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  if length(trim(requested_student_name)) < 3 then
    raise exception 'Student name is required';
  end if;

  if length(trim(requested_emt_number)) < 3 then
    raise exception 'EMT number is required';
  end if;

  if length(trim(requested_attestation_text)) < 20 then
    raise exception 'Attestation text is required';
  end if;

  if not exists (
    select 1
    from public.course_enrollments
    where id = requested_enrollment_id
      and user_id = current_user_id
  ) then
    raise exception 'Enrollment not found';
  end if;

  insert into public.course_attestations (
    enrollment_id,
    student_name,
    emt_number,
    attestation_text,
    accepted,
    user_agent
  )
  values (
    requested_enrollment_id,
    trim(requested_student_name),
    trim(requested_emt_number),
    requested_attestation_text,
    true,
    requested_user_agent
  )
  on conflict (enrollment_id)
  do update set
    student_name = excluded.student_name,
    emt_number = excluded.emt_number,
    attestation_text = excluded.attestation_text,
    accepted = true,
    user_agent = excluded.user_agent,
    signed_at = now()
  returning id into new_attestation_id;

  insert into public.engagement_events (
    enrollment_id,
    event_type
  )
  values (
    requested_enrollment_id,
    'attestation_submitted'
  );

  return new_attestation_id;
end;
$$;

revoke all on function public.submit_course_attestation(
  uuid,
  text,
  text,
  text,
  text
) from public;

grant execute on function public.submit_course_attestation(
  uuid,
  text,
  text,
  text,
  text
) to authenticated;


create or replace function public.verify_course_completion(
  requested_enrollment_id uuid
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid;
  required_active_seconds integer;
  recorded_active_seconds integer;
  has_passing_exam boolean;
  has_attestation boolean;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  select
    course.minimum_active_minutes * 60,
    enrollment.total_active_seconds
  into
    required_active_seconds,
    recorded_active_seconds
  from public.course_enrollments enrollment
  join public.training_courses course
    on course.id = enrollment.course_id
  where enrollment.id = requested_enrollment_id
    and enrollment.user_id = current_user_id;

  if required_active_seconds is null then
    raise exception 'Enrollment not found';
  end if;

  select exists (
    select 1
    from public.exam_attempts
    where enrollment_id = requested_enrollment_id
      and passed = true
      and submitted_at is not null
  )
  into has_passing_exam;

  select exists (
    select 1
    from public.course_attestations
    where enrollment_id = requested_enrollment_id
      and accepted = true
  )
  into has_attestation;

  return
    recorded_active_seconds >= required_active_seconds
    and has_passing_exam
    and has_attestation;
end;
$$;

revoke all on function public.verify_course_completion(uuid) from public;
grant execute on function public.verify_course_completion(uuid) to authenticated;


create or replace function public.issue_course_certificate(
  requested_enrollment_id uuid
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid;
  completion_allowed boolean;
  selected_student_name text;
  selected_course_title text;
  selected_credit_hours numeric(5,2);
  selected_approval_number text;
  selected_final_score numeric(5,2);
  generated_certificate_number text;
  existing_certificate_id uuid;
  new_certificate_id uuid;
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

  select public.verify_course_completion(
    requested_enrollment_id
  )
  into completion_allowed;

  if not completion_allowed then
    raise exception 'Course completion requirements have not been met';
  end if;

  select certificate.id
  into existing_certificate_id
  from public.course_certificates certificate
  where certificate.enrollment_id = requested_enrollment_id;

  if existing_certificate_id is not null then
    return existing_certificate_id;
  end if;

  select
    attestation.student_name,
    course.title,
    course.credit_hours,
    course.oems_approval_number,
    enrollment.final_score
  into
    selected_student_name,
    selected_course_title,
    selected_credit_hours,
    selected_approval_number,
    selected_final_score
  from public.course_enrollments enrollment
  join public.training_courses course
    on course.id = enrollment.course_id
  join public.course_attestations attestation
    on attestation.enrollment_id = enrollment.id
  where enrollment.id = requested_enrollment_id
    and enrollment.user_id = current_user_id;

  if selected_credit_hours is null then
    raise exception 'Course credit hours are not configured';
  end if;

  generated_certificate_number :=
    'GME-' ||
    to_char(now(), 'YYYYMMDD') ||
    '-' ||
    upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10));

  insert into public.course_certificates (
    enrollment_id,
    certificate_number,
    student_name,
    course_title,
    completion_date,
    actual_course_hours,
    oems_approval_number,
    final_score
  )
  values (
    requested_enrollment_id,
    generated_certificate_number,
    selected_student_name,
    selected_course_title,
    current_date,
    selected_credit_hours,
    selected_approval_number,
    selected_final_score
  )
  returning id into new_certificate_id;

  update public.course_enrollments
  set
    status = 'completed',
    completed_at = now(),
    updated_at = now()
  where id = requested_enrollment_id;

  update public.course_sessions
  set
    is_active = false,
    ended_at = coalesce(ended_at, now())
  where enrollment_id = requested_enrollment_id
    and is_active = true;

  insert into public.engagement_events (
    enrollment_id,
    event_type,
    event_data
  )
  values (
    requested_enrollment_id,
    'certificate_issued',
    jsonb_build_object(
      'certificate_id',
      new_certificate_id,
      'certificate_number',
      generated_certificate_number
    )
  );

  return new_certificate_id;
end;
$$;

revoke all on function public.issue_course_certificate(uuid) from public;
grant execute on function public.issue_course_certificate(uuid) to authenticated;