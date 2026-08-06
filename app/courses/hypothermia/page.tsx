import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import CourseEngagementTracker from "../CourseEngagementTracker";

const objectives = [
  "Recognize environmental hypothermia in adult and pediatric patients.",
  "Prevent additional heat loss and avoid harmful handling.",
  "Assess pulse and respirations for a full 60 seconds when indicated.",
  "Apply EMT, Advanced EMT, and Paramedic standing orders.",
  "Identify when warmed oxygen, warmed IV fluids, and core-temperature monitoring are appropriate.",
  "Apply hypothermia-specific cardiac-arrest and reassessment priorities.",
];

const heatLossActions = [
  "Avoid rough movement.",
  "Insulate the patient from the ground.",
  "Shield the patient from wind and water.",
  "Move the patient to a warm environment as soon as practical.",
  "Remove wet clothing.",
  "Cover the patient with warm blankets, particularly the head.",
];

const assessmentPriorities = [
  "Assess pulse and respiratory rate for 60 seconds when profound hypothermia is suspected.",
  "Determine whether the patient is pulseless or in profound asystole.",
  "Evaluate mental status and airway protective reflexes.",
  "Check blood glucose when altered mental status is present.",
  "Identify possible coexisting overdose or toxicologic causes.",
  "Reassess temperature, perfusion, and respiratory status during transport.",
];

const cardiacArrestPriorities = [
  "Initiate CPR when pulselessness is confirmed.",
  "Administer oxygen using an appropriate delivery device.",
  "Use the AED according to protocol guidance and advisories.",
  "Manage cardiac arrest under the appropriate Massachusetts arrest protocol.",
  "Use warmed, humidified oxygen when possible during resuscitation.",
  "Handle the patient gently throughout movement and resuscitation.",
];

export default function HypothermiaCoursePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <CourseEngagementTracker
        courseSlug="hypothermia"
        courseTitle="Environmental Hypothermia"
        requiredMinutes={60}
      />
        <section className="border-b border-zinc-800 bg-gradient-to-b from-blue-950/40 to-black">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Link
              href="/courses"
              className="font-semibold text-red-500 transition hover:text-red-400"
            >
              ← Back to Courses
            </Link>

            <p className="mt-10 text-sm font-extrabold uppercase tracking-[0.22em] text-red-500">
              Massachusetts EMS Environmental Course
            </p>

            <h1 className="mt-4 max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
              Environmental Hypothermia
            </h1>

            <p className="mt-5 max-w-4xl text-xl leading-8 text-zinc-300">
              Adult and pediatric recognition, prevention of further heat loss,
              gentle handling, prolonged pulse assessment, rewarming support,
              cardiac-arrest considerations, and documentation.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat label="Protocol" value="Massachusetts 2.8" />
              <Stat label="Version" value="2026.2" />
              <Stat label="Assessment" value="25 Questions • 80%" />
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#course-content"
                className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
              >
                Start Course
              </a>

              <Link
                href="/courses/hypothermia/quiz"
                className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
              >
                Take the Quiz
              </Link>
            </div>
          </div>
        </section>

        <section
          id="course-content"
          className="mx-auto max-w-6xl px-6 py-14"
        >
          <CourseSection
            number="01"
            title="Learning Objectives"
            description="By the end of this course, the learner should be able to:"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {objectives.map((objective) => (
                <Tile key={objective}>{objective}</Tile>
              ))}
            </div>
          </CourseSection>

          <CourseSection
            number="02"
            title="GrumpyMedic Protocol Reference"
            description="Review the Massachusetts hypothermia protocol before continuing."
          >
            <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-3">
              <Image
                src="/images/hypothermia-protocol.png"
                alt="GrumpyMedic environmental hypothermia protocol reference"
                width={1024}
                height={1536}
                priority
                className="h-auto w-full rounded-xl"
              />
            </div>

            <Alert title="Protocol Reminder">
              Verify the current Massachusetts statewide protocol, addenda,
              service policy, local Medical Control requirements, and your
              authorized scope of practice before clinical use.
            </Alert>
          </CourseSection>

          <CourseSection
            number="03"
            title="What Is Environmental Hypothermia?"
            description="Hypothermia occurs when heat loss exceeds heat production and core temperature falls."
          >
            <div className="grid gap-6 lg:grid-cols-3">
              <InfoCard title="Exposure">
                <p>
                  Cold air, wind, water, wet clothing, prolonged ground contact,
                  and limited shelter can accelerate heat loss.
                </p>
              </InfoCard>

              <InfoCard title="Impaired Heat Production">
                <p>
                  Age, illness, intoxication, hypoglycemia, exhaustion, and
                  altered mental status may reduce the patient’s ability to
                  generate or conserve heat.
                </p>
              </InfoCard>

              <InfoCard title="Physiologic Risk">
                <p>
                  As core temperature falls, the patient may develop impaired
                  judgment, bradycardia, respiratory depression, dysrhythmias,
                  and cardiac arrest.
                </p>
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection
            number="04"
            title="Prevent Further Heat Loss"
            description="Initial care focuses on gentle handling and environmental protection."
          >
            <Checklist items={heatLossActions} />

            <Alert title="Gentle Handling">
              Avoid rough movement. A profoundly hypothermic patient may be
              physiologically fragile and vulnerable to dysrhythmia.
            </Alert>
          </CourseSection>

          <CourseSection
            number="05"
            title="Initial Assessment"
            description="A slow pulse or respiratory rate can be difficult to detect."
          >
            <Checklist items={assessmentPriorities} />

            <div className="mt-6 rounded-2xl border border-blue-700 bg-blue-950/20 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                Full 60-Second Assessment
              </p>

              <p className="mt-3 text-2xl font-extrabold">
                Assess pulse and respiratory rate for a full 60 seconds when
                determining pulselessness or profound asystole.
              </p>
            </div>
          </CourseSection>

          <CourseSection
            number="06"
            title="EMT Standing Orders"
            description="EMT care emphasizes protection, oxygenation, arrest care, and correction of reversible threats."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <ChecklistCard
                title="Routine Care"
                items={[
                  "Provide routine patient care.",
                  "Prevent additional heat loss.",
                  "Move to a warm environment when practical.",
                  "Remove wet clothing and cover the head.",
                  "Reassess mental status, airway, breathing, and circulation.",
                ]}
              />

              <ChecklistCard
                title="Supportive Treatment"
                items={[
                  "Provide oxygen when clinically indicated.",
                  "Use warmed, humidified oxygen when possible.",
                  "Manage hypoglycemia under the appropriate protocol.",
                  "Consider overdose or toxicologic causes.",
                  "Do not delay appropriate transport.",
                ]}
              />
            </div>
          </CourseSection>

          <CourseSection
            number="07"
            title="Advanced EMT Standing Orders"
            description="Advanced EMT treatment includes warmed vascular volume support."
          >
            <InfoCard title="Warm IV Fluids">
              <p>
                Warm IV fluids should be used when vascular access and fluid
                therapy are indicated. Continue frequent respiratory and
                perfusion reassessment.
              </p>
            </InfoCard>
          </CourseSection>

          <CourseSection
            number="08"
            title="Paramedic Standing Orders"
            description="Paramedic care adds core-temperature measurement when available and tolerated."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <InfoCard title="Absent Pulse and Breathing">
                <p>
                  Treat under the appropriate cardiac-arrest protocols after
                  confirming pulselessness with an appropriately prolonged
                  assessment.
                </p>
              </InfoCard>

              <InfoCard title="Core Temperature">
                <p>
                  When available and tolerated, insert an esophageal
                  temperature probe and measure core temperature.
                </p>
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection
            number="09"
            title="Cardiac-Arrest Considerations"
            description="Hypothermic cardiac arrest requires disciplined confirmation and protocol-based treatment."
          >
            <Checklist items={cardiacArrestPriorities} />

            <Alert title="Clinical Caution">
              Do not assume death based only on cold skin, slow breathing, or a
              difficult-to-detect pulse. Complete the prolonged assessment
              required by the protocol.
            </Alert>
          </CourseSection>

          <CourseSection
            number="10"
            title="Oxygen and Rewarming Support"
            description="Rewarming support should be controlled and focused on preventing further heat loss."
          >
            <div className="grid gap-6 md:grid-cols-2">
              <InfoCard title="Warmed, Humidified Oxygen">
                <p>
                  When possible, use warmed, humidified oxygen at 104–107 °F
                  (40–42 °C) by non-rebreather mask during resuscitation.
                </p>
              </InfoCard>

              <InfoCard title="Warmed IV Fluids">
                <p>
                  Use warmed IV fluids for indicated vascular support. Continue
                  monitoring perfusion, breathing, and response during
                  transport.
                </p>
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection
            number="11"
            title="Critical Cautions"
            description="Avoid interventions that may increase aspiration risk or cause tissue injury."
          >
            <div className="grid gap-6 md:grid-cols-2">
              <CautionCard
                title="Nothing by Mouth"
                text="Do not administer anything orally unless the patient has a reasonable level of consciousness and a normal gag reflex."
              />

              <CautionCard
                title="Do Not Massage Extremities"
                text="Do not massage the extremities in an attempt to actively rewarm the patient."
              />
            </div>
          </CourseSection>

          <CourseSection
            number="12"
            title="Clinical Scenarios"
            description="Pause before opening each discussion."
          >
            <div className="space-y-6">
              <Scenario
                title="Cold-Water Exposure"
                prompt="An adult is removed from cold water, is confused, has wet clothing, and has a weak, slow pulse."
                answer="Handle gently, remove wet clothing, insulate from the ground, cover with warm blankets, assess pulse and respirations carefully, provide oxygen as indicated, and transport."
              />

              <Scenario
                title="Possible Cardiac Arrest"
                prompt="A profoundly cold patient appears apneic and pulseless after prolonged outdoor exposure."
                answer="Assess pulse and respirations for 60 seconds. If pulselessness is confirmed, begin CPR, provide oxygen, apply the AED, and follow the appropriate cardiac-arrest protocol."
              />

              <Scenario
                title="Altered Pediatric Patient"
                prompt="A child is cold, lethargic, and has an uncertain oral intake history."
                answer="Protect from further heat loss, support airway and breathing, obtain glucose, avoid oral intake unless consciousness and gag reflex are adequate, and transport."
              />

              <Scenario
                title="Rewarming Error"
                prompt="A bystander begins vigorously rubbing the patient’s arms and legs."
                answer="Stop the massage. Continue gentle handling, passive insulation, and protocol-directed central rewarming support."
              />
            </div>
          </CourseSection>

          <CourseSection
            number="13"
            title="Documentation"
            description="The PCR should show exposure history, assessment, treatment, and response."
          >
            <Checklist
              items={[
                "Environmental conditions and duration of exposure",
                "Wet clothing, water exposure, wind, and ground contact",
                "Mental status and airway protective reflexes",
                "Pulse and respiratory assessment duration",
                "Blood glucose when obtained",
                "Oxygen device and whether oxygen was warmed/humidified",
                "IV access and warmed fluid administration",
                "Core temperature method and value when available",
                "Cardiac rhythm, AED use, and resuscitation care",
                "Rewarming interventions and patient response",
              ]}
            />
          </CourseSection>

          <CourseSection
            number="14"
            title="Key Takeaways"
            description="Review these points before the final quiz."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Handle hypothermic patients gently.",
                "Prevent further heat loss immediately.",
                "Assess pulse and respirations for 60 seconds when indicated.",
                "Use warmed, humidified oxygen when possible.",
                "Use warmed IV fluids when indicated.",
                "Treat confirmed cardiac arrest under the appropriate protocol.",
                "Do not give oral intake without adequate consciousness and gag reflex.",
                "Do not massage the extremities.",
              ].map((item) => (
                <Tile key={item}>{item}</Tile>
              ))}
            </div>
          </CourseSection>

          <section className="rounded-3xl border border-red-700 bg-gradient-to-br from-red-950/50 to-zinc-950 p-8 text-center md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
              Course Review Complete
            </p>

            <h2 className="mt-3 text-4xl font-extrabold">
              Ready for the final assessment?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              The quiz contains 25 questions. A score of 80% or higher unlocks
              the completion certificate.
            </p>

            <Link
              href="/courses/hypothermia/quiz"
              className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-500"
            >
              Begin Quiz
            </Link>
          </section>
        </section>
    </main>
  );
}

function CourseSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-16 scroll-mt-24">
      <div className="mb-7 border-b border-zinc-800 pb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          Section {number}
        </p>

        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          {title}
        </h2>

        <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-400">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-2 font-bold">{value}</p>
    </div>
  );
}

function Tile({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-semibold leading-7 text-zinc-200">
      {children}
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h3 className="text-2xl font-bold text-red-500">{title}</h3>
      <div className="mt-4 leading-7 text-zinc-300">{children}</div>
    </article>
  );
}

function Alert({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-7 rounded-2xl border border-red-600 bg-red-950/20 p-6">
      <h3 className="text-xl font-bold text-red-400">{title}</h3>
      <div className="mt-3 leading-7 text-zinc-200">{children}</div>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 leading-7 text-zinc-300"
        >
          <span className="font-bold text-red-500">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ChecklistCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h3 className="text-2xl font-bold text-red-500">{title}</h3>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7 text-zinc-300">
            <span className="font-bold text-red-500">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function CautionCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-amber-500 bg-amber-500/10 p-7">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
        Caution
      </p>

      <h3 className="mt-2 text-2xl font-extrabold text-white">{title}</h3>

      <p className="mt-4 leading-7 text-zinc-200">{text}</p>
    </article>
  );
}

function Scenario({
  title,
  prompt,
  answer,
}: {
  title: string;
  prompt: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <summary className="cursor-pointer list-none text-xl font-bold">
        <span className="text-red-500">Case:</span> {title}
      </summary>

      <p className="mt-4 leading-7 text-zinc-300">{prompt}</p>

      <div className="mt-5 rounded-xl border border-red-700 bg-red-950/20 p-5 leading-7 text-zinc-200">
        <strong className="text-red-400">Discussion:</strong> {answer}
      </div>
    </details>
  );
}