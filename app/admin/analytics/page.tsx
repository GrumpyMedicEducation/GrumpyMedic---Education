"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "../../../lib/supabase/client";

type QuestionRow = {
  id: string;
  created_at: string;
  category: string;
  solved: boolean;
  verified: boolean;
};

type ReplyRow = {
  id: string;
  question_id: string;
  created_at: string;
  verified: boolean;
};

type CategoryStat = {
  category: string;
  questions: number;
  replies: number;
};

type DailyActivity = {
  date: string;
  label: string;
  questions: number;
  replies: number;
};

type AnalyticsSummary = {
  totalQuestions: number;
  totalReplies: number;
  solvedQuestions: number;
  verifiedQuestions: number;
  verifiedReplies: number;
  unansweredQuestions: number;
  averageRepliesPerQuestion: number;
  solvedRate: number;
};

const initialSummary: AnalyticsSummary = {
  totalQuestions: 0,
  totalReplies: 0,
  solvedQuestions: 0,
  verifiedQuestions: 0,
  verifiedReplies: 0,
  unansweredQuestions: 0,
  averageRepliesPerQuestion: 0,
  solvedRate: 0,
};

function getDateKey(dateValue: string) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(
    2,
    "0",
  );
  const day = String(date.getDate()).padStart(
    2,
    "0",
  );

  return `${year}-${month}-${day}`;
}

function formatShortDate(dateValue: string) {
  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function createRecentDateKeys(numberOfDays: number) {
  const dates: string[] = [];

  for (
    let dayOffset = numberOfDays - 1;
    dayOffset >= 0;
    dayOffset -= 1
  ) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - dayOffset);

    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1,
    ).padStart(2, "0");
    const day = String(date.getDate()).padStart(
      2,
      "0",
    );

    dates.push(`${year}-${month}-${day}`);
  }

  return dates;
}

function percentage(
  part: number,
  total: number,
) {
  if (total <= 0) {
    return 0;
  }

  return Math.round((part / total) * 100);
}

export default function AdminAnalyticsPage() {
  const [questions, setQuestions] = useState<
    QuestionRow[]
  >([]);
  const [replies, setReplies] = useState<ReplyRow[]>(
    [],
  );

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [activityDays, setActivityDays] = useState(14);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setPageError("");

    const [questionsResult, repliesResult] =
      await Promise.all([
        supabase
          .from("questions")
          .select(
            `
              id,
              created_at,
              category,
              solved,
              verified
            `,
          )
          .order("created_at", {
            ascending: true,
          }),

        supabase
          .from("replies")
          .select(
            `
              id,
              question_id,
              created_at,
              verified
            `,
          )
          .order("created_at", {
            ascending: true,
          }),
      ]);

    const firstError =
      questionsResult.error || repliesResult.error;

    if (firstError) {
      console.error(
        "Unable to load analytics:",
        firstError,
      );

      setPageError(
        firstError.message ||
          "Analytics could not be loaded.",
      );

      setLoading(false);
      return;
    }

    setQuestions(
      (questionsResult.data ?? []) as QuestionRow[],
    );

    setReplies(
      (repliesResult.data ?? []) as ReplyRow[],
    );

    setLoading(false);
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const replyCountByQuestion = useMemo(() => {
    const counts: Record<string, number> = {};

    replies.forEach((reply) => {
      counts[reply.question_id] =
        (counts[reply.question_id] ?? 0) + 1;
    });

    return counts;
  }, [replies]);

  const summary = useMemo<AnalyticsSummary>(() => {
    if (questions.length === 0) {
      return {
        ...initialSummary,
        totalReplies: replies.length,
        verifiedReplies: replies.filter(
          (reply) => reply.verified,
        ).length,
      };
    }

    const solvedQuestions = questions.filter(
      (question) => question.solved,
    ).length;

    const verifiedQuestions = questions.filter(
      (question) => question.verified,
    ).length;

    const verifiedReplies = replies.filter(
      (reply) => reply.verified,
    ).length;

    const unansweredQuestions = questions.filter(
      (question) =>
        (replyCountByQuestion[question.id] ?? 0) === 0,
    ).length;

    return {
      totalQuestions: questions.length,
      totalReplies: replies.length,
      solvedQuestions,
      verifiedQuestions,
      verifiedReplies,
      unansweredQuestions,
      averageRepliesPerQuestion:
        questions.length > 0
          ? replies.length / questions.length
          : 0,
      solvedRate: percentage(
        solvedQuestions,
        questions.length,
      ),
    };
  }, [
    questions,
    replies,
    replyCountByQuestion,
  ]);

  const categoryStats = useMemo<CategoryStat[]>(() => {
    const stats: Record<string, CategoryStat> = {};
    const questionCategoryMap: Record<
      string,
      string
    > = {};

    questions.forEach((question) => {
      const category =
        question.category?.trim() ||
        "Uncategorized";

      questionCategoryMap[question.id] = category;

      if (!stats[category]) {
        stats[category] = {
          category,
          questions: 0,
          replies: 0,
        };
      }

      stats[category].questions += 1;
    });

    replies.forEach((reply) => {
      const category =
        questionCategoryMap[reply.question_id] ??
        "Question Removed";

      if (!stats[category]) {
        stats[category] = {
          category,
          questions: 0,
          replies: 0,
        };
      }

      stats[category].replies += 1;
    });

    return Object.values(stats).sort(
      (firstCategory, secondCategory) => {
        if (
          secondCategory.questions !==
          firstCategory.questions
        ) {
          return (
            secondCategory.questions -
            firstCategory.questions
          );
        }

        return (
          secondCategory.replies -
          firstCategory.replies
        );
      },
    );
  }, [questions, replies]);

  const dailyActivity = useMemo<
    DailyActivity[]
  >(() => {
    const recentDates =
      createRecentDateKeys(activityDays);

    const activityMap: Record<
      string,
      DailyActivity
    > = {};

    recentDates.forEach((date) => {
      activityMap[date] = {
        date,
        label: formatShortDate(date),
        questions: 0,
        replies: 0,
      };
    });

    questions.forEach((question) => {
      const dateKey = getDateKey(
        question.created_at,
      );

      if (activityMap[dateKey]) {
        activityMap[dateKey].questions += 1;
      }
    });

    replies.forEach((reply) => {
      const dateKey = getDateKey(
        reply.created_at,
      );

      if (activityMap[dateKey]) {
        activityMap[dateKey].replies += 1;
      }
    });

    return recentDates.map(
      (date) => activityMap[date],
    );
  }, [questions, replies, activityDays]);

  const maximumDailyActivity = useMemo(() => {
    const values = dailyActivity.flatMap(
      (activity) => [
        activity.questions,
        activity.replies,
      ],
    );

    return Math.max(1, ...values);
  }, [dailyActivity]);

  const maximumCategoryQuestions = useMemo(
    () =>
      Math.max(
        1,
        ...categoryStats.map(
          (category) => category.questions,
        ),
      ),
    [categoryStats],
  );

  const recentTotals = useMemo(() => {
    return dailyActivity.reduce(
      (totals, activity) => ({
        questions:
          totals.questions + activity.questions,
        replies: totals.replies + activity.replies,
      }),
      {
        questions: 0,
        replies: 0,
      },
    );
  }, [dailyActivity]);

  const engagementRate = percentage(
    summary.totalQuestions -
      summary.unansweredQuestions,
    summary.totalQuestions,
  );

  const officialResponseRate = percentage(
    summary.verifiedReplies,
    summary.totalReplies,
  );

  const statusCards = [
    {
      label: "Total Questions",
      value: summary.totalQuestions,
      description:
        "Questions submitted to Ask GrumpyMedic",
    },
    {
      label: "Total Replies",
      value: summary.totalReplies,
      description:
        "Community and official responses",
    },
    {
      label: "Solved Rate",
      value: `${summary.solvedRate}%`,
      description: `${summary.solvedQuestions} questions marked solved`,
    },
    {
      label: "Average Replies",
      value:
        summary.averageRepliesPerQuestion.toFixed(
          1,
        ),
      description: "Average replies per question",
    },
  ];

  return (
    <section>
      <div className="flex flex-col gap-5 border-b border-zinc-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">
            Performance Overview
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Analytics
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
            Review Ask GrumpyMedic activity,
            engagement, response rates, category
            popularity, and recent forum growth.
          </p>
        </div>

        <button
          type="button"
          onClick={loadAnalytics}
          disabled={loading}
          className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Refreshing..."
            : "Refresh Analytics"}
        </button>
      </div>

      {pageError && (
        <div className="mt-6 rounded-2xl border border-red-700 bg-red-950/30 p-5 text-red-200">
          <p className="font-bold">
            Analytics Error
          </p>

          <p className="mt-2">{pageError}</p>
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statusCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
              {card.label}
            </p>

            <p className="mt-4 text-4xl font-extrabold">
              {loading ? "—" : card.value}
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              {card.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-red-500">
            Engagement
          </p>

          <div className="mt-5 flex items-end justify-between">
            <p className="text-4xl font-extrabold">
              {loading ? "—" : `${engagementRate}%`}
            </p>

            <p className="text-sm text-zinc-500">
              Questions with replies
            </p>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-red-600 transition-all"
              style={{
                width: `${engagementRate}%`,
              }}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-500">
            {summary.unansweredQuestions} unanswered{" "}
            {summary.unansweredQuestions === 1
              ? "question"
              : "questions"}
          </p>
        </article>

        <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-green-500">
            Solved Discussions
          </p>

          <div className="mt-5 flex items-end justify-between">
            <p className="text-4xl font-extrabold">
              {loading
                ? "—"
                : `${summary.solvedRate}%`}
            </p>

            <p className="text-sm text-zinc-500">
              Marked solved
            </p>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-green-600 transition-all"
              style={{
                width: `${summary.solvedRate}%`,
              }}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-500">
            {summary.solvedQuestions} of{" "}
            {summary.totalQuestions} questions are
            solved
          </p>
        </article>

        <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-yellow-500">
            Official Responses
          </p>

          <div className="mt-5 flex items-end justify-between">
            <p className="text-4xl font-extrabold">
              {loading
                ? "—"
                : `${officialResponseRate}%`}
            </p>

            <p className="text-sm text-zinc-500">
              Verified replies
            </p>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-yellow-500 transition-all"
              style={{
                width: `${officialResponseRate}%`,
              }}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-500">
            {summary.verifiedReplies} official{" "}
            {summary.verifiedReplies === 1
              ? "response"
              : "responses"}
          </p>
        </article>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_380px]">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex flex-col gap-4 border-b border-zinc-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-red-500">
                Forum Activity
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                Recent Activity
              </h2>
            </div>

            <select
              value={activityDays}
              onChange={(event) =>
                setActivityDays(
                  Number(event.target.value),
                )
              }
              className="rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm font-bold text-white outline-none focus:border-red-600"
            >
              <option value={7}>Last 7 Days</option>
              <option value={14}>
                Last 14 Days
              </option>
              <option value={30}>
                Last 30 Days
              </option>
            </select>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-800 bg-black p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-600">
                New Questions
              </p>

              <p className="mt-2 text-3xl font-extrabold">
                {loading
                  ? "—"
                  : recentTotals.questions}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-black p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-600">
                New Replies
              </p>

              <p className="mt-2 text-3xl font-extrabold">
                {loading
                  ? "—"
                  : recentTotals.replies}
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <div
              className="grid min-w-[700px] items-end gap-3"
              style={{
                gridTemplateColumns: `repeat(${dailyActivity.length}, minmax(28px, 1fr))`,
              }}
            >
              {dailyActivity.map((activity) => {
                const questionHeight =
                  (activity.questions /
                    maximumDailyActivity) *
                  180;

                const replyHeight =
                  (activity.replies /
                    maximumDailyActivity) *
                  180;

                return (
                  <div
                    key={activity.date}
                    className="flex flex-col items-center"
                  >
                    <div className="flex h-48 items-end gap-1">
                      <div
                        title={`${activity.questions} questions`}
                        className="w-3 rounded-t bg-red-600 transition-all"
                        style={{
                          height: `${Math.max(
                            activity.questions > 0
                              ? 8
                              : 0,
                            questionHeight,
                          )}px`,
                        }}
                      />

                      <div
                        title={`${activity.replies} replies`}
                        className="w-3 rounded-t bg-zinc-500 transition-all"
                        style={{
                          height: `${Math.max(
                            activity.replies > 0
                              ? 8
                              : 0,
                            replyHeight,
                          )}px`,
                        }}
                      />
                    </div>

                    <p className="mt-3 rotate-[-45deg] whitespace-nowrap text-xs text-zinc-600">
                      {activity.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-5 border-t border-zinc-800 pt-5 text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-red-600" />
              Questions
            </span>

            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-zinc-500" />
              Replies
            </span>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-red-500">
              Moderation Summary
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black p-4">
                <span className="text-zinc-400">
                  Verified Questions
                </span>

                <strong className="text-xl">
                  {summary.verifiedQuestions}
                </strong>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black p-4">
                <span className="text-zinc-400">
                  Verified Replies
                </span>

                <strong className="text-xl">
                  {summary.verifiedReplies}
                </strong>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black p-4">
                <span className="text-zinc-400">
                  Unanswered Questions
                </span>

                <strong className="text-xl">
                  {summary.unansweredQuestions}
                </strong>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black p-4">
                <span className="text-zinc-400">
                  Open Questions
                </span>

                <strong className="text-xl">
                  {Math.max(
                    0,
                    summary.totalQuestions -
                      summary.solvedQuestions,
                  )}
                </strong>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-red-500">
              Most Active Category
            </p>

            {categoryStats.length > 0 ? (
              <>
                <h3 className="mt-4 text-2xl font-extrabold">
                  {categoryStats[0].category}
                </h3>

                <p className="mt-3 text-zinc-400">
                  {categoryStats[0].questions}{" "}
                  {categoryStats[0].questions === 1
                    ? "question"
                    : "questions"}{" "}
                  and {categoryStats[0].replies}{" "}
                  {categoryStats[0].replies === 1
                    ? "reply"
                    : "replies"}
                </p>
              </>
            ) : (
              <p className="mt-4 text-zinc-500">
                No category activity yet.
              </p>
            )}
          </section>
        </aside>
      </div>

      <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950">
        <div className="border-b border-zinc-800 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-red-500">
            Category Performance
          </p>

          <h2 className="mt-2 text-2xl font-extrabold">
            Questions by Category
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-zinc-400">
            Loading category analytics...
          </div>
        ) : categoryStats.length === 0 ? (
          <div className="p-12 text-center text-zinc-400">
            No category activity has been recorded.
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {categoryStats.map((category) => {
              const barWidth =
                (category.questions /
                  maximumCategoryQuestions) *
                100;

              return (
                <article
                  key={category.category}
                  className="p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold">
                        {category.category}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        {category.questions}{" "}
                        {category.questions === 1
                          ? "question"
                          : "questions"}{" "}
                        • {category.replies}{" "}
                        {category.replies === 1
                          ? "reply"
                          : "replies"}
                      </p>
                    </div>

                    <div className="w-full sm:max-w-md">
                      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full rounded-full bg-red-600"
                          style={{
                            width: `${barWidth}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
}