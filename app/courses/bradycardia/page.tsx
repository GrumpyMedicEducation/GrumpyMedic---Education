"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CourseAttestationForm from "../../components/courses/CourseAttestationForm";
import CourseEngagementTracker from "../CourseEngagementTracker";
import { supabase } from "../../../lib/supabase/client";

const learningObjectives = [
  "Recognize symptomatic adult and pediatric bradycardia.",
  "Describe EMT and AEMT priorities for adult and pediatric patients.",
  "Identify adult atropine, pacing, and infusion options.",
  "Identify pediatric epinephrine, atropine, CPR, and pacing indications.",
  "Differentiate standing orders from Medical Control options.",
  "Apply Massachusetts Protocols 3.3A and 3.3P to realistic prehospital scenarios.",
];

export default function BradycardiaCoursePage() {
  const [secureAssessmentLoaded, setSecureAssessmentLoaded] =
    useState(false);
  const [secureAssessmentPassed, setSecureAssessmentPassed] =
    useState(false);

  useEffect(() => {
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
          requested_course_slug: "bradycardia",
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

        const latestAttempt = latestAttempts?.[0];

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
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <CourseEngagementTracker
        courseSlug="bradycardia"
        courseTitle="Adult & Pediatric Bradycardia"
        requiredMinutes={45}
      />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Adult &amp; Pediatric Bradycardia
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
            Massachusetts EMS Protocols 3.3A and 3.3P review covering recognition,
            routine care, pacing, medication administration, Medical Control options,
            and key adult-versus-pediatric differences.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Badge>EMT, AEMT &amp; Paramedic</Badge>
            <Badge>45–60 Minutes</Badge>
            <Badge>25-Question Quiz</Badge>
            <Badge>80% Passing Score</Badge>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#course-content"
              className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
            >
              Begin Course
            </a>

            <Link
              href="/courses/bradycardia/quiz"
              className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Take the Quiz
            </Link>

            <Link
              href="/courses"
              className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-zinc-400 hover:text-white"
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </section>

      <section id="course-content" className="mx-auto max-w-6xl px-6 py-14">
        <CourseSection
          number="01"
          title="Learning Objectives"
          description="By the end of this course, the learner should be able to:"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {learningObjectives.map((objective) => (
              <InfoTile key={objective}>{objective}</InfoTile>
            ))}
          </div>
        </CourseSection>

        <CourseSection
          number="02"
          title="Protocols 3.3A and 3.3P Quick Reference"
          description="Review the GrumpyMedic protocol image before continuing."
        >
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
            <Image
              src="/images/bradycardia-protocols.png"
              alt="GrumpyMedic adult and pediatric bradycardia protocol quick reference"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="h-auto w-full rounded-xl object-contain"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Protocol Reference
            </p>
            <p className="mt-3 leading-7 text-zinc-300">
              This course reviews Massachusetts Statewide Treatment Protocols 3.3A
              and 3.3P. Providers must follow current statewide protocols, local
              service policies, Medical Control direction, medication instructions,
              and their authorized scope of practice.
            </p>
          </div>
        </CourseSection>

        <CourseSection
          number="03"
          title="Recognizing Symptomatic Bradycardia"
          description="Treat the patient, not the monitor."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard title="Mental Status" text="Look for altered mental status, poor responsiveness, or other signs of impaired cerebral perfusion." />
            <FeatureCard title="Perfusion" text="Assess blood pressure, skin signs, pulse quality, capillary refill, and evidence of shock." />
            <FeatureCard title="Ischemia or Instability" text="Consider chest discomfort, ischemic findings, respiratory compromise, and worsening hemodynamic instability." />
          </div>
        </CourseSection>

        <CourseSection
          number="04"
          title="Adult Bradycardia — EMT/AEMT"
          description="Begin with routine patient care and identify instability early."
        >
          <div className="rounded-2xl border border-green-700 bg-green-950/20 p-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">Standing Orders</p>
            <ul className="mt-5 space-y-3 leading-7 text-zinc-200">
              <li>• Follow Protocol 1.0 Routine Patient Care.</li>
              <li>• Support airway, breathing, circulation, oxygenation, monitoring, and transport as clinically indicated.</li>
              <li>• Request or continue paramedic intercept when the patient is symptomatic or unstable.</li>
            </ul>
          </div>
        </CourseSection>

        <CourseSection
          number="05"
          title="Adult Bradycardia — Paramedic"
          description="Use pacing and atropine for symptomatic adult bradycardia."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <DoseCard medication="Atropine Sulfate" dose="1.0 mg" route="IV/IO every 3–5 minutes; maximum total dose 3 mg" />
            <DoseCard medication="Transcutaneous Pacing" dose="TCP" route="Use for symptomatic bradycardia; consider sedation/analgesia when warranted" />
            <DoseCard medication="Reassessment" dose="Continuous" route="Monitor perfusion, rhythm, capture, blood pressure, and clinical response" />
          </div>
        </CourseSection>

        <CourseSection
          number="06"
          title="Adult Bradycardia — Medical Control"
          description="Additional medications may be ordered when standing-order treatment is insufficient."
        >
          <div className="rounded-2xl border border-blue-700 bg-blue-950/20 p-7">
            <ul className="space-y-3 leading-7 text-zinc-200">
              <li>• Additional doses of medications already given.</li>
              <li>• Norepinephrine 0.1–0.5 mcg/kg/min IV/IO by infusion pump, titrated to a systolic blood pressure of 90 mm Hg.</li>
              <li>• Dopamine 2–20 mcg/kg/min IV/IO.</li>
              <li>• Epinephrine infusion 2–10 mcg/min IV/IO by infusion pump.</li>
              <li>• Glucagon 1–5 mg IV/IO/IM for suspected beta-blocker or calcium-channel-blocker toxicity.</li>
              <li>• Calcium chloride or calcium gluconate 10%, 20 mg/kg IV/IO slowly over 5 minutes, maximum 1 gram, for suspected calcium-channel-blocker toxicity.</li>
            </ul>
          </div>
        </CourseSection>

        <CourseSection
          number="07"
          title="Pediatric Bradycardia — EMT/AEMT"
          description="Pediatric bradycardia is often related to hypoxia or respiratory failure."
        >
          <div className="rounded-2xl border border-green-700 bg-green-950/20 p-7">
            <ul className="space-y-3 leading-7 text-zinc-200">
              <li>• Follow Protocol 1.0 Routine Patient Care.</li>
              <li>• If the pulse is less than 60 bpm in a child and the patient is severely symptomatic, consider starting CPR.</li>
              <li>• Prioritize oxygenation, ventilation, and correction of reversible causes.</li>
            </ul>
          </div>
        </CourseSection>

        <CourseSection
          number="08"
          title="Pediatric Bradycardia — Paramedic"
          description="Use weight-based medication dosing and pacing when available."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <DoseCard medication="Epinephrine" dose="0.01 mg/kg" route="IV/IO; 0.1 mL/kg of 0.1 mg/mL solution; maximum dose 0.5 mg" />
            <DoseCard medication="Atropine" dose="0.02 mg/kg" route="IV/IO; maximum single dose 0.5 mg when increased vagal tone or AV block is suspected" />
            <DoseCard medication="Transcutaneous Pacing" dose="TCP" route="Use if available for the severely symptomatic child" />
          </div>
        </CourseSection>

        <CourseSection
          number="09"
          title="Pediatric Bradycardia — Medical Control"
          description="Escalation options include additional medication, fluids, and epinephrine infusion."
        >
          <div className="rounded-2xl border border-blue-700 bg-blue-950/20 p-7">
            <ul className="space-y-3 leading-7 text-zinc-200">
              <li>• Additional doses of medications already administered.</li>
              <li>• Additional fluid boluses of 10–20 mL/kg.</li>
              <li>• Epinephrine 0.01–0.03 mg/kg IV/IO to a maximum single dose of 0.5 mg.</li>
              <li>• Epinephrine infusion 0.1–1 mcg/kg/min IV/IO by infusion pump.</li>
            </ul>
          </div>
        </CourseSection>

        <CourseSection
          number="10"
          title="Adult vs. Pediatric Bradycardia"
          description="Keep the major treatment differences clear."
        >
          <div className="overflow-x-auto rounded-2xl border border-zinc-700 bg-zinc-900">
            <table className="w-full min-w-[760px] text-left">
              <thead className="border-b border-zinc-700 bg-zinc-950">
                <tr>
                  <th className="p-4">Topic</th>
                  <th className="p-4 text-green-400">Adult</th>
                  <th className="p-4 text-blue-400">Pediatric</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                <tr><td className="p-4 font-bold text-white">CPR trigger</td><td className="p-4">Not listed as a bradycardia threshold</td><td className="p-4">Consider CPR when pulse is under 60 bpm and the child is severely symptomatic</td></tr>
                <tr><td className="p-4 font-bold text-white">Primary medication</td><td className="p-4">Atropine 1 mg IV/IO</td><td className="p-4">Epinephrine 0.01 mg/kg IV/IO</td></tr>
                <tr><td className="p-4 font-bold text-white">Atropine role</td><td className="p-4">General symptomatic bradycardia treatment</td><td className="p-4">When increased vagal tone or AV block is suspected</td></tr>
                <tr><td className="p-4 font-bold text-white">Pacing</td><td className="p-4">Standing-order option</td><td className="p-4">Use if available</td></tr>
              </tbody>
            </table>
          </div>
        </CourseSection>

        <CourseSection number="11" title="Adult Clinical Scenario" description="Apply Protocol 3.3A to an unstable adult.">
          <ScenarioCard>
            A 72-year-old patient is pale and diaphoretic with dizziness and chest pressure. The heart rate is 34, blood pressure is 78/46, and the monitor shows a slow regular rhythm.
          </ScenarioCard>
          <PriorityList items={[
            "Begin routine patient care and identify symptomatic bradycardia.",
            "Prepare for transcutaneous pacing.",
            "Administer atropine 1 mg IV/IO every 3–5 minutes to a maximum total dose of 3 mg while pacing is prepared.",
            "Consider sedation and analgesia for electrical therapy when warranted.",
            "Contact Medical Control for additional treatment if instability continues.",
          ]} />
        </CourseSection>

        <CourseSection number="12" title="Pediatric Clinical Scenario" description="Apply Protocol 3.3P to a severely symptomatic child.">
          <ScenarioCard>
            A 4-year-old child has poor respiratory effort, altered mental status, weak pulses, and a heart rate of 48 despite initial airway support.
          </ScenarioCard>
          <PriorityList items={[
            "Continue routine patient care with immediate attention to oxygenation and ventilation.",
            "Because the pulse is below 60 bpm and the child is severely symptomatic, consider starting CPR.",
            "Administer epinephrine 0.01 mg/kg IV/IO to a maximum dose of 0.5 mg.",
            "Consider atropine only when increased vagal tone or AV block is suspected.",
            "Use transcutaneous pacing if available and appropriate.",
          ]} />
        </CourseSection>

        <CourseSection number="13" title="Key Takeaways" description="Review the most important points before taking the quiz.">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoTile>Adult symptomatic bradycardia treatment includes transcutaneous pacing and atropine.</InfoTile>
            <InfoTile>Adult atropine is 1 mg IV/IO every 3–5 minutes to a maximum total dose of 3 mg.</InfoTile>
            <InfoTile>For a severely symptomatic child with a pulse under 60 bpm, consider CPR.</InfoTile>
            <InfoTile>Pediatric epinephrine is weight based at 0.01 mg/kg IV/IO, maximum 0.5 mg.</InfoTile>
            <InfoTile>Pediatric atropine is used when increased vagal tone or AV block is suspected.</InfoTile>
            <InfoTile>Medical Control options differ significantly between adult and pediatric patients.</InfoTile>
          </div>
        </CourseSection>

        <section className="mt-14 rounded-2xl border border-red-700 bg-gradient-to-br from-red-950/30 to-zinc-900 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Final Knowledge Check
          </p>

          {!secureAssessmentLoaded ? (
            <>
              <h2 className="mt-3 text-3xl font-extrabold">
                Checking Secure Assessment
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-300">
                Verifying your official Adult &amp; Pediatric Bradycardia assessment status.
              </p>
            </>
          ) : !secureAssessmentPassed ? (
            <>
              <h2 className="mt-3 text-3xl font-extrabold">
                Ready to Take the Quiz?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-300">
                Answer all 25 questions. A score of 80% or higher—20 correct answers—is required to pass.
              </p>

              <Link
                href="/courses/bradycardia/quiz"
                className="mt-6 inline-block rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-500"
              >
                Start Final Quiz
              </Link>
            </>
          ) : (
            <>
              <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-emerald-700 bg-emerald-950/20 p-6">
                <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-400">
                  Secure Assessment Passed
                </p>

                <h2 className="mt-3 text-3xl font-extrabold">
                  Complete Your Electronic Attestation
                </h2>

                <p className="mt-4 leading-7 text-zinc-300">
                  Your passing assessment result has been verified. Complete the
                  electronic attestation below before your certificate can be issued.
                </p>
              </div>

              <div className="mx-auto max-w-3xl text-left">
                <CourseAttestationForm
                  courseSlug="bradycardia"
                  courseTitle="Adult & Pediatric Bradycardia"
                  certificateHref="/courses/bradycardia/certificate"
                />
              </div>
            </>
          )}
        </section>

        <p className="mt-10 text-center text-sm leading-6 text-zinc-500">
          Educational content only. Follow current Massachusetts statewide protocols,
          local service policies, Medical Control direction, medication instructions,
          and your authorized scope of practice.
        </p>
      </section>
    </main>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-200">{children}</span>;
}

function CourseSection({ number, title, description, children }: { number: string; title: string; description: string; children: ReactNode }) {
  return (
    <section className="mb-14">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 font-extrabold">{number}</span>
        <div>
          <h2 className="text-3xl font-extrabold">{title}</h2>
          <p className="mt-2 leading-7 text-zinc-400">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function InfoTile({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 leading-7 text-zinc-200">{children}</div>;
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-zinc-300">{text}</p></div>;
}

function DoseCard({ medication, dose, route }: { medication: string; dose: string; route: string }) {
  return <div className="rounded-2xl border border-red-700 bg-red-950/20 p-6 text-center"><p className="text-lg font-bold text-red-400">{medication}</p><p className="mt-3 text-3xl font-extrabold">{dose}</p><p className="mt-2 text-zinc-300">{route}</p></div>;
}

function ScenarioCard({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-7 text-lg leading-8 text-zinc-200">{children}</div>;
}

function PriorityList({ items }: { items: string[] }) {
  return <div className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-900 p-7"><h3 className="text-xl font-bold">Immediate treatment priorities</h3><ul className="mt-3 space-y-2 leading-7 text-zinc-300">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>;
}