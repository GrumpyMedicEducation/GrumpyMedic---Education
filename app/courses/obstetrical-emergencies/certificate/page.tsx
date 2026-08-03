"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import CourseAccessGate from "../../../components/CourseAccessGate";
import { supabase } from "../../../../lib/supabase/client";

const COURSE_SLUG = "obstetrical-emergencies";
const COURSE_TITLE = "Obstetrical Emergencies";
const PASSING_SCORE = 80;

type StudentProfile = {
  full_name: string | null;
  provider_level: string | null;
  department: string | null;
};

type CourseCompletion = {
  best_score: number;
  passing_score: number;
  completed_at: string;
  certificate_id: string;
  verified: boolean;
};

export default function ObstetricalEmergenciesCertificatePage() {
  const [certificateName, setCertificateName] = useState("");
  const [providerLevel, setProviderLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [completionDate, setCompletionDate] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [completionVerified, setCompletionVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [completionMissing, setCompletionMissing] = useState(false);

  useEffect(() => {
    loadCertificateInformation();
  }, []);

  async function loadCertificateInformation() {
    setLoading(true);
    setPageError("");
    setCompletionMissing(false);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      setPageError(sessionError.message || "Your account session could not be verified.");
      setLoading(false);
      return;
    }

    const user = session?.user;
    if (!user) {
      setLoading(false);
      return;
    }

    const [profileResult, completionResult] = await Promise.all([
      supabase
        .from("profiles")
        .select("full_name, provider_level, department")
        .eq("id", user.id)
        .maybeSingle(),
      supabase
        .from("course_completions")
        .select("best_score, passing_score, completed_at, certificate_id, verified")
        .eq("user_id", user.id)
        .eq("course_slug", COURSE_SLUG)
        .maybeSingle(),
    ]);

    if (profileResult.error) {
      setPageError(profileResult.error.message || "Your student profile could not be loaded.");
      setLoading(false);
      return;
    }

    if (completionResult.error) {
      setPageError(completionResult.error.message || "Your completion record could not be loaded.");
      setLoading(false);
      return;
    }

    const profile = profileResult.data as StudentProfile | null;
    const completion = completionResult.data as CourseCompletion | null;

    setCertificateName(profile?.full_name?.trim() ?? "");
    setProviderLevel(profile?.provider_level?.trim() ?? "");
    setDepartment(profile?.department?.trim() ?? "");

    if (
      !completion ||
      completion.best_score < Math.max(completion.passing_score, PASSING_SCORE)
    ) {
      setCompletionMissing(true);
      setLoading(false);
      return;
    }

    setScore(completion.best_score);
    setCompletionDate(
      new Date(completion.completed_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );
    setCertificateId(completion.certificate_id);
    setCompletionVerified(completion.verified);
    setLoading(false);
  }

  const certificateReady =
    !loading &&
    !pageError &&
    !completionMissing &&
    Boolean(certificateName) &&
    score !== null;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <section className="mx-auto max-w-5xl px-6 py-10 print:max-w-none print:p-0">
        <CourseAccessGate
          accessLevel="profile"
          title="Complete Your Profile to Access the Certificate"
          description="Your full name, provider level, and organization are required before this certificate can be issued."
        >
          <div className="print:hidden">
            <Link
              href="/courses/obstetrical-emergencies/quiz"
              className="font-semibold text-red-500 transition hover:text-red-400"
            >
              ← Back to Quiz
            </Link>

            <div className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                Certificate of Completion
              </p>
              <h1 className="mt-3 text-3xl font-extrabold">
                Obstetrical Emergencies Certificate
              </h1>

              {loading ? (
                <p className="mt-6 text-zinc-300">Loading your certificate record…</p>
              ) : pageError ? (
                <div className="mt-6 rounded-xl border border-red-700 bg-red-950/20 p-5">
                  <p className="font-bold text-red-400">Unable to Load Certificate</p>
                  <p className="mt-2 text-zinc-300">{pageError}</p>
                </div>
              ) : completionMissing ? (
                <div className="mt-6 rounded-xl border border-amber-700 bg-amber-950/20 p-6">
                  <p className="font-bold text-amber-400">Passing Record Required</p>
                  <p className="mt-2 text-zinc-300">
                    Pass the quiz with a score of at least {PASSING_SCORE}% to
                    unlock this certificate.
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <ProfileItem label="Participant" value={certificateName} />
                  <ProfileItem label="Best Score" value={`${score}%`} />
                  <ProfileItem
                    label="Record Status"
                    value={completionVerified ? "Verified" : "Recorded"}
                  />
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  disabled={!certificateReady}
                  className={`rounded-xl px-6 py-3 font-bold transition ${
                    certificateReady
                      ? "bg-red-600 text-white hover:bg-red-500"
                      : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                  }`}
                >
                  Print or Save as PDF
                </button>

                <Link
                  href="/courses"
                  className="rounded-xl border border-zinc-600 px-6 py-3 font-bold text-zinc-300"
                >
                  Return to Courses
                </Link>
              </div>
            </div>
          </div>

          {certificateReady && (
            <section className="mt-8 print:mt-0">
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
                <h2 className="mt-5 text-4xl font-extrabold">{COURSE_TITLE}</h2>
                <p className="mt-3 text-xl font-semibold text-zinc-700">
                  Massachusetts EMS Protocol 2.10
                </p>

                {providerLevel && (
                  <p className="mt-3 text-lg font-semibold text-zinc-600">
                    Provider Level: {providerLevel}
                  </p>
                )}
                {department && (
                  <p className="mt-2 text-base text-zinc-600">{department}</p>
                )}

                <p className="mx-auto mt-8 max-w-3xl leading-7 text-zinc-600">
                  This course reviewed obstetrical assessment, patient
                  positioning, prolapsed cord, postpartum hemorrhage,
                  oxytocin, TXA, eclamptic seizures, magnesium sulfate,
                  Medical Control options, and cardiac-arrest considerations.
                </p>

                <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-zinc-300 p-5">
                    <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
                      Best Quiz Score
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-red-700">
                      {score}%
                    </p>
                  </div>
                  <div className="rounded-xl border border-zinc-300 p-5">
                    <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
                      Completion Date
                    </p>
                    <p className="mt-2 text-2xl font-bold">{completionDate}</p>
                  </div>
                </div>

                <div className="mx-auto mt-14 grid max-w-3xl gap-10 sm:grid-cols-2">
                  <div>
                    <div className="border-b border-black pb-2 text-xl font-semibold">
                      Lt. William Howard, NRP
                    </div>
                    <p className="mt-2 text-sm text-zinc-500">Course Instructor</p>
                  </div>
                  <div>
                    <div className="border-b border-black pb-2 text-xl font-semibold">
                      GrumpyMedic Education
                    </div>
                    <p className="mt-2 text-sm text-zinc-500">Education Provider</p>
                  </div>
                </div>

                {certificateId && (
                  <p className="mt-8 text-xs font-semibold tracking-wide text-zinc-500">
                    Certificate ID: {certificateId}
                  </p>
                )}

                <p className="mx-auto mt-8 max-w-3xl text-xs leading-5 text-zinc-500">
                  Educational completion certificate only. This does not
                  independently award CAPCE or state continuing-education
                  credit and does not replace current protocols, medical
                  direction, service training, or demonstrated competency.
                </p>
              </div>
            </section>
          )}
        </CourseAccessGate>
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

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-black p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p className="mt-2 font-bold text-white">{value}</p>
    </div>
  );
}
