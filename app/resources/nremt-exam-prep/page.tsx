import Navbar from "../../components/Navbar";

export default function NremtExamPrepPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <p className="text-sm font-bold uppercase tracking-widest text-red-500">
          NREMT Exam Prep
        </p>

        <h1 className="mt-3 text-5xl font-extrabold">
          EMT & Paramedic Exam Breakdown
        </h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Use this page to understand the exam structure, timing, and major
          content areas so you can study smarter.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* EMT Exam */}
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-3xl font-bold text-red-500">EMT Exam</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-700 bg-black p-4">
                <p className="text-xs uppercase text-zinc-400">Questions</p>
                <p className="text-2xl font-bold">70–120</p>
              </div>

              <div className="rounded-xl border border-zinc-700 bg-black p-4">
                <p className="text-xs uppercase text-zinc-400">Time Limit</p>
                <p className="text-2xl font-bold">2 Hours</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <ExamArea title="Scene Safety" percent="15–19%" />
              <ExamArea title="Primary Assessment" percent="39–43%" />
              <ExamArea title="Secondary Assessment" percent="5–9%" />
              <ExamArea title="Patient Treatment & Transport" percent="20–24%" />
              <ExamArea title="Operations" percent="10–14%" />
            </div>
          </div>

          {/* Paramedic Exam */}
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-3xl font-bold text-red-500">
              Paramedic Exam
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-700 bg-black p-4">
                <p className="text-xs uppercase text-zinc-400">Questions</p>
                <p className="text-2xl font-bold">110–150</p>
              </div>

              <div className="rounded-xl border border-zinc-700 bg-black p-4">
                <p className="text-xs uppercase text-zinc-400">Time Limit</p>
                <p className="text-2xl font-bold">3 hr 30 min</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <ExamArea title="Airway, Respirations & Ventilations" percent="8–12%" />
              <ExamArea title="Cardiology & Resuscitation" percent="10–14%" />
              <ExamArea title="Trauma" percent="6–10%" />
              <ExamArea title="Medical / OB / Gynecology" percent="24–28%" />
              <ExamArea title="EMS Operations" percent="8–12%" />
              <ExamArea title="Clinical Judgement" percent="34–38%" />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Study Strategy</h2>

          <p className="mt-3 text-zinc-400">
            Spend the most time on the highest percentage areas. For EMT,
            focus heavily on primary assessment and treatment/transport. For
            paramedic, clinical judgement and medical/OB/GYN make up a major
            part of the exam.
          </p>
        </div>
      </section>
    </main>
  );
}

function ExamArea({
  title,
  percent,
}: {
  title: string;
  percent: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-700 bg-black p-4">
      <p className="font-semibold">{title}</p>
      <p className="font-bold text-red-500">{percent}</p>
    </div>
  );
}