import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  const courses = [
    "Acute Pulmonary Edema",
    "iGel Airway & Capnography",
    "Sepsis Recognition",
    "TXA Administration",
    "Trauma Patient Assessment",
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <section className="px-8 py-24 text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-red-500">
          Interactive EMS Education
        </p>

        <h1 className="mx-auto max-w-5xl text-5xl font-extrabold md:text-7xl">
          Real EMS Education.
          <br />
          Real Critical Thinking.
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300">
          Interactive scenarios, CAPCE-ready courses, quizzes, and continuing
          education for EMTs, AEMTs, Paramedics, and Firefighters.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/courses"
            className="rounded-lg bg-red-600 px-7 py-4 font-semibold hover:bg-red-700"
          >
            Browse Courses
          </Link>
        </div>
      </section>

      <section className="px-8 pb-20">
        <h2 className="mb-8 text-3xl font-bold">Featured Courses</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h3 className="text-xl font-semibold">{course}</h3>

              <Link
                href="/courses"
                className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-700"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}