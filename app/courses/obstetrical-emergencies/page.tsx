"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "../../components/Navbar";

const objectives = [
  "Recognize major obstetrical emergencies and immediate life threats.",
  "Describe EMT/AEMT care for prolapsed cord and postpartum hemorrhage.",
  "Identify paramedic medications and doses in Massachusetts Protocol 2.10.",
  "Explain treatment priorities for eclamptic seizures.",
  "Describe manual uterine displacement during maternal cardiac arrest.",
  "Apply the protocol to realistic prehospital scenarios.",
];

export default function ObstetricalEmergenciesCoursePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

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
            seizures, medication administration, and cardiac-arrest
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
            {objectives.map((objective) => (
              <InfoTile key={objective}>{objective}</InfoTile>
            ))}
          </div>
        </CourseSection>

        <CourseSection
          number="02"
          title="Massachusetts Protocol 2.10 Quick Reference"
          description="Review the protocol image before continuing."
        >
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
            <Image
              src="/obstetric-emergencies-protocol.png"
              alt="GrumpyMedic obstetrical emergencies protocol quick reference"
              width={1024}
              height={1536}
              priority
              className="h-auto w-full rounded-xl"
            />
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
              text="Do not digitally examine or insert anything into the vagina except when managing the baby’s airway in breech presentation or treating a prolapsed or nuchal cord."
            />
            <FeatureCard
              title="Left-Lateral Position"
              text="When indicated by hemodynamics, place the mother left-lateral recumbent unless a specific emergency requires another position."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="04"
          title="Prolapsed Cord"
          description="Relieve pressure on the umbilical cord and transport rapidly."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Callout title="Positioning">
              Use the knee-chest or Trendelenburg position.
            </Callout>
            <Callout title="Manual Intervention">
              If the presenting part has not passed through the cervix, gently
              elevate it to relieve pressure on the umbilical vessels and
              preserve cord blood flow.
            </Callout>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-700 bg-amber-950/20 p-6">
            <p className="font-bold text-amber-400">Important</p>
            <p className="mt-2 leading-7 text-zinc-300">
              Do not attempt to push the prolapsed cord back into the vagina.
              Maintain pressure relief and prepare for rapid transport.
            </p>
          </div>
        </CourseSection>

        <CourseSection
          number="05"
          title="Postpartum Hemorrhage"
          description="Control external bleeding and support uterine contraction."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-green-700 bg-green-950/20 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
                EMT / AEMT Standing Orders
              </p>
              <ul className="mt-5 space-y-3 leading-7 text-zinc-200">
                <li>• Firmly massage the uterine fundus.</li>
                <li>• Apply dressings and pressure to visible external perineal lacerations.</li>
                <li>• Do not apply intravaginal dressings.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-red-700 bg-red-950/20 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
                Paramedic Standing Orders
              </p>
              <ul className="mt-5 space-y-3 leading-7 text-zinc-200">
                <li>• Oxytocin 10 units IM when available.</li>
                <li>• If IV access is already present, oxytocin may be administered IV; do not delay the initial dose to obtain IV access.</li>
                <li>• Oxytocin infusion: 20 units in 1 liter normal saline, wide open.</li>
                <li>• For immediate postpartum hemorrhage only: TXA 2 g IV push.</li>
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
              route="Slow IV/IO/IM"
            />
            <DoseCard
              medication="Midazolam"
              dose="2–6 mg"
              route="IN"
            />
            <DoseCard
              medication="Magnesium sulfate"
              dose="2–4 g"
              route="IV/IO over 5 minutes"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-blue-700 bg-blue-950/20 p-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Medical Control May Order
            </p>
            <ul className="mt-4 space-y-3 leading-7 text-zinc-200">
              <li>• Additional IV normal saline.</li>
              <li>
                • Calcium chloride or calcium gluconate 10%: 20 mg/kg IV/IO
                slowly over 5 minutes, maximum 1 gram, as an antidote for
                magnesium sulfate.
              </li>
              <li>• Further anticonvulsant therapy.</li>
            </ul>
          </div>
        </CourseSection>

        <CourseSection
          number="07"
          title="Cardiac Arrest in Pregnancy"
          description="Reduce aortocaval compression during resuscitation."
        >
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-7">
            <h3 className="text-2xl font-extrabold">
              Manually Displace the Gravid Uterus to the Left
            </h3>
            <p className="mt-4 leading-7 text-zinc-300">
              When the fundal height is at or above the umbilicus, manually
              displace the gravid uterus to the patient’s left to improve
              venous return while resuscitation continues.
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
              A 30-year-old patient delivered 15 minutes ago. She is pale and
              diaphoretic with heavy vaginal bleeding, BP 82/46, and pulse 128.
            </p>

            <h3 className="mt-6 text-xl font-bold">Treatment priorities</h3>
            <ul className="mt-3 space-y-2 leading-7 text-zinc-300">
              <li>• Routine patient care and rapid recognition of hemorrhagic shock.</li>
              <li>• Firm uterine fundal massage.</li>
              <li>• Pressure to visible external perineal bleeding; no vaginal packing.</li>
              <li>• Oxygenation, vascular access, reassessment, and rapid transport.</li>
              <li>• Paramedic: oxytocin and, for immediate postpartum hemorrhage, TXA 2 g IV push when available and authorized.</li>
            </ul>
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
            Answer all 20 questions. A score of 80% or higher unlocks the
            completion certificate.
          </p>
          <Link
            href="/courses/obstetrical-emergencies/quiz"
            className="mt-6 inline-block rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-500"
          >
            Start Final Quiz
          </Link>
        </section>

        <p className="mt-10 text-center text-sm leading-6 text-zinc-500">
          Educational content only. Follow current Massachusetts and local
          protocols, medical direction, service requirements, and medication
          instructions.
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
          <p className="mt-2 leading-7 text-zinc-400">{description}</p>
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

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-zinc-300">{text}</p>
    </div>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
      <h3 className="text-xl font-bold text-red-400">{title}</h3>
      <p className="mt-3 leading-7 text-zinc-300">{children}</p>
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
      <p className="text-lg font-bold text-red-400">{medication}</p>
      <p className="mt-3 text-3xl font-extrabold">{dose}</p>
      <p className="mt-2 text-zinc-300">{route}</p>
    </div>
  );
}
