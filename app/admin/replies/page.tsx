"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase/client";

type ReplyRow = {
  id: string;
  question_id: string;
  created_at: string;
  author: string;
  body: string;
  verified: boolean;
  best_answer: boolean;
};

type QuestionRow = {
  id: string;
  title: string;
  category: string;
};

type ModerationReply = ReplyRow & {
  questionTitle: string;
  questionCategory: string;
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

export default function AdminRepliesPage() {
  const [replies, setReplies] = useState<ModerationReply[]>(
    [],
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [loading, setLoading] = useState(true);

  const [workingReplyId, setWorkingReplyId] =
    useState("");

  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const loadReplies = useCallback(async () => {
    setLoading(true);
    setPageError("");
    setSuccessMessage("");

    const [repliesResult, questionsResult] =
      await Promise.all([
        supabase
          .from("replies")
          .select(
            `
              id,
              question_id,
              created_at,
              author,
              body,
              verified,
              best_answer
            `,
          )
          .order("best_answer", {
            ascending: false,
          })
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("questions")
          .select("id, title, category"),
      ]);

    const firstError =
      repliesResult.error || questionsResult.error;

    if (firstError) {
      console.error(
        "Unable to load replies for moderation:",
        firstError,
      );

      setPageError(
        firstError.message ||
          "The replies moderation page could not be loaded.",
      );

      setLoading(false);
      return;
    }

    const questionMap: Record<string, QuestionRow> =
      {};

    (
      (questionsResult.data ?? []) as QuestionRow[]
    ).forEach((question) => {
      questionMap[question.id] = question;
    });

    const formattedReplies: ModerationReply[] = (
      (repliesResult.data ?? []) as ReplyRow[]
    ).map((reply) => {
      const relatedQuestion =
        questionMap[reply.question_id];

      return {
        ...reply,
        questionTitle:
          relatedQuestion?.title ??
          "Question unavailable",
        questionCategory:
          relatedQuestion?.category ??
          "Uncategorized",
      };
    });

    setReplies(formattedReplies);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadReplies();
  }, [loadReplies]);

  const filteredReplies = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return replies.filter((reply) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        reply.author
          .toLowerCase()
          .includes(normalizedSearch) ||
        reply.body
          .toLowerCase()
          .includes(normalizedSearch) ||
        reply.questionTitle
          .toLowerCase()
          .includes(normalizedSearch) ||
        reply.questionCategory
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "verified" &&
          reply.verified) ||
        (statusFilter === "unverified" &&
          !reply.verified) ||
        (statusFilter === "best" &&
          reply.best_answer);

      return matchesSearch && matchesStatus;
    });
  }, [replies, searchTerm, statusFilter]);

  function clearMessages() {
    setPageError("");
    setSuccessMessage("");
  }

  async function toggleVerified(
    reply: ModerationReply,
  ) {
    clearMessages();
    setWorkingReplyId(reply.id);

    const newVerifiedValue = !reply.verified;

    const { error } = await supabase
      .from("replies")
      .update({
        verified: newVerifiedValue,
      })
      .eq("id", reply.id);

    if (error) {
      console.error(
        "Unable to update reply verification:",
        error,
      );

      setPageError(
        `Reply verification could not be updated: ${error.message}`,
      );

      setWorkingReplyId("");
      return;
    }

    setReplies((currentReplies) =>
      currentReplies.map((currentReply) =>
        currentReply.id === reply.id
          ? {
              ...currentReply,
              verified: newVerifiedValue,
            }
          : currentReply,
      ),
    );

    setSuccessMessage(
      newVerifiedValue
        ? `The reply from ${reply.author} is now marked as an official GrumpyMedic response.`
        : `Official-response status was removed from the reply by ${reply.author}.`,
    );

    setWorkingReplyId("");
  }

  async function toggleBestAnswer(
    reply: ModerationReply,
  ) {
    clearMessages();
    setWorkingReplyId(reply.id);

    if (reply.best_answer) {
      const { error } = await supabase
        .from("replies")
        .update({
          best_answer: false,
        })
        .eq("id", reply.id);

      if (error) {
        console.error(
          "Unable to remove Best Answer status:",
          error,
        );

        setPageError(
          `Best Answer status could not be removed: ${error.message}`,
        );

        setWorkingReplyId("");
        return;
      }

      setReplies((currentReplies) =>
        currentReplies.map((currentReply) =>
          currentReply.id === reply.id
            ? {
                ...currentReply,
                best_answer: false,
              }
            : currentReply,
        ),
      );

      setSuccessMessage(
        `Best Answer status was removed from the reply by ${reply.author}.`,
      );

      setWorkingReplyId("");
      return;
    }

    const { error: removeExistingError } =
      await supabase
        .from("replies")
        .update({
          best_answer: false,
        })
        .eq("question_id", reply.question_id)
        .eq("best_answer", true);

    if (removeExistingError) {
      console.error(
        "Unable to clear the previous Best Answer:",
        removeExistingError,
      );

      setPageError(
        `The previous Best Answer could not be cleared: ${removeExistingError.message}`,
      );

      setWorkingReplyId("");
      return;
    }

    const { error: bestAnswerError } =
      await supabase
        .from("replies")
        .update({
          best_answer: true,
          verified: true,
        })
        .eq("id", reply.id);

    if (bestAnswerError) {
      console.error(
        "Unable to mark Best Answer:",
        bestAnswerError,
      );

      setPageError(
        `The reply could not be marked as Best Answer: ${bestAnswerError.message}`,
      );

      setWorkingReplyId("");
      return;
    }

    const { error: questionError } = await supabase
      .from("questions")
      .update({
        solved: true,
        verified: true,
      })
      .eq("id", reply.question_id);

    if (questionError) {
      console.error(
        "Unable to mark the question solved:",
        questionError,
      );

      setPageError(
        `The reply was marked as Best Answer, but the question could not be marked solved: ${questionError.message}`,
      );

      setWorkingReplyId("");
      await loadReplies();
      return;
    }

    setReplies((currentReplies) =>
      currentReplies.map((currentReply) => {
        if (
          currentReply.question_id !==
          reply.question_id
        ) {
          return currentReply;
        }

        if (currentReply.id === reply.id) {
          return {
            ...currentReply,
            best_answer: true,
            verified: true,
          };
        }

        return {
          ...currentReply,
          best_answer: false,
        };
      }),
    );

    setSuccessMessage(
      `The reply from ${reply.author} is now the Best Answer. The related question was also marked solved.`,
    );

    setWorkingReplyId("");
  }

  async function deleteReply(
    reply: ModerationReply,
  ) {
    const confirmed = window.confirm(
      `Delete this reply from ${reply.author}?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    clearMessages();
    setWorkingReplyId(reply.id);

    const { error } = await supabase
      .from("replies")
      .delete()
      .eq("id", reply.id);

    if (error) {
      console.error(
        "Unable to delete reply:",
        error,
      );

      setPageError(
        `The reply could not be deleted: ${error.message}`,
      );

      setWorkingReplyId("");
      return;
    }

    setReplies((currentReplies) =>
      currentReplies.filter(
        (currentReply) =>
          currentReply.id !== reply.id,
      ),
    );

    setSuccessMessage(
      `The reply from ${reply.author} was deleted.`,
    );

    setWorkingReplyId("");
  }

  return (
    <section>
      <div className="flex flex-col gap-5 border-b border-zinc-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">
            Ask GrumpyMedic
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Reply Moderation
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
            Review replies, select Best Answers, mark
            official GrumpyMedic responses, and remove
            inappropriate content.
          </p>
        </div>

        <button
          type="button"
          onClick={loadReplies}
          disabled={loading}
          className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Refreshing..."
            : "Refresh Replies"}
        </button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div>
          <label
            htmlFor="adminReplySearch"
            className="sr-only"
          >
            Search replies
          </label>

          <input
            id="adminReplySearch"
            type="search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search replies, authors, questions, or categories..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600"
          />
        </div>

        <div>
          <label
            htmlFor="replyStatusFilter"
            className="sr-only"
          >
            Filter replies
          </label>

          <select
            id="replyStatusFilter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none transition focus:border-red-600"
          >
            <option value="all">All Replies</option>

            <option value="best">
              Best Answers
            </option>

            <option value="verified">
              Official Responses
            </option>

            <option value="unverified">
              Community Replies
            </option>
          </select>
        </div>
      </div>

      {pageError && (
        <div className="mt-6 rounded-2xl border border-red-700 bg-red-950/30 p-5 text-red-200">
          <p className="font-bold">
            Moderation Error
          </p>

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
              Loading replies...
            </p>
          </div>
        ) : filteredReplies.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-12 text-center">
            <h2 className="text-2xl font-extrabold">
              No Replies Found
            </h2>

            <p className="mt-3 text-zinc-400">
              No replies match the current search and
              filter.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReplies.map((reply) => {
              const isWorking =
                workingReplyId === reply.id;

              return (
                <article
                  key={reply.id}
                  className={`rounded-2xl border p-6 ${
                    reply.best_answer
                      ? "border-green-700 bg-green-950/10"
                      : "border-zinc-800 bg-zinc-950"
                  }`}
                >
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-red-900 bg-red-950/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-400">
                          {reply.questionCategory}
                        </span>

                        {reply.best_answer && (
                          <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                            Best Answer
                          </span>
                        )}

                        {reply.verified ? (
                          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                            Official GrumpyMedic Response
                          </span>
                        ) : (
                          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-400">
                            Community Reply
                          </span>
                        )}
                      </div>

                      <p className="mt-4 text-sm font-bold uppercase tracking-wide text-zinc-500">
                        Reply to
                      </p>

                      <h2 className="mt-2 text-2xl font-extrabold">
                        {reply.questionTitle}
                      </h2>

                      <div className="mt-5 rounded-xl border border-zinc-800 bg-black p-5">
                        <p className="whitespace-pre-wrap leading-7 text-zinc-300">
                          {reply.body}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500">
                        <span>
                          Reply by{" "}
                          <strong className="text-zinc-300">
                            {reply.author}
                          </strong>
                        </span>

                        <span>
                          {formatDate(
                            reply.created_at,
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="grid shrink-0 gap-3 sm:grid-cols-2 xl:w-72 xl:grid-cols-1">
                      <Link
                        href={`/ask-grumpymedic/question/${reply.question_id}`}
                        className="rounded-xl border border-zinc-700 px-4 py-3 text-center text-sm font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400"
                      >
                        View Discussion
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          toggleBestAnswer(reply)
                        }
                        disabled={isWorking}
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          reply.best_answer
                            ? "border border-green-700 bg-green-950/30 text-green-300 hover:bg-green-950/60"
                            : "bg-green-600 text-white hover:bg-green-500"
                        }`}
                      >
                        {reply.best_answer
                          ? "Remove Best Answer"
                          : "Mark Best Answer"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toggleVerified(reply)
                        }
                        disabled={isWorking}
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          reply.verified
                            ? "border border-red-700 bg-red-950/30 text-red-300 hover:bg-red-950/60"
                            : "bg-red-600 text-white hover:bg-red-500"
                        }`}
                      >
                        {reply.verified
                          ? "Remove Official Status"
                          : "Mark Official Response"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteReply(reply)
                        }
                        disabled={isWorking}
                        className="rounded-xl border border-red-900 px-4 py-3 text-sm font-bold text-red-400 transition hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isWorking
                          ? "Working..."
                          : "Delete Reply"}
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