export default function Home() {
  const courses = [
    "Acute Pulmonary Edema",
    "iGel Airway & Capnography",
    "Sepsis Recognition",
    "TXA Administration",
    "Hyperthermia Emergencies",
    "Trauma Patient Assessment",
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-8 py-5">
        <div className="text-xl font-bold">GrumpyMedic Education</div>sName="rounded-xl bord border-zinc-700 px-7 py-
        <div className="hidden gap-6 text-sm text-zinc-300 md:flex">
          <a href="#">Home</a>
          <a href="/courses">Courses</a <a href="#">Home</a>
<a href="/courses">Courses</a>
<a href="#">Scenarios</a>
<a href="#">Quizzes</a>
<a href="#">Login</a>
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
  <a className="rounded-xl bg-red-600 px-7 py-4 font-bold hover:bg-red-700" href="#">
    Start Learning
  </a>

  <a className="rounded-xl border border-zinc-700 px-7 py-4 font-bold hover:bg-zinc-900" href="/courses">
    Browse Courses
  </a>
</div>      </section>

      <section className="px-8 pb-20">
        <h2 className="mb-8 text-3xl font-bold">Featured Courses</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course, index) => (
            <div key={course} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 hover:border-red-600">
              <div className="mb-4 text-4xl">{["🫁", "🫀", "🦠", "💉", "☀️", "🚑"][index]}</div>
              <span className="rounded-full bg-red-600/20 px-3 py-1 text-xs font-bold text-red-400">
                Intermediate
              </span>
              <h3 className="mt-4 text-xl font-bold">{course}</h3>
              <p className="mt-3 text-zinc-400">
                Learn through practical EMS review, case discussion, and quiz questions.
              </p>
              <button className="mt-6 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-bold hover:bg-red-600">
                Start Course
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-800 px-8 py-10 text-sm text-zinc-400">
        © 2026 GrumpyMedic Education · About · Courses · Privacy · Contact
      </footer>
    </main>
  );
}