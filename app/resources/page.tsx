import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <h1 className="text-5xl font-extrabold text-red-500">Resources</h1>

        <p className="mt-4 text-lg text-zinc-400">
          EMS reference material, calculators, assessment tools, and NREMT
          study resources.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {/* NREMT Exam Prep */}
          <Link
            href="/resources/nremt-exam-prep"
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold text-red-500">
              NREMT Exam Prep
            </h2>

            <p className="mt-3 text-zinc-400">
              EMT and Paramedic exam breakdowns, percentages, and practice
              questions.
            </p>
          </Link>

          {/* Assessment Algorithms */}
          <Link
            href="/resources/assessment-algorithms"
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold text-red-500">
              Assessment Algorithms
            </h2>

            <p className="mt-3 text-zinc-400">
              ABC, XABC, MARCH, stroke assessment and trauma algorithms.
            </p>
          </Link>

          {/* Drug Calculator */}
          <Link
            href="/resources/drug-calculator"
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold text-red-500">
              Drug Calculator
            </h2>

            <p className="mt-3 text-zinc-400">
              Weight-based medication dose and volume calculator using
              Massachusetts EMS protocols.
            </p>
          </Link>

          {/* Medications */}
          <Link
            href="/resources/medications"
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <h2 className="text-2xl font-bold text-red-500">
              Medication Reference
            </h2>

            <p className="mt-3 text-zinc-400">
              Drug indications, contraindications, dosing, routes,
              concentrations, and protocol notes.
            </p>
          </Link>

<Link
  href="/resources/burn-calculator"
  className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
>
<Link
  href="/resources/burn-calculator"
  className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
>
  <h2 className="text-2xl font-bold text-red-500">
    Burn Calculator
  </h2>

  <p className="mt-3 text-zinc-400">
    Estimate adult burn surface area using the Rule of Nines.
  </p>
</Link>
</Link>
          {/* Stroke Scale */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 opacity-80">
            <h2 className="text-2xl font-bold text-red-500">
              Stroke Scale Reference
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