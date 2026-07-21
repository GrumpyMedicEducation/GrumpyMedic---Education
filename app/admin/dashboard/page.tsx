"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase/client";

type Question = {
  id: string;
  title: string;
  category: string;
  created_at: string;
  solved: boolean;
  verified: boolean;
};

type DashboardStats = {
  totalQuestions: number;
  totalReplies: number;
  solvedQuestions: number;
  verifiedQuestions: number;
};

function formatDate(dateValue: string) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalQuestions: 0,
    totalReplies: 0,
    solvedQuestions: 0,
    verifiedQuestions: 0,
  });

  const [recentQuestions, setRecentQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setPageError("");

    const [
      questionsResult,
      repliesResult,
      solvedResult,
      verifiedResult,
      recentResult,
    ] = await Promise.all([
      supabase
        .from("questions")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("replies")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("questions")
        .select("*", { count: "exact", head: true })
        .eq("solved", true),

      supabase
        .from("questions")
        .select("*", { count: "exact", head: true })
        .eq("verified", true),

      supabase
        .from("questions")
        .select(
          "id, title, category, created_at, solved, verified",
        )
        .order("created_at", { ascending: false })
        .limit(8),
    ]);

    const firstError =
      questionsResult.error ||
      repliesResult.error ||
      solvedResult.error ||
      verifiedResult.error ||
      recentResult.error;

    if (firstError) {
      console.error(
        "Unable to load admin dashboard:",
        firstError,
      );

      setPageError(firstError.message);
      setLoading(false);
      return;
    }

    setStats({
      totalQuestions: questionsResult.count ?? 0,
      totalReplies: repliesResult.count ?? 0,
      solvedQuestions: solvedResult.count ?? 0,
      verifiedQuestions: verifiedResult.count ?? 0,
    });

    setRecentQuestions(
      (recentResult.data ?? []) as Question[],
    );

    setLoading(false);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const statCards = [
    {
      label: "Total Questions",
      value: stats.totalQuestions,
      description: "Questions submitted to the forum",
    },
    {
      label: "Total Replies",
      value: stats.totalReplies,
      description: "Replies posted by users",
    },
    {
      label: "Solved Questions",
      value: stats.solvedQuestions,
      description: "Questions marked as answered",
    },
    {
      label: "Verified Questions",
      value: stats.verifiedQuestions,
      description: "Questions with an official response",
    },
  ];

  return (
    <section>
      <div className="flex flex-col gap-5 border-b border-zinc-800 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Admin Dashboard
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-zinc-400">
            Review forum activity, monitor engagement, and
            manage Ask GrumpyMedic content.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDashboard}
          disabled={loading}
          className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Refreshing..."
            : "Refresh Dashboard"}
        </button>
      </div>

      {pageError && (
        <div className="mt-8 rounded-2xl border border-red-700 bg-red-950/30 p-6 text-red-200">
          <p className="font-bold">
            Unable to load dashboard
          </p>

          <p className="mt-2">{pageError}</p>

          <button
            type="button"
            onClick={loadDashboard}
            className="mt-5 rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-500"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
              {card.label}
            </p>

            <p className="mt-4 text-4xl font-extrabold text-white">
              {loading ? "—" : card.value}
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              {card.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_320px]">
        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="flex flex-col gap-4 border-b border-zinc-800 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-red-500">
                Forum Activity
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                Recent Questions
              </h2>
            </div>

            <Link
              href="/admin/questions"
              className="rounded-lg border border-red-700 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              Manage Questions
            </Link>
          </div>

          {loading ? (
            <div className="p-10 text-center text-zinc-400">
              Loading recent questions...
            </div>
          ) : recentQuestions.length === 0 ? (
            <div className="p-10 text-center text-zinc-400">
              No questions have been submitted yet.
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {recentQuestions.map((question) => (
                <article
                  key={question.id}
                  className="p-6 transition hover:bg-zinc-900/60"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-red-900 bg-red-950/30 px-3 py-1 text-xs font-bold text-red-400">
                          {question.category}
                        </span>

                        {question.verified && (
                          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                            Verified
                          </span>
                        )}

                        {question.solved && (
                          <span className="rounded-full border border-green-800 bg-green-950/30 px-3 py-1 text-xs font-bold text-green-400">
                            Solved
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 truncate text-lg font-bold">
                        {question.title}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-500">
                        Submitted{" "}
                        {formatDate(
                          question.created_at,
                        )}
                      </p>
                    </div>

                    <Link
                      href={`/ask-grumpymedic/question/${question.id}`}
                      className="shrink-0 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400"
                    >
                      View Discussion
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-red-500">
              Quick Actions
            </p>

            <div className="mt-5 space-y-3">
              <Link
                href="/admin/questions"
                className="block rounded-xl bg-red-600 px-4 py-3 text-center font-bold transition hover:bg-red-500"
              >
                Moderate Questions
              </Link>

              <Link
                href="/admin/replies"
                className="block rounded-xl border border-zinc-700 px-4 py-3 text-center font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400"
              >
                Moderate Replies
              </Link>

              <Link
                href="/ask-grumpymedic"
                className="block rounded-xl border border-zinc-700 px-4 py-3 text-center font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400"
              >
                Open Public Forum
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-green-800 bg-green-950/20 p-6">
            <p className="font-bold text-green-400">
              Admin access is protected
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              This area is restricted to the approved
              administrator account through Supabase
              authentication.
            </p>
          </section>
        </aside>
      </div>
    </section>
  );
}