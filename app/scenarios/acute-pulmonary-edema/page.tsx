import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          GrumpyMedic Education
        </p>

        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          EMS Scenarios
        </h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Review EMS patient cases, practice clinical decision-making, and
          compare your assessment and treatment plan with recommended care.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/scenarios/acute-pulmonary-edema"
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-red-500">
              Respiratory Emergency
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Acute Pulmonary Edema
            </h2>

            <p className="mt-3 text-zinc-400">
              Review patient recognition, respiratory support, CPAP,
              nitroglycerin considerations, reassessment, and transport.
            </p>

            <span className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 font-bold transition hover:bg-red-500">
              Open Scenario →
            </span>
          </Link>

          <Link
            href="/simulator/acute-pulmonary-edema"
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-red-500">
              Interactive Training
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Acute Pulmonary Edema Simulator
            </h2>

            <p className="mt-3 text-zinc-400">
              Assess the patient, select treatments, monitor the response, and
              review your clinical decisions.
            </p>

            <span className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 font-bold transition hover:bg-red-500">
              Start Simulator →
            </span>
          </Link>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 opacity-70">
            <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
              Coming Soon
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Chest Pain
            </h2>

            <p className="mt-3 text-zinc-500">
              Acute coronary syndrome, 12-lead interpretation, medication
              decisions, and transport priorities.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 opacity-70">
            <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
              Coming Soon
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Stroke
            </h2>

            <p className="mt-3 text-zinc-500">
              Stroke recognition, FAST-ED assessment, last-known-well, and
              destination decisions.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 opacity-70">
            <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
              Coming Soon
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Trauma
            </h2>

            <p className="mt-3 text-zinc-500">
              Primary trauma assessment, hemorrhage control, shock recognition,
              and rapid transport.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}