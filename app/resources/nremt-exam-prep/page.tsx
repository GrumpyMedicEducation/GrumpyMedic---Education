import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function NremtExamPrepPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <Link href="/resources" className="text-sm font-semibold text-red-500">
          ← Back to Resources
        </Link>

        <h1 className="mt-8 text-5xl font-extrabold">NREMT Exam Prep</h1>

        <p className="mt-3 text-zinc-400">
          EMT and Paramedic exam breakdowns, time limits, study focus areas,
          and practice questions.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <ExamCard
            title="EMT Exam"
            questions="70–120 questions"
            time="2 hour time limit"
            areas={[
              ["Scene Safety", "15–19%"],
              ["Primary Assessment", "39–43%"],
              ["Secondary Assessment", "5–9%"],
              ["Patient Treatment & Transport", "20–24%"],
              ["Operations", "10–14%"],
            ]}
          />

          <ExamCard
            title="Paramedic Exam"
            questions="110–150 questions"
            time="3 hr 30 min time limit"
            areas={[
              ["Airway, Respirations & Ventilations", "8–12%"],
              ["Cardiology & Resuscitation", "10–14%"],
              ["Trauma", "6–10%"],
              ["Medical / OB / Gynecology", "24–28%"],
              ["EMS Operations", "8–12%"],
              ["Clinical Judgement", "34–38%"],
            ]}
          />
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="text-3xl font-bold text-red-500">
            NREMT Practice Questions
          </h2>

          <p className="mt-3 text-zinc-400">
            Practice-style questions to help prepare for EMT and Paramedic exams.
          </p>

          <div className="mt-8 grid gap-8">
            <img
              src="/images/nremt-question-1.png"
              alt="NREMT Practice Question 1"
              className="w-full rounded-xl border border-zinc-700"
            />

            <img
              src="/images/nremt-question-2.png"
              alt="NREMT Practice Question 2"
              className="w-full rounded-xl border border-zinc-700"
            />

            <img
              src="/images/nremt-question-3.png"
              alt="NREMT Practice Question 3"
              className="w-full rounded-xl border border-zinc-700"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ExamCard({
  title,
  questions,
  time,
  areas,
}: {
  title: string;
  questions: string;
  time: string;
  areas: string[][];
}) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
      <h2 className="text-3xl font-bold text-red-500">{title}</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-700 bg-black p-4">
          <p className="text-xs uppercase text-zinc-400">Questions</p>
          <p className="text-2xl font-bold">{questions}</p>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-black p-4">
          <p className="text-xs uppercase text-zinc-400">Time Limit</p>
          <p className="text-2xl font-bold">{time}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {areas.map(([name, percent]) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-xl border border-zinc-700 bg-black p-4"
          >
            <p className="font-semibold">{name}</p>
            <p className="font-bold text-red-500">{percent}</p>
          </div>
        ))}
      </div>
    </div>
  );
}