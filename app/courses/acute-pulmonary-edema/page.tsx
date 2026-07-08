"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

type Step = {
  title: string;
  radio: string;
  scene: string;
  patient: string;
  vitals: {
    hr: string;
    bp: string;
    rr: string;
    spo2: string;
    etco2: string;
  };
  choices: {
    text: string;
    result: string;
    correct: boolean;
  }[];
};

const steps: Step[] = [
  {
    title: "Dispatch",
    radio: "Medic 1, respond Priority 1 for a 72-year-old male with difficulty breathing.",
    scene: "Time: 02:17. Weather: light rain. Family reports the patient woke up unable to breathe.",
    patient: "No patient contact yet.",
    vitals: {
      hr: "--",
      bp: "--",
      rr: "--",
      spo2: "--",
      etco2: "--",
    },
    choices: [
      {
        text: "Respond Priority 1",
        correct: true,
        result: "Good. This is a high-risk respiratory complaint.",
      },
      {
        text: "Respond routine",
        correct: false,
        result: "Poor choice. Severe respiratory distress should be treated as time-sensitive.",
      },
    ],
  },
  {
    title: "Arrival",
    radio: "You arrive on scene.",
    scene: "Patient is sitting upright in tripod position on the couch. He is pale, diaphoretic, anxious, and speaking only 1–2 words.",
    patient: "Family states: “He woke up like this and keeps saying he can’t breathe.”",
    vitals: {
      hr: "122",
      bp: "238/132",
      rr: "34",
      spo2: "82%",
      etco2: "31",
    },
    choices: [
      {
        text: "Assess airway and breathing",
        correct: true,
        result: "Correct. Airway and breathing are immediate priorities.",
      },
      {
        text: "Start with IV access",
        correct: false,
        result: "IV access matters, but oxygenation and ventilation come first.",
      },
      {
        text: "Ask for the medication list first",
        correct: false,
        result: "History is important, but this patient needs immediate respiratory support.",
      },
    ],
  },
  {
    title: "Primary Assessment",
    radio: "Airway is patent. Breathing is severely labored.",
    scene: "You hear diffuse crackles/rales bilaterally. Patient cannot lie flat. Pink frothy sputum is present.",
    patient: "Patient says: “Can’t… breathe…”",
    vitals: {
      hr: "124",
      bp: "240/130",
      rr: "36",
      spo2: "82%",
      etco2: "30",
    },
    choices: [
      {
        text: "Apply CPAP",
        correct: true,
        result: "Correct. CPAP is a key early intervention for severe pulmonary edema.",
      },
      {
        text: "Lay the patient flat",
        correct: false,
        result: "Bad move. Lying flat can worsen respiratory distress.",
      },
      {
        text: "Give a fluid bolus",
        correct: false,
        result: "Incorrect. This patient already has fluid in the lungs.",
      },
    ],
  },
  {
    title: "After CPAP",
    radio: "CPAP is applied. Patient is tolerating it.",
    scene: "After five minutes, work of breathing improves slightly. He is still hypertensive and anxious.",
    patient: "Patient can now answer with short sentences.",
    vitals: {
      hr: "112",
      bp: "220/118",
      rr: "28",
      spo2: "91%",
      etco2: "33",
    },
    choices: [
      {
        text: "Consider nitroglycerin per protocol",
        correct: true,
        result: "Correct. Nitro can reduce preload/afterload and improve pulmonary edema symptoms.",
      },
      {
        text: "Remove CPAP because SpO₂ improved",
        correct: false,
        result: "Incorrect. The patient is improving because CPAP is working.",
      },
      {
        text: "Delay transport until symptoms fully resolve",
        correct: false,
        result: "Incorrect. Continue treatment and transport. Do not wait on scene unnecessarily.",
      },
    ],
  },
  {
    title: "Reassessment",
    radio: "After CPAP and nitroglycerin, the patient improves.",
    scene: "Respiratory effort is improved. Skin is less diaphoretic. Patient is speaking full sentences.",
    patient: "Patient says: “I can breathe better now.”",
    vitals: {
      hr: "104",
      bp: "184/96",
      rr: "22",
      spo2: "95%",
      etco2: "36",
    },
    choices: [
      {
        text: "Continue CPAP, reassess, and transport priority",
        correct: true,
        result: "Correct. Continue monitoring and transport to the appropriate facility.",
      },
      {
        text: "Cancel transport",
        correct: false,
        result: "Incorrect. This patient still requires ED evaluation.",
      },
      {
        text: "Stop monitoring blood pressure",
        correct: false,
        result: "Incorrect. Blood pressure must be monitored closely after nitroglycerin.",
      },
    ],
  },
];

export default function AcutePulmonaryEdemaScenarioPage() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [answered, setAnswered] = useState(false);

  const current = steps[step];
  const finished = step >= steps.length;
  const percent = Math.round((score / steps.length) * 100);

  function choose(correct: boolean, result: string) {
    if (answered) return;

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setFeedback(result);
    setAnswered(true);
  }

  function nextStep() {
    setFeedback("");
    setAnswered(false);
    setStep((prev) => prev + 1);
  }

  function resetScenario() {
    setStep(0);
    setScore(0);
    setFeedback("");
    setAnswered(false);
  }

  if (finished) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-5xl px-8 py-10">
          <div className="rounded-2xl border border-green-500 bg-zinc-900 p-10 text-center shadow-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-green-400">
              Scenario Complete
            </p>

            <h1 className="mt-4 text-5xl font-extrabold">
              Acute Pulmonary Edema
            </h1>

            <p className="mt-6 text-6xl font-bold text-red-500">
              {percent}%
            </p>

            <p className="mt-3 text-xl text-zinc-300">
              Correct decisions: {score} / {steps.length}
            </p>

            <div className="mt-8 rounded-xl bg-black p-6 text-left">
              <h2 className="text-2xl font-bold">GrumpyMedic Debrief</h2>

              <p className="mt-4 text-zinc-300">
                {percent >= 80
                  ? "Strong work. You recognized respiratory distress, prioritized airway and breathing, applied CPAP early, considered nitroglycerin, reassessed, and transported appropriately."
                  : "Review the course and try again. Focus on early airway/breathing assessment, CPAP, blood pressure monitoring, nitroglycerin considerations, reassessment, and transport priority."}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={resetScenario}
                className="rounded-lg border border-zinc-700 px-5 py-3 font-semibold hover:bg-zinc-800"
              >
                Retake Scenario
              </button>

              <Link
                href="/courses/acute-pulmonary-edema"
                className="rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
              >
                Return to Course
              </Link>

              <Link
                href="/courses/acute-pulmonary-edema/quiz"
                className="rounded-lg border border-zinc-700 px-5 py-3 font-semibold hover:bg-zinc-800"
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

      <section className="mx-auto max-w-6xl px-8 py-10">
        <Link
          href="/courses"
          className="text-sm font-semibold text-red-500 hover:text-red-400"
        >
          ← Back to Courses
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
              <p className="text-sm font-bold uppercase tracking-widest text-red-500">
                Interactive EMS Scenario
              </p>

              <h1 className="mt-3 text-4xl font-extrabold">
                {current.title}
              </h1>

              <div className="mt-6 rounded-xl border border-red-800 bg-red-950/30 p-5">
                <p className="text-sm font-bold uppercase tracking-widest text-red-400">
                  Radio / CAD
                </p>
                <p className="mt-3 text-lg text-zinc-200">{current.radio}</p>
              </div>

              <div className="mt-6 rounded-xl border border-zinc-700 bg-black p-5">
                <h2 className="text-2xl font-bold">Scene</h2>
                <p className="mt-3 text-lg leading-8 text-zinc-300">
                  {current.scene}
                </p>

                <h3 className="mt-6 text-xl font-bold">Patient</h3>
                <p className="mt-2 text-zinc-300">{current.patient}</p>
              </div>

              {feedback && (
                <div
                  className={`mt-6 rounded-xl border p-5 ${
                    feedback.includes("Correct") ||
                    feedback.includes("Good")
                      ? "border-green-500 bg-green-950/30"
                      : "border-red-500 bg-red-950/30"
                  }`}
                >
                  <p className="font-bold">Feedback</p>
                  <p className="mt-2 text-zinc-200">{feedback}</p>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              {current.choices.map((choice) => (
                <button
                  key={choice.text}
                  disabled={answered}
                  onClick={() => choose(choice.correct, choice.result)}
                  className="block w-full rounded-xl border border-zinc-700 bg-zinc-900 p-5 text-left text-lg font-semibold transition hover:border-red-500 hover:bg-zinc-800 disabled:opacity-60"
                >
                  {choice.text}
                </button>
              ))}
            </div>

            {answered && (
              <button
                onClick={nextStep}
                className="mt-6 rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
              >
                Continue
              </button>
            )}
          </div>

          <aside className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-500">
              Patient Monitor
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <MonitorBox label="HR" value={current.vitals.hr} />
              <MonitorBox label="BP" value={current.vitals.bp} />
              <MonitorBox label="RR" value={current.vitals.rr} />
              <MonitorBox label="SpO₂" value={current.vitals.spo2} />
              <MonitorBox label="ETCO₂" value={current.vitals.etco2} />
            </div>

            <div className="mt-8 rounded-xl border border-zinc-700 bg-black p-4">
              <p className="text-sm text-zinc-400">Scenario Progress</p>
              <p className="mt-2 text-xl font-bold">
                Step {step + 1} of {steps.length}
              </p>

              <div className="mt-4 h-3 rounded-full bg-zinc-800">
                <div
                  className="h-3 rounded-full bg-red-600"
                  style={{
                    width: `${((step + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-zinc-700 bg-black p-4">
              <p className="text-sm text-zinc-400">Current Score</p>
              <p className="mt-2 text-3xl font-bold text-red-500">
                {score} / {steps.length}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function MonitorBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-black p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-extrabold text-green-400">{value}</p>
    </div>
  );
}