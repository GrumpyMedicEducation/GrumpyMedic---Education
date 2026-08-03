"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar";

export default function StrokeResourcesPage() {
  const [lastKnownWell, setLastKnownWell] = useState("");
  const [discoveryTime, setDiscoveryTime] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [fastEdScore, setFastEdScore] = useState("");
  const [glucose, setGlucose] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [anticoagulants, setAnticoagulants] = useState("");
  const [eta, setEta] = useState("");
  const [copied, setCopied] = useState(false);

  const strokeAlertSummary = useMemo(() => {
    const scoreNumber =
      fastEdScore.trim() === "" ? null : Number(fastEdScore);

    const lvoStatement =
      scoreNumber === null || Number.isNaN(scoreNumber)
        ? "FAST-ED interpretation: Score not entered."
        : scoreNumber >= 4
          ? "FAST-ED interpretation: Elevated score; increased concern for possible large-vessel occlusion."
          : "FAST-ED interpretation: Lower score; stroke is not excluded.";

    return [
      "STROKE ALERT",
      `Patient age: ${patientAge || "Not entered"}`,
      `Last Known Well: ${lastKnownWell || "Not entered"}`,
      `Symptom discovery time: ${discoveryTime || "Not entered"}`,
      `FAST-ED score: ${fastEdScore || "Not entered"}`,
      `Blood glucose: ${glucose || "Not entered"}`,
      `Blood pressure: ${bloodPressure || "Not entered"}`,
      `Anticoagulants: ${anticoagulants || "Not entered"}`,
      `ETA: ${eta || "Not entered"}`,
      lvoStatement,
    ].join("\n");
  }, [
    anticoagulants,
    bloodPressure,
    discoveryTime,
    eta,
    fastEdScore,
    glucose,
    lastKnownWell,
    patientAge,
  ]);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(strokeAlertSummary);
      setCopied(true);
    } catch {
      window.alert("Unable to copy automatically. Please copy the summary manually.");
    }
  }

  function resetForm() {
    setLastKnownWell("");
    setDiscoveryTime("");
    setPatientAge("");
    setFastEdScore("");
    setGlucose("");
    setBloodPressure("");
    setAnticoagulants("");
    setEta("");
    setCopied(false);
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
              GrumpyMedic Clinical Resource Hub
            </p>

            <h1 className="mt-3 text-4xl font-extrabold sm:text-6xl">
              Stroke Resources
            </h1>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-300">
              FAST-ED scoring, Last Known Well documentation, Stroke Alert
              handoff support, large-vessel-occlusion reminders, and
              Massachusetts protocol-focused references.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <ResourceLink
              href="/resources/fast-ed-calculator"
              eyebrow="Interactive Tool"
              title="FAST-ED Calculator"
              description="Score all five FAST-ED elements, calculate the total, and create a documentation summary."
            />

            <ResourceLink
              href="/resources/stroke-scale"
              eyebrow="Clinical Reference"
              title="FAST-ED Stroke Scale"
              description="Review scoring criteria, assessment guidance, and examples for each FAST-ED category."
            />

            <ResourceLink
              href="/courses/stroke"
              eyebrow="Full Course"
              title="Stroke Recognition Course"
              description="Review stroke recognition, Last Known Well, mimics, Stroke Alert communication, destination considerations, and documentation."
            />

            <ResourceLink
              href="/courses/stroke/quiz"
              eyebrow="Assessment"
              title="Stroke Course Quiz"
              description="Complete the stroke assessment and earn a printable course-completion certificate after passing."
            />
          </div>

          <section className="mt-14">
            <SectionHeader
              number="01"
              title="Last Known Well Helper"
              description="Keep Last Known Well separate from the time symptoms were discovered."
            />

            <div className="grid gap-6 md:grid-cols-2">
              <Field
                label="Last Known Well"
                value={lastKnownWell}
                onChange={setLastKnownWell}
                placeholder="Example: 14:10 or 08/02/2026 14:10"
              />

              <Field
                label="Symptom Discovery Time"
                value={discoveryTime}
                onChange={setDiscoveryTime}
                placeholder="Example: 14:35 or 08/02/2026 14:35"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-amber-500 bg-amber-500/10 p-6">
              <h3 className="text-xl font-extrabold text-amber-300">
                Timeline Reminder
              </h3>

              <p className="mt-3 leading-7 text-zinc-200">
                Last Known Well is the last time the patient was observed at
                their neurologic baseline. It is not automatically the time
                symptoms were discovered. For wake-up symptoms, document both
                the last observed normal time and the discovery time.
              </p>
            </div>
          </section>

          <section className="mt-14">
            <SectionHeader
              number="02"
              title="Stroke Alert Documentation Helper"
              description="Enter available information to create a concise prearrival or PCR summary."
            />

            <div className="grid gap-6 md:grid-cols-2">
              <Field
                label="Patient Age"
                value={patientAge}
                onChange={setPatientAge}
                placeholder="Example: 72"
              />

              <Field
                label="FAST-ED Score"
                value={fastEdScore}
                onChange={setFastEdScore}
                placeholder="0–9"
                inputMode="numeric"
              />

              <Field
                label="Blood Glucose"
                value={glucose}
                onChange={setGlucose}
                placeholder="Example: 112 mg/dL"
              />

              <Field
                label="Blood Pressure"
                value={bloodPressure}
                onChange={setBloodPressure}
                placeholder="Example: 188/96"
              />

              <Field
                label="Anticoagulants"
                value={anticoagulants}
                onChange={setAnticoagulants}
                placeholder="Example: Apixaban / none known"
              />

              <Field
                label="ETA"
                value={eta}
                onChange={setEta}
                placeholder="Example: 8 minutes"
              />
            </div>

            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-2xl font-extrabold text-red-500">
                Generated Summary
              </h3>

              <pre className="mt-5 whitespace-pre-wrap rounded-xl border border-zinc-800 bg-black p-5 font-sans leading-7 text-zinc-300">
                {strokeAlertSummary}
              </pre>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copySummary}
                  className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
                >
                  {copied ? "Summary Copied" : "Copy Summary"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500 hover:text-red-400"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500 hover:text-red-400"
                >
                  Print
                </button>
              </div>
            </div>
          </section>

          <section className="mt-14">
            <SectionHeader
              number="03"
              title="Large-Vessel-Occlusion Guide"
              description="Use FAST-ED as a severity and communication tool—not as a stand-alone diagnosis."
            />

            <div className="grid gap-6 md:grid-cols-2">
              <InfoCard title="FAST-ED 4 or Greater">
                An elevated score increases concern for a possible
                large-vessel occlusion. Apply the full clinical picture,
                current protocol, regional destination plan, and Medical
                Control guidance.
              </InfoCard>

              <InfoCard title="FAST-ED Below 4">
                A lower score does not exclude stroke. Posterior-circulation
                stroke and other disabling stroke presentations may not
                produce a high FAST-ED score.
              </InfoCard>
            </div>
          </section>

          <section className="mt-14">
            <SectionHeader
              number="04"
              title="Destination Decision Reminder"
              description="Destination decisions depend on time, capability, regional planning, and the patient’s complete presentation."
            />

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Determine exact Last Known Well.",
                "Calculate and communicate FAST-ED.",
                "Check blood glucose.",
                "Identify anticoagulant use.",
                "Consider symptom onset plus transport time.",
                "Follow the current Department-approved regional stroke plan.",
                "Contact Medical Control when required or clinically appropriate.",
                "Do not delay transport for avoidable interventions.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 leading-7 text-zinc-300"
                >
                  <span className="font-bold text-red-500">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-2xl border border-amber-500 bg-amber-500/10 p-6">
            <h2 className="text-xl font-extrabold text-amber-300">
              Educational and Clinical-Use Notice
            </h2>

            <p className="mt-3 leading-7 text-zinc-200">
              These tools support education, scoring, communication, and
              documentation. They do not diagnose stroke, exclude stroke,
              independently determine destination, or replace current
              Massachusetts protocols, regional stroke plans, service policy,
              Medical Control, or clinical judgment.
            </p>
          </section>
        </section>
      </main>
    </>
  );
}

function ResourceLink({
  href,
  eyebrow,
  title,
  description,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-red-500"
    >
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-2xl font-extrabold">{title}</h2>

      <p className="mt-3 leading-7 text-zinc-400">{description}</p>

      <p className="mt-6 font-bold text-red-500 group-hover:text-red-400">
        Open Resource →
      </p>
    </Link>
  );
}

function SectionHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-7 border-b border-zinc-800 pb-6">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
        Section {number}
      </p>

      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>

      <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-400">
        {description}
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  inputMode?: "text" | "numeric" | "decimal";
}) {
  return (
    <label className="block">
      <span className="font-bold text-white">{label}</span>

      <input
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
      />
    </label>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h3 className="text-2xl font-extrabold text-red-500">{title}</h3>

      <div className="mt-4 leading-7 text-zinc-300">{children}</div>
    </article>
  );
}