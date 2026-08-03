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
    "question": "What is the first priority in XABC?",
    "options": [
      "Airway",
      "Breathing",
      "Catastrophic hemorrhage",
      "Disability"
    ],
    "correctAnswer": 2,
    "explanation": "X addresses exsanguinating hemorrhage first."
  },
  {
    "question": "What is appropriate for life-threatening extremity bleeding?",
    "options": [
      "Tourniquet",
      "Ice pack",
      "Traction splint first",
      "Delayed pressure"
    ],
    "correctAnswer": 0,
    "explanation": "A tourniquet is appropriate for life-threatening extremity bleeding."
  },
  {
    "question": "What may be used for a deep junctional wound?",
    "options": [
      "Wound packing",
      "Oral fluids",
      "Pelvic binder only",
      "No treatment"
    ],
    "correctAnswer": 0,
    "explanation": "Suitable wounds may require packing."
  },
  {
    "question": "A suspected pelvic fracture should be stabilized with:",
    "options": [
      "A commercial pelvic device when available",
      "A cervical collar",
      "A traction splint",
      "No stabilization"
    ],
    "correctAnswer": 0,
    "explanation": "The protocol prefers a commercial pelvic device; a sheet may be used."
  },
  {
    "question": "AEMT vascular access should be established:",
    "options": [
      "After arrival",
      "While en route",
      "Before bleeding control",
      "Only if transport is delayed"
    ],
    "correctAnswer": 1,
    "explanation": "The protocol directs access while en route."
  },
  {
    "question": "The AEMT fluid setup is:",
    "options": [
      "Normal saline KVO",
      "D5W wide open",
      "Oral fluids",
      "No line"
    ],
    "correctAnswer": 0,
    "explanation": "Normal saline KVO is listed."
  },
  {
    "question": "Medical Control may order:",
    "options": [
      "Additional fluid boluses",
      "Routine oral intake",
      "Massage of injuries",
      "Delayed transport"
    ],
    "correctAnswer": 0,
    "explanation": "Additional fluid boluses may be ordered."
  },
  {
    "question": "A failed conventional emergent intubation should follow:",
    "options": [
      "Protocol 5.2 Difficult Airway",
      "Burn protocol",
      "Sepsis protocol",
      "No protocol"
    ],
    "correctAnswer": 0,
    "explanation": "Protocol 5.2 is referenced."
  },
  {
    "question": "For most patients under 12, the airway is usually best managed with:",
    "options": [
      "BVM or SGA",
      "Immediate surgical airway",
      "Oral fluids",
      "No ventilation"
    ],
    "correctAnswer": 0,
    "explanation": "BVM or SGA is usually preferred."
  },
  {
    "question": "The adult-style TXA pathway applies to:",
    "options": [
      "Patients older than 5",
      "Only adults over 18",
      "Only over 12",
      "All ages at same dose"
    ],
    "correctAnswer": 0,
    "explanation": "The supplied protocol uses this pathway for patients older than 5."
  },
  {
    "question": "Which SBP meets the TXA criterion?",
    "options": [
      "104",
      "98",
      "90",
      "88"
    ],
    "correctAnswer": 3,
    "explanation": "SBP below 90 meets the criterion."
  },
  {
    "question": "Which heart rate meets the TXA criterion?",
    "options": [
      "96",
      "104",
      "110",
      "118"
    ],
    "correctAnswer": 3,
    "explanation": "The criterion is HR greater than 110."
  },
  {
    "question": "The qualifying dose for a patient older than 5 is:",
    "options": [
      "500 mg",
      "1 gram",
      "2 grams IV push",
      "15 mg total"
    ],
    "correctAnswer": 2,
    "explanation": "The supplied protocol lists 2 grams IV push."
  },
  {
    "question": "TXA may also be used when:",
    "options": [
      "The provider judges high hemorrhage risk",
      "Minor abrasion",
      "Over 3 hours have passed",
      "Known allergy"
    ],
    "correctAnswer": 0,
    "explanation": "Provider judgment for significant hemorrhage risk is included."
  },
  {
    "question": "The dose for a patient younger than 5 is:",
    "options": [
      "5 mg/kg",
      "10 mg/kg",
      "15 mg/kg",
      "30 mg/kg"
    ],
    "correctAnswer": 2,
    "explanation": "The pediatric dose is 15 mg/kg."
  },
  {
    "question": "The pediatric maximum dose is:",
    "options": [
      "500 mg",
      "1 gram",
      "2 grams",
      "3 grams"
    ],
    "correctAnswer": 1,
    "explanation": "The maximum is 1 gram."
  },
  {
    "question": "Pediatric TXA is given over:",
    "options": [
      "1 minute",
      "5 minutes",
      "10 minutes",
      "30 minutes"
    ],
    "correctAnswer": 2,
    "explanation": "It is given slowly over 10 minutes."
  },
  {
    "question": "The pediatric mixture is:",
    "options": [
      "1 gram in 100 mL normal saline",
      "2 grams in 10 mL",
      "500 mg in D5W",
      "No dilution"
    ],
    "correctAnswer": 0,
    "explanation": "The supplied protocol uses 1 gram in 100 mL normal saline."
  },
  {
    "question": "TXA is contraindicated after more than:",
    "options": [
      "1 hour",
      "2 hours",
      "3 hours",
      "6 hours"
    ],
    "correctAnswer": 2,
    "explanation": "More than 3 hours is a contraindication."
  },
  {
    "question": "Another listed contraindication is:",
    "options": [
      "Known allergy",
      "Tachycardia",
      "Suspected bleeding",
      "Pelvic fracture"
    ],
    "correctAnswer": 0,
    "explanation": "Known allergy is listed."
  },
  {
    "question": "Rapid TXA administration may cause:",
    "options": [
      "Profound hypotension",
      "Hyperglycemia",
      "Hypertension only",
      "Hypothermia"
    ],
    "correctAnswer": 0,
    "explanation": "Rapid administration may cause profound hypotension."
  },
  {
    "question": "Excessive TXA dosing may cause:",
    "options": [
      "Seizures",
      "Rash only",
      "Hypothermia",
      "Hypoglycemia"
    ],
    "correctAnswer": 0,
    "explanation": "Excessive dosing may cause seizures."
  },
  {
    "question": "Which may indicate hemorrhagic shock?",
    "options": [
      "Cool pale skin",
      "Improving mental status",
      "Strong pulses",
      "Normalizing pressure"
    ],
    "correctAnswer": 0,
    "explanation": "Cool pale skin is a sign of poor perfusion."
  },
  {
    "question": "Which should not delay transport?",
    "options": [
      "Noncritical procedures",
      "Catastrophic hemorrhage control",
      "Airway support",
      "Pelvic stabilization"
    ],
    "correctAnswer": 0,
    "explanation": "Noncritical procedures should not delay transport."
  },
  {
    "question": "What is the passing score?",
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

export default function MultisystemTraumaQuizPage() {
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
    setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }));
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
            <Link href="/courses/multisystem-trauma" className="font-semibold text-red-500 hover:text-red-400">
              ← Back to Multisystem Trauma Course
            </Link>

            <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-7 md:p-10">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">Final Assessment</p>
              <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Multisystem Trauma</h1>
              <p className="mt-4 text-lg leading-8 text-zinc-300">
                Answer all 25 questions. A score of 80% or higher unlocks the completion certificate.
              </p>
              <div className="mt-7">
                <div className="flex justify-between text-sm font-bold text-zinc-400">
                  <span>Quiz Progress</span>
                  <span>{answeredCount} / {questions.length} answered</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-red-600 transition-all"
                    style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {submitted && (
              <section className={`mt-8 rounded-2xl border p-6 ${passed ? "border-emerald-500 bg-emerald-500/10" : "border-red-500 bg-red-500/10"}`}>
                <p className="text-sm font-bold uppercase tracking-wide text-zinc-300">Quiz Result</p>
                <div className="mt-3 flex flex-wrap items-end gap-4">
                  <span className="text-6xl font-extrabold">{percentage}%</span>
                  <span className="pb-2 text-xl font-bold">{score} of {questions.length} correct</span>
                </div>
                <h2 className={`mt-5 text-2xl font-bold ${passed ? "text-emerald-400" : "text-red-400"}`}>
                  {passed ? "Passed" : "Additional review required"}
                </h2>
                <p className="mt-2 text-zinc-300">
                  {passed ? "Your certificate is available below." : "Review the explanations and retake the quiz."}
                </p>
              </section>
            )}

            <div className="mt-10 space-y-8">
              {questions.map((question, questionIndex) => {
                const selectedAnswer = answers[questionIndex];
                return (
                  <section key={question.question} className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 font-extrabold">
                        {questionIndex + 1}
                      </span>
                      <h2 className="text-xl font-bold leading-8">{question.question}</h2>
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
                              correct ? "border-emerald-500 bg-emerald-500/10" :
                              incorrect ? "border-red-500 bg-red-500/10" :
                              selected ? "border-red-500 bg-red-950/30" :
                              "border-zinc-700 bg-black hover:border-zinc-500"
                            }`}
                          >
                            <span className="font-bold text-zinc-400">{String.fromCharCode(65 + optionIndex)}.</span>
                            <span>{option}</span>
                          </button>
                        );
                      })}
                    </div>
                    {submitted && (
                      <div className="mt-5 rounded-xl border border-zinc-700 bg-black p-4 leading-7 text-zinc-300">
                        <strong className="text-red-400">Explanation:</strong>{" "}
                        {question.explanation}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {!submitted ? (
                <button type="button" onClick={submitQuiz} className="rounded-xl bg-red-600 px-8 py-4 font-bold hover:bg-red-500">
                  Submit Quiz
                </button>
              ) : (
                <button type="button" onClick={resetQuiz} className="rounded-xl border border-zinc-600 px-8 py-4 font-bold hover:border-red-500">
                  Retake Quiz
                </button>
              )}
              {passed && (
                <Link href={`/courses/multisystem-trauma/certificate?score=${percentage}`} className="rounded-xl bg-emerald-600 px-8 py-4 font-bold hover:bg-emerald-500">
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
