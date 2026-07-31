"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import CourseAccessGate from "../components/CourseAccessGate";

export default function MentalHealthPage() {
  const [complete, setComplete] = useState(false);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Link
            href="/courses"
            className="font-semibold text-red-500 transition hover:text-red-400"
          >
            ← Back to Courses
          </Link>

          <div className="mt-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">
              EMS Wellness and Behavioral Health Course
            </p>

            <h1 className="mt-3 text-4xl font-extrabold text-red-500 md:text-5xl">
              Mental Health Awareness
            </h1>

            <p className="mt-4 max-w-3xl text-xl leading-8 text-zinc-300">
              Mental health is just as important as physical
              health. This course provides education for EMS
              providers, firefighters, healthcare
              professionals, patients, and families.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Course Type
              </p>

              <p className="mt-2 font-bold text-white">
                Behavioral Health
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Audience
              </p>

              <p className="mt-2 font-bold text-white">
                EMS and Fire Providers
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Completion
              </p>

              <p className="mt-2 font-bold text-white">
                Lesson and Quiz
              </p>
            </div>
          </div>

          <section className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Public Course Preview
            </p>

            <h2 className="mt-3 text-2xl font-bold text-red-400">
              Course Overview
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              This course introduces common mental-health
              emergencies, EMS assessment priorities,
              verbal de-escalation, suicide-risk awareness,
              safe transport considerations, and first
              responder wellness.
            </p>

            <p className="mt-4 text-sm leading-6 text-zinc-500">
              The course overview and learning objectives
              are available publicly. A free GrumpyMedic
              Education account is required to access the
              full lesson and quiz.
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold text-red-400">
              Learning Objectives
            </h2>

            <ul className="ml-6 mt-4 list-disc space-y-2 text-zinc-300">
              <li>
                Recognize common mental-health and
                behavioral emergencies.
              </li>

              <li>
                Identify immediate scene-safety and medical
                assessment priorities.
              </li>

              <li>
                Consider medical causes of altered behavior.
              </li>

              <li>
                Apply verbal de-escalation and active
                listening techniques.
              </li>

              <li>
                Recognize warning signs associated with
                suicide risk.
              </li>

              <li>
                Describe safe patient transport
                considerations.
              </li>

              <li>
                Recognize burnout, compassion fatigue, and
                post-traumatic stress in first responders.
              </li>
            </ul>
          </section>

          <div className="mt-8">
            <CourseAccessGate
              accessLevel="login"
              title="Sign In to Access the Full Course"
              description="Create a free GrumpyMedic Education account or log in to complete the Mental Health Awareness lesson, continue to the quiz, and qualify for a certificate."
            >
              <section className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                  Full Course Content
                </p>

                <h2 className="mt-3 text-2xl font-bold text-red-400">
                  Mental-Health Crisis
                </h2>

                <p className="mt-4 leading-8 text-zinc-300">
                  Mental-health emergencies may affect
                  behavior, judgment, perception,
                  communication, and the ability to care for
                  oneself. Providers should approach these
                  calls with safety, empathy, and awareness
                  that an underlying medical condition may
                  be contributing to the presentation.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <TopicItem title="Depression" />
                  <TopicItem title="Anxiety" />
                  <TopicItem title="Suicidal Ideation" />
                  <TopicItem title="Behavioral Emergencies" />
                  <TopicItem title="Psychosis" />
                  <TopicItem title="Panic Attacks" />
                </div>
              </section>

              <section className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                <h2 className="text-2xl font-bold text-red-400">
                  EMS Assessment
                </h2>

                <p className="mt-4 leading-8 text-zinc-300">
                  Behavioral symptoms should not
                  automatically be assumed to have a
                  psychiatric cause. Begin with scene safety
                  and a complete primary assessment, then
                  evaluate for medical, traumatic, toxic,
                  and environmental causes.
                </p>

                <div className="mt-6 space-y-4">
                  <AssessmentItem
                    number="1"
                    title="Scene Safety"
                    description="Identify weapons, hazards, bystanders, escape routes, and the need for law-enforcement assistance."
                  />

                  <AssessmentItem
                    number="2"
                    title="ABCs"
                    description="Assess airway, breathing, circulation, level of consciousness, and immediate life threats."
                  />

                  <AssessmentItem
                    number="3"
                    title="Rule Out Medical Causes"
                    description="Consider hypoglycemia, hypoxia, head injury, stroke, infection, medication effects, substance use, and toxic exposure."
                  />

                  <AssessmentItem
                    number="4"
                    title="Suicide-Risk Assessment"
                    description="Ask directly about suicidal thoughts, plans, access to lethal means, prior attempts, and protective factors."
                  />

                  <AssessmentItem
                    number="5"
                    title="Capacity Evaluation"
                    description="Determine whether the patient can understand information, appreciate consequences, reason through choices, and communicate a decision."
                  />
                </div>
              </section>

              <section className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                <h2 className="text-2xl font-bold text-red-400">
                  Suicide-Risk Awareness
                </h2>

                <p className="mt-4 leading-8 text-zinc-300">
                  Providers should take all suicidal
                  statements seriously. Asking direct,
                  respectful questions about suicide does
                  not create suicidal thoughts and may help
                  identify immediate risk.
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-red-900 bg-black p-5">
                    <h3 className="text-lg font-bold text-red-400">
                      Warning Signs
                    </h3>

                    <ul className="ml-6 mt-4 list-disc space-y-2 text-zinc-300">
                      <li>Talking about wanting to die</li>

                      <li>
                        Expressing hopelessness or feeling
                        trapped
                      </li>

                      <li>
                        Giving away important possessions
                      </li>

                      <li>
                        Recent major loss or traumatic event
                      </li>

                      <li>
                        Access to weapons or medications
                      </li>

                      <li>Prior suicide attempts</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-yellow-900 bg-black p-5">
                    <h3 className="text-lg font-bold text-yellow-400">
                      Direct Questions
                    </h3>

                    <ul className="ml-6 mt-4 list-disc space-y-2 text-zinc-300">
                      <li>
                        Are you thinking about hurting
                        yourself?
                      </li>

                      <li>
                        Are you thinking about suicide?
                      </li>

                      <li>Do you have a specific plan?</li>

                      <li>
                        Do you have access to the method?
                      </li>

                      <li>
                        Have you attempted suicide before?
                      </li>

                      <li>
                        Is there someone you trust who can
                        support you?
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                <h2 className="text-2xl font-bold text-red-400">
                  Crisis Intervention
                </h2>

                <p className="mt-4 leading-8 text-zinc-300">
                  The goal of crisis intervention is to
                  reduce immediate danger, establish
                  communication, and safely move the patient
                  toward further evaluation and care.
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-green-900 bg-black p-5">
                    <h3 className="text-lg font-bold text-green-400">
                      Helpful Approaches
                    </h3>

                    <ul className="ml-6 mt-4 list-disc space-y-2 text-zinc-300">
                      <li>
                        Speak calmly and introduce yourself.
                      </li>

                      <li>
                        Use simple, direct statements.
                      </li>

                      <li>
                        Allow extra personal space.
                      </li>

                      <li>
                        Listen without interrupting.
                      </li>

                      <li>
                        Acknowledge the patient&apos;s
                        feelings.
                      </li>

                      <li>
                        Offer realistic choices when
                        possible.
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-red-900 bg-black p-5">
                    <h3 className="text-lg font-bold text-red-400">
                      Avoid
                    </h3>

                    <ul className="ml-6 mt-4 list-disc space-y-2 text-zinc-300">
                      <li>
                        Arguing or challenging delusions
                      </li>

                      <li>Making sudden movements</li>

                      <li>Crowding the patient</li>

                      <li>Using threatening language</li>

                      <li>
                        Making promises you cannot keep
                      </li>

                      <li>
                        Ignoring escalating behavior
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                <h2 className="text-2xl font-bold text-red-400">
                  Safe Patient Transport
                </h2>

                <ul className="ml-6 mt-4 list-disc space-y-3 text-zinc-300">
                  <li>
                    Follow local protocols and
                    medical-control guidance.
                  </li>

                  <li>
                    Maintain a calm and controlled
                    environment.
                  </li>

                  <li>
                    Remove unnecessary equipment or objects
                    that could become weapons.
                  </li>

                  <li>
                    Continue monitoring mental status,
                    airway, breathing, circulation, and
                    behavior.
                  </li>

                  <li>
                    Coordinate with law enforcement when
                    necessary.
                  </li>

                  <li>
                    Use restraints only when indicated and
                    according to protocol.
                  </li>

                  <li>
                    Never transport a restrained patient in
                    a prone position.
                  </li>
                </ul>
              </section>

              <section className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                <h2 className="text-2xl font-bold text-red-400">
                  First Responder Wellness
                </h2>

                <p className="mt-4 leading-8 text-zinc-300">
                  Repeated exposure to trauma, long shifts,
                  interrupted sleep, organizational stress,
                  and responsibility for high-risk decisions
                  can affect first responders over time.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <WellnessItem
                    title="PTSD Awareness"
                    description="Persistent intrusive memories, avoidance, negative mood changes, or increased alertness after trauma may require professional support."
                  />

                  <WellnessItem
                    title="Burnout"
                    description="Emotional exhaustion, reduced motivation, detachment, and decreased effectiveness may develop after prolonged stress."
                  />

                  <WellnessItem
                    title="Compassion Fatigue"
                    description="Repeated exposure to the suffering of others may cause emotional depletion and reduced empathy."
                  />

                  <WellnessItem
                    title="Peer Support"
                    description="Trusted peers can provide early support, help normalize seeking assistance, and connect members with additional resources."
                  />

                  <WellnessItem
                    title="Sleep and Recovery"
                    description="Sleep, hydration, nutrition, physical activity, and time away from work support physical and emotional recovery."
                  />

                  <WellnessItem
                    title="Professional Help"
                    description="Seeking confidential professional support is a responsible step when stress begins affecting work, relationships, sleep, or safety."
                  />
                </div>
              </section>

              <section className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
                <h2 className="text-2xl font-bold text-red-400">
                  Key Points
                </h2>

                <ul className="ml-6 mt-4 list-disc space-y-3 text-zinc-300">
                  <li>
                    Scene safety remains the first priority.
                  </li>

                  <li>
                    Consider medical causes of altered
                    behavior.
                  </li>

                  <li>
                    Use calm communication and active
                    listening.
                  </li>

                  <li>
                    Ask direct questions when suicide risk is
                    suspected.
                  </li>

                  <li>
                    Protect patient dignity while
                    maintaining safety.
                  </li>

                  <li>
                    Continue reassessment throughout
                    transport.
                  </li>

                  <li>
                    First responder mental health deserves
                    the same attention as physical health.
                  </li>
                </ul>
              </section>

              <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
                {!complete ? (
                  <>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                      Lesson Progress
                    </p>

                    <h2 className="mt-3 text-2xl font-extrabold">
                      Ready to Continue?
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl leading-7 text-zinc-400">
                      Mark the lesson complete after
                      reviewing the course content. You will
                      then be able to continue to the final
                      quiz.
                    </p>

                    <button
                      type="button"
                      onClick={() => setComplete(true)}
                      className="mt-6 rounded-xl bg-red-600 px-8 py-4 font-bold text-white transition hover:bg-red-500"
                    >
                      Mark Lesson Complete
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
                      Lesson Complete
                    </p>

                    <h2 className="mt-3 text-2xl font-extrabold">
                      Continue to the Quiz
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl leading-7 text-zinc-400">
                      Complete the quiz to test your
                      understanding and determine
                      certificate eligibility.
                    </p>

                    <Link
                      href="/courses/mental-health-awareness/quiz"
                      className="mt-6 inline-block rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-500"
                    >
                      Continue to Quiz →
                    </Link>
                  </>
                )}
              </section>

              <p className="mt-8 text-center text-sm leading-6 text-zinc-500">
                Educational content only. Follow current
                state and local protocols, medical-director
                guidance, service policy, and applicable
                behavioral-health procedures.
              </p>
            </CourseAccessGate>
          </div>
        </div>
      </main>
    </>
  );
}

function TopicItem({
  title,
}: {
  title: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black p-4">
      <p className="font-semibold text-zinc-200">
        {title}
      </p>
    </div>
  );
}

function AssessmentItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-zinc-800 bg-black p-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 font-extrabold text-white">
        {number}
      </span>

      <div>
        <h3 className="font-bold text-white">
          {title}
        </h3>

        <p className="mt-2 leading-7 text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function WellnessItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black p-5">
      <h3 className="font-bold text-red-400">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-400">
        {description}
      </p>
    </div>
  );
}