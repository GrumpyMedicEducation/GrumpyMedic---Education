"use client";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

export default function CertificatePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-8 py-10">
        <div className="rounded-2xl border-4 border-red-600 bg-zinc-900 p-10 text-center shadow-2xl">
          <img
            src="/grumpy-medic-logo.jpeg"
            alt="GrumpyMedic Logo"
            className="mx-auto h-28 w-28 rounded-full border-2 border-red-500 object-cover"
          />

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.35em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-6 text-5xl font-extrabold">
            Certificate of Completion
          </h1>

          <p className="mt-8 text-xl text-zinc-300">
            This certifies that
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white">
            William Howard
          </h2>

          <p className="mt-8 text-xl text-zinc-300">
            has successfully completed
          </p>

          <h3 className="mt-4 text-3xl font-bold text-red-500">
            Acute Pulmonary Edema
          </h3>

          <p className="mt-2 text-xl text-zinc-300">
            Recognition, CPAP, IV/IO Nitroglycerin Therapy, and EMS Treatment Priorities
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-700 bg-black p-4">
              <p className="text-xs uppercase text-zinc-400">Score</p>
              <p className="text-2xl font-bold">80%</p>
            </div>

            <div className="rounded-xl border border-zinc-700 bg-black p-4">
              <p className="text-xs uppercase text-zinc-400">Course Time</p>
              <p className="text-2xl font-bold">30 Minutes</p>
            </div>

            <div className="rounded-xl border border-zinc-700 bg-black p-4">
              <p className="text-xs uppercase text-zinc-400">Date</p>
              <p className="text-2xl font-bold">July 8, 2026</p>
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-16">
            <div>
              <div className="border-t border-zinc-500 px-10 pt-3">
                Student
              </div>
            </div>

            <div>
              <div className="border-t border-zinc-500 px-10 pt-3">
                GrumpyMedic Education
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
          >
            Print Certificate
          </button>

          <Link
            href="/courses/acute-pulmonary-edema"
            className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold hover:bg-zinc-900"
          >
            Return to Course
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold hover:bg-zinc-900"
          >
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}