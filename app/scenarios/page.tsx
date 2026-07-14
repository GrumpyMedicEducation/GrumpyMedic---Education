import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          GrumpyMedic Education
        </p>

        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          EMS Scenarios
        </h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Review EMS patient cases, practice clinical decision making, and
          compare your assessment and treatment plan with recommended care.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <ScenarioCard
            title="Acute Pulmonary Edema"
            description="Respiratory distress, CPAP, nitroglycerin, reassessment, and transport."
            href="/scenarios/acute-pulmonary-edema"
            available
          />

          <ScenarioCard
            title="Chest Pain"
            description="STEMI recognition, aspirin, nitroglycerin, and transport decisions."
          />

          <ScenarioCard
            title="Stroke"
            description="FAST-ED assessment, LVO recognition, destination decisions."
          />

          <ScenarioCard
            title="Trauma"
            description="Primary survey, hemorrhage control, shock recognition, and rapid transport."
          />

        </div>
      </section>
    </main>
  );
}

function ScenarioCard({
  title,
  description,
  href,
  available = false,
}: {
  title: string;
  description: string;
  href?: string;
  available?: boolean;
}) {
  if (available && href) {
    return (
      <Link
        href={href}
        className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
      >
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        <p className="mt-3 text-zinc-400">{description}</p>

        <div className="mt-6 inline-flex rounded-lg bg-red-600 px-4 py-2 font-bold">
          Start Scenario →
        </div>
      </Link>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 opacity-80">
      <h2 className="text-2xl font-bold">{title}</h2>

      <p className="mt-3 text-zinc-400">{description}</p>

      <div className="mt-6 inline-flex rounded-lg border border-zinc-700 px-4 py-2 text-zinc-400">
        Coming Soon
      </div>
    </div>
  );
}