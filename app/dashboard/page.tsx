"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase/client";

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  provider_level: string | null;
  state: string | null;
  department: string | null;
};

type CourseProgress = {
  id: string;
  user_id: string;
  course_slug: string;
  course_title: string;
  progress_percent: number;
  quiz_score: number | null;
  completed: boolean;
  certificate_earned: boolean;
  ce_hours: number;
  started_at: string;
  completed_at: string | null;
  updated_at: string;
};

const courseRoutes: Record<string, string> = {
  "acute-pulmonary-edema": "/courses/acute-pulmonary-edema",
  "glucagon-hypoglycemia": "/courses/glucagon-hypoglycemia",
};

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setPageError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/login");
        return;
      }

      const [profileResult, progressResult] = await Promise.all([
        supabase
          .from("profiles")
          .select(
            "id, full_name, email, provider_level, state, department"
          )
          .eq("id", user.id)
          .maybeSingle(),

        supabase
          .from("course_progress")
          .select(
            `
              id,
              user_id,
              course_slug,
              course_title,
              progress_percent,
              quiz_score,
              completed,
              certificate_earned,
              ce_hours,
              started_at,
              completed_at,
              updated_at
            `
          )
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false }),
      ]);

      if (profileResult.error) {
        console.error("Profile load error:", profileResult.error);
        setPageError(
          `Your profile could not be loaded: ${profileResult.error.message}`
        );
      }

      if (progressResult.error) {
        console.error("Progress load error:", progressResult.error);
        setPageError(
          `Your course progress could not be loaded: ${progressResult.error.message}`
        );
      }

      setProfile(
        profileResult.data ?? {
          id: user.id,
          full_name:
            user.user_metadata?.full_name ?? "GrumpyMedic Student",
          email: user.email ?? "",
          provider_level:
            user.user_metadata?.provider_level ?? "EMS Provider",
          state: user.user_metadata?.state ?? "Not provided",
          department:
            user.user_metadata?.organization ??
            user.user_metadata?.department ??
            "Not provided",
        }
      );

      setProgress(
        (progressResult.data as CourseProgress[] | null) ?? []
      );

      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  const completedCourses = useMemo(
    () => progress.filter((course) => course.completed),
    [progress]
  );

  const certificates = useMemo(
    () => progress.filter((course) => course.certificate_earned),
    [progress]
  );

  const quizScores = useMemo(
    () =>
      progress
        .map((course) => course.quiz_score)
        .filter((score): score is number => score !== null),
    [progress]
  );

  const quizAverage = useMemo(() => {
    if (quizScores.length === 0) {
      return 0;
    }

    const total = quizScores.reduce(
      (sum, currentScore) => sum + currentScore,
      0
    );

    return Math.round(total / quizScores.length);
  }, [quizScores]);

  const totalCeHours = useMemo(
    () =>
      completedCourses.reduce(
        (sum, course) => sum + Number(course.ce_hours ?? 0),
        0
      ),
    [completedCourses]
  );

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  function getCourseHref(courseSlug: string) {
    return courseRoutes[courseSlug] ?? "/courses";
  }

  function getCertificateHref(course: CourseProgress) {
    const score = course.quiz_score ?? 0;

    return `/courses/${course.course_slug}/certificate?score=${score}`;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-red-500" />

            <p className="mt-4 text-zinc-400">
              Loading your dashboard...
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Student Dashboard
            </p>

            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Welcome back,{" "}
              {profile?.full_name || "GrumpyMedic Student"}
            </h1>

            <p className="mt-3 max-w-3xl text-zinc-400">
              Review your EMS course progress, quiz scores,
              certificates, and continuing-education hours.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-fit rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-500 transition hover:bg-red-600 hover:text-white"
          >
            Log Out
          </button>
        </div>

        {pageError && (
          <div className="mt-8 rounded-xl border border-red-500/60 bg-red-500/10 p-4 text-red-300">
            {pageError}
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <DashboardStat
            label="Courses Completed"
            value={String(completedCourses.length)}
            detail={
              completedCourses.length === 1
                ? "One completed course"
                : `${completedCourses.length} completed courses`
            }
          />

          <DashboardStat
            label="Certificates Earned"
            value={String(certificates.length)}
            detail="Available to view and print"
          />

          <DashboardStat
            label="Quiz Average"
            value={
              quizScores.length > 0 ? `${quizAverage}%` : "—"
            }
            detail={
              quizScores.length > 0
                ? `Based on ${quizScores.length} recorded quiz${
                    quizScores.length === 1 ? "" : "zes"
                  }`
                : "No quiz scores recorded yet"
            }
          />

          <DashboardStat
            label="Continuing Education"
            value={totalCeHours.toFixed(1)}
            detail="Hours completed"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                  Course Progress
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Your Learning Activity
                </h2>
              </div>

              <Link
                href="/courses"
                className="w-fit rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold transition hover:border-red-500 hover:text-red-500"
              >
                Browse Courses
              </Link>
            </div>

            {progress.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-zinc-700 bg-black p-8 text-center">
                <h3 className="text-lg font-bold text-white">
                  No course activity yet
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  Complete a course quiz and your progress will
                  appear here automatically.
                </p>

                <Link
                  href="/courses"
                  className="mt-5 inline-block rounded-xl bg-red-600 px-5 py-3 font-bold transition hover:bg-red-500"
                >
                  Start a Course
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {progress.map((course) => (
                  <CourseProgressCard
                    key={course.id}
                    course={course}
                    href={getCourseHref(course.course_slug)}
                  />
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Profile
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Student Information
            </h2>

            <div className="mt-6 space-y-4">
              <ProfileRow
                label="Name"
                value={
                  profile?.full_name || "Not provided"
                }
              />

              <ProfileRow
                label="Email"
                value={profile?.email || "Not provided"}
              />

              <ProfileRow
                label="Provider Level"
                value={
                  profile?.provider_level || "Not provided"
                }
              />

              <ProfileRow
                label="Department"
                value={
                  profile?.department || "Not provided"
                }
              />

              <ProfileRow
                label="State"
                value={profile?.state || "Not provided"}
              />
            </div>
          </section>
        </div>

        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Quick Access
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Continue Learning
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickLink
              href="/scenarios/acute-pulmonary-edema"
              title="Start a Scenario"
              description="Practice clinical decision-making."
            />

            <QuickLink
              href="/quizzes"
              title="Take a Quiz"
              description="Review EMS knowledge and test readiness."
            />

            <QuickLink
              href="/resources/drug-calculator"
              title="Drug Calculator"
              description="Calculate weight-based medication dosing."
            />

            <QuickLink
              href="/resources"
              title="EMS Resources"
              description="Protocols, references, and assessment tools."
            />
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Certificates
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Earned Certificates
          </h2>

          {certificates.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-zinc-700 bg-black p-8 text-center">
              <p className="text-zinc-400">
                Pass a course assessment to earn your first
                certificate.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {certificates.map((course) => (
                <CertificateCard
                  key={course.id}
                  title={course.course_title}
                  score={course.quiz_score}
                  completedAt={course.completed_at}
                  href={getCertificateHref(course)}
                />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

function DashboardStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm font-semibold text-zinc-400">
        {label}
      </p>

      <p className="mt-3 text-4xl font-extrabold text-red-500">
        {value}
      </p>

      <p className="mt-2 text-sm text-zinc-500">
        {detail}
      </p>
    </div>
  );
}

function CourseProgressCard({
  course,
  href,
}: {
  course: CourseProgress;
  href: string;
}) {
  const status = course.completed
    ? "Completed"
    : course.progress_percent > 0
      ? "In Progress"
      : "Not Started";

  return (
    <Link
      href={href}
      className="block rounded-xl border border-zinc-800 bg-black p-5 transition hover:border-red-500"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-white">
            {course.course_title}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            {status}
          </p>
        </div>

        <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm font-bold text-red-400">
          {course.quiz_score !== null
            ? `${course.quiz_score}%`
            : "No score"}
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-red-600"
          style={{
            width: `${Math.min(
              Math.max(course.progress_percent, 0),
              100
            )}%`,
          }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
        <span>
          {Number(course.ce_hours).toFixed(1)} CE hour
          {Number(course.ce_hours) === 1 ? "" : "s"}
        </span>

        <span>
          {course.progress_percent}% complete
        </span>
      </div>
    </Link>
  );
}

function ProfileRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black p-4">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 break-words text-zinc-200">
        {value}
      </p>
    </div>
  );
}

function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-zinc-800 bg-black p-5 transition hover:border-red-500 hover:bg-zinc-950"
    >
      <h3 className="font-bold text-red-500">
        {title}
      </h3>

      <p className="mt-2 text-sm text-zinc-400">
        {description}
      </p>
    </Link>
  );
}

function CertificateCard({
  title,
  score,
  completedAt,
  href,
}: {
  title: string;
  score: number | null;
  completedAt: string | null;
  href: string;
}) {
  const completionDate = completedAt
    ? new Date(completedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Completion date unavailable";

  return (
    <Link
      href={href}
      className="rounded-xl border border-zinc-800 bg-black p-5 transition hover:border-red-500"
    >
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-red-500">
        Certificate Earned
      </p>

      <h3 className="mt-2 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Completed: {completionDate}
      </p>

      <p className="mt-1 text-sm text-zinc-500">
        Quiz score: {score !== null ? `${score}%` : "Not recorded"}
      </p>

      <p className="mt-4 text-sm font-semibold text-red-400">
        View Certificate →
      </p>
    </Link>
  );
}