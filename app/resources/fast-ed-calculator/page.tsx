"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar";

type FastEdItem = {
  id: "facial" | "arm" | "speech" | "eye" | "neglect";
  label: string;
  shortLabel: string;
  maxScore: number;
  options: {
    score: number;
    label: string;
    description: string;
  }[];
};

const fastEdItems: FastEdItem[] = [
  {
    id: "facial",
    label: "Facial Palsy",
    shortLabel: "F",
    maxScore: 1,
    options: [
      {
        score: 0,
        label: "Normal or minor paralysis",
        description: "No meaningful facial asymmetry or only minor asymmetry.",
      },
      {
        score: 1,
        label: "Partial or complete paralysis",
        description: "Clear unilateral facial weakness or paralysis.",
      },
    ],
  },
  {
    id: "arm",
    label: "Arm Weakness",
    shortLabel: "A",
    maxScore: 2,
    options: [
      {
        score: 0,
        label: "No drift",
        description: "The arm remains elevated without downward drift.",
      },
      {
        score: 1,
        label: "Drift or some effort against gravity",
        description: "The arm drifts or shows limited effort against gravity.",
      },
      {
        score: 2,
        label: "No effort against gravity or no movement",
        description: "The arm cannot be held up or has no movement.",
      },
    ],
  },
  {
    id: "speech",
    label: "Speech Changes",
    shortLabel: "S",
    maxScore: 2,
    options: [
      {
        score: 0,
        label: "Absent",
        description: "No aphasia or meaningful speech change.",
      },
      {
        score: 1,
        label: "Mild to moderate",
        description: "Some aphasia or speech disturbance is present.",
      },
      {
        score: 2,
        label: "Severe, global aphasia, or mute",
        description: "Severe language impairment, global aphasia, or muteness.",
      },
    ],
  },
  {
    id: "eye",
    label: "Eye Deviation",
    shortLabel: "E",
    maxScore: 2,
    options: [
      {
        score: 0,
        label: "Absent",
        description: "No gaze deviation.",
      },
      {
        score: 1,
        label: "Partial",
        description: "Partial gaze deviation is present.",
      },
      {
        score: 2,
        label: "Forced deviation",
        description: "Forced gaze deviation is present.",
      },
    ],
  },
  {
    id: "neglect",
    label: "Denial / Neglect",
    shortLabel: "D",
    maxScore: 2,
    options: [
      {
        score: 0,
        label: "Absent",
        description: "No extinction, denial, or neglect.",
      },
      {
        score: 1,
        label: "Extinction in one sensory modality",
        description:
          "Extinction occurs with bilateral simultaneous stimulation in one sensory modality.",
      },
      {
        score: 2,
        label: "Does not recognize own hand or orients to one side only",
        description:
          "Severe denial or neglect, including failure to recognize the affected hand or orienting only to one side.",
      },
    ],
  },
];

type Answers = Record<FastEdItem["id"], number | null>;

const initialAnswers: Answers = {
  facial: null,
  arm: null,
  speech: null,
  eye: null,
  neglect: null,
};

export default function FastEdCalculatorPage() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [copied, setCopied] = useState(false);

  const completedCount = useMemo(
    () => Object.values(answers).filter((value) => value !== null).length,
    [answers],
  );

  const totalScore = useMemo<number>(
    () =>
      Object.values(answers).reduce<number>(
        (total, value) => total + (value ?? 0),
        0,
      ),
    [answers],
  );

  const complete = completedCount === fastEdItems.length;

  const interpretation = useMemo(() => {
    if (!complete) {
      return {
        title: "Complete all five FAST-ED elements",
        text: "The score will be interpreted after every category has been selected.",
        className: "border-zinc-700 bg-zinc-900 text-zinc-300",
      };
    }

    if (totalScore >= 4) {
      return {
        title: "Elevated FAST-ED score",
        text: "This score increases concern for a possible large-vessel occlusion. Use the full clinical picture, current Massachusetts stroke protocol, regional destination guidance, and Medical Control as applicable.",
        className:
          "border-red-500 bg-red-500/10 text-red-100",
      };
    }

    return {
      title: "Lower FAST-ED score",
      text: "A lower score does not exclude stroke, including posterior-circulation stroke. Continue the complete stroke assessment and follow current protocol and destination guidance.",
      className:
        "border-amber-500 bg-amber-500/10 text-amber-100",
    };
  }, [complete, totalScore]);

  const summary = useMemo(() => {
    const lines = fastEdItems.map((item) => {
      const selectedScore = answers[item.id];
      const selectedOption = item.options.find(
        (option) => option.score === selectedScore,
      );

      return `${item.label}: ${
        selectedScore === null
          ? "Not selected"
          : `${selectedScore} — ${selectedOption?.label ?? ""}`
      }`;
    });

    return [
      "FAST-ED Stroke Scale",
      ...lines,
      `Total FAST-ED Score: ${totalScore}/9`,
      complete
        ? totalScore >= 4
          ? "Interpretation: Elevated score; increased concern for possible LVO."
          : "Interpretation: Lower score; stroke is not excluded."
        : "Interpretation: Incomplete assessment.",
    ].join("\n");
  }, [answers, complete, totalScore]);

  function setScore(itemId: FastEdItem["id"], score: number) {
    setAnswers((current) => ({
      ...current,
      [itemId]: score,
    }));
    setCopied(false);
  }

  function resetCalculator() {
    setAnswers(initialAnswers);
    setCopied(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      window.alert("Unable to copy automatically. Please copy the summary manually.");
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <Link
              href="/resources"
              className="font-semibold text-red-500 transition hover:text-red-400"
            >
              ← Back to Resources
            </Link>

            <p className="mt-10 text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">
              GrumpyMedic Clinical Tool
            </p>

            <h1 className="mt-3 text-4xl font-extrabold sm:text-6xl">
              FAST-ED Stroke Scale Calculator
            </h1>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-300">
              Select the best finding for each FAST-ED element. The calculator
              totals the score, provides a plain-language interpretation, and
              creates a documentation summary.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat label="Scale Range" value="0–9" />
              <Stat label="Categories" value="5" />
              <Stat label="Protocol Focus" value="Massachusetts Stroke 2.18" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-7">
              {fastEdItems.map((item, itemIndex) => (
                <section
                  key={item.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-2xl font-extrabold">
                      {item.shortLabel}
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                        Element {itemIndex + 1} of {fastEdItems.length}
                      </p>

                      <h2 className="mt-1 text-2xl font-extrabold">
                        {item.label}
                      </h2>
                    </div>

                    <div className="rounded-xl border border-zinc-700 bg-black px-4 py-2 text-center">
                      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                        Max
                      </p>

                      <p className="text-xl font-extrabold text-red-500">
                        {item.maxScore}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {item.options.map((option) => {
                      const selected = answers[item.id] === option.score;

                      return (
                        <button
                          key={`${item.id}-${option.score}`}
                          type="button"
                          onClick={() => setScore(item.id, option.score)}
                          className={`flex w-full gap-4 rounded-xl border p-4 text-left transition ${
                            selected
                              ? "border-red-500 bg-red-950/30"
                              : "border-zinc-700 bg-black hover:border-zinc-500"
                          }`}
                        >
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg font-extrabold ${
                              selected
                                ? "bg-red-600 text-white"
                                : "bg-zinc-800 text-zinc-300"
                            }`}
                          >
                            {option.score}
                          </span>

                          <span>
                            <span className="block font-bold text-white">
                              {option.label}
                            </span>

                            <span className="mt-1 block leading-6 text-zinc-400">
                              {option.description}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">
                  FAST-ED Result
                </p>

                <div className="mt-5 flex items-end gap-3">
                  <span className="text-7xl font-extrabold">{totalScore}</span>
                  <span className="pb-2 text-2xl font-bold text-zinc-500">
                    / 9
                  </span>
                </div>

                <p className="mt-3 text-sm font-semibold text-zinc-400">
                  {completedCount} of {fastEdItems.length} categories completed
                </p>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-red-600 transition-all"
                    style={{
                      width: `${(completedCount / fastEdItems.length) * 100}%`,
                    }}
                  />
                </div>

                <div
                  className={`mt-6 rounded-xl border p-5 ${interpretation.className}`}
                >
                  <h3 className="text-lg font-extrabold">
                    {interpretation.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6">
                    {interpretation.text}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {fastEdItems.map((item) => (
                    <div
                      key={`summary-${item.id}`}
                      className="flex items-center justify-between rounded-lg border border-zinc-800 bg-black px-4 py-3"
                    >
                      <span className="font-semibold text-zinc-300">
                        {item.label}
                      </span>

                      <span className="font-extrabold text-red-500">
                        {answers[item.id] ?? "—"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3">
                  <button
                    type="button"
                    onClick={copySummary}
                    className="rounded-xl bg-red-600 px-5 py-3 font-bold transition hover:bg-red-500"
                  >
                    {copied ? "Summary Copied" : "Copy Documentation Summary"}
                  </button>

                  <button
                    type="button"
                    onClick={resetCalculator}
                    className="rounded-xl border border-zinc-600 px-5 py-3 font-bold transition hover:border-red-500 hover:text-red-400"
                  >
                    Reset Calculator
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-xl border border-zinc-600 px-5 py-3 font-bold transition hover:border-red-500 hover:text-red-400"
                  >
                    Print Result
                  </button>
                </div>
              </div>
            </aside>
          </div>

          <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-7">
            <h2 className="text-2xl font-extrabold text-red-500">
              Documentation Summary
            </h2>

            <pre className="mt-5 whitespace-pre-wrap rounded-xl border border-zinc-800 bg-black p-5 font-sans leading-7 text-zinc-300">
              {summary}
            </pre>
          </section>

          <section className="mt-8 rounded-2xl border border-amber-500 bg-amber-500/10 p-6">
            <h2 className="text-xl font-extrabold text-amber-300">
              Educational and Clinical-Use Notice
            </h2>

            <p className="mt-3 leading-7 text-zinc-200">
              This calculator supports FAST-ED scoring only. It does not
              diagnose stroke, exclude stroke, independently determine
              destination, or replace the current Massachusetts Statewide
              Treatment Protocols, regional stroke plan, service policy,
              Medical Control, or clinical judgment.
            </p>
          </section>
        </section>
      </main>

      <style jsx global>{`
        @media print {
          nav,
          button,
          a {
            display: none !important;
          }

          body {
            background: white !important;
          }

          main {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-2 font-bold text-white">{value}</p>
    </div>
  );
}