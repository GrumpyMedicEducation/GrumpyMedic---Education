"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

type Medication = {
  name: string;
  dose: number;
  unit: "mg/kg" | "mcg/kg" | "mL/kg";
  maxDose: number | null;
  concentration: number;
  concentrationLabel: string;
  route: string;
  note: string;
};

const medications: Medication[] = [
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
    maxDose: null,
    concentration: 50,
    concentrationLabel: "50 mg/mL",
    route: "Slow IV/IO",
    note:
      "Adult pain management: 0.15 mg/kg IV/IO administered slowly. May repeat the same dose once after 15 minutes. No maximum dose is specified in Protocol 2.13. Verify the medication concentration before administration.",
  },
  {
    name: "Ketamine - Pain IM/IN",
    dose: 0.3,
    unit: "mg/kg",
    maxDose: null,
    concentration: 50,
    concentrationLabel: "50 mg/mL",
    route: "IM or IN",
    note:
      "Adult pain management: 0.3 mg/kg IM/IN. May repeat the same dose once after 20 minutes. No maximum dose is specified in Protocol 2.13. Verify the medication concentration before administration.",
  },
  {
    name: "Ketamine - Behavioral IM",
    dose: 4,
    unit: "mg/kg",
    maxDose: 400,
    concentration: 50,
    concentrationLabel: "50 mg/mL",
    route: "IM only",
    note:
      "Behavioral emergency: 4 mg/kg IM only, maximum 400 mg. For patients over age 70, limit to half the calculated dose per protocol.",
  },
  {
    name: "Fentanyl",
    dose: 1,
    unit: "mcg/kg",
    maxDose: 150,
    concentration: 50,
    concentrationLabel: "50 mcg/mL",
    route: "IV/IO/IM/IN",
    note:
      "Monitor respiratory status and blood pressure. Confirm repeat-dose and total-dose limits with the applicable protocol.",
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
    note:
      "Common adult dose is 4 mg. Ondansetron is contraindicated in patients with a prolonged QT interval.",
  },
  {
    name: "Diphenhydramine",
    dose: 1,
    unit: "mg/kg",
    maxDose: 50,
    concentration: 50,
    concentrationLabel: "50 mg/mL",
    route: "IV/IO/IM",
    note:
      "Verify that this medication and route remain authorized under the applicable current protocol.",
  },
  {
    name: "Dextrose D10",
    dose: 5,
    unit: "mL/kg",
    maxDose: 250,
    concentration: 0.1,
    concentrationLabel: "D10 = 0.1 g/mL",
    route: "IV/IO",
    note:
      "Dose is calculated in mL/kg. Recheck blood glucose after administration.",
  },
  {
    name: "Epinephrine 1:1,000 IM",
    dose: 0.01,
    unit: "mg/kg",
    maxDose: 0.5,
    concentration: 1,
    concentrationLabel: "1 mg/mL",
    route: "IM",
    note:
      "Used for anaphylaxis. Confirm the appropriate adult or pediatric maximum dose with the applicable protocol.",
  },
  {
    name: "Magnesium Sulfate",
    dose: 40,
    unit: "mg/kg",
    maxDose: 2000,
    concentration: 500,
    concentrationLabel: "500 mg/mL",
    route: "IV/IO",
    note:
      "Used for specific indications such as asthma, eclampsia, or torsades according to protocol.",
  },
];

function getDoseUnit(unit: Medication["unit"]) {
  if (unit === "mcg/kg") {
    return "mcg";
  }

  if (unit === "mL/kg") {
    return "mL";
  }

  return "mg";
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  return value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

export default function DrugCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [selectedMedication, setSelectedMedication] = useState(
    medications[0].name,
  );

  const med =
    medications.find(
      (medication) => medication.name === selectedMedication,
    ) ?? medications[0];

  const result = useMemo(() => {
    const weightNum = Number(weight);

    if (!Number.isFinite(weightNum) || weightNum <= 0) {
      return null;
    }

    const calculatedDose = weightNum * med.dose;

    const finalDose =
      med.maxDose === null
        ? calculatedDose
        : Math.min(calculatedDose, med.maxDose);

    const volume =
      med.unit === "mL/kg"
        ? finalDose
        : finalDose / med.concentration;

    return {
      calculatedDose,
      finalDose,
      volume,
      capped:
        med.maxDose !== null && calculatedDose > med.maxDose,
    };
  }, [weight, med]);

  const doseUnit = getDoseUnit(med.unit);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-8 py-10">
        <Link
          href="/resources"
          className="text-sm font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Resources
        </Link>

        <h1 className="mt-8 text-5xl font-extrabold">
          Drug Calculator
        </h1>

        <p className="mt-3 text-zinc-400">
          EMS medication dose and volume calculator. Always verify the
          medication, concentration, route, patient population, maximum dose,
          and current local protocol.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="patient-weight"
                className="text-sm font-semibold text-zinc-300"
              >
                Patient Weight (kg)
              </label>

              <input
                id="patient-weight"
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                placeholder="Example: 80"
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="medication"
                className="text-sm font-semibold text-zinc-300"
              >
                Medication
              </label>

              <select
                id="medication"
                value={selectedMedication}
                onChange={(event) =>
                  setSelectedMedication(event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
              >
                {medications.map((medication) => (
                  <option
                    key={medication.name}
                    value={medication.name}
                  >
                    {medication.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-zinc-700 bg-black p-5">
            <h2 className="text-3xl font-bold text-red-500">
              {med.name}
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Info
                label="Dose"
                value={`${formatNumber(med.dose)} ${med.unit}`}
              />

              <Info
                label="Maximum Dose"
                value={
                  med.maxDose === null
                    ? "Not specified"
                    : `${formatNumber(med.maxDose)} ${doseUnit}`
                }
              />

              <Info
                label="Concentration"
                value={med.concentrationLabel}
              />

              <Info
                label="Route"
                value={med.route}
              />
            </div>

            <p className="mt-5 leading-7 text-zinc-300">
              {med.note}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <ResultCard
              label="Calculated Dose"
              value={
                result
                  ? `${formatNumber(result.calculatedDose)} ${doseUnit}`
                  : "--"
              }
            />

            <ResultCard
              label="Dose to Give"
              value={
                result
                  ? `${formatNumber(result.finalDose)} ${doseUnit}`
                  : "--"
              }
            />

            <ResultCard
              label="Volume"
              value={
                result
                  ? `${formatNumber(result.volume)} mL`
                  : "--"
              }
            />
          </div>

          {result?.capped && (
            <div className="mt-6 rounded-xl border border-yellow-600 bg-yellow-950/30 p-4 text-yellow-200">
              The calculated dose exceeds the listed maximum. The displayed
              dose has been limited to the maximum dose. Confirm with the
              applicable protocol before administration.
            </div>
          )}

          {result && med.maxDose === null && (
            <div className="mt-6 rounded-xl border border-blue-700 bg-blue-950/30 p-4 text-blue-200">
              This protocol does not specify a maximum dose for this ketamine
              pain route. The calculator has not applied a maximum-dose cap.
            </div>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-red-700 bg-red-950/30 p-6">
          <h2 className="text-2xl font-bold text-red-500">
            Safety Reminder
          </h2>

          <p className="mt-3 leading-7 text-zinc-300">
            This calculator is for education only. Confirm the medication,
            concentration, route, maximum dose, contraindications, patient
            condition, monitoring requirements, and current EMS protocol
            before administering any medication.
          </p>
        </div>
      </section>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-950 p-4">
      <p className="text-xs uppercase tracking-wide text-zinc-400">
        {label}
      </p>

      <p className="mt-1 font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-black p-5">
      <p className="text-xs uppercase tracking-wide text-zinc-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-red-500">
        {value}
      </p>
    </div>
  );
}