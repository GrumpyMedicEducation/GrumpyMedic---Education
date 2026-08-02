import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const objectives = [
  "Recognize possible adult and pediatric septic shock.",
  "Differentiate adult and pediatric sepsis criteria.",
  "Apply EMT, Advanced EMT, Paramedic, and Medical Control guidance.",
  "Calculate pediatric fluid boluses and age-based minimum systolic pressure.",
  "Reassess perfusion and identify signs of fluid overload.",
  "Deliver an organized Sepsis Alert and document treatment response.",
];

const adultCriteria = [
  "Suspected infection.",
  "Two or more sepsis criteria.",
  "Temperature below 96.8 °F or above 100.4 °F with new onset.",
  "Heart rate greater than 90 beats/minute.",
  "Respiratory rate greater than 22 breaths/minute.",
  "Systolic pressure below 90 mm Hg or MAP below 65 mm Hg.",
  "New or worsening altered mental status.",
  "Serum lactate above 4 mmol/L when available.",
  "ETCO₂ at or below 25 mm Hg.",
];

const pediatricCriteria = [
  "Suspected infection.",
  "Two or more pediatric sepsis criteria.",
  "Temperature below 96.8 °F or above 100.4 °F.",
  "Heart rate above the normal range for age.",
  "Altered mental status: decreased, irritable, or confused.",
  "Capillary refill below 1 second or above 3 seconds.",
  "Mottled, cool extremities.",
  "Decreased urine output.",
];

const adultActions = [
  "Routine patient care.",
  "Notify the hospital of an incoming Sepsis Alert when applicable.",
  "Supplemental oxygen to achieve SpO₂ of 94%.",
  "Full ALS assessment and treatment.",
  "Establish large-bore IV access.",
  "Administer 0.9% NaCl in 500 mL boluses up to 30 mL/kg.",
  "Assess lung sounds frequently for volume overload.",
];

const pediatricActions = [
  "Routine patient care.",
  "Notify the hospital of an incoming Sepsis Alert when applicable.",
  "Monitor and maintain airway and breathing.",
  "Administer oxygen and continue regardless of oxygen saturation.",
  "Obtain a blood glucose reading.",
  "Do not delay transport.",
  "Administer 20 mL/kg 0.9% NaCl boluses by syringe push.",
  "Reassess immediately after each bolus and repeat up to two additional times.",
];

export default function SepsisCoursePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Link
              href="/courses"
              className="font-semibold text-red-500 transition hover:text-red-400"
            >
              ← Back to Courses
            </Link>

            <p className="mt-10 text-sm font-extrabold uppercase tracking-[0.22em] text-red-500">
              Massachusetts EMS Clinical Course
            </p>

            <h1 className="mt-4 max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
              Adult &amp; Pediatric Sepsis
            </h1>

            <p className="mt-5 max-w-4xl text-xl leading-8 text-zinc-300">
              Recognition of possible septic shock, protocol-directed care,
              fluid therapy, reassessment, Medical Control options, and
              hospital notification.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat label="Protocols" value="2.17A & 2.17P" />
              <Stat label="Version" value="Massachusetts 2026.2" />
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
                href="/courses/sepsis/quiz"
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
            description="Review the adult and pediatric Massachusetts sepsis protocols before continuing."
          >
            <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-3">
              <Image
                src="/images/sepsis-protocol.png"
                alt="GrumpyMedic adult and pediatric sepsis protocol reference"
                width={2048}
                height={2048}
                priority
                className="h-auto w-full rounded-xl"
              />
            </div>

            <Alert title="Protocol Reminder">
              Always verify current Massachusetts statewide protocols, addenda,
              service policy, local Medical Control requirements, and your
              authorized scope of practice before clinical use.
            </Alert>
          </CourseSection>

          <CourseSection
            number="03"
            title="What Is Sepsis?"
            description="Sepsis is a systemic response to infection that can progress to organ dysfunction and shock."
          >
            <div className="grid gap-6 lg:grid-cols-3">
              <InfoCard title="Suspected Infection">
                <p>
                  The protocol begins with concern for an infectious source,
                  including respiratory, urinary, gastrointestinal, catheter,
                  feeding-tube, or other infections.
                </p>
              </InfoCard>

              <InfoCard title="Organ Dysfunction">
                <p>
                  Altered mental status, abnormal perfusion, hypotension,
                  abnormal respiratory findings, and reduced urine output may
                  indicate worsening organ function.
                </p>
              </InfoCard>

              <InfoCard title="Septic Shock">
                <p>
                  Septic shock requires rapid recognition, transport,
                  circulatory support, frequent reassessment, and early
                  hospital notification.
                </p>
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection
            number="04"
            title="Adult Identification"
            description="Protocol 2.17A applies to adult patients 18 years of age or older."
          >
            <Checklist items={adultCriteria} />

            <Alert title="Adult Thresholds">
              Adult septic shock criteria include systolic blood pressure below
              90 mm Hg or MAP below 65 mm Hg. ETCO₂ at or below 25 mm Hg and
              lactate above 4 mmol/L may also support concern when available.
            </Alert>
          </CourseSection>

          <CourseSection
            number="05"
            title="Pediatric Identification"
            description="Pediatric assessment depends heavily on age-appropriate findings and perfusion."
          >
            <Checklist items={pediatricCriteria} />

            <div className="mt-6 rounded-2xl border border-red-700 bg-red-950/20 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
                Pediatric Blood Pressure Pearl
              </p>

              <p className="mt-3 text-2xl font-extrabold">
                Minimum systolic pressure ≈ 70 + (age in years × 2)
              </p>

              <p className="mt-3 leading-7 text-zinc-300">
                Use the formula as a screening reference while evaluating the
                whole child, including mental status, capillary refill,
                peripheral pulses, skin findings, and urine output.
              </p>
            </div>
          </CourseSection>

          <CourseSection
            number="06"
            title="Adult Standing Orders"
            description="Apply the adult protocol while reassessing for response and volume overload."
          >
            <Checklist items={adultActions} />

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <InfoCard title="Medical Control May Order">
                <ul className="space-y-3">
                  <li>• Norepinephrine infusion: 0.1–0.5 mcg/kg/min.</li>
                  <li>• Epinephrine infusion: 2–10 mcg/min.</li>
                  <li>• Dopamine infusion: 2–20 mcg/kg/min.</li>
                  <li>• Additional fluid boluses.</li>
                </ul>
              </InfoCard>

              <InfoCard title="Adult Reassessment">
                <ul className="space-y-3">
                  <li>• Blood pressure and mental status.</li>
                  <li>• Peripheral perfusion and urine output.</li>
                  <li>• Lung sounds and work of breathing.</li>
                  <li>• Oxygen requirement and signs of overload.</li>
                </ul>
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection
            number="07"
            title="Pediatric Standing Orders"
            description="Fluid therapy is weight based and requires immediate reassessment after every bolus."
          >
            <Checklist items={pediatricActions} />

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <InfoCard title="Maximum Initial Bolus Strategy">
                <p>
                  Repeat 20 mL/kg boluses up to two additional times when the
                  response remains inadequate, for a maximum initial total of
                  60 mL/kg.
                </p>
              </InfoCard>

              <InfoCard title="Medical Control Options">
                <ul className="space-y-3">
                  <li>
                    • Epinephrine infusion: 0.1 mcg/kg/min, titrated to
                    perfusion, maximum 1 mcg/kg/min.
                  </li>
                  <li>• Additional fluid boluses.</li>
                </ul>
              </InfoCard>
            </div>

            <Alert title="Contact Medical Control">
              If there is no response after three pediatric fluid boluses,
              contact Medical Control for additional options.
            </Alert>
          </CourseSection>

          <CourseSection
            number="08"
            title="Fluid Therapy & Reassessment"
            description="Fluids are a treatment trial, not a set-and-forget intervention."
          >
            <div className="grid gap-6 md:grid-cols-2">
              <ChecklistCard
                title="Signs of Improving Perfusion"
                items={[
                  "Improving mental status",
                  "Stronger peripheral pulses",
                  "Normalizing capillary refill",
                  "Improving blood pressure",
                  "Improved skin temperature and color",
                  "Improved urine output",
                ]}
              />

              <ChecklistCard
                title="Signs of Volume Overload"
                items={[
                  "New rales",
                  "Increasing work of breathing",
                  "Increasing oxygen requirement",
                  "Worsening respiratory distress",
                  "Deterioration after a bolus",
                ]}
              />
            </div>
          </CourseSection>

          <CourseSection
            number="09"
            title="Sepsis Alert & Hospital Notification"
            description="Early notification helps the receiving hospital prepare for rapid evaluation and treatment."
          >
            <Checklist
              items={[
                "State “Sepsis Alert” when applicable.",
                "Provide age and estimated weight.",
                "Report suspected infectious source.",
                "Provide adult or pediatric criteria met.",
                "Report glucose, temperature, blood pressure, and mental status.",
                "Report IV access, fluid volume, and response.",
                "Report oxygen therapy and respiratory status.",
                "Provide ETA and Medical Control orders.",
              ]}
            />

            <div className="mt-6 rounded-2xl border border-red-600 bg-red-950/20 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
                Example Adult Sepsis Alert
              </p>

              <p className="mt-4 text-xl leading-8 text-zinc-100">
                “Hospital, Medic 24 with a Sepsis Alert. Seventy-year-old
                patient with suspected pneumonia, temperature 102.1, heart
                rate 118, respiratory rate 28, systolic pressure 84, altered
                mental status, and ETCO₂ 23. Large-bore IV established; 500 mL
                normal saline given with repeat pressure pending. ETA twelve
                minutes.”
              </p>
            </div>
          </CourseSection>

          <CourseSection
            number="10"
            title="Clinical Scenarios"
            description="Pause before opening each discussion."
          >
            <div className="space-y-6">
              <Scenario
                title="Adult Pneumonia"
                prompt="A 72-year-old with fever, productive cough, HR 122, RR 30, BP 86/48, ETCO₂ 24, and confusion."
                answer="The patient has suspected infection and multiple adult sepsis criteria. Initiate a Sepsis Alert, provide protocol-directed oxygen, establish large-bore IV access, begin fluid therapy, and reassess lung sounds and perfusion."
              />

              <Scenario
                title="Pediatric Perfusion Failure"
                prompt="A 6-year-old with fever, irritability, mottled cool extremities, capillary refill of 5 seconds, and decreased urine output."
                answer="This presentation supports possible pediatric septic shock. Maintain airway and breathing, administer oxygen, obtain glucose, begin 20 mL/kg fluid therapy, reassess immediately, and do not delay transport."
              />

              <Scenario
                title="Fluid Overload Concern"
                prompt="After an adult receives fluid, rales develop and the oxygen requirement increases."
                answer="Stop and reassess. These findings suggest volume overload. Report the change, support oxygenation and ventilation, and contact Medical Control as indicated."
              />

              <Scenario
                title="Poor Pediatric Response"
                prompt="A child remains poorly perfused after three 20 mL/kg boluses."
                answer="Contact Medical Control for additional options, including an epinephrine infusion and possible additional fluids, while continuing transport and reassessment."
              />
            </div>
          </CourseSection>

          <CourseSection
            number="11"
            title="Documentation"
            description="Document the criteria, interventions, and the patient’s response."
          >
            <Checklist
              items={[
                "Suspected source of infection",
                "Adult or pediatric sepsis criteria",
                "Mental status and perfusion findings",
                "Blood glucose and temperature",
                "Blood pressure, MAP when available, and ETCO₂",
                "IV/IO access and total fluid volume",
                "Reassessment after every bolus",
                "Signs of improvement or overload",
                "Sepsis Alert and Medical Control communications",
              ]}
            />
          </CourseSection>

          <CourseSection
            number="12"
            title="Key Takeaways"
            description="Review these points before the final quiz."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Sepsis begins with suspected infection plus concerning systemic findings.",
                "Adult and pediatric criteria are not interchangeable.",
                "Pediatric fluid therapy is weight based.",
                "Adult fluid is given in 500 mL boluses up to 30 mL/kg.",
                "Reassess perfusion and respiratory status after every bolus.",
                "Recognize volume overload early.",
                "Call the Sepsis Alert before arrival when applicable.",
                "Do not delay transport.",
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
              href="/courses/sepsis/quiz"
              className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-500"
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
