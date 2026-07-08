"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

export default function AcutePulmonaryEdemaQuizPage() {
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
    },
    {
      question: "Which assessment finding is most consistent with acute pulmonary edema?",
      answers: [
        "Clear lung sounds",
        "Bradycardia",
        "Diffuse crackles/rales",
        "Absent peripheral pulses",
      ],
      correct: 2,
    },
    {
      question: "What is the primary effect of CPAP in pulmonary edema?",
      answers: [
        "Increases blood glucose",
        "Pushes fluid out of alveoli and improves oxygenation",
        "Slows heart rate",
        "Increases afterload",
      ],
      correct: 1,
    },
    {
      question: "Nitroglycerin is beneficial in APE because it primarily:",
      answers: [
        "Causes bronchodilation",
        "Increases preload",
        "Decreases preload and cardiac workload",
        "Raises blood pressure",
      ],
      correct: 2,
    },
    {
      question: "Which blood pressure finding is commonly seen early in cardiogenic pulmonary edema?",
      answers: [
        "Severe hypotension",
        "Hypertension",
        "Normal blood pressure only",
        "Narrow pulse pressure only",
      ],
      correct: 1,
    },
  ];

  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const score = answers.reduce((total, answer, index) => {
    return answer === questions[index].correct ? total + 1 : total;
  }, 0);

  const percent = Math.round((score / questions.length) * 100);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-8 py-10">
        <Link href="/courses/acute-pulmonary-edema" className="text-sm font-semibold text-red-500">
          ← Back to Course
        </Link>

        <h1 className="mt-6 text-4xl font-bold">Acute Pulmonary Edema Quiz</h1>

        <div className="mt-8 space-y-6">
          {questions.map((q, index) => (
            <div key={q.question} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-xl font-semibold">
                {index + 1}. {q.question}
              </h2>

              <div className="mt-4 space-y-3">
                {q.answers.map((answer, answerIndex) => (
                  <button
                    key={answer}
                    onClick={() => {
                      const newAnswers = [...answers];
                      newAnswers[index] = answerIndex;
                      setAnswers(newAnswers);
                    }}
                    className={`block w-full rounded-lg border p-3 text-left ${
                      answers[index] === answerIndex
                        ? "border-red-500 bg-red-950"
                        : "border-zinc-700 hover:bg-zinc-800"
                    }`}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="mt-8 rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
        >
          Submit Quiz
        </button>

        {submitted && (
          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Quiz Result</h2>
            <p className="mt-3 text-zinc-300">
              You scored {score} out of {questions.length} ({percent}%).
            </p>

            <p className="mt-3 font-semibold">
              {percent >= 80 ? "Pass ✅" : "Review the course and try again."}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}