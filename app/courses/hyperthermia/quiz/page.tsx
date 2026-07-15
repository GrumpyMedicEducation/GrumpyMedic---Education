"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "../../../components/Navbar";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const PASSING_SCORE = 80;

const questions: Question[] = [
  {
    question:
      "What is the MOST important initial treatment for suspected heat stroke?",
    options: [
      "Start IV fluids",
      "Rapid transport",
      "Rapid cooling",
      "Oxygen administration",
    ],
    correctAnswer: 2,
    explanation:
      "Rapid cooling is the most important initial treatment because ongoing hyperthermia can quickly cause cellular and organ damage.",
  },
  {
    question: "Heat stroke is BEST defined by:",
    options: [
      "Temperature greater than 100°F",
      "Dehydration and muscle cramps",
      "Elevated temperature with altered mental status",
      "Dry skin only",
    ],
    correctAnswer: 2,
    explanation:
      "Heat stroke is characterized by severe hyperthermia with central nervous system dysfunction, such as confusion, agitation, seizures, or coma.",
  },
  {
    question:
      "What is the preferred method of cooling a patient with severe heat stroke?",
    options: [
      "Ice packs to the neck only",
      "Air conditioning in the ambulance",
      "Ice-water immersion",
      "Oral fluids",
    ],
    correctAnswer: 2,
    explanation:
      "Ice-water immersion is the most effective cooling method when resources and patient access allow it.",
  },
  {
    question:
      "Active cooling should generally be stopped when the patient reaches:",
    options: [
      "100°F",
      "101°F",
      "102.2°F (39°C)",
      "104°F",
    ],
    correctAnswer: 2,
    explanation:
      "Cooling is generally discontinued near 102.2°F or 39°C to reduce the risk of overcooling.",
  },
  {
    question:
      "Which finding is a KEY indicator of heat stroke severity?",
    options: [
      "Heart rate",
      "Blood pressure",
      "Altered mental status",
      "Respiratory rate",
    ],
    correctAnswer: 2,
    explanation:
      "Altered mental status is the key clinical feature that separates heat stroke from less severe heat illness.",
  },
  {
    question:
      "Where are the BEST locations to place ice packs when immersion is unavailable?",
    options: [
      "Chest and abdomen",
      "Groin and axillae",
      "Lower legs",
      "Hands and feet",
    ],
    correctAnswer: 1,
    explanation:
      "The groin and axillae are commonly used because large blood vessels are close to the skin in these areas.",
  },
  {
    question:
      "An appropriate adult fluid bolus for hyperthermia is:",
    options: [
      "100 mL",
      "250 mL",
      "500 mL",
      "1 liter minimum",
    ],
    correctAnswer: 2,
    explanation:
      "The course material identifies a 500 mL adult crystalloid bolus as a consideration when clinically indicated.",
  },
  {
    question:
      "The pediatric fluid bolus identified in this course is:",
    options: [
      "10 mL/kg",
      "15 mL/kg",
      "20 mL/kg",
      "25 mL/kg",
    ],
    correctAnswer: 2,
    explanation:
      "The course identifies a pediatric bolus of 20 mL/kg when clinically indicated and permitted by protocol.",
  },
  {
    question:
      "Which patient is at the HIGHEST risk for heat illness?",
    options: [
      "A healthy adult indoors",
      "An elderly patient without air conditioning",
      "A teenager drinking cold water",
      "An office worker",
    ],
    correctAnswer: 1,
    explanation:
      "Older adults are at increased risk because of reduced thermoregulation, chronic illness, medications, and limited access to cooling.",
  },
  {
    question:
      "Which statement is TRUE regarding transport of a heat-stroke patient?",
    options: [
      "Immediate transport always takes priority over cooling",
      "Cooling should be performed before or during transport when possible",
      "Transport is never necessary",
      "Delay all treatment until hospital arrival",
    ],
    correctAnswer: 1,
    explanation:
      "Cooling is time-sensitive. Effective cooling should begin immediately and continue before or during transport when practical.",
  },
  {
    question:
      "Heat-stroke patients always have dry skin.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Exertional heat-stroke patients may continue sweating.",
  },
  {
    question:
      "Cooling should be delayed until IV access is established.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Cooling should not be delayed for IV access or other nonessential procedures.",
  },
  {
    question:
      "Ice-water immersion is considered the gold standard for severe exertional hyperthermia.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Ice-water immersion is the most effective method for rapidly lowering core temperature when it can be performed safely.",
  },
  {
    question:
      "A patient can have heat stroke even if the core temperature has not yet been confirmed.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. Treatment should begin when the history and clinical presentation strongly suggest heat stroke.",
  },
  {
    question:
      "Early recognition and rapid cooling improve survival.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "True. The duration of severe hyperthermia directly affects the risk of organ injury and death.",
  },
];

export default function HyperthermiaQuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [studentName, setStudentName] = useState("");

  const correctCount = useMemo(() => {
    return questions.reduce((total, question, index) => {
      return answers[index] === question.correctAnswer
        ? total + 1
        : total;
    }, 0);
  }, [answers]);

  const score = Math.round(
    (correctCount / questions.length) * 100
  );

  const passed = score >= PASSING_SCORE;

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  function selectAnswer(
    questionIndex: number,
    answerIndex: number
  ) {
    if (submitted) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: answerIndex,
    }));
  }

  function submitQuiz() {
    if (!allAnswered) {
      return;
    }

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function restartQuiz() {
    setAnswers({});
    setSubmitted(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const certificateHref =
    `/courses/hyperthermia/certificate?name=${encodeURIComponent(
      studentName.trim()
    )}&score=${score}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Hyperthermia Quiz
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
            Complete all 15 questions. A score of 80% or greater is required
            to pass.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <QuizStat
              label="Questions"
              value={`${questions.length}`}
            />

            <QuizStat
              label="Passing Score"
              value={`${PASSING_SCORE}%`}
            />

            <QuizStat
              label="Completed"
              value={`${answeredCount}/${questions.length}`}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        {submitted && (
          <div
            className={`mb-10 rounded-2xl border p-8 text-center ${
              passed
                ? "border-green-500 bg-green-950/30"
                : "border-red-500 bg-red-950/30"
            }`}
          >
            <p
              className={`text-sm font-bold uppercase tracking-[0.2em] ${
                passed
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {passed
                ? "Quiz Passed"
                : "Quiz Not Passed"}
            </p>

            <h2 className="mt-3 text-4xl font-extrabold">
              {score}%
            </h2>

            <p className="mt-4 text-lg text-zinc-200">
              You answered {correctCount} of {questions.length} questions
              correctly.
            </p>

            {passed ? (
              <>
                <div className="mx-auto mt-7 max-w-xl text-left">
                  <label
                    htmlFor="studentName"
                    className="block text-sm font-bold uppercase tracking-wide text-zinc-400"
                  >
                    Name for Certificate
                  </label>

                  <input
                    id="studentName"
                    type="text"
                    value={studentName}
                    onChange={(event) =>
                      setStudentName(event.target.value)
                    }
                    placeholder="Enter your full name"
                    className="mt-3 w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-red-500"
                  />
                </div>

                <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href={
                      studentName.trim()
                        ? certificateHref
                        : "#"
                    }
                    aria-disabled={!studentName.trim()}
                    className={`rounded-xl px-7 py-4 font-bold transition ${
                      studentName.trim()
                        ? "bg-red-600 hover:bg-red-500"
                        : "cursor-not-allowed bg-zinc-700 text-zinc-400"
                    }`}
                    onClick={(event) => {
                      if (!studentName.trim()) {
                        event.preventDefault();
                      }
                    }}
                  >
                    View Certificate
                  </Link>

                  <button
                    type="button"
                    onClick={restartQuiz}
                    className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
                  >
                    Retake Quiz
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={restartQuiz}
                  className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
                >
                  Retake Quiz
                </button>

                <Link
                  href="/courses/hyperthermia"
                  className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
                >
                  Review Course
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="space-y-7">
          {questions.map((question, questionIndex) => {
            const selectedAnswer = answers[questionIndex];
            const isCorrect =
              selectedAnswer === question.correctAnswer;

            return (
              <article
                key={question.question}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
              >
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 font-bold">
                    {questionIndex + 1}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-bold leading-8 sm:text-2xl">
                      {question.question}
                    </h2>

                    <div className="mt-6 space-y-3">
                      {question.options.map(
                        (option, optionIndex) => {
                          const optionSelected =
                            selectedAnswer === optionIndex;

                          let optionStyle =
                            "border-zinc-700 bg-black hover:border-red-500";

                          if (submitted) {
                            if (
                              optionIndex ===
                              question.correctAnswer
                            ) {
                              optionStyle =
                                "border-green-500 bg-green-950/30";
                            } else if (optionSelected) {
                              optionStyle =
                                "border-red-500 bg-red-950/30";
                            } else {
                              optionStyle =
                                "border-zinc-800 bg-zinc-950 opacity-60";
                            }
                          } else if (optionSelected) {
                            optionStyle =
                              "border-red-500 bg-red-950/30";
                          }

                          return (
                            <button
                              key={option}
                              type="button"
                              disabled={submitted}
                              onClick={() =>
                                selectAnswer(
                                  questionIndex,
                                  optionIndex
                                )
                              }
                              className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${optionStyle}`}
                            >
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-600 text-sm font-bold">
                                {String.fromCharCode(
                                  65 + optionIndex
                                )}
                              </span>

                              <span className="font-semibold leading-7">
                                {option}
                              </span>
                            </button>
                          );
                        }
                      )}
                    </div>

                    {submitted && (
                      <div
                        className={`mt-6 rounded-xl border p-5 ${
                          isCorrect
                            ? "border-green-700 bg-green-950/20"
                            : "border-red-700 bg-red-950/20"
                        }`}
                      >
                        <p
                          className={`font-bold ${
                            isCorrect
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {isCorrect
                            ? "Correct"
                            : "Incorrect"}
                        </p>

                        <p className="mt-2 leading-7 text-zinc-300">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {!submitted && (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
            {!allAnswered && (
              <p className="mb-5 text-center font-semibold text-yellow-400">
                Answer all {questions.length} questions before submitting.
              </p>
            )}

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                disabled={!allAnswered}
                onClick={submitQuiz}
                className={`rounded-xl px-8 py-4 font-bold transition ${
                  allAnswered
                    ? "bg-red-600 hover:bg-red-500"
                    : "cursor-not-allowed bg-zinc-700 text-zinc-400"
                }`}
              >
                Submit Quiz
              </button>

              <Link
                href="/courses/hyperthermia"
                className="rounded-xl border border-zinc-600 px-8 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
              >
                Back to Course
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-500">
          This quiz is intended for education and review. Always follow current
          statewide protocols, local policies, medical-control direction, and
          your authorized scope of practice.
        </div>
      </section>
    </main>
  );
}

function QuizStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-extrabold text-red-500">
        {value}
      </p>
    </div>
  );
}