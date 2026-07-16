"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../../components/Navbar";

export default function BLSAirwayCertificatePage() {
  return (
    <Suspense fallback={<CertificateLoading />}>
      <CertificateContent />
    </Suspense>
  );
}

function CertificateContent() {
  const searchParams = useSearchParams();

  const [completionDate, setCompletionDate] = useState("");

  const studentName =
    searchParams.get("name")?.trim() || "Course Participant";

  const scoreValue = Number(searchParams.get("score"));
  const score =
    Number.isFinite(scoreValue) && scoreValue >= 0 && scoreValue <= 100
      ? Math.round(scoreValue)
      : 0;

  const passed = score >= 80;

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());

    setCompletionDate(formattedDate);
  }, []);

  function printCertificate() {
    window.print();
  }

  if (!passed) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-4 text-4xl font-extrabold">
            Certificate Not Available
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            A score of 80% or greater is required to receive the BLS Airway &
            Capnography certificate.
          </p>

          <p className="mt-4 text-2xl font-bold text-red-400">
            Recorded score: {score}%
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/courses/bls-airway-capnography/quiz"
              className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
            >
              Retake Quiz
            </Link>

            <Link
              href="/courses/bls-airway-capnography"
              className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Back to Course
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white print:bg-white print:text-black">
      <div className="print:hidden">
        <Navbar />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 print:max-w-none print:px-0 print:py-0">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center print:hidden">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Course Certificate
            </p>

            <h1 className="mt-2 text-3xl font-extrabold">
              BLS Airway & Capnography
            </h1>
          </div>

          <button
            type="button"
            onClick={printCertificate}
            className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
          >
            Print Certificate
          </button>
        </div>

        <section className="relative overflow-hidden rounded-3xl border-8 border-double border-red-700 bg-white text-black shadow-2xl print:min-h-[7.5in] print:rounded-none print:border-[10px] print:shadow-none">
          <div className="absolute inset-4 rounded-2xl border-2 border-zinc-900 print:inset-3 print:rounded-none" />

          <div className="relative px-8 py-12 text-center sm:px-14 sm:py-16 print:px-16 print:py-14">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-red-700 bg-black text-4xl font-extrabold text-red-500 print:h-20 print:w-20">
              GM
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.35em] text-red-700">
              GrumpyMedic Education
            </p>

            <h2 className="mt-5 font-serif text-4xl font-bold sm:text-6xl print:text-5xl">
              Certificate of Completion
            </h2>

            <p className="mt-8 text-lg text-zinc-700 sm:text-xl">
              This certificate is proudly presented to
            </p>

            <div className="mx-auto mt-6 max-w-3xl border-b-2 border-zinc-900 px-4 pb-3">
              <p className="font-serif text-3xl font-bold text-red-700 sm:text-5xl print:text-4xl">
                {studentName}
              </p>
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-700">
              for successfully completing the
            </p>

            <h3 className="mt-4 text-3xl font-extrabold sm:text-4xl print:text-3xl">
              BLS Airway & Capnography Course
            </h3>

            <p className="mx-auto mt-6 max-w-4xl text-base leading-7 text-zinc-700 sm:text-lg">
              This course reviewed EMT-level supraglottic airway use, iGel
              sizing and insertion, airway confirmation, ventilation,
              waveform capnography, ETCO₂ interpretation, CPR monitoring,
              troubleshooting, and documentation.
            </p>

            <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
              <CertificateDetail
                label="Completion Date"
                value={completionDate || "Loading..."}
              />

              <CertificateDetail
                label="Quiz Score"
                value={`${score}%`}
              />

              <CertificateDetail
                label="Passing Standard"
                value="80%"
              />
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-10 sm:grid-cols-2">
              <SignatureLine
                label="Course Instructor / Training Officer"
              />

              <SignatureLine
                label="Medical Director / Department Representative"
              />
            </div>

            <div className="mt-12 border-t border-zinc-300 pt-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700">
                Real EMS. Real Critical Thinking.
              </p>

              <p className="mt-3 text-xs leading-5 text-zinc-600">
                This certificate documents completion of an educational course.
                It does not independently authorize clinical practice or replace
                current statewide protocols, manufacturer instructions, agency
                training, local medical direction, or provider credentialing.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row print:hidden">
          <button
            type="button"
            onClick={printCertificate}
            className="rounded-xl bg-red-600 px-7 py-4 text-center font-bold transition hover:bg-red-500"
          >
            Print Certificate
          </button>

          <Link
            href="/courses/bls-airway-capnography/quiz"
            className="rounded-xl border border-zinc-600 px-7 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
          >
            Retake Quiz
          </Link>

          <Link
            href="/courses/bls-airway-capnography"
            className="rounded-xl border border-zinc-600 px-7 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
          >
            Back to Course
          </Link>

          <Link
            href="/courses"
            className="rounded-xl border border-zinc-600 px-7 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
          >
            All Courses
          </Link>
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
    <div className="rounded-xl border border-zinc-300 bg-zinc-50 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-extrabold text-zinc-900">
        {value}
      </p>
    </div>
  );
}

function SignatureLine({ label }: { label: string }) {
  return (
    <div>
      <div className="h-12 border-b-2 border-zinc-800" />

      <p className="mt-3 text-sm font-semibold text-zinc-600">
        {label}
      </p>
    </div>
  );
}

function CertificateLoading() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          GrumpyMedic Education
        </p>

        <h1 className="mt-4 text-4xl font-extrabold">
          Preparing Certificate
        </h1>

        <p className="mt-5 text-lg text-zinc-300">
          Loading learner information and completion results...
        </p>
      </section>
    </main>
  );
}