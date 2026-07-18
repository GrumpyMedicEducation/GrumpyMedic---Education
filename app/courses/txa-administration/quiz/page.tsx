"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: "What type of medication is tranexamic acid (TXA)?",
    options: [
      "Anticoagulant",
      "Antifibrinolytic",
      "Vasopressor",
      "Thrombolytic",
    ],
    correctAnswer: 1,
    explanation:
      "TXA is an antifibrinolytic medication. It helps prevent the premature breakdown of fibrin and preserves existing blood clots.",
  },
  {
    id: 2,
    question: "Which statement best describes how TXA works?",
    options: [
      "It creates new blood clots immediately",
      "It directly constricts damaged blood vessels",
      "It helps prevent existing blood clots from breaking down",
      "It replaces circulating clotting factors",
    ],
    correctAnswer: 2,
    explanation:
      "TXA does not directly create a new clot. It helps stabilize existing clot formation by limiting fibrinolysis.",
  },
  {
    id: 3,
    question:
      "Under the Massachusetts 2026.2 protocol reviewed in this course, what is the adult TXA dose for qualifying multisystem trauma?",
    options: [
      "500 mg IV push",
      "1 g mixed in 100 mL normal saline",
      "2 g slow IV push",
      "4 g intramuscularly",
    ],
    correctAnswer: 2,
    explanation:
      "The adult multisystem-trauma dose reviewed in this course is TXA 2 g by slow IV push.",
  },
  {
    id: 4,
    question: "How should the adult 2 g TXA dose be administered?",
    options: [
      "Rapid IV push in less than one minute",
      "Slow IV push over approximately 10 minutes",
      "Intramuscular injection over five minutes",
      "Nebulized over 15 minutes",
    ],
    correctAnswer: 1,
    explanation:
      "TXA should be administered slowly. Rapid IV administration may contribute to hypotension.",
  },
  {
    id: 5,
    question:
      "Which patient most clearly meets the general trauma criteria for TXA consideration?",
    options: [
      "Adult with a minor finger laceration and normal vital signs",
      "Adult with multisystem trauma, an SBP of 84 mmHg, and suspected internal bleeding",
      "Adult with an isolated ankle sprain and a heart rate of 88",
      "Adult with a superficial abrasion and controlled bleeding",
    ],
    correctAnswer: 1,
    explanation:
      "Multisystem trauma, hypotension, and suspected significant hemorrhage support TXA consideration when allowed by protocol.",
  },
  {
    id: 6,
    question:
      "Which finding may indicate that an adult trauma patient is at high risk for significant hemorrhage?",
    options: [
      "Heart rate greater than 110 beats per minute",
      "Systolic blood pressure of 138 mmHg",
      "Warm, dry skin after minor trauma",
      "An isolated bruise with no other symptoms",
    ],
    correctAnswer: 0,
    explanation:
      "Tachycardia greater than 110 beats per minute may support concern for significant hemorrhage when considered with the entire clinical picture.",
  },
  {
    id: 7,
    question:
      "What is the TXA dose reviewed in this course for a qualifying adult obstetrical hemorrhage?",
    options: [
      "250 mg IV",
      "500 mg intramuscularly",
      "1 g orally",
      "2 g slow IV push",
    ],
    correctAnswer: 3,
    explanation:
      "The obstetrical-emergency dose reviewed in this course is TXA 2 g by slow IV push.",
  },
  {
    id: 8,
    question:
      "Which treatment should TXA replace in a patient with severe external hemorrhage?",
    options: [
      "Direct pressure",
      "Tourniquet application",
      "Wound packing",
      "None of these treatments",
    ],
    correctAnswer: 3,
    explanation:
      "TXA does not replace physical hemorrhage-control measures. Direct pressure, tourniquets, wound packing, and other indicated treatments must continue.",
  },
  {
    id: 9,
    question:
      "What is an important concern associated with administering TXA too rapidly?",
    options: [
      "Hypotension",
      "Severe hyperglycemia",
      "Bronchospasm in every patient",
      "Immediate pulmonary edema",
    ],
    correctAnswer: 0,
    explanation:
      "Rapid IV administration of TXA may contribute to hypotension, which is why the medication should be administered slowly.",
  },
  {
    id: 10,
    question:
      "Which condition is a contraindication to administering TXA?",
    options: [
      "Known hypersensitivity to tranexamic acid",
      "Suspected significant traumatic hemorrhage",
      "Tachycardia associated with hemorrhagic shock",
      "Qualifying postpartum hemorrhage",
    ],
    correctAnswer: 0,
    explanation:
      "TXA should not be administered to a patient with a known hypersensitivity to tranexamic acid.",
  },
  {
    id: 11,
    question:
      "Which action is most appropriate while TXA is being administered?",
    options: [
      "Delay transport until the medication is completed",
      "Discontinue all other hemorrhage-control measures",
      "Continue monitoring, hemorrhage control, and rapid transport",
      "Avoid reassessing vital signs until arrival at the hospital",
    ],
    correctAnswer: 2,
    explanation:
      "TXA administration should occur while monitoring, hemorrhage control, resuscitation, and rapid transport continue.",
  },
  {
    id: 12,
    question:
      "Which information should be documented after administering TXA?",
    options: [
      "Only the medication name",
      "Dose, route, administration time, indication, and patient response",
      "Only the patient's initial blood pressure",
      "Documentation is unnecessary when medical control approves it",
    ],
    correctAnswer: 1,
    explanation:
      "Complete documentation should include the indication, dose, route, administration time, reassessment findings, and patient response.",
  },
  {
    id: 13,
    question:
      "A trauma patient's blood pressure is currently normal, but the mechanism and assessment suggest a high risk of major internal hemorrhage. What should the paramedic do?",
    options: [
      "Automatically exclude TXA because hypotension is absent",
      "Consider the complete clinical picture and follow the current protocol",
      "Administer TXA to every trauma patient",
      "Wait until the patient becomes pulseless",
    ],
    correctAnswer: 1,
    explanation:
      "Providers should consider the complete clinical picture, including mechanism, suspected injuries, vital-sign trends, skin signs, mental status, and risk for significant hemorrhage.",
  },
  {
    id: 14,
    question:
      "Which statement regarding TXA and definitive hemorrhage control is correct?",
    options: [
      "TXA eliminates the need for surgery",
      "TXA replaces transport to a trauma center",
      "TXA supports clot stability but does not provide definitive hemorrhage control",
      "TXA immediately repairs damaged blood vessels",
    ],
    correctAnswer: 2,
    explanation:
      "TXA helps preserve existing clots, but definitive hemorrhage control may still require surgical or procedural intervention.",
  },
  {
    id: 15,
    question:
      "What is the best overall approach when deciding whether to administer TXA?",
    options: [
      "Use the medication for every adult injury",
      "Follow current statewide protocols, local policy, and medical direction",
      "Base the decision only on the patient's age",
      "Administer it only after arriving at the hospital",
    ],
    correctAnswer: 1,
    explanation:
      "Medication decisions must follow the current statewide treatment protocols, local service policies, authorized scope of practice, and medical-control direction.",
  },
];

const passingScore = 80;

export default function TXAQuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;

  const correctCount = useMemo(() => {
    return questions.reduce((total, question) => {
      return answers[question.id] === question.correctAnswer
        ? total + 1
        : total;
    }, 0);
  }, [answers]);

  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= passingScore;

  function selectAnswer(questionId: number, optionIndex: number) {
    if (submitted) return;

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: optionIndex,
    }));
  }

  function submitQuiz() {
    if (answeredCount !== questions.length) {
      const unanswered = questions.length - answeredCount;

      window.alert(
        `Please answer all questions before submitting. You have ${unanswered} unanswered question${
          unanswered === 1 ? "" : "s"
        }.`,
      );

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
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-red-900 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            TXA Administration Quiz
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            Test your understanding of TXA indications, adult dosing,
            administration, monitoring, hemorrhage control, and documentation.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 font-semibold text-zinc-300">
              {questions.length} questions
            </span>

            <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 font-semibold text-zinc-300">
              Passing score: {passingScore}%
            </span>

            <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 font-semibold text-zinc-300">
              Answered: {answeredCount}/{questions.length}
            </span>
          </div>

          <div className="mt-8">
            <Link
              href="/courses/txa-administration"
              className="inline-block rounded-xl border border-red-600 px-6 py-3 font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              ← Back to Course
            </Link>
          </div>
        </div>
      </section>

      {submitted && (
        <section className="border-b border-zinc-800 bg-zinc-950">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <div
              className={`rounded-2xl border p-8 text-center ${
                passed
                  ? "border-green-600 bg-green-950/30"
                  : "border-red-700 bg-red-950/30"
              }`}
            >
              <p
                className={`text-sm font-bold uppercase tracking-[0.2em] ${
                  passed ? "text-green-400" : "text-red-400"
                }`}
              >
                {passed ? "Quiz Passed" : "More Review Needed"}
              </p>

              <p
                className={`mt-4 text-6xl font-extrabold ${
                  passed ? "text-green-400" : "text-red-400"
                }`}
              >
                {score}%
              </p>

              <p className="mt-4 text-lg text-zinc-300">
                You answered {correctCount} of {questions.length} questions
                correctly.
              </p>

              {passed ? (
                <>
                  <p className="mx-auto mt-3 max-w-2xl leading-7 text-zinc-300">
                    Congratulations. You achieved the required passing score and
                    may continue to the certificate page.
                  </p>

                  <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                      href={`/courses/txa-administration/certificate?score=${score}`}
                      className="rounded-xl bg-green-600 px-7 py-4 font-bold text-white transition hover:bg-green-500"
                    >
                      View Certificate
                    </Link>

                    <button
                      type="button"
                      onClick={resetQuiz}
                      className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mx-auto mt-3 max-w-2xl leading-7 text-zinc-300">
                    Review the explanations below and retake the quiz. A score of
                    {` ${passingScore}%`} or higher is required to pass.
                  </p>

                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="mt-7 rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
                  >
                    Retake Quiz
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="space-y-8">
          {questions.map((question, questionIndex) => {
            const selectedAnswer = answers[question.id];
            const questionIsCorrect =
              selectedAnswer === question.correctAnswer;

            return (
              <article
                key={question.id}
                className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 font-extrabold">
                    {questionIndex + 1}
                  </span>

                  <h2 className="pt-1 text-xl font-bold leading-8">
                    {question.question}
                  </h2>
                </div>

                <div className="mt-6 space-y-3">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selectedAnswer === optionIndex;
                    const isCorrectOption =
                      optionIndex === question.correctAnswer;

                    let optionClasses =
                      "border-zinc-700 bg-black hover:border-red-500";

                    if (!submitted && isSelected) {
                      optionClasses =
                        "border-red-500 bg-red-950/40 ring-1 ring-red-500";
                    }

                    if (submitted && isCorrectOption) {
                      optionClasses =
                        "border-green-500 bg-green-950/30 ring-1 ring-green-500";
                    }

                    if (
                      submitted &&
                      isSelected &&
                      !questionIsCorrect &&
                      !isCorrectOption
                    ) {
                      optionClasses =
                        "border-red-500 bg-red-950/40 ring-1 ring-red-500";
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          selectAnswer(question.id, optionIndex)
                        }
                        disabled={submitted}
                        className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${optionClasses} ${
                          submitted
                            ? "cursor-default"
                            : "cursor-pointer"
                        }`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-600 text-sm font-bold">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>

                        <span className="leading-7 text-zinc-200">
                          {option}
                        </span>

                        {submitted && isCorrectOption && (
                          <span className="ml-auto font-extrabold text-green-400">
                            ✓
                          </span>
                        )}

                        {submitted &&
                          isSelected &&
                          !questionIsCorrect &&
                          !isCorrectOption && (
                            <span className="ml-auto font-extrabold text-red-400">
                              ✕
                            </span>
                          )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div
                    className={`mt-6 rounded-xl border p-5 ${
                      questionIsCorrect
                        ? "border-green-800 bg-green-950/20"
                        : "border-yellow-700 bg-yellow-950/20"
                    }`}
                  >
                    <p
                      className={`font-bold ${
                        questionIsCorrect
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {questionIsCorrect
                        ? "Correct"
                        : "Review this question"}
                    </p>

                    <p className="mt-2 leading-7 text-zinc-300">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {!submitted && (
          <div className="mt-10 rounded-2xl border border-red-700 bg-red-950/20 p-8 text-center">
            <h2 className="text-2xl font-extrabold">
              Ready to Submit?
            </h2>

            <p className="mt-3 text-zinc-300">
              You have answered {answeredCount} of {questions.length} questions.
            </p>

            <button
              type="button"
              onClick={submitQuiz}
              className="mt-6 rounded-xl bg-red-600 px-8 py-4 text-lg font-bold transition hover:bg-red-500"
            >
              Submit Quiz
            </button>
          </div>
        )}

        {submitted && (
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            {passed && (
              <Link
                href={`/courses/txa-administration/certificate?score=${score}`}
                className="rounded-xl bg-green-600 px-7 py-4 text-center font-bold transition hover:bg-green-500"
              >
                View Certificate
              </Link>
            )}

            <button
              type="button"
              onClick={resetQuiz}
              className="rounded-xl border border-red-600 px-7 py-4 font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              Retake Quiz
            </button>

            <Link
              href="/courses/txa-administration"
              className="rounded-xl border border-zinc-600 px-7 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Return to Course
            </Link>
          </div>
        )}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-500">
          This quiz is provided for education and protocol review. Always follow
          the most current Massachusetts Statewide Treatment Protocols, local
          service policies, manufacturer instructions, medical-control
          direction, and your authorized scope of practice.
        </div>
      </section>
    </main>
  );
}