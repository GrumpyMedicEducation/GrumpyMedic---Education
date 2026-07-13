"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function TraumaSimulator() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-widest text-red-500">
          GrumpyMedic Call Simulator
        </p>

        <h1 className="mt-2 text-5xl font-extrabold">
          Trauma
        </h1>

        <p className="mt-4 text-zinc-400 max-w-3xl">
          This interactive simulator is currently under development.
          Practice trauma assessments, bleeding control, shock recognition,
          spinal motion restriction decisions, and rapid transport.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="text-2xl font-bold text-red-500">
            Coming Soon
          </h2>

          <ul className="mt-4 space-y-2 text-zinc-300">
            <li>• MARCH Assessment</li>
            <li>• XABC Trauma Assessment</li>
            <li>• Hemorrhage Control</li>
            <li>• Tourniquet Use</li>
            <li>• Needle Decompression Decisions</li>
            <li>• Trauma Center Destination</li>
          </ul>
        </div>

        <Link
          href="/simulator"
          className="mt-8 inline-block rounded-lg bg-red-600 px-6 py-3 font-bold hover:bg-red-500"
        >
          ← Back to Simulator
        </Link>
      </div>
    </main>
  );
}