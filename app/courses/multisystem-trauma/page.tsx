import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import CourseEngagementTracker from "../CourseEngagementTracker";

const objectives = [
  "Recognize immediate life threats in adult and pediatric multisystem trauma.",
  "Apply XABC priorities and control catastrophic hemorrhage.",
  "Use tourniquets, wound packing, and pelvic stabilization appropriately.",
  "Apply provider-level standing orders from Massachusetts Protocol 4.5.",
  "Recognize age-specific TXA indications, dosing, contraindications, and cautions.",
  "Prioritize transport, reassessment, trauma notification, and documentation.",
];

const hemorrhage = [
  "Control or stop identified life-threatening hemorrhage.",
  "Use tourniquets for life-threatening extremity bleeding.",
  "Apply direct pressure when appropriate.",
  "Pack suitable wounds with gauze or a hemostatic dressing.",
  "Stabilize suspected pelvic fractures with a commercial device when available or a bed sheet.",
  "Reassess all hemorrhage-control interventions after movement and during transport.",
];

const adultTxa = [
  "Patient is older than 5 years.",
  "SBP is below 90 mm Hg, or heart rate is above 110 beats/minute.",
  "The provider determines the patient is at high risk for significant hemorrhage.",
  "Administer TXA 2 grams IV push when available and authorized.",
];

const pediatricTxa = [
  "Patient is younger than 5 years.",
  "Administer TXA 15 mg/kg.",
  "Maximum dose is 1 gram.",
  "Administer slow IV push over 10 minutes.",
  "Mix 1 gram of TXA in 100 mL of normal saline.",
];

export default function MultisystemTraumaCoursePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <CourseEngagementTracker
        courseSlug="multisystem-trauma"
        courseTitle="Multisystem Trauma"
        requiredMinutes={45}
      />
        <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/40 to-black">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Link href="/courses" className="font-semibold text-red-500 hover:text-red-400">
              ← Back to Courses
            </Link>
            <p className="mt-10 text-sm font-extrabold uppercase tracking-[0.22em] text-red-500">
              Massachusetts EMS Trauma Course
            </p>
            <h1 className="mt-4 max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
              Multisystem Trauma
            </h1>
            <p className="mt-5 max-w-4xl text-xl leading-8 text-zinc-300">
              Adult and pediatric trauma assessment, catastrophic hemorrhage control,
              pelvic stabilization, vascular access, airway considerations, TXA,
              transport, reassessment, and documentation.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat label="Protocol" value="Massachusetts 4.5" />
              <Stat label="Version" value="2026.2" />
              <Stat label="Assessment" value="25 Questions • 80%" />
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#course-content" className="rounded-xl bg-red-600 px-7 py-4 font-bold hover:bg-red-500">
                Start Course
              </a>
              <Link href="/courses/multisystem-trauma/quiz" className="rounded-xl border border-zinc-600 px-7 py-4 font-bold hover:border-red-500 hover:text-red-400">
                Take the Quiz
              </Link>
            </div>
          </div>
        </section>

        <section id="course-content" className="mx-auto max-w-6xl px-6 py-14">
          <CourseSection number="01" title="Learning Objectives" description="By the end of this course, the learner should be able to:">
            <div className="grid gap-4 md:grid-cols-2">
              {objectives.map((item) => <Tile key={item}>{item}</Tile>)}
            </div>
          </CourseSection>

          <CourseSection number="02" title="GrumpyMedic Protocol Reference" description="Review the supplied Massachusetts Protocol 4.5 reference.">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-3">
              <Image
                src="/images/multisystem-trauma-protocol.png"
                alt="GrumpyMedic multisystem trauma protocol reference"
                width={1024}
                height={1536}
                priority
                className="h-auto w-full rounded-xl"
              />
            </div>
            <Alert title="Protocol Reminder">
              Verify current Massachusetts protocols, addenda, service policy, Medical Control requirements, and scope before clinical use.
            </Alert>
          </CourseSection>

          <CourseSection number="03" title="XABC and Immediate Life Threats" description="Treat exsanguinating hemorrhage before the traditional ABC sequence.">
            <div className="grid gap-6 md:grid-cols-2">
              <ChecklistCard title="X — Catastrophic Hemorrhage" items={[
                "Expose and identify the bleeding source.",
                "Use the fastest effective hemorrhage-control method.",
                "Stabilize a suspected pelvic fracture.",
                "Reassess after every move.",
              ]} />
              <ChecklistCard title="ABC — Airway, Breathing, Circulation" items={[
                "Open and maintain the airway.",
                "Support oxygenation and ventilation.",
                "Identify chest injury and respiratory failure.",
                "Evaluate perfusion and begin rapid transport.",
              ]} />
            </div>
          </CourseSection>

          <CourseSection number="04" title="Hemorrhage Control" description="Control life-threatening bleeding immediately.">
            <Checklist items={hemorrhage} />
            <Alert title="Do Not Delay">
              Vascular access, splinting, or documentation must not delay control of catastrophic hemorrhage.
            </Alert>
          </CourseSection>

          <CourseSection number="05" title="Pelvic Stabilization" description="A pelvic fracture may conceal major internal hemorrhage.">
            <div className="grid gap-6 md:grid-cols-2">
              <InfoCard title="When to Suspect">
                <ul className="space-y-3">
                  <li>• High-energy blunt mechanism</li>
                  <li>• Pelvic pain or instability</li>
                  <li>• Pelvic bruising</li>
                  <li>• Unexplained shock</li>
                </ul>
              </InfoCard>
              <InfoCard title="How to Stabilize">
                <p>Use a commercial pelvic stabilization device when available and appropriate. A bed sheet may be used if necessary.</p>
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection number="06" title="Advanced EMT and Medical Control" description="Establish access while transport is underway.">
            <InfoCard title="Advanced EMT Standing Orders">
              <p>Initiate one or two large-bore IVs with normal saline at KVO while en route to the hospital.</p>
            </InfoCard>
            <Alert title="Medical Control May Order">
              Additional fluid boluses. Reassess perfusion, respiratory status, and signs of continued hemorrhage.
            </Alert>
          </CourseSection>

          <CourseSection number="07" title="Airway Management" description="Balance airway intervention against oxygenation, ventilation, and transport time.">
            <div className="grid gap-6 md:grid-cols-2">
              <InfoCard title="Difficult Airway">
                <p>Patients requiring emergent intubation who cannot be intubated conventionally should be managed under Protocol 5.2 Difficult Airway.</p>
              </InfoCard>
              <InfoCard title="Patients Under 12">
                <p>The airway is usually best managed with BVM or SGA. Intubation may be preferred in selected cases at the treating paramedic’s discretion.</p>
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection number="08" title="TXA: Patients Older Than 5" description="Use the adult-style pathway in the supplied protocol.">
            <Checklist items={adultTxa} />
          </CourseSection>

          <CourseSection number="09" title="TXA: Patients Younger Than 5" description="Use weight-based dosing and slower administration.">
            <Checklist items={pediatricTxa} />
            <div className="mt-6 rounded-2xl border border-red-700 bg-red-950/20 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">Dose Example</p>
              <p className="mt-3 text-2xl font-extrabold">20 kg × 15 mg/kg = 300 mg TXA</p>
            </div>
          </CourseSection>

          <CourseSection number="10" title="TXA Contraindications and Cautions" description="Timing, allergy, rate, and dose matter.">
            <div className="grid gap-6 md:grid-cols-2">
              <CautionCard title="Contraindications" text="Do not administer when more than 3 hours have passed since the traumatic event or delivery, or when the patient has a known TXA allergy." />
              <CautionCard title="Administration Risks" text="Administration that is too rapid may cause profound hypotension. Excessive dosing may cause seizures." />
            </div>
          </CourseSection>

          <CourseSection number="11" title="Shock, Transport, and Notification" description="Definitive hemorrhage control usually occurs at the trauma center.">
            <Checklist items={[
              "Trend heart rate, blood pressure, mental status, skin, pulses, and capillary refill.",
              "Minimize scene time.",
              "Continue assessment and vascular access en route.",
              "Provide early trauma-center notification.",
              "Report mechanism, injuries, interventions, serial vital signs, TXA, and ETA.",
              "Follow current destination and Medical Control guidance.",
            ]} />
          </CourseSection>

          <CourseSection number="12" title="Clinical Scenarios" description="Pause before opening each discussion.">
            <div className="space-y-6">
              <Scenario title="Extremity Hemorrhage" prompt="Direct pressure fails to control severe lower-leg bleeding." answer="Apply an appropriate tourniquet, document the time, reassess, and continue rapid transport." />
              <Scenario title="Pelvic Hemorrhage" prompt="A struck pedestrian has pelvic pain, instability, and hypotension." answer="Apply a pelvic stabilization device, minimize movement, treat shock, and transport rapidly." />
              <Scenario title="TXA Candidate" prompt="An adult has HR 126, SBP 94, abdominal tenderness, and concern for internal hemorrhage." answer="The heart rate exceeds 110 and the provider may determine the patient is at high risk for significant hemorrhage. Follow protocol and authorization requirements." />
              <Scenario title="Pediatric TXA" prompt="A 4-year-old weighing 18 kg meets protocol criteria." answer="The dose is 270 mg using 15 mg/kg, administered slowly over 10 minutes, not exceeding 1 gram." />
              <Scenario title="Outside the Window" prompt="The patient presents 4 hours after injury." answer="TXA is contraindicated under the supplied protocol because more than 3 hours have passed." />
            </div>
          </CourseSection>

          <CourseSection number="13" title="Documentation" description="Document timing, interventions, and response.">
            <Checklist items={[
              "Mechanism and estimated injury time",
              "Primary assessment and life threats",
              "Tourniquet site and application time",
              "Wound packing and pelvic stabilization",
              "Serial vital signs and perfusion",
              "Airway and ventilation interventions",
              "IV access, fluids, and Medical Control orders",
              "TXA indication, dose, route, time, and response",
              "Trauma notification, destination, and ETA",
            ]} />
          </CourseSection>

          <section className="rounded-3xl border border-red-700 bg-gradient-to-br from-red-950/50 to-zinc-950 p-8 text-center md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">Course Review Complete</p>
            <h2 className="mt-3 text-4xl font-extrabold">Ready for the final assessment?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              The quiz contains 25 questions. A score of 80% or higher unlocks the certificate.
            </p>
            <Link href="/courses/multisystem-trauma/quiz" className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 font-bold hover:bg-red-500">
              Begin Quiz
            </Link>
          </section>
        </section>
    </main>
  );
}

function CourseSection({ number, title, description, children }: { number: string; title: string; description: string; children: ReactNode }) {
  return (
    <section className="mb-16 scroll-mt-24">
      <div className="mb-7 border-b border-zinc-800 pb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">Section {number}</p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-400">{description}</p>
      </div>
      {children}
    </section>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"><p className="text-xs font-bold uppercase tracking-wide text-zinc-500">{label}</p><p className="mt-2 font-bold">{value}</p></div>;
}
function Tile({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-semibold leading-7 text-zinc-200">{children}</div>;
}
function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7"><h3 className="text-2xl font-bold text-red-500">{title}</h3><div className="mt-4 leading-7 text-zinc-300">{children}</div></article>;
}
function Alert({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mt-7 rounded-2xl border border-red-600 bg-red-950/20 p-6"><h3 className="text-xl font-bold text-red-400">{title}</h3><div className="mt-3 leading-7 text-zinc-200">{children}</div></div>;
}
function Checklist({ items }: { items: string[] }) {
  return <ul className="mt-6 grid gap-3 md:grid-cols-2">{items.map((item) => <li key={item} className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 leading-7 text-zinc-300"><span className="font-bold text-red-500">✓</span><span>{item}</span></li>)}</ul>;
}
function ChecklistCard({ title, items }: { title: string; items: string[] }) {
  return <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7"><h3 className="text-2xl font-bold text-red-500">{title}</h3><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 leading-7 text-zinc-300"><span className="font-bold text-red-500">✓</span><span>{item}</span></li>)}</ul></article>;
}
function CautionCard({ title, text }: { title: string; text: string }) {
  return <article className="rounded-2xl border border-amber-500 bg-amber-500/10 p-7"><p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Caution</p><h3 className="mt-2 text-2xl font-extrabold">{title}</h3><p className="mt-4 leading-7 text-zinc-200">{text}</p></article>;
}
function Scenario({ title, prompt, answer }: { title: string; prompt: string; answer: string }) {
  return <details className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"><summary className="cursor-pointer list-none text-xl font-bold"><span className="text-red-500">Case:</span> {title}</summary><p className="mt-4 leading-7 text-zinc-300">{prompt}</p><div className="mt-5 rounded-xl border border-red-700 bg-red-950/20 p-5 leading-7 text-zinc-200"><strong className="text-red-400">Discussion:</strong> {answer}</div></details>;
}