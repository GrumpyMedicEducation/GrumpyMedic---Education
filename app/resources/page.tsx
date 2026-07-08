import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <h1 className="text-5xl font-extrabold text-white">
          EMS Resources
        </h1>

        <p className="mt-3 text-zinc-400">
          Quick reference tools and educational resources for EMS providers.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* Medication Reference */}
          <Link
            href="/resources/medications"
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold text-red-500">
              Medication Reference
            </h2>

            <p className="mt-3 text-zinc-400">
              EMS medication indications, contraindications, dosing, and field
              pearls.
            </p>
          </Link>

          {/* NREMT Exam Prep */}
          <Link
            href="/resources/nremt-exam-prep"
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold text-red-500">
              NREMT Exam Prep
            </h2>

            <p className="mt-3 text-zinc-400">
              EMT and Paramedic exam breakdowns, question ranges, time limits,
              and study focus areas.
            </p>
          </Link>

          {/* Massachusetts Protocols */}
          <a
            href="https://www.mass.gov/lists/emergency-medical-services-statewide-treatment-protocols"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold text-red-500">
              Massachusetts EMS Protocols
            </h2>

            <p className="mt-3 text-zinc-400">
              Official Massachusetts Statewide Treatment Protocols.
            </p>
          </a>

          {/* ECG Library */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold text-red-500">
              ECG Library
            </h2>

            <p className="mt-3 text-zinc-400">
              Coming soon.
            </p>
          </div>

          {/* Stroke Scale */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold text-red-500">
              Stroke Scale Reference
            </h2>

            <p className="mt-3 text-zinc-400">
              Coming soon.
            </p>
          </div>

          {/* Drug Calculator */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold text-red-500">
              Drug Calculator
            </h2>

            <p className="mt-3 text-zinc-400">
              Coming soon.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}