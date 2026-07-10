"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const medications = [
  {
    name: "TXA",
    dose: 15,
    unit: "mg/kg",
    maxDose: 1000,
    concentration: 10,
    concentrationLabel: "1 gram in 100 mL = 10 mg/mL",
    route: "Slow IV/IO over 10 minutes",
    note: "Use for significant hemorrhage per local protocol.",
  },
  {
      name: "Ketamine - Pain IV/IO",
      dose: 0.15,
      unit: "mg/kg",
      maxDose: 50,
      concentration: 50,
      concentrationLabel: "50 mg/mL",
      route: "IV/IO slow",
      note: "Pain management: 0.15 mg/kg IV/IO slowly. May repeat once in 15 minutes per protocol.",
    },
    {
      name: "Ketamine - Behavioral IM",
      dose: 4,
      unit: "mg/kg",
      maxDose: 400,
      concentration: 50,
      concentrationLabel: "50 mg/mL",
      route: "IM only",
      note: "Behavioral emergency: 4 mg/kg IM only, maximum 400 mg. For patients over 70, limit to half dose per protocol.",
    },
  {
    name: "Fentanyl",
    dose: 1,
    unit: "mcg/kg",
    maxDose: 150,
    concentration: 50,
    concentrationLabel: "50 mcg/mL",
    route: "IV/IO/IN",
    note: "Monitor respiratory status and blood pressure.",
  },
  {
    name: "Midazolam",
    dose: 0.1,
    unit: "mg/kg",
    maxDose: 5,
    concentration: 5,
    concentrationLabel: "5 mg/mL",
    route: "IV/IO/IM/IN",
    note: "Monitor airway, respirations, and blood pressure.",
  },
  {
    name: "Ondansetron",
    dose: 0.1,
    unit: "mg/kg",
    maxDose: 4,
    concentration: 2,
    concentrationLabel: "2 mg/mL",
    route: "IV/IO/IM/PO",
    note: "Common adult dose is 4 mg per local protocol.",
  },
  {
    name: "Diphenhydramine",
    dose: 1,
    unit: "mg/kg",
    maxDose: 50,
    concentration: 50,
    concentrationLabel: "50 mg/mL",
    route: "IV/IO/IM",
    note: "Use caution with sedation and anticholinergic effects.",
  },
  {
    name: "Dextrose D10",
    dose: 5,
    unit: "mL/kg",
    maxDose: 250,
    concentration: 0.1,
    concentrationLabel: "D10 = 0.1 g/mL",
    route: "IV/IO",
    note: "Dose often based on mL/kg. Recheck glucose after administration.",
  },
  {
    name: "Epinephrine 1:1,000 IM",
    dose: 0.01,
    unit: "mg/kg",
    maxDose: 0.5,
    concentration: 1,
    concentrationLabel: "1 mg/mL",
    route: "IM",
    note: "Used for anaphylaxis. Adult max commonly 0.3–0.5 mg.",
  },
  {
    name: "Magnesium Sulfate",
    dose: 40,
    unit: "mg/kg",
    maxDose: 2000,
    concentration: 500,
    concentrationLabel: "500 mg/mL",
    route: "IV/IO",
    note: "Used for asthma, eclampsia, or torsades per protocol.",
  },
];

export default function DrugCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [selectedMedication, setSelectedMedication] = useState(medications[0].name);

  const med = medications.find((m) => m.name === selectedMedication) ?? medications[0];

  const result = useMemo(() => {
    const weightNum = Number(weight);

    if (!weightNum || weightNum <= 0) {
      return null;
    }

    const calculatedDose = weightNum * med.dose;
    const finalDose = Math.min(calculatedDose, med.maxDose);
    const volume = finalDose / med.concentration;

    return {
      calculatedDose,
      finalDose,
      volume,
      capped: calculatedDose > med.maxDose,
    };
  }, [weight, med]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-8 py-10">
        <Link href="/resources" className="text-sm font-semibold text-red-500">
          ← Back to Resources
        </Link>

        <h1 className="mt-8 text-5xl font-extrabold">Drug Calculator</h1>

        <p className="mt-3 text-zinc-400">
          EMS medication dose and volume calculator. Always verify with your
          local protocol, medication concentration, and medical control.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-zinc-300">
                Patient Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Example: 80"
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-zinc-300">
                Medication
              </label>
              <select
                value={selectedMedication}
                onChange={(e) => setSelectedMedication(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-red-500"
              >
                {medications.map((medication) => (
                  <option key={medication.name} value={medication.name}>
                    {medication.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-zinc-700 bg-black p-5">
            <h2 className="text-3xl font-bold text-red-500">{med.name}</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Info label="Dose" value={`${med.dose} ${med.unit}`} />
              <Info label="Max Dose" value={`${med.maxDose} ${med.unit.includes("mcg") ? "mcg" : med.unit.includes("mL") ? "mL" : "mg"}`} />
              <Info label="Concentration" value={med.concentrationLabel} />
              <Info label="Route" value={med.route} />
            </div>

            <p className="mt-5 text-zinc-300">{med.note}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <ResultCard
              label="Calculated Dose"
              value={
                result
                  ? `${result.calculatedDose.toFixed(2)} ${med.unit.includes("mcg") ? "mcg" : med.unit.includes("mL") ? "mL" : "mg"}`
                  : "--"
              }
            />

            <ResultCard
              label="Dose to Give"
              value={
                result
                  ? `${result.finalDose.toFixed(2)} ${med.unit.includes("mcg") ? "mcg" : med.unit.includes("mL") ? "mL" : "mg"}`
                  : "--"
              }
            />

            <ResultCard
              label="Volume"
              value={result ? `${result.volume.toFixed(2)} mL` : "--"}
            />
          </div>

          {result?.capped && (
            <div className="mt-6 rounded-xl border border-yellow-600 bg-yellow-950/30 p-4 text-yellow-200">
              This dose hit the maximum dose limit. Confirm with protocol before
              administration.
            </div>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-red-700 bg-red-950/30 p-6">
          <h2 className="text-2xl font-bold text-red-500">Safety Reminder</h2>

          <p className="mt-3 text-zinc-300">
            This calculator is for education only. Confirm the medication,
            concentration, route, maximum dose, contraindications, patient
            condition, and local EMS protocol before administering any drug.
          </p>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-950 p-4">
      <p className="text-xs uppercase text-zinc-400">{label}</p>
      <p className="mt-1 font-bold text-white">{value}</p>
    </div>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-black p-5">
      <p className="text-xs uppercase text-zinc-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-red-500">{value}</p>
    </div>
  );
}