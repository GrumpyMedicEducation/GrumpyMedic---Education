"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import CourseAccessGate from "../../../components/CourseAccessGate";
import { supabase } from "../../../../lib/supabase/client";

const COURSE_SLUG = "obstetrical-emergencies";
const COURSE_TITLE = "Obstetrical Emergencies";
const PASSING_SCORE = 80;

type QuizQuestion = {
  question: string;
  details?: string[];
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const questions: QuizQuestion[] = [
  {
    question: "Routine patient care begins under which protocol?",
    options: ["2.5", "1.0", "5.3", "3.2"],
    correctAnswer: 1,
    explanation: "Protocol 2.10 directs providers to begin with Protocol 1.0 Routine Patient Care.",
  },
  {
    question: "A hemodynamically affected pregnant patient should generally be positioned:",
    options: ["Supine", "Left-lateral recumbent", "Right-lateral recumbent", "Prone"],
    correctAnswer: 1,
    explanation: "Left-lateral positioning helps reduce aortocaval compression unless a specific emergency requires another position.",
  },
  {
    question: "Digital vaginal examination is:",
    options: ["Required during every delivery", "Permitted whenever crowning is suspected", "Avoided except for specific protocol exceptions", "An EMT-only skill"],
    correctAnswer: 2,
    explanation: "Do not digitally examine or insert anything into the vagina except for specified management of breech airway, prolapsed cord, or nuchal cord.",
  },
  {
    question: "Which position is appropriate for a prolapsed cord?",
    options: ["High Fowler", "Knee-chest or Trendelenburg", "Supine with legs flat", "Right-lateral recumbent"],
    correctAnswer: 1,
    explanation: "Knee-chest or Trendelenburg positioning helps relieve pressure on the prolapsed cord.",
  },
  {
    question: "Why is the presenting part gently elevated during a prolapsed cord emergency?",
    options: ["To speed delivery", "To relieve pressure on the umbilical vessels", "To stop uterine contractions", "To remove the placenta"],
    correctAnswer: 1,
    explanation: "Elevation is used to remove pressure from the umbilical vessels and preserve blood flow through the cord.",
  },
  {
    question: "Which action is appropriate for postpartum hemorrhage?",
    options: ["Firm uterine fundal massage", "Routine vaginal packing", "Delay transport until bleeding stops", "Apply pressure over the maternal airway"],
    correctAnswer: 0,
    explanation: "Firmly massage the uterine fundus for immediate or delayed postpartum hemorrhage.",
  },
  {
    question: "Dressings for visible perineal lacerations should be applied:",
    options: ["Intravaginally", "Externally with pressure", "Only after hospital arrival", "Without direct pressure"],
    correctAnswer: 1,
    explanation: "Apply external dressings and pressure to visible lacerations. Do not apply intravaginal dressings.",
  },
  {
    question: "What is the protocol oxytocin IM dose?",
    options: ["5 units", "10 units", "20 units", "40 units"],
    correctAnswer: 1,
    explanation: "When available, administer oxytocin 10 units IM.",
  },
  {
    question: "What is the protocol oxytocin IV infusion preparation?",
    options: ["10 units in 250 mL NS", "20 units in 1 liter NS", "40 units in 500 mL NS", "5 units in 1 liter LR"],
    correctAnswer: 1,
    explanation: "The protocol lists 20 units mixed in 1 liter of IV normal saline and administered as a wide-open bolus.",
  },
  {
    question: "Under this protocol, TXA is indicated for:",
    options: ["Any pregnancy-related bleeding", "Immediate postpartum hemorrhage only", "Eclamptic seizures", "Prolapsed cord"],
    correctAnswer: 1,
    explanation: "Protocol 2.10 specifies TXA for immediate postpartum hemorrhage only.",
  },
  {
    question: "What is the TXA dose for immediate postpartum hemorrhage?",
    options: ["500 mg IV", "1 g IV push", "2 g IV push", "3 g IM"],
    correctAnswer: 2,
    explanation: "The listed dose is TXA 2 grams IV push.",
  },
  {
    question: "Which provider level may administer TXA under the standing orders shown?",
    options: ["EMR", "EMT", "AEMT", "Paramedic"],
    correctAnswer: 3,
    explanation: "TXA appears under Paramedic Standing Orders.",
  },
  {
    question: "Which medication is listed for eclamptic seizures?",
    options: ["Naloxone", "Midazolam", "Albuterol", "Atropine"],
    correctAnswer: 1,
    explanation: "Midazolam is listed for eclamptic seizures.",
  },
  {
    question: "What is the listed midazolam dose for an eclamptic seizure?",
    options: ["1 mg only", "2–6 mg", "8–10 mg", "20 mg"],
    correctAnswer: 1,
    explanation: "The protocol lists midazolam 2–6 mg by the specified routes.",
  },
  {
    question: "What is the magnesium sulfate dose?",
    options: ["1 g IV push", "2–4 g IV/IO over 5 minutes", "5–10 g IM", "20 mg/kg IN"],
    correctAnswer: 1,
    explanation: "Magnesium sulfate is listed as 2–4 grams IV/IO over 5 minutes.",
  },
  {
    question: "Calcium chloride or calcium gluconate may be ordered as an antidote for:",
    options: ["Oxytocin", "TXA", "Magnesium sulfate", "Midazolam"],
    correctAnswer: 2,
    explanation: "Calcium is listed as the antidote for magnesium sulfate.",
  },
  {
    question: "What is the maximum calcium dose listed under Medical Control?",
    options: ["500 mg", "1 gram", "2 grams", "5 grams"],
    correctAnswer: 1,
    explanation: "The maximum listed calcium dose is 1 gram.",
  },
  {
    question: "During maternal cardiac arrest, manual uterine displacement should be directed:",
    options: ["To the right", "To the left", "Straight upward", "Toward the feet"],
    correctAnswer: 1,
    explanation: "Displace the gravid uterus to the left to improve venous return.",
  },
  {
    question: "When is manual uterine displacement specifically emphasized?",
    options: ["When the fundus is at or above the umbilicus", "Only after delivery", "Only below 20 weeks", "Only when fetal movement is absent"],
    correctAnswer: 0,
    explanation: "The protocol highlights displacement when fundal height is at or above the umbilicus.",
  },
  {
    question: "A patient has heavy bleeding 15 minutes after delivery, BP 82/46, and pulse 128. Which treatment package best follows the protocol?",
    options: [
      "Vaginal packing and delayed transport",
      "Fundal massage, external bleeding control, resuscitative care, rapid transport, and paramedic medications when indicated",
      "Digital examination and oral fluids",
      "Trendelenburg only with no hemorrhage treatment",
    ],
    correctAnswer: 1,
    explanation: "This presentation is immediate postpartum hemorrhage with shock. Treat bleeding, support circulation, transport rapidly, and provide authorized paramedic medications.",
  },
];

export default function ObstetricalEmergenciesQuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.correctAnswer ? 1 : 0),
    0,
  );
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= PASSING_SCORE;

  function selectAnswer(questionIndex: number, optionIndex: number) {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }));
  }

  async function submitQuiz() {
    if (answeredCount !== questions.length) {
      window.alert("Please answer every question before submitting the quiz.");
      return;
    }

    setSubmitted(true);
    setSaveError("");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const finalScore = Math.round(
      (questions.reduce(
        (total, question, index) =>
          total + (answers[index] === question.correctAnswer ? 1 : 0),
        0,
      ) /
        questions.length) *
        100,
    );

    if (finalScore >= PASSING_SCORE) {
      await saveCompletion(finalScore);
    }
  }

  async function saveCompletion(finalScore: number) {
    setSaving(true);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      setSaveError(
        sessionError?.message ||
          "Your session could not be verified. Sign in again and resubmit the quiz.",
      );
      setSaving(false);
      return;
    }

    const userId = session.user.id;

    const { data: existing, error: readError } = await supabase
      .from("course_completions")
      .select("best_score, certificate_id")
      .eq("user_id", userId)
      .eq("course_slug", COURSE_SLUG)
      .maybeSingle();

    if (readError) {
      setSaveError(readError.message || "Your completion record could not be checked.");
      setSaving(false);
      return;
    }

    const bestScore = Math.max(existing?.best_score ?? 0, finalScore);
    const certificateId =
      existing?.certificate_id ||
      `GM-${COURSE_SLUG.toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const { error: saveCompletionError } = await supabase
      .from("course_completions")
      .upsert(
        {
          user_id: userId,
          course_slug: COURSE_SLUG,
          course_title: COURSE_TITLE,
          best_score: bestScore,
          passing_score: PASSING_SCORE,
          completed_at: new Date().toISOString(),
          certificate_id: certificateId,
          verified: false,
        },
        { onConflict: "user_id,course_slug" },
      );

    if (saveCompletionError) {
      setSaveError(
        saveCompletionError.message ||
          "Your passing score could not be saved. Please try again.",
      );
    }

    setSaving(false);
  }

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
    setSaveError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href="/courses/obstetrical-emergencies"
          className="font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Course
        </Link>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Final Knowledge Check
          </p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Obstetrical Emergencies Quiz
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
            Answer all {questions.length} questions. A score of {PASSING_SCORE}%
            or higher is required to pass and unlock the certificate.
          </p>
        </div>

        <div className="mt-8">
          <CourseAccessGate
            accessLevel="login"
            title="Sign In to Take the Quiz"
            description="Create a free GrumpyMedic Education account or log in to take the quiz and qualify for a certificate."
          >
            {!submitted && (
              <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-zinc-300">Progress</span>
                  <span className="font-bold text-red-400">
                    {answeredCount} of {questions.length} answered
                  </span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-red-600 transition-all"
                    style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {submitted && (
              <section
                className={`rounded-2xl border p-6 ${
                  passed
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-red-500 bg-red-500/10"
                }`}
              >
                <p className="text-sm font-bold uppercase tracking-wide text-zinc-300">
                  Quiz Result
                </p>
                <div className="mt-3 flex flex-wrap items-end gap-4">
                  <span className="text-6xl font-extrabold">{percentage}%</span>
                  <span className="pb-2 text-xl font-bold">
                    {score} of {questions.length} correct
                  </span>
                </div>
                <h2 className={`mt-5 text-2xl font-bold ${passed ? "text-emerald-400" : "text-red-400"}`}>
                  {passed ? "Passed" : "Additional review required"}
                </h2>
                {saving && <p className="mt-3 text-zinc-300">Saving your completion record…</p>}
                {saveError && <p className="mt-3 text-red-400">{saveError}</p>}
              </section>
            )}

            <div className="mt-10 space-y-8">
              {questions.map((question, questionIndex) => {
                const selectedAnswer = answers[questionIndex];
                const isCorrect = selectedAnswer === question.correctAnswer;

                return (
                  <section
                    key={question.question}
                    className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 font-extrabold">
                        {questionIndex + 1}
                      </span>
                      <div>
                        <h2 className="text-xl font-bold leading-8">{question.question}</h2>
                        {question.details && (
                          <ul className="mt-3 space-y-1 text-zinc-400">
                            {question.details.map((detail) => (
                              <li key={detail}>• {detail}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const selected = selectedAnswer === optionIndex;
                        const correct = submitted && optionIndex === question.correctAnswer;
                        const incorrect = submitted && selected && !correct;

                        return (
                          <button
                            key={option}
                            type="button"
                            disabled={submitted}
                            onClick={() => selectAnswer(questionIndex, optionIndex)}
                            className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                              correct
                                ? "border-emerald-500 bg-emerald-500/10"
                                : incorrect
                                  ? "border-red-500 bg-red-500/10"
                                  : selected
                                    ? "border-red-500 bg-red-500/10"
                                    : "border-zinc-700 bg-black hover:border-zinc-500"
                            }`}
                          >
                            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold ${
                              selected ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300"
                            }`}>
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <span className="pt-1 text-zinc-200">{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {submitted && (
                      <div className={`mt-5 rounded-xl border p-4 ${
                        isCorrect
                          ? "border-emerald-500/60 bg-emerald-500/10"
                          : "border-amber-500/60 bg-amber-500/10"
                      }`}>
                        <p className="font-bold">{isCorrect ? "Correct" : "Review this question"}</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-300">
                          {question.explanation}
                        </p>
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
                <>
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="rounded-xl border border-red-500 px-8 py-4 font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Retake Quiz
                  </button>
                  <Link
                    href="/courses"
                    className="rounded-xl border border-zinc-600 px-8 py-4 font-bold text-zinc-300 transition hover:border-zinc-400 hover:text-white"
                  >
                    Return to Courses
                  </Link>
                </>
              )}
            </div>

            {submitted && passed && !saveError && (
              <div className="mt-10">
                <CourseAccessGate
                  accessLevel="profile"
                  title="Complete Your Profile to Access the Certificate"
                  description="Your full name, provider level, and organization are required before your certificate can be issued."
                >
                  <section className="rounded-2xl border border-emerald-700 bg-emerald-950/20 p-8 text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
                      Certificate Unlocked
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold">
                      Your Certificate Is Ready
                    </h2>
                    <Link
                      href="/courses/obstetrical-emergencies/certificate"
                      className="mt-6 inline-block rounded-xl bg-emerald-600 px-8 py-4 font-bold text-white transition hover:bg-emerald-500"
                    >
                      View Certificate
                    </Link>
                  </section>
                </CourseAccessGate>
              </div>
            )}
          </CourseAccessGate>
        </div>
      </section>
    </main>
  );
}
