"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import QuizAccessGate from "../../../components/courses/QuizAccessGate";
import { supabase } from "../../../../lib/supabase/client";

const COURSE_SLUG = "bronchospasm-respiratory-distress";

type ExamQuestionRow = {
  question_id: string;
  display_order: number;
  prompt: string;
  option_id: string;
  option_order: number;
  option_text: string;
};

type ExamOption = {
  id: string;
  order: number;
  text: string;
};

type ExamQuestion = {
  id: string;
  displayOrder: number;
  prompt: string;
  options: ExamOption[];
};

type SubmittedAnswer = {
  question_id: string;
  option_id: string;
};

type SubmitExamResult = {
  score: number | string;
  passed: boolean;
};

type LatestAttempt = {
  id: string;
  score: number | string | null;
  passed: boolean | null;
  submitted_at: string | null;
  started_at: string;
};

function groupQuestionRows(rows: ExamQuestionRow[]): ExamQuestion[] {
  const questionMap = new Map<string, ExamQuestion>();

  for (const row of rows) {
    const existingQuestion = questionMap.get(row.question_id);

    if (existingQuestion) {
      existingQuestion.options.push({
        id: row.option_id,
        order: row.option_order,
        text: row.option_text,
      });
      continue;
    }

    questionMap.set(row.question_id, {
      id: row.question_id,
      displayOrder: row.display_order,
      prompt: row.prompt,
      options: [
        {
          id: row.option_id,
          order: row.option_order,
          text: row.option_text,
        },
      ],
    });
  }

  return Array.from(questionMap.values())
    .sort(
      (firstQuestion, secondQuestion) =>
        firstQuestion.displayOrder - secondQuestion.displayOrder,
    )
    .map((question) => ({
      ...question,
      options: [...question.options].sort(
        (firstOption, secondOption) =>
          firstOption.order - secondOption.order,
      ),
    }));
}

export default function BronchospasmRespiratoryQuizPage() {
  return (
    <QuizAccessGate
      courseSlug={COURSE_SLUG}
      courseTitle="Bronchospasm / Respiratory Distress"
    >
      <BronchospasmRespiratoryQuizContent />
    </QuizAccessGate>
  );
}

function BronchospasmRespiratoryQuizContent() {
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [examAttemptId, setExamAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [startingExam, setStartingExam] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [passed, setPassed] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadExamQuestions = useCallback(async (attemptId: string) => {
    const { data, error } = await supabase.rpc(
      "get_exam_attempt_questions",
      {
        requested_exam_attempt_id: attemptId,
      },
    );

    if (error) {
      throw new Error(error.message);
    }

    const rows = (data ?? []) as ExamQuestionRow[];
    const groupedQuestions = groupQuestionRows(rows);

    if (groupedQuestions.length === 0) {
      throw new Error(
        "No assessment questions were returned for this attempt.",
      );
    }

    setQuestions(groupedQuestions);
    setExamAttemptId(attemptId);
    setSubmitted(false);
    setScore(null);
    setPassed(false);
  }, []);

  const initializeAssessment = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");
    setMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "You must be logged in to take this assessment.",
        );
      }

      const {
        data: enrollmentData,
        error: enrollmentError,
      } = await supabase.rpc("enroll_in_course", {
        requested_course_slug: COURSE_SLUG,
      });

      if (enrollmentError) {
        throw new Error(enrollmentError.message);
      }

      const secureEnrollmentId = enrollmentData as string;
      setEnrollmentId(secureEnrollmentId);

      const {
        data: latestAttempts,
        error: latestAttemptError,
      } = await supabase.rpc("get_latest_exam_attempt", {
        requested_enrollment_id: secureEnrollmentId,
      });

      if (latestAttemptError) {
        throw new Error(latestAttemptError.message);
      }

      const latestAttempt = latestAttempts?.[0] as
        | LatestAttempt
        | undefined;

      if (!latestAttempt) {
        return;
      }

      if (latestAttempt.submitted_at) {
        setExamAttemptId(latestAttempt.id);
        setQuestions([]);
        setAnswers({});
        setScore(Number(latestAttempt.score ?? 0));
        setPassed(Boolean(latestAttempt.passed));
        setSubmitted(true);

        setMessage(
          latestAttempt.passed
            ? "Your completed passing assessment result was restored."
            : "Your most recent completed assessment result was restored.",
        );

        return;
      }

      await loadExamQuestions(latestAttempt.id);

      setMessage("Your open assessment attempt was restored.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The assessment could not be initialized.",
      );
    } finally {
      setLoading(false);
    }
  }, [loadExamQuestions]);

  useEffect(() => {
    void initializeAssessment();
  }, [initializeAssessment]);

  async function beginAssessment() {
    if (!enrollmentId) {
      setErrorMessage(
        "Your course enrollment could not be confirmed.",
      );
      return;
    }

    setStartingExam(true);
    setErrorMessage("");
    setMessage("");

    try {
      const { data, error } = await supabase.rpc(
        "begin_exam_attempt",
        {
          requested_enrollment_id: enrollmentId,
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      const newAttemptId = data as string;

      setAnswers({});
      setSubmitted(false);
      setScore(null);
      setPassed(false);

      await loadExamQuestions(newAttemptId);

      setMessage(
        "Your assessment attempt has started. Answer every question before submitting.",
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The assessment could not be started.",
      );
    } finally {
      setStartingExam(false);
    }
  }

  function selectAnswer(questionId: string, optionId: string) {
    if (submitted || submitting) {
      return;
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: optionId,
    }));
  }

  async function submitAssessment() {
    if (!examAttemptId) {
      setErrorMessage(
        "No open assessment attempt was found.",
      );
      return;
    }

    const unansweredQuestions = questions.filter(
      (question) => !answers[question.id],
    );

    if (unansweredQuestions.length > 0) {
      setErrorMessage(
        "Please answer every question before submitting.",
      );
      return;
    }

    const submittedAnswers: SubmittedAnswer[] = questions.map(
      (question) => ({
        question_id: question.id,
        option_id: answers[question.id],
      }),
    );

    setSubmitting(true);
    setErrorMessage("");
    setMessage("");

    try {
      const { data, error } = await supabase.rpc(
        "submit_exam_attempt",
        {
          requested_exam_attempt_id: examAttemptId,
          submitted_answers: submittedAnswers,
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      const result = (data?.[0] ?? data) as
        | SubmitExamResult
        | undefined;

      if (!result) {
        throw new Error(
          "The assessment was submitted, but no score was returned.",
        );
      }

      const returnedScore = Number(result.score);
      const returnedPassed = Boolean(result.passed);

      setScore(returnedScore);
      setPassed(returnedPassed);
      setSubmitted(true);
      setQuestions([]);
      setAnswers({});

      setMessage(
        returnedPassed
          ? "You passed the secure course assessment. Your score and responses were saved."
          : "Your score and responses were saved. You did not reach the required passing score.",
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The assessment could not be submitted.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function beginAnotherAttempt() {
    setQuestions([]);
    setAnswers({});
    setExamAttemptId(null);
    setSubmitted(false);
    setScore(null);
    setPassed(false);
    setMessage("");
    setErrorMessage("");

    await beginAssessment();
  }

  const answeredCount = questions.filter(
    (question) => Boolean(answers[question.id]),
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="text-lg font-semibold text-zinc-300">
            Loading secure assessment…
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/courses/bronchospasm-respiratory-distress"
          className="font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Course
        </Link>

        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            Secure Course Assessment
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Bronchospasm / Respiratory Distress
          </h1>

          <p className="mt-3 text-zinc-400">
            Answer all 25 questions. The server securely grades and retains the
            assessment. A score of 80% or higher is required to pass.
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mt-8 rounded-xl border border-red-500 bg-red-500/10 p-4 text-red-200"
          >
            {errorMessage}
          </div>
        )}

        {message && (
          <div className="mt-8 rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-zinc-300">
            {message}
          </div>
        )}

        {!examAttemptId && (
          <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <h2 className="text-2xl font-extrabold">
              Ready to Begin?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-zinc-400">
              Starting the assessment creates an official attempt. Your questions,
              submitted answers, score, and result will be retained with your course record.
            </p>

            <button
              type="button"
              onClick={beginAssessment}
              disabled={startingExam || !enrollmentId}
              className="mt-6 rounded-xl bg-red-600 px-7 py-3 font-bold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              {startingExam
                ? "Starting Assessment…"
                : "Begin Assessment"}
            </button>
          </section>
        )}

        {examAttemptId && !submitted && (
          <>
            <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-zinc-300">
                  Questions answered
                </span>

                <span className="font-bold text-red-400">
                  {answeredCount} of {questions.length}
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full bg-red-600 transition-all"
                  style={{
                    width: `${
                      questions.length > 0
                        ? (answeredCount / questions.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {questions.map((question, questionIndex) => (
                <article
                  key={question.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                >
                  <p className="text-sm font-bold uppercase tracking-wide text-red-500">
                    Question {questionIndex + 1}
                  </p>

                  <h2 className="mt-3 text-xl font-bold">
                    {question.prompt}
                  </h2>

                  <div className="mt-5 space-y-3">
                    {question.options.map((option) => {
                      const selected =
                        answers[question.id] === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() =>
                            selectAnswer(question.id, option.id)
                          }
                          className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                            selected
                              ? "border-red-500 bg-red-500/10 text-white"
                              : "border-zinc-700 bg-black text-zinc-300 hover:border-red-500"
                          }`}
                        >
                          <span className="mr-3 font-bold text-red-400">
                            {String.fromCharCode(65 + option.order)}.
                          </span>

                          {option.text}
                        </button>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={submitAssessment}
              disabled={
                submitting ||
                answeredCount !== questions.length
              }
              className="mt-8 w-full rounded-xl bg-red-600 px-6 py-4 text-lg font-bold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              {submitting
                ? "Submitting Secure Assessment…"
                : "Submit Assessment"}
            </button>
          </>
        )}

        {submitted && score !== null && (
          <section
            className={`mt-8 rounded-2xl border p-8 text-center ${
              passed
                ? "border-emerald-500 bg-emerald-500/10"
                : "border-red-500 bg-red-500/10"
            }`}
          >
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-300">
              Assessment Complete
            </p>

            <h2 className="mt-3 text-5xl font-extrabold">
              {score}%
            </h2>

            <p className="mt-3 text-zinc-300">
              {passed
                ? "You passed the secure course assessment."
                : "You did not reach the required passing score of 80%."}
            </p>

            {passed && (
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
                Passing the assessment does not by itself issue a certificate.
                Required active course time and the electronic attestation must
                also be completed.
              </p>
            )}

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              {!passed && (
                <button
                  type="button"
                  onClick={beginAnotherAttempt}
                  disabled={startingExam}
                  className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500 hover:text-red-400 disabled:cursor-not-allowed"
                >
                  {startingExam
                    ? "Starting…"
                    : "Begin Another Attempt"}
                </button>
              )}

              <Link
                href="/courses/bronchospasm-respiratory-distress"
                className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
              >
                Return to Course
              </Link>

              <Link
                href="/dashboard"
                className="rounded-xl border border-red-500 px-6 py-3 font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                View Dashboard
              </Link>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}