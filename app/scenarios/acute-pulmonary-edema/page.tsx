import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          GrumpyMedic Education
        </p>

        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          EMS Scenarios
        </h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Review EMS patient cases, practice clinical decision-making, and
          compare your treatment plan with recommended care.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/scenarios/acute-pulmonary-edema"
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-red-500">
              Respiratory Emergency
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Acute Pulmonary Edema
            </h2>

            <p className="mt-3 text-zinc-400">
              Review recognition, assessment findings, CPAP, nitroglycerin
              considerations, reassessment, and transport priorities.
            </p>

            <div className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 font-bold">
              Open Scenario →
            </div>
          </Link>

          <Link
            href="/simulator"
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-red-500">
              Interactive Training
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              EMS Call Simulator
            </h2>

            <p className="mt-3 text-zinc-400">
              Make treatment decisions and watch the patient’s condition change
              based on your actions.
            </p>

            <div className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 font-bold">
              Start Simulator →
            </div>
          </Link>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 opacity-70">
            <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
              Coming Soon
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Additional EMS Cases
            </h2>

            <p className="mt-3 text-zinc-500">
              Chest pain, stroke, trauma, sepsis, diabetic emergencies, and
              pediatric scenarios are under development.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}