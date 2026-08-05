-- OEMS exam security
-- GrumpyMedic Education
-- Do not run in production until reviewed

create table if not exists public.exam_questions (
  id uuid primary key default gen_random_uuid(),

  course_id uuid not null
    references public.training_courses(id)
    on delete cascade,

  question_key text not null,
  prompt text not null,
  explanation text,

  is_active boolean not null default true,
  question_order integer,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (course_id, question_key)
);

create table if not exists public.exam_question_options (
  id uuid primary key default gen_random_uuid(),

  question_id uuid not null
    references public.exam_questions(id)
    on delete cascade,

  option_order integer not null,
  option_text text not null,
  is_correct boolean not null default false,

  created_at timestamptz not null default now(),

  unique (question_id, option_order)
);

create table if not exists public.exam_attempt_questions (
  id uuid primary key default gen_random_uuid(),

  exam_attempt_id uuid not null
    references public.exam_attempts(id)
    on delete cascade,

  question_id uuid not null
    references public.exam_questions(id),

  display_order integer not null,

  created_at timestamptz not null default now(),

  unique (exam_attempt_id, question_id),
  unique (exam_attempt_id, display_order)
);

create index if not exists idx_exam_questions_course
  on public.exam_questions(course_id);

create index if not exists idx_exam_options_question
  on public.exam_question_options(question_id);

create index if not exists idx_exam_attempt_questions_attempt
  on public.exam_attempt_questions(exam_attempt_id);

alter table public.exam_questions enable row level security;
alter table public.exam_question_options enable row level security;
alter table public.exam_attempt_questions enable row level security;

-- Students may view only the questions assigned to their own active attempt.
-- Correct-answer fields remain inaccessible through normal student queries.

create policy "Students can view assigned exam questions"
on public.exam_attempt_questions
for select
to authenticated
using (
  exists (
    select 1
    from public.exam_attempts attempt
    join public.course_enrollments enrollment
      on enrollment.id = attempt.enrollment_id
    where attempt.id = exam_attempt_questions.exam_attempt_id
      and enrollment.user_id = auth.uid()
  )
);

create policy "Students can view question text for assigned attempts"
on public.exam_questions
for select
to authenticated
using (
  exists (
    select 1
    from public.exam_attempt_questions assigned
    join public.exam_attempts attempt
      on attempt.id = assigned.exam_attempt_id
    join public.course_enrollments enrollment
      on enrollment.id = attempt.enrollment_id
    where assigned.question_id = exam_questions.id
      and enrollment.user_id = auth.uid()
  )
);

-- Do not create a direct student SELECT policy on exam_question_options.
-- Options will be returned through a secure function that excludes is_correct.


create or replace function public.begin_exam_attempt(
  requested_enrollment_id uuid
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid;
  selected_course_id uuid;
  maximum_attempts integer;
  existing_attempt_count integer;
  next_attempt_number integer;
  new_attempt_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  select
    enrollment.course_id,
    course.maximum_exam_attempts
  into
    selected_course_id,
    maximum_attempts
  from public.course_enrollments enrollment
  join public.training_courses course
    on course.id = enrollment.course_id
  where enrollment.id = requested_enrollment_id
    and enrollment.user_id = current_user_id;

  if selected_course_id is null then
    raise exception 'Enrollment not found';
  end if;

  select count(*)
  into existing_attempt_count
  from public.exam_attempts
  where enrollment_id = requested_enrollment_id;

  if existing_attempt_count >= maximum_attempts then
    raise exception 'Maximum exam attempts reached';
  end if;

  next_attempt_number := existing_attempt_count + 1;

  insert into public.exam_attempts (
    enrollment_id,
    attempt_number
  )
  values (
    requested_enrollment_id,
    next_attempt_number
  )
  returning id into new_attempt_id;

  insert into public.exam_attempt_questions (
    exam_attempt_id,
    question_id,
    display_order
  )
  select
    new_attempt_id,
    question.id,
    row_number() over (
      order by coalesce(question.question_order, 999999), question.id
    )
  from public.exam_questions question
  where question.course_id = selected_course_id
    and question.is_active = true;

  if not exists (
    select 1
    from public.exam_attempt_questions
    where exam_attempt_id = new_attempt_id
  ) then
    delete from public.exam_attempts
    where id = new_attempt_id;

    raise exception 'No active exam questions are configured';
  end if;

  insert into public.engagement_events (
    enrollment_id,
    event_type,
    event_data
  )
  values (
    requested_enrollment_id,
    'exam_started',
    jsonb_build_object(
      'exam_attempt_id',
      new_attempt_id,
      'attempt_number',
      next_attempt_number
    )
  );

  return new_attempt_id;
end;
$$;

revoke all on function public.begin_exam_attempt(uuid) from public;
grant execute on function public.begin_exam_attempt(uuid) to authenticated;


create or replace function public.get_exam_attempt_questions(
  requested_exam_attempt_id uuid
)
returns table (
  question_id uuid,
  display_order integer,
  prompt text,
  option_id uuid,
  option_order integer,
  option_text text
)
language sql
security definer
set search_path = public
as $$
  select
    question.id as question_id,
    assigned.display_order,
    question.prompt,
    option.id as option_id,
    option.option_order,
    option.option_text
  from public.exam_attempt_questions assigned
  join public.exam_attempts attempt
    on attempt.id = assigned.exam_attempt_id
  join public.course_enrollments enrollment
    on enrollment.id = attempt.enrollment_id
  join public.exam_questions question
    on question.id = assigned.question_id
  join public.exam_question_options option
    on option.question_id = question.id
  where assigned.exam_attempt_id = requested_exam_attempt_id
    and enrollment.user_id = auth.uid()
    and attempt.submitted_at is null
  order by
    assigned.display_order,
    option.option_order;
$$;

revoke all on function public.get_exam_attempt_questions(uuid) from public;
grant execute on function public.get_exam_attempt_questions(uuid) to authenticated;


create or replace function public.submit_exam_attempt(
  requested_exam_attempt_id uuid,
  submitted_answers jsonb
)
returns table (
  score numeric,
  passed boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid;
  selected_enrollment_id uuid;
  selected_course_id uuid;
  required_passing_score integer;
  expected_question_count integer;
  submitted_question_count integer;
  correct_question_count integer;
  calculated_score numeric(5,2);
  calculated_passed boolean;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  select
    enrollment.id,
    enrollment.course_id,
    course.passing_score
  into
    selected_enrollment_id,
    selected_course_id,
    required_passing_score
  from public.exam_attempts attempt
  join public.course_enrollments enrollment
    on enrollment.id = attempt.enrollment_id
  join public.training_courses course
    on course.id = enrollment.course_id
  where attempt.id = requested_exam_attempt_id
    and enrollment.user_id = current_user_id
    and attempt.submitted_at is null;

  if selected_enrollment_id is null then
    raise exception 'Open exam attempt not found';
  end if;

  select count(*)
  into expected_question_count
  from public.exam_attempt_questions
  where exam_attempt_id = requested_exam_attempt_id;

  select count(*)
  into submitted_question_count
  from jsonb_array_elements(submitted_answers);

  if submitted_question_count <> expected_question_count then
    raise exception 'Every exam question must be answered';
  end if;

  insert into public.exam_responses (
    exam_attempt_id,
    question_key,
    selected_answer,
    correct_answer,
    is_correct
  )
  select
    requested_exam_attempt_id,
    question.question_key,
    option.option_order,
    correct_option.option_order,
    option.is_correct
  from jsonb_array_elements(submitted_answers) answer
  join public.exam_attempt_questions assigned
    on assigned.exam_attempt_id = requested_exam_attempt_id
   and assigned.question_id = (answer ->> 'question_id')::uuid
  join public.exam_questions question
    on question.id = assigned.question_id
  join public.exam_question_options option
    on option.id = (answer ->> 'option_id')::uuid
   and option.question_id = question.id
  join public.exam_question_options correct_option
    on correct_option.question_id = question.id
   and correct_option.is_correct = true;

  if (
    select count(*)
    from public.exam_responses
    where exam_attempt_id = requested_exam_attempt_id
  ) <> expected_question_count then
    raise exception 'One or more submitted answers were invalid';
  end if;

  select count(*)
  into correct_question_count
  from public.exam_responses
  where exam_attempt_id = requested_exam_attempt_id
    and is_correct = true;

  calculated_score := round(
    (
      correct_question_count::numeric
      / expected_question_count::numeric
    ) * 100,
    2
  );

  calculated_passed :=
    calculated_score >= required_passing_score;

  update public.exam_attempts
  set
    submitted_at = now(),
    score = calculated_score,
    passed = calculated_passed
  where id = requested_exam_attempt_id;

  update public.course_enrollments
  set
    final_score = greatest(
      coalesce(final_score, 0),
      calculated_score
    ),
    status = case
      when calculated_passed then 'assessment_pending'
      else status
    end,
    updated_at = now()
  where id = selected_enrollment_id;

  insert into public.engagement_events (
    enrollment_id,
    event_type,
    event_data
  )
  values (
    selected_enrollment_id,
    'exam_submitted',
    jsonb_build_object(
      'exam_attempt_id',
      requested_exam_attempt_id,
      'score',
      calculated_score,
      'passed',
      calculated_passed
    )
  );

  return query
  select calculated_score, calculated_passed;
end;
$$;

revoke all on function public.submit_exam_attempt(uuid, jsonb) from public;
grant execute on function public.submit_exam_attempt(uuid, jsonb) to authenticated;