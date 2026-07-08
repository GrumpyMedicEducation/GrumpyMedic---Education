"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

const questions = [
  {
    question: "Acute pulmonary edema is most commonly caused by:",
    answers: [
      "Right-sided heart failure",
      "Left ventricular failure",
      "Asthma exacerbation",
      "Pulmonary embolism",
    ],
    correct: 1,
    explanation:
      "Acute pulmonary edema is most often related to left ventricular failure, causing fluid to back up into the lungs.",
  },
  {
    question:
      "Which assessment finding is most consistent with acute pulmonary edema?",
    answers: [
      "Clear lung sounds",
      "Bradycardia",
      "Diffuse crackles or rales",
      "Absent peripheral pulses",
    ],
    correct: 2,
    explanation:
      "Diffuse crackles or rales suggest fluid in the alveoli and are commonly heard in pulmonary edema.",
  },
  {
    question: "What is the primary benefit of CPAP in pulmonary edema?",
    answers: [
      "It lowers blood glucose",
      "It improves oxygenation and reduces work of breathing",
      "It causes bronchodilation only",
      "It increases afterload",
    ],
    correct: 1,
    explanation:
      "CPAP helps recruit alveoli, improves oxygenation, and can reduce preload and work of breathing.",
  },
  {
    question: "Nitroglycerin is used because it:",
    answers: [
      "Reduces preload and cardiac workload",
      "Raises blood pressure",
      "Causes fluid retention",
      "Slows respirations",
    ],
    correct: 0,
    explanation:
      "Nitroglycerin causes vasodilation, helping reduce preload and cardiac workload.",
  },
  {
    question: "Which patient finding should make you concerned about failure?",
    answers: [
      "Patient speaking full sentences",
      "Improving oxygen saturation",
      "Decreasing mental status and tiring out",
      "Mild anxiety only",
    ],
    correct: 2,
    explanation:
      "A patient who is tiring out or becoming altered may be progressing toward respiratory failure.",
  },
];

export default function AcutePulmonaryEdemaQuizPage() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const score = answers.reduce((total, answer, index) => {
    return answer === questions[index].correct ? total + 1 : total;
  }, 0);

  const percent = Math.round((score / questions.length) * 100);
  const passed = percent >= 80;

  function resetQuiz() {
    setAnswers([]);
    setSubmitted(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-8 py-10">
        <Link
          href="/courses/acute-pulmonary-edema"
          className="text-sm font-semibold text-red-500 hover:text-red-400"
        >
          ← Back to Course
        </Link>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-red-500">
            Quiz
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Acute Pulmonary Edema Quiz
          </h1>

          <p className="mt-4 text-zinc-300">
            Passing score: 80%. Select the best answer for each question.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {questions.map((q, index) => {
            const selected = answers[index];

            return (
              <div
                key={q.question}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h2 className="text-xl font-semibold">
                  {index + 1}. {q.question}
                </h2>

                <div className="mt-4 space-y-3">
                  {q.answers.map((answer, answerIndex) => {
                    const isSelected = selected === answerIndex;
                    const isCorrect = q.correct === answerIndex;
                    const showCorrect = submitted && isCorrect;
                    const showWrong =
                      submitted && isSelected && selected !== q.correct;

                    return (
                      <button
                        key={answer}
                        disabled={submitted}
                        onClick={() => {
                          const newAnswers = [...answers];
                          newAnswers[index] = answerIndex;
                          setAnswers(newAnswers);
                        }}
                        className={`block w-full rounded-lg border p-3 text-left transition ${
                          showCorrect
                            ? "border-green-500 bg-green-950"
                            : showWrong
                            ? "border-red-500 bg-red-950"
                            : isSelected
                            ? "border-red-500 bg-red-950"
                            : "border-zinc-700 hover:bg-zinc-800"
                        }`}
                      >
                        {answer}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <p className="mt-4 rounded-lg bg-zinc-800 p-4 text-zinc-300">
                    <span className="font-bold text-white">Explanation: </span>
                    {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            className="mt-8 rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-3xl font-bold">Quiz Result</h2>

            <p className="mt-3 text-xl text-zinc-300">
              You scored {score} out of {questions.length} ({percent}%).
            </p>

            <p className="mt-4 text-2xl font-bold">
              {passed ? "Pass ✅" : "Not yet — review and try again."}
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={resetQuiz}
                className="rounded-lg border border-zinc-700 px-5 py-3 font-semibold hover:bg-zinc-800"
              >
                Retake Quiz
              </button>

              <Link
                href="/courses/acute-pulmonary-edema"
                className="rounded-lg border border-zinc-700 px-5 py-3 font-semibold hover:bg-zinc-800"
              >
                Return to Course
              </Link>

              {passed && (
                <Link
                  href="/courses/acute-pulmonary-edema/certificate"
                  className="rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
                >
                  View Certificate
                </Link>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}