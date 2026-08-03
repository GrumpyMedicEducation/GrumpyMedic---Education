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
    "question": "Which assessment finding best reflects airflow severity?",
    "options": [
      "Presence of any wheeze only",
      "Quality of air movement",
      "Patient age only",
      "Skin temperature only"
    ],
    "correctAnswer": 1,
    "explanation": "Air movement may be severely reduced even when wheezing becomes quieter."
  },
  {
    "question": "A silent chest in a distressed patient suggests:",
    "options": [
      "Improvement",
      "Severe airflow obstruction",
      "Normal lungs",
      "Only anxiety"
    ],
    "correctAnswer": 1,
    "explanation": "A silent chest may indicate critically poor air movement."
  },
  {
    "question": "Which finding suggests impending respiratory failure?",
    "options": [
      "Improved speech",
      "Decreasing mental status",
      "Normal air movement",
      "Normal interaction"
    ],
    "correctAnswer": 1,
    "explanation": "Altered mental status is a high-risk sign."
  },
  {
    "question": "Which condition can produce cardiac wheeze?",
    "options": [
      "Pulmonary edema",
      "Ankle sprain",
      "Migraine",
      "Simple rash"
    ],
    "correctAnswer": 0,
    "explanation": "Pulmonary edema may present with wheezing."
  },
  {
    "question": "The first medication class used for bronchospasm is typically:",
    "options": [
      "Bronchodilator",
      "Antibiotic",
      "Anticoagulant",
      "Diuretic in every patient"
    ],
    "correctAnswer": 0,
    "explanation": "Bronchodilators are commonly used for bronchospasm."
  },
  {
    "question": "Ipratropium is best described as:",
    "options": [
      "An adjunct bronchodilator",
      "A sedative",
      "A vasopressor",
      "An anticoagulant"
    ],
    "correctAnswer": 0,
    "explanation": "Ipratropium is an adjunct bronchodilator."
  },
  {
    "question": "After each respiratory treatment, EMS should:",
    "options": [
      "Avoid reassessment",
      "Reassess the patient",
      "Wait until hospital arrival",
      "Document only the medication"
    ],
    "correctAnswer": 1,
    "explanation": "Reassessment is required after every intervention."
  },
  {
    "question": "Which patient is most appropriate for CPAP or BiPAP?",
    "options": [
      "Awake and cooperative with airway protection",
      "Vomiting and unresponsive",
      "Respiratory arrest",
      "Unable to tolerate a mask"
    ],
    "correctAnswer": 0,
    "explanation": "Noninvasive ventilation requires cooperation and airway protection."
  },
  {
    "question": "Which finding is a contraindication to noninvasive ventilation?",
    "options": [
      "Cooperation",
      "Adequate respiratory effort",
      "Active vomiting",
      "Ability to protect the airway"
    ],
    "correctAnswer": 2,
    "explanation": "Vomiting creates aspiration risk."
  },
  {
    "question": "If a patient becomes drowsy on CPAP, EMS should:",
    "options": [
      "Increase pressure without assessment",
      "Remove CPAP and support ventilation",
      "Leave the patient alone",
      "Give oral fluids"
    ],
    "correctAnswer": 1,
    "explanation": "Deteriorating mental status requires airway reassessment."
  },
  {
    "question": "Epinephrine may be considered for:",
    "options": [
      "Severe bronchospasm when criteria are met",
      "Every mild cough",
      "Routine chest pain",
      "Simple fever"
    ],
    "correctAnswer": 0,
    "explanation": "Epinephrine may be used in severe bronchospasm or allergic presentations."
  },
  {
    "question": "Before giving epinephrine, EMS should confirm:",
    "options": [
      "Only age",
      "Patient, concentration, dose, route, and indication",
      "Only route",
      "Only dose"
    ],
    "correctAnswer": 1,
    "explanation": "Medication safety requires all of these checks."
  },
  {
    "question": "Corticosteroids are used primarily to:",
    "options": [
      "Reduce airway inflammation",
      "Immediately stop every wheeze",
      "Cause sedation",
      "Increase secretions"
    ],
    "correctAnswer": 0,
    "explanation": "Corticosteroids reduce inflammation."
  },
  {
    "question": "Magnesium sulfate may be considered in:",
    "options": [
      "Severe bronchospasm",
      "Minor cough",
      "Simple congestion",
      "Every fever"
    ],
    "correctAnswer": 0,
    "explanation": "Magnesium may be an adjunct in severe bronchospasm."
  },
  {
    "question": "Which pediatric finding is concerning?",
    "options": [
      "Retractions",
      "Normal interaction",
      "Normal color",
      "Normal air movement"
    ],
    "correctAnswer": 0,
    "explanation": "Retractions indicate increased work of breathing."
  },
  {
    "question": "A child becoming quieter and lethargic may indicate:",
    "options": [
      "Improvement only",
      "Respiratory fatigue",
      "Normal sleepiness",
      "Resolved bronchospasm"
    ],
    "correctAnswer": 1,
    "explanation": "A quieter child may be tiring."
  },
  {
    "question": "Bradycardia in a child with respiratory distress is:",
    "options": [
      "A reassuring sign",
      "A late ominous sign",
      "Always normal",
      "Unrelated to oxygenation"
    ],
    "correctAnswer": 1,
    "explanation": "Bradycardia may occur late in pediatric hypoxia."
  },
  {
    "question": "Which is a common respiratory reassessment item?",
    "options": [
      "Lung sounds",
      "Hair color",
      "Shoe size",
      "Dominant hand"
    ],
    "correctAnswer": 0,
    "explanation": "Lung sounds are a core reassessment finding."
  },
  {
    "question": "ETCO₂ may help assess:",
    "options": [
      "Ventilation",
      "Bone injury",
      "Blood type",
      "Skin temperature only"
    ],
    "correctAnswer": 0,
    "explanation": "ETCO₂ provides information about ventilation."
  },
  {
    "question": "Which history is especially important?",
    "options": [
      "Previous intubation for asthma",
      "Favorite food",
      "Handedness",
      "Eye color"
    ],
    "correctAnswer": 0,
    "explanation": "Previous intubation suggests severe disease."
  },
  {
    "question": "ALS should be requested:",
    "options": [
      "Early in severe or worsening distress",
      "Only after arrival",
      "Never for pediatrics",
      "Only if the patient asks"
    ],
    "correctAnswer": 0,
    "explanation": "Early ALS is appropriate for severe distress."
  },
  {
    "question": "Transport should be delayed for repeated noncritical procedures:",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "Do not delay transport."
  },
  {
    "question": "Which finding may suggest pulmonary edema instead of isolated asthma?",
    "options": [
      "Crackles and leg edema",
      "Isolated wheeze only",
      "Normal blood pressure",
      "No cardiac history"
    ],
    "correctAnswer": 0,
    "explanation": "Crackles and edema support a cardiac cause."
  },
  {
    "question": "Poor air movement and worsening mental status require:",
    "options": [
      "Airway and ventilation escalation",
      "Less monitoring",
      "Oral fluids",
      "Delayed transport"
    ],
    "correctAnswer": 0,
    "explanation": "These are signs of respiratory failure."
  },
  {
    "question": "What score is required to pass this quiz?",
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

export default function BronchospasmRespiratoryQuizPage() {
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
            <Link
              href="/courses/bronchospasm-respiratory-distress"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              ← Back to Course
            </Link>

            <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-7 md:p-10">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">
                Final Assessment
              </p>
              <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
                Bronchospasm / Respiratory Distress
              </h1>
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
              <section className={`mt-8 rounded-2xl border p-6 ${
                passed
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-red-500 bg-red-500/10"
              }`}>
                <p className="text-sm font-bold uppercase tracking-wide text-zinc-300">
                  Quiz Result
                </p>
                <div className="mt-3 flex flex-wrap items-end gap-4">
                  <span className="text-6xl font-extrabold">{percentage}%</span>
                  <span className="pb-2 text-xl font-bold">{score} of {questions.length} correct</span>
                </div>
                <h2 className={`mt-5 text-2xl font-bold ${
                  passed ? "text-emerald-400" : "text-red-400"
                }`}>
                  {passed ? "Passed" : "Additional review required"}
                </h2>
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
                <button
                  type="button"
                  onClick={submitQuiz}
                  className="rounded-xl bg-red-600 px-8 py-4 font-bold hover:bg-red-500"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="rounded-xl border border-zinc-600 px-8 py-4 font-bold hover:border-red-500"
                >
                  Retake Quiz
                </button>
              )}

              {passed && (
                <Link
                  href={`/courses/bronchospasm-respiratory-distress/certificate?score=${percentage}`}
                  className="rounded-xl bg-emerald-600 px-8 py-4 font-bold hover:bg-emerald-500"
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