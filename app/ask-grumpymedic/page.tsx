"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

type Question = {
  id: number;
  title: string;
  body: string;
  category: string;
  author: string;
  replies: number;
  answeredByGrumpyMedic: boolean;
  createdAt: string;
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

const starterQuestions: Question[] = [
  {
    id: 1,
    title: "Can TXA be given after a prolonged extrication?",
    body: "How should the time from injury and the length of extrication affect the decision to administer TXA?",
    category: "Trauma",
    author: "MedicStudent24",
    replies: 6,
    answeredByGrumpyMedic: true,
    createdAt: "Recently",
  },
  {
    id: 2,
    title: "When should an EMT choose an iGel instead of BVM ventilation?",
    body: "I understand the indications for an SGA, but I am trying to better understand when continued BVM ventilation is no longer sufficient.",
    category: "Airway & Capnography",
    author: "EMTNorthShore",
    replies: 4,
    answeredByGrumpyMedic: true,
    createdAt: "Recently",
  },
  {
    id: 3,
    title: "What is the best way to prepare for the NREMT Paramedic exam?",
    body: "I am struggling with clinical judgment questions and would appreciate study recommendations.",
    category: "NREMT Study Help",
    author: "FutureMedic",
    replies: 11,
    answeredByGrumpyMedic: false,
    createdAt: "Recently",
  },
  {
    id: 4,
    title: "How should FAST-ED findings affect destination decisions?",
    body: "Should an elevated FAST-ED score automatically change the transport destination?",
    category: "Clinical Assessment",
    author: "MedicMA",
    replies: 3,
    answeredByGrumpyMedic: false,
    createdAt: "Recently",
  },
];

export default function AskGrumpyMedicPage() {
  const [questions, setQuestions] =
    useState<Question[]>(starterQuestions);

  const [selectedCategory, setSelectedCategory] =
    useState("All Questions");

  const [searchTerm, setSearchTerm] = useState("");
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const [author, setAuthor] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionCategory, setQuestionCategory] =
    useState("Clinical Assessment");

  const filteredQuestions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return questions.filter((question) => {
      const matchesCategory =
        selectedCategory === "All Questions" ||
        question.category === selectedCategory;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        question.title.toLowerCase().includes(normalizedSearch) ||
        question.body.toLowerCase().includes(normalizedSearch) ||
        question.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [questions, searchTerm, selectedCategory]);

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !author.trim() ||
      !questionTitle.trim() ||
      !questionBody.trim()
    ) {
      window.alert(
        "Please enter your name, a question title, and the question details.",
      );

      return;
    }

    const newQuestion: Question = {
      id: Date.now(),
      title: questionTitle.trim(),
      body: questionBody.trim(),
      category: questionCategory,
      author: author.trim(),
      replies: 0,
      answeredByGrumpyMedic: false,
      createdAt: "Just now",
    };

    setQuestions((currentQuestions) => [
      newQuestion,
      ...currentQuestions,
    ]);

    setQuestionTitle("");
    setQuestionBody("");
    setQuestionCategory("Clinical Assessment");
    setShowQuestionForm(false);
    setSelectedCategory("All Questions");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-red-900 bg-gradient-to-b from-red-950/40 to-black">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">
            Ask GrumpyMedic
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-300">
            Have an EMS question? Ask about patient assessment,
            protocols, medications, airway management, career
            development, NREMT preparation, or the realities of working
            in EMS.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setShowQuestionForm(true)}
              className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
            >
              + Ask a Question
            </button>

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

            <p className="mt-2 leading-7 text-zinc-300">
              Do not post protected patient information. Responses do
              not replace current protocols, medical direction, local
              policy, or your authorized scope of practice.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[280px_1fr]">
        {/* Categories */}
        <aside>
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5 lg:sticky lg:top-6">
            <h2 className="text-xl font-extrabold text-red-500">
              Categories
            </h2>

            <div className="mt-5 space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
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

        {/* Questions */}
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

              <button
                type="button"
                onClick={() => setShowQuestionForm(true)}
                className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
              >
                Ask GrumpyMedic
              </button>
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

          <div className="mt-6 space-y-5">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <article
                  key={question.id}
                  className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-600"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-red-800 bg-red-950/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-400">
                      {question.category}
                    </span>

                    {question.answeredByGrumpyMedic && (
                      <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                        GrumpyMedic Answered
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-2xl font-extrabold">
                    {question.title}
                  </h3>

                  <p className="mt-4 leading-7 text-zinc-300">
                    {question.body}
                  </p>

                  <div className="mt-6 flex flex-col gap-4 border-t border-zinc-700 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-zinc-400">
                      Asked by{" "}
                      <span className="font-semibold text-zinc-200">
                        {question.author}
                      </span>{" "}
                      • {question.createdAt}
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-zinc-400">
                        {question.replies}{" "}
                        {question.replies === 1
                          ? "reply"
                          : "replies"}
                      </span>

                      <button
                        type="button"
                        className="rounded-lg border border-red-600 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
                      >
                        View Discussion
                      </button>
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
                  Try another search or be the first to ask a question
                  in this category.
                </p>

                <button
                  type="button"
                  onClick={() => setShowQuestionForm(true)}
                  className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
                >
                  Ask a Question
                </button>
              </div>
            )}
          </div>

          {/* GrumpyMedic Information */}
          <section className="mt-10 rounded-2xl border border-red-700 bg-gradient-to-br from-red-950/30 to-zinc-900 p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Official Responses
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              Look for the GrumpyMedic Badge
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-zinc-300">
              Questions answered directly by GrumpyMedic will display
              the red verified badge. Community members may also share
              their experience, but all clinical information should be
              checked against current protocols and medical direction.
            </p>
          </section>

          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-500">
            Never include a patient&apos;s name, date of birth, address,
            medical-record number, photographs, or other identifying
            information. Questions may be edited or removed to protect
            privacy and maintain professional discussion.
          </div>
        </div>
      </section>

      {/* Ask Question Modal */}
      {showQuestionForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8">
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
                onClick={() => setShowQuestionForm(false)}
                className="rounded-lg border border-zinc-600 px-4 py-2 font-bold text-zinc-300 transition hover:border-red-500 hover:text-red-400"
                aria-label="Close question form"
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
                  placeholder="Example: MedicMike"
                  className="mt-3 w-full rounded-xl border border-zinc-600 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
                />
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
                    setQuestionCategory(event.target.value)
                  }
                  className="mt-3 w-full rounded-xl border border-zinc-600 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
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
                    setQuestionTitle(event.target.value)
                  }
                  placeholder="Example: When should TXA be considered?"
                  className="mt-3 w-full rounded-xl border border-zinc-600 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
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
                    setQuestionBody(event.target.value)
                  }
                  rows={7}
                  placeholder="Provide enough information for an educational discussion. Do not include protected patient information."
                  className="mt-3 w-full resize-y rounded-xl border border-zinc-600 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
                />
              </div>

              <div className="rounded-xl border border-yellow-800 bg-yellow-950/20 p-5">
                <p className="font-bold text-yellow-400">
                  Before Submitting
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Do not include protected health information. This
                  forum is for education and discussion and does not
                  provide medical direction.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowQuestionForm(false)}
                  className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500 hover:text-red-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
                >
                  Submit Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}