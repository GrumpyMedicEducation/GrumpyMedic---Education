import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const learningObjectives = [
  "Explain how tranexamic acid helps stabilize existing blood clots.",
  "Recognize patients at risk for significant traumatic hemorrhage.",
  "Identify the Massachusetts 2026.2 adult TXA dose.",
  "Describe TXA use in multisystem trauma and obstetrical emergencies.",
  "Explain safe preparation, administration, monitoring, and documentation.",
  "Apply TXA decision-making principles to clinical scenarios.",
];

const hemorrhageIndicators = [
  "Systolic blood pressure below 90 mmHg",
  "Heart rate greater than 110 beats per minute",
  "Clinical evidence of significant ongoing hemorrhage",
  "Provider determination that the patient is at high risk for major hemorrhage",
  "Penetrating trauma",
  "Blunt multisystem trauma",
  "Multiple long-bone fractures",
  "Pelvic fractures",
  "Traumatic amputation",
  "Severe soft-tissue injury",
];

const administrationChecks = [
  "Confirm that the patient meets the current protocol indication.",
  "Confirm whether the indication is adult multisystem trauma or an obstetrical emergency.",
  "Verify the medication, concentration, integrity, and expiration date.",
  "Confirm the adult dose of TXA 2 grams.",
  "Prepare the medication for undiluted IV administration.",
  "Administer by slow IV push over 10 minutes.",
  "Use a dedicated line when possible and do not mix TXA with other medications.",
  "Flush the line after administration.",
  "Continue hemorrhage control, shock care, and rapid transport.",
  "Document the indication, dose, route, time, and patient response.",
];

const commonErrors = [
  {
    title: "Using the Previous Dose",
    description:
      "Do not use the former weight-based 15 mg/kg regimen for the updated adult Massachusetts 2026.2 indication. The updated adult dose is TXA 2 grams IV push.",
  },
  {
    title: "Diluting the Medication",
    description:
      "The updated adult regimen shown in the Massachusetts 2026.2 material does not require dilution. Confirm the medication concentration and local procedure before administration.",
  },
  {
    title: "Administering Too Rapidly",
    description:
      "The adult 2-gram dose is administered by slow IV push over 10 minutes.",
  },
  {
    title: "Replacing Hemorrhage Control",
    description:
      "TXA does not replace direct pressure, tourniquets, wound packing, pelvic stabilization, surgical intervention, or blood-product resuscitation.",
  },
  {
    title: "Delaying Transport",
    description:
      "Medication preparation must not delay rapid transport to definitive trauma or obstetrical care.",
  },
  {
    title: "Failing to Reassess",
    description:
      "Continue monitoring perfusion, vital signs, bleeding, mental status, airway, ventilation, and the patient’s response to treatment.",
  },
];

export default function TXAAdministrationCoursePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/40 to-black">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">
            GrumpyMedic Education Course
          </p>

          <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">
            TXA Administration
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-300">
            Recognition of significant hemorrhage, tranexamic-acid
            pharmacology, Massachusetts 2026.2 dosing, safe administration,
            monitoring, documentation, and clinical decision-making.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <CourseBadge text="Trauma" />
            <CourseBadge text="Hemorrhage Control" />
            <CourseBadge text="Tranexamic Acid" />
            <CourseBadge text="Massachusetts 2026.2" />
            <CourseBadge text="Paramedic" />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="#course-content"
              className="rounded-xl bg-red-600 px-7 py-4 text-center font-bold transition hover:bg-red-500"
            >
              Start Course
            </a>

            <Link
              href="/courses/txa-administration/quiz"
              className="rounded-xl border border-red-500 px-7 py-4 text-center font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              Take the Quiz
            </Link>

            <Link
              href="/courses"
              className="rounded-xl border border-zinc-600 px-7 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Back to Courses
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
            {learningObjectives.map((objective) => (
              <InfoTile key={objective} text={objective} />
            ))}
          </div>
        </CourseSection>

        <CourseSection
          number="02"
          title="Massachusetts 2026.2 Quick Reference"
          description="Review the updated adult TXA information before continuing through the course."
        >
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
            <Image
              src="/txa-administration-2026-2.png"
              alt="Updated Massachusetts 2026.2 TXA administration infographic"
              width={1024}
              height={1536}
              priority
              className="h-auto w-full rounded-xl"
            />
          </div>

          <div className="mt-7 rounded-2xl border border-green-600 bg-green-950/20 p-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Updated Adult Dose
            </p>

            <h3 className="mt-3 text-3xl font-extrabold">
              TXA 2 grams IV push over 10 minutes
            </h3>

            <p className="mt-4 leading-7 text-zinc-200">
              For the updated adult Massachusetts regimen, no dilution is
              required. Administer the 2-gram dose undiluted by slow IV push
              over 10 minutes.
            </p>
          </div>
        </CourseSection>

        <CourseSection
          number="03"
          title="What Is Tranexamic Acid?"
          description="TXA is an antifibrinolytic medication used to help preserve existing blood clots."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard
              title="Antifibrinolytic"
              text="TXA reduces fibrin breakdown and helps stabilize clots that have already formed."
            />

            <FeatureCard
              title="Does Not Create a New Clot"
              text="TXA does not directly create a clot. It helps prevent premature breakdown of an existing clot."
            />

            <FeatureCard
              title="Part of Complete Trauma Care"
              text="TXA supports hemorrhage management but does not replace bleeding control, surgery, blood products, or rapid transport."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="04"
          title="How TXA Works"
          description="Understanding fibrinolysis explains why TXA may benefit selected hemorrhaging patients."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard title="Fibrinolysis">
              <p>
                After a clot forms, the body activates fibrinolysis to break
                down fibrin. This is normally part of the healing process.
              </p>

              <p>
                In severe trauma or major obstetrical bleeding, excessive
                fibrinolysis may contribute to unstable clots and continued
                hemorrhage.
              </p>
            </InfoCard>

            <InfoCard title="Effect of TXA">
              <p>
                TXA interferes with plasminogen activation and helps reduce
                fibrin breakdown.
              </p>

              <p>
                It should be used as part of an overall resuscitation strategy
                that includes hemorrhage control, shock management, and
                definitive care.
              </p>
            </InfoCard>
          </div>

          <AlertBox
            title="TXA Does Not Control the Source"
            text="A damaged vessel, injured organ, unstable pelvic fracture, uterine hemorrhage, or major wound still requires physical and definitive hemorrhage control."
          />
        </CourseSection>

        <CourseSection
          number="05"
          title="When to Consider TXA"
          description="Evaluate the entire patient rather than relying on one isolated finding."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {hemorrhageIndicators.map((indicator) => (
              <InfoTile key={indicator} text={indicator} />
            ))}
          </div>

          <AlertBox
            title="Patient Age and Adult Dosing"
            text="The protocol criteria may identify patients older than 5 years for consideration, but the updated 2-gram dosing highlighted in this course is identified as the adult-only dose. Follow the current pediatric protocol when treating a pediatric patient."
          />
        </CourseSection>

        <CourseSection
          number="06"
          title="Hemorrhagic Shock"
          description="Patients may have serious blood loss before profound hypotension develops."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard
              title="Early Findings"
              text="Tachycardia, anxiety, cool or pale skin, delayed capillary refill, narrowed pulse pressure, and tachypnea may appear early."
            />

            <FeatureCard
              title="Progressive Findings"
              text="Altered mental status, weak pulses, worsening hypotension, poor peripheral perfusion, and increasing shock index suggest deterioration."
            />

            <FeatureCard
              title="Compensated Shock"
              text="Children, younger adults, and physically fit patients may maintain blood pressure despite substantial blood loss."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="07"
          title="Adult Multisystem Trauma"
          description="The updated adult Massachusetts TXA dose applies to eligible adult multisystem-trauma patients."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard title="Adult Dose">
              <p className="text-3xl font-extrabold text-red-400">
                TXA 2 grams IV push
              </p>

              <p className="text-xl font-bold text-yellow-400">
                Administer slowly over 10 minutes
              </p>

              <p>
                No dilution is required for the updated adult regimen shown in
                the Massachusetts 2026.2 material.
              </p>
            </InfoCard>

            <InfoCard title="Timing">
              <p>
                Administer as soon as possible after significant injury when
                protocol criteria are met.
              </p>

              <p>
                The updated material identifies administration ideally within
                three hours of injury.
              </p>
            </InfoCard>
          </div>
        </CourseSection>

        <CourseSection
          number="08"
          title="Obstetrical Emergencies"
          description="TXA is also included for eligible obstetrical bleeding emergencies."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard title="Obstetrical Dose">
              <p className="text-3xl font-extrabold text-red-400">
                TXA 2 grams IV push
              </p>

              <p className="text-xl font-bold text-yellow-400">
                Administer slowly over 10 minutes
              </p>
            </InfoCard>

            <InfoCard title="Clinical Use">
              <p>
                Consider TXA for postpartum hemorrhage or other qualifying
                obstetrical bleeding emergencies under the current protocol.
              </p>

              <p>
                Continue uterine massage, hemorrhage management, shock care,
                rapid transport, and other protocol-directed treatment.
              </p>
            </InfoCard>
          </div>
        </CourseSection>

        <CourseSection
          number="09"
          title="High-Risk Hemorrhage Patterns"
          description="These injuries should increase concern for substantial internal or external blood loss."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RiskCard
              title="Penetrating Trauma"
              description="Penetrating injury to the chest, abdomen, pelvis, neck, or major blood vessels may cause rapid blood loss."
            />

            <RiskCard
              title="Blunt Trauma"
              description="Blunt multisystem trauma may produce major internal hemorrhage without dramatic external findings."
            />

            <RiskCard
              title="Pelvic Fractures"
              description="Pelvic injuries can conceal a large amount of blood and require early stabilization and rapid transport."
            />

            <RiskCard
              title="Long-Bone Fractures"
              description="Multiple long-bone fractures may contribute significantly to total blood loss."
            />

            <RiskCard
              title="Amputations"
              description="Traumatic amputation creates a high risk of life-threatening hemorrhage and requires immediate bleeding control."
            />

            <RiskCard
              title="Severe Soft-Tissue Injury"
              description="Large degloving, junctional, crush, or soft-tissue injuries may cause extensive hidden or external blood loss."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="10"
          title="Contraindications and Precautions"
          description="Review the current protocol, medication reference, and local medical-direction requirements."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard title="Contraindications">
              <ul className="space-y-3">
                <li>• Known hypersensitivity to tranexamic acid</li>
                <li>• Patient does not meet current protocol criteria</li>
                <li>• Medication identity or dose cannot be verified</li>
                <li>• Other protocol-specific exclusion criteria</li>
              </ul>
            </InfoCard>

            <InfoCard title="Use Caution">
              <ul className="space-y-3">
                <li>• History of thromboembolic disease</li>
                <li>• Known clotting disorder</li>
                <li>• Renal impairment when relevant to local guidance</li>
                <li>• Uncertain indication</li>
                <li>• Other conditions identified by the current protocol</li>
              </ul>
            </InfoCard>
          </div>
        </CourseSection>

        <CourseSection
          number="11"
          title="Preparation and Administration"
          description="Use a deliberate medication-safety process during high-acuity care."
        >
          <NumberedSteps steps={administrationChecks} />

          <AlertBox
            title="Medication Safety"
            text="Do not mix TXA with other medications. Use a dedicated line when possible, administer slowly over 10 minutes, and flush the line afterward."
          />
        </CourseSection>

        <CourseSection
          number="12"
          title="TXA and Hemorrhage Control"
          description="Medication is only one part of a complete hemorrhage-resuscitation plan."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Direct Pressure"
              text="Use firm direct pressure for controllable external bleeding."
            />

            <FeatureCard
              title="Tourniquets"
              text="Apply an approved tourniquet promptly for life-threatening extremity hemorrhage."
            />

            <FeatureCard
              title="Wound Packing"
              text="Pack deep wounds with appropriate gauze or hemostatic dressing when direct pressure is insufficient."
            />

            <FeatureCard
              title="Pelvic Stabilization"
              text="Apply a pelvic binder when indicated and avoid repeated manipulation of the pelvis."
            />

            <FeatureCard
              title="Rapid Transport"
              text="Minimize scene time when surgical or obstetrical hemorrhage control is required."
            />

            <FeatureCard
              title="Temperature Management"
              text="Prevent hypothermia because cold worsens coagulopathy and bleeding."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="13"
          title="Monitoring and Reassessment"
          description="Continue evaluating the patient throughout and after TXA administration."
        >
          <ChecklistCard
            title="Reassessment Priorities"
            items={[
              "Airway patency and ventilation",
              "Respiratory rate and work of breathing",
              "Blood pressure and pulse trends",
              "Mental status",
              "Skin signs and peripheral perfusion",
              "External hemorrhage control",
              "Abdominal, pelvic, and extremity findings",
              "IV or IO site",
              "Medication reaction or complication",
              "Response to the overall resuscitation plan",
            ]}
          />
        </CourseSection>

        <CourseSection
          number="14"
          title="Documentation"
          description="The patient-care report should clearly support the decision to administer TXA."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InfoTile text="Mechanism of injury or obstetrical presentation" />
            <InfoTile text="Suspected source of hemorrhage" />
            <InfoTile text="Initial and trending vital signs" />
            <InfoTile text="Perfusion and mental-status findings" />
            <InfoTile text="Hemorrhage-control interventions" />
            <InfoTile text="Reason TXA criteria were met" />
            <InfoTile text="TXA 2-gram dose, route, and administration time" />
            <InfoTile text="Patient response and adverse effects" />
            <InfoTile text="Medical-control contact when applicable" />
            <InfoTile text="Receiving-facility notification" />
          </div>
        </CourseSection>

        <CourseSection
          number="15"
          title="Common Errors"
          description="Recognizing frequent mistakes improves medication safety."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {commonErrors.map((error) => (
              <FeatureCard
                key={error.title}
                title={error.title}
                text={error.description}
              />
            ))}
          </div>
        </CourseSection>

        <CourseSection
          number="16"
          title="Clinical Decision Scenarios"
          description="Apply the updated information to common patient presentations."
        >
          <div className="space-y-6">
            <ScenarioCard
              title="Scenario 1: Adult Multisystem Trauma"
              findings={[
                "Adult involved in a high-speed motor-vehicle collision",
                "Heart rate 132 beats per minute",
                "Systolic blood pressure 82 mmHg",
                "Abdominal tenderness and femur deformity",
                "Cool skin and altered mental status",
              ]}
              decision="This patient has strong evidence of hemorrhagic shock and multisystem trauma. Control external bleeding, stabilize injuries, verify protocol eligibility, administer TXA 2 grams by slow IV push over 10 minutes, and transport rapidly."
            />

            <ScenarioCard
              title="Scenario 2: Minor Isolated Laceration"
              findings={[
                "Small forearm laceration",
                "Bleeding controlled with direct pressure",
                "Normal mental status",
                "Normal perfusion and vital signs",
                "No concerning mechanism or hidden injury",
              ]}
              decision="TXA is not indicated solely because blood is visible. Continue wound care and reassessment."
            />

            <ScenarioCard
              title="Scenario 3: Adult Pelvic Injury"
              findings={[
                "Adult pedestrian struck by a vehicle",
                "Severe pelvic pain and instability",
                "Heart rate 118 beats per minute",
                "Systolic blood pressure 88 mmHg",
                "Pale, anxious, and diaphoretic",
              ]}
              decision="The patient may have significant pelvic hemorrhage. Apply appropriate pelvic stabilization, verify eligibility, administer TXA 2 grams by slow IV push over 10 minutes, and prioritize rapid trauma transport."
            />

            <ScenarioCard
              title="Scenario 4: Postpartum Hemorrhage"
              findings={[
                "Recent delivery",
                "Heavy ongoing vaginal bleeding",
                "Heart rate 124 beats per minute",
                "Falling blood pressure",
                "Pale skin, weakness, and altered mentation",
              ]}
              decision="This presentation is concerning for severe postpartum hemorrhage. Begin protocol-directed obstetrical hemorrhage care, administer TXA 2 grams by slow IV push over 10 minutes when indicated, and transport rapidly."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="17"
          title="Key Takeaways"
          description="Remember these priorities when administering TXA."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Takeaway text="TXA helps stabilize existing clots by limiting fibrinolysis." />
            <Takeaway text="The updated adult dose is TXA 2 grams IV push." />
            <Takeaway text="Administer the dose slowly over 10 minutes." />
            <Takeaway text="No dilution is required for the updated adult regimen." />
            <Takeaway text="The adult dose applies to eligible adult multisystem-trauma patients." />
            <Takeaway text="The obstetrical emergency dose is TXA 2 grams IV push." />
            <Takeaway text="TXA does not replace direct hemorrhage control or definitive care." />
            <Takeaway text="Always verify the current protocol and local authorization." />
          </div>
        </CourseSection>

        <section className="rounded-2xl border border-red-600 bg-gradient-to-br from-red-950/40 to-zinc-900 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Course Complete
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Test Your Knowledge
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-zinc-300">
            Complete the TXA Administration quiz to review hemorrhage
            recognition, adult multisystem trauma, obstetrical emergencies,
            dosing, administration, monitoring, and documentation.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/courses/txa-administration/quiz"
              className="rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-500"
            >
              Start Quiz
            </Link>

            <a
              href="#course-content"
              className="rounded-xl border border-zinc-600 px-8 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Review Course
            </a>
          </div>
        </section>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-500">
          This course is provided for education and protocol review. Always
          follow the official Massachusetts Statewide Treatment Protocols,
          current medication references, agency training, local service policy,
          medical-control direction, and your authorized scope of practice.
        </div>
      </section>
    </main>
  );
}

function CourseBadge({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-red-800 bg-red-950/40 px-4 py-2 text-sm font-bold text-red-300">
      {text}
    </span>
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

      <div className="mt-4 space-y-4 leading-7 text-zinc-300">
        {children}
      </div>
    </article>
  );
}

function FeatureCard({
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

function RiskCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-red-900/60 bg-zinc-900 p-6">
      <h3 className="text-xl font-bold text-red-400">{title}</h3>
      <p className="mt-3 leading-7 text-zinc-300">{description}</p>
    </article>
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

function InfoTile({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="font-semibold leading-7 text-zinc-200">{text}</p>
    </div>
  );
}

function AlertBox({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="mt-7 rounded-2xl border border-red-600 bg-red-950/20 p-6">
      <h3 className="text-xl font-bold text-red-400">{title}</h3>
      <p className="mt-3 leading-7 text-zinc-200">{text}</p>
    </div>
  );
}

function NumberedSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, index) => (
        <li
          key={step}
          className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 font-bold">
            {index + 1}
          </span>

          <span className="pt-1 leading-7 text-zinc-300">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function ScenarioCard({
  title,
  findings,
  decision,
}: {
  title: string;
  findings: string[];
  decision: string;
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h3 className="text-2xl font-extrabold text-red-500">{title}</h3>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-400">
            Findings
          </p>

          <ul className="mt-4 space-y-3">
            {findings.map((finding) => (
              <li
                key={finding}
                className="flex gap-3 leading-7 text-zinc-300"
              >
                <span className="font-bold text-red-500">•</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-red-800 bg-red-950/20 p-5">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-red-400">
            Clinical Decision
          </p>

          <p className="mt-4 leading-7 text-zinc-200">{decision}</p>
        </div>
      </div>
    </article>
  );
}

function Takeaway({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="font-semibold leading-7 text-zinc-200">{text}</p>
    </div>
  );
}