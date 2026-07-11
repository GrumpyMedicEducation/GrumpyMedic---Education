"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

export default function AcutePulmonaryEdemaCertificatePage() {
  const [studentName, setStudentName] = useState("");
  const [certificateName, setCertificateName] =
    useState("Course Participant");
  const [score, setScore] = useState("80");
  const [completionDate, setCompletionDate] = useState("");
  const [certificateId, setCertificateId] = useState("");

  useEffect(() => {
    const parameters = new URLSearchParams(window.location.search);
    const quizScore = parameters.get("score");

    if (quizScore) {
      setScore(quizScore);
    }

    const now = new Date();

    setCompletionDate(
      now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );

    const datePart = now
      .toISOString()
      .slice(0, 10)
      .replaceAll("-", "");

    const randomPart = Math.floor(10000 + Math.random() * 90000);

    setCertificateId(`GME-APE-${datePart}-${randomPart}`);
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
        "Enter the participant's name and select Update Certificate before printing."
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

      <section className="mx-auto max-w-6xl px-6 py-10 print:hidden">
        <Link
          href="/courses/acute-pulmonary-edema"
          className="font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Course
        </Link>

        <div className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <h1 className="text-3xl font-extrabold text-red-500">
            Acute Pulmonary Edema Certificate
          </h1>

          <p className="mt-3 text-zinc-400">
            Enter the participant&apos;s full name, update the certificate,
            then print it or save it as a PDF.
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
              Print / Save PDF
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 print:max-w-none print:p-0">
        <div className="certificate relative overflow-hidden border-[12px] border-double border-red-700 bg-white px-10 py-12 text-center text-black shadow-2xl print:min-h-screen print:shadow-none">
          <div className="absolute left-0 top-0 h-3 w-full bg-red-700" />
          <div className="absolute bottom-0 left-0 h-3 w-full bg-red-700" />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <div className="flex h-[430px] w-[430px] items-center justify-center rounded-full border-[20px] border-black">
              <span className="rotate-[-18deg] text-8xl font-black">
                GRUMPYMEDIC
              </span>
            </div>
          </div>

          <div className="relative z-10">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-red-700 bg-zinc-950 text-white">
              <div>
                <p className="text-2xl font-black text-red-500">GME</p>
                <p className="text-[9px] font-bold uppercase tracking-wide">
                  Education
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.35em] text-red-700">
              GrumpyMedic Education
            </p>

            <h1 className="mt-5 text-5xl font-extrabold uppercase tracking-wide">
              Certificate of Completion
            </h1>

            <p className="mt-7 text-lg text-zinc-600">
              This certificate is presented to
            </p>

            <div className="mx-auto mt-4 max-w-3xl border-b-2 border-black pb-3">
              <p className="text-4xl font-bold italic text-red-700">
                {certificateName}
              </p>
            </div>

            <p className="mt-7 text-lg text-zinc-700">
              for successfully completing
            </p>

            <h2 className="mt-4 text-4xl font-extrabold">
              Acute Pulmonary Edema
            </h2>

            <p className="mt-3 text-xl font-semibold text-zinc-700">
              Recognition, CPAP, Nitroglycerin Considerations, Reassessment,
              and EMS Treatment Priorities
            </p>

            <div className="mx-auto mt-9 grid max-w-4xl gap-4 sm:grid-cols-4">
              <CertificateDetail label="Score" value={`${score}%`} />

              <CertificateDetail
                label="Completion Date"
                value={completionDate || "Pending"}
              />

              <CertificateDetail
                label="Training Time"
                value="1.0 Hour"
              />

              <CertificateDetail
                label="Certificate ID"
                value={certificateId || "Generating"}
                small
              />
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-10 sm:grid-cols-2">
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

            <p className="mx-auto mt-10 max-w-4xl text-xs leading-5 text-zinc-500">
              This certificate documents completion of an educational training
              activity. It does not independently provide continuing-education
              credit unless separately approved, and it does not replace
              current protocols, medical-director authorization, service
              training, or demonstrated competency requirements.
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0.25in;
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

function CertificateDetail({
  label,
  value,
  small = false,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-xl border border-zinc-300 bg-white/90 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-2 font-extrabold text-red-700 ${
          small ? "break-all text-sm" : "text-xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
}