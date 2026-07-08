import Link from "next/link";
import Navbar from "../components/Navbar";

export default function QuizzesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <h1 className="text-5xl font-extrabold">EMS Quizzes</h1>

        <p className="mt-3 text-zinc-400">
          Test your EMS knowledge and earn completion credit.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Acute Pulmonary Edema</h2>

            <p className="mt-3 text-zinc-400">
              Review CPAP, nitroglycerin, assessment findings, and treatment
              priorities.
            </p>

            <Link
              href="/courses/acute-pulmonary-edema/quiz"
              className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-700"
            >
              Start Quiz
            </Link>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 opacity-70">
            <h2 className="text-2xl font-bold">Trauma</h2>
            <p className="mt-3 text-zinc-400">Coming soon.</p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 opacity-70">
            <h2 className="text-2xl font-bold">Airway</h2>
            <p className="mt-3 text-zinc-400">Coming soon.</p>
          </div>
        </div>
      </section>
    </main>
  );
}