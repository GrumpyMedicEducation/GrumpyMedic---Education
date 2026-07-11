import Link from "next/link";
import Navbar from "../components/Navbar";

type CourseCardProps = {
  href: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  available?: boolean;
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            EMS Courses
          </h1>

          <p className="mt-4 text-lg leading-8 text-zinc-400">
            Interactive EMS education covering medical emergencies, trauma,
            airway management, medications, assessment, and critical thinking.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {/* Medical Emergencies */}
          <CourseSection
            title="Medical Emergencies"
            description="Assessment and treatment of common medical emergencies."
          >
            <CourseCard
              href="/courses/acute-pulmonary-edema"
              title="Acute Pulmonary Edema"
              description="Assessment, CPAP, nitrates, respiratory support, and clinical decision-making."
              level="EMT and Paramedic"
              duration="30–45 minutes"
            />

            <CourseCard
              href="/courses/glucagon-hypoglycemia"
              title="Glucagon for Hypoglycemia"
              description="Recognition and treatment of hypoglycemia, glucagon administration, reassessment, and EMT-Basic skills."
              level="EMT-Basic"
              duration="30–45 minutes"
            />
          </CourseSection>

          {/* Trauma */}
          <CourseSection
            title="Trauma"
            description="Trauma assessment, hemorrhage control, and transport decisions."
          >
            <CourseCard
              href="#"
              title="Trauma Assessment"
              description="Primary assessment, life threats, rapid trauma exam, and transport priorities."
              level="EMT and Paramedic"
              duration="Coming soon"
              available={false}
            />

            <CourseCard
              href="#"
              title="Hemorrhage Control and TXA"
              description="Tourniquets, wound packing, shock recognition, and TXA considerations."
              level="EMT and Paramedic"
              duration="Coming soon"
              available={false}
            />
          </CourseSection>

          {/* Airway */}
          <CourseSection
            title="Airway and Breathing"
            description="BLS and ALS airway management, ventilation, oxygenation, and respiratory emergencies."
          >
            <CourseCard
              href="#"
              title="BLS Airway Management"
              description="Airway positioning, suction, airway adjuncts, ventilation, and supraglottic airways."
              level="EMT"
              duration="Coming soon"
              available={false}
            />

            <CourseCard
              href="#"
              title="Capnography"
              description="Waveform interpretation, ventilation monitoring, and clinical applications."
              level="EMT and Paramedic"
              duration="Coming soon"
              available={false}
            />
          </CourseSection>

          {/* Cardiology */}
          <CourseSection
            title="Cardiology"
            description="Cardiac assessment, rhythm interpretation, and emergency treatment."
          >
            <CourseCard
              href="#"
              title="12-Lead ECG Fundamentals"
              description="Lead placement, systematic interpretation, ischemia, injury, and infarction."
              level="Paramedic"
              duration="Coming soon"
              available={false}
            />

            <CourseCard
              href="#"
              title="Cardioversion"
              description="Recognition and treatment of unstable tachyarrhythmias."
              level="Paramedic"
              duration="Coming soon"
              available={false}
            />
          </CourseSection>

          {/* Behavioral Health */}
          <CourseSection
            title="Behavioral Health"
            description="Mental-health emergencies, crisis assessment, de-escalation, and responder wellness."
          >
            <CourseCard
              href="/mental-health"
              title="Mental Health Awareness"
              description="Behavioral emergencies, suicide awareness, crisis intervention, and first-responder wellness."
              level="All EMS Providers"
              duration="20–30 minutes"
            />

            <CourseCard
              href="#"
              title="Verbal De-escalation"
              description="Communication techniques for patients experiencing agitation, anxiety, psychosis, or crisis."
              level="All EMS Providers"
              duration="Coming soon"
              available={false}
            />
          </CourseSection>
        </div>
      </section>
    </main>
  );
}

function CourseSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        <h2 className="text-3xl font-extrabold text-red-500">{title}</h2>

        <p className="mt-2 text-zinc-400">{description}</p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">{children}</div>
    </section>
  );
}

function CourseCard({
  href,
  title,
  description,
  level,
  duration,
  available = true,
}: CourseCardProps) {
  const cardContent = (
    <article
      className={`h-full rounded-2xl border p-6 transition ${
        available
          ? "border-zinc-700 bg-zinc-900 hover:border-red-500 hover:bg-zinc-800"
          : "border-zinc-800 bg-zinc-900/70 opacity-75"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full border border-zinc-700 bg-black px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-300">
          {level}
        </span>

        <span
          className={`text-sm font-semibold ${
            available ? "text-red-400" : "text-zinc-500"
          }`}
        >
          {duration}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-bold text-red-500">{title}</h3>

      <p className="mt-3 leading-7 text-zinc-300">{description}</p>

      <div className="mt-6">
        {available ? (
          <span className="inline-flex rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-500">
            Start Course →
          </span>
        ) : (
          <span className="inline-flex rounded-lg bg-zinc-800 px-4 py-2 font-semibold text-zinc-500">
            Coming Soon
          </span>
        )}
      </div>
    </article>
  );

  if (!available) {
    return cardContent;
  }

  return (
    <Link href={href} className="block h-full">
      {cardContent}
    </Link>
  );
}