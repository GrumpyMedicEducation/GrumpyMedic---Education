"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase/client";

type SupabaseQuestion = {
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

type SupabaseReply = {
  question_id: string;
};

type Question = {
  id: string;
  createdAt: string;
  author: string;
  title: string;
  body: string;
  category: string;
  anonymous: boolean;
  verified: boolean;
  solved: boolean;
  replies: number;
};

type SiteSettings = {
  id: number;
  site_name: string;
  forum_notice: string;
  allow_new_questions: boolean;
  allow_anonymous_questions: boolean;
  maintenance_mode: boolean;
  updated_at: string;
};

const defaultSettings: SiteSettings = {
  id: 1,
  site_name: "GrumpyMedic Education",
  forum_notice:
    "Educational discussion only. Follow current protocols, medical direction, and local policy.",
  allow_new_questions: true,
  allow_anonymous_questions: true,
  maintenance_mode: false,
  updated_at: "",
};

const categories = [
  "All Questions",
  "Clinical Assessment",
  "Cardiology",
  "Airway & Capnography",
  "Trauma",
  "Medications",
  "Medical Emergencies",
  "Pediatrics",
  "Obstetrics",
  "Fire & Rescue",
  "NREMT Study Help",
  "Mental Health & Wellness",
  "Career Advice",
  "Massachusetts Protocols",
];

function formatQuestionDate(dateValue: string) {
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

export default function AskGrumpyMedicPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [siteSettings, setSiteSettings] =
    useState<SiteSettings>(defaultSettings);

  const [selectedCategory, setSelectedCategory] =
    useState("All Questions");
  const [searchTerm, setSearchTerm] = useState("");

  const [showQuestionForm, setShowQuestionForm] =
    useState(false);

  const [author, setAuthor] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionCategory, setQuestionCategory] =
    useState("Clinical Assessment");
  const [anonymous, setAnonymous] = useState(false);

  const [loadingQuestions, setLoadingQuestions] =
    useState(true);
  const [loadingSettings, setLoadingSettings] =
    useState(true);
  const [submittingQuestion, setSubmittingQuestion] =
    useState(false);

  const [pageError, setPageError] = useState("");
  const [settingsError, setSettingsError] = useState("");
  const [formError, setFormError] = useState("");

  const loadSiteSettings = useCallback(async () => {
    setLoadingSettings(true);
    setSettingsError("");

    const { data, error } = await supabase
      .from("site_settings")
      .select(
        `
          id,
          site_name,
          forum_notice,
          allow_new_questions,
          allow_anonymous_questions,
          maintenance_mode,
          updated_at
        `,
      )
      .eq("id", 1)
      .single();

    if (error) {
      console.error(
        "Unable to load site settings:",
        error,
      );

      setSettingsError(
        error.message ||
          "The current forum settings could not be loaded.",
      );

      setSiteSettings(defaultSettings);
      setLoadingSettings(false);
      return;
    }

    const loadedSettings = data as SiteSettings;

    setSiteSettings(loadedSettings);

    if (!loadedSettings.allow_anonymous_questions) {
      setAnonymous(false);
    }

    setLoadingSettings(false);
  }, []);

  const loadQuestions = useCallback(async () => {
    setLoadingQuestions(true);
    setPageError("");

    const {
      data: questionData,
      error: questionError,
    } = await supabase
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
      .order("created_at", {
        ascending: false,
      });

    if (questionError) {
      console.error(
        "Unable to load questions:",
        questionError,
      );

      setPageError(
        questionError.message ||
          "Questions could not be loaded.",
      );

      setLoadingQuestions(false);
      return;
    }

    const {
      data: replyData,
      error: replyError,
    } = await supabase
      .from("replies")
      .select("question_id");

    if (replyError) {
      console.error(
        "Unable to load reply counts:",
        replyError,
      );

      setPageError(
        replyError.message ||
          "Reply counts could not be loaded.",
      );

      setLoadingQuestions(false);
      return;
    }

    const replyCounts: Record<string, number> = {};

    ((replyData ?? []) as SupabaseReply[]).forEach(
      (reply) => {
        replyCounts[reply.question_id] =
          (replyCounts[reply.question_id] ?? 0) + 1;
      },
    );

    const formattedQuestions: Question[] = (
      (questionData ?? []) as SupabaseQuestion[]
    ).map((question) => ({
      id: question.id,
      createdAt: question.created_at,
      author: question.anonymous
        ? "Anonymous"
        : question.author,
      title: question.title,
      body: question.body,
      category: question.category,
      anonymous: question.anonymous,
      verified: question.verified,
      solved: question.solved,
      replies: replyCounts[question.id] ?? 0,
    }));

    setQuestions(formattedQuestions);
    setLoadingQuestions(false);
  }, []);

  useEffect(() => {
    loadSiteSettings();
    loadQuestions();
  }, [loadQuestions, loadSiteSettings]);

  const filteredQuestions = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return questions.filter((question) => {
      const matchesCategory =
        selectedCategory === "All Questions" ||
        question.category === selectedCategory;

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

      return matchesCategory && matchesSearch;
    });
  }, [
    questions,
    searchTerm,
    selectedCategory,
  ]);

  function openQuestionForm() {
    setFormError("");
    setPageError("");

    if (!siteSettings.allow_new_questions) {
      setPageError(
        "New questions are temporarily disabled by the administrator.",
      );
      return;
    }

    setShowQuestionForm(true);
  }

  function closeQuestionForm() {
    if (submittingQuestion) {
      return;
    }

    setFormError("");
    setShowQuestionForm(false);
  }

  async function submitQuestion(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setFormError("");

    if (!siteSettings.allow_new_questions) {
      setFormError(
        "New question submissions are currently disabled.",
      );
      return;
    }

    const anonymousSubmission =
      siteSettings.allow_anonymous_questions &&
      anonymous;

    if (!anonymousSubmission && !author.trim()) {
      setFormError(
        "Please enter your name or display name.",
      );
      return;
    }

    if (!questionTitle.trim()) {
      setFormError("Please enter your question.");
      return;
    }

    if (!questionBody.trim()) {
      setFormError(
        "Please enter the question details.",
      );
      return;
    }

    setSubmittingQuestion(true);

    const { error } = await supabase
      .from("questions")
      .insert({
        author: anonymousSubmission
          ? "Anonymous"
          : author.trim(),
        title: questionTitle.trim(),
        body: questionBody.trim(),
        category: questionCategory,
        anonymous: anonymousSubmission,
        verified: false,
        solved: false,
      });

    if (error) {
      console.error(
        "Unable to submit question:",
        error,
      );

      setFormError(
        `Your question could not be submitted: ${error.message}`,
      );

      setSubmittingQuestion(false);
      return;
    }

    setAuthor("");
    setQuestionTitle("");
    setQuestionBody("");
    setQuestionCategory("Clinical Assessment");
    setAnonymous(false);
    setSelectedCategory("All Questions");
    setShowQuestionForm(false);
    setSubmittingQuestion(false);

    await loadQuestions();
  }

  if (loadingSettings) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

            <h1 className="mt-6 text-2xl font-extrabold">
              Loading Ask GrumpyMedic
            </h1>

            <p className="mt-3 text-zinc-400">
              Checking the current forum settings.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (siteSettings.maintenance_mode) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="flex min-h-[75vh] items-center justify-center px-6 py-16">
          <div className="w-full max-w-2xl rounded-3xl border border-yellow-800 bg-gradient-to-br from-yellow-950/20 to-zinc-950 p-8 text-center sm:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">
              Temporary Maintenance
            </p>

            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              Ask GrumpyMedic Is Temporarily Unavailable
            </h1>

            <p className="mt-6 leading-8 text-zinc-300">
              The discussion forum is undergoing updates.
              Existing content has not been deleted. Please
              check back shortly.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
            >
              Return to Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-red-900 bg-gradient-to-b from-red-950/40 to-black">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            {siteSettings.site_name}
          </p>

          <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">
            Ask GrumpyMedic
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-300">
            Have an EMS question? Ask about patient
            assessment, protocols, medications, airway
            management, career development, NREMT
            preparation, or the realities of working in EMS.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {siteSettings.allow_new_questions ? (
              <button
                type="button"
                onClick={openQuestionForm}
                className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
              >
                + Ask a Question
              </button>
            ) : (
              <div className="rounded-xl border border-yellow-800 bg-yellow-950/20 px-7 py-4 font-bold text-yellow-400">
                New Questions Temporarily Disabled
              </div>
            )}

            <a
              href="#recent-questions"
              className="rounded-xl border border-zinc-600 px-7 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Browse Questions
            </a>
          </div>

          <div className="mt-8 rounded-xl border border-yellow-800 bg-yellow-950/20 p-5">
            <p className="font-bold text-yellow-400">
              Educational Discussion Only
            </p>

            <p className="mt-2 whitespace-pre-wrap leading-7 text-zinc-300">
              {siteSettings.forum_notice}
            </p>
          </div>

          {settingsError && (
            <div className="mt-5 rounded-xl border border-red-800 bg-red-950/30 p-5 text-red-200">
              The forum loaded using default settings
              because the saved settings could not be
              retrieved: {settingsError}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[280px_1fr]">
        <aside>
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5 lg:sticky lg:top-28">
            <h2 className="text-xl font-extrabold text-red-500">
              Categories
            </h2>

            <div className="mt-5 space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "bg-red-600 text-white"
                      : "bg-black text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div id="recent-questions">
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                  EMS Discussion
                </p>

                <h2 className="mt-2 text-3xl font-extrabold">
                  Recent Questions
                </h2>
              </div>

              {siteSettings.allow_new_questions && (
                <button
                  type="button"
                  onClick={openQuestionForm}
                  className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
                >
                  Ask GrumpyMedic
                </button>
              )}
            </div>

            <div className="mt-6">
              <label
                htmlFor="questionSearch"
                className="sr-only"
              >
                Search questions
              </label>

              <input
                id="questionSearch"
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search TXA, airway, cardiology, NREMT..."
                className="w-full rounded-xl border border-zinc-600 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
              />
            </div>
          </div>

          {pageError && (
            <div className="mt-6 rounded-xl border border-red-700 bg-red-950/30 p-5 text-red-200">
              <p className="font-bold">
                Forum Message
              </p>

              <p className="mt-2">{pageError}</p>

              <button
                type="button"
                onClick={loadQuestions}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-500"
              >
                Refresh Questions
              </button>
            </div>
          )}

          <div className="mt-6 space-y-5">
            {loadingQuestions ? (
              <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-10 text-center">
                <p className="text-lg font-bold">
                  Loading questions...
                </p>
              </div>
            ) : filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <article
                  key={question.id}
                  className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-600"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-red-800 bg-red-950/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-400">
                      {question.category}
                    </span>

                    {question.verified && (
                      <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                        GrumpyMedic Answered
                      </span>
                    )}

                    {question.solved && (
                      <span className="rounded-full border border-green-700 bg-green-950/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-400">
                        Solved
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-2xl font-extrabold">
                    {question.title}
                  </h3>

                  <p className="mt-4 whitespace-pre-wrap leading-7 text-zinc-300">
                    {question.body}
                  </p>

                  <div className="mt-6 flex flex-col gap-4 border-t border-zinc-700 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-zinc-400">
                      Asked by{" "}
                      <span className="font-semibold text-zinc-200">
                        {question.author}
                      </span>{" "}
                      •{" "}
                      {formatQuestionDate(
                        question.createdAt,
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-zinc-400">
                        {question.replies}{" "}
                        {question.replies === 1
                          ? "reply"
                          : "replies"}
                      </span>

                      <Link
                        href={`/ask-grumpymedic/question/${question.id}`}
                        className="rounded-lg border border-red-600 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
                      >
                        View Discussion
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-10 text-center">
                <h3 className="text-2xl font-extrabold">
                  No Questions Found
                </h3>

                <p className="mt-3 text-zinc-400">
                  No real Supabase questions match the
                  current search or category.
                </p>

                {siteSettings.allow_new_questions && (
                  <button
                    type="button"
                    onClick={openQuestionForm}
                    className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
                  >
                    Ask a Question
                  </button>
                )}
              </div>
            )}
          </div>

          <section className="mt-10 rounded-2xl border border-red-700 bg-gradient-to-br from-red-950/30 to-zinc-900 p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Official Responses
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              Look for the GrumpyMedic Badge
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-zinc-300">
              Questions and replies marked by GrumpyMedic
              will display an official badge. All clinical
              information should still be checked against
              current protocols and medical direction.
            </p>
          </section>

          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-500">
            Never include a patient&apos;s name, date of
            birth, address, medical-record number,
            photographs, or other identifying information.
          </div>
        </div>
      </section>

      {showQuestionForm &&
        siteSettings.allow_new_questions && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-8">
            <div className="max-h-full w-full max-w-3xl overflow-y-auto rounded-2xl border border-red-700 bg-zinc-950 p-6 shadow-2xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                    Ask GrumpyMedic
                  </p>

                  <h2 className="mt-2 text-3xl font-extrabold">
                    Submit a Question
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeQuestionForm}
                  disabled={submittingQuestion}
                  className="rounded-lg border border-zinc-600 px-4 py-2 font-bold text-zinc-300 transition hover:border-red-500 hover:text-red-400 disabled:opacity-50"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={submitQuestion}
                className="mt-8 space-y-6"
              >
                <div>
                  <label
                    htmlFor="author"
                    className="block font-bold text-white"
                  >
                    Your Name or Display Name
                  </label>

                  <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(event) =>
                      setAuthor(event.target.value)
                    }
                    disabled={
                      (anonymous &&
                        siteSettings.allow_anonymous_questions) ||
                      submittingQuestion
                    }
                    placeholder="Example: MedicMike"
                    className="mt-3 w-full rounded-xl border border-zinc-600 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 disabled:opacity-50"
                  />

                  {siteSettings.allow_anonymous_questions ? (
                    <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
                      <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={(event) =>
                          setAnonymous(
                            event.target.checked,
                          )
                        }
                        disabled={submittingQuestion}
                        className="h-4 w-4 accent-red-600"
                      />

                      Ask anonymously
                    </label>
                  ) : (
                    <p className="mt-3 text-sm text-zinc-500">
                      Anonymous question submissions are
                      currently disabled.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="questionCategory"
                    className="block font-bold text-white"
                  >
                    Category
                  </label>

                  <select
                    id="questionCategory"
                    value={questionCategory}
                    onChange={(event) =>
                      setQuestionCategory(
                        event.target.value,
                      )
                    }
                    disabled={submittingQuestion}
                    className="mt-3 w-full rounded-xl border border-zinc-600 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500 disabled:opacity-50"
                  >
                    {categories
                      .filter(
                        (category) =>
                          category !== "All Questions",
                      )
                      .map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="questionTitle"
                    className="block font-bold text-white"
                  >
                    Question
                  </label>

                  <input
                    id="questionTitle"
                    type="text"
                    value={questionTitle}
                    onChange={(event) =>
                      setQuestionTitle(
                        event.target.value,
                      )
                    }
                    disabled={submittingQuestion}
                    placeholder="Example: When should TXA be considered?"
                    className="mt-3 w-full rounded-xl border border-zinc-600 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="questionBody"
                    className="block font-bold text-white"
                  >
                    Question Details
                  </label>

                  <textarea
                    id="questionBody"
                    value={questionBody}
                    onChange={(event) =>
                      setQuestionBody(
                        event.target.value,
                      )
                    }
                    disabled={submittingQuestion}
                    rows={7}
                    placeholder="Provide enough information for an educational discussion. Do not include protected patient information."
                    className="mt-3 w-full resize-y rounded-xl border border-zinc-600 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 disabled:opacity-50"
                  />
                </div>

                {formError && (
                  <div className="rounded-xl border border-red-700 bg-red-950/30 p-4 text-red-200">
                    {formError}
                  </div>
                )}

                <div className="rounded-xl border border-yellow-800 bg-yellow-950/20 p-5">
                  <p className="font-bold text-yellow-400">
                    Before Submitting
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-300">
                    {siteSettings.forum_notice}
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeQuestionForm}
                    disabled={submittingQuestion}
                    className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500 hover:text-red-400 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submittingQuestion}
                    className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-900"
                  >
                    {submittingQuestion
                      ? "Submitting..."
                      : "Submit Question"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </main>
  );
}