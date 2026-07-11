import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-5xl font-extrabold text-red-500">
          EMS Resources
        </h1>

        <p className="mt-4 text-zinc-400">
          EMS calculators, references, assessment tools, and exam preparation.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ResourceCard
            href="/resources/nremt-exam-prep"
            title="NREMT Exam Prep"
            description="EMT and Paramedic exam information and practice questions."
          />

          <ResourceCard
            href="/resources/assessment-algorithms"
            title="Assessment Algorithms"
            description="ABC, XABC, and MARCH assessment references."
          />

          <ResourceCard
            href="/resources/lung-sounds"
            title="Lung Sounds Reference"
            description="Review normal and abnormal lung sounds and what they may indicate."
          />

          <ResourceCard
            href="/resources/gcs"
            title="Glasgow Coma Scale"
            description="Interactive eye, verbal, and motor assessment with automatic scoring."
          />
          <ResourceCard
            href="/resources/drug-calculator"
            title="Drug Calculator"
            description="Weight-based medication dose and volume calculator."
          />

          <ResourceCard
            href="/resources/medications"
            title="Medication Reference"
            description="EMS medication information and protocol notes."
          />

          <ResourceCard
            href="/resources/burn-calculator"
            title="Burn Calculator"
            description="Adult Rule of Nines burn calculator."
          />

          <ResourceCard
            href="/mental-health"
            title="Mental Health Awareness"
            description="Mental health emergencies, crisis intervention, de-escalation techniques, suicide awareness, and responder wellness."
          />

          <ResourceCard
            href="/resources/stroke-scale"
            title="FAST-ED Stroke Scale"
            description="Interactive FAST-ED stroke assessment and scoring tool."
          />
        </div>
      </section>
    </main>
  );
}

function ResourceCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
    >
      <h2 className="text-2xl font-bold text-red-500">
        {title}
      </h2>

      <p className="mt-3 text-zinc-400">
        {description}
      </p>
    </Link>
  );
}