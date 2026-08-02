"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import CourseAccessGate from "../../../components/CourseAccessGate";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const questions: QuizQuestion[] = [
  {
    "question": "Which finding must be present before applying either sepsis protocol?",
    "options": [
      "Suspected infection",
      "Chest pain",
      "Trauma",
      "Hypoglycemia"
    ],
    "correctAnswer": 0,
    "explanation": "Both adult and pediatric protocols begin with suspected infection."
  },
  {
    "question": "Adult Protocol 2.17A applies to patients:",
    "options": [
      "12 and older",
      "16 and older",
      "18 and older",
      "21 and older"
    ],
    "correctAnswer": 2,
    "explanation": "The adult protocol is for patients 18 years old or older."
  },
  {
    "question": "Which adult temperature finding meets a sepsis criterion?",
    "options": [
      "97.8 °F",
      "98.6 °F",
      "95.9 °F",
      "99.1 °F"
    ],
    "correctAnswer": 2,
    "explanation": "Temperature below 96.8 °F or above 100.4 °F is listed."
  },
  {
    "question": "Which adult heart rate meets a sepsis criterion?",
    "options": [
      "82",
      "88",
      "91",
      "60"
    ],
    "correctAnswer": 2,
    "explanation": "Adult heart rate greater than 90 beats/minute is listed."
  },
  {
    "question": "Which adult respiratory rate meets a sepsis criterion?",
    "options": [
      "18",
      "20",
      "22",
      "24"
    ],
    "correctAnswer": 3,
    "explanation": "The adult criterion is greater than 22 breaths/minute."
  },
  {
    "question": "Which adult blood pressure meets a septic shock criterion?",
    "options": [
      "SBP 118",
      "SBP 104",
      "SBP 92",
      "SBP 86"
    ],
    "correctAnswer": 3,
    "explanation": "Systolic blood pressure below 90 mm Hg is listed."
  },
  {
    "question": "Which MAP value is concerning under the adult protocol?",
    "options": [
      "82",
      "74",
      "66",
      "62"
    ],
    "correctAnswer": 3,
    "explanation": "MAP below 65 mm Hg meets the listed criterion."
  },
  {
    "question": "Which adult ETCO₂ value meets the listed criterion?",
    "options": [
      "42",
      "35",
      "28",
      "24"
    ],
    "correctAnswer": 3,
    "explanation": "ETCO₂ at or below 25 mm Hg is listed."
  },
  {
    "question": "The adult oxygen goal is:",
    "options": [
      "SpO₂ 88%",
      "SpO₂ 90%",
      "SpO₂ 94%",
      "SpO₂ 100% for every patient"
    ],
    "correctAnswer": 2,
    "explanation": "The adult protocol directs supplemental oxygen to achieve SpO₂ of 94%."
  },
  {
    "question": "Adult fluid is given as:",
    "options": [
      "100 mL boluses",
      "250 mL boluses",
      "500 mL boluses",
      "1,000 mL without reassessment"
    ],
    "correctAnswer": 2,
    "explanation": "The adult protocol lists 500 mL 0.9% NaCl boluses."
  },
  {
    "question": "The adult maximum initial fluid target is:",
    "options": [
      "10 mL/kg",
      "20 mL/kg",
      "30 mL/kg",
      "60 mL/kg"
    ],
    "correctAnswer": 2,
    "explanation": "Adult fluid may be given up to 30 mL/kg."
  },
  {
    "question": "Why should lung sounds be assessed frequently during adult fluid therapy?",
    "options": [
      "To diagnose asthma",
      "To monitor for volume overload",
      "To decide whether glucose is needed",
      "To determine age"
    ],
    "correctAnswer": 1,
    "explanation": "Frequent lung-sound reassessment helps identify volume overload."
  },
  {
    "question": "Which adult vasopressor may Medical Control order?",
    "options": [
      "Adenosine",
      "Norepinephrine",
      "Atropine",
      "Amiodarone"
    ],
    "correctAnswer": 1,
    "explanation": "Norepinephrine is one listed Medical Control option."
  },
  {
    "question": "Which pediatric capillary refill finding is concerning?",
    "options": [
      "2 seconds",
      "Less than 1 second",
      "Exactly 3 seconds",
      "Normal warm skin"
    ],
    "correctAnswer": 1,
    "explanation": "Flash refill below 1 second or delayed refill above 3 seconds is listed."
  },
  {
    "question": "Which pediatric finding suggests altered organ function?",
    "options": [
      "Mottled cool extremities",
      "Normal urine output",
      "Normal mental status",
      "Strong pulses"
    ],
    "correctAnswer": 0,
    "explanation": "Mottled cool extremities are listed as a concerning finding."
  },
  {
    "question": "The pediatric fluid bolus dose is:",
    "options": [
      "5 mL/kg",
      "10 mL/kg",
      "20 mL/kg",
      "30 mL/kg"
    ],
    "correctAnswer": 2,
    "explanation": "The pediatric protocol lists 20 mL/kg 0.9% NaCl boluses."
  },
  {
    "question": "How should pediatric fluid boluses be administered?",
    "options": [
      "By syringe push method",
      "Only by gravity over two hours",
      "Orally",
      "Without IV/IO access"
    ],
    "correctAnswer": 0,
    "explanation": "The supplied pediatric protocol specifies syringe push."
  },
  {
    "question": "After a pediatric bolus, the patient should be reassessed:",
    "options": [
      "At hospital arrival",
      "After 30 minutes",
      "Immediately",
      "Only if blood pressure drops"
    ],
    "correctAnswer": 2,
    "explanation": "Immediate reassessment is required after each bolus."
  },
  {
    "question": "The maximum initial pediatric fluid total before further direction is:",
    "options": [
      "20 mL/kg",
      "40 mL/kg",
      "60 mL/kg",
      "100 mL/kg"
    ],
    "correctAnswer": 2,
    "explanation": "Three 20 mL/kg boluses equal 60 mL/kg."
  },
  {
    "question": "If there is no pediatric response after three boluses, the provider should:",
    "options": [
      "Stop transport",
      "Contact Medical Control",
      "Give oral fluids",
      "Wait 30 minutes"
    ],
    "correctAnswer": 1,
    "explanation": "The protocol directs contact with Medical Control."
  },
  {
    "question": "Which pediatric infusion may Medical Control order?",
    "options": [
      "Epinephrine",
      "Diltiazem",
      "Adenosine",
      "Nitroglycerin"
    ],
    "correctAnswer": 0,
    "explanation": "Epinephrine infusion is listed as a pediatric Medical Control option."
  },
  {
    "question": "Which formula estimates minimum pediatric systolic pressure?",
    "options": [
      "50 + age",
      "60 + age",
      "70 + age × 2",
      "100 − age"
    ],
    "correctAnswer": 2,
    "explanation": "The protocol pearl uses 70 + age in years × 2."
  },
  {
    "question": "Which change after fluids suggests volume overload?",
    "options": [
      "Improved mental status",
      "Stronger pulses",
      "New rales",
      "Improved capillary refill"
    ],
    "correctAnswer": 2,
    "explanation": "New rales may indicate volume overload."
  },
  {
    "question": "A Sepsis Alert should be communicated:",
    "options": [
      "Only after arrival",
      "Before arrival when applicable",
      "Only for pediatric patients",
      "Only after antibiotics"
    ],
    "correctAnswer": 1,
    "explanation": "The protocols direct prearrival notification when applicable."
  },
  {
    "question": "Which action should not be delayed in pediatric sepsis?",
    "options": [
      "Transport",
      "Family notification",
      "Weight estimation",
      "Obtaining a full medication history"
    ],
    "correctAnswer": 0,
    "explanation": "The pediatric protocol explicitly says not to delay transport."
  }
];

export default function SepsisQuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.correctAnswer ? 1 : 0),
    0,
  );
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 80;

  function selectAnswer(questionIndex: number, optionIndex: number) {
    if (submitted) return;

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionIndex]: optionIndex,
    }));
  }

  function submitQuiz() {
    if (answeredCount !== questions.length) {
      window.alert("Please answer every question before submitting the quiz.");
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <CourseAccessGate>
          <section className="mx-auto max-w-5xl px-6 py-12">
            <Link
              href="/courses/sepsis"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              ← Back to Sepsis Course
            </Link>

            <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-7 md:p-10">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">
                Final Assessment
              </p>

              <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
                Adult &amp; Pediatric Sepsis
              </h1>

              <p className="mt-4 text-lg leading-8 text-zinc-300">
                Answer all 25 questions. A score of 80% or higher unlocks the
                completion certificate.
              </p>

              <div className="mt-7">
                <div className="flex justify-between text-sm font-bold text-zinc-400">
                  <span>Quiz Progress</span>
                  <span>
                    {answeredCount} / {questions.length} answered
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-red-600 transition-all"
                    style={{
                      width: `${(answeredCount / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {submitted && (
              <section
                className={`mt-8 rounded-2xl border p-6 ${
                  passed
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-red-500 bg-red-500/10"
                }`}
              >
                <p className="text-sm font-bold uppercase tracking-wide text-zinc-300">
                  Quiz Result
                </p>

                <div className="mt-3 flex flex-wrap items-end gap-4">
                  <span className="text-6xl font-extrabold">
                    {percentage}%
                  </span>

                  <span className="pb-2 text-xl font-bold">
                    {score} of {questions.length} correct
                  </span>
                </div>

                <h2
                  className={`mt-5 text-2xl font-bold ${
                    passed ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {passed ? "Passed" : "Additional review required"}
                </h2>

                <p className="mt-2 text-zinc-300">
                  {passed
                    ? "You achieved the required passing score. Your certificate is available below."
                    : "Review the explanations and retake the quiz."}
                </p>
              </section>
            )}

            <div className="mt-10 space-y-8">
              {questions.map((question, questionIndex) => {
                const selectedAnswer = answers[questionIndex];

                return (
                  <section
                    key={question.question}
                    className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 font-extrabold">
                        {questionIndex + 1}
                      </span>

                      <h2 className="text-xl font-bold leading-8">
                        {question.question}
                      </h2>
                    </div>

                    <div className="mt-6 space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const selected = selectedAnswer === optionIndex;
                        const correct =
                          submitted &&
                          optionIndex === question.correctAnswer;
                        const incorrect =
                          submitted && selected && !correct;

                        return (
                          <button
                            key={option}
                            type="button"
                            disabled={submitted}
                            onClick={() =>
                              selectAnswer(questionIndex, optionIndex)
                            }
                            className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                              correct
                                ? "border-emerald-500 bg-emerald-500/10"
                                : incorrect
                                  ? "border-red-500 bg-red-500/10"
                                  : selected
                                    ? "border-red-500 bg-red-950/30"
                                    : "border-zinc-700 bg-black hover:border-zinc-500"
                            }`}
                          >
                            <span className="font-bold text-zinc-400">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>

                            <span>{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {submitted && (
                      <div className="mt-5 rounded-xl border border-zinc-700 bg-black p-4 leading-7 text-zinc-300">
                        <strong className="text-red-400">
                          Explanation:
                        </strong> 
                        {question.explanation}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {!submitted ? (
                <button
                  type="button"
                  onClick={submitQuiz}
                  className="rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-500"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="rounded-xl border border-zinc-600 px-8 py-4 font-bold transition hover:border-red-500"
                >
                  Retake Quiz
                </button>
              )}

              {passed && (
                <Link
                  href={`/courses/sepsis/certificate?score=${percentage}`}
                  className="rounded-xl bg-emerald-600 px-8 py-4 font-bold transition hover:bg-emerald-500"
                >
                  View / Download Certificate
                </Link>
              )}
            </div>
          </section>
        </CourseAccessGate>
      </main>
    </>
  );
}