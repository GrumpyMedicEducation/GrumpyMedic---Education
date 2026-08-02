import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function MassachusettsProtocolUpdatePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <Link
            href="/announcements"
            className="text-sm font-semibold text-red-500 transition hover:text-red-400"
          >
            ← Back to Announcements
          </Link>
        </div>

        <article className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border border-red-500 px-3 py-1 text-sm font-semibold text-red-500">
              Protocol Update
            </span>

            <span className="text-sm text-zinc-400">
              Posted August 2, 2026
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-red-500 md:text-5xl">
            Massachusetts Statewide Treatment Protocols Version 2026.2
          </h1>

          <p className="mt-4 text-lg text-zinc-400">
            Massachusetts Office of Emergency Medical Services
          </p>

          <div className="mt-8 space-y-6 text-zinc-300">
            <p className="leading-7">
              The Massachusetts Department of Public Health, Office of
              Emergency Medical Services has released Version 2026.2 of the
              Massachusetts Statewide Treatment Protocols.
            </p>

            <p className="leading-7">
              This update includes changes to medication administration,
              provider scope of practice, allergic reaction and anaphylaxis
              treatment, respiratory care, cardiac arrest management, trauma
              care, obstetrical emergencies, blood administration, pediatric
              transport, refusal of medical care, and required ambulance
              medications.
            </p>
          </div>

          <section className="mt-10">
            <h2 className="text-3xl font-bold text-red-500">
              Important Protocol Changes
            </h2>

            <div className="mt-6 space-y-4">
              <UpdateCard
                title="Allergic Reaction and Anaphylaxis"
                description="First Responders may administer an epinephrine/surfactant nasal preparation. If the first dose is given by nasal spray and symptoms do not significantly improve within five minutes, all subsequent epinephrine doses must be administered by IM injection."
              />

              <UpdateCard
                title="Antihistamines"
                description="Cetirizine has been added for mild allergic reactions. Diphenhydramine, also known as Benadryl, has been removed from Protocol 2.2."
              />

              <UpdateCard
                title="Respiratory Distress"
                description="Adult indications and contraindications for BiPAP and CPAP have been added. BiPAP and CPAP are no longer indicated for pediatric patients of any age."
              />

              <UpdateCard
                title="Obstetrical Emergencies"
                description="The paramedic TXA dose has been changed to 2 grams IV push. The second TXA dose has been removed."
              />

              <UpdateCard
                title="Pain Management"
                description="Advanced EMTs may administer acetaminophen 650–1,000 mg IV."
              />

              <UpdateCard
                title="Cardiac Arrest"
                description="Advanced EMT standing orders now include epinephrine 1 mg IV/IO, using 10 mL of a 0.1 mg/mL solution, every three to five minutes."
              />

              <UpdateCard
                title="Vasopressin"
                description="Vasopressin has been removed from the optional medication list for paramedic-level ambulances."
              />

              <UpdateCard
                title="Burn Management"
                description="Fluid administration language for Advanced EMTs treating adult and pediatric patients with 20% body-surface-area burns now specifies administration per hour."
              />

              <UpdateCard
                title="Multisystem Trauma"
                description="The adult paramedic TXA dose has been changed to 2 grams IV push. A pediatric TXA dose has also been added to the traumatic cardiac arrest protocol."
              />

              <UpdateCard
                title="Ultrasound"
                description="Properly authorized and trained paramedics may perform abdominal and pulmonary ultrasound scans. These scans must not delay transportation or other diagnostic or therapeutic care."
              />

              <UpdateCard
                title="Buprenorphine"
                description="The Clinical Opiate Withdrawal Scale requirement has been updated to COWS greater than or equal to eight."
              />

              <UpdateCard
                title="Pediatric Transport"
                description="The protocol contains updated terminology, definitions, and guidance for approved neonatal and infant transport devices attached directly to the ambulance stretcher."
              />

              <UpdateCard
                title="Refusal of Medical Care"
                description="Medical Control should be contacted when EMS personnel have concerns about whether a refusal is appropriate."
              />

              <UpdateCard
                title="Required Ambulance Medications"
                description="Oral liquid or tablet diphenhydramine is now optional for basic-level ambulances. IV diphenhydramine is no longer required or optional. Cetirizine has been added as an optional replacement."
              />

              <UpdateCard
                title="Advanced-Level Ambulances"
                description="Epinephrine 1 mg in 10 mL is now a required medication."
              />
            </div>
          </section>

          <section className="mt-10 rounded-xl border border-red-500 bg-black p-6">
            <h2 className="text-2xl font-bold text-red-500">
              Training Requirement
            </h2>

            <p className="mt-3 leading-7 text-zinc-300">
              Ambulance and Emergency First Response services must train their
              EMS personnel on the updated protocols and ensure that their
              services are appropriately equipped before implementing the
              changes.
            </p>
          </section>

          <section className="mt-10 rounded-xl border border-zinc-700 bg-zinc-950 p-6">
            <h2 className="text-2xl font-bold text-red-500">
              Review the Complete Protocols
            </h2>

            <p className="mt-3 leading-7 text-zinc-400">
              EMS providers should review the complete official protocol
              document and follow their service-level training and
              implementation requirements.
            </p>

            <a
              href="https://www.mass.gov/doc/emergency-medical-services-statewide-treatment-protocols-version-20262-effective-september-1-2026-0/download"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
            >
              Download the 2026.2 Statewide Treatment Protocols
            </a>
          </section>

          <footer className="mt-10 border-t border-zinc-700 pt-6 text-sm leading-6 text-zinc-500">
            <p>
              Source: Massachusetts Department of Public Health, Office of
              Emergency Medical Services.
            </p>

            <p className="mt-2">
              This announcement is provided for educational purposes. EMS
              personnel should follow the official Massachusetts Statewide
              Treatment Protocols, service policies, medical direction, and
              required training.
            </p>
          </footer>
        </article>
      </section>
    </main>
  );
}

function UpdateCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-black p-5 transition hover:border-red-500">
      <h3 className="text-xl font-bold text-red-500">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-400">
        {description}
      </p>
    </div>
  );
}