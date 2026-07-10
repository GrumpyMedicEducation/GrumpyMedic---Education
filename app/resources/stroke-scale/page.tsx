"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar";

type ScoreOption = {
  label: string;
  value: number;
};

type ScoreSelectorProps = {
  title: string;
  description: string;
  value: number;
  options: ScoreOption[];
  onChange: (value: number) => void;
};

export default function StrokeScalePage() {
  const [facialPalsy, setFacialPalsy] = useState(0);
  const [armWeakness, setArmWeakness] = useState(0);
  const [speechChanges, setSpeechChanges] = useState(0);
  const [eyeDeviation, setEyeDeviation] = useState(0);
  const [denialNeglect, setDenialNeglect] = useState(0);

  const totalScore = useMemo(() => {
    return (
      facialPalsy +
      armWeakness +
      speechChanges +
      eyeDeviation +
      denialNeglect
    );
  }, [
    facialPalsy,
    armWeakness,
    speechChanges,
    eyeDeviation,
    denialNeglect,
  ]);

  function resetCalculator() {
    setFacialPalsy(0);
    setArmWeakness(0);
    setSpeechChanges(0);
    setEyeDeviation(0);
    setDenialNeglect(0);
  }

  function scoreInterpretation() {
    if (totalScore === 0) {
      return {
        title: "No FAST-ED findings selected",
        text: "A score of zero does not rule out stroke. Continue a complete neurologic assessment and evaluate the patient’s history and last-known-well time.",
        className: "border-green-700 bg-green-950/30 text-green-300",
      };
    }

    if (totalScore <= 3) {
      return {
        title: "Abnormal neurologic findings",
        text: "The patient has FAST-ED findings. Activate the appropriate stroke pathway and follow local transport and medical-control guidance.",
        className: "border-yellow-700 bg-yellow-950/30 text-yellow-300",
      };
    }

    return {
      title: "High concern for large-vessel occlusion",
      text: "A FAST-ED score of 4 or greater is commonly associated with increased concern for large-vessel occlusion. Follow your local stroke destination protocol.",
      className: "border-red-700 bg-red-950/30 text-red-300",
    };
  }

  const interpretation = scoreInterpretation();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-8">
        <Link
          href="/resources"
          className="text-sm font-semibold text-red-500 hover:text-red-400"
        >
          ← Back to Resources
        </Link>

        <h1 className="mt-8 text-4xl font-extrabold md:text-5xl">
          FAST-ED Stroke Scale
        </h1>

        <p className="mt-3 max-w-3xl text-zinc-400">
          Use the FAST-ED scale as part of a rapid neurologic assessment for
          suspected stroke. Record the last-known-well time separately and
          follow your local stroke-alert and destination protocols.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <ScoreSelector
              title="F — Facial Palsy"
              description="Ask the patient to smile or show their teeth."
              value={facialPalsy}
              onChange={setFacialPalsy}
              options={[
                {
                  label: "Normal or minor facial paralysis",
                  value: 0,
                },
                {
                  label: "Partial or complete facial paralysis",
                  value: 1,
                },
              ]}
            />

            <ScoreSelector
              title="A — Arm Weakness"
              description="Ask the patient to close their eyes and hold both arms out for 10 seconds."
              value={armWeakness}
              onChange={setArmWeakness}
              options={[
                {
                  label: "No drift",
                  value: 0,
                },
                {
                  label: "Drift or some effort against gravity",
                  value: 1,
                },
                {
                  label: "No effort against gravity or no movement",
                  value: 2,
                },
              ]}
            />

            <ScoreSelector
              title="S — Speech Changes"
              description="Ask the patient to repeat a simple sentence."
              value={speechChanges}
              onChange={setSpeechChanges}
              options={[
                {
                  label: "No speech changes",
                  value: 0,
                },
                {
                  label: "Mild to moderate speech difficulty",
                  value: 1,
                },
                {
                  label: "Severe aphasia, global aphasia, or mute",
                  value: 2,
                },
              ]}
            />

            <ScoreSelector
              title="E — Eye Deviation"
              description="Ask the patient to look from side to side and assess gaze."
              value={eyeDeviation}
              onChange={setEyeDeviation}
              options={[
                {
                  label: "No eye deviation",
                  value: 0,
                },
                {
                  label: "Partial eye deviation",
                  value: 1,
                },
                {
                  label: "Forced eye deviation",
                  value: 2,
                },
              ]}
            />

            <ScoreSelector
              title="D — Denial or Neglect"
              description="Assess for extinction, sensory neglect, or failure to recognize one side."
              value={denialNeglect}
              onChange={setDenialNeglect}
              options={[
                {
                  label: "No denial or neglect",
                  value: 0,
                },
                {
                  label:
                    "Extinction to bilateral simultaneous stimulation in one sensory modality",
                  value: 1,
                },
                {
                  label:
                    "Does not recognize own hand or orients only to one side",
                  value: 2,
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <div className="sticky top-28 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                FAST-ED Score
              </p>

              <p className="mt-3 text-7xl font-extrabold text-red-500">
                {totalScore}
              </p>

              <p className="mt-2 text-zinc-300">
                Maximum FAST-ED score: 9
              </p>

              <div
                className={`mt-6 rounded-xl border p-5 ${interpretation.className}`}
              >
                <h2 className="text-xl font-bold">{interpretation.title}</h2>

                <p className="mt-2 text-sm leading-6">
                  {interpretation.text}
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-zinc-700 bg-black p-5">
                <h2 className="text-lg font-bold text-red-500">
                  Time Is Brain
                </h2>

                <p className="mt-2 text-sm text-zinc-300">
                  Time is not assigned points in the FAST-ED score. Document the
                  exact last-known-well time and activate the stroke system as
                  early as possible.
                </p>
              </div>

              <button
                type="button"
                onClick={resetCalculator}
                className="mt-6 w-full rounded-lg border border-red-500 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                Reset Score
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="text-3xl font-bold text-red-500">
            FAST-ED Reference
          </h2>

          <p className="mt-3 text-zinc-400">
            Use the infographic below as an educational reference while
            practicing the examination.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-zinc-700 bg-white">
            <Image
              src="/images/Stroke-Fast-Ed.png"
              alt="FAST-ED stroke examination reference infographic"
              width={1024}
              height={1536}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold text-red-500">
              Important History
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300">
              <li>Exact last-known-well time</li>
              <li>Head trauma or seizure activity</li>
              <li>Previous stroke or neurologic deficit</li>
              <li>Recent bleeding, trauma, surgery, or procedure</li>
              <li>Bleeding disorders</li>
              <li>Pregnancy</li>
              <li>Baseline mental and functional status</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold text-red-500">
              Medication History
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300">
              <li>Warfarin</li>
              <li>Dabigatran</li>
              <li>Rivaroxaban</li>
              <li>Apixaban</li>
              <li>Other anticoagulants</li>
              <li>Antiplatelet medications</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-red-700 bg-red-950/30 p-6">
          <h2 className="text-2xl font-bold text-red-500">
            Clinical Safety Reminder
          </h2>

          <p className="mt-3 text-zinc-300">
            FAST-ED is a screening tool and does not diagnose or exclude stroke.
            Check blood glucose, assess for stroke mimics, perform a complete
            neurologic examination, determine last-known-well time, and follow
            your local stroke-alert, transport, and medical-control protocols.
          </p>
        </div>
      </section>
    </main>
  );
}

function ScoreSelector({
  title,
  description,
  value,
  options,
  onChange,
}: ScoreSelectorProps) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
      <h2 className="text-2xl font-bold text-red-500">{title}</h2>

      <p className="mt-2 text-sm text-zinc-400">{description}</p>

      <div className="mt-5 space-y-3">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={`${title}-${option.value}`}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-red-500 bg-red-950/40"
                  : "border-zinc-700 bg-black hover:border-zinc-500"
              }`}
            >
              <span className="pr-4 text-zinc-200">{option.label}</span>

              <span
                className={`rounded-lg px-3 py-1 text-lg font-bold ${
                  selected
                    ? "bg-red-500 text-white"
                    : "bg-zinc-800 text-zinc-300"
                }`}
              >
                {option.value}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}