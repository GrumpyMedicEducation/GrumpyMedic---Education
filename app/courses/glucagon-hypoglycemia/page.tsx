"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CourseAccessGate from "../../components/CourseAccessGate";
import CourseAttestationForm from "../../components/courses/CourseAttestationForm";
import CourseEngagementTracker from "../CourseEngagementTracker";
import { getCourseBySlug } from "../../lib/courses/catalog";
import { getCourseQuizRoute } from "../../lib/courses/routes";
import { supabase } from "../../../lib/supabase/client";

const COURSE_SLUG = "glucagon-hypoglycemia";
const REQUIRED_ACTIVE_MINUTES = 45;

type LatestAttempt = {
  passed: boolean | null;
  submitted_at: string | null;
};

export default function GlucagonCoursePage() {
  const course = getCourseBySlug(COURSE_SLUG);

  const [engagementLoaded, setEngagementLoaded] = useState(false);
  const [timeRequirementMet, setTimeRequirementMet] = useState(false);
  const [officialActiveSeconds, setOfficialActiveSeconds] = useState(0);
  const [officialRequiredSeconds, setOfficialRequiredSeconds] = useState(
    REQUIRED_ACTIVE_MINUTES * 60,
  );

  const [secureAssessmentLoaded, setSecureAssessmentLoaded] = useState(false);
  const [secureAssessmentPassed, setSecureAssessmentPassed] = useState(false);

  const handleEligibilityChange = useCallback(
    (result: {
      activeSeconds: number;
      requiredSeconds: number;
      timeRequirementMet: boolean;
    }) => {
      setOfficialActiveSeconds(result.activeSeconds);
      setOfficialRequiredSeconds(result.requiredSeconds);
      setTimeRequirementMet(result.timeRequirementMet);
      setEngagementLoaded(true);
    },
    [],
  );

  useEffect(() => {
    if (!course) {
      return;
    }

    let active = true;

    async function loadSecureAssessmentStatus() {
      setSecureAssessmentLoaded(false);
      setSecureAssessmentPassed(false);

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          return;
        }

        const {
          data: enrollmentId,
          error: enrollmentError,
        } = await supabase.rpc("enroll_in_course", {
          requested_course_slug: COURSE_SLUG,
        });

        if (
          enrollmentError ||
          !enrollmentId ||
          typeof enrollmentId !== "string"
        ) {
          return;
        }

        const {
          data: latestAttempts,
          error: latestAttemptError,
        } = await supabase.rpc("get_latest_exam_attempt", {
          requested_enrollment_id: enrollmentId,
        });

        if (latestAttemptError) {
          return;
        }

        const latestAttempt = latestAttempts?.[0] as
          | LatestAttempt
          | undefined;

        if (active) {
          setSecureAssessmentPassed(
            Boolean(
              latestAttempt?.passed &&
                latestAttempt?.submitted_at,
            ),
          );
        }
      } finally {
        if (active) {
          setSecureAssessmentLoaded(true);
        }
      }
    }

    void loadSecureAssessmentStatus();

    return () => {
      active = false;
    };
  }, [course]);

  if (!course) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Course Not Found
          </p>

          <h1 className="mt-4 text-4xl font-extrabold">
            This Course Is Not Available
          </h1>

          <p className="mt-4 leading-7 text-zinc-400">
            The requested course could not be found in the
            GrumpyMedic Education course catalog.
          </p>

          <Link
            href="/courses"
            className="mt-7 inline-block rounded-xl bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-500"
          >
            Return to Courses
          </Link>
        </section>
      </main>
    );
  }

  const remainingSeconds = Math.max(
    0,
    officialRequiredSeconds - officialActiveSeconds,
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <CourseEngagementTracker
        courseSlug={COURSE_SLUG}
        courseTitle={course.title}
        requiredMinutes={REQUIRED_ACTIVE_MINUTES}
        onEligibilityChange={handleEligibilityChange}
      />

      <section className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/courses"
          className="font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Courses
        </Link>

        <header className="mt-8 rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/30 to-zinc-950 p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">
            {course.category}
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">
            {course.title}
          </h1>

          <p className="mt-4 text-xl text-zinc-300">
            {course.subtitle}
          </p>

          <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
            {course.description}
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CourseStat
            label="Provider Focus"
            value={course.providerFocus}
          />

          <CourseStat
            label="Passing Score"
            value={`${course.passingScore}%`}
          />

          <CourseStat
            label="Education Hours"
            value={`${course.ceHours}`}
          />

          <CourseStat
            label="Certificate"
            value={
              course.certificateEnabled
                ? "Available"
                : "Not Available"
            }
          />
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Public Course Preview
          </p>

          <h2 className="mt-3 text-2xl font-extrabold">
            What You Will Learn
          </h2>

          <p className="mt-4 leading-7 text-zinc-400">
            This course contains{" "}
            {course.sections.length} lesson sections and{" "}
            {course.questions.length} quiz questions.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {course.sections.map((section, index) => (
              <div
                key={section.id}
                className="flex gap-4 rounded-xl border border-zinc-800 bg-black p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 font-extrabold">
                  {index + 1}
                </span>

                <div>
                  <p className="font-bold text-white">
                    {section.title}
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    Course lesson section
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <CourseAccessGate
            accessLevel="login"
            title="Sign In to Access the Full Course"
            description={`Create a free GrumpyMedic Education account or log in to complete ${course.title}, save your active engagement time, and continue to the secure assessment.`}
          >
            <div className="space-y-8">
              {course.sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"
                >
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 font-extrabold">
                      {index + 1}
                    </span>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                        Lesson Section
                      </p>

                      <h2 className="mt-2 text-2xl font-extrabold">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {section.paragraphs &&
                    section.paragraphs.length > 0 && (
                      <div className="mt-6 space-y-4">
                        {section.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="leading-8 text-zinc-300"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}

                  {section.bulletPoints &&
                    section.bulletPoints.length > 0 && (
                      <ul className="ml-6 mt-6 list-disc space-y-3 text-zinc-300">
                        {section.bulletPoints.map((bulletPoint) => (
                          <li key={bulletPoint}>
                            {bulletPoint}
                          </li>
                        ))}
                      </ul>
                    )}
                </section>
              ))}
            </div>

            <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
              {!engagementLoaded ? (
                <>
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

                  <h2 className="mt-5 text-2xl font-extrabold">
                    Loading Official Course Time
                  </h2>

                  <p className="mt-3 text-zinc-400">
                    Checking your active-engagement record.
                  </p>
                </>
              ) : !timeRequirementMet ? (
                <>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
                    Assessment Locked
                  </p>

                  <h2 className="mt-3 text-2xl font-extrabold">
                    Complete the Required Course Time
                  </h2>

                  <p className="mx-auto mt-3 max-w-2xl leading-7 text-zinc-400">
                    Continue reviewing the course material. The
                    secure assessment will unlock automatically
                    after 45 minutes of credited active engagement.
                  </p>

                  <div className="mx-auto mt-7 max-w-md rounded-2xl border border-zinc-700 bg-black p-6">
                    <TimeRow
                      label="Official credited time"
                      seconds={officialActiveSeconds}
                    />

                    <TimeRow
                      label="Required time"
                      seconds={officialRequiredSeconds}
                    />

                    <TimeRow
                      label="Remaining time"
                      seconds={remainingSeconds}
                      highlight
                    />
                  </div>

                  <p className="mt-6 text-sm leading-6 text-zinc-500">
                    The timer pauses when this browser tab is hidden
                    or after the configured inactivity period.
                  </p>
                </>
              ) : !secureAssessmentLoaded ? (
                <>
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

                  <h2 className="mt-5 text-2xl font-extrabold">
                    Checking Secure Assessment
                  </h2>

                  <p className="mt-3 text-zinc-400">
                    Verifying your latest official assessment result.
                  </p>
                </>
              ) : !secureAssessmentPassed ? (
                <>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
                    Required Time Completed
                  </p>

                  <h2 className="mt-3 text-2xl font-extrabold">
                    Continue to the Secure Assessment
                  </h2>

                  <p className="mx-auto mt-3 max-w-2xl leading-7 text-zinc-400">
                    Your 45-minute active-engagement requirement is
                    complete. You may now begin or continue the
                    official course assessment.
                  </p>

                  <Link
                    href={getCourseQuizRoute(course.slug)}
                    className="mt-6 inline-block rounded-xl bg-emerald-600 px-8 py-4 font-bold text-white transition hover:bg-emerald-500"
                  >
                    Continue to Quiz →
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
                    Secure Assessment Passed
                  </p>

                  <h2 className="mt-3 text-2xl font-extrabold">
                    Complete Your Electronic Attestation
                  </h2>

                  <p className="mx-auto mt-3 max-w-2xl leading-7 text-zinc-400">
                    Your required active course time and secure
                    assessment are complete. Submit the electronic
                    attestation to complete the course record.
                  </p>

                  <div className="mx-auto mt-8 max-w-3xl text-left">
                    <CourseAttestationForm
                      courseSlug={COURSE_SLUG}
                      courseTitle={course.title}
                      certificateHref="/courses/glucagon-hypoglycemia/certificate"
                    />
                  </div>
                </>
              )}
            </section>

            <p className="mt-8 text-center text-sm leading-6 text-zinc-500">
              Educational content only. Follow current state and
              local protocols, medical-director guidance, service
              policy, and manufacturer instructions.
            </p>
          </CourseAccessGate>
        </div>
      </section>
    </main>
  );
}

function CourseStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-2 font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function TimeRow({
  label,
  seconds,
  highlight = false,
}: {
  label: string;
  seconds: number;
  highlight?: boolean;
}) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="mt-4 flex items-center justify-between gap-4 text-sm first:mt-0">
      <span className="text-zinc-400">
        {label}
      </span>

      <span
        className={
          highlight
            ? "font-bold text-amber-300"
            : "font-bold text-white"
        }
      >
        {minutes}:{remainingSeconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}