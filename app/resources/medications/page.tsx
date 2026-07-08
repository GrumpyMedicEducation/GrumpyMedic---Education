import Link from "next/link";
import Navbar from "../../components/Navbar";

const medications = [
  {
    name: "Nitroglycerin",
    category: "Cardiac / Pulmonary Edema",
    indications: [
      "Chest pain suspected cardiac origin",
      "Acute pulmonary edema with hypertension",
      "CHF with respiratory distress",
    ],
    contraindications: [
      "Hypotension",
      "Recent erectile dysfunction medication use",
      "Right-sided/inferior MI concern",
      "Severe bradycardia or tachycardia with instability",
    ],
    dose: "Follow local protocol. Common EMS use: SL nitro 0.4 mg, repeat as allowed with BP monitoring.",
    pearls: [
      "Check blood pressure before each dose.",
      "CPAP and nitro work well together in severe pulmonary edema.",
      "Monitor for sudden hypotension.",
    ],
  },
  {
    name: "Albuterol",
    category: "Respiratory",
    indications: [
      "Bronchospasm",
      "Asthma",
      "COPD exacerbation",
      "Wheezing with respiratory distress",
    ],
    contraindications: [
      "Known hypersensitivity",
      "Use caution with significant tachycardia",
    ],
    dose: "Follow local protocol. Common neb dose: 2.5 mg by nebulizer.",
    pearls: [
      "Wheezing is not the same as pulmonary edema.",
      "Assess lung sounds before and after treatment.",
      "Can increase heart rate.",
    ],
  },
  {
    name: "Epinephrine",
    category: "Anaphylaxis / Cardiac Arrest",
    indications: [
      "Anaphylaxis",
      "Cardiac arrest",
      "Severe asthma per protocol",
    ],
    contraindications: [
      "No absolute contraindication in life-threatening anaphylaxis",
      "Use caution in cardiac patients when not in arrest",
    ],
    dose: "Follow local protocol. Dose depends on indication and concentration.",
    pearls: [
      "Confirm concentration before administration.",
      "IM epi is first-line for anaphylaxis.",
      "Do not delay epi in true anaphylaxis.",
    ],
  },
];

export default function MedicationReferencePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <Link
          href="/resources"
          className="text-sm font-semibold text-red-500 hover:text-red-400"
        >
          ← Back to Resources
        </Link>

        <h1 className="mt-8 text-5xl font-extrabold">
          Medication Reference
        </h1>

        <p className="mt-3 text-zinc-400">
          Quick EMS medication reference. Always follow your local protocols and medical control.
        </p>

        <div className="mt-10 grid gap-6">
          {medications.map((med) => (
            <div
              key={med.name}
              className="rounded-xl border border-zinc-700 bg-zinc-900 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-3xl font-bold text-red-500">
                  {med.name}
                </h2>

                <span className="rounded-full border border-zinc-700 px-4 py-1 text-sm text-zinc-300">
                  {med.category}
                </span>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold">Indications</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-zinc-300">
                    {med.indications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold">Contraindications / Cautions</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-6 text-zinc-300">
                    {med.contraindications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-zinc-700 bg-black p-4">
                <h3 className="font-bold">Dose</h3>
                <p className="mt-2 text-zinc-300">{med.dose}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold">Field Pearls</h3>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-zinc-300">
                  {med.pearls.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}