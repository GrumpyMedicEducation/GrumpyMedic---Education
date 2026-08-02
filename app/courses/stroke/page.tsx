import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const objectives = [
  "Recognize common stroke presentations and high-risk stroke mimics.",
  "Establish and document the patient’s exact Last Known Well.",
  "Perform and score every FAST-ED component.",
  "Apply Massachusetts Stroke Alert, oxygen, positioning, and transport guidance.",
  "Deliver a concise prearrival report and document the neurologic assessment.",
];

const fastEd = [
  {
    letter: "F",
    title: "Facial Palsy",
    score: "0–1",
    text: "Ask the patient to smile or show their teeth. Compare both sides at rest and with movement.",
  },
  {
    letter: "A",
    title: "Arm Weakness",
    score: "0–2",
    text: "Have the patient hold both arms out. Score drift, effort against gravity, or no movement.",
  },
  {
    letter: "S",
    title: "Speech Changes",
    score: "0–2",
    text: "Assess naming, repetition, comprehension, aphasia, muteness, and dysarthria.",
  },
  {
    letter: "E",
    title: "Eye Deviation",
    score: "0–2",
    text: "Observe resting gaze and the patient’s ability to track without forcing the head or eyes.",
  },
  {
    letter: "D",
    title: "Denial / Neglect",
    score: "0–2",
    text: "Test simultaneous stimulation and awareness of both sides of the body and environment.",
  },
];

const mimics = [
  "Hypoglycemia",
  "Seizure with postictal paralysis",
  "Migraine with aura",
  "Bell’s palsy",
  "Intoxication or medication effect",
  "Sepsis, syncope, tumor, or metabolic disorder",
];

const reportItems = [
  "State “Stroke Alert” when criteria are met.",
  "Patient age, sex, and baseline function.",
  "Last Known Well and symptom-discovery time.",
  "FAST-ED total and each abnormal component.",
  "Blood glucose and key vital signs.",
  "Anticoagulant or antiplatelet use.",
  "Relevant trauma, seizure, surgery, or bleeding history.",
  "Estimated time of arrival.",
];

export default function StrokeCoursePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Link
              href="/courses"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              ← Back to Courses
            </Link>

            <p className="mt-10 text-sm font-extrabold uppercase tracking-[0.22em] text-red-500">
              Massachusetts EMS Clinical Course
            </p>

            <h1 className="mt-4 max-w-5xl text-5xl font-extrabold leading-tight text-white md:text-7xl">
              Stroke Recognition &amp; Prehospital Management
            </h1>

            <p className="mt-5 max-w-4xl text-xl leading-8 text-zinc-300">
              Protocol-focused education covering Last Known Well, FAST-ED,
              stroke mimics, Stroke Alert communication, oxygen use,
              destination considerations, and documentation.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat label="Protocol" value="Massachusetts 2.18" />
              <Stat label="Version" value="2026.2" />
              <Stat label="Assessment" value="25 Questions • 80%" />
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#course-content"
                className="rounded-xl bg-red-600 px-7 py-4 font-bold hover:bg-red-500"
              >
                Start Course
              </a>

              <Link
                href="/courses/stroke/quiz"
                className="rounded-xl border border-zinc-600 px-7 py-4 font-bold hover:border-red-500 hover:text-red-400"
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
              {objectives.map((item) => (
                <Tile key={item}>{item}</Tile>
              ))}
            </div>
          </CourseSection>

          <CourseSection
            number="02"
            title="Massachusetts Protocol Quick Reference"
            description="Review the supplied 2026.2 protocol and checklist before continuing."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <ProtocolImage
                src="/mass-stroke-protocol-2-18-page-1.jpeg"
                alt="Massachusetts Stroke Protocol 2.18 standing orders"
              />

              <ProtocolImage
                src="/mass-stroke-protocol-2-18-page-2.jpeg"
                alt="Massachusetts FAST-ED stroke checklist"
              />
            </div>

            <Alert title="Protocol Update Reminder">
              Always verify the current Massachusetts statewide protocols,
              regional point-of-entry plan, service policy, and medical-control
              requirements before using this material clinically.
            </Alert>
          </CourseSection>

          <CourseSection
            number="03"
            title="The Prehospital Mission"
            description="EMS does not determine the stroke subtype in the field."
          >
            <div className="grid gap-6 md:grid-cols-2">
              <InfoCard title="Recognize & Stabilize">
                <p>
                  Complete routine patient care, identify immediate airway or
                  breathing threats, obtain glucose, and perform a focused
                  neurologic examination.
                </p>
              </InfoCard>

              <InfoCard title="Preserve Treatment Options">
                <p>
                  Establish the timeline, call the Stroke Alert early, choose
                  the appropriate destination, and avoid unnecessary scene
                  delay.
                </p>
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection
            number="04"
            title="Stroke Categories"
            description="Prehospital findings may suggest stroke but cannot reliably distinguish ischemia from hemorrhage."
          >
            <div className="grid gap-6 lg:grid-cols-3">
              <Feature
                title="Ischemic Stroke"
                text="An artery is obstructed by thrombus or embolus, reducing blood flow to brain tissue."
              />

              <Feature
                title="Hemorrhagic Stroke"
                text="Bleeding occurs within or around the brain and may produce headache, vomiting, hypertension, or rapid deterioration."
              />

              <Feature
                title="Transient Symptoms"
                text="Resolved focal deficits remain clinically important and require urgent evaluation."
              />
            </div>
          </CourseSection>

          <CourseSection
            number="05"
            title="Last Known Well"
            description="The timeline is one of the most important pieces of information EMS provides."
          >
            <div className="grid gap-6 md:grid-cols-2">
              <InfoCard title="Definition">
                <p>
                  Last Known Well is the last time the patient was observed at
                  their neurologic baseline—not the time symptoms were
                  discovered.
                </p>
              </InfoCard>

              <InfoCard title="Wake-Up Stroke">
                <p>
                  For symptoms found on awakening, obtain the last time the
                  patient was seen or heard normal before sleep and separately
                  document discovery time.
                </p>
              </InfoCard>
            </div>

            <Checklist
              items={[
                "Ask the patient, family, caregiver, coworker, or witness.",
                "Document an exact clock time whenever possible.",
                "Record the source of the information.",
                "Explain why LKW is unknown when it cannot be established.",
              ]}
            />
          </CourseSection>

          <CourseSection
            number="06"
            title="Stroke Mimics"
            description="Several conditions can produce focal or stroke-like neurologic findings."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mimics.map((item) => (
                <Tile key={item}>{item}</Tile>
              ))}
            </div>

            <Alert title="Do Not Stop at the Mimic">
              A seizure can be caused by stroke, and persistent focal findings
              after glucose correction still require stroke evaluation.
            </Alert>
          </CourseSection>

          <CourseSection
            number="07"
            title="FAST-ED Stroke Scale"
            description="Score each domain separately and report both the total and the individual abnormal findings."
          >
            <div className="space-y-5">
              {fastEd.map((item) => (
                <article
                  key={item.letter}
                  className="grid gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:grid-cols-[72px_1fr_auto] sm:items-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-3xl font-extrabold">
                    {item.letter}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">{item.title}</h3>

                    <p className="mt-2 leading-7 text-zinc-300">
                      {item.text}
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-700 bg-black px-5 py-3 text-center">
                    <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                      Score
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-red-500">
                      {item.score}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <Alert title="Clinical Pearl">
              A low FAST-ED score does not completely exclude stroke,
              particularly posterior-circulation stroke.
            </Alert>
          </CourseSection>

          <CourseSection
            number="08"
            title="Posterior Circulation Stroke"
            description="Not every stroke presents with facial droop, arm weakness, or aphasia."
          >
            <Checklist
              items={[
                "Sudden severe dizziness or inability to walk",
                "Ataxia or loss of coordination",
                "Diplopia or other acute visual disturbance",
                "Dysarthria, vomiting, or altered consciousness",
                "Headache or neck pain with a new neurologic deficit",
              ]}
            />
          </CourseSection>

          <CourseSection
            number="09"
            title="Stroke Alert & Treatment Priorities"
            description="Apply the supplied Massachusetts protocol and local implementation."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <InfoCard title="Stroke Alert">
                <p>
                  If any stroke-scale sign is abnormal and onset is less than
                  24 hours, notify the receiving hospital of a Stroke Alert,
                  even when symptoms have resolved.
                </p>
              </InfoCard>

              <InfoCard title="Transport">
                <p>
                  Do not delay transport for ALS intercept. Consider bringing a
                  witness or caregiver who can verify symptom onset and
                  baseline.
                </p>
              </InfoCard>

              <InfoCard title="Oxygen">
                <p>
                  Avoid routine hyperoxygenation. Titrate to the patient’s
                  condition and use oxygen for hypoxemia, dyspnea, or SpO₂
                  below 90% as directed by the supplied protocol.
                </p>
              </InfoCard>

              <InfoCard title="Positioning">
                <p>
                  Elevate the head of the stretcher approximately 30 degrees
                  when tolerated while protecting the airway and reassessing
                  frequently.
                </p>
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection
            number="10"
            title="Destination & Notification"
            description="Early, complete communication helps the receiving stroke team prepare."
          >
            <Checklist items={reportItems} />

            <div className="mt-6 rounded-2xl border border-red-600 bg-red-950/20 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
                Example Radio Report
              </p>

              <p className="mt-4 text-xl leading-8 text-zinc-100">
                “Hospital, Medic 24 with a Stroke Alert. Seventy-two-year-old
                male, LKW 1410, sudden aphasia and right arm weakness.
                FAST-ED 5, glucose 112, takes apixaban, BP 188/96, SpO₂ 95%
                room air. ETA eight minutes.”
              </p>
            </div>
          </CourseSection>

          <CourseSection
            number="11"
            title="Clinical Scenarios"
            description="Pause before revealing the discussion points."
          >
            <div className="space-y-6">
              <Scenario
                title="Wake-Up Aphasia"
                prompt="A 68-year-old is found aphasic at 0630. The spouse last spoke with the patient normally at 2230."
                answer="LKW is 2230. Discovery time is 0630. Obtain glucose, complete FAST-ED, and report both times."
              />

              <Scenario
                title="Symptoms Resolved"
                prompt="The patient had 15 minutes of unilateral weakness and slurred speech that resolved before EMS arrival."
                answer="Resolved symptoms do not eliminate stroke risk. Document the original deficits and activate a Stroke Alert when criteria are met."
              />

              <Scenario
                title="Low Glucose"
                prompt="The patient has facial droop and confusion with a glucose of 42 mg/dL."
                answer="Treat hypoglycemia, repeat the neurologic examination and glucose, and continue stroke evaluation when focal findings persist."
              />

              <Scenario
                title="Dizziness & Ataxia"
                prompt="The patient has sudden vomiting, diplopia, and cannot stand, but has no arm drift."
                answer="Consider posterior circulation stroke. A normal or low FAST-ED score does not eliminate the diagnosis."
              />
            </div>
          </CourseSection>

          <CourseSection
            number="12"
            title="Documentation & Common Pitfalls"
            description="The PCR should preserve the timeline and the neurologic examination."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <ChecklistCard
                title="Document"
                items={[
                  "Exact LKW and who supplied the time",
                  "Discovery time and symptom progression",
                  "FAST-ED components and total",
                  "Glucose, vital signs, oxygen indication, and reassessment",
                  "Stroke Alert time and destination rationale",
                ]}
              />

              <ChecklistCard
                title="Avoid"
                items={[
                  "Using discovery time as LKW",
                  "Skipping glucose",
                  "Waiting until arrival to call the alert",
                  "Giving oxygen without an indication",
                  "Ignoring resolved or posterior-circulation symptoms",
                ]}
              />
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
              href="/courses/stroke/quiz"
              className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 font-bold hover:bg-red-500"
            >
              Begin Quiz
            </Link>
          </section>
        </section>
      </main>
    </>
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

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
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

function Feature({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xl font-bold text-red-500">{title}</h3>

      <p className="mt-3 leading-7 text-zinc-300">{text}</p>
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
          <li
            key={item}
            className="flex gap-3 leading-7 text-zinc-300"
          >
            <span className="font-bold text-red-500">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProtocolImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-white p-3">
      <Image
        src={src}
        alt={alt}
        width={1080}
        height={1440}
        className="h-auto w-full rounded-xl"
      />
    </div>
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
      <summary className="cursor-pointer list-none text-xl font-bold text-white">
        <span className="text-red-500">Case:</span> {title}
      </summary>

      <p className="mt-4 leading-7 text-zinc-300">{prompt}</p>

      <div className="mt-5 rounded-xl border border-red-700 bg-red-950/20 p-5 leading-7 text-zinc-200">
        <strong className="text-red-400">Discussion:</strong> {answer}
      </div>
    </details>
  );
}