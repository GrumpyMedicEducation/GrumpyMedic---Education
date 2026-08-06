"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import CourseEngagementTracker from "../CourseEngagementTracker";

const learningObjectives = [
  "Recognize major obstetrical emergencies and immediate life threats.",
  "Describe EMT and AEMT care for prolapsed cord and postpartum hemorrhage.",
  "Identify paramedic medications and doses in Massachusetts Protocol 2.10.",
  "Explain treatment priorities for eclamptic seizures.",
  "Describe manual uterine displacement during maternal cardiac arrest.",
  "Apply the obstetrical emergency protocol to realistic prehospital scenarios.",
];

export default function ObstetricalEmergenciesCoursePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <CourseEngagementTracker
        courseSlug="obstetrical-emergencies"
        courseTitle="Obstetrical Emergencies"
        requiredMinutes={60}
      />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Obstetrical Emergencies
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
            Massachusetts EMS Protocol 2.10 review covering obstetrical
            assessment, prolapsed cord, postpartum hemorrhage, eclamptic
            seizures, medication administration, and maternal cardiac-arrest
            considerations.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Badge>EMT, AEMT &amp; Paramedic</Badge>
            <Badge>30–45 Minutes</Badge>
            <Badge>20-Question Quiz</Badge>
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
              href="/courses/obstetrical-emergencies/quiz"
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

      <section
        id="course-content"
        className="mx-auto max-w-6xl px-6 py-14"
      >
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
          title="Massachusetts Protocol 2.10 Quick Reference"
          description="Review the GrumpyMedic protocol image before continuing."
        >
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
            <Image
              src="/images/obstetric-emergencies-protocols.png"
              alt="GrumpyMedic obstetrical emergencies protocol quick reference"
              width={1024}
              height={1536}
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="h-auto w-full rounded-xl object-contain"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Protocol Reference
            </p>

            <p className="mt-3 leading-7 text-zinc-300">
              This course reviews Massachusetts Statewide Treatment Protocol
              2.10. Providers must continue to follow current statewide
              protocols, local service policies, medical direction, and their
              authorized scope of practice.
            </p>
          </div>
        </CourseSection>

        <CourseSection
          number="03"
          title="Initial Assessment and Positioning"
          description="Identify the emergency while protecting maternal and fetal circulation."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard
              title="Expose as Necessary"
              text="Assess for bleeding or discharge, crowning, prolapsed cord, breech presentation, and limb presentation."
            />

            <FeatureCard
              title="Avoid Digital Examination"
              text="Do not digitally examine or insert anything into the vagina except when managing the baby’s airway during breech presentation or treating a prolapsed or nuchal cord."
            />

            <FeatureCard
              title="Left-Lateral Position"
              text="When indicated by hemodynamics, place the mother in the left-lateral recumbent position unless a specific obstetrical emergency requires another position."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="04"
          title="Prolapsed Cord"
          description="Relieve pressure on the umbilical cord and prepare for rapid transport."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Callout title="Patient Positioning">
              Place the patient in the knee-chest or Trendelenburg position.
            </Callout>

            <Callout title="Manual Intervention">
              If only the cord has prolapsed and the presenting part has not
              passed through the cervix, gently elevate the presenting part to
              relieve pressure on the umbilical vessels.
            </Callout>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-700 bg-amber-950/20 p-6">
            <p className="font-bold text-amber-400">Important</p>

            <p className="mt-2 leading-7 text-zinc-300">
              Do not attempt to push the prolapsed cord back into the vagina.
              Maintain pressure relief, monitor the patient, and prepare for
              rapid transport.
            </p>
          </div>
        </CourseSection>

        <CourseSection
          number="05"
          title="Postpartum Hemorrhage"
          description="Control visible external bleeding and support uterine contraction."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-green-700 bg-green-950/20 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
                EMT / AEMT Standing Orders
              </p>

              <ul className="mt-5 space-y-3 leading-7 text-zinc-200">
                <li>• Firmly massage the uterine fundus.</li>

                <li>
                  • Apply dressings and direct pressure to visible external
                  perineal lacerations.
                </li>

                <li>• Do not apply intravaginal dressings.</li>

                <li>
                  • Continue routine patient care, reassessment, and rapid
                  transport.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-red-700 bg-red-950/20 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
                Paramedic Standing Orders
              </p>

              <ul className="mt-5 space-y-3 leading-7 text-zinc-200">
                <li>• If available, administer oxytocin 10 units IM.</li>

                <li>
                  • If IV access is already in place, oxytocin may be
                  administered IV. Do not delay the initial dose solely to
                  obtain IV access.
                </li>

                <li>
                  • If available, mix oxytocin 20 units in 1 liter of normal
                  saline and administer it as a wide-open bolus.
                </li>

                <li>
                  • For immediate postpartum hemorrhage only, if available,
                  administer TXA 2 grams IV push.
                </li>
              </ul>
            </div>
          </div>
        </CourseSection>

        <CourseSection
          number="06"
          title="Eclamptic Seizures"
          description="Treat seizures while supporting airway, ventilation, circulation, and transport."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <DoseCard
              medication="Midazolam"
              dose="2–6 mg"
              route="Slow IV, IO, or IM"
            />

            <DoseCard
              medication="Midazolam"
              dose="2–6 mg"
              route="Intranasal"
            />

            <DoseCard
              medication="Magnesium Sulfate"
              dose="2–4 grams"
              route="IV or IO over 5 minutes"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-blue-700 bg-blue-950/20 p-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Medical Control May Order
            </p>

            <ul className="mt-4 space-y-3 leading-7 text-zinc-200">
              <li>• Administration of additional IV normal saline.</li>

              <li>
                • Calcium chloride or calcium gluconate 10%, 20 mg/kg IV or IO
                administered slowly over 5 minutes, to a maximum dose of 1
                gram.
              </li>

              <li>
                • Calcium is used as an antidote for magnesium sulfate.
              </li>

              <li>• Further anticonvulsant therapy.</li>
            </ul>
          </div>
        </CourseSection>

        <CourseSection
          number="07"
          title="Cardiac Arrest in Pregnancy"
          description="Reduce aortocaval compression during maternal resuscitation."
        >
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Special Consideration
            </p>

            <h3 className="mt-3 text-2xl font-extrabold">
              Manually Displace the Gravid Uterus to the Left
            </h3>

            <p className="mt-4 leading-7 text-zinc-300">
              If the fundal height is at or above the level of the umbilicus,
              manually displace the gravid uterus toward the patient’s left
              side to improve venous return while resuscitation continues.
            </p>
          </div>
        </CourseSection>

        <CourseSection
          number="08"
          title="Clinical Scenario"
          description="Apply the protocol to a time-critical postpartum patient."
        >
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-7">
            <p className="text-lg leading-8 text-zinc-200">
              You respond to a 30-year-old patient who delivered approximately
              15 minutes ago. She is pale and diaphoretic with heavy vaginal
              bleeding. Her blood pressure is 82/46 and her pulse is 128.
            </p>

            <h3 className="mt-6 text-xl font-bold">
              Immediate treatment priorities
            </h3>

            <ul className="mt-3 space-y-2 leading-7 text-zinc-300">
              <li>
                • Begin routine patient care and recognize hemorrhagic shock.
              </li>

              <li>• Firmly massage the uterine fundus.</li>

              <li>
                • Apply dressings and pressure to visible external perineal
                bleeding.
              </li>

              <li>• Do not place dressings inside the vagina.</li>

              <li>
                • Support oxygenation, establish vascular access when
                appropriate, reassess frequently, and begin rapid transport.
              </li>

              <li>
                • At the paramedic level, administer oxytocin when available
                and authorized.
              </li>

              <li>
                • For immediate postpartum hemorrhage, administer TXA 2 grams
                IV push when available and authorized.
              </li>
            </ul>
          </div>
        </CourseSection>

        <CourseSection
          number="09"
          title="Key Takeaways"
          description="Review the most important protocol points before taking the quiz."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InfoTile>
              Use left-lateral positioning when indicated by maternal
              hemodynamics unless another emergency requires a different
              position.
            </InfoTile>

            <InfoTile>
              Use knee-chest or Trendelenburg positioning for a prolapsed cord.
            </InfoTile>

            <InfoTile>
              Firmly massage the uterine fundus during postpartum hemorrhage.
            </InfoTile>

            <InfoTile>
              Do not apply intravaginal dressings during postpartum
              hemorrhage.
            </InfoTile>

            <InfoTile>
              Oxytocin and TXA administration are listed under paramedic
              standing orders.
            </InfoTile>

            <InfoTile>
              Magnesium sulfate and midazolam are listed for eclamptic
              seizures.
            </InfoTile>

            <InfoTile>
              Calcium may be ordered by Medical Control as an antidote for
              magnesium sulfate.
            </InfoTile>

            <InfoTile>
              During maternal cardiac arrest, manually displace the gravid
              uterus to the left when the fundus is at or above the umbilicus.
            </InfoTile>
          </div>
        </CourseSection>

        <section className="mt-14 rounded-2xl border border-red-700 bg-gradient-to-br from-red-950/30 to-zinc-900 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Final Knowledge Check
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Ready to Take the Quiz?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-300">
            Answer all 20 questions. A score of 80% or higher is required to
            pass and unlock the completion certificate.
          </p>

          <Link
            href="/courses/obstetrical-emergencies/quiz"
            className="mt-6 inline-block rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-500"
          >
            Start Final Quiz
          </Link>
        </section>

        <p className="mt-10 text-center text-sm leading-6 text-zinc-500">
          Educational content only. Follow current Massachusetts statewide
          protocols, local service policies, medical-control direction,
          medication instructions, and your authorized scope of practice.
        </p>
      </section>
    </main>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-200">
      {children}
    </span>
  );
}

function CourseSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-14">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 font-extrabold">
          {number}
        </span>

        <div>
          <h2 className="text-3xl font-extrabold">{title}</h2>

          <p className="mt-2 leading-7 text-zinc-400">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function InfoTile({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 leading-7 text-zinc-200">
      {children}
    </div>
  );
}

function FeatureCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-zinc-300">
        {text}
      </p>
    </div>
  );
}

function Callout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
      <h3 className="text-xl font-bold text-red-400">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-300">
        {children}
      </p>
    </div>
  );
}

function DoseCard({
  medication,
  dose,
  route,
}: {
  medication: string;
  dose: string;
  route: string;
}) {
  return (
    <div className="rounded-2xl border border-red-700 bg-red-950/20 p-6 text-center">
      <p className="text-lg font-bold text-red-400">
        {medication}
      </p>

      <p className="mt-3 text-3xl font-extrabold">
        {dose}
      </p>

      <p className="mt-2 text-zinc-300">
        {route}
      </p>
    </div>
  );
}