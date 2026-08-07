"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase/client";

type CourseAttestationFormProps = {
  courseSlug: string;
  courseTitle: string;
  certificateHref: string;
};

const ATTESTATION_TEXT =
  "I attest that I personally completed this course, reviewed the educational content, and completed the required assessment without unauthorized assistance.";

export default function CourseAttestationForm({
  courseSlug,
  courseTitle,
  certificateHref,
}: CourseAttestationFormProps) {
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState("");
  const [emtNumber, setEmtNumber] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function initializeAttestation() {
      setLoading(true);
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
          throw new Error("You must be signed in to complete the attestation.");
        }

        const [
          profileResult,
          enrollmentResult,
        ] = await Promise.all([
          supabase
            .from("profiles")
            .select("full_name")
            .eq("id", user.id)
            .maybeSingle(),

          supabase.rpc("enroll_in_course", {
            requested_course_slug: courseSlug,
          }),
        ]);

        if (profileResult.error) {
          throw new Error(profileResult.error.message);
        }

        if (enrollmentResult.error) {
          throw new Error(enrollmentResult.error.message);
        }

        if (
          !enrollmentResult.data ||
          typeof enrollmentResult.data !== "string"
        ) {
          throw new Error("Your course enrollment could not be confirmed.");
        }

        if (!active) {
          return;
        }

        setEnrollmentId(enrollmentResult.data);

        if (profileResult.data?.full_name) {
          setStudentName(profileResult.data.full_name);
        }
      } catch (error) {
        if (active) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "The attestation form could not be initialized.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void initializeAttestation();

    return () => {
      active = false;
    };
  }, [courseSlug]);

  async function submitAttestation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!enrollmentId) {
      setErrorMessage("Your course enrollment could not be confirmed.");
      return;
    }

    if (studentName.trim().length < 3) {
      setErrorMessage("Enter your full name.");
      return;
    }

    if (emtNumber.trim().length < 3) {
      setErrorMessage("Enter your EMT certification number.");
      return;
    }

    if (!accepted) {
      setErrorMessage("You must accept the attestation before continuing.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.rpc("submit_course_attestation", {
        requested_enrollment_id: enrollmentId,
        requested_student_name: studentName.trim(),
        requested_emt_number: emtNumber.trim(),
        requested_attestation_text: ATTESTATION_TEXT,
        requested_user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent : null,
      });

      if (error) {
        throw new Error(error.message);
      }

      setCompleted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The attestation could not be submitted.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (completed) {
    return (
      <section className="mt-8 rounded-2xl border border-emerald-700 bg-emerald-950/20 p-6 text-center">
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-400">
          Attestation Complete
        </p>

        <h2 className="mt-3 text-2xl font-extrabold">
          Course Requirements Complete
        </h2>

        <p className="mt-3 leading-7 text-zinc-300">
          Your electronic attestation for {courseTitle} has been recorded.
          Your certificate can now be verified and issued by the server.
        </p>

        <Link
          href={certificateHref}
          className="mt-6 inline-block rounded-xl bg-emerald-600 px-7 py-3 font-bold text-white transition hover:bg-emerald-500"
        >
          View Certificate
        </Link>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-950 p-6">
      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-400">
        Electronic Attestation
      </p>

      <h2 className="mt-3 text-2xl font-extrabold">
        Complete Your Course Attestation
      </h2>

      <p className="mt-3 leading-7 text-zinc-300">
        Before a certificate can be issued, confirm that you personally
        completed the course and assessment.
      </p>

      <form onSubmit={submitAttestation} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="attestation-student-name"
            className="mb-2 block text-sm font-bold text-zinc-200"
          >
            Full Name
          </label>

          <input
            id="attestation-student-name"
            type="text"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            disabled={loading || submitting}
            autoComplete="name"
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="attestation-emt-number"
            className="mb-2 block text-sm font-bold text-zinc-200"
          >
            EMT Certification Number
          </label>

          <input
            id="attestation-emt-number"
            type="text"
            value={emtNumber}
            onChange={(event) => setEmtNumber(event.target.value)}
            disabled={loading || submitting}
            autoComplete="off"
            placeholder="Enter your EMT certification number"
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500 disabled:opacity-60"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-700 bg-black p-4">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            disabled={loading || submitting}
            className="mt-1 h-5 w-5"
          />

          <span className="text-sm leading-6 text-zinc-300">
            {ATTESTATION_TEXT}
          </span>
        </label>

        {errorMessage && (
          <p className="rounded-xl border border-red-800 bg-red-950/30 p-4 text-sm font-semibold text-red-300">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || loading || !enrollmentId}
          className="w-full rounded-xl bg-red-600 px-6 py-4 font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
        >
          {loading
            ? "Loading Attestation…"
            : submitting
              ? "Submitting Attestation…"
              : "Submit Attestation"}
        </button>
      </form>
    </section>
  );
}