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

export default function SepsisCertificatePage() {
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
      }).format(new Date())
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
        "Profile information could not be loaded. You may still print the certificate."
      );
    }

    setCertificateName(
      data?.full_name ||
        user.user_metadata?.full_name ||
        user.email ||
        "Course Participant"
    );

    setProviderLevel(data?.provider_level || "");
    setDepartment(data?.department || "");
    setProfileLoading(false);
  }

  return (
    <>
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="min-h-screen bg-black px-6 py-10 text-white print:bg-white print:p-0 print:text-black">
        <CourseAccessGate>
          <div className="mx-auto max-w-6xl print:max-w-none">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4 print:hidden">
              <Link
                href="/courses/sepsis/quiz"
                className="font-semibold text-red-500 transition hover:text-red-400"
              >
                ← Back to Quiz
              </Link>

              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
              >
                Print / Save Certificate
              </button>
            </div>

            {profileError && (
              <p className="mb-5 rounded-xl border border-amber-500 bg-amber-500/10 p-4 text-amber-200 print:hidden">
                {profileError}
              </p>
            )}

            <section className="certificate overflow-hidden rounded-3xl bg-white p-4 text-black shadow-2xl print:min-h-[7.5in] print:rounded-none print:p-0 print:shadow-none">
              <div className="border-[10px] border-red-700 p-3">
                <div className="border-2 border-black px-8 py-12 text-center md:px-16 md:py-16 print:px-14 print:py-12">
                  <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-red-700">
                    GrumpyMedic Education
                  </p>

                  <h1 className="mt-5 text-5xl font-black uppercase tracking-wide md:text-7xl print:text-6xl">
                    Certificate
                  </h1>

                  <p className="mt-2 text-2xl font-semibold">
                    of Course Completion
                  </p>

                  <p className="mt-10 text-lg text-zinc-600">
                    This certificate is presented to
                  </p>

                  <div className="mx-auto mt-4 max-w-4xl border-b-2 border-black pb-3 text-4xl font-extrabold md:text-5xl print:text-4xl">
                    {profileLoading ? "Loading..." : certificateName}
                  </div>

                  {providerLevel && (
                    <p className="mt-3 text-lg font-semibold text-zinc-600">
                      Provider Level: {providerLevel}
                    </p>
                  )}

                  {department && (
                    <p className="mt-2 text-base text-zinc-600">
                      {department}
                    </p>
                  )}

                  <p className="mt-10 text-lg text-zinc-600">
                    for successful completion of
                  </p>

                  <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-extrabold text-red-700 md:text-4xl print:text-3xl">
                    Adult &amp; Pediatric Sepsis
                  </h2>

                  <p className="mt-3 text-lg font-semibold">
                    Massachusetts EMS Protocols 2.17A &amp; 2.17P • Version
                    2026.2
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

                  <div className="mx-auto mt-14 max-w-md">
                    <div className="border-b border-black pb-2 text-xl font-semibold">
                      William Howard, NRP
                    </div>

                    <p className="mt-2 text-sm text-zinc-500">
                      Course Instructor
                    </p>
                  </div>

                  <p className="mx-auto mt-12 max-w-3xl text-xs leading-5 text-zinc-500">
                    This educational completion certificate does not
                    independently award continuing-education credit, authorize
                    clinical practice, or replace current state and local
                    protocols, Medical Control direction, service policy, or
                    demonstrated competency requirements.
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

            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
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