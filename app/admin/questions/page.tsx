"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase/client";

type Question = {
  id: string;
  created_at: string;
  author: string;
  title: string;
  body: string;
  category: string;
  anonymous: boolean;
  verified: boolean;
  solved: boolean;
  replyCount: number;
};

type QuestionRow = {
  id: string;
  created_at: string;
  author: string;
  title: string;
  body: string;
  category: string;
  anonymous: boolean;
  verified: boolean;
  solved: boolean;
};

type ReplyRow = {
  question_id: string;
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
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [workingQuestionId, setWorkingQuestionId] = useState("");
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    setPageError("");

    const [questionsResult, repliesResult] = await Promise.all([
      supabase
        .from("questions")
        .select(
          `
            id,
            created_at,
            author,
            title,
            body,
            category,
            anonymous,
            verified,
            solved
          `,
        )
        .order("created_at", { ascending: false }),

      supabase.from("replies").select("question_id"),
    ]);

    const firstError =
      questionsResult.error || repliesResult.error;

    if (firstError) {
      console.error(
        "Unable to load questions for moderation:",
        firstError,
      );

      setPageError(
        firstError.message ||
          "The moderation page could not be loaded.",
      );

      setLoading(false);
      return;
    }

    const replyCounts: Record<string, number> = {};

    ((repliesResult.data ?? []) as ReplyRow[]).forEach(
      (reply) => {
        replyCounts[reply.question_id] =
          (replyCounts[reply.question_id] ?? 0) + 1;
      },
    );

    const formattedQuestions: Question[] = (
      (questionsResult.data ?? []) as QuestionRow[]
    ).map((question) => ({
      ...question,
      author: question.anonymous
        ? "Anonymous"
        : question.author,
      replyCount: replyCounts[question.id] ?? 0,
    }));

    setQuestions(formattedQuestions);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const filteredQuestions = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return questions.filter((question) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        question.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        question.body
          .toLowerCase()
          .includes(normalizedSearch) ||
        question.category
          .toLowerCase()
          .includes(normalizedSearch) ||
        question.author
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "open" &&
          !question.solved &&
          !question.verified) ||
        (statusFilter === "solved" &&
          question.solved) ||
        (statusFilter === "verified" &&
          question.verified);

      return matchesSearch && matchesStatus;
    });
  }, [questions, searchTerm, statusFilter]);

  function clearMessages() {
    setPageError("");
    setSuccessMessage("");
  }

  async function toggleVerified(question: Question) {
    clearMessages();
    setWorkingQuestionId(question.id);

    const newVerifiedValue = !question.verified;

    const { error } = await supabase
      .from("questions")
      .update({
        verified: newVerifiedValue,
      })
      .eq("id", question.id);

    if (error) {
      console.error(
        "Unable to update verified status:",
        error,
      );

      setPageError(
        `Verified status could not be updated: ${error.message}`,
      );

      setWorkingQuestionId("");
      return;
    }

    setQuestions((currentQuestions) =>
      currentQuestions.map((currentQuestion) =>
        currentQuestion.id === question.id
          ? {
              ...currentQuestion,
              verified: newVerifiedValue,
            }
          : currentQuestion,
      ),
    );

    setSuccessMessage(
      newVerifiedValue
        ? `"${question.title}" is now marked as verified.`
        : `Verified status was removed from "${question.title}".`,
    );

    setWorkingQuestionId("");
  }

  async function toggleSolved(question: Question) {
    clearMessages();
    setWorkingQuestionId(question.id);

    const newSolvedValue = !question.solved;

    const { error } = await supabase
      .from("questions")
      .update({
        solved: newSolvedValue,
      })
      .eq("id", question.id);

    if (error) {
      console.error(
        "Unable to update solved status:",
        error,
      );

      setPageError(
        `Solved status could not be updated: ${error.message}`,
      );

      setWorkingQuestionId("");
      return;
    }

    setQuestions((currentQuestions) =>
      currentQuestions.map((currentQuestion) =>
        currentQuestion.id === question.id
          ? {
              ...currentQuestion,
              solved: newSolvedValue,
            }
          : currentQuestion,
      ),
    );

    setSuccessMessage(
      newSolvedValue
        ? `"${question.title}" is now marked as solved.`
        : `Solved status was removed from "${question.title}".`,
    );

    setWorkingQuestionId("");
  }

  async function deleteQuestion(question: Question) {
    const confirmed = window.confirm(
      `Delete "${question.title}"?\n\nThis will permanently remove the question. Associated replies may also need to be deleted depending on your Supabase relationship settings.`,
    );

    if (!confirmed) {
      return;
    }

    clearMessages();
    setWorkingQuestionId(question.id);

    const { error: replyDeleteError } = await supabase
      .from("replies")
      .delete()
      .eq("question_id", question.id);

    if (replyDeleteError) {
      console.error(
        "Unable to delete associated replies:",
        replyDeleteError,
      );

      setPageError(
        `The replies could not be deleted: ${replyDeleteError.message}`,
      );

      setWorkingQuestionId("");
      return;
    }

    const { error: questionDeleteError } = await supabase
      .from("questions")
      .delete()
      .eq("id", question.id);

    if (questionDeleteError) {
      console.error(
        "Unable to delete question:",
        questionDeleteError,
      );

      setPageError(
        `The question could not be deleted: ${questionDeleteError.message}`,
      );

      setWorkingQuestionId("");
      return;
    }

    setQuestions((currentQuestions) =>
      currentQuestions.filter(
        (currentQuestion) =>
          currentQuestion.id !== question.id,
      ),
    );

    setSuccessMessage(
      `"${question.title}" was deleted.`,
    );

    setWorkingQuestionId("");
  }

  return (
    <section>
      <div className="flex flex-col gap-5 border-b border-zinc-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">
            Ask GrumpyMedic
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Question Moderation
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
            Review submitted questions, mark official
            responses, identify solved discussions, and
            remove inappropriate content.
          </p>
        </div>

        <button
          type="button"
          onClick={loadQuestions}
          disabled={loading}
          className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh Questions"}
        </button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div>
          <label
            htmlFor="adminQuestionSearch"
            className="sr-only"
          >
            Search questions
          </label>

          <input
            id="adminQuestionSearch"
            type="search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search questions, authors, categories, or keywords..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600"
          />
        </div>

        <div>
          <label
            htmlFor="questionStatusFilter"
            className="sr-only"
          >
            Filter questions by status
          </label>

          <select
            id="questionStatusFilter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none transition focus:border-red-600"
          >
            <option value="all">All Questions</option>
            <option value="open">Open Questions</option>
            <option value="solved">Solved Questions</option>
            <option value="verified">
              Verified Questions
            </option>
          </select>
        </div>
      </div>

      {pageError && (
        <div className="mt-6 rounded-2xl border border-red-700 bg-red-950/30 p-5 text-red-200">
          <p className="font-bold">Moderation Error</p>
          <p className="mt-2">{pageError}</p>
        </div>
      )}

      {successMessage && (
        <div className="mt-6 rounded-2xl border border-green-800 bg-green-950/30 p-5 text-green-300">
          {successMessage}
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-12 text-center">
            <p className="text-lg font-bold">
              Loading questions...
            </p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-12 text-center">
            <h2 className="text-2xl font-extrabold">
              No Questions Found
            </h2>

            <p className="mt-3 text-zinc-400">
              No questions match the current search and
              filter.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((question) => {
              const isWorking =
                workingQuestionId === question.id;

              return (
                <article
                  key={question.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
                >
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-red-900 bg-red-950/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-400">
                          {question.category}
                        </span>

                        {question.verified && (
                          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                            Verified
                          </span>
                        )}

                        {question.solved && (
                          <span className="rounded-full border border-green-800 bg-green-950/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-400">
                            Solved
                          </span>
                        )}

                        {!question.verified &&
                          !question.solved && (
                            <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-400">
                              Open
                            </span>
                          )}
                      </div>

                      <h2 className="mt-4 text-2xl font-extrabold">
                        {question.title}
                      </h2>

                      <p className="mt-4 whitespace-pre-wrap leading-7 text-zinc-300">
                        {question.body}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
                        <span>
                          Asked by{" "}
                          <strong className="text-zinc-300">
                            {question.author}
                          </strong>
                        </span>

                        <span>
                          {formatDate(question.created_at)}
                        </span>

                        <span>
                          {question.replyCount}{" "}
                          {question.replyCount === 1
                            ? "reply"
                            : "replies"}
                        </span>
                      </div>
                    </div>

                    <div className="grid shrink-0 gap-3 sm:grid-cols-2 xl:w-64 xl:grid-cols-1">
                      <Link
                        href={`/ask-grumpymedic/question/${question.id}`}
                        className="rounded-xl border border-zinc-700 px-4 py-3 text-center text-sm font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400"
                      >
                        View Discussion
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          toggleVerified(question)
                        }
                        disabled={isWorking}
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          question.verified
                            ? "border border-red-700 bg-red-950/30 text-red-300 hover:bg-red-950/60"
                            : "bg-red-600 text-white hover:bg-red-500"
                        }`}
                      >
                        {question.verified
                          ? "Remove Verified"
                          : "Mark Verified"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toggleSolved(question)
                        }
                        disabled={isWorking}
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          question.solved
                            ? "border border-green-800 bg-green-950/30 text-green-300 hover:bg-green-950/60"
                            : "border border-zinc-700 text-zinc-300 hover:border-green-700 hover:text-green-400"
                        }`}
                      >
                        {question.solved
                          ? "Reopen Question"
                          : "Mark Solved"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteQuestion(question)
                        }
                        disabled={isWorking}
                        className="rounded-xl border border-red-900 px-4 py-3 text-sm font-bold text-red-400 transition hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isWorking
                          ? "Working..."
                          : "Delete Question"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}