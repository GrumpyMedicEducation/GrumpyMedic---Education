"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import CourseAttestationForm from "../../components/courses/CourseAttestationForm";
import CourseEngagementTracker from "../CourseEngagementTracker";
import { supabase } from "../../../lib/supabase/client";

const objectives = [
  "Recognize adult and pediatric bronchospasm and respiratory distress.",
  "Assess airway, breathing, work of breathing, lung sounds, oxygenation, and mental status.",
  "Apply EMT, AEMT, and Paramedic standing orders from Massachusetts Protocols 2.6A and 2.6P.",
  "Identify when bronchodilators, epinephrine, CPAP/BiPAP, corticosteroids, and magnesium may be appropriate.",
  "Recognize respiratory fatigue and the need for rapid transport or airway escalation.",
  "Document treatment response and communicate a concise respiratory report.",
];

export default function BronchospasmRespiratoryCoursePage() {
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
          requested_course_slug:
            "bronchospasm-respiratory-distress",
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
        courseSlug="bronchospasm-respiratory-distress"
        courseTitle="Bronchospasm / Respiratory Distress"
        requiredMinutes={45}
      />
        <section className="border-b border-zinc-800 bg-gradient-to-b from-blue-950/40 to-black">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Link href="/courses" className="font-semibold text-red-500 hover:text-red-400">
              ← Back to Courses
            </Link>

            <p className="mt-10 text-sm font-extrabold uppercase tracking-[0.22em] text-red-500">
              Massachusetts EMS Respiratory Course
            </p>

            <h1 className="mt-4 max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
              Bronchospasm / Respiratory Distress
            </h1>

            <p className="mt-5 max-w-4xl text-xl leading-8 text-zinc-300">
              Adult and pediatric respiratory assessment, bronchodilator therapy,
              epinephrine, noninvasive ventilation, corticosteroids, magnesium,
              transport priorities, reassessment, and documentation.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Stat label="Protocols" value="2.6A & 2.6P" />
              <Stat label="Version" value="Massachusetts 2026.2" />
              <Stat label="Assessment" value="25 Questions • 80%" />
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#course-content" className="rounded-xl bg-red-600 px-7 py-4 font-bold hover:bg-red-500">
                Start Course
              </a>

              <Link
                href="/courses/bronchospasm-respiratory-distress/quiz"
                className="rounded-xl border border-zinc-600 px-7 py-4 font-bold hover:border-red-500 hover:text-red-400"
              >
                Take the Quiz
              </Link>
            </div>
          </div>
        </section>

        <section id="course-content" className="mx-auto max-w-6xl px-6 py-14">
          <CourseSection number="01" title="Learning Objectives" description="By the end of this course, the learner should be able to:">
            <div className="grid gap-4 md:grid-cols-2">
              {objectives.map((item) => <Tile key={item}>{item}</Tile>)}
            </div>
          </CourseSection>

          <CourseSection number="02" title="GrumpyMedic Protocol Reference" description="Review the adult and pediatric quick-reference image before continuing.">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-3">
              <Image
                src="/images/bronchospasm-respiratory-protocol.png"
                alt="GrumpyMedic adult and pediatric bronchospasm respiratory distress protocol reference"
                width={2048}
                height={2048}
                priority
                className="h-auto w-full rounded-xl"
              />
            </div>

            <Alert title="Protocol Reminder">
              Verify current Massachusetts protocols, addenda, service policy,
              Medical Control requirements, medication concentrations, and your
              authorized scope before clinical use.
            </Alert>
          </CourseSection>

          <CourseSection number="03" title="Respiratory Assessment" description="Severity is determined by the complete clinical picture.">
            <Checklist items={[
              "Airway patency and ability to speak",
              "Respiratory rate, effort, and pattern",
              "Accessory-muscle use and retractions",
              "Lung sounds and quality of air movement",
              "SpO₂ and ETCO₂ when available",
              "Skin color and perfusion",
              "Mental status and signs of fatigue",
              "History of asthma, COPD, medications, and prior intubation",
            ]} />

            <Alert title="Impending Respiratory Failure">
              Decreasing air movement, exhaustion, altered mental status,
              cyanosis, a silent chest, or worsening ventilation despite
              treatment are high-risk findings.
            </Alert>
          </CourseSection>

          <CourseSection number="04" title="Common Causes" description="Not all wheezing is asthma.">
            <div className="grid gap-6 lg:grid-cols-3">
              <InfoCard title="Bronchospasm">
                Asthma, COPD, reactive airway disease, and allergic reactions may narrow the lower airways.
              </InfoCard>
              <InfoCard title="Cardiac Causes">
                Pulmonary edema may produce wheezing. Consider crackles, edema, hypertension, and cardiac history.
              </InfoCard>
              <InfoCard title="Other Causes">
                Foreign body, infection, toxic exposure, trauma, pneumothorax, and metabolic illness may cause distress.
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection number="05" title="Adult EMT Care" description="Initial care focuses on oxygenation, bronchodilation, reassessment, and transport.">
            <Checklist items={[
              "Provide routine patient care and position for comfort.",
              "Administer oxygen as clinically indicated.",
              "Assist with the patient’s prescribed bronchodilator when allowed.",
              "Administer nebulized bronchodilator therapy according to protocol.",
              "Add ipratropium when indicated.",
              "Reassess breath sounds, work of breathing, SpO₂, and mental status.",
              "Request ALS and do not delay transport for worsening distress.",
            ]} />
          </CourseSection>

          <CourseSection number="06" title="Adult AEMT & Paramedic Care" description="Escalation may include noninvasive ventilation and adjunct medications.">
            <div className="grid gap-6 md:grid-cols-2">
              <InfoCard title="CPAP / BiPAP">
                Consider for an awake, cooperative patient with adequate airway protection and spontaneous respiratory effort.
              </InfoCard>
              <InfoCard title="Epinephrine">
                May be indicated in severe bronchospasm or respiratory distress when protocol criteria are met.
              </InfoCard>
              <InfoCard title="Corticosteroids">
                Hydrocortisone or methylprednisolone may be used according to the current protocol and formulary.
              </InfoCard>
              <InfoCard title="Magnesium Sulfate">
                May be considered in severe bronchospasm when protocol criteria are met.
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection number="07" title="Noninvasive Ventilation" description="CPAP or BiPAP can reduce work of breathing in selected patients.">
            <div className="grid gap-6 md:grid-cols-2">
              <ChecklistCard title="Appropriate Patient" items={[
                "Awake and cooperative",
                "Able to protect the airway",
                "Adequate spontaneous respirations",
                "Appropriate blood pressure",
                "Effective mask seal",
                "No immediate need for intubation",
              ]} />
              <ChecklistCard title="Avoid or Stop When" items={[
                "Vomiting or inability to protect the airway",
                "Severe altered mental status",
                "Respiratory arrest or agonal breathing",
                "Hemodynamic instability",
                "Facial trauma preventing mask seal",
                "Clinical deterioration despite treatment",
              ]} />
            </div>
          </CourseSection>

          <CourseSection number="08" title="Pediatric Recognition and Care" description="Children may compensate and then deteriorate quickly.">
            <Checklist items={[
              "Tachypnea or irregular respirations",
              "Nasal flaring and retractions",
              "Head bobbing or grunting",
              "Wheezing or diminished air movement",
              "Difficulty speaking, feeding, or crying",
              "Cyanosis or poor perfusion",
              "Lethargy, agitation, or exhaustion",
              "Bradycardia as a late, ominous sign",
            ]} />

            <Alert title="Pediatric Caution">
              A quieter child is not always improving. Decreasing wheezing with
              worsening effort, poor air movement, or lethargy may indicate
              fatigue and respiratory failure.
            </Alert>
          </CourseSection>

          <CourseSection number="09" title="Medication Review" description="Medication choice depends on severity, age, provider level, and current protocol.">
            <div className="grid gap-6 md:grid-cols-2">
              <InfoCard title="Bronchodilators">
                Albuterol and ipratropium may be used according to current adult and pediatric protocols.
              </InfoCard>
              <InfoCard title="Epinephrine">
                Confirm patient, indication, concentration, dose, route, and reassessment requirements.
              </InfoCard>
              <InfoCard title="Steroids">
                Reduce inflammation but do not replace immediate airway and ventilation support.
              </InfoCard>
              <InfoCard title="Magnesium">
                An adjunct for severe bronchospasm under the appropriate protocol.
              </InfoCard>
            </div>
          </CourseSection>

          <CourseSection number="10" title="Clinical Scenarios" description="Pause before opening each discussion.">
            <div className="space-y-6">
              <Scenario
                title="Adult Asthma Exacerbation"
                prompt="A 28-year-old has diffuse wheezing, accessory-muscle use, and difficulty speaking in full sentences."
                answer="Provide oxygen as indicated, begin protocol-directed bronchodilator therapy, reassess frequently, request ALS, and prepare to escalate if air movement or mental status worsens."
              />
              <Scenario
                title="Possible Cardiac Wheeze"
                prompt="A 74-year-old has dyspnea, wheezing, crackles, hypertension, and bilateral leg edema."
                answer="Do not assume asthma. Consider pulmonary edema and apply the appropriate respiratory and cardiac protocol."
              />
              <Scenario
                title="Pediatric Fatigue"
                prompt="A child with asthma becomes quieter, less interactive, and has very poor air movement."
                answer="This may represent respiratory failure rather than improvement. Support ventilation, request ALS, and transport rapidly."
              />
              <Scenario
                title="CPAP Failure"
                prompt="An adult on CPAP becomes drowsy and begins vomiting."
                answer="Remove CPAP, protect the airway, suction as needed, support ventilation, and prepare for advanced airway management."
              />
            </div>
          </CourseSection>

          <CourseSection number="11" title="Documentation" description="Document severity, treatment, and response.">
            <Checklist items={[
              "Onset, trigger, and respiratory history",
              "Initial work of breathing and lung sounds",
              "SpO₂ and ETCO₂ when available",
              "Medication name, dose, route, and time",
              "Noninvasive ventilation settings and tolerance",
              "Serial reassessments",
              "Adverse effects or deterioration",
              "ALS request and Medical Control contact",
              "Destination, notification, and ETA",
            ]} />
          </CourseSection>

          <CourseSection number="12" title="Key Takeaways" description="Review before the final quiz.">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Not all wheezing is asthma.",
                "Assess air movement, not just wheezing.",
                "Reassess after every treatment.",
                "A silent chest is an emergency.",
                "Use CPAP/BiPAP only in an appropriate patient.",
                "Children may deteriorate rapidly.",
                "Prepare early for ventilation and airway support.",
                "Do not delay transport for worsening distress.",
              ].map((item) => <Tile key={item}>{item}</Tile>)}
            </div>
          </CourseSection>

          <section className="rounded-3xl border border-red-700 bg-gradient-to-br from-red-950/50 to-zinc-950 p-8 text-center md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
              Course Review Complete
            </p>

            {!secureAssessmentLoaded ? (
              <>
                <h2 className="mt-3 text-4xl font-extrabold">
                  Checking Secure Assessment
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  Verifying your official Bronchospasm / Respiratory Distress assessment status.
                </p>
              </>
            ) : !secureAssessmentPassed ? (
              <>
                <h2 className="mt-3 text-4xl font-extrabold">
                  Ready for the final assessment?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
                  The quiz contains 25 questions. A score of 80% or higher is required to pass.
                </p>

                <Link
                  href="/courses/bronchospasm-respiratory-distress/quiz"
                  className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 font-bold hover:bg-red-500"
                >
                  Begin Quiz
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
                    courseSlug="bronchospasm-respiratory-distress"
                    courseTitle="Bronchospasm / Respiratory Distress"
                    certificateHref="/courses/bronchospasm-respiratory-distress/certificate"
                  />
                </div>
              </>
            )}
          </section>
        </section>
    </main>
  );
}

function CourseSection({ number, title, description, children }: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-16 scroll-mt-24">
      <div className="mb-7 border-b border-zinc-800 pb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">Section {number}</p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-2 font-bold">{value}</p>
    </div>
  );
}

function Tile({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-semibold leading-7 text-zinc-200">{children}</div>;
}

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h3 className="text-2xl font-bold text-red-500">{title}</h3>
      <div className="mt-4 leading-7 text-zinc-300">{children}</div>
    </article>
  );
}

function Alert({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-7 rounded-2xl border border-red-600 bg-red-950/20 p-6">
      <h3 className="text-xl font-bold text-red-400">{title}</h3>
      <div className="mt-3 leading-7 text-zinc-200">{children}</div>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 leading-7 text-zinc-300">
          <span className="font-bold text-red-500">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ChecklistCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h3 className="text-2xl font-bold text-red-500">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7 text-zinc-300">
            <span className="font-bold text-red-500">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Scenario({ title, prompt, answer }: { title: string; prompt: string; answer: string }) {
  return (
    <details className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <summary className="cursor-pointer list-none text-xl font-bold">
        <span className="text-red-500">Case:</span> {title}
      </summary>
      <p className="mt-4 leading-7 text-zinc-300">{prompt}</p>
      <div className="mt-5 rounded-xl border border-red-700 bg-red-950/20 p-5 leading-7 text-zinc-200">
        <strong className="text-red-400">Discussion:</strong> {answer}
      </div>
    </details>
  );
}