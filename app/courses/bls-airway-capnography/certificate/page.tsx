"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { supabase } from "../../../../lib/supabase/client";

const COURSE_SLUG = "bls-airway-capnography";

type CertificateRecord = {
  id: string;
  enrollment_id: string;
  certificate_number: string;
  student_name: string;
  course_title: string;
  completion_date: string;
  actual_course_hours: number | string;
  oems_approval_number: string | null;
  final_score: number | string;
};

type PageStatus =
  | "loading"
  | "signed-out"
  | "locked"
  | "ready"
  | "error";

export default function BLSAirwayCapnographyCertificatePage() {
  const [status, setStatus] = useState<PageStatus>("loading");
  const [certificate, setCertificate] =
    useState<CertificateRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const loadCertificate = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error(userError.message);
      }

      if (!user) {
        setStatus("signed-out");
        return;
      }

      const {
        data: enrollmentId,
        error: enrollmentError,
      } = await supabase.rpc("enroll_in_course", {
        requested_course_slug: COURSE_SLUG,
      });

      if (enrollmentError) {
        throw new Error(enrollmentError.message);
      }

      if (!enrollmentId || typeof enrollmentId !== "string") {
        throw new Error(
          "Your course enrollment could not be confirmed.",
        );
      }

      const {
        data: verifiedCompletion,
        error: verificationError,
      } = await supabase.rpc("verify_course_completion", {
        requested_enrollment_id: enrollmentId,
      });

      if (verificationError) {
        throw new Error(verificationError.message);
      }

      if (verifiedCompletion !== true) {
        setStatus("locked");
        return;
      }

      const {
        error: certificateIssueError,
      } = await supabase.rpc("issue_course_certificate", {
        requested_enrollment_id: enrollmentId,
      });

      if (certificateIssueError) {
        throw new Error(certificateIssueError.message);
      }

      const {
        data: certificateData,
        error: certificateError,
      } = await supabase
        .from("course_certificates")
        .select(
          [
            "id",
            "enrollment_id",
            "certificate_number",
            "student_name",
            "course_title",
            "completion_date",
            "actual_course_hours",
            "oems_approval_number",
            "final_score",
          ].join(","),
        )
        .eq("enrollment_id", enrollmentId)
        .maybeSingle();

      if (certificateError) {
        throw new Error(certificateError.message);
      }

      if (!certificateData) {
        throw new Error(
          "The course is verified, but no official certificate record was found.",
        );
      }

      setCertificate(
        certificateData as unknown as CertificateRecord,
      );
      setStatus("ready");
    } catch (error) {
      console.error("Unable to load certificate:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The certificate could not be loaded.",
      );

      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadCertificate();
  }, [loadCertificate]);

  function printCertificate() {
    window.print();
  }

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

          <h1 className="mt-6 text-3xl font-extrabold">
            Verifying Certificate Eligibility
          </h1>

          <p className="mt-3 text-zinc-400">
            Checking active course time, assessment result,
            attestation, and official completion status.
          </p>
        </section>
      </main>
    );
  }

  if (status === "signed-out") {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-2xl border border-red-800 bg-red-950/20 p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
              Sign In Required
            </p>

            <h1 className="mt-3 text-3xl font-extrabold">
              Log In to View Your Certificate
            </h1>

            <p className="mt-4 leading-7 text-zinc-300">
              Your certificate can only be displayed after your
              verified course completion record is matched to your
              account.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
              >
                Log In
              </Link>

              <Link
                href={`/courses/${COURSE_SLUG}`}
                className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
              >
                Return to Course
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (status === "locked") {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-2xl border border-red-800 bg-zinc-950 p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
              Certificate Locked
            </p>

            <h1 className="mt-3 text-3xl font-extrabold">
              Course Requirements Are Not Yet Complete
            </h1>

            <p className="mt-4 leading-7 text-zinc-300">
              The certificate will only be issued after the
              server verifies all required active course time,
              a passing assessment, and the electronic
              attestation.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href={`/courses/${COURSE_SLUG}`}
                className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
              >
                Return to Course
              </Link>

              <Link
                href="/dashboard"
                className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (status === "error" || !certificate) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-2xl border border-red-800 bg-red-950/20 p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
              Certificate Error
            </p>

            <h1 className="mt-3 text-3xl font-extrabold">
              The Certificate Could Not Be Verified
            </h1>

            <p className="mt-4 leading-7 text-zinc-300">
              {errorMessage ||
                "No official certificate record was found."}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => void loadCertificate()}
                className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
              >
                Try Again
              </button>

              <Link
                href={`/courses/${COURSE_SLUG}`}
                className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
              >
                Return to Course
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const completionDate = new Date(
    `${certificate.completion_date}T00:00:00`,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const score = Number(certificate.final_score);
  const courseHours = Number(certificate.actual_course_hours);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-10 print:hidden">
        <Link
          href={`/courses/${COURSE_SLUG}`}
          className="font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Course
        </Link>

        <div className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <h1 className="text-3xl font-extrabold text-red-500">
            Official Course Certificate
          </h1>

          <p className="mt-3 text-zinc-400">
            This certificate was generated from the verified
            course-completion record stored in Supabase.
          </p>

          <button
            type="button"
            onClick={printCertificate}
            className="mt-6 rounded-xl border border-red-500 px-6 py-3 font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            Print Certificate
          </button>
        </div>
      </section>

      <section className="certificate-print-area mx-auto max-w-6xl px-6 pb-12 print:max-w-none print:p-0">
        <div className="certificate relative overflow-hidden border-[12px] border-double border-red-700 bg-white px-10 py-12 text-center text-black shadow-2xl print:shadow-none">
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
                <p className="text-2xl font-black text-red-500">
                  GME
                </p>

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
                {certificate.student_name}
              </p>
            </div>

            <p className="mt-7 text-lg text-zinc-700">
              for successfully completing
            </p>

            <h2 className="mt-4 text-4xl font-extrabold">
              {certificate.course_title}
            </h2>

            <p className="mt-3 text-xl font-semibold text-zinc-700">
              Supraglottic Airway Use, iGel Placement, Ventilation,
              Waveform Capnography, ETCO₂ Interpretation, and
              Airway Troubleshooting
            </p>

            <div className="mx-auto mt-9 grid max-w-5xl gap-4 sm:grid-cols-5">
              <CertificateDetail
                label="Score"
                value={`${Number.isFinite(score) ? score : 0}%`}
              />

              <CertificateDetail
                label="Completion Date"
                value={completionDate}
              />

              <CertificateDetail
                label="Training Time"
                value={`${Number.isFinite(courseHours) ? courseHours : 1} Hour${
                  courseHours === 1 ? "" : "s"
                }`}
              />

              <CertificateDetail
                label="Certificate ID"
                value={certificate.certificate_number}
                small
              />

              <CertificateDetail
                label="OEMS Approval"
                value={
                  certificate.oems_approval_number ||
                  "Not assigned"
                }
                small
              />
            </div>

            <div className="mx-auto mt-12 max-w-md">
              <div className="border-b border-black pb-2 text-xl font-semibold">
                William Howard, NRP
              </div>

              <p className="mt-2 text-sm text-zinc-500">
                Course Instructor
              </p>
            </div>

            <p className="mx-auto mt-10 max-w-4xl text-xs leading-5 text-zinc-500">
              This certificate documents completion of an
              educational training activity. It does not
              independently provide continuing-education credit
              unless separately approved, and it does not
              replace current protocols, medical-director
              authorization, service training, or demonstrated
              competency requirements.
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media print {
          @page {
            size: letter landscape;
            margin: 0;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            width: 11in;
            height: 8.5in;
            overflow: hidden !important;
          }

          body * {
            visibility: hidden !important;
          }

          .certificate-print-area,
          .certificate-print-area * {
            visibility: visible !important;
          }

          .certificate-print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 11in !important;
            height: 8.5in !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }

          .certificate {
            width: 11in !important;
            height: 8.5in !important;
            margin: 0 !important;
            padding: 0.35in 0.45in !important;
            box-sizing: border-box !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            box-shadow: none !important;
          }

          .certificate .mt-5 {
            margin-top: 0.8rem !important;
          }

          .certificate .mt-7 {
            margin-top: 1rem !important;
          }

          .certificate .mt-9 {
            margin-top: 1.2rem !important;
          }

          .certificate .mt-10 {
            margin-top: 1.2rem !important;
          }

          .certificate .mt-12 {
            margin-top: 1.35rem !important;
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
    <div className="rounded-xl border border-zinc-300 bg-zinc-50 p-4">
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