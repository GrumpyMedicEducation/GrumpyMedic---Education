import Link from "next/link";
import Navbar from "../components/Navbar";

export default function SimulatorHomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-widest text-red-500">
          GrumpyMedic Education
        </p>

        <h1 className="mt-3 text-5xl font-extrabold">
          EMS Call Simulator
        </h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Practice real EMS calls in an interactive environment. Assess your
          patient, interpret findings, select treatments, and watch the
          patient's condition change in real time.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/simulator/acute-pulmonary-edema"
            className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500"
          >
            <h2 className="text-2xl font-bold text-red-500">
              Acute Pulmonary Edema
            </h2>

            <p className="mt-3 text-zinc-400">
              Manage a patient in severe respiratory distress using oxygen,
              CPAP, nitroglycerin, reassessment, and transport decisions.
            </p>

            <div className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 font-bold">
              Start Scenario →
            </div>
          </Link>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 opacity-70">
            <h2 className="text-2xl font-bold">
              Chest Pain
            </h2>

            <p className="mt-3 text-zinc-500">
              Coming Soon
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 opacity-70">
            <h2 className="text-2xl font-bold">
              Stroke
            </h2>

            <p className="mt-3 text-zinc-500">
              Coming Soon
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}