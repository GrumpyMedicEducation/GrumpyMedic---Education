import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function AcutePulmonaryEdemaPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <Link
          href="/courses"
          className="text-sm font-semibold text-red-500 hover:text-red-400"
        >
          ← Back to Courses
        </Link>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 shadow-xl">
          <div className="flex items-center gap-4">
            <img
              src="/grumpy-medic-logo.jpeg"
              alt="GrumpyMedic24"
              className="h-16 w-16 rounded-full border-2 border-red-500 object-cover"
            />

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-red-500">
                GRUMPYMEDIC EDUCATION
              </p>
              <p className="text-xs text-zinc-400">
                Real EMS. Real Critical Thinking.
              </p>
            </div>
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight">
            Acute Pulmonary Edema
          </h1>

          <h2 className="mt-3 text-2xl font-semibold text-red-500">
            IV / IO Nitroglycerin Therapy
          </h2>

          <p className="mt-6 max-w-4xl text-xl leading-8 text-zinc-300">
            Review acute pulmonary edema recognition, CPAP/BiPAP support,
            nitroglycerin use, blood pressure monitoring, contraindications,
            and EMS treatment priorities.
          </p>
        </div>

        <section className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-3xl font-bold">What Is Acute Pulmonary Edema?</h2>
          <p className="mt-4 text-zinc-300">
            Acute pulmonary edema is rapid fluid accumulation in the alveoli and
            lung interstitium. It is most commonly caused by acute left-sided
            heart failure. Increased hydrostatic pressure pushes fluid into the
            lungs, impairing gas exchange and causing severe respiratory
            distress.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Signs & Symptoms</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300">
              <li>Sudden severe dyspnea</li>
              <li>Orthopnea or inability to lie flat</li>
              <li>Tachypnea</li>
              <li>Diffuse crackles or rales</li>
              <li>Diaphoresis and anxiety</li>
              <li>Hypoxia or cyanosis</li>
              <li>Possible pink frothy sputum</li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Assessment Findings</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300">
              <li>Patent airway with labored breathing</li>
              <li>Accessory muscle use</li>
              <li>SpO₂ often below 94%</li>
              <li>Elevated blood pressure is common</li>
              <li>Possible JVD or pedal edema</li>
              <li>Cardiac monitor may show ischemia or dysrhythmia</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-3xl font-bold">Treatment Priorities</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-300">
            <li>Airway and oxygenation support</li>
            <li>CPAP/BiPAP to improve oxygenation and reduce preload</li>
            <li>Nitroglycerin to reduce preload and afterload</li>
            <li>Close blood pressure monitoring</li>
            <li>IV/IO access and cardiac monitoring</li>
            <li>Rapid transport and frequent reassessment</li>
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/courses"
            className="rounded-lg border border-zinc-700 px-5 py-3 font-semibold hover:bg-zinc-900"
          >
            Back to Courses
          </Link>

          <Link
            href="/courses/acute-pulmonary-edema/quiz"
            className="rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
          >
            Start Quiz
          </Link>
        </div>
      </section>
    </main>
  );
}