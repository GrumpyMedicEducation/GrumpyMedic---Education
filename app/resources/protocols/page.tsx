import Link from "next/link";
import Navbar from "../../components/Navbar";

const massProtocolsUrl =
  "https://www.mass.gov/doc/emergency-medical-services-statewide-treatment-protocols-version-20262-effective-august-17-2026/download";

const nhProtocolsUrl =
  "/protocols/nh-patient-care-protocols-v9-3.pdf";

export default function ProtocolsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          GrumpyMedic Education
        </p>

        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          State EMS Protocols
        </h1>

        <p className="mt-5 max-w-3xl text-lg text-zinc-300">
          Quick access to official statewide EMS treatment protocols for
          Massachusetts and New Hampshire.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-red-600 bg-zinc-900 p-8 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-wider text-red-500">
              Massachusetts
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              Massachusetts EMS Statewide Treatment Protocols
            </h2>

            <div className="mt-6 space-y-2 text-zinc-300">
              <p>
                <strong>Version:</strong> 2026.2
              </p>

              <p>
                <strong>Effective:</strong> August 17, 2026
              </p>

              <p>
                Official protocols published by the Massachusetts Office of
                Emergency Medical Services.
              </p>
            </div>

            <a
              href={massProtocolsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-500"
            >
              Open Massachusetts Protocols
            </a>
          </article>

          <article className="rounded-2xl border border-emerald-600 bg-zinc-900 p-8 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              New Hampshire
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              New Hampshire Patient Care Protocols
            </h2>

            <div className="mt-6 space-y-2 text-zinc-300">
              <p>
                <strong>Version:</strong> 9.3
              </p>

              <p>
                <strong>Effective:</strong> November 7, 2025
              </p>

              <p>
                Official patient-care protocols for New Hampshire prehospital
                providers, including EMR, EMT, AEMT, Paramedic, and Extended
                Care guidance.
              </p>
            </div>

            <a
              href={nhProtocolsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white transition hover:bg-emerald-600"
            >
              Open New Hampshire Protocols
            </a>
          </article>
        </div>

        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
          <h2 className="text-2xl font-bold text-red-500">
            Important Notice
          </h2>

          <p className="mt-4 leading-7 text-zinc-300">
            GrumpyMedic Education is an independent educational resource.
            Always verify that you are using the latest official protocol
            version and follow your service policies, scope of practice,
            medical director authorization, and current training.
          </p>
        </section>

        <div className="mt-10">
          <Link
            href="/resources"
            className="font-bold text-red-500 transition hover:text-red-400"
          >
            ← Back to Resources
          </Link>
        </div>
      </section>
    </main>
  );
}