-- OEMS course tracking foundation
-- GrumpyMedic Education
-- Do not run in production until reviewed

create extension if not exists pgcrypto;

create table if not exists public.training_courses (
  id uuid primary key default gen_random_uuid(),

  slug text not null unique,
  title text not null,
  description text,

  intended_minutes integer not null
    check (intended_minutes > 0),

  minimum_active_minutes integer not null
    check (
      minimum_active_minutes > 0
      and minimum_active_minutes <= intended_minutes
    ),

  passing_score integer not null default 80
    check (passing_score between 1 and 100),

  maximum_exam_attempts integer not null default 3
    check (maximum_exam_attempts > 0),

  credit_hours numeric(5,2),

  oems_approval_number text,
  nccr_category text,

  status text not null default 'draft'
    check (
      status in (
        'draft',
        'review',
        'published',
        'archived'
      )
    ),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id),

  course_id uuid not null
    references public.training_courses(id),

  status text not null default 'enrolled'
    check (
      status in (
        'enrolled',
        'in_progress',
        'assessment_pending',
        'completed',
        'failed',
        'expired'
      )
    ),

  enrolled_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz,

  total_active_seconds integer not null default 0
    check (total_active_seconds >= 0),

  final_score numeric(5,2)
    check (
      final_score is null
      or final_score between 0 and 100
    ),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (user_id, course_id)
);

create table if not exists public.course_sessions (
  id uuid primary key default gen_random_uuid(),

  enrollment_id uuid not null
    references public.course_enrollments(id)
    on delete cascade,

  session_token uuid not null default gen_random_uuid(),

  started_at timestamptz not null default now(),
  last_heartbeat_at timestamptz,
  ended_at timestamptz,

  is_active boolean not null default true,

  ip_address inet,
  user_agent text,

  created_at timestamptz not null default now()
);

create table if not exists public.engagement_events (
  id bigint generated always as identity primary key,

  enrollment_id uuid not null
    references public.course_enrollments(id)
    on delete cascade,

  session_id uuid
    references public.course_sessions(id)
    on delete set null,

  event_type text not null,

  event_data jsonb not null default '{}'::jsonb,

  occurred_at timestamptz not null default now()
);

create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),

  enrollment_id uuid not null
    references public.course_enrollments(id)
    on delete cascade,

  attempt_number integer not null
    check (attempt_number > 0),

  started_at timestamptz not null default now(),
  submitted_at timestamptz,

  score numeric(5,2)
    check (
      score is null
      or score between 0 and 100
    ),

  passed boolean,

  created_at timestamptz not null default now(),

  unique (enrollment_id, attempt_number)
);

create table if not exists public.exam_responses (
  id uuid primary key default gen_random_uuid(),

  exam_attempt_id uuid not null
    references public.exam_attempts(id)
    on delete cascade,

  question_key text not null,
  selected_answer integer,
  correct_answer integer,
  is_correct boolean,

  answered_at timestamptz not null default now()
);

create table if not exists public.course_attestations (
  id uuid primary key default gen_random_uuid(),

  enrollment_id uuid not null unique
    references public.course_enrollments(id)
    on delete cascade,

  student_name text not null,
  emt_number text not null,

  attestation_text text not null,
  accepted boolean not null,

  ip_address inet,
  user_agent text,

  signed_at timestamptz not null default now()
);

create table if not exists public.course_certificates (
  id uuid primary key default gen_random_uuid(),

  enrollment_id uuid not null unique
    references public.course_enrollments(id),

  certificate_number text not null unique,

  student_name text not null,
  course_title text not null,
  completion_date date not null,
  actual_course_hours numeric(5,2) not null,

  oems_approval_number text,
  final_score numeric(5,2),

  storage_path text,

  issued_at timestamptz not null default now(),

  revoked_at timestamptz,
  revocation_reason text
);

create index if not exists idx_course_enrollments_user
  on public.course_enrollments(user_id);

create index if not exists idx_course_enrollments_course
  on public.course_enrollments(course_id);

create index if not exists idx_course_sessions_enrollment
  on public.course_sessions(enrollment_id);

create index if not exists idx_engagement_events_enrollment
  on public.engagement_events(enrollment_id);

create index if not exists idx_exam_attempts_enrollment
  on public.exam_attempts(enrollment_id);
  -- Enable Row Level Security

alter table public.training_courses enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.course_sessions enable row level security;
alter table public.engagement_events enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.exam_responses enable row level security;
alter table public.course_attestations enable row level security;
alter table public.course_certificates enable row level security;
-- Students may view published courses

create policy "Authenticated users can view published courses"
on public.training_courses
for select
to authenticated
using (status = 'published');

-- Students may view only their own enrollments

create policy "Students can view their own enrollments"
on public.course_enrollments
for select
to authenticated
using (user_id = auth.uid());

-- Students may view sessions connected to their own enrollment

create policy "Students can view their own course sessions"
on public.course_sessions
for select
to authenticated
using (
  exists (
    select 1
    from public.course_enrollments enrollment
    where enrollment.id = course_sessions.enrollment_id
      and enrollment.user_id = auth.uid()
  )
);

-- Students may view their own engagement records

create policy "Students can view their own engagement events"
on public.engagement_events
for select
to authenticated
using (
  exists (
    select 1
    from public.course_enrollments enrollment
    where enrollment.id = engagement_events.enrollment_id
      and enrollment.user_id = auth.uid()
  )
);

-- Students may view their own exam attempts

create policy "Students can view their own exam attempts"
on public.exam_attempts
for select
to authenticated
using (
  exists (
    select 1
    from public.course_enrollments enrollment
    where enrollment.id = exam_attempts.enrollment_id
      and enrollment.user_id = auth.uid()
  )
);

-- Students may view their own exam responses

create policy "Students can view their own exam responses"
on public.exam_responses
for select
to authenticated
using (
  exists (
    select 1
    from public.exam_attempts attempt
    join public.course_enrollments enrollment
      on enrollment.id = attempt.enrollment_id
    where attempt.id = exam_responses.exam_attempt_id
      and enrollment.user_id = auth.uid()
  )
);

-- Students may view their own attestation

create policy "Students can view their own course attestation"
on public.course_attestations
for select
to authenticated
using (
  exists (
    select 1
    from public.course_enrollments enrollment
    where enrollment.id = course_attestations.enrollment_id
      and enrollment.user_id = auth.uid()
  )
);

-- Students may view their own certificate

create policy "Students can view their own certificate"
on public.course_certificates
for select
to authenticated
using (
  exists (
    select 1
    from public.course_enrollments enrollment
    where enrollment.id = course_certificates.enrollment_id
      and enrollment.user_id = auth.uid()
  )
);