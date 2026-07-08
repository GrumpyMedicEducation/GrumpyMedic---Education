import Link from "next/link";
import Navbar from "./components/Navbar";

const courses = [
  "Acute Pulmonary Edema",
  "iGel Airway & Capnography",
  "Sepsis Recognition",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-8 py-16 text-center">
        <div className="flex justify-center mb-8">
          <img
            src="/grumpy-medic-logo.jpeg"
            alt="GrumpyMedic Logo"
            className="w-64 h-64 object-contain"
          />
        </div>

        <p className="text-red-500 uppercase tracking-widest font-semibold">
          Interactive EMS Education
        </p>

        <h1 className="mt-4 text-6xl font-extrabold">
          Real EMS Education.
          <br />
          Real Critical Thinking.
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-zinc-400 text-lg">
          Interactive scenarios, EMS courses, quizzes, certificates,
          and continuing education for EMTs, AEMTs, Paramedics,
          and Firefighters.
        </p>

        <Link
          href="/courses"
          className="mt-10 inline-block rounded-lg bg-red-600 px-8 py-4 font-semibold hover:bg-red-700 transition"
        >
          Browse Courses
        </Link>
      </section>

      {/* Featured Courses */}
      <section className="mx-auto max-w-7xl px-8 pb-20">
        <h2 className="mb-8 text-3xl font-bold">Featured Courses</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course}
              className="rounded-xl border border-zinc-700 bg-zinc-900 p-6"
            >
              <h3 className="text-xl font-semibold">{course}</h3>

              <p className="mt-3 text-zinc-400">
                Interactive lesson, quiz, scenario, and certificate.
              </p>

              <Link
                href="/courses"
                className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-700 transition"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why GrumpyMedic */}
      <section className="bg-zinc-900 py-20">
        <div className="mx-auto max-w-6xl px-8">
          <h2 className="mb-10 text-center text-3xl font-bold">
            Why GrumpyMedic Education?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-700 p-6">
              <h3 className="text-xl font-semibold text-red-500">
                Interactive Scenarios
              </h3>
              <p className="mt-3 text-zinc-400">
                Make treatment decisions and receive immediate feedback,
                just like a real EMS call.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-700 p-6">
              <h3 className="text-xl font-semibold text-red-500">
                Real Protocols
              </h3>
              <p className="mt-3 text-zinc-400">
                Learn using current EMS practices and reference official
                Massachusetts OEMS protocols.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-700 p-6">
              <h3 className="text-xl font-semibold text-red-500">
                Earn Certificates
              </h3>
              <p className="mt-3 text-zinc-400">
                Complete courses, pass quizzes, and print personalized
                completion certificates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}