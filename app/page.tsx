import Link from "next/link";

const courses = [
  "Acute Pulmonary Edema",
  "iGel Airway & Capnography",
  "Sepsis Recognition",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">

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

        <p className="mt-6 max-w-3xl mx-auto text-zinc-300 text-lg">
          Interactive scenarios, EMS courses, quizzes and continuing
          education for EMTs, AEMTs, Paramedics and Firefighters.
        </p>

        <Link
          href="/courses"
          className="mt-8 inline-block rounded-lg bg-red-600 px-8 py-3 font-semibold hover:bg-red-700"
        >
          Browse Courses
        </Link>
      </section>

      {/* Featured Courses */}

      <section className="px-8 pb-20">

        <h2 className="mb-8 text-3xl font-bold">
          Featured Courses
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          {courses.map((course) => (

            <div
              key={course}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >

              <h3 className="text-xl font-semibold">
                {course}
              </h3>

              <Link
                href={
                  course === "Acute Pulmonary Edema"
                    ? "/courses/acute-pulmonary-edema"
                    : "/courses"
                }
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