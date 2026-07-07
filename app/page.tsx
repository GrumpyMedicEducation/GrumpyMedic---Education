import Link from "next/link";

export default function Home() {
  const courses = [
    "Acute Pulmonary Edema",
    "iGel Airway & Capnography",
    "Sepsis Recognition",
    "TXA Administration",
    "TXA Administration",
    "Trauma Patient Assessment",
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-8 py-5">
        <div className="text-xl font-bold text-red-500">
          GrumpyMedic Education
        </div>

        <div className="hidden gap-6 text-sm text-zinc-300 md:flex">
          <Link href="/">Home</Link>
          <Link href="/courses">Courses</Link>
          <a href="#">Scenarios</a>
          <a href="#">Quizzes</a>
          <a href="#">Login</a>
        </div>
      </nav>

      <section className="px-8 py-24 text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-red-500">
          Interactive EMS Education
        </p>

        <h1 className="mx-auto max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
          Real EMS Education. Real Critical Thinking.
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-300">
          Interactive scenarios, CAPCE-ready courses, quizzes, and continuing
          education for EMTs, AEMTs, Paramedics, and Firefighters.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            className="rounded-xl bg-red-600 px-7 py-4 font-bold hover:bg-red-700"
            href="/courses"
          >
            Start Learning
          </Link>

          <Link
            className="rounded-xl border border-zinc-700 px-7 py-4 font-bold hover:bg-zinc-900"
            href="/courses"
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