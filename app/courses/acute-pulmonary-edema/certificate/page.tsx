"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

export default function CertificatePage() {
  const [score, setScore] = useState("100%");

  useEffect(() => {
    const savedScore = localStorage.getItem("apeQuizScore");
    const savedTotal = localStorage.getItem("apeQuizTotal");

    if (savedScore && savedTotal) {
      const percent = Math.round((Number(savedScore) / Number(savedTotal)) * 100);
      setScore(`${percent}%`);
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-8 py-10 text-center">
        <div className="rounded-2xl border-4 border-red-600 bg-zinc-900 p-10">
          <img
            src="/grumpy-medic-logo.jpeg"
            alt="GrumpyMedic Logo"
            className="mx-auto h-28 w-28 rounded-full object-cover"
          />

          <p className="mt-8 text-sm font-bold uppercase tracking-widest text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-4 text-5xl font-extrabold">
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
              <p className="text-2xl font-bold">{score}</p>
            </div>

            <div className="rounded-xl border border-zinc-700 bg-black p-4">
              <p className="text-xs uppercase text-zinc-400">Course Time</p>
              <p className="text-2xl font-bold">30 Minutes</p>
            </div>

            <div className="rounded-xl border border-zinc-700 bg-black p-4">
              <p className="text-xs uppercase text-zinc-400">Date</p>
              <p className="text-2xl font-bold">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <div className="mx-auto h-px w-40 bg-zinc-400" />
              <p className="mt-2 text-sm text-zinc-400">Student</p>
            </div>

            <div>
              <div className="mx-auto h-px w-40 bg-zinc-400" />
              <p className="mt-2 text-sm text-zinc-400">GrumpyMedic Education</p>
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