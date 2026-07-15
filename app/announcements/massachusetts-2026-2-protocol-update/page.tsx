import Link from "next/link";
import Navbar from "../../components/Navbar";

const protocolChanges = [
  {
    section: "2.2",
    title: "Adult and Pediatric Allergic Reaction / Anaphylaxis",
    changes: [
      "First Responder standing orders now include epinephrine or surfactant nasal preparation.",
      "If the first dose is nasal epinephrine and symptoms do not significantly improve within five minutes, subsequent epinephrine doses must be administered by intramuscular injection.",
      "Cetirizine may be administered orally for adult and pediatric mild allergic reactions.",
      "Diphenhydramine has been removed from this protocol.",
    ],
  },
  {
    section: "2.6",
    title: "Bronchospasm / Respiratory Distress",
    changes: [
      "Adult indications and contraindications for BiPAP and CPAP were added.",
      "Pediatric BiPAP and CPAP use was removed and is no longer indicated for children of any age.",
    ],
  },
  {
    section: "2.10",
    title: "Obstetrical Emergencies",
    changes: [
      "Paramedic tranexamic acid dosing was updated to TXA 2 grams by IV push.",
      "The second TXA dose was removed.",
    ],
  },
  {
    section: "2.13",
    title: "Pain and Nausea Management",
    changes: [
      "Advanced EMT scope now includes acetaminophen 650–1000 mg IV.",
    ],
  },
  {
    section: "3.3",
    title: "Bradycardia",
    changes: [
      "A typographical error involving the epinephrine dose was corrected from 0.5 mL to 5 mL of a 0.1 mg/mL solution.",
    ],
  },
  {
    section: "3.4 and 3.5",
    title: "Adult and Pediatric Cardiac Arrest",
    changes: [
      "Advanced EMT standing orders now include epinephrine 1 mg IV or IO every three to five minutes.",
      "Vasopressin was removed because it is no longer recommended by AHA or ILCOR.",
    ],
  },
  {
    section: "4.1",
    title: "Burns, Inhalation, Electrocution, and Lightning Strikes",
    changes: [
      "Advanced EMT burn-fluid language was clarified to include the words “per hour” for adult and pediatric patients with 20% body-surface-area burns.",
    ],
  },
  {
    section: "4.5 and 4.11",
    title: "Multisystem Trauma and Traumatic Cardiac Arrest",
    changes: [
      "The adult paramedic TXA dose was updated to 2 grams by IV push.",
      "A pediatric TXA dose was added to Protocol 4.11.",
    ],
  },
  {
    section: "6.7",
    title: "Ultrasound Device Use by Paramedics",
    changes: [
      "Authorized and trained paramedics may perform abdominal and pulmonary ultrasound scans when approved in writing by the affiliate hospital medical director.",
      "Ultrasound use must not delay transport or other diagnostic or therapeutic care.",
      "EMS providers may document findings but may not make a formal ultrasound diagnosis.",
    ],
  },
  {
    section: "6.11",
    title: "Buprenorphine for Opioid Withdrawal",
    changes: [
      "The Clinical Opiate Withdrawal Scale threshold was updated to COWS greater than or equal to 8.",
    ],
  },
  {
    section: "6.13",
    title: "Low-Titer O Whole Blood or Packed Red Blood Cell Transfusion",
    changes: [
      "Additional data-reporting and quality-assurance requirements were added.",
      "Every response involving blood administration must be reported through MATRIS, whether or not blood was ultimately administered.",
      "Transfusion-reaction language was substantially updated.",
    ],
  },
  {
    section: "7.4",
    title: "Pediatric Transport",
    changes: [
      "References to “cot” were changed to “stretcher.”",
      "Definitions and guidance were added for Stable Postpartum Mother and Well, Newly Born patients.",
      "Transport devices must attach directly to the ambulance stretcher.",
    ],
  },
  {
    section: "7.5",
    title: "Refusal of Medical Care and Ambulance Transport",
    changes: [
      "Mandatory medical-control contact language was revised.",
      "EMS personnel should contact medical control whenever they have concerns about whether a refusal is appropriate.",
    ],
  },
  {
    section: "7.8",
    title: "Ventricular Assist Devices",
    changes: [
      "The algorithm was updated to align with the 2025 American Heart Association guidelines.",
    ],
  },
  {
    section: "A1",
    title: "Interfacility Transfer Protocols",
    changes: [
      "Blood-transfusion reaction language was updated to match Protocol 6.13.",
    ],
  },
  {
    section: "A2",
    title: "Scope of Practice",
    changes: [
      "CPAP is now labeled as an adult-only intervention.",
    ],
  },
  {
    section: "AR 5-400",
    title: "Required Medications on Ambulances",
    changes: [
      "Oral diphenhydramine was moved to the optional list for Basic-level ambulances.",
      "IV diphenhydramine is no longer required or optional.",
      "Epinephrine 1 mg in 10 mL is now required for Advanced-level ambulances.",
      "Vasopressin was removed from the optional medication list for Paramedic-level ambulances.",
      "Cetirizine was added as an optional antihistamine medication.",
    ],
  },
];

const majorHighlights = [
  {
    title: "Mandatory Effective Date",
    text: "The 2026.2 protocols become mandatory for Massachusetts ambulance and EFR services on August 17, 2026.",
  },
  {
    title: "Training Required",
    text: "Services may begin using the updated protocols after personnel training is complete and the service is appropriately equipped.",
  },
  {
    title: "AEMT Scope Expansion",
    text: "Advanced EMT scope now includes IV or IO epinephrine during cardiac arrest and IV acetaminophen for pain management.",
  },
  {
    title: "Anaphylaxis Update",
    text: "First Responders may use nasal epinephrine under standing orders, with subsequent doses administered intramuscularly when required.",
  },
  {
    title: "Medication Changes",
    text: "Cetirizine was added as an optional medication, diphenhydramine requirements were reduced, and vasopressin was removed.",
  },
  {
    title: "CPAP Clarification",
    text: "CPAP and BiPAP are identified as adult-only interventions, and pediatric use was removed from the respiratory protocol.",
  },
];

export default function MassachusettsProtocolUpdatePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/40 to-black">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wide">
              Important
            </span>

            <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-wide text-zinc-300">
              Massachusetts OEMS
            </span>

            <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-wide text-zinc-300">
              Published July 2, 2026
            </span>
          </div>

          <h1 className="mt-6 max-w-5xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Massachusetts 2026.2 Statewide Treatment Protocol Update
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-300">
            The Massachusetts Department of Public Health Office of Emergency
            Medical Services issued updated Statewide Treatment Protocols with
            changes to scope of practice, medications, respiratory support,
            cardiac arrest care, TXA, transport, refusal, ultrasound, and other
            clinical requirements.
          </p>

          <div className="mt-8 rounded-2xl border border-red-600 bg-red-950/30 p-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
              Mandatory Implementation Date
            </p>

            <p className="mt-3 text-3xl font-extrabold">
              August 17, 2026
            </p>

            <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
              Services may adopt the updated protocols earlier after required
              training is completed and the service is properly equipped.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="https://www.mass.gov/doc/emergency-medical-services-statewide-treatment-protocols-version-20262-effective-august-17-2026/download"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-red-600 px-7 py-4 text-center font-bold transition hover:bg-red-500"
            >
              Open Official 2026.2 Protocols
            </a>

            <Link
              href="/resources/protocols"
              className="rounded-xl border border-red-500 px-7 py-4 text-center font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              State Protocol Resources
            </Link>

            <Link
              href="/announcements"
              className="rounded-xl border border-zinc-600 px-7 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Back to Announcements
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <section>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            At a Glance
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Major Highlights
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {majorHighlights.map((highlight) => (
              <HighlightCard
                key={highlight.title}
                title={highlight.title}
                text={highlight.text}
              />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Scope of Practice
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            AEMT and First Responder Changes
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <InfoPanel title="Advanced EMT">
              <ul className="space-y-3">
                <li>
                  IV or IO epinephrine administration during cardiac arrest.
                </li>
                <li>
                  Epinephrine 1 mg IV or IO every three to five minutes under
                  standing orders.
                </li>
                <li>
                  IV acetaminophen, 650–1000 mg, for pain management.
                </li>
                <li>
                  Updated burn-fluid wording for patients with significant
                  body-surface-area burns.
                </li>
              </ul>
            </InfoPanel>

            <InfoPanel title="First Responder">
              <ul className="space-y-3">
                <li>
                  Nasal epinephrine added under standing orders for anaphylaxis.
                </li>
                <li>
                  If the first nasal dose does not significantly improve
                  symptoms within five minutes, subsequent epinephrine doses
                  must be given by intramuscular injection.
                </li>
                <li>
                  Services must ensure appropriate training and equipment before
                  implementation.
                </li>
              </ul>
            </InfoPanel>
          </div>
        </section>

        <section className="mt-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Medication Updates
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Required and Optional Medication Changes
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <MedicationCard
              title="Cetirizine"
              status="Added"
              description="Cetirizine was added as an optional antihistamine and is the preferred antihistamine identified in the allergic-reaction protocol."
            />

            <MedicationCard
              title="Diphenhydramine"
              status="Reduced"
              description="Oral diphenhydramine was moved to the optional list for Basic-level ambulances. IV diphenhydramine is no longer required or optional."
            />

            <MedicationCard
              title="Vasopressin"
              status="Removed"
              description="Vasopressin was removed from cardiac-arrest protocols and from the optional medication list for Paramedic-level ambulances."
            />

            <MedicationCard
              title="Epinephrine"
              status="Required"
              description="Epinephrine 1 mg in 10 mL is now a required medication for Advanced-level ambulances."
            />

            <MedicationCard
              title="Acetaminophen"
              status="Expanded"
              description="Advanced EMT scope now includes IV acetaminophen, 650–1000 mg, for pain management."
            />

            <MedicationCard
              title="Tranexamic Acid"
              status="Updated"
              description="Adult paramedic TXA dosing was updated to 2 grams by IV push, and pediatric TXA guidance was added."
            />
          </div>
        </section>

        <section className="mt-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Complete Change Summary
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Protocol-by-Protocol Changes
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-400">
            The following summary is intended to help EMS personnel identify
            the major updates. Providers must review the complete official
            protocols and service-specific training.
          </p>

          <div className="mt-8 space-y-5">
            {protocolChanges.map((protocol) => (
              <ProtocolChangeCard
                key={`${protocol.section}-${protocol.title}`}
                section={protocol.section}
                title={protocol.title}
                changes={protocol.changes}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-yellow-600 bg-yellow-950/20 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">
            Service Training Requirement
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Training Must Be Completed
          </h2>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-200">
            Massachusetts ambulance and EFR services are required to train EMS
            personnel on the revised protocols. A service may begin using the
            2026.2 protocols after training is complete and the service is
            appropriately equipped. Implementation is mandatory by August 17,
            2026.
          </p>
        </section>

        <section className="mt-16 rounded-2xl border border-zinc-700 bg-zinc-900 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Recommended Review
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Suggested Department Training Topics
          </h2>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <TrainingTopic text="First Responder nasal epinephrine administration" />
            <TrainingTopic text="AEMT IV and IO epinephrine in cardiac arrest" />
            <TrainingTopic text="AEMT IV acetaminophen administration" />
            <TrainingTopic text="Adult CPAP and pediatric CPAP restrictions" />
            <TrainingTopic text="Updated adult and pediatric TXA dosing" />
            <TrainingTopic text="Cetirizine use and diphenhydramine changes" />
            <TrainingTopic text="Burn-fluid calculation and per-hour wording" />
            <TrainingTopic text="Updated refusal and medical-control language" />
            <TrainingTopic text="Ultrasound authorization and documentation" />
            <TrainingTopic text="Blood-product quality assurance and reporting" />
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-red-600 bg-gradient-to-br from-red-950/40 to-zinc-900 p-8 text-center">
          <h2 className="text-3xl font-extrabold">
            Review the Official Protocols
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-zinc-300">
            This announcement is a summary. EMS personnel should review the
            official 2026.2 Statewide Treatment Protocols, complete required
            service training, and follow local medical-direction policies.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://www.mass.gov/doc/emergency-medical-services-statewide-treatment-protocols-version-20262-effective-august-17-2026/download"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-500"
            >
              Open Official Protocols
            </a>

            <Link
              href="/announcements"
              className="rounded-xl border border-zinc-600 px-8 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
            >
              All Announcements
            </Link>
          </div>
        </section>

        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-500">
          This page is an educational summary and does not replace the official
          Massachusetts Statewide Treatment Protocols, agency training, local
          service policies, medical-control direction, or authorized scope of
          practice.
        </div>
      </section>
    </main>
  );
}

function HighlightCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xl font-bold text-red-500">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-300">
        {text}
      </p>
    </article>
  );
}

function InfoPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h3 className="text-2xl font-bold text-red-500">
        {title}
      </h3>

      <div className="mt-5 leading-7 text-zinc-300">
        {children}
      </div>
    </article>
  );
}

function MedicationCard({
  title,
  status,
  description,
}: {
  title: string;
  status: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-bold">
          {title}
        </h3>

        <span className="rounded-full border border-red-700 bg-red-950/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-300">
          {status}
        </span>
      </div>

      <p className="mt-4 leading-7 text-zinc-300">
        {description}
      </p>
    </article>
  );
}

function ProtocolChangeCard({
  section,
  title,
  changes,
}: {
  section: string;
  title: string;
  changes: string[];
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <span className="w-fit rounded-lg bg-red-600 px-4 py-2 text-sm font-bold">
          {section}
        </span>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>

          <ul className="mt-4 space-y-3">
            {changes.map((change) => (
              <li
                key={change}
                className="flex gap-3 leading-7 text-zinc-300"
              >
                <span className="font-bold text-red-500">
                  •
                </span>

                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function TrainingTopic({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black p-5">
      <p className="flex gap-3 font-semibold leading-7 text-zinc-200">
        <span className="text-red-500">
          ✓
        </span>

        <span>{text}</span>
      </p>
    </div>
  );
}