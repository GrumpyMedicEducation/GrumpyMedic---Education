"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import CourseAccessGate from "../../../components/CourseAccessGate";
import { supabase } from "../../../../lib/supabase/client";

const COURSE_SLUG = "glucagon-hypoglycemia";
const COURSE_TITLE = "Glucagon for Hypoglycemia";
const PASSING_SCORE = 80;

type QuizQuestion = {
  question: string;
  details?: string[];
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type ExistingCompletion = {
  best_score: number;
  completed_at: string;
  verified: boolean;
};

const questions: QuizQuestion[] = [
  {
    question:
      "Which condition must be present before administering glucagon?",
    options: [
      "Blood glucose below 100 mg/dL",
      "Altered mental status with suspected hypoglycemia",
      "Any diabetic patient requesting glucagon",
      "Blood glucose below 80 mg/dL with normal mental status",
    ],
    correctAnswer: 1,
    explanation:
      "Glucagon is appropriate when hypoglycemia is suspected or confirmed, the patient has altered mental status, and the patient cannot safely swallow oral glucose.",
  },
  {
    question: "What is the adult dose of glucagon?",
    options: [
      "0.5 mg IM only",
      "1 mg IM or IN",
      "2 mg IM only",
      "1 mg IV only",
    ],
    correctAnswer: 1,
    explanation:
      "The adult dose presented in this course is 1 mg administered intramuscularly or intranasally.",
  },
  {
    question:
      "When should blood glucose be rechecked after glucagon administration?",
    options: [
      "5 minutes",
      "10 minutes",
      "15 minutes",
      "30 minutes",
    ],
    correctAnswer: 2,
    explanation:
      "Blood glucose and mental status should be reassessed after 15 minutes.",
  },
  {
    question:
      "A pediatric patient weighs 18 kg. What is the correct glucagon dose?",
    options: [
      "0.25 mg IM or IN",
      "0.5 mg IM or IN",
      "1 mg IM or IN",
      "2 mg IM or IN",
    ],
    correctAnswer: 1,
    explanation:
      "A pediatric patient weighing less than 20 kg receives 0.5 mg IM or IN.",
  },
  {
    question:
      "A pediatric patient weighs 25 kg. What is the correct glucagon dose?",
    options: [
      "0.5 mg IM or IN",
      "0.75 mg IM only",
      "1 mg IM or IN",
      "2 mg IM or IN",
    ],
    correctAnswer: 2,
    explanation:
      "A pediatric patient weighing 20 kg or greater receives 1 mg IM or IN.",
  },
  {
    question:
      "Which combination correctly describes participation requirements for EMT-Basic glucagon administration?",
    options: [
      "AHMD approval only",
      "Annual mandatory retraining only",
      "Initial training only, with no competency documentation",
      "AHMD approval, initial training and oversight, demonstrated hands-on competency, and service-maintained training records",
    ],
    correctAnswer: 3,
    explanation:
      "Participation requires Affiliate Hospital Medical Director approval, initial training and oversight, documented hands-on competency, and service-maintained training records.",
  },
  {
    question:
      "Which routes are approved for glucagon administration in this course?",
    options: [
      "IV only",
      "IM only",
      "IN only",
      "IM or IN",
    ],
    correctAnswer: 3,
    explanation:
      "The routes presented in this course are intramuscular and intranasal.",
  },
  {
    question:
      "You arrive to find a 54-year-old diabetic patient unconscious. What is the next appropriate step?",
    details: [
      "Blood glucose: 42 mg/dL",
      "The patient cannot swallow.",
    ],
    options: [
      "Give oral glucose",
      "Administer 1 mg glucagon IM or IN",
      "Wait for ALS without providing treatment",
      "Start IV dextrose as an EMT-Basic",
    ],
    correctAnswer: 1,
    explanation:
      "The patient is hypoglycemic, has altered mental status, and cannot swallow. Administer 1 mg glucagon IM or IN while protecting the airway and preparing for transport.",
  },
  {
    question:
      "You administer glucagon to an adult patient. After 15 minutes, what should you do?",
    details: [
      "Blood glucose: 62 mg/dL",
      "The patient remains confused.",
    ],
    options: [
      "Transport without further reassessment",
      "Give oral glucose immediately despite the confusion",
      "Repeat glucagon 1 mg IM or IN according to protocol",
      "Wait another 30 minutes before reassessing",
    ],
    correctAnswer: 2,
    explanation:
      "The glucose remains below 70 mg/dL and the patient still has altered mental status. Repeat glucagon according to protocol while continuing airway monitoring and transport.",
  },
  {
    question:
      "After glucagon administration, the patient becomes alert and can swallow safely. What is the appropriate next step?",
    options: [
      "Withhold all food and drink",
      "Provide oral glucose or carbohydrates",
      "Repeat glucagon immediately",
      "Cancel transport",
    ],
    correctAnswer: 1,
    explanation:
      "Once the patient can swallow safely, provide oral glucose or carbohydrates and continue monitoring and transport.",
  },
  {
    question:
      "What blood glucose level defines hypoglycemia in this course?",
    options: [
      "Below 60 mg/dL",
      "Below 70 mg/dL",
      "Below 80 mg/dL",
      "Below 100 mg/dL",
    ],
    correctAnswer: 1,
    explanation:
      "Hypoglycemia is defined in this course as a blood glucose level below 70 mg/dL.",
  },
  {
    question:
      "Which complication should EMTs commonly anticipate after glucagon administration?",
    options: [
      "Respiratory depression",
      "Vomiting",
      "Severe bradycardia",
      "Profound hypothermia",
    ],
    correctAnswer: 1,
    explanation:
      "Nausea and vomiting are common. Position the patient appropriately, prepare suction, and continue airway monitoring.",
  },
];

export default function GlucagonQuizPage() {
  const [answers, setAnswers] = useState<
    Record<number, number>
  >({});

  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [recordSaved, setRecordSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [bestScore, setBestScore] = useState<number | null>(
    null,
  );

  const answeredCount = Object.keys(answers).length;

  const score = questions.reduce(
    (total, question, index) => {
      return (
        total +
        (answers[index] === question.correctAnswer ? 1 : 0)
      );
    },
    0,
  );

  const percentage = Math.round(
    (score / questions.length) * 100,
  );

  const passed = percentage >= PASSING_SCORE;

  useEffect(() => {
    markQuizStarted();
  }, []);

  async function markQuizStarted() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from("course_progress")
      .upsert(
        {
          user_id: user.id,
          course_slug: COURSE_SLUG,
          course_title: COURSE_TITLE,
          lesson_started: true,
          lesson_completed: true,
          quiz_started: true,
          last_section: "quiz-started",
          progress_percentage: 75,
        },
        {
          onConflict: "user_id,course_slug",
        },
      );

    if (error) {
      console.error(
        "Unable to mark quiz as started:",
        error,
      );
    }
  }

  function selectAnswer(
    questionIndex: number,
    optionIndex: number,
  ) {
    if (submitted || saving) {
      return;
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionIndex]: optionIndex,
    }));
  }

  async function submitQuiz() {
    if (answeredCount !== questions.length) {
      window.alert(
        "Please answer every question before submitting the quiz.",
      );
      return;
    }

    setSaving(true);
    setSaveError("");
    setRecordSaved(false);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error(
        "Unable to verify quiz session:",
        sessionError,
      );

      setSaveError(
        sessionError.message ||
          "Your quiz submission could not be verified.",
      );

      setSaving(false);
      return;
    }

    const user = session?.user;

    if (!user) {
      setSaveError(
        "Please log in before submitting the quiz.",
      );

      setSaving(false);
      return;
    }

    const { error: attemptError } = await supabase
      .from("quiz_attempts")
      .insert({
        user_id: user.id,
        course_slug: COURSE_SLUG,
        course_title: COURSE_TITLE,
        score: percentage,
        correct_answers: score,
        total_questions: questions.length,
        passing_score: PASSING_SCORE,
        passed,
        verified: false,
      });

    if (attemptError) {
      console.error(
        "Unable to save quiz attempt:",
        attemptError,
      );

      setSaveError(
        attemptError.message ||
          "Your quiz attempt could not be saved.",
      );

      setSaving(false);
      return;
    }

    const { error: progressError } = await supabase
      .from("course_progress")
      .upsert(
        {
          user_id: user.id,
          course_slug: COURSE_SLUG,
          course_title: COURSE_TITLE,
          lesson_started: true,
          lesson_completed: true,
          quiz_started: true,
          last_section: passed
            ? "quiz-passed"
            : "quiz-completed",
          progress_percentage: passed ? 100 : 75,
        },
        {
          onConflict: "user_id,course_slug",
        },
      );

    if (progressError) {
      console.error(
        "Unable to update course progress:",
        progressError,
      );

      setSaveError(
        progressError.message ||
          "Your quiz was saved, but course progress could not be updated.",
      );

      setSubmitted(true);
      setSaving(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (passed) {
      const { data: existingData, error: existingError } =
        await supabase
          .from("course_completions")
          .select(
            `
              best_score,
              completed_at,
              verified
            `,
          )
          .eq("user_id", user.id)
          .eq("course_slug", COURSE_SLUG)
          .maybeSingle();

      if (existingError) {
        console.error(
          "Unable to check existing completion:",
          existingError,
        );

        setSaveError(
          existingError.message ||
            "Your attempt was saved, but the completion record could not be checked.",
        );

        setSubmitted(true);
        setSaving(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      const existingCompletion =
        (existingData ?? null) as ExistingCompletion | null;

      const newBestScore = Math.max(
        existingCompletion?.best_score ?? 0,
        percentage,
      );

      const completionPayload = {
        user_id: user.id,
        course_slug: COURSE_SLUG,
        course_title: COURSE_TITLE,
        best_score: newBestScore,
        passing_score: PASSING_SCORE,
        verified: false,
        completed_at:
          existingCompletion?.completed_at ??
          new Date().toISOString(),
      };

      const { error: completionError } = await supabase
        .from("course_completions")
        .upsert(completionPayload, {
          onConflict: "user_id,course_slug",
        });

      if (completionError) {
        console.error(
          "Unable to save course completion:",
          completionError,
        );

        setSaveError(
          completionError.message ||
            "Your quiz attempt was saved, but the course completion record could not be created.",
        );

        setSubmitted(true);
        setSaving(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      setBestScore(newBestScore);
    }

    setSubmitted(true);
    setRecordSaved(true);
    setSaving(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
    setSaving(false);
    setRecordSaved(false);
    setSaveError("");
    setBestScore(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href="/courses/glucagon-hypoglycemia"
          className="font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Course
        </Link>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Final Knowledge Check
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Glucagon for Hypoglycemia Quiz
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
            Answer all 12 questions. A score of 80% or
            higher is required to pass and create a course
            completion record.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Questions
              </p>

              <p className="mt-2 font-bold text-white">
                12 Questions
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Passing Score
              </p>

              <p className="mt-2 font-bold text-white">
                80%
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Progress
              </p>

              <p className="mt-2 font-bold text-white">
                Saved to Account
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <CourseAccessGate
            accessLevel="login"
            title="Sign In to Take the Quiz"
            description="Create a free GrumpyMedic Education account or log in to take the Glucagon for Hypoglycemia quiz and save the result to your student record."
          >
            {!submitted && (
              <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-zinc-300">
                    Progress
                  </span>

                  <span className="font-bold text-red-400">
                    {answeredCount} of {questions.length}{" "}
                    answered
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-red-600 transition-all"
                    style={{
                      width: `${
                        (answeredCount / questions.length) *
                        100
                      }%`,
                    }}
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
                  <span className="text-6xl font-extrabold">
                    {percentage}%
                  </span>

                  <span className="pb-2 text-xl font-bold">
                    {score} of {questions.length} correct
                  </span>
                </div>

                <h2
                  className={`mt-5 text-2xl font-bold ${
                    passed
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {passed
                    ? "Course Passed"
                    : "Additional Review Required"}
                </h2>

                <p className="mt-2 text-zinc-300">
                  {passed
                    ? "You achieved the passing score. Your course completion has been saved."
                    : "Your attempt has been saved. Review the explanations and retake the quiz."}
                </p>

                {bestScore !== null && (
                  <p className="mt-3 font-semibold text-emerald-300">
                    Saved best score: {bestScore}%
                  </p>
                )}
              </section>
            )}

            {recordSaved && (
              <div className="mt-6 rounded-xl border border-green-800 bg-green-950/20 p-5">
                <p className="font-bold text-green-400">
                  Student Record Updated
                </p>

                <p className="mt-2 leading-6 text-zinc-300">
                  This quiz attempt and your current course
                  progress were successfully saved.
                </p>
              </div>
            )}

            {saveError && (
              <div className="mt-6 rounded-xl border border-red-700 bg-red-950/20 p-5">
                <p className="font-bold text-red-400">
                  Record-Saving Error
                </p>

                <p className="mt-2 leading-6 text-zinc-300">
                  {saveError}
                </p>
              </div>
            )}

            <div className="mt-10 space-y-8">
              {questions.map(
                (question, questionIndex) => {
                  const selectedAnswer =
                    answers[questionIndex];

                  const isCorrect =
                    selectedAnswer ===
                    question.correctAnswer;

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
                          <h2 className="text-xl font-bold leading-8">
                            {question.question}
                          </h2>

                          {question.details && (
                            <ul className="mt-3 space-y-1 text-zinc-400">
                              {question.details.map(
                                (detail) => (
                                  <li key={detail}>
                                    • {detail}
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        {question.options.map(
                          (option, optionIndex) => {
                            const selected =
                              selectedAnswer === optionIndex;

                            const correct =
                              submitted &&
                              optionIndex ===
                                question.correctAnswer;

                            const incorrect =
                              submitted &&
                              selected &&
                              !correct;

                            return (
                              <button
                                key={option}
                                type="button"
                                disabled={submitted || saving}
                                onClick={() =>
                                  selectAnswer(
                                    questionIndex,
                                    optionIndex,
                                  )
                                }
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
                                <span
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold ${
                                    selected
                                      ? "bg-red-600 text-white"
                                      : "bg-zinc-800 text-zinc-300"
                                  }`}
                                >
                                  {String.fromCharCode(
                                    65 + optionIndex,
                                  )}
                                </span>

                                <span className="pt-1 text-zinc-200">
                                  {option}
                                </span>
                              </button>
                            );
                          },
                        )}
                      </div>

                      {submitted && (
                        <div
                          className={`mt-5 rounded-xl border p-4 ${
                            isCorrect
                              ? "border-emerald-500/60 bg-emerald-500/10"
                              : "border-amber-500/60 bg-amber-500/10"
                          }`}
                        >
                          <p className="font-bold">
                            {isCorrect
                              ? "Correct"
                              : "Review this question"}
                          </p>

                          <p className="mt-2 text-sm leading-6 text-zinc-300">
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </section>
                  );
                },
              )}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {!submitted ? (
                <button
                  type="button"
                  onClick={submitQuiz}
                  disabled={saving}
                  className={`rounded-xl px-8 py-4 font-bold transition ${
                    saving
                      ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                      : "bg-red-600 text-white hover:bg-red-500"
                  }`}
                >
                  {saving
                    ? "Saving Quiz..."
                    : "Submit Quiz"}
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

            {submitted && passed && recordSaved && (
              <div className="mt-10">
                <CourseAccessGate
                  accessLevel="profile"
                  title="Complete Your Profile to Access the Certificate"
                  description="Your full name, provider level, and organization are required before your course certificate can be issued."
                >
                  <section className="rounded-2xl border border-emerald-700 bg-emerald-950/20 p-8 text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
                      Course Completion Saved
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold">
                      Your Certificate Is Available
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-300">
                      Your passing result is now stored in
                      your GrumpyMedic Education account.
                    </p>

                    <Link
                      href="/courses/glucagon-hypoglycemia/certificate"
                      className="mt-6 inline-block rounded-xl bg-emerald-600 px-8 py-4 font-bold text-white transition hover:bg-emerald-500"
                    >
                      View Certificate
                    </Link>
                  </section>
                </CourseAccessGate>
              </div>
            )}

            <p className="mt-10 text-center text-sm leading-6 text-zinc-500">
              Educational content only. Follow current
              state and local protocols, medical-director
              authorization, service requirements, and
              manufacturer instructions.
            </p>
          </CourseAccessGate>
        </div>
      </section>
    </main>
  );
}