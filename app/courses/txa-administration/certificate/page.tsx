"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "../../../components/Navbar";

function TXACertificateContent() {
  const searchParams = useSearchParams();

  const scoreFromUrl = Number(searchParams.get("score") ?? 0);
  const validScore = Number.isFinite(scoreFromUrl)
    ? Math.min(Math.max(scoreFromUrl, 0), 100)
    : 0;

  const [studentName, setStudentName] = useState("");

  const completionDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  }, []);

  const passed = validScore >= 80;

  function printCertificate() {
    window.print();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <section className="print:hidden border-b border-red-900 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            TXA Administration Certificate
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            Enter the learner&apos;s name, review the quiz score, and print the
            completion certificate.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 print:max-w-none print:p-0">
        {!passed ? (
          <div className="mx-auto max-w-3xl rounded-2xl border border-red-700 bg-red-950/20 p-8 text-center print:hidden">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
              Certificate Locked
            </p>

            <h2 className="mt-4 text-3xl font-extrabold">
              A Passing Score Is Required
            </h2>

            <p className="mt-4 leading-7 text-zinc-300">
              A score of 80% or higher is required before the TXA Administration
              certificate can be issued.
            </p>

            <p className="mt-4 text-xl font-bold text-red-400">
              Current score: {validScore}%
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/courses/txa-administration/quiz"
                className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
              >
                Return to Quiz
              </Link>

              <Link
                href="/courses/txa-administration"
                className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
              >
                Return to Course
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-zinc-700 bg-zinc-900 p-6 print:hidden">
              <label
                htmlFor="studentName"
                className="block text-lg font-bold text-white"
              >
                Learner Name
              </label>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Enter the name exactly as it should appear on the certificate.
              </p>

              <input
                id="studentName"
                type="text"
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
                placeholder="Enter full name"
                className="mt-4 w-full rounded-xl border border-zinc-600 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
              />
            </div>

            <div className="certificate-page mx-auto max-w-5xl bg-white p-4 text-black print:max-w-none print:p-0">
              <div className="relative overflow-hidden border-[12px] border-red-800 bg-white px-8 py-12 text-center shadow-2xl print:min-h-[7.5in] print:border-[10px] print:shadow-none sm:px-14 sm:py-16">
                <div className="absolute inset-4 border-2 border-black" />
                <div className="absolute inset-7 border border-red-800" />

                <div className="relative z-10">
                  <p className="text-sm font-bold uppercase tracking-[0.35em] text-red-800 sm:text-base">
                    GrumpyMedic Education
                  </p>

                  <h1 className="mt-8 text-4xl font-extrabold uppercase tracking-wide sm:text-6xl">
                    Certificate of Completion
                  </h1>

                  <p className="mt-8 text-lg text-zinc-700 sm:text-xl">
                    This certificate is presented to
                  </p>

                  <div className="mx-auto mt-6 max-w-3xl border-b-2 border-black px-4 pb-3">
                    <p className="min-h-12 text-3xl font-bold italic text-red-800 sm:text-5xl">
                      {studentName.trim() || "Learner Name"}
                    </p>
                  </div>

                  <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-700 sm:text-xl">
                    for successfully completing the educational course
                  </p>

                  <h2 className="mt-5 text-3xl font-extrabold text-red-800 sm:text-5xl">
                    TXA Administration
                  </h2>

                  <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-700 sm:text-lg">
                    This course reviewed tranexamic acid indications, adult
                    dosing, multisystem trauma, obstetrical hemorrhage,
                    administration safety, monitoring, documentation, and
                    Massachusetts protocol considerations.
                  </p>

                  <div className="mx-auto mt-10 grid max-w-3xl gap-8 sm:grid-cols-3">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-zinc-600">
                        Completion Date
                      </p>

                      <p className="mt-2 text-lg font-bold">
                        {completionDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-zinc-600">
                        Final Score
                      </p>

                      <p className="mt-2 text-lg font-bold">
                        {validScore}%
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-zinc-600">
                        Passing Score
                      </p>

                      <p className="mt-2 text-lg font-bold">
                        80%
                      </p>
                    </div>
                  </div>

                  <div className="mx-auto mt-12 grid max-w-3xl gap-10 sm:grid-cols-2">
                    <div>
                      <div className="border-b border-black pb-2 font-bold">
                        GrumpyMedic Education
                      </div>

                      <p className="mt-2 text-sm text-zinc-600">
                        Educational Provider
                      </p>
                    </div>

                    <div>
                      <div className="border-b border-black pb-2 font-bold">
                        {completionDate}
                      </div>

                      <p className="mt-2 text-sm text-zinc-600">
                        Date Issued
                      </p>
                    </div>
                  </div>

                  <p className="mx-auto mt-10 max-w-4xl text-xs leading-5 text-zinc-500">
                    This certificate documents completion of an independent
                    educational activity. It does not independently grant
                    continuing-education credit, certification, authorization,
                    or expanded scope of practice.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-4 print:hidden sm:flex-row">
              <button
                type="button"
                onClick={printCertificate}
                disabled={!studentName.trim()}
                className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
              >
                Print Certificate
              </button>

              <Link
                href="/courses/txa-administration/quiz"
                className="rounded-xl border border-red-600 px-7 py-4 text-center font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
              >
                Retake Quiz
              </Link>

              <Link
                href="/courses/txa-administration"
                className="rounded-xl border border-zinc-600 px-7 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
              >
                Return to Course
              </Link>
            </div>

            {!studentName.trim() && (
              <p className="mt-4 text-center text-sm text-yellow-400 print:hidden">
                Enter the learner&apos;s name before printing.
              </p>
            )}
          </>
        )}
      </section>

      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0.3in;
          }

          html,
          body {
            background: white !important;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .certificate-page {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}

export default function TXACertificatePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          <p className="text-lg text-zinc-300">
            Loading certificate...
          </p>
        </main>
      }
    >
      <TXACertificateContent />
    </Suspense>
  );
}