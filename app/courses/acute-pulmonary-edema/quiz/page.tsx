"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import { supabase } from "../../../../lib/supabase/client";

type QuizQuestion = {
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
};

const questions: QuizQuestion[] = [
  {
    question:
      "Which finding is most consistent with acute pulmonary edema?",
    answers: [
      "Clear lung sounds with slow respirations",
      "Crackles, severe dyspnea, and possible pink frothy sputum",
      "Unilateral wheezing following exercise",
      "Dry cough with normal oxygen saturation",
    ],
    correctAnswer: 1,
    explanation:
      "Acute pulmonary edema commonly causes severe respiratory distress, diffuse crackles, hypoxia, and sometimes pink frothy sputum.",
  },
  {
    question:
      "What is the primary benefit of CPAP in acute pulmonary edema?",
    answers: [
      "It lowers the patient’s blood glucose",
      "It replaces the need for reassessment",
      "It recruits alveoli and reduces the work of breathing",
      "It directly removes fluid from the lungs",
    ],
    correctAnswer: 2,
    explanation:
      "CPAP helps recruit collapsed alveoli, improves oxygenation, reduces work of breathing, and may reduce cardiac preload and afterload.",
  },
  {
    question:
      "Before administering nitroglycerin, the EMS provider should pay particular attention to:",
    answers: [
      "Blood pressure and contraindications",
      "The patient’s temperature only",
      "The patient’s blood glucose only",
      "Whether the patient has eaten recently",
    ],
    correctAnswer: 0,
    explanation:
      "Blood pressure, medication history, contraindications, and local protocol requirements must be reviewed before administering nitroglycerin.",
  },
  {
    question:
      "Which reassessment finding best suggests that treatment is helping?",
    answers: [
      "Increasing respiratory distress",
      "Decreasing oxygen saturation",
      "Improved breathing effort and oxygenation",
      "New altered mental status",
    ],
    correctAnswer: 2,
    explanation:
      "Improved respiratory effort, oxygen saturation, mental status, and overall appearance suggest that treatment is effective.",
  },
  {
    question:
      "What is an appropriate EMS priority for a patient with acute pulmonary edema?",
    answers: [
      "Delay transport until all symptoms resolve",
      "Provide airway and breathing support while arranging prompt transport",
      "Encourage the patient to walk to the ambulance",
      "Withhold oxygen regardless of oxygen saturation",
    ],
    correctAnswer: 1,
    explanation:
      "Airway and breathing support, protocol-based treatment, frequent reassessment, and prompt transport are key priorities.",
  },
];

export default function AcutePulmonaryEdemaQuizPage() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  function selectAnswer(questionIndex: number, answerIndex: number) {
    if (submitted) {
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answerIndex;
    setAnswers(updatedAnswers);
  }

  async function submitQuiz() {
    if (answers.some((answer) => answer === null)) {
      window.alert("Please answer every question before submitting.");
      return;
    }

    const correctAnswers = answers.reduce<number>(
      (total, answer, index) => {
        return answer === questions[index].correctAnswer
          ? total + 1
          : total;
      },
      0
    );

    const calculatedScore = Math.round(
      (correctAnswers / questions.length) * 100
    );

    setScore(calculatedScore);
    setSubmitted(true);
    setSaving(true);
    setSaveMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setSaveMessage(
        "Your score was calculated, but it was not saved because you are not logged in."
      );
      setSaving(false);
      return;
    }

    const passed = calculatedScore >= 80;

    const { error } = await supabase.from("course_progress").upsert(
      {
        user_id: user.id,
        course_slug: "acute-pulmonary-edema",
        course_title: "Acute Pulmonary Edema",
        progress_percent: passed ? 100 : 80,
        quiz_score: calculatedScore,
        completed: passed,
        certificate_earned: passed,
        completed_at: passed ? new Date().toISOString() : null,
      },
      {
        onConflict: "user_id,course_slug",
      }
    );

    if (error) {
      console.error("Course progress save error:", error);
      setSaveMessage(`Your score could not be saved: ${error.message}`);
      setSaving(false);
      return;
    }

    setSaveMessage(
      passed
        ? "Passed! Your score, completion, and certificate were saved."
        : "Your score was saved. A score of 80% or higher is required to earn the certificate."
    );

    setSaving(false);
  }

  function retakeQuiz() {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
    setScore(0);
    setSaveMessage("");
    setSaving(false);
  }

  const passed = score >= 80;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/courses/acute-pulmonary-edema"
          className="font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Course
        </Link>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            Course Assessment
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Acute Pulmonary Edema Quiz
          </h1>

          <p className="mt-3 text-zinc-400">
            Answer all five questions. A score of 80% or higher is required to
            earn the certificate.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {questions.map((question, questionIndex) => (
            <article
              key={question.question}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <p className="text-sm font-bold uppercase tracking-wide text-red-500">
                Question {questionIndex + 1}
              </p>

              <h2 className="mt-3 text-xl font-bold">
                {question.question}
              </h2>

              <div className="mt-5 space-y-3">
                {question.answers.map((answer, answerIndex) => {
                  const selected =
                    answers[questionIndex] === answerIndex;

                  const correct =
                    submitted &&
                    answerIndex === question.correctAnswer;

                  const incorrect =
                    submitted &&
                    selected &&
                    answerIndex !== question.correctAnswer;

                  return (
                    <button
                      key={answer}
                      type="button"
                      onClick={() =>
                        selectAnswer(questionIndex, answerIndex)
                      }
                      className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                        correct
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                          : incorrect
                          ? "border-red-500 bg-red-500/10 text-red-300"
                          : selected
                          ? "border-red-500 bg-red-500/10 text-white"
                          : "border-zinc-700 bg-black text-zinc-300 hover:border-red-500"
                      }`}
                    >
                      {answer}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-5 rounded-xl border border-zinc-700 bg-black p-4">
                  <p className="font-semibold text-zinc-200">
                    Explanation
                  </p>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {question.explanation}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        {!submitted ? (
          <button
            type="button"
            onClick={submitQuiz}
            className="mt-8 w-full rounded-xl bg-red-600 px-6 py-4 text-lg font-bold transition hover:bg-red-500"
          >
            Submit Quiz
          </button>
        ) : (
          <section
            className={`mt-8 rounded-2xl border p-8 text-center ${
              passed
                ? "border-emerald-500 bg-emerald-500/10"
                : "border-red-500 bg-red-500/10"
            }`}
          >
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-300">
              Quiz Complete
            </p>

            <h2 className="mt-3 text-5xl font-extrabold">
              {score}%
            </h2>

            <p className="mt-3 text-zinc-300">
              {passed
                ? "You passed the course assessment."
                : "You did not reach the required passing score of 80%."}
            </p>

            {saving && (
              <p className="mt-4 text-sm text-zinc-400">
                Saving your progress...
              </p>
            )}

            {saveMessage && (
              <p className="mt-4 text-sm text-zinc-300">
                {saveMessage}
              </p>
            )}

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={retakeQuiz}
                className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500 hover:text-red-400"
              >
                Retake Quiz
              </button>

              <Link
                href="/dashboard"
                className="rounded-xl border border-red-500 px-6 py-3 font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                View Dashboard
              </Link>

              {passed && (
                <Link
                  href={`/courses/acute-pulmonary-edema/certificate?score=${score}`}
                  className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
                >
                  View Certificate
                </Link>
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}