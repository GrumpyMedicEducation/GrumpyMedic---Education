import Link from "next/link";
import Navbar from "../components/Navbar";

export default function QuizzesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <h1 className="text-5xl font-extrabold">EMS Quizzes</h1>

        <p className="mt-3 text-zinc-400">
          Test your EMS knowledge and earn completion certificates.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {/* Acute Pulmonary Edema */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 hover:border-red-600 transition">
            <h2 className="text-2xl font-bold text-red-500">
              Acute Pulmonary Edema
            </h2>

            <p className="mt-3 text-zinc-400">
              Review CPAP, nitroglycerin, assessment findings, respiratory
              distress, and treatment priorities.
            </p>

            <Link
              href="/courses/acute-pulmonary-edema/quiz"
              className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-700"
            >
              Start Quiz →
            </Link>
          </div>

          {/* Hyperthermia */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 hover:border-red-600 transition">
            <h2 className="text-2xl font-bold text-red-500">
              Hyperthermia
            </h2>

            <p className="mt-3 text-zinc-400">
              Test your knowledge of heat cramps, heat exhaustion, heat stroke,
              rapid cooling, and transport decisions.
            </p>

            <Link
              href="/courses/hyperthermia/quiz"
              className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-700"
            >
              Start Quiz →
            </Link>
          </div>

          {/* TXA Administration */}
<div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 hover:border-red-600">
  <h2 className="text-2xl font-bold text-red-500">
    TXA Administration
  </h2>

  <p className="mt-3 text-zinc-300">
    Review TXA indications, Massachusetts 2026.2 adult dosing,
    multisystem trauma, obstetrical hemorrhage, administration safety,
    monitoring, contraindications, and documentation.
  </p>

  <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-400">
    <span className="rounded-full border border-zinc-700 px-3 py-1">
      15 Questions
    </span>

    <span className="rounded-full border border-zinc-700 px-3 py-1">
      Passing Score: 80%
    </span>

    <span className="rounded-full border border-zinc-700 px-3 py-1">
      Trauma
    </span>
  </div>

  <Link
    href="/courses/txa-administration/quiz"
    className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-700"
  >
    Start Quiz →
  </Link>
</div>

          {/* BLS Airway & Capnography */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 hover:border-red-600 transition">
            <h2 className="text-2xl font-bold text-red-500">
              BLS Airway & Capnography
            </h2>

            <p className="mt-3 text-zinc-400">
              Airway positioning, suction, airway adjuncts, iGel,
              supraglottic airways, waveform capnography, ventilation,
              and confirmation of airway placement.
            </p>

            <Link
              href="/courses/bls-airway-capnography/quiz"
              className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-700"
            >
              Start Quiz →
            </Link>
          </div>

          {/* Trauma */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 opacity-70">
            <h2 className="text-2xl font-bold">Trauma</h2>

            <p className="mt-3 text-zinc-400">
              Coming soon.
            </p>
          </div>

          {/* Cardiology */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 opacity-70">
            <h2 className="text-2xl font-bold">Cardiology</h2>

            <p className="mt-3 text-zinc-400">
              Coming soon.
            </p>
          </div>

          {/* Pediatrics */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 opacity-70">
            <h2 className="text-2xl font-bold">Pediatrics</h2>

            <p className="mt-3 text-zinc-400">
              Coming soon.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}