"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import {
  getCourseProgress,
  hasCompletedRequiredTime,
} from "./ProgressService";

type QuizAccessGateProps = {
  courseSlug: string;
  courseTitle: string;
  children: ReactNode;
};

type GateStatus =
  | "loading"
  | "signed-out"
  | "locked"
  | "unlocked"
  | "error";

export default function QuizAccessGate({
  courseSlug,
  courseTitle,
  children,
}: QuizAccessGateProps) {
  const [status, setStatus] = useState<GateStatus>("loading");
  const [completedMinutes, setCompletedMinutes] = useState(0);
  const [requiredMinutes, setRequiredMinutes] = useState(60);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function checkAccess() {
      try {
        setStatus("loading");
        setErrorMessage("");

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw new Error(sessionError.message);
        }

        const user = session?.user ?? null;

        if (!user) {
          if (!cancelled) {
            setStatus("signed-out");
          }
          return;
        }

        const progress = await getCourseProgress(user.id, courseSlug);
        const hasRequiredTime = await hasCompletedRequiredTime(
          user.id,
          courseSlug,
        );

        if (cancelled) {
          return;
        }

        setCompletedMinutes(progress.completedMinutes);
        setRequiredMinutes(progress.requiredMinutes);
        setStatus(hasRequiredTime ? "unlocked" : "locked");
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("Unable to verify quiz access:", error);

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Quiz access could not be verified.",
        );

        setStatus("error");
      }
    }

    void checkAccess();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void checkAccess();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [courseSlug]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <section className="mx-auto max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

          <h1 className="mt-6 text-3xl font-extrabold">
            Checking Quiz Access
          </h1>

          <p className="mt-3 text-zinc-400">
            Verifying your course engagement record.
          </p>
        </section>
      </main>
    );
  }

  if (status === "signed-out") {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <section className="mx-auto max-w-2xl rounded-2xl border border-red-800 bg-red-950/20 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
            Sign In Required
          </p>

          <h1 className="mt-3 text-3xl font-extrabold">
            Log In Before Taking the Quiz
          </h1>

          <p className="mt-4 leading-7 text-zinc-300">
            You must be signed in so your required engagement time, quiz
            score, and certificate eligibility can be verified.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
            >
              Log In
            </Link>

            <Link
              href={`/courses/${courseSlug}`}
              className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Return to Course
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (status === "locked") {
    const remainingMinutes = Math.max(
      0,
      requiredMinutes - completedMinutes,
    );

    const progressPercent =
      requiredMinutes > 0
        ? Math.min(
            100,
            Math.floor((completedMinutes / requiredMinutes) * 100),
          )
        : 0;

    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <section className="mx-auto max-w-2xl rounded-2xl border border-red-800 bg-zinc-950 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
            Quiz Locked
          </p>

          <h1 className="mt-3 text-3xl font-extrabold">
            Complete the Required Course Time
          </h1>

          <p className="mt-4 leading-7 text-zinc-300">
            The {courseTitle} quiz will unlock after you complete the required
            active course-engagement time.
          </p>

          <div className="mt-7 rounded-xl border border-zinc-800 bg-black p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-zinc-300">
                Active course time
              </span>

              <span className="font-bold text-white">
                {completedMinutes} / {requiredMinutes} minutes
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-red-600 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="mt-4 text-sm text-zinc-400">
              {remainingMinutes} minute
              {remainingMinutes === 1 ? "" : "s"} remaining
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href={`/courses/${courseSlug}`}
              className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
            >
              Return to Course
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
            >
              View Dashboard
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <section className="mx-auto max-w-2xl rounded-2xl border border-red-800 bg-red-950/20 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
            Access Check Failed
          </p>

          <h1 className="mt-3 text-3xl font-extrabold">
            We Could Not Verify Quiz Access
          </h1>

          <p className="mt-4 leading-7 text-zinc-300">{errorMessage}</p>

          <Link
            href={`/courses/${courseSlug}`}
            className="mt-7 inline-block rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
          >
            Return to Course
          </Link>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}