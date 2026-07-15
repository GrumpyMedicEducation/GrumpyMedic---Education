"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../../components/Navbar";

const PASSING_SCORE = 80;

export default function HyperthermiaCertificatePage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name")?.trim() || "";
  const scoreValue = Number(searchParams.get("score") || "0");

  const score = Number.isFinite(scoreValue)
    ? Math.max(0, Math.min(100, scoreValue))
    : 0;

  const passed = score >= PASSING_SCORE;

  const [completionDate, setCompletionDate] = useState("");

  useEffect(() => {
    setCompletionDate(
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date())
    );
  }, []);

  function printCertificate() {
    window.print();
  }

  if (!name || !passed) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="print:hidden">
          <Navbar />
        </div>

        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-2xl border border-red-600 bg-zinc-900 p-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Certificate Unavailable
            </p>

            <h1 className="mt-4 text-4xl font-extrabold">
              Hyperthermia Course
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              A certificate is available after completing the Hyperthermia quiz
              with a score of {PASSING_SCORE}% or greater and entering your
              name.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/courses/hyperthermia/quiz"
                className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
              >
                Take the Quiz
              </Link>

              <Link
                href="/courses/hyperthermia"
                className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
              >
                Back to Course
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white print:bg-white print:text-black">
      <div className="print:hidden">
        <Navbar />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12 print:max-w-none print:p-0">
        <div className="mb-8 flex flex-col justify-between gap-4 print:hidden sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Hyperthermia Course
            </p>

            <h1 className="mt-2 text-3xl font-extrabold">
              Certificate of Completion
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={printCertificate}
              className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
            >
              Print Certificate
            </button>

            <Link
              href="/courses/hyperthermia"
              className="rounded-xl border border-zinc-600 px-6 py-3 text-center font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Back to Course
            </Link>
          </div>
        </div>

        <article className="relative overflow-hidden border-[10px] border-red-700 bg-white px-8 py-12 text-center text-black shadow-2xl print:min-h-[7.5in] print:border-[8px] print:shadow-none sm:px-16 sm:py-16">
          <div className="pointer-events-none absolute inset-4 border-2 border-zinc-800" />

          <div className="pointer-events-none absolute left-8 top-8 h-16 w-16 border-l-4 border-t-4 border-red-700" />
          <div className="pointer-events-none absolute right-8 top-8 h-16 w-16 border-r-4 border-t-4 border-red-700" />
          <div className="pointer-events-none absolute bottom-8 left-8 h-16 w-16 border-b-4 border-l-4 border-red-700" />
          <div className="pointer-events-none absolute bottom-8 right-8 h-16 w-16 border-b-4 border-r-4 border-red-700" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-red-700 sm:text-base">
              GrumpyMedic Education
            </p>

            <h2 className="mt-6 font-serif text-4xl font-bold uppercase tracking-wide sm:text-6xl">
              Certificate
            </h2>

            <p className="mt-3 font-serif text-xl italic text-zinc-700 sm:text-2xl">
              of Completion
            </p>

            <div className="mx-auto mt-8 h-1 w-40 bg-red-700" />

            <p className="mt-10 text-lg text-zinc-700 sm:text-xl">
              This certificate is proudly presented to
            </p>

            <p className="mx-auto mt-6 border-b-2 border-zinc-700 px-4 pb-3 font-serif text-4xl font-bold text-red-800 sm:text-5xl">
              {name}
            </p>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-700 sm:text-xl">
              for successfully completing the educational course
            </p>

            <h3 className="mt-5 font-serif text-3xl font-bold text-zinc-950 sm:text-4xl">
              Hyperthermia
            </h3>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-700 sm:text-lg">
              Recognition and Prehospital Management of Environmental and
              Exertional Heat Illness
            </p>

            <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
              <CertificateDetail
                label="Quiz Score"
                value={`${score}%`}
              />

              <CertificateDetail
                label="Completion Date"
                value={completionDate || "Loading"}
              />

              <CertificateDetail
                label="Course Status"
                value="Completed"
              />
            </div>

            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              <SignatureLine
                label="Course Participant"
                value={name}
              />

              <SignatureLine
                label="Training Provider"
                value="GrumpyMedic Education"
              />
            </div>

            <p className="mx-auto mt-12 max-w-3xl text-xs leading-5 text-zinc-500">
              This certificate documents completion of an educational course.
              It does not independently grant continuing-education credit,
              certification, licensure, or authorization to practice.
            </p>
          </div>
        </article>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-500 print:hidden">
          For the cleanest printed certificate, choose landscape orientation,
          use normal margins, and disable browser headers and footers in the
          print window.
        </div>
      </section>

      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0.35in;
          }

          html,
          body {
            background: white !important;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </main>
  );
}

function CertificateDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-zinc-400 bg-zinc-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-2 font-bold text-zinc-900">
        {value}
      </p>
    </div>
  );
}

function SignatureLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="min-h-8 font-serif text-xl font-bold text-zinc-900">
        {value}
      </p>

      <div className="mt-2 border-t-2 border-zinc-700 pt-2">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          {label}
        </p>
      </div>
    </div>
  );
}