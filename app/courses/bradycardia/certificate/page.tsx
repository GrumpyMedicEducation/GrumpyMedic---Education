"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "../../../components/Navbar";

type Question = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

const questions: Question[] = [
  {
    prompt:
      "Which adult finding most strongly supports treatment for symptomatic bradycardia?",
    options: [
      "Heart rate of 58 without symptoms",
      "Altered mental status with poor perfusion",
      "Normal blood pressure",
      "Isolated premature beats",
    ],
    answer: 1,
    explanation:
      "Treatment is based on symptoms and evidence of instability or poor perfusion.",
  },
  {
    prompt: "What is the adult atropine dose under Protocol 3.3A?",
    options: [
      "0.5 mg IV once",
      "1 mg IV/IO",
      "2 mg IM",
      "0.02 mg/kg IV",
    ],
    answer: 1,
    explanation: "Adult atropine is 1 mg IV/IO.",
  },
  {
    prompt: "How often may adult atropine be repeated?",
    options: [
      "Every 1 minute",
      "Every 3–5 minutes",
      "Every 10 minutes",
      "Only once",
    ],
    answer: 1,
    explanation: "It may be repeated every 3–5 minutes.",
  },
  {
    prompt: "What is the maximum total adult atropine dose?",
    options: ["1 mg", "2 mg", "3 mg", "5 mg"],
    answer: 2,
    explanation: "The maximum total dose is 3 mg.",
  },
  {
    prompt:
      "Which electrical treatment is listed for symptomatic adult bradycardia?",
    options: [
      "Synchronized cardioversion",
      "Defibrillation",
      "Transcutaneous pacing",
      "Vagal maneuvers",
    ],
    answer: 2,
    explanation:
      "Transcutaneous pacing is listed under paramedic standing orders.",
  },
  {
    prompt:
      "When transcutaneous pacing is warranted, which related protocol should be considered?",
    options: [
      "Stroke",
      "Sedation and analgesia for electrical therapy",
      "Spinal trauma",
      "Sepsis",
    ],
    answer: 1,
    explanation:
      "Consider Protocol 7.6 for sedation and analgesia for electrical therapy.",
  },
  {
    prompt:
      "Which adult medication is a Medical Control option for suspected beta-blocker toxicity?",
    options: ["Adenosine", "Glucagon", "Naloxone", "Furosemide"],
    answer: 1,
    explanation:
      "Glucagon may be ordered for suspected beta-blocker or calcium-channel-blocker toxicity.",
  },
  {
    prompt: "What is the listed adult glucagon dose?",
    options: ["0.1–0.5 mg", "1–5 mg", "10 mg/kg", "20 mg/kg"],
    answer: 1,
    explanation: "The listed dose is 1–5 mg IV/IO/IM.",
  },
  {
    prompt:
      "Which adult vasopressor infusion is listed at 2–10 mcg/min?",
    options: [
      "Dopamine",
      "Norepinephrine",
      "Epinephrine",
      "Phenylephrine",
    ],
    answer: 2,
    explanation: "Epinephrine infusion is listed at 2–10 mcg/min.",
  },
  {
    prompt: "What is the adult dopamine infusion range?",
    options: [
      "0.1–0.5 mcg/kg/min",
      "1–5 mcg/min",
      "2–20 mcg/kg/min",
      "20–40 mcg/kg/min",
    ],
    answer: 2,
    explanation: "Dopamine is listed at 2–20 mcg/kg/min IV/IO.",
  },
  {
    prompt: "What is the adult norepinephrine infusion range?",
    options: [
      "0.1–0.5 mcg/kg/min",
      "1–5 mcg/kg/min",
      "2–10 mcg/min",
      "10–20 mcg/kg/min",
    ],
    answer: 0,
    explanation: "Norepinephrine is listed at 0.1–0.5 mcg/kg/min.",
  },
  {
    prompt:
      "To what adult systolic blood pressure is norepinephrine titrated?",
    options: ["80 mm Hg", "90 mm Hg", "100 mm Hg", "120 mm Hg"],
    answer: 1,
    explanation:
      "It is titrated to a systolic blood pressure of 90 mm Hg.",
  },
  {
    prompt:
      "Which adult treatment requires administration by infusion pump only?",
    options: [
      "Atropine IV push",
      "Norepinephrine infusion",
      "Glucagon IM",
      "Calcium slow IV",
    ],
    answer: 1,
    explanation:
      "The protocol specifies infusion-pump-only administration for norepinephrine and epinephrine infusions.",
  },
  {
    prompt:
      "What is the adult calcium dose for suspected calcium-channel-blocker toxicity?",
    options: ["1 mg/kg", "10 mg/kg", "20 mg/kg", "50 mg/kg"],
    answer: 2,
    explanation:
      "Calcium chloride or calcium gluconate 10% is listed at 20 mg/kg IV/IO.",
  },
  {
    prompt: "What is the maximum adult calcium dose listed?",
    options: ["500 mg", "1 gram", "2 grams", "5 grams"],
    answer: 1,
    explanation: "The maximum dose is 1 gram.",
  },
  {
    prompt:
      "In a severely symptomatic child, when should CPR be considered?",
    options: [
      "Pulse below 100",
      "Pulse below 80",
      "Pulse below 60",
      "Any heart rate below normal",
    ],
    answer: 2,
    explanation:
      "Consider CPR when the pulse is less than 60 bpm and the child is severely symptomatic.",
  },
  {
    prompt: "What is the pediatric epinephrine standing-order dose?",
    options: ["0.001 mg/kg", "0.01 mg/kg", "0.1 mg/kg", "1 mg/kg"],
    answer: 1,
    explanation: "The pediatric dose is 0.01 mg/kg IV/IO.",
  },
  {
    prompt:
      "What concentration is referenced for pediatric epinephrine dosing?",
    options: ["0.01 mg/mL", "0.1 mg/mL", "1 mg/mL", "10 mg/mL"],
    answer: 1,
    explanation: "The protocol references a 0.1 mg/mL solution.",
  },
  {
    prompt:
      "What volume corresponds to the pediatric epinephrine standing-order dose?",
    options: ["0.01 mL/kg", "0.1 mL/kg", "1 mL/kg", "10 mL/kg"],
    answer: 1,
    explanation:
      "0.1 mL/kg of a 0.1 mg/mL solution equals 0.01 mg/kg.",
  },
  {
    prompt:
      "What is the maximum pediatric epinephrine standing-order dose?",
    options: ["0.1 mg", "0.3 mg", "0.5 mg", "1 mg"],
    answer: 2,
    explanation: "The maximum dose is 0.5 mg.",
  },
  {
    prompt: "What is the pediatric atropine dose?",
    options: ["0.01 mg/kg", "0.02 mg/kg", "0.1 mg/kg", "1 mg"],
    answer: 1,
    explanation: "Pediatric atropine is 0.02 mg/kg IV/IO.",
  },
  {
    prompt: "When is pediatric atropine specifically indicated?",
    options: [
      "All bradycardia",
      "Increased vagal tone or suspected AV block",
      "Only after defibrillation",
      "Only for tachycardia",
    ],
    answer: 1,
    explanation:
      "It is indicated when increased vagal tone or AV block is suspected.",
  },
  {
    prompt: "What is the maximum single pediatric atropine dose?",
    options: ["0.1 mg", "0.25 mg", "0.5 mg", "1 mg"],
    answer: 2,
    explanation: "The maximum single dose is 0.5 mg.",
  },
  {
    prompt: "What pediatric fluid bolus may Medical Control order?",
    options: [
      "2–5 mL/kg",
      "5–10 mL/kg",
      "10–20 mL/kg",
      "30–40 mL/kg",
    ],
    answer: 2,
    explanation:
      "Additional fluid boluses of 10–20 mL/kg may be ordered.",
  },
  {
    prompt: "What is the pediatric epinephrine infusion range?",
    options: [
      "0.01–0.05 mcg/kg/min",
      "0.1–1 mcg/kg/min",
      "1–10 mcg/min",
      "2–20 mcg/kg/min",
    ],
    answer: 1,
    explanation:
      "The listed range is 0.1–1 mcg/kg/min IV/IO.",
  },
];

export default function BradycardiaQuizPage() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );

  const [submitted, setSubmitted] = useState(false);

  const score = useMemo<number>(
    () =>
      answers.reduce<number>(
        (total, answer, index) =>
          total + (answer === questions[index].answer ? 1 : 0),
        0,
      ),
    [answers],
  );

  const passed = score >= 20;

  const percentage = Math.round(
    (score / questions.length) * 100,
  );

  const unansweredCount = answers.filter(
    (answer) => answer === null,
  ).length;

  function choose(
    questionIndex: number,
    optionIndex: number,
  ) {
    if (submitted) {
      return;
    }

    setAnswers((current) =>
      current.map((value, index) =>
        index === questionIndex ? optionIndex : value,
      ),
    );
  }

  function submitQuiz() {
    if (unansweredCount > 0) {
      return;
    }

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function retakeQuiz() {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Adult &amp; Pediatric Bradycardia Quiz
          </h1>

          <p className="mt-4 leading-7 text-zinc-300">
            Answer all 25 questions. A score of 80% or
            higher, which is 20 correct answers, is required
            to pass.
          </p>

          {!submitted && (
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-200">
                25 Questions
              </span>

              <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-200">
                80% Passing Score
              </span>

              <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-200">
                {unansweredCount} Unanswered
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        {submitted && (
          <section
            className={`rounded-2xl border p-8 text-center ${
              passed
                ? "border-green-600 bg-green-950/20"
                : "border-red-600 bg-red-950/20"
            }`}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-300">
              Final Score
            </p>

            <p className="mt-3 text-5xl font-extrabold">
              {score}/{questions.length}
            </p>

            <p
              className={`mt-3 text-2xl font-bold ${
                passed
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {passed ? "Passed" : "Not Yet Passed"}
            </p>

            <p className="mt-3 text-xl text-zinc-300">
              {percentage}%
            </p>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-300">
              {passed
                ? "You met the required passing score. Review the explanations below, then open your completion certificate."
                : "A score of 20 out of 25 is required. Review the explanations below and retake the quiz when ready."}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {passed && (
                <Link
                  href="/courses/bradycardia/certificate"
                  className="rounded-xl bg-green-600 px-6 py-3 font-bold transition hover:bg-green-500"
                >
                  View Certificate
                </Link>
              )}

              <button
                type="button"
                onClick={retakeQuiz}
                className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
              >
                Retake Quiz
              </button>

              <Link
                href="/courses/bradycardia"
                className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500 hover:text-red-400"
              >
                Return to Course
              </Link>
            </div>
          </section>
        )}

        {questions.map(
          (question, questionIndex) => (
            <article
              key={question.prompt}
              className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
            >
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-red-500">
                Question {questionIndex + 1}
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {question.prompt}
              </h2>

              <div className="mt-5 grid gap-3">
                {question.options.map(
                  (option, optionIndex) => {
                    const selected =
                      answers[questionIndex] ===
                      optionIndex;

                    const correct =
                      submitted &&
                      optionIndex === question.answer;

                    const incorrect =
                      submitted &&
                      selected &&
                      optionIndex !==
                        question.answer;

                    let optionStyle =
                      "border-zinc-700 bg-black hover:border-zinc-500";

                    if (selected && !submitted) {
                      optionStyle =
                        "border-red-500 bg-red-950/20";
                    }

                    if (correct) {
                      optionStyle =
                        "border-green-500 bg-green-950/30";
                    }

                    if (incorrect) {
                      optionStyle =
                        "border-red-500 bg-red-950/30";
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          choose(
                            questionIndex,
                            optionIndex,
                          )
                        }
                        disabled={submitted}
                        className={`rounded-xl border p-4 text-left transition ${optionStyle} ${
                          submitted
                            ? "cursor-default"
                            : "cursor-pointer"
                        }`}
                      >
                        <span className="font-bold">
                          {String.fromCharCode(
                            65 + optionIndex,
                          )}
                          .
                        </span>{" "}
                        {option}
                      </button>
                    );
                  },
                )}
              </div>

              {submitted && (
                <div className="mt-4 rounded-xl border border-zinc-800 bg-black p-4">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-red-500">
                    Explanation
                  </p>

                  <p className="mt-2 leading-7 text-zinc-300">
                    {question.explanation}
                  </p>
                </div>
              )}
            </article>
          ),
        )}

        {!submitted && (
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <button
              type="button"
              onClick={submitQuiz}
              disabled={unansweredCount > 0}
              className="w-full rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {unansweredCount > 0
                ? `Answer ${unansweredCount} Remaining Question${
                    unansweredCount === 1 ? "" : "s"
                  }`
                : "Submit Quiz"}
            </button>

            <p className="mt-4 text-center text-sm text-zinc-400">
              All 25 questions must be answered before the
              quiz can be submitted.
            </p>
          </div>
        )}

        <p className="text-center text-sm leading-6 text-zinc-500">
          Educational content only. Verify current
          Massachusetts statewide protocols, local service
          policies, Medical Control direction, medication
          instructions, and your authorized scope of
          practice.
        </p>
      </section>
    </main>
  );
}