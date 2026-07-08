import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function AcutePulmonaryEdemaPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="p-10">
        <Link href="/courses" className="text-sm text-red-500 hover:text-red-400">
          ← Back to Courses
        </Link>

        <h1 className="mt-6 text-4xl font-bold">Acute Pulmonary Edema</h1>

        <p className="mt-4 max-w-3xl text-zinc-300">
          Learn how to recognize and manage acute pulmonary edema in the
          prehospital setting, including assessment findings, treatment
          priorities, and EMS decision-making.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold">Learning Objectives</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300">
              <li>Identify signs and symptoms of acute pulmonary edema.</li>
              <li>Differentiate respiratory distress from respiratory failure.</li>
              <li>Explain why CPAP can improve oxygenation.</li>
              <li>Recognize when ALS intervention may be needed.</li>
            </ul>
          </section>

          <section className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold">Key EMS Findings</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300">
              <li>Severe shortness of breath</li>
              <li>Tripod positioning or inability to lie flat</li>
              <li>Crackles or wet lung sounds</li>
              <li>Hypertension or signs of fluid overload</li>
              <li>Pink frothy sputum in severe cases</li>
            </ul>
          </section>
        </div>

        <section className="mt-8 rounded-xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="text-2xl font-semibold">EMS Treatment Priorities</h2>
          <p className="mt-4 text-zinc-300">
            Initial care should focus on airway positioning, oxygenation,
            ventilation support, and rapid reassessment. CPAP may be appropriate
            for patients who are awake, able to follow commands, and can maintain
            their own airway. Always follow your local protocol.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="text-2xl font-semibold">Quick Knowledge Check</h2>

          <p className="mt-4 text-zinc-300">
            Which finding is most consistent with acute pulmonary edema?
          </p>

          <div className="mt-4 space-y-3">
            <button className="block w-full rounded-lg border border-zinc-700 p-3 text-left hover:bg-zinc-800">
              Warm, dry skin with wheezing only
            </button>

            <button className="block w-full rounded-lg border border-zinc-700 p-3 text-left hover:bg-zinc-800">
              Sudden shortness of breath with crackles and inability to lie flat
            </button>

            <button className="block w-full rounded-lg border border-zinc-700 p-3 text-left hover:bg-zinc-800">
              Isolated ankle pain after a fall
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}