"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase/client";

type StudentProfile = {
  full_name: string | null;
  provider_level: string | null;
  department: string | null;
};

type CourseProgress = {
  course_slug: string;
  course_title: string;
  lesson_started: boolean;
  lesson_completed: boolean;
  quiz_started: boolean;
  progress_percentage: number;
  last_section: string | null;
  updated_at: string;
};

type CourseCompletion = {
  course_slug: string;
  course_title: string;
  best_score: number;
  completed_at: string;
  certificate_id: string;
  verified: boolean;
};

type QuizAttempt = {
  course_slug: string;
  course_title: string;
  score: number;
  passed: boolean;
  submitted_at: string;
};

function getCourseHref(courseSlug: string) {
  switch (courseSlug) {
    case "glucagon-hypoglycemia":
      return "/courses/glucagon-hypoglycemia";

    case "acute-pulmonary-edema":
      return "/courses/acute-pulmonary-edema";

    case "mental-health-awareness":
      return "/mental-health";

    default:
      return "/courses";
  }
}

function getCertificateHref(courseSlug: string) {
  switch (courseSlug) {
    case "glucagon-hypoglycemia":
      return "/courses/glucagon-hypoglycemia/certificate";

    case "acute-pulmonary-edema":
      return "/courses/acute-pulmonary-edema/certificate";

    default:
      return null;
  }
}

function formatDate(dateValue: string) {
  return new Date(dateValue).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function StudentDashboardPage() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<StudentProfile | null>(null);

  const [progressRecords, setProgressRecords] = useState<
    CourseProgress[]
  >([]);

  const [completionRecords, setCompletionRecords] =
    useState<CourseCompletion[]>([]);

  const [quizAttempts, setQuizAttempts] = useState<
    QuizAttempt[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setPageError("");

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error(
        "Unable to verify dashboard session:",
        sessionError,
      );

      setPageError(
        sessionError.message ||
          "Your account session could not be verified.",
      );

      setLoading(false);
      return;
    }

    const user = session?.user ?? null;

    if (!user) {
      router.replace("/login?redirect=/dashboard");
      return;
    }

    const [
      profileResult,
      progressResult,
      completionsResult,
      attemptsResult,
    ] = await Promise.all([
      supabase
        .from("profiles")
        .select(
          `
            full_name,
            provider_level,
            department
          `,
        )
        .eq("id", user.id)
        .maybeSingle(),

      supabase
        .from("course_progress")
        .select(
          `
            course_slug,
            course_title,
            lesson_started,
            lesson_completed,
            quiz_started,
            progress_percentage,
            last_section,
            updated_at
          `,
        )
        .eq("user_id", user.id)
        .order("updated_at", {
          ascending: false,
        }),

      supabase
        .from("course_completions")
        .select(
          `
            course_slug,
            course_title,
            best_score,
            completed_at,
            certificate_id,
            verified
          `,
        )
        .eq("user_id", user.id)
        .order("completed_at", {
          ascending: false,
        }),

      supabase
        .from("quiz_attempts")
        .select(
          `
            course_slug,
            course_title,
            score,
            passed,
            submitted_at
          `,
        )
        .eq("user_id", user.id)
        .order("submitted_at", {
          ascending: false,
        }),
    ]);

    if (profileResult.error) {
      console.error(
        "Unable to load dashboard profile:",
        profileResult.error,
      );

      setPageError(
        profileResult.error.message ||
          "Your student profile could not be loaded.",
      );

      setLoading(false);
      return;
    }

    if (progressResult.error) {
      console.error(
        "Unable to load course progress:",
        progressResult.error,
      );

      setPageError(
        progressResult.error.message ||
          "Your course progress could not be loaded.",
      );

      setLoading(false);
      return;
    }

    if (completionsResult.error) {
      console.error(
        "Unable to load course completions:",
        completionsResult.error,
      );

      setPageError(
        completionsResult.error.message ||
          "Your completed courses could not be loaded.",
      );

      setLoading(false);
      return;
    }

    if (attemptsResult.error) {
      console.error(
        "Unable to load quiz history:",
        attemptsResult.error,
      );

      setPageError(
        attemptsResult.error.message ||
          "Your quiz history could not be loaded.",
      );

      setLoading(false);
      return;
    }

    setProfile(
      (profileResult.data ??
        null) as StudentProfile | null,
    );

    setProgressRecords(
      (progressResult.data ?? []) as CourseProgress[],
    );

    setCompletionRecords(
      (completionsResult.data ??
        []) as CourseCompletion[],
    );

    setQuizAttempts(
      (attemptsResult.data ?? []) as QuizAttempt[],
    );

    setLoading(false);
  }

  const completedCourseSlugs = useMemo(() => {
    return new Set(
      completionRecords.map(
        (completion) => completion.course_slug,
      ),
    );
  }, [completionRecords]);

  const inProgressCourses = useMemo(() => {
    return progressRecords.filter(
      (progress) =>
        !completedCourseSlugs.has(progress.course_slug),
    );
  }, [progressRecords, completedCourseSlugs]);

  const averageQuizScore = useMemo(() => {
    if (quizAttempts.length === 0) {
      return 0;
    }

    const totalScore = quizAttempts.reduce(
      (total, attempt) => total + attempt.score,
      0,
    );

    return Math.round(totalScore / quizAttempts.length);
  }, [quizAttempts]);

  const latestCompletion =
    completionRecords.length > 0
      ? completionRecords[0]
      : null;

  const continueCourse =
    inProgressCourses.length > 0
      ? inProgressCourses[0]
      : null;

  const displayName =
    profile?.full_name?.trim() || "Student";

  const providerLevel =
    profile?.provider_level?.trim() || "";

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-6xl px-6 py-20 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

          <h1 className="mt-6 text-3xl font-extrabold">
            Loading Student Dashboard
          </h1>

          <p className="mt-3 text-zinc-400">
            Gathering your courses and education records.
          </p>
        </section>
      </main>
    );
  }

  if (pageError) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-2xl border border-red-800 bg-red-950/20 p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Dashboard Error
            </p>

            <h1 className="mt-4 text-3xl font-extrabold">
              Unable to Load Student Records
            </h1>

            <p className="mt-4 leading-7 text-zinc-300">
              {pageError}
            </p>

            <button
              type="button"
              onClick={loadDashboard}
              className="mt-6 rounded-xl bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-500"
            >
              Try Again
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
              Student Portal
            </p>

            <h2 className="mt-3 text-xl font-extrabold">
              GrumpyMedic Education
            </h2>

            <nav className="mt-6 space-y-2">
              <DashboardLink
                href="/dashboard"
                label="Dashboard"
                active
              />

              <DashboardLink
                href="/courses"
                label="Course Library"
              />

              <DashboardLink
                href="/dashboard/profile"
                label="Student Profile"
              />
            </nav>

            <div className="mt-8 rounded-xl border border-zinc-800 bg-black p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Account
              </p>

              <p className="mt-2 font-bold text-white">
                {displayName}
              </p>

              {providerLevel && (
                <p className="mt-1 text-sm text-zinc-400">
                  {providerLevel}
                </p>
              )}
            </div>
          </aside>

          <div>
            <header className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/30 to-zinc-950 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                Student Dashboard
              </p>

              <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
                Welcome back, {displayName}
              </h1>

              <p className="mt-4 max-w-3xl leading-7 text-zinc-300">
                Review your course progress, quiz results,
                completion records, and available
                certificates.
              </p>

              {providerLevel && (
                <p className="mt-3 font-semibold text-red-400">
                  {providerLevel}
                </p>
              )}
            </header>

            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatisticCard
                label="Courses Completed"
                value={completionRecords.length}
                description="Passing course records"
              />

              <StatisticCard
                label="Certificates Earned"
                value={completionRecords.length}
                description="Available certificates"
              />

              <StatisticCard
                label="Courses In Progress"
                value={inProgressCourses.length}
                description="Started but not completed"
              />

              <StatisticCard
                label="Average Quiz Score"
                value={`${averageQuizScore}%`}
                description={`${quizAttempts.length} saved attempt${
                  quizAttempts.length === 1 ? "" : "s"
                }`}
              />
            </section>

            {continueCourse && (
              <section className="mt-8 rounded-2xl border border-red-900 bg-zinc-950 p-6">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                      Continue Learning
                    </p>

                    <h2 className="mt-3 text-2xl font-extrabold">
                      {continueCourse.course_title}
                    </h2>

                    <p className="mt-2 text-zinc-400">
                      Your progress is saved. Continue where
                      you left off.
                    </p>

                    <div className="mt-5 max-w-xl">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-zinc-400">
                          Course Progress
                        </span>

                        <span className="text-red-400">
                          {
                            continueCourse.progress_percentage
                          }
                          %
                        </span>
                      </div>

                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full bg-red-600"
                          style={{
                            width: `${continueCourse.progress_percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <Link
                    href={getCourseHref(
                      continueCourse.course_slug,
                    )}
                    className="inline-flex justify-center rounded-xl bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-500"
                  >
                    Continue Course →
                  </Link>
                </div>
              </section>
            )}

            <section className="mt-8 grid gap-8 xl:grid-cols-2">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                      Completed Courses
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold">
                      Education Records
                    </h2>
                  </div>

                  <span className="rounded-full border border-zinc-700 bg-black px-4 py-2 text-sm font-bold text-zinc-300">
                    {completionRecords.length}
                  </span>
                </div>

                {completionRecords.length === 0 ? (
                  <EmptyState
                    title="No completed courses yet"
                    description="Complete a course and pass its quiz to create your first education record."
                    href="/courses"
                    linkLabel="Browse Courses"
                  />
                ) : (
                  <div className="mt-6 space-y-4">
                    {completionRecords
                      .slice(0, 4)
                      .map((completion) => {
                        const certificateHref =
                          getCertificateHref(
                            completion.course_slug,
                          );

                        return (
                          <div
                            key={completion.course_slug}
                            className="rounded-xl border border-zinc-800 bg-black p-5"
                          >
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                              <div>
                                <p className="font-bold text-white">
                                  {
                                    completion.course_title
                                  }
                                </p>

                                <p className="mt-2 text-sm text-zinc-400">
                                  Completed{" "}
                                  {formatDate(
                                    completion.completed_at,
                                  )}
                                </p>

                                <p className="mt-2 font-semibold text-emerald-400">
                                  Best score:{" "}
                                  {completion.best_score}%
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <Link
                                  href={getCourseHref(
                                    completion.course_slug,
                                  )}
                                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                                >
                                  Review
                                </Link>

                                {certificateHref && (
                                  <Link
                                    href={
                                      certificateHref
                                    }
                                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-500"
                                  >
                                    Certificate
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                      Quiz History
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold">
                      Recent Attempts
                    </h2>
                  </div>

                  <span className="rounded-full border border-zinc-700 bg-black px-4 py-2 text-sm font-bold text-zinc-300">
                    {quizAttempts.length}
                  </span>
                </div>

                {quizAttempts.length === 0 ? (
                  <EmptyState
                    title="No quiz attempts yet"
                    description="Your submitted quiz scores will appear here."
                    href="/courses"
                    linkLabel="Start Learning"
                  />
                ) : (
                  <div className="mt-6 space-y-4">
                    {quizAttempts
                      .slice(0, 5)
                      .map((attempt, index) => (
                        <div
                          key={`${attempt.course_slug}-${attempt.submitted_at}-${index}`}
                          className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-black p-5"
                        >
                          <div>
                            <p className="font-bold text-white">
                              {attempt.course_title}
                            </p>

                            <p className="mt-1 text-sm text-zinc-500">
                              {formatDate(
                                attempt.submitted_at,
                              )}
                            </p>
                          </div>

                          <div className="text-right">
                            <p
                              className={`text-2xl font-extrabold ${
                                attempt.passed
                                  ? "text-emerald-400"
                                  : "text-red-400"
                              }`}
                            >
                              {attempt.score}%
                            </p>

                            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-zinc-500">
                              {attempt.passed
                                ? "Passed"
                                : "Not Passed"}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </section>

            {latestCompletion && (
              <section className="mt-8 rounded-2xl border border-emerald-900 bg-emerald-950/10 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
                  Latest Achievement
                </p>

                <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <h2 className="text-2xl font-extrabold">
                      {latestCompletion.course_title}
                    </h2>

                    <p className="mt-2 text-zinc-300">
                      Completed{" "}
                      {formatDate(
                        latestCompletion.completed_at,
                      )}{" "}
                      with a best score of{" "}
                      {latestCompletion.best_score}%.
                    </p>
                  </div>

                  {getCertificateHref(
                    latestCompletion.course_slug,
                  ) && (
                    <Link
                      href={
                        getCertificateHref(
                          latestCompletion.course_slug,
                        ) as string
                      }
                      className="inline-flex justify-center rounded-xl bg-emerald-600 px-7 py-3 font-bold text-white transition hover:bg-emerald-500"
                    >
                      View Certificate
                    </Link>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatisticCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
        {label}
      </p>

      <p className="mt-3 text-4xl font-extrabold text-white">
        {value}
      </p>

      <p className="mt-2 text-sm text-zinc-500">
        {description}
      </p>
    </div>
  );
}

function DashboardLink({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-xl px-4 py-3 font-semibold transition ${
        active
          ? "bg-red-600 text-white"
          : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function EmptyState({
  title,
  description,
  href,
  linkLabel,
}: {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mt-6 rounded-xl border border-dashed border-zinc-700 bg-black p-6 text-center">
      <h3 className="font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>

      <Link
        href={href}
        className="mt-5 inline-block rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
      >
        {linkLabel}
      </Link>
    </div>
  );
}