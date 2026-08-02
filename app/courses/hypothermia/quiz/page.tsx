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
    "question": "What is the first environmental priority for a hypothermic patient?",
    "options": [
      "Prevent further heat loss",
      "Give oral fluids",
      "Massage the extremities",
      "Delay movement"
    ],
    "correctAnswer": 0,
    "explanation": "Preventing additional heat loss is an immediate priority."
  },
  {
    "question": "Which handling technique is appropriate?",
    "options": [
      "Vigorous movement",
      "Gentle handling",
      "Massage of the limbs",
      "Rapid repeated repositioning"
    ],
    "correctAnswer": 1,
    "explanation": "The protocol directs providers to avoid rough movement."
  },
  {
    "question": "Which action helps reduce conductive heat loss?",
    "options": [
      "Insulate the patient from the ground",
      "Expose the patient fully",
      "Apply ice packs",
      "Keep wet clothing in place"
    ],
    "correctAnswer": 0,
    "explanation": "Ground insulation helps reduce conductive heat loss."
  },
  {
    "question": "Wet clothing should be:",
    "options": [
      "Left in place",
      "Covered with plastic only",
      "Removed",
      "Massaged dry"
    ],
    "correctAnswer": 2,
    "explanation": "Wet clothing should be removed."
  },
  {
    "question": "Which area should receive particular blanket coverage?",
    "options": [
      "Feet only",
      "Head",
      "Hands only",
      "Abdomen only"
    ],
    "correctAnswer": 1,
    "explanation": "The protocol specifically highlights covering the head."
  },
  {
    "question": "When profound hypothermia is suspected, pulse and respirations should be assessed for:",
    "options": [
      "10 seconds",
      "20 seconds",
      "30 seconds",
      "60 seconds"
    ],
    "correctAnswer": 3,
    "explanation": "A full 60-second assessment is required."
  },
  {
    "question": "If pulselessness is confirmed, the provider should:",
    "options": [
      "Delay CPR",
      "Initiate CPR",
      "Warm the feet first",
      "Give oral glucose"
    ],
    "correctAnswer": 1,
    "explanation": "Confirmed cardiac arrest requires CPR."
  },
  {
    "question": "Which device should be used according to protocol guidance in hypothermic cardiac arrest?",
    "options": [
      "AED",
      "Nebulizer only",
      "Glucometer only",
      "Traction splint"
    ],
    "correctAnswer": 0,
    "explanation": "Use the AED according to the protocol and advisories."
  },
  {
    "question": "Warmed, humidified oxygen should be used:",
    "options": [
      "Never",
      "Only after hospital arrival",
      "Whenever possible",
      "Only in warm weather"
    ],
    "correctAnswer": 2,
    "explanation": "The protocol recommends warmed, humidified oxygen whenever possible."
  },
  {
    "question": "The warmed oxygen temperature range is approximately:",
    "options": [
      "70–75 °F",
      "80–85 °F",
      "90–95 °F",
      "104–107 °F"
    ],
    "correctAnswer": 3,
    "explanation": "The protocol lists 104–107 °F, or 40–42 °C."
  },
  {
    "question": "Which oxygen delivery device is specifically listed for warmed, humidified oxygen?",
    "options": [
      "Non-rebreather mask",
      "Nasal cannula only",
      "Venturi mask only",
      "No mask"
    ],
    "correctAnswer": 0,
    "explanation": "The protocol lists a non-rebreather mask."
  },
  {
    "question": "Hypoglycemia should be managed under:",
    "options": [
      "The appropriate altered mental status/diabetic protocol",
      "The burn protocol",
      "The trauma protocol only",
      "No protocol"
    ],
    "correctAnswer": 0,
    "explanation": "The hypothermia protocol directs providers to manage hypoglycemia under the appropriate protocol."
  },
  {
    "question": "Which possible coexisting condition should also be considered?",
    "options": [
      "Narcotic overdose",
      "Isolated ankle sprain",
      "Dental pain",
      "Simple rash"
    ],
    "correctAnswer": 0,
    "explanation": "The protocol references overdose and toxicology considerations."
  },
  {
    "question": "Advanced EMTs should use:",
    "options": [
      "Cold IV fluids",
      "Warm IV fluids",
      "No fluids under any circumstances",
      "Oral fluids only"
    ],
    "correctAnswer": 1,
    "explanation": "Warm IV fluids should be used."
  },
  {
    "question": "Paramedics may measure core temperature using:",
    "options": [
      "A forehead strip only",
      "An esophageal probe",
      "A room thermometer",
      "A skin sticker only"
    ],
    "correctAnswer": 1,
    "explanation": "The protocol lists an esophageal temperature probe when available and tolerated."
  },
  {
    "question": "Nothing should be given orally unless the patient has:",
    "options": [
      "A reasonable level of consciousness and normal gag reflex",
      "A pulse above 60 only",
      "Warm skin",
      "A normal blood pressure only"
    ],
    "correctAnswer": 0,
    "explanation": "Oral intake requires adequate consciousness and a normal gag reflex."
  },
  {
    "question": "Which action is specifically prohibited?",
    "options": [
      "Covering the head",
      "Removing wet clothing",
      "Massaging the extremities",
      "Moving to a warm environment"
    ],
    "correctAnswer": 2,
    "explanation": "Do not massage the extremities to actively rewarm the patient."
  },
  {
    "question": "Which statement about a cold patient is correct?",
    "options": [
      "A difficult-to-detect pulse should be assumed absent immediately",
      "A full prolonged assessment may be necessary",
      "Cold skin confirms death",
      "Respirations need only be checked for 5 seconds"
    ],
    "correctAnswer": 1,
    "explanation": "Hypothermia can make pulse and breathing difficult to detect."
  },
  {
    "question": "Which rewarming approach is appropriate in the field?",
    "options": [
      "Prevent heat loss and provide controlled supportive warming",
      "Aggressively rub the limbs",
      "Give hot oral liquids to every patient",
      "Apply direct high heat to bare skin"
    ],
    "correctAnswer": 0,
    "explanation": "Controlled supportive warming and prevention of heat loss are appropriate."
  },
  {
    "question": "Which finding may occur as hypothermia worsens?",
    "options": [
      "Bradycardia",
      "Persistent tachycardia only",
      "Increased urine output only",
      "Hyperactivity only"
    ],
    "correctAnswer": 0,
    "explanation": "Bradycardia can occur as core temperature falls."
  },
  {
    "question": "Which patient should receive blood glucose assessment?",
    "options": [
      "An altered hypothermic patient",
      "Only a trauma patient",
      "Only a patient with fever",
      "No hypothermic patient"
    ],
    "correctAnswer": 0,
    "explanation": "Altered mental status may be caused or worsened by hypoglycemia."
  },
  {
    "question": "Which item belongs in documentation?",
    "options": [
      "Duration and conditions of exposure",
      "Only the destination",
      "Only the patient’s name",
      "No environmental details"
    ],
    "correctAnswer": 0,
    "explanation": "Exposure conditions and duration are important documentation elements."
  },
  {
    "question": "Which statement best describes movement?",
    "options": [
      "Rapid movement improves rhythm stability",
      "Gentle movement is preferred",
      "Extremities should be flexed repeatedly",
      "The patient should walk whenever possible"
    ],
    "correctAnswer": 1,
    "explanation": "Gentle handling is emphasized."
  },
  {
    "question": "If core-temperature monitoring is unavailable, the provider should:",
    "options": [
      "Withhold all care",
      "Continue protocol-directed supportive care",
      "Delay transport",
      "Give oral fluids"
    ],
    "correctAnswer": 1,
    "explanation": "Supportive care and transport continue even if core temperature cannot be measured."
  },
  {
    "question": "What score is required to pass this course quiz?",
    "options": [
      "60%",
      "70%",
      "75%",
      "80%"
    ],
    "correctAnswer": 3,
    "explanation": "The passing score is 80%."
  }
];

export default function HypothermiaQuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;

  const score = questions.reduce((total, question, index) => {
    return total + (answers[index] === question.correctAnswer ? 1 : 0);
  }, 0);

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
              href="/courses/hypothermia"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              ← Back to Hypothermia Course
            </Link>

            <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-7 md:p-10">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">
                Final Assessment
              </p>

              <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
                Environmental Hypothermia
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
                        </strong>{" "}
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
                  href={`/courses/hypothermia/certificate?score=${percentage}`}
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
