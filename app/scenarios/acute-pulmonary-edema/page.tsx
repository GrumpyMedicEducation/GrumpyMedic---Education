"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ScenarioPage() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const scenario = [
    {
      title: "Dispatch",
      text: "You are dispatched Priority 1 for a 72-year-old male complaining of severe difficulty breathing. Family reports he suddenly became short of breath while watching TV.",
      choices: [
        { text: "Respond Priority 1", correct: true },
        { text: "Respond Routine", correct: false }
      ]
    },

    {
      title: "Arrival",
      text: "Patient is sitting upright, tripod position, pale, diaphoretic and speaking only 2-word sentences.",
      vitals: "HR 122 | BP 238/132 | RR 34 | SpO₂ 82% | ETCO₂ 31",
      choices: [
        { text: "Apply CPAP immediately", correct: true },
        { text: "Lay patient flat", correct: false }
      ]
    },

    {
      title: "Medication",
      text: "Lung sounds reveal diffuse crackles. No chest pain. Severe hypertension.",
      choices: [
        { text: "Administer Nitroglycerin", correct: true },
        { text: "Give Albuterol only", correct: false }
      ]
    },

    {
      title: "Reassessment",
      text: "Five minutes later:",
      vitals: "HR 104 | BP 188/100 | RR 24 | SpO₂ 95%",
      choices: [
        { text: "Continue CPAP and reassess", correct: true },
        { text: "Remove CPAP because oxygen improved", correct: false }
      ]
    }
  ];

  const current = scenario[step];

  function answer(correct: boolean) {
    if (correct) setScore(score + 1);

    if (step < scenario.length - 1) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  }

  if (step === scenario.length) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-4xl p-10">

          <div className="rounded-2xl border border-green-500 bg-zinc-900 p-10 text-center">

            <h1 className="text-5xl font-bold">
              Scenario Complete
            </h1>

            <p className="mt-8 text-2xl">
              Score: {score} / {scenario.length}
            </p>

            <div className="mt-10 flex justify-center gap-4">

              <Link
                href="/courses/acute-pulmonary-edema"
                className="rounded-lg bg-red-600 px-6 py-3 font-bold hover:bg-red-700"
              >
                Return Course
              </Link>

              <Link
                href="/courses/acute-pulmonary-edema/quiz"
                className="rounded-lg border border-zinc-700 px-6 py-3"
              >
                Take Quiz
              </Link>

            </div>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="mx-auto max-w-5xl p-10">

        <p className="text-red-500 uppercase tracking-widest font-bold">
          Interactive Scenario
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          Acute Pulmonary Edema
        </h1>

        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-8">

          <h2 className="text-3xl font-bold">
            {current.title}
          </h2>

          <p className="mt-6 text-xl text-zinc-300">
            {current.text}
          </p>

          {current.vitals && (
            <div className="mt-6 rounded-lg border border-red-500 bg-black p-4">
              <h3 className="font-bold text-red-400">
                Patient Vitals
              </h3>

              <p className="mt-2">
                {current.vitals}
              </p>
            </div>
          )}

          <div className="mt-10 space-y-4">

            {current.choices.map((choice, index) => (

              <button
                key={index}
                onClick={() => answer(choice.correct)}
                className="block w-full rounded-xl border border-zinc-700 bg-zinc-800 p-5 text-left hover:border-red-500 hover:bg-zinc-700"
              >
                {choice.text}
              </button>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}