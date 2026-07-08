import Link from "next/link";
import Navbar from "../components/Navbar";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-8 py-10">

        <h1 className="text-5xl font-extrabold">
          EMS Courses
        </h1>

        <p className="mt-3 text-zinc-400">
          Interactive EMS education with lessons, scenarios, quizzes, and certificates.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {/* Acute Pulmonary Edema */}

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">

            <h2 className="text-2xl font-bold">
              Acute Pulmonary Edema
            </h2>

            <p className="mt-3 text-zinc-400">
              Recognition, assessment, CPAP/BiPAP, IV/IO Nitroglycerin,
              respiratory distress, and EMS treatment priorities.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <Link
                href="/courses/acute-pulmonary-edema"
                className="rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-700"
              >
                Start Course
              </Link>

              <Link
                href="/scenarios/acute-pulmonary-edema"
                className="rounded-lg border border-red-600 px-5 py-2 font-semibold hover:bg-red-600"
              >
                Launch Scenario
              </Link>

              <Link
                href="/courses/acute-pulmonary-edema/quiz"
                className="rounded-lg border border-zinc-700 px-5 py-2 font-semibold hover:bg-zinc-800"
              >
                Quiz
              </Link>

            </div>

          </div>

          {/* Trauma */}

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">

            <h2 className="text-2xl font-bold">
              Trauma
            </h2>

            <p className="mt-3 text-zinc-400">
              Shock, bleeding, TXA, chest trauma, burns and hemorrhage control.
            </p>

            <button className="mt-6 rounded-lg bg-red-600 px-5 py-2 font-semibold opacity-70">
              Coming Soon
            </button>

          </div>

          {/* Airway */}

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">

            <h2 className="text-2xl font-bold">
              Airway
            </h2>

            <p className="mt-3 text-zinc-400">
              BLS and ALS airway management, iGel, RSI,
              capnography, ventilations and difficult airways.
            </p>

            <button className="mt-6 rounded-lg bg-red-600 px-5 py-2 font-semibold opacity-70">
              Coming Soon
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}