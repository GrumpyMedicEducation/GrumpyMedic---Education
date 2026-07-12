import Navbar from "../../components/Navbar";

export default function StrokeSimulatorPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          GrumpyMedic Call Simulator
        </p>

        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          Stroke Simulator
        </h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          This interactive EMS scenario is currently under development.
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="text-2xl font-bold text-red-500">
            Coming Soon
          </h2>

          <p className="mt-3 text-zinc-400">
            Perform a focused neurologic assessment, calculate FAST-ED, identify
            large-vessel occlusion risk, and select the appropriate destination.
          </p>
        </div>
      </section>
    </main>
  );
}