import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ProtocolsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          GrumpyMedic Education
        </p>

        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          State EMS Protocols
        </h1>

        <p className="mt-5 max-w-3xl text-lg text-zinc-400">
          Direct access to official statewide EMS treatment protocols for
          Massachusetts, New Hampshire, and Maine.
        </p>

        <div className="mt-10 space-y-8">
          {/* Massachusetts */}
          <article className="rounded-xl border border-red-600 bg-zinc-900 p-6">
            <h2 className="text-3xl font-bold text-red-500">
              Massachusetts EMS Protocols
            </h2>

            <p className="mt-3 text-zinc-400">
              Official Massachusetts Statewide Treatment Protocols, Version
              2026.2, effective August 17, 2026.
            </p>

            <a
              href="https://www.mass.gov/doc/emergency-medical-services-statewide-treatment-protocols-version-20262-effective-august-17-2026/download"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Open Massachusetts Protocols
            </a>
          </article>

          {/* New Hampshire */}
          <article className="rounded-xl border border-red-600 bg-zinc-900 p-6">
            <h2 className="text-3xl font-bold text-red-500">
              New Hampshire EMS Protocols
            </h2>

            <p className="mt-3 text-zinc-400">
              Official New Hampshire Patient Care Protocols.
            </p>

            <a
              href="https://mm.nh.gov/files/uploads/fstems/documents/patient-care-protocols.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Open New Hampshire Protocols
            </a>
          </article>

          {/* Maine */}
          <article className="rounded-xl border border-red-600 bg-zinc-900 p-6">
            <h2 className="text-3xl font-bold text-red-500">
              Maine EMS Protocols
            </h2>

            <p className="mt-3 text-zinc-400">
              Official 2025 Maine EMS Prehospital Treatment Protocols.
            </p>

            <a
              href="https://www.maine.gov/ems/sites/maine.gov.ems/files/inline-files/2025-Maine-EMS-Prehospital-Protocols-20250906.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Open Maine Protocols
            </a>
          </article>
        </div>

        <section className="mt-10 rounded-xl border border-yellow-600 bg-yellow-950/30 p-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            Protocol Disclaimer
          </h2>

          <p className="mt-4 leading-7 text-zinc-300">
            These buttons link directly to official state publications. Always
            verify that you are using the current version and follow your local
            service policies, scope of practice, medical-director
            authorization, and current training.
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