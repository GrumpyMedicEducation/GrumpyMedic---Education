"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function StrokeSimulator() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-widest text-red-500">
          GrumpyMedic Call Simulator
        </p>

        <h1 className="mt-2 text-5xl font-extrabold">
          Stroke
        </h1>

        <p className="mt-4 text-zinc-400 max-w-3xl">
          This interactive simulator is currently under development.
          Learn to identify strokes, complete stroke scales, determine
          last-known-well times, and rapidly transport patients to the
          appropriate stroke center.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="text-2xl font-bold text-red-500">
            Coming Soon
          </h2>

          <ul className="mt-4 space-y-2 text-zinc-300">
            <li>• FAST-ED Assessment</li>
            <li>• Cincinnati Stroke Scale</li>
            <li>• Large Vessel Occlusion Recognition</li>
            <li>• Blood Glucose Assessment</li>
            <li>• Last Known Well</li>
            <li>• Stroke Center Decisions</li>
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