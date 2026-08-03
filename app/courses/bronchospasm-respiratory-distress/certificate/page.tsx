"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import CourseAccessGate from "../../../components/CourseAccessGate";
import { supabase } from "../../../../lib/supabase/client";

type StudentProfile = {
  full_name: string | null;
  provider_level: string | null;
  department: string | null;
};

export default function BronchospasmRespiratoryCertificatePage() {
  const [certificateName, setCertificateName] = useState("");
  const [providerLevel, setProviderLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [score, setScore] = useState("80");
  const [completionDate, setCompletionDate] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    void loadCertificateInformation();
  }, []);

  async function loadCertificateInformation() {
    setProfileLoading(true);

    const parameters = new URLSearchParams(window.location.search);
    setScore(parameters.get("score") || "80");
    setCompletionDate(
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    );

    const { data: authData } = await supabase.auth.getUser();
    const user = authData.user;

    if (!user) {
      setCertificateName("Course Participant");
      setProfileLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, provider_level, department")
      .eq("id", user.id)
      .maybeSingle<StudentProfile>();

    if (error) {
      setProfileError(
        "Profile information could not be loaded. You may still print the certificate.",
      );
    }

    setCertificateName(
      data?.full_name ||
        user.user_metadata?.full_name ||
        user.email ||
        "Course Participant",
    );
    setProviderLevel(data?.provider_level || "");
    setDepartment(data?.department || "");
    setProfileLoading(false);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <CourseAccessGate>
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4 print:hidden">
              <Link
                href="/courses/bronchospasm-respiratory-distress/quiz"
                className="font-semibold text-red-500 hover:text-red-400"
              >
                ← Back to Quiz
              </Link>

              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-500"
              >
                Print / Save Certificate
              </button>
            </div>

            {profileError && (
              <p className="mb-5 rounded-xl border border-amber-500 bg-amber-500/10 p-4 text-amber-200 print:hidden">
                {profileError}
              </p>
            )}

            <section className="certificate overflow-hidden rounded-3xl bg-white p-4 text-black shadow-2xl">
              <div className="border-[10px] border-blue-900 p-3">
                <div className="border-2 border-black px-8 py-12 text-center md:px-16 md:py-16">
                  <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-red-700">
                    GrumpyMedic Education
                  </p>

                  <h1 className="mt-5 text-5xl font-black uppercase tracking-wide md:text-7xl">
                    Certificate
                  </h1>

                  <p className="mt-2 text-2xl font-semibold">of Course Completion</p>

                  <p className="mt-10 text-lg text-zinc-600">
                    This certificate is presented to
                  </p>

                  <div className="mx-auto mt-4 max-w-4xl border-b-2 border-black pb-3 text-4xl font-extrabold md:text-5xl">
                    {profileLoading ? "Loading..." : certificateName}
                  </div>

                  {providerLevel && (
                    <p className="mt-3 text-lg font-semibold text-zinc-600">
                      Provider Level: {providerLevel}
                    </p>
                  )}

                  {department && (
                    <p className="mt-2 text-base text-zinc-600">{department}</p>
                  )}

                  <p className="mt-10 text-lg text-zinc-600">
                    for successful completion of
                  </p>

                  <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-extrabold text-blue-900 md:text-4xl">
                    Bronchospasm / Respiratory Distress
                  </h2>

                  <p className="mt-3 text-lg font-semibold">
                    Massachusetts EMS Protocols 2.6A &amp; 2.6P • Adult &amp;
                    Pediatric • Version 2026.2
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
                      <p className="mt-2 text-sm text-zinc-500">Course Instructor</p>
                    </div>

                    <div>
                      <div className="border-b border-black pb-2 text-xl font-semibold">
                        GrumpyMedic Education
                      </div>
                      <p className="mt-2 text-sm text-zinc-500">Education Provider</p>
                    </div>
                  </div>

                  <p className="mx-auto mt-12 max-w-3xl text-xs leading-5 text-zinc-500">
                    This educational completion certificate does not independently
                    award continuing-education credit, authorize clinical practice,
                    or replace current protocols, Medical Control direction,
                    service policy, medication references, or demonstrated
                    competency requirements.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </CourseAccessGate>

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
    </>
  );
}