import Link from "next/link";
import Navbar from "../components/Navbar";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="p-10">
        <h1 className="mb-8 text-4xl font-bold">Courses</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold">Acute Pulmonary Edema</h2>
            <p className="mt-2 text-gray-400">
              Recognition, assessment, CPAP, respiratory distress, and EMS
              treatment priorities.
            </p>
            <Link
              href="/courses/acute-pulmonary-edema"
              className="mt-4 inline-block rounded bg-red-600 px-4 py-2 hover:bg-red-700"
            >
              Start Course
            </Link>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold">Trauma</h2>
            <p className="mt-2 text-gray-400">
              Shock, bleeding, TXA, chest trauma, burns.
            </p>
            <Link
              href="#"
              className="mt-4 inline-block rounded bg-red-600 px-4 py-2 hover:bg-red-700"
            >
              Coming Soon
            </Link>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-semibold">Airway</h2>
            <p className="mt-2 text-gray-400">
              BLS and ALS airway management, RSI, capnography.
            </p>
            <Link
              href="#"
              className="mt-4 inline-block rounded bg-red-600 px-4 py-2 hover:bg-red-700"
            >
              Coming Soon
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}