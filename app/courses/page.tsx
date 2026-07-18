import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

type CourseCardProps = {
  title: string;
  description: string;
  certification: string;
  duration: string;
  href?: string;
  available?: boolean;
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            EMS Courses
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
            Practical EMS education focused on assessment, treatment,
            protocols, clinical reasoning, and real-world patient care.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <CourseCategory
          title="Medical Emergencies"
          description="Assessment and treatment of common medical emergencies."
        >
          <CourseCard
            title="Acute Pulmonary Edema"
            description="Assessment, CPAP, nitrates, respiratory support, and clinical decision-making."
            certification="EMT and Paramedic"
            duration="30–45 minutes"
            href="/courses/acute-pulmonary-edema"
            available
          />

          <CourseCard
            title="Glucagon for Hypoglycemia"
            description="Recognition and treatment of hypoglycemia, glucagon administration, reassessment, and EMT-Basic skills."
            certification="EMT-Basic"
            duration="30–45 minutes"
            href="/courses/glucagon-hypoglycemia"
            available
          />

          <CourseCard
            title="Sepsis Recognition"
            description="Recognition of sepsis, shock assessment, treatment priorities, and hospital notification."
            certification="EMT and Paramedic"
            duration="Coming soon"
          />

          <CourseCard
            title="Stroke Assessment"
            description="Stroke recognition, FAST-ED assessment, last-known-well time, transport, and stroke-center notification."
            certification="EMT and Paramedic"
            duration="Coming soon"
          />
        </CourseCategory>

        <CourseCategory
          title="Environmental Emergencies"
          description="Recognition and treatment of illness caused by heat, cold, and environmental exposure."
        >
          <CourseCard
            title="Hyperthermia"
            description="Recognition of heat cramps, heat exhaustion, and heat stroke, including rapid cooling, fluid considerations, transport, and reassessment."
            certification="EMT and Paramedic"
            duration="30–45 minutes"
            href="/courses/hyperthermia"
            available
          />

          <CourseCard
            title="Hypothermia"
            description="Cold exposure, rewarming, cardiac considerations, frostbite, and transport priorities."
            certification="EMT and Paramedic"
            duration="Coming soon"
          />
        </CourseCategory>

        <CourseCategory
          title="Trauma"
          description="Trauma assessment, hemorrhage control, medication administration, and transport decisions."
        >
          <CourseCard
            title="TXA Administration"
            description="Recognition of significant hemorrhage, Massachusetts 2026.2 dosing, adult multisystem trauma, obstetrical emergencies, medication safety, monitoring, and documentation."
            certification="Paramedic"
            duration="35–45 minutes"
            href="/courses/txa-administration"
            available
          />

          <CourseCard
            title="Trauma Assessment"
            description="Primary assessment, life threats, rapid trauma examination, shock recognition, and transport priorities."
            certification="EMT and Paramedic"
            duration="Coming soon"
          />

          <CourseCard
            title="Hemorrhage Control"
            description="Direct pressure, tourniquets, wound packing, junctional bleeding, shock management, and reassessment."
            certification="EMT and Paramedic"
            duration="Coming soon"
          />

          <CourseCard
            title="Prehospital Burn Management"
            description="Burn-depth assessment, total body surface area, airway concerns, fluid considerations, pain management, and transport."
            certification="EMT and Paramedic"
            duration="Coming soon"
          />
        </CourseCategory>

        <CourseCategory
          title="Airway and Breathing"
          description="BLS and ALS airway management, ventilation, oxygenation, and respiratory emergencies."
        >
          <CourseCard
            title="BLS Airway & Capnography"
            description="EMT-level training covering supraglottic airway use, iGel sizing and insertion, waveform capnography, ventilation, and airway troubleshooting."
            certification="EMT"
            duration="45–60 minutes"
            href="/courses/bls-airway-capnography"
            available
          />

          <CourseCard
            title="Advanced Airway Management"
            description="Advanced airway preparation, placement confirmation, ventilation management, and post-intubation monitoring."
            certification="Paramedic"
            duration="Coming soon"
          />

          <CourseCard
            title="Respiratory Emergencies"
            description="Assessment and management of asthma, COPD, respiratory failure, and respiratory arrest."
            certification="EMT and Paramedic"
            duration="Coming soon"
          />

          <CourseCard
            title="Mechanical Ventilation"
            description="Ventilator fundamentals, waveform interpretation, troubleshooting, and transport considerations."
            certification="Paramedic"
            duration="Coming soon"
          />
        </CourseCategory>

        <CourseCategory
          title="Cardiology"
          description="Cardiac assessment, rhythm interpretation, and emergency treatment."
        >
          <CourseCard
            title="12-Lead ECG Fundamentals"
            description="Lead placement, systematic interpretation, ischemia, injury, infarction, and clinical correlation."
            certification="Paramedic"
            duration="Coming soon"
          />

          <CourseCard
            title="Cardioversion"
            description="Recognition and treatment of unstable tachydysrhythmias."
            certification="Paramedic"
            duration="Coming soon"
          />

          <CourseCard
            title="Bradycardia"
            description="Patient assessment, symptomatic bradycardia, pacing, medication administration, and reassessment."
            certification="Paramedic"
            duration="Coming soon"
          />

          <CourseCard
            title="Cardiac Arrest Management"
            description="High-quality CPR, defibrillation, airway management, medications, team roles, and post-ROSC care."
            certification="EMT and Paramedic"
            duration="Coming soon"
          />
        </CourseCategory>

        <CourseCategory
          title="Behavioral Health"
          description="Mental-health emergencies, crisis assessment, de-escalation, and responder wellness."
        >
          <CourseCard
            title="Mental Health Awareness"
            description="Behavioral emergencies, suicide awareness, crisis intervention, communication, and first-responder wellness."
            certification="All EMS Providers"
            duration="20–30 minutes"
            href="/mental-health"
            available
          />

          <CourseCard
            title="Verbal De-escalation"
            description="Communication techniques for patients experiencing agitation, anxiety, psychosis, or crisis."
            certification="All EMS Providers"
            duration="Coming soon"
          />
        </CourseCategory>

        <CourseCategory
          title="Pediatrics"
          description="Assessment and management of pediatric medical and trauma emergencies."
        >
          <CourseCard
            title="Pediatric Assessment"
            description="Pediatric Assessment Triangle, age-based vital signs, developmental considerations, and caregiver communication."
            certification="EMT and Paramedic"
            duration="Coming soon"
          />

          <CourseCard
            title="Pediatric Airway"
            description="Airway differences, oxygenation, ventilation, adjunct selection, and respiratory-failure recognition."
            certification="EMT and Paramedic"
            duration="Coming soon"
          />
        </CourseCategory>

        <section className="rounded-2xl border border-red-700 bg-gradient-to-br from-red-950/30 to-zinc-900 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Continue Learning
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Practice Your Clinical Decision-Making
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-zinc-300">
            Apply course concepts through interactive EMS scenarios, quizzes,
            clinical references, and the call simulator.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/scenarios"
              className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
            >
              View Scenarios
            </Link>

            <Link
              href="/quizzes"
              className="rounded-xl border border-red-600 px-7 py-4 font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              Browse Quizzes
            </Link>

            <Link
              href="/simulator"
              className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Call Simulator
            </Link>
          </div>
        </section>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-500">
          GrumpyMedic Education courses are provided for education and review.
          Always follow current statewide protocols, local service policies,
          manufacturer instructions, medical-control direction, and your
          authorized scope of practice.
        </div>
      </section>
    </main>
  );
}

function CourseCategory({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-14">
      <div className="mb-7">
        <h2 className="text-3xl font-extrabold text-red-500">
          {title}
        </h2>

        <p className="mt-2 leading-7 text-zinc-300">
          {description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

function CourseCard({
  title,
  description,
  certification,
  duration,
  href = "#",
  available = false,
}: CourseCardProps) {
  const cardContent = (
    <article
      className={`flex h-full flex-col rounded-2xl border p-7 transition ${
        available
          ? "border-zinc-600 bg-zinc-900 hover:-translate-y-1 hover:border-red-500 hover:bg-zinc-800"
          : "border-zinc-700 bg-zinc-900/70 opacity-75"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full border border-zinc-500 bg-zinc-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-200">
          {certification}
        </span>

        <span
          className={`text-sm font-semibold ${
            available ? "text-red-400" : "text-zinc-400"
          }`}
        >
          {duration}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-extrabold text-red-500">
        {title}
      </h3>

      <p className="mt-4 flex-1 leading-7 text-zinc-300">
        {description}
      </p>

      <div className="mt-6">
        {available ? (
          <span className="inline-flex rounded-lg bg-red-600 px-5 py-3 font-bold text-white transition group-hover:bg-red-500">
            Start Course →
          </span>
        ) : (
          <span className="inline-flex rounded-lg bg-zinc-800 px-5 py-3 font-bold text-zinc-500">
            Coming Soon
          </span>
        )}
      </div>
    </article>
  );

  if (!available || href === "#") {
    return cardContent;
  }

  return (
    <Link
      href={href}
      className="group block h-full"
    >
      {cardContent}
    </Link>
  );
}