"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar";

type ScoreOption = {
  label: string;
  score: number;
};

const eyeOptions: ScoreOption[] = [
  { label: "Spontaneous", score: 4 },
  { label: "To verbal command", score: 3 },
  { label: "To pain", score: 2 },
  { label: "No response", score: 1 },
];

const verbalOptions: ScoreOption[] = [
  { label: "Oriented", score: 5 },
  { label: "Confused conversation", score: 4 },
  { label: "Inappropriate words", score: 3 },
  { label: "Incomprehensible sounds", score: 2 },
  { label: "No response", score: 1 },
];

const motorOptions: ScoreOption[] = [
  { label: "Obeys commands", score: 6 },
  { label: "Localizes pain", score: 5 },
  { label: "Withdraws from pain", score: 4 },
  { label: "Abnormal flexion", score: 3 },
  { label: "Abnormal extension", score: 2 },
  { label: "No response", score: 1 },
];

export default function GCSPage() {
  const [eye, setEye] = useState<number | null>(null);
  const [verbal, setVerbal] = useState<number | null>(null);
  const [motor, setMotor] = useState<number | null>(null);

  const total =
    eye !== null && verbal !== null && motor !== null
      ? eye + verbal + motor
      : null;

  const interpretation = getInterpretation(total);

  function resetCalculator() {
    setEye(null);
    setVerbal(null);
    setMotor(null);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/resources"
          className="text-sm font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Resources
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-extrabold md:text-5xl">
            Glasgow Coma Scale
          </h1>

          <p className="mt-4 max-w-3xl text-zinc-400">
            Select the patient&apos;s best eye, verbal, and motor responses.
            Document the individual components as well as the total score.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            <ScoreSection
              title="E — Eye Response"
              options={eyeOptions}
              selectedScore={eye}
              onSelect={setEye}
            />

            <ScoreSection
              title="V — Verbal Response"
              options={verbalOptions}
              selectedScore={verbal}
              onSelect={setVerbal}
            />

            <ScoreSection
              title="M — Motor Response"
              options={motorOptions}
              selectedScore={motor}
              onSelect={setMotor}
            />
          </div>

          <aside className="h-fit rounded-2xl border border-zinc-700 bg-zinc-900 p-6 lg:sticky lg:top-6">
            <p className="text-sm font-bold uppercase tracking-wide text-zinc-400">
              GCS Total
            </p>

            <div className="mt-3 text-7xl font-extrabold text-red-500">
              {total ?? "—"}
            </div>

            <p className="mt-2 text-sm text-zinc-400">
              Possible score: 3–15
            </p>

            <div className="mt-6 rounded-xl border border-zinc-700 bg-black p-4">
              <p className="text-sm font-bold uppercase text-zinc-400">
                Components
              </p>

              <p className="mt-3 text-2xl font-bold">
                E{eye ?? "—"} V{verbal ?? "—"} M{motor ?? "—"}
              </p>
            </div>

            <div
              className={`mt-6 rounded-xl border p-4 ${interpretation.className}`}
            >
              <h2 className="text-xl font-bold">
                {interpretation.title}
              </h2>

              <p className="mt-2 text-sm">
                {interpretation.description}
              </p>
            </div>

            <button
              type="button"
              onClick={resetCalculator}
              className="mt-6 w-full rounded-xl border border-red-500 px-4 py-3 font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              Reset Calculator
            </button>
          </aside>
        </div>

        <section className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold text-red-500">
            Documentation Reminder
          </h2>

          <p className="mt-3 text-zinc-300">
            Document each component separately, such as E3 V4 M6, rather than
            documenting only the total score.
          </p>

          <p className="mt-3 text-sm text-zinc-500">
            If a response cannot be tested because of intubation, sedation,
            paralysis, swelling, or another limitation, document the reason
            clearly rather than assigning an inaccurate score.
          </p>
        </section>

        <p className="mt-8 text-sm text-zinc-500">
          Educational reference only. Perform a complete neurologic assessment
          and follow local protocols, trauma guidelines, and medical-control
          direction.
        </p>
      </section>
    </main>
  );
}

function ScoreSection({
  title,
  options,
  selectedScore,
  onSelect,
}: {
  title: string;
  options: ScoreOption[];
  selectedScore: number | null;
  onSelect: (score: number) => void;
}) {
  return (
    <section className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold text-red-500">{title}</h2>

      <div className="mt-5 space-y-3">
        {options.map((option) => {
          const selected = selectedScore === option.score;

          return (
            <button
              key={`${title}-${option.score}`}
              type="button"
              onClick={() => onSelect(option.score)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left transition ${
                selected
                  ? "border-red-500 bg-red-500/10"
                  : "border-zinc-700 bg-black hover:border-zinc-500"
              }`}
            >
              <span className="font-medium text-zinc-100">
                {option.label}
              </span>

              <span
                className={`ml-4 flex h-9 w-9 items-center justify-center rounded-lg font-extrabold ${
                  selected
                    ? "bg-red-500 text-white"
                    : "bg-zinc-800 text-zinc-300"
                }`}
              >
                {option.score}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function getInterpretation(total: number | null) {
  if (total === null) {
    return {
      title: "Assessment incomplete",
      description:
        "Select one response from each category to calculate the total score.",
      className: "border-zinc-700 bg-zinc-800 text-zinc-300",
    };
  }

  if (total >= 13) {
    return {
      title: "GCS 13–15",
      description:
        "Traditionally categorized as mild impairment. Continue reassessment and evaluate the full clinical picture.",
      className: "border-emerald-500/60 bg-emerald-500/10 text-emerald-300",
    };
  }

  if (total >= 9) {
    return {
      title: "GCS 9–12",
      description:
        "Traditionally categorized as moderate impairment. Closely monitor airway, breathing, circulation, and neurologic status.",
      className: "border-amber-500/60 bg-amber-500/10 text-amber-300"
    };
  }

  return {
    title: "GCS 3–8",
    description:
      "Traditionally categorized as severe impairment. Consider immediate airway and neurologic priorities according to local protocol.",
    className: "border-red-500/60 bg-red-500/10 text-red-300",
  };
}