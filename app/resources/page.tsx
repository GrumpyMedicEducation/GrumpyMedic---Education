import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <h1 className="text-5xl font-extrabold">EMS Resources</h1>

        <p className="mt-3 text-zinc-400">
          Quick reference tools and official EMS resources.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {/* Massachusetts OEMS Protocols */}
          <a
            href="https://www.mass.gov/lists/emergency-medical-services-statewide-treatment-protocols"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold text-red-500">
              Massachusetts OEMS Protocols
            </h2>

            <p className="mt-3 text-zinc-400">
              Official Massachusetts statewide EMS treatment protocols.
            </p>
          </a>

          {/* Medication Reference */}
          <Link
            href="/resources/medications"
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold">
              Medication Reference
            </h2>

            <p className="mt-3 text-zinc-400">
              EMS medications, indications, contraindications, dosing, and field pearls.
            </p>
          </Link>

          {/* ECG Library */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">
              ECG Library
            </h2>

            <p className="mt-3 text-zinc-400">
              Coming soon.
            </p>
          </div>

          {/* GCS Calculator */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">
              GCS Calculator
            </h2>

            <p className="mt-3 text-zinc-400">
              Coming soon.
            </p>
          </div>

          {/* Burn Calculator */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">
              Burn Calculator
            </h2>

            <p className="mt-3 text-zinc-400">
              Coming soon.
            </p>
          </div>

          {/* Stroke Scale */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">
              Stroke Scale
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