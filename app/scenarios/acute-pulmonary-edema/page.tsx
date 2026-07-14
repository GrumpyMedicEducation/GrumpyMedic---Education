import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-red-500">
            GrumpyMedic Scenarios
          </p>

          <h1 className="mt-2 text-5xl font-extrabold">
            Acute Pulmonary Edema
          </h1>

          <p className="mt-4 max-w-3xl text-zinc-400">
            Work through a realistic EMS scenario involving acute pulmonary
            edema. Assess the patient, interpret findings, perform appropriate
            interventions, and determine transport priorities.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-red-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold text-red-500">
              Interactive Scenario
            </h2>

            <p className="mt-4 text-zinc-300">
              Launch the full interactive EMS call simulator to begin the
              patient encounter.
            </p>

            <Link
              href="/simulator/acute-pulmonary-edema"
              className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
            >
              Start Scenario
            </Link>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">
              Learning Objectives
            </h2>

            <ul className="mt-4 space-y-3 text-zinc-300">
              <li>• Recognize Acute Pulmonary Edema</li>
              <li>• Complete an appropriate patient assessment</li>
              <li>• Interpret vital signs and ECG findings</li>
              <li>• Administer appropriate oxygen therapy</li>
              <li>• Decide when CPAP is indicated</li>
              <li>• Determine Nitroglycerin eligibility</li>
              <li>• Reassess after interventions</li>
              <li>• Determine transport priority</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
            Coming Soon
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Additional EMS Cases
          </h2>

          <p className="mt-4 text-zinc-400">
            Chest pain, stroke, trauma, sepsis, pediatric emergencies, and
            additional interactive simulations are currently under development.
          </p>
        </div>
      </section>
    </main>
  );
}