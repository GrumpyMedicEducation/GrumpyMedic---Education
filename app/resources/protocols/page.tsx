import Navbar from "../../components/Navbar";

export default function ProtocolsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-5xl font-extrabold text-red-500">
          State EMS Protocols
        </h1>

        <p className="mt-4 text-zinc-400">
          Access the official statewide EMS treatment protocols for the
          Northeast. These links are maintained by each state's EMS office to
          ensure you are always viewing the most current version.
        </p>

        <div className="mt-10 space-y-8">

          {/* Massachusetts */}
          <div className="rounded-xl border border-red-600 bg-zinc-900 p-6">
            <h2 className="text-3xl font-bold text-red-500">
              Massachusetts EMS Protocols
            </h2>

            <p className="mt-3 text-zinc-400">
              Official Massachusetts Statewide Treatment Protocols (Version
              2026.2).
            </p>

            <a
              href="https://www.mass.gov/doc/emergency-medical-services-statewide-treatment-protocols-version-20262-effective-august-17-2026/download"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
            >
              Open Massachusetts Protocols
            </a>
          </div>

          {/* New Hampshire */}
          <div className="rounded-xl border border-red-600 bg-zinc-900 p-6">
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
              className="mt-6 inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
            >
              Open New Hampshire Protocols
            </a>
          </div>

          {/* Maine */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-3xl font-bold text-zinc-300">
              Maine EMS Protocols
            </h2>

            <p className="mt-3 text-zinc-400">
              Maine EMS protocols will be added soon.
            </p>

            <button
              disabled
              className="mt-6 rounded-lg bg-zinc-700 px-6 py-3 text-zinc-300 cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}