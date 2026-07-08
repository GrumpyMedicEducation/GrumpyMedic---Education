import Navbar from "../components/Navbar";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <h1 className="text-5xl font-extrabold">EMS Resources</h1>

        <p className="mt-3 text-zinc-400">
          Quick reference tools and official EMS resources.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <a
            href="https://www.mass.gov/lists/emergency-medical-services-statewide-treatment-protocols"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 hover:border-red-500"
          >
            <h2 className="text-2xl font-bold text-red-500">
              Massachusetts OEMS Protocols
            </h2>
            <p className="mt-3 text-zinc-400">
              Official Massachusetts statewide EMS treatment protocols.
            </p>
          </a>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 opacity-70">
            <h2 className="text-2xl font-bold">Medication Reference</h2>
            <p className="mt-3 text-zinc-400">Coming soon.</p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 opacity-70">
            <h2 className="text-2xl font-bold">ECG Library</h2>
            <p className="mt-3 text-zinc-400">Coming soon.</p>
          </div>
        </div>
      </section>
    </main>
  );
}