"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function GlucagonCourse() {
  const [complete, setComplete] = useState(false);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 py-10">

          <Link
            href="/courses"
            className="text-red-500 hover:text-red-400"
          >
            ← Back to Courses
          </Link>

          <h1 className="text-5xl font-bold mt-6 text-red-500">
            Glucagon for Hypoglycemia
          </h1>

          <p className="text-xl text-zinc-300 mt-4">
            EMT Management of the Hypoglycemic Patient
          </p>

          <div className="mt-8 rounded-xl bg-zinc-900 border border-zinc-700 p-6">
            <h2 className="text-2xl font-bold text-red-400">
              Course Overview
            </h2>

            <p className="mt-4 text-zinc-300 leading-8">
              This course reviews recognition and treatment of hypoglycemia,
              indications and contraindications for glucagon, proper
              administration, reassessment, and transport considerations.
            </p>
          </div>

          <div className="mt-8 rounded-xl bg-zinc-900 border border-zinc-700 p-6">
            <h2 className="text-2xl font-bold text-red-400">
              Learning Objectives
            </h2>

            <ul className="mt-4 space-y-2 list-disc ml-6 text-zinc-300">
              <li>Recognize signs and symptoms of hypoglycemia.</li>
              <li>Identify patients appropriate for glucagon.</li>
              <li>Understand contraindications.</li>
              <li>Demonstrate correct administration.</li>
              <li>Perform reassessment after treatment.</li>
              <li>Determine appropriate transport decisions.</li>
            </ul>
          </div>

          <div className="mt-8 rounded-xl bg-zinc-900 border border-zinc-700 p-6">
            <h2 className="text-2xl font-bold text-red-400">
              What is Hypoglycemia?
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              Hypoglycemia occurs when blood glucose falls low enough to impair
              normal brain function. Common causes include:
            </p>

            <ul className="list-disc ml-6 mt-4 space-y-2 text-zinc-300">
              <li>Too much insulin</li>
              <li>Missed meals</li>
              <li>Excess exercise</li>
              <li>Alcohol use</li>
              <li>Oral diabetic medications</li>
            </ul>
          </div>

          <div className="mt-8 rounded-xl bg-zinc-900 border border-zinc-700 p-6">
            <h2 className="text-2xl font-bold text-red-400">
              Signs & Symptoms
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-6">

              <div>
                <h3 className="font-bold text-lg">Early</h3>

                <ul className="list-disc ml-6 mt-3 text-zinc-300">
                  <li>Diaphoresis</li>
                  <li>Tremors</li>
                  <li>Hunger</li>
                  <li>Tachycardia</li>
                  <li>Anxiety</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg">Late</h3>

                <ul className="list-disc ml-6 mt-3 text-zinc-300">
                  <li>Confusion</li>
                  <li>Combativeness</li>
                  <li>Seizures</li>
                  <li>Unconsciousness</li>
                  <li>Coma</li>
                </ul>
              </div>

            </div>
          </div>

          <div className="mt-8 rounded-xl bg-zinc-900 border border-zinc-700 p-6">
            <h2 className="text-2xl font-bold text-red-400">
              Glucagon
            </h2>

            <p className="mt-4 leading-8 text-zinc-300">
              Glucagon stimulates the liver to convert stored glycogen into
              glucose, increasing blood sugar.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">

              <div className="bg-zinc-800 rounded-lg p-5">
                <h3 className="font-bold text-green-400">
                  Indications
                </h3>

                <ul className="list-disc ml-6 mt-3 text-zinc-300">
                  <li>Suspected hypoglycemia</li>
                  <li>Unable to swallow safely</li>
                  <li>Altered mental status</li>
                </ul>
              </div>

              <div className="bg-zinc-800 rounded-lg p-5">
                <h3 className="font-bold text-red-400">
                  Contraindications
                </h3>

                <ul className="list-disc ml-6 mt-3 text-zinc-300">
                  <li>Known allergy</li>
                  <li>Pheochromocytoma</li>
                  <li>Insulinoma</li>
                </ul>
              </div>

            </div>
          </div>

          <div className="mt-8 rounded-xl bg-zinc-900 border border-zinc-700 p-6">
            <h2 className="text-2xl font-bold text-red-400">
              Administration
            </h2>

            <ol className="list-decimal ml-6 mt-4 space-y-3 text-zinc-300">
              <li>Confirm indication.</li>
              <li>Check blood glucose if available.</li>
              <li>Verify medication.</li>
              <li>Reconstitute glucagon.</li>
              <li>Administer per local protocol.</li>
              <li>Monitor airway.</li>
              <li>Reassess mental status.</li>
              <li>Repeat blood glucose.</li>
            </ol>
          </div>

          <div className="mt-8 rounded-xl bg-zinc-900 border border-zinc-700 p-6">
            <h2 className="text-2xl font-bold text-red-400">
              Key Points
            </h2>

            <ul className="mt-4 list-disc ml-6 space-y-2 text-zinc-300">
              <li>Always protect the airway.</li>
              <li>Never force oral glucose into an unconscious patient.</li>
              <li>Reassess frequently.</li>
              <li>Transport remains appropriate after treatment.</li>
              <li>Follow your local EMS protocol.</li>
            </ul>
          </div>

          <div className="mt-10 text-center">

            {!complete ? (
              <button
                onClick={() => setComplete(true)}
                className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-bold"
              >
                Mark Lesson Complete
              </button>
            ) : (
              <Link
                href="/courses/glucagon-hypoglycemia/quiz"
                className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg inline-block font-bold"
              >
                Continue to Quiz →
              </Link>
            )}

          </div>

        </div>
      </main>
    </>
  );
}