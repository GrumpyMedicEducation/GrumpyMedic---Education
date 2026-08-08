"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { supabase } from "../../../../lib/supabase/client";

const COURSE_SLUG = "bradycardia";
const COURSE_TITLE = "Adult & Pediatric Bradycardia";

type CertificateRecord = {
  id: string;
  certificate_number: string | null;
  issued_at: string | null;
};

export default function BradycardiaCertificatePage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [certificate, setCertificate] =
    useState<CertificateRecord | null>(null);
  const [studentName, setStudentName] = useState("");
  const [emtNumber, setEmtNumber] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCertificate() {
      setLoading(true);
      setErrorMessage("");

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          throw new Error(
            "You must be logged in to view this certificate.",
          );
        }

        const {
          data: enrollmentData,
          error: enrollmentError,
        } = await supabase.rpc("enroll_in_course", {
          requested_course_slug: COURSE_SLUG,
        });

        if (
          enrollmentError ||
          !enrollmentData ||
          typeof enrollmentData !== "string"
        ) {
          throw new Error(
            enrollmentError?.message ??
              "Your course enrollment could not be verified.",
          );
        }

        const enrollmentId = enrollmentData;

        const {
          data: completionData,
          error: completionError,
        } = await supabase.rpc("verify_course_completion", {
          requested_enrollment_id: enrollmentId,
        });

        if (completionError) {
          throw new Error(completionError.message);
        }

        const completionVerified =
          completionData === true ||
          completionData?.[0]?.verify_course_completion === true ||
          completionData?.[0]?.completed === true;

        if (!completionVerified) {
          if (active) {
            setAuthorized(false);
          }
          return;
        }

        const {
          data: issuedCertificateId,
          error: issueError,
        } = await supabase.rpc("issue_course_certificate", {
          requested_enrollment_id: enrollmentId,
        });

        if (issueError) {
          throw new Error(issueError.message);
        }

        const {
          data: certificateData,
          error: certificateError,
        } = await supabase
          .from("course_certificates")
          .select("id, certificate_number, issued_at")
          .eq(
            "id",
            typeof issuedCertificateId === "string"
              ? issuedCertificateId
              : issuedCertificateId?.[0]?.id ??
                  issuedCertificateId?.[0]?.certificate_id,
          )
          .maybeSingle();

        if (certificateError) {
          throw new Error(certificateError.message);
        }

        const {
          data: attestationData,
          error: attestationError,
        } = await supabase
          .from("course_attestations")
          .select("student_name, emt_number")
          .eq("enrollment_id", enrollmentId)
          .eq("accepted", true)
          .maybeSingle();

        if (attestationError) {
          throw new Error(attestationError.message);
        }

        const {
          data: attempts,
          error: attemptsError,
        } = await supabase.rpc("get_latest_exam_attempt", {
          requested_enrollment_id: enrollmentId,
        });

        if (attemptsError) {
          throw new Error(attemptsError.message);
        }

        const latestAttempt = attempts?.[0];

        if (active) {
          setStudentName(
            attestationData?.student_name ??
              user.user_metadata?.full_name ??
              user.email ??
              "Student",
          );
          setEmtNumber(attestationData?.emt_number ?? "");
          setScore(
            latestAttempt?.score !== null &&
              latestAttempt?.score !== undefined
              ? Number(latestAttempt.score)
              : null,
          );
          setCertificate(
            (certificateData as CertificateRecord | null) ?? null,
          );
          setAuthorized(true);
        }
      } catch (error) {
        if (active) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "The certificate could not be loaded.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadCertificate();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="text-lg font-semibold text-zinc-300">
            Verifying secure course completion…
          </p>
        </section>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-2xl border border-red-700 bg-red-950/20 p-8 text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-400">
              Certificate Locked
            </p>

            <h1 className="mt-3 text-3xl font-extrabold">
              Course requirements are not complete
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-300">
              Your certificate can only be issued after the required active
              course time, a passing secure assessment, and the electronic
              attestation have all been verified.
            </p>

            {errorMessage && (
              <p className="mt-4 text-sm text-red-300">
                {errorMessage}
              </p>
            )}

            <Link
              href="/courses/bradycardia"
              className="mt-6 inline-block rounded-xl bg-red-600 px-7 py-3 font-bold transition hover:bg-red-500"
            >
              Return to Course
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const issuedDate = certificate?.issued_at
    ? new Date(certificate.issued_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white print:bg-white print:p-0 print:text-black">
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

          body * {
            visibility: hidden;
          }

          #certificate,
          #certificate * {
            visibility: visible;
          }

          #certificate {
            position: absolute;
            inset: 0;
            width: 100%;
            min-height: 0 !important;
            margin: 0;
            box-shadow: none !important;
            border: 2px solid #111 !important;
            background: white !important;
            color: black !important;
            page-break-inside: avoid;
          }

          .print-hidden {
            display: none !important;
          }
        }
      `}</style>

      <div className="print-hidden">
        <Navbar />

        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-between gap-3">
          <Link
            href="/courses/bradycardia"
            className="rounded-xl border border-zinc-700 px-5 py-3 font-bold transition hover:border-red-500 hover:text-red-400"
          >
            ← Back to Course
          </Link>

          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
          >
            Print Certificate
          </button>
        </div>
      </div>

      <section
        id="certificate"
        className="mx-auto mt-6 flex max-w-5xl flex-col justify-between rounded-3xl border-4 border-red-700 bg-white p-10 text-black shadow-2xl print:mt-0"
      >
        <div className="text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-red-700">
            GrumpyMedic Education
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase tracking-wide">
            Certificate of Completion
          </h1>

          <p className="mt-8 text-lg">
            This certifies that
          </p>

          <p className="mt-2 text-4xl font-black">
            {studentName}
          </p>

          <p className="mt-8 text-lg">
            has successfully completed
          </p>

          <h2 className="mt-2 text-3xl font-extrabold">
            {COURSE_TITLE}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7">
            Massachusetts EMS Protocols 3.3A and 3.3P review covering
            recognition, routine care, pacing, medication administration,
            Medical Control options, and key adult-versus-pediatric
            differences.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
          <div className="rounded-xl border border-zinc-300 p-4 text-center">
            <p className="font-bold uppercase text-zinc-600">
              Course Credit
            </p>
            <p className="mt-2 text-lg font-extrabold">
              1.0 Hour
            </p>
          </div>

          <div className="rounded-xl border border-zinc-300 p-4 text-center">
            <p className="font-bold uppercase text-zinc-600">
              Assessment
            </p>
            <p className="mt-2 text-lg font-extrabold">
              {score !== null ? `${score}%` : "Passed"}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-300 p-4 text-center">
            <p className="font-bold uppercase text-zinc-600">
              EMT Number
            </p>
            <p className="mt-2 text-lg font-extrabold">
              {emtNumber || "On File"}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-300 p-4 text-center">
            <p className="font-bold uppercase text-zinc-600">
              Date Issued
            </p>
            <p className="mt-2 text-lg font-extrabold">
              {issuedDate}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-8 border-t border-zinc-300 pt-6 text-sm">
          <div>
            <p className="font-bold">
              Certificate Number
            </p>
            <p className="mt-1 font-mono">
              {certificate?.certificate_number ??
                certificate?.id ??
                "Issued"}
            </p>
          </div>

          <div className="text-right">
            <p className="font-bold">
              GrumpyMedic Education
            </p>
            <p className="mt-1">
              Secure LMS Completion Record
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}