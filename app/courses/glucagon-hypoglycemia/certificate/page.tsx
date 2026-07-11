"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

export default function GlucagonCertificatePage() {
  const [studentName, setStudentName] = useState("");
  const [certificateName, setCertificateName] =
    useState("Course Participant");
  const [score, setScore] = useState("80");
  const [completionDate, setCompletionDate] = useState("");

  useEffect(() => {
    const parameters = new URLSearchParams(window.location.search);
    const quizScore = parameters.get("score");

    if (quizScore) {
      setScore(quizScore);
    }

    setCompletionDate(
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  function updateCertificateName() {
    const cleanedName = studentName.trim();

    if (!cleanedName) {
      window.alert("Please enter the participant's full name.");
      return;
    }

    setCertificateName(cleanedName);
  }

  function printCertificate() {
    if (certificateName === "Course Participant") {
      window.alert(
        "Please enter the participant's name and select Update Certificate before printing."
      );
      return;
    }

    window.print();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <section className="mx-auto max-w-5xl px-6 py-10 print:hidden">
        <Link
          href="/courses/glucagon-hypoglycemia/quiz"
          className="font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Quiz
        </Link>

        <div className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <h1 className="text-3xl font-extrabold text-red-500">
            Glucagon Course Certificate
          </h1>

          <p className="mt-3 text-zinc-400">
            Enter the participant&apos;s full name, update the certificate, and
            then print or save it as a PDF.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              placeholder="Participant's full name"
              className="flex-1 rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
            />

            <button
              type="button"
              onClick={updateCertificateName}
              className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
            >
              Update Certificate
            </button>

            <button
              type="button"
              onClick={printCertificate}
              className="rounded-xl border border-red-500 px-6 py-3 font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Print Certificate
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12 print:max-w-none print:p-0">
        <div className="certificate relative overflow-hidden border-[12px] border-double border-zinc-800 bg-white px-10 py-14 text-center text-black shadow-2xl print:min-h-screen print:border-black print:shadow-none">
          <div className="absolute left-0 top-0 h-3 w-full bg-red-600" />
          <div className="absolute bottom-0 left-0 h-3 w-full bg-red-600" />

          <p className="text-sm font-bold uppercase tracking-[0.35em] text-red-700">
            GrumpyMedic Education
          </p>

          <h1 className="mt-6 text-5xl font-extrabold uppercase tracking-wide">
            Certificate of Completion
          </h1>

          <p className="mt-8 text-lg text-zinc-600">
            This certificate is presented to
          </p>

          <div className="mx-auto mt-5 max-w-3xl border-b-2 border-black pb-3">
            <p className="text-4xl font-bold italic text-red-700">
              {certificateName}
            </p>
          </div>

          <p className="mt-8 text-lg text-zinc-700">
            for successfully completing the educational course
          </p>

          <h2 className="mt-5 text-4xl font-extrabold">
            Glucagon for Hypoglycemia
          </h2>

          <p className="mt-3 text-xl font-semibold text-zinc-700">
            For EMT-Basic Providers
          </p>

          <p className="mx-auto mt-8 max-w-3xl leading-7 text-zinc-600">
            This course reviewed recognition and treatment of hypoglycemia,
            glucagon indications, contraindications, dosing, administration,
            airway precautions, reassessment, repeat dosing considerations, and
            continued patient care.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-300 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
                Quiz Score
              </p>

              <p className="mt-2 text-3xl font-extrabold text-red-700">
                {score}%
              </p>
            </div>

            <div className="rounded-xl border border-zinc-300 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
                Completion Date
              </p>

              <p className="mt-2 text-2xl font-bold">
                {completionDate || "________________"}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-10 sm:grid-cols-2">
            <div>
              <div className="border-b border-black pb-2 text-xl font-semibold">
                Lt. William Howard, NRP
              </div>

              <p className="mt-2 text-sm text-zinc-500">
                Course Instructor
              </p>
            </div>

            <div>
              <div className="border-b border-black pb-2 text-xl font-semibold">
                GrumpyMedic Education
              </div>

              <p className="mt-2 text-sm text-zinc-500">
                Education Provider
              </p>
            </div>
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-xs leading-5 text-zinc-500">
            This is an educational completion certificate only. It does not
            independently authorize medication administration or replace
            current state and local protocols, medical-director approval,
            manufacturer instructions, service training, or demonstrated
            competency requirements.
          </p>
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

          .certificate {
            break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
}