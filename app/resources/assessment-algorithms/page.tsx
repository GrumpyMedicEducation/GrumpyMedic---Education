import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function AssessmentAlgorithmsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <Link
          href="/resources"
          className="text-sm font-semibold text-red-500 hover:text-red-400"
        >
          ← Back to Resources
        </Link>

        <h1 className="mt-8 text-5xl font-extrabold">
          XABC, ABC & MARCH
        </h1>

        <p className="mt-3 text-zinc-400">
          Quick-reference trauma and patient assessment priorities for EMS providers.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <AlgorithmCard
            title="XABC"
            subtitle="Life-threatening bleeding first"
            items={[
              "X — Exsanguinating hemorrhage",
              "A — Airway",
              "B — Breathing",
              "C — Circulation",
            ]}
          />

          <AlgorithmCard
            title="ABC"
            subtitle="Traditional patient assessment"
            items={[
              "A — Airway",
              "B — Breathing",
              "C — Circulation",
            ]}
          />

          <AlgorithmCard
            title="MARCH"
            subtitle="Tactical / trauma priority sequence"
            items={[
              "M — Massive hemorrhage",
              "A — Airway",
              "R — Respirations",
              "C — Circulation",
              "H — Hypothermia / Head injury",
            ]}
          />
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold text-red-500">
            Field Reminder
          </h2>

          <p className="mt-3 text-zinc-300">
            In major trauma, uncontrolled life-threatening bleeding can kill before
            airway or breathing problems are corrected. That is why many modern EMS
            and trauma systems teach XABC or MARCH instead of simple ABCs alone.
          </p>
        </div>
      </section>
    </main>
  );
}

function AlgorithmCard({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
      <h2 className="text-4xl font-extrabold text-red-500">{title}</h2>

      <p className="mt-2 text-zinc-400">{subtitle}</p>

      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-zinc-700 bg-black p-3 text-zinc-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}