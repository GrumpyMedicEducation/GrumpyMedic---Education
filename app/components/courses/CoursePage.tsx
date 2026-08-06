"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import Navbar from "../Navbar";
import CourseEngagementTracker from "../../courses/CourseEngagementTracker";
import CourseAccessGate from "../CourseAccessGate";
import {
  getCourseBySlug,
} from "../../lib/courses/catalog";
import {
  getCourseQuizRoute,
} from "../../lib/courses/routes";
import { supabase } from "../../lib/supabase/client";

type CoursePageProps = {
  slug: string;
};

type SavedCourseProgress = {
  lesson_completed: boolean;
  progress_percentage: number;
};

export default function CoursePage({
  slug,
}: CoursePageProps) {
  const course = getCourseBySlug(slug);

  const [lessonComplete, setLessonComplete] =
    useState(false);

  const [progressLoading, setProgressLoading] =
    useState(true);

  const [saving, setSaving] = useState(false);

  const [progressError, setProgressError] =
    useState("");

  const [savedMessage, setSavedMessage] =
    useState("");

  const loadCourseProgress = useCallback(
    async () => {
      if (!course) {
        setProgressLoading(false);
        return;
      }

      setProgressLoading(true);
      setProgressError("");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error(
          "Unable to verify course session:",
          sessionError,
        );

        setProgressError(
          sessionError.message ||
            "Your saved course progress could not be loaded.",
        );

        setProgressLoading(false);
        return;
      }

      const user = session?.user ?? null;

      if (!user) {
        setLessonComplete(false);
        setProgressLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("course_progress")
        .select(
          `
            lesson_completed,
            progress_percentage
          `,
        )
        .eq("user_id", user.id)
        .eq("course_slug", course.slug)
        .maybeSingle();

      if (error) {
        console.error(
          "Unable to load course progress:",
          error,
        );

        setProgressError(
          error.message ||
            "Your saved course progress could not be loaded.",
        );

        setProgressLoading(false);
        return;
      }

      const savedProgress =
        (data ??
          null) as SavedCourseProgress | null;

      if (savedProgress) {
        setLessonComplete(
          savedProgress.lesson_completed,
        );

        setProgressLoading(false);
        return;
      }

      const { error: insertError } =
        await supabase
          .from("course_progress")
          .insert({
            user_id: user.id,
            course_slug: course.slug,
            course_title: course.title,
            lesson_started: true,
            lesson_completed: false,
            quiz_started: false,
            last_section: "course-started",
            progress_percentage: 10,
          });

      if (insertError) {
        console.error(
          "Unable to create course progress:",
          insertError,
        );

        setProgressError(
          insertError.message ||
            "Your course progress could not be started.",
        );
      }

      setLessonComplete(false);
      setProgressLoading(false);
    },
    [course],
  );

  useEffect(() => {
    loadCourseProgress();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadCourseProgress();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadCourseProgress]);

  async function markLessonComplete() {
    if (!course) {
      return;
    }

    setSaving(true);
    setProgressError("");
    setSavedMessage("");

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error(
        "Unable to verify lesson session:",
        sessionError,
      );

      setProgressError(
        sessionError.message ||
          "Your lesson completion could not be saved.",
      );

      setSaving(false);
      return;
    }

    const user = session?.user ?? null;

    if (!user) {
      setProgressError(
        "Please log in before saving lesson completion.",
      );

      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("course_progress")
      .upsert(
        {
          user_id: user.id,
          course_slug: course.slug,
          course_title: course.title,
          lesson_started: true,
          lesson_completed: true,
          last_section: "lesson-completed",
          progress_percentage: 50,
          lesson_completed_at:
            new Date().toISOString(),
        },
        {
          onConflict: "user_id,course_slug",
        },
      );

    if (error) {
      console.error(
        "Unable to save lesson completion:",
        error,
      );

      setProgressError(
        error.message ||
          "Your lesson completion could not be saved.",
      );

      setSaving(false);
      return;
    }

    setLessonComplete(true);

    setSavedMessage(
      "Lesson completion saved to your student record.",
    );

    setSaving(false);
  }

  if (!course) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Course Not Found
          </p>

          <h1 className="mt-4 text-4xl font-extrabold">
            This Course Is Not Available
          </h1>

          <p className="mt-4 leading-7 text-zinc-400">
            The requested course could not be found in the
            GrumpyMedic Education course catalog.
          </p>

          <Link
            href="/courses"
            className="mt-7 inline-block rounded-xl bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-500"
          >
            Return to Courses
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <CourseEngagementTracker
        courseSlug={course?.slug ?? slug}
        courseTitle={course?.title ?? "Course"}
        requiredMinutes={60}
      />

      <section className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/courses"
          className="font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Courses
        </Link>

        <header className="mt-8 rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/30 to-zinc-950 p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">
            {course.category}
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">
            {course.title}
          </h1>

          <p className="mt-4 text-xl text-zinc-300">
            {course.subtitle}
          </p>

          <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
            {course.description}
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CourseStat
            label="Provider Focus"
            value={course.providerFocus}
          />

          <CourseStat
            label="Passing Score"
            value={`${course.passingScore}%`}
          />

          <CourseStat
            label="Education Hours"
            value={`${course.ceHours}`}
          />

          <CourseStat
            label="Certificate"
            value={
              course.certificateEnabled
                ? "Available"
                : "Not Available"
            }
          />
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Public Course Preview
          </p>

          <h2 className="mt-3 text-2xl font-extrabold">
            What You Will Learn
          </h2>

          <p className="mt-4 leading-7 text-zinc-400">
            This course contains{" "}
            {course.sections.length} lesson sections and{" "}
            {course.questions.length} quiz questions.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {course.sections.map(
              (section, index) => (
                <div
                  key={section.id}
                  className="flex gap-4 rounded-xl border border-zinc-800 bg-black p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 font-extrabold">
                    {index + 1}
                  </span>

                  <div>
                    <p className="font-bold text-white">
                      {section.title}
                    </p>

                    <p className="mt-2 text-sm text-zinc-500">
                      Course lesson section
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        <div className="mt-8">
          <CourseAccessGate
            accessLevel="login"
            title="Sign In to Access the Full Course"
            description={`Create a free GrumpyMedic Education account or log in to complete ${course.title}, save your progress, and continue to the quiz.`}
          >
            <div className="space-y-8">
              {course.sections.map(
                (section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 font-extrabold">
                        {index + 1}
                      </span>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                          Lesson Section
                        </p>

                        <h2 className="mt-2 text-2xl font-extrabold">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    {section.paragraphs &&
                      section.paragraphs.length > 0 && (
                        <div className="mt-6 space-y-4">
                          {section.paragraphs.map(
                            (paragraph) => (
                              <p
                                key={paragraph}
                                className="leading-8 text-zinc-300"
                              >
                                {paragraph}
                              </p>
                            ),
                          )}
                        </div>
                      )}

                    {section.bulletPoints &&
                      section.bulletPoints.length > 0 && (
                        <ul className="ml-6 mt-6 list-disc space-y-3 text-zinc-300">
                          {section.bulletPoints.map(
                            (bulletPoint) => (
                              <li key={bulletPoint}>
                                {bulletPoint}
                              </li>
                            ),
                          )}
                        </ul>
                      )}
                  </section>
                ),
              )}
            </div>

            <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
              {progressLoading ? (
                <>
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

                  <h2 className="mt-5 text-2xl font-extrabold">
                    Loading Saved Progress
                  </h2>

                  <p className="mt-3 text-zinc-400">
                    Checking your student record.
                  </p>
                </>
              ) : !lessonComplete ? (
                <>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                    Lesson Progress
                  </p>

                  <h2 className="mt-3 text-2xl font-extrabold">
                    Ready to Continue?
                  </h2>

                  <p className="mx-auto mt-3 max-w-2xl leading-7 text-zinc-400">
                    Mark the lesson complete after reviewing
                    each section. Your progress will be saved
                    to your GrumpyMedic Education account.
                  </p>

                  {progressError && (
                    <ProgressMessage
                      type="error"
                      title="Unable to Save Progress"
                      message={progressError}
                    />
                  )}

                  <button
                    type="button"
                    onClick={markLessonComplete}
                    disabled={saving}
                    className={`mt-6 rounded-xl px-8 py-4 font-bold text-white transition ${
                      saving
                        ? "cursor-not-allowed bg-zinc-700"
                        : "bg-red-600 hover:bg-red-500"
                    }`}
                  >
                    {saving
                      ? "Saving Completion..."
                      : "Mark Lesson Complete"}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
                    Lesson Complete
                  </p>

                  <h2 className="mt-3 text-2xl font-extrabold">
                    Continue to the Quiz
                  </h2>

                  <p className="mx-auto mt-3 max-w-2xl leading-7 text-zinc-400">
                    Your lesson completion is saved. You may
                    continue to the quiz now or return later.
                  </p>

                  {savedMessage && (
                    <ProgressMessage
                      type="success"
                      title="Student Record Updated"
                      message={savedMessage}
                    />
                  )}

                  {progressError && (
                    <ProgressMessage
                      type="error"
                      title="Progress Warning"
                      message={progressError}
                    />
                  )}

                  {course.questions.length > 0 ? (
                    <Link
                      href={getCourseQuizRoute(
                        course.slug,
                      )}
                      className="mt-6 inline-block rounded-xl bg-emerald-600 px-8 py-4 font-bold text-white transition hover:bg-emerald-500"
                    >
                      Continue to Quiz →
                    </Link>
                  ) : (
                    <p className="mt-6 font-semibold text-zinc-500">
                      No quiz is currently assigned to this
                      course.
                    </p>
                  )}
                </>
              )}
            </section>

            <p className="mt-8 text-center text-sm leading-6 text-zinc-500">
              Educational content only. Follow current state
              and local protocols, medical-director
              guidance, service policy, and manufacturer
              instructions.
            </p>
          </CourseAccessGate>
        </div>
      </section>
    </main>
  );
}

function CourseStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-2 font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function ProgressMessage({
  type,
  title,
  message,
}: {
  type: "success" | "error";
  title: string;
  message: string;
}) {
  return (
    <div
      className={`mx-auto mt-5 max-w-2xl rounded-xl border p-4 text-left ${
        type === "success"
          ? "border-emerald-800 bg-emerald-950/20"
          : "border-red-700 bg-red-950/20"
      }`}
    >
      <p
        className={`font-bold ${
          type === "success"
            ? "text-emerald-400"
            : "text-red-400"
        }`}
      >
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-300">
        {message}
      </p>
    </div>
  );
}