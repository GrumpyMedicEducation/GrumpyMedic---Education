"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

type DoseUnit = "mg" | "mcg" | "mL";

type Medication = {
  name: string;
  doseType: "weight-based" | "fixed" | "weight-range";
  dose?: number;
  unit?: "mg/kg" | "mcg/kg" | "mL/kg";
  fixedDose?: number;
  doseUnit: DoseUnit;
  maxDose: number | null;
  concentration: number;
  concentrationLabel: string;
  route: string;
  note: string;
  requiresWeight: boolean;
  calculateDose?: (weight: number) => number;
  doseDisplay?: string;
};

const medications: Medication[] = [
  {
    name: "TXA - Adult Trauma/Obstetrical",
    doseType: "fixed",
    fixedDose: 2000,
    doseUnit: "mg",
    maxDose: 2000,
    concentration: 100,
    concentrationLabel: "1,000 mg/10 mL = 100 mg/mL",
    route: "IV push",
    note:
      "Adult protocol dose: TXA 2 grams IV push. This is a fixed dose and is not weight based. Confirm the applicable trauma or obstetrical protocol before administration.",
    requiresWeight: false,
    doseDisplay: "2,000 mg fixed dose",
  },
  {
    name: "Ketamine - Pain IV/IO",
    doseType: "weight-based",
    dose: 0.15,
    unit: "mg/kg",
    doseUnit: "mg",
    maxDose: null,
    concentration: 50,
    concentrationLabel: "50 mg/mL",
    route: "Slow IV/IO",
    note:
      "Adult pain management: 0.15 mg/kg IV/IO administered slowly. May repeat the same dose once after 15 minutes. No maximum dose is specified in Protocol 2.13.",
    requiresWeight: true,
  },
  {
    name: "Ketamine - Pain IM/IN",
    doseType: "weight-based",
    dose: 0.3,
    unit: "mg/kg",
    doseUnit: "mg",
    maxDose: null,
    concentration: 50,
    concentrationLabel: "50 mg/mL",
    route: "IM or IN",
    note:
      "Adult pain management: 0.3 mg/kg IM/IN. May repeat the same dose once after 20 minutes. No maximum dose is specified in Protocol 2.13.",
    requiresWeight: true,
  },
  {
    name: "Ketamine - Behavioral IM",
    doseType: "weight-based",
    dose: 4,
    unit: "mg/kg",
    doseUnit: "mg",
    maxDose: 400,
    concentration: 50,
    concentrationLabel: "50 mg/mL",
    route: "IM only",
    note:
      "Behavioral emergency: 4 mg/kg IM only, maximum 400 mg. For patients older than 70 years, follow the applicable age-based dose limitation in protocol.",
    requiresWeight: true,
  },
  {
    name: "Fentanyl",
    doseType: "weight-based",
    dose: 1,
    unit: "mcg/kg",
    doseUnit: "mcg",
    maxDose: 150,
    concentration: 50,
    concentrationLabel: "50 mcg/mL",
    route: "Slow IV/IO/IM or IN",
    note:
      "Adult and pediatric initial dose: 1 mcg/kg to a maximum of 150 mcg. Confirm repeat-dose and total-dose limits with the current protocol.",
    requiresWeight: true,
  },
  {
    name: "Midazolam",
    doseType: "weight-based",
    dose: 0.1,
    unit: "mg/kg",
    doseUnit: "mg",
    maxDose: 5,
    concentration: 5,
    concentrationLabel: "5 mg/mL",
    route: "IV/IO/IM/IN",
    note:
      "Monitor airway, respirations, oxygen saturation, blood pressure, and mental status.",
    requiresWeight: true,
  },
  {
    name: "Ondansetron - Adult",
    doseType: "fixed",
    fixedDose: 4,
    doseUnit: "mg",
    maxDose: 4,
    concentration: 2,
    concentrationLabel: "2 mg/mL",
    route: "PO ODT preferred, or IV/IO/IM",
    note:
      "Adult dose: 4 mg. Ondansetron is contraindicated in patients with a prolonged QT interval.",
    requiresWeight: false,
    doseDisplay: "4 mg fixed dose",
  },
  {
    name: "Ondansetron - Pediatric",
    doseType: "weight-range",
    doseUnit: "mg",
    maxDose: 4,
    concentration: 2,
    concentrationLabel: "2 mg/mL",
    route: "PO ODT or IV/IM",
    note:
      "Pediatric dose: 2 mg for a child weighing 25 kg or less; 4 mg for a child weighing more than 25 kg. Ondansetron is contraindicated in patients with a prolonged QT interval.",
    requiresWeight: true,
    calculateDose: (weight: number) => (weight <= 25 ? 2 : 4),
    doseDisplay: "≤25 kg: 2 mg | >25 kg: 4 mg",
  },
  {
    name: "Diphenhydramine",
    doseType: "weight-based",
    dose: 1,
    unit: "mg/kg",
    doseUnit: "mg",
    maxDose: 50,
    concentration: 50,
    concentrationLabel: "50 mg/mL",
    route: "IV/IO/IM",
    note:
      "Verify that diphenhydramine and the selected route remain authorized under your current protocol and service medication list.",
    requiresWeight: true,
  },
  {
    name: "Dextrose D10",
    doseType: "weight-based",
    dose: 5,
    unit: "mL/kg",
    doseUnit: "mL",
    maxDose: 250,
    concentration: 1,
    concentrationLabel: "D10 solution",
    route: "IV/IO",
    note:
      "Dose is calculated directly in mL/kg. Recheck blood glucose after administration.",
    requiresWeight: true,
  },
  {
    name: "Epinephrine 1:1,000 IM",
    doseType: "weight-based",
    dose: 0.01,
    unit: "mg/kg",
    doseUnit: "mg",
    maxDose: 0.5,
    concentration: 1,
    concentrationLabel: "1 mg/mL",
    route: "IM",
    note:
      "Used for anaphylaxis. Confirm the applicable adult or pediatric maximum dose with the current protocol.",
    requiresWeight: true,
  },
  {
    name: "Magnesium Sulfate",
    doseType: "weight-based",
    dose: 40,
    unit: "mg/kg",
    doseUnit: "mg",
    maxDose: 2000,
    concentration: 500,
    concentrationLabel: "500 mg/mL",
    route: "IV/IO",
    note:
      "Used for specific indications according to protocol. Confirm the correct indication, dose, dilution, and administration rate.",
    requiresWeight: true,
  },
];

function formatNumber(value: number) {
  if (Number.isInteger(value)) {
    return value.toLocaleString();
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

    if (
      med.requiresWeight &&
      (!Number.isFinite(weightNum) || weightNum <= 0)
    ) {
      return null;
    }

    let calculatedDose = 0;

    if (med.doseType === "fixed") {
      calculatedDose = med.fixedDose ?? 0;
    } else if (med.doseType === "weight-range") {
      calculatedDose = med.calculateDose?.(weightNum) ?? 0;
    } else {
      calculatedDose = weightNum * (med.dose ?? 0);
    }

    const finalDose =
      med.maxDose === null
        ? calculatedDose
        : Math.min(calculatedDose, med.maxDose);

    const volume =
      med.doseUnit === "mL"
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

  function getDoseDescription() {
    if (med.doseDisplay) {
      return med.doseDisplay;
    }

    if (med.doseType === "weight-based") {
      return `${formatNumber(med.dose ?? 0)} ${med.unit}`;
    }

    return "See protocol";
  }

  function getMaximumDoseDescription() {
    if (med.maxDose === null) {
      return "Not specified";
    }

    return `${formatNumber(med.maxDose)} ${med.doseUnit}`;
  }

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
          <div
            className={`grid gap-6 ${
              med.requiresWeight ? "md:grid-cols-2" : ""
            }`}
          >
            {med.requiresWeight && (
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
            )}

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
                value={getDoseDescription()}
              />

              <Info
                label="Maximum Dose"
                value={getMaximumDoseDescription()}
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
                  ? `${formatNumber(result.calculatedDose)} ${med.doseUnit}`
                  : "--"
              }
            />

            <ResultCard
              label="Dose to Give"
              value={
                result
                  ? `${formatNumber(result.finalDose)} ${med.doseUnit}`
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
              The protocol does not specify a maximum dose for this medication
              entry. The calculator has not applied a maximum-dose cap.
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