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
    "question": "Which statement best defines Last Known Well?",
    "options": [
      "The time EMS arrives",
      "The time symptoms are discovered",
      "The last time the patient was observed at neurologic baseline",
      "The time the hospital is notified"
    ],
    "correctAnswer": 2,
    "explanation": "Last Known Well is the last time the patient was known to be at their neurologic baseline."
  },
  {
    "question": "A wake-up stroke is discovered at 0630. The patient was last seen normal at 2230. What is the LKW?",
    "options": [
      "0630",
      "2230",
      "Midnight",
      "Unknown"
    ],
    "correctAnswer": 1,
    "explanation": "The last observed normal time is 2230; 0630 is the discovery time."
  },
  {
    "question": "Which early assessment helps identify a common stroke mimic?",
    "options": [
      "Temperature only",
      "Blood glucose",
      "Orthostatic vital signs",
      "Peak flow"
    ],
    "correctAnswer": 1,
    "explanation": "Hypoglycemia can produce focal neurologic and altered mental-status findings."
  },
  {
    "question": "FAST-ED includes all except:",
    "options": [
      "Facial palsy",
      "Arm weakness",
      "Speech changes",
      "Leg edema"
    ],
    "correctAnswer": 3,
    "explanation": "Leg edema is not a FAST-ED component."
  },
  {
    "question": "The maximum FAST-ED score is:",
    "options": [
      "5",
      "7",
      "9",
      "12"
    ],
    "correctAnswer": 2,
    "explanation": "The five domains total a maximum score of 9."
  },
  {
    "question": "Complete unilateral facial paralysis scores:",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "correctAnswer": 1,
    "explanation": "Facial palsy is scored 0 or 1."
  },
  {
    "question": "Arm drift or some effort against gravity scores:",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "correctAnswer": 1,
    "explanation": "Arm drift or some effort against gravity is scored 1."
  },
  {
    "question": "Severe global aphasia or muteness scores:",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "correctAnswer": 2,
    "explanation": "Severe speech disturbance, global aphasia, or muteness scores 2."
  },
  {
    "question": "Forced eye deviation scores:",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "correctAnswer": 2,
    "explanation": "Forced eye deviation scores 2."
  },
  {
    "question": "Failure to recognize one’s own hand may indicate:",
    "options": [
      "Denial or neglect",
      "Hypoxia only",
      "Normal aging",
      "Isolated facial palsy"
    ],
    "correctAnswer": 0,
    "explanation": "Failure to recognize one’s own hand is a severe denial/neglect finding."
  },
  {
    "question": "According to the supplied protocol, a Stroke Alert should be communicated when:",
    "options": [
      "Any stroke-scale sign is abnormal and onset is under 24 hours",
      "Only FAST-ED is 6 or higher",
      "Only symptoms persist",
      "Only after physician confirmation"
    ],
    "correctAnswer": 0,
    "explanation": "The supplied protocol directs notification when any sign is abnormal and onset is under 24 hours."
  },
  {
    "question": "Resolved stroke symptoms should be:",
    "options": [
      "Ignored if the exam is normal",
      "Treated as a possible stroke/TIA and reported",
      "Managed only if glucose is low",
      "Left at home"
    ],
    "correctAnswer": 1,
    "explanation": "Resolved focal deficits remain time-sensitive and require urgent evaluation."
  },
  {
    "question": "The supplied protocol says oxygen should generally be withheld unless there is:",
    "options": [
      "Any suspected stroke",
      "Hypertension",
      "Hypoxemia, dyspnea, or SpO₂ below 90%",
      "FAST-ED above 3"
    ],
    "correctAnswer": 2,
    "explanation": "Avoid hyperoxygenation and provide oxygen for a clinical indication."
  },
  {
    "question": "Recommended head-of-stretcher elevation is approximately:",
    "options": [
      "Flat",
      "10 degrees",
      "30 degrees",
      "90 degrees"
    ],
    "correctAnswer": 2,
    "explanation": "The supplied protocol directs elevation of approximately 30 degrees."
  },
  {
    "question": "Transport should be delayed for ALS intercept:",
    "options": [
      "Always",
      "Only for aphasia",
      "No",
      "Only if LKW is unknown"
    ],
    "correctAnswer": 2,
    "explanation": "The supplied protocol says not to delay transport for ALS intercept."
  },
  {
    "question": "Which presentation may represent posterior circulation stroke?",
    "options": [
      "Sudden diplopia, vomiting, and severe ataxia",
      "Chronic knee pain",
      "Gradual rash",
      "Isolated ankle swelling"
    ],
    "correctAnswer": 0,
    "explanation": "Posterior circulation stroke can produce diplopia, vomiting, dizziness, and severe ataxia."
  },
  {
    "question": "Which is a recognized stroke mimic?",
    "options": [
      "Hypoglycemia",
      "Simple laceration",
      "Otitis externa",
      "Kidney stone"
    ],
    "correctAnswer": 0,
    "explanation": "Hypoglycemia may cause focal deficits and altered mental status."
  },
  {
    "question": "A seizure at onset makes stroke impossible:",
    "options": [
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "Stroke can cause seizure, and postictal weakness may also mimic stroke."
  },
  {
    "question": "A prearrival report should include:",
    "options": [
      "Only the patient’s name",
      "LKW, FAST-ED, glucose, anticoagulants, and ETA",
      "Insurance information",
      "Complete past medical record"
    ],
    "correctAnswer": 1,
    "explanation": "These time-sensitive findings help the stroke team prepare."
  },
  {
    "question": "Which medication history is especially important?",
    "options": [
      "Topical moisturizer",
      "Anticoagulants",
      "Multivitamin",
      "Allergy spray"
    ],
    "correctAnswer": 1,
    "explanation": "Anticoagulant use can affect hospital evaluation and treatment planning."
  },
  {
    "question": "A low FAST-ED score:",
    "options": [
      "Completely rules out stroke",
      "Rules out posterior stroke",
      "Does not completely exclude stroke",
      "Means no transport is needed"
    ],
    "correctAnswer": 2,
    "explanation": "FAST-ED is a severity/LVO tool and does not exclude all stroke."
  },
  {
    "question": "After treating hypoglycemia, persistent focal deficits should:",
    "options": [
      "Be ignored",
      "Prompt continued stroke evaluation",
      "Be assumed psychiatric",
      "Require only oral fluids"
    ],
    "correctAnswer": 1,
    "explanation": "Persistent deficits after correction still require stroke evaluation."
  },
  {
    "question": "Which is the best documentation statement?",
    "options": [
      "Stroke-ish symptoms",
      "LKW 1410 per spouse; FAST-ED 4; glucose 108",
      "Patient seemed off",
      "Neuro okay"
    ],
    "correctAnswer": 1,
    "explanation": "Specific times, sources, scores, and objective values are best."
  },
  {
    "question": "Destination selection should follow:",
    "options": [
      "Patient preference only",
      "Nearest hospital regardless of capability",
      "Current regional and Department-approved stroke guidance",
      "Crew habit"
    ],
    "correctAnswer": 2,
    "explanation": "Use current Department-approved and regional stroke destination guidance."
  },
  {
    "question": "The phrase used in the hospital entry note when criteria are met is:",
    "options": [
      "Neuro concern",
      "Possible issue",
      "Stroke Alert",
      "Urgent transport"
    ],
    "correctAnswer": 2,
    "explanation": "The supplied protocol explicitly instructs providers to say “Stroke Alert.”"
  }
];

export default function StrokeQuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce((total, question, index) => total + (answers[index] === question.correctAnswer ? 1 : 0), 0);
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
            <Link href="/courses/stroke" className="font-semibold text-red-500 hover:text-red-400">← Back to Stroke Course</Link>

            <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-7 md:p-10">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">Final Assessment</p>
              <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Stroke Recognition &amp; Prehospital Management</h1>
              <p className="mt-4 text-lg leading-8 text-zinc-300">Answer all 25 questions. A score of 80% or higher unlocks the completion certificate.</p>
              <div className="mt-7">
                <div className="flex justify-between text-sm font-bold text-zinc-400">
                  <span>Quiz Progress</span><span>{answeredCount} / {questions.length} answered</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full bg-red-600 transition-all" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
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
                <h2 className={`mt-5 text-2xl font-bold ${passed ? "text-emerald-400" : "text-red-400"}`}>{passed ? "Passed" : "Additional review required"}</h2>
                <p className="mt-2 text-zinc-300">{passed ? "Your certificate is available below." : "Review the explanations and retake the quiz."}</p>
              </section>
            )}

            <div className="mt-10 space-y-8">
              {questions.map((question, questionIndex) => {
                const selectedAnswer = answers[questionIndex];
                return (
                  <section key={question.question} className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 font-extrabold">{questionIndex + 1}</span>
                      <h2 className="text-xl font-bold leading-8">{question.question}</h2>
                    </div>
                    <div className="mt-6 space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const selected = selectedAnswer === optionIndex;
                        const correct = submitted && optionIndex === question.correctAnswer;
                        const incorrect = submitted && selected && !correct;
                        return (
                          <button key={option} type="button" disabled={submitted} onClick={() => selectAnswer(questionIndex, optionIndex)}
                            className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${correct ? "border-emerald-500 bg-emerald-500/10" : incorrect ? "border-red-500 bg-red-500/10" : selected ? "border-red-500 bg-red-950/30" : "border-zinc-700 bg-black hover:border-zinc-500"}`}>
                            <span className="font-bold text-zinc-400">{String.fromCharCode(65 + optionIndex)}.</span><span>{option}</span>
                          </button>
                        );
                      })}
                    </div>
                    {submitted && <div className="mt-5 rounded-xl border border-zinc-700 bg-black p-4 leading-7 text-zinc-300"><strong className="text-red-400">Explanation:</strong> {question.explanation}</div>}
                  </section>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {!submitted ? (
                <button type="button" onClick={submitQuiz} className="rounded-xl bg-red-600 px-8 py-4 font-bold hover:bg-red-500">Submit Quiz</button>
              ) : (
                <button type="button" onClick={resetQuiz} className="rounded-xl border border-zinc-600 px-8 py-4 font-bold hover:border-red-500">Retake Quiz</button>
              )}
              {passed && <Link href={`/courses/stroke/certificate?score=${percentage}`} className="rounded-xl bg-emerald-600 px-8 py-4 font-bold hover:bg-emerald-500">View / Download Certificate</Link>}
            </div>
          </section>
        </CourseAccessGate>
      </main>
    </>
  );
}
