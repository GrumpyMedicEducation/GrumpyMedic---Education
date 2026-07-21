"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { supabase } from "../../../../lib/supabase/client";

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
};

type Reply = {
  id: string;
  question_id: string;
  created_at: string;
  author: string;
  body: string;
  verified: boolean;
  best_answer: boolean;
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

export default function QuestionDiscussionPage() {
  const params = useParams();

  const questionId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [question, setQuestion] =
    useState<Question | null>(null);

  const [replies, setReplies] = useState<Reply[]>([]);

  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyBody, setReplyBody] = useState("");

  const [loading, setLoading] = useState(true);
  const [submittingReply, setSubmittingReply] =
    useState(false);

  const [pageError, setPageError] = useState("");
  const [replyError, setReplyError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const loadDiscussion = useCallback(async () => {
    if (!questionId) {
      setPageError("The discussion ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setPageError("");

    const [questionResult, repliesResult] =
      await Promise.all([
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
          .eq("id", questionId)
          .single(),

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
          .eq("question_id", questionId)
          .order("created_at", {
            ascending: true,
          }),
      ]);

    if (questionResult.error) {
      console.error(
        "Unable to load question:",
        questionResult.error,
      );

      setPageError(
        questionResult.error.message ||
          "The question could not be loaded.",
      );

      setLoading(false);
      return;
    }

    if (repliesResult.error) {
      console.error(
        "Unable to load replies:",
        repliesResult.error,
      );

      setPageError(
        repliesResult.error.message ||
          "The replies could not be loaded.",
      );

      setLoading(false);
      return;
    }

    setQuestion(questionResult.data as Question);

    setReplies((repliesResult.data ?? []) as Reply[]);

    setLoading(false);
  }, [questionId]);

  useEffect(() => {
    loadDiscussion();
  }, [loadDiscussion]);

  const sortedReplies = useMemo(() => {
    return [...replies].sort((firstReply, secondReply) => {
      if (
        firstReply.best_answer !==
        secondReply.best_answer
      ) {
        return firstReply.best_answer ? -1 : 1;
      }

      if (
        firstReply.verified !== secondReply.verified
      ) {
        return firstReply.verified ? -1 : 1;
      }

      return (
        new Date(firstReply.created_at).getTime() -
        new Date(secondReply.created_at).getTime()
      );
    });
  }, [replies]);

  async function submitReply(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setReplyError("");
    setSuccessMessage("");

    if (!questionId) {
      setReplyError(
        "The reply could not be submitted because the question ID is missing.",
      );
      return;
    }

    if (!replyAuthor.trim()) {
      setReplyError(
        "Please enter your name or display name.",
      );
      return;
    }

    if (!replyBody.trim()) {
      setReplyError(
        "Please enter your reply before submitting.",
      );
      return;
    }

    setSubmittingReply(true);

    const { error } = await supabase
      .from("replies")
      .insert({
        question_id: questionId,
        author: replyAuthor.trim(),
        body: replyBody.trim(),
        verified: false,
        best_answer: false,
      });

    if (error) {
      console.error(
        "Unable to submit reply:",
        error,
      );

      setReplyError(
        `Your reply could not be submitted: ${error.message}`,
      );

      setSubmittingReply(false);
      return;
    }

    setReplyAuthor("");
    setReplyBody("");

    setSuccessMessage(
      "Your reply was posted successfully.",
    );

    setSubmittingReply(false);

    await loadDiscussion();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

            <h1 className="mt-6 text-2xl font-extrabold">
              Loading Discussion
            </h1>

            <p className="mt-3 text-zinc-400">
              Retrieving the question and replies.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (pageError || !question) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-2xl border border-red-800 bg-red-950/20 p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Discussion Error
            </p>

            <h1 className="mt-4 text-3xl font-extrabold">
              Unable to Load Discussion
            </h1>

            <p className="mt-4 leading-7 text-zinc-300">
              {pageError ||
                "The requested question could not be found."}
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={loadDiscussion}
                className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
              >
                Try Again
              </button>

              <Link
                href="/ask-grumpymedic"
                className="rounded-xl border border-zinc-700 px-6 py-3 font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400"
              >
                Return to Ask GrumpyMedic
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const displayedAuthor = question.anonymous
    ? "Anonymous"
    : question.author;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-red-900 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <Link
            href="/ask-grumpymedic"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 transition hover:text-red-400"
          >
            <span aria-hidden="true">←</span>
            Back to Ask GrumpyMedic
          </Link>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-red-500">
            EMS Discussion
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            View Discussion
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
            Review the original question, read the
            discussion, and share an educational response.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <article className="rounded-2xl border border-red-800 bg-zinc-950 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-red-900 bg-red-950/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-400">
              {question.category}
            </span>

            {question.verified && (
              <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                GrumpyMedic Answered
              </span>
            )}

            {question.solved && (
              <span className="rounded-full border border-green-700 bg-green-950/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-400">
                Answered
              </span>
            )}
          </div>

          <h2 className="mt-5 text-3xl font-extrabold">
            {question.title}
          </h2>

          <p className="mt-5 whitespace-pre-wrap leading-8 text-zinc-300">
            {question.body}
          </p>

          <div className="mt-7 border-t border-zinc-800 pt-5 text-sm text-zinc-500">
            Asked by{" "}
            <strong className="text-zinc-300">
              {displayedAuthor}
            </strong>{" "}
            • {formatDate(question.created_at)}
          </div>
        </article>

        <section className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                Discussion
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                {sortedReplies.length}{" "}
                {sortedReplies.length === 1
                  ? "Reply"
                  : "Replies"}
              </h2>
            </div>

            <button
              type="button"
              onClick={loadDiscussion}
              className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400"
            >
              Refresh Discussion
            </button>
          </div>

          {sortedReplies.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center">
              <h3 className="text-2xl font-extrabold">
                No Replies Yet
              </h3>

              <p className="mt-3 text-zinc-400">
                Be the first person to contribute to this
                educational discussion.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {sortedReplies.map((reply) => (
                <article
                  key={reply.id}
                  className={`rounded-2xl border p-6 sm:p-7 ${
                    reply.best_answer
                      ? "border-green-600 bg-green-950/10 shadow-lg shadow-green-950/20"
                      : reply.verified
                        ? "border-red-700 bg-red-950/10"
                        : "border-zinc-800 bg-zinc-950"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white">
                      {reply.author}
                    </span>

                    {reply.best_answer && (
                      <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                        Best Answer
                      </span>
                    )}

                    {reply.verified && (
                      <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                        Official GrumpyMedic Response
                      </span>
                    )}
                  </div>

                  {reply.best_answer && (
                    <div className="mt-5 rounded-xl border border-green-700 bg-green-950/20 p-4">
                      <p className="font-bold text-green-400">
                        Recommended Answer
                      </p>

                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        This response was selected as the
                        best answer by the GrumpyMedic
                        administrator.
                      </p>
                    </div>
                  )}

                  <p className="mt-5 whitespace-pre-wrap leading-8 text-zinc-300">
                    {reply.body}
                  </p>

                  <div className="mt-6 border-t border-zinc-800 pt-4 text-sm text-zinc-500">
                    {formatDate(reply.created_at)}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Join the Discussion
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Post a Reply
          </h2>

          <p className="mt-3 leading-7 text-zinc-400">
            Share an educational response. Do not include
            protected patient information.
          </p>

          <form
            onSubmit={submitReply}
            className="mt-8 space-y-6"
          >
            <div>
              <label
                htmlFor="replyAuthor"
                className="block font-bold text-white"
              >
                Your Name or Display Name
              </label>

              <input
                id="replyAuthor"
                type="text"
                value={replyAuthor}
                onChange={(event) =>
                  setReplyAuthor(event.target.value)
                }
                disabled={submittingReply}
                placeholder="Example: MedicMike"
                className="mt-3 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600 disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="replyBody"
                className="block font-bold text-white"
              >
                Your Reply
              </label>

              <textarea
                id="replyBody"
                value={replyBody}
                onChange={(event) =>
                  setReplyBody(event.target.value)
                }
                disabled={submittingReply}
                rows={7}
                placeholder="Share an educational response. Do not include protected patient information."
                className="mt-3 w-full resize-y rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600 disabled:opacity-50"
              />
            </div>

            {replyError && (
              <div className="rounded-xl border border-red-700 bg-red-950/30 p-4 text-red-200">
                {replyError}
              </div>
            )}

            {successMessage && (
              <div className="rounded-xl border border-green-800 bg-green-950/30 p-4 text-green-300">
                {successMessage}
              </div>
            )}

            <div className="rounded-xl border border-yellow-800 bg-yellow-950/20 p-5">
              <p className="font-bold text-yellow-400">
                Educational Discussion Only
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Follow current protocols, medical
                direction, local policy, and your scope of
                practice. Never post identifying patient
                information.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submittingReply}
                className="rounded-xl bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-900"
              >
                {submittingReply
                  ? "Posting Reply..."
                  : "Post Reply"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}