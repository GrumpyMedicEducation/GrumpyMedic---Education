"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

type BurnRegion = {
  id: string;
  name: string;
  percent: number;
  description: string;
};

const burnRegions: BurnRegion[] = [
  {
    id: "head-neck",
    name: "Head and Neck",
    percent: 9,
    description: "Entire head and neck",
  },
  {
    id: "right-arm",
    name: "Right Arm",
    percent: 9,
    description: "Entire right arm",
  },
  {
    id: "left-arm",
    name: "Left Arm",
    percent: 9,
    description: "Entire left arm",
  },
  {
    id: "anterior-trunk",
    name: "Anterior Trunk",
    percent: 18,
    description: "Chest and abdomen",
  },
  {
    id: "posterior-trunk",
    name: "Posterior Trunk",
    percent: 18,
    description: "Entire back",
  },
  {
    id: "right-leg",
    name: "Right Leg",
    percent: 18,
    description: "Entire right leg",
  },
  {
    id: "left-leg",
    name: "Left Leg",
    percent: 18,
    description: "Entire left leg",
  },
  {
    id: "perineum",
    name: "Perineum",
    percent: 1,
    description: "Genital and perineal area",
  },
];

type RegionSelection = Record<string, number>;

export default function BurnCalculatorPage() {
  const [selections, setSelections] = useState<RegionSelection>({});
  const [weight, setWeight] = useState("");

  const totalTbsa = useMemo(() => {
    return burnRegions.reduce((total, region) => {
      const selectedFraction = selections[region.id] ?? 0;
      return total + region.percent * selectedFraction;
    }, 0);
  }, [selections]);

  const weightKg = Number(weight);

  const parklandVolume =
    weightKg > 0 && totalTbsa > 0
      ? 4 * weightKg * totalTbsa
      : 0;

  const firstEightHours = parklandVolume / 2;
  const nextSixteenHours = parklandVolume / 2;

  function updateRegion(regionId: string, fraction: number) {
    setSelections((current) => ({
      ...current,
      [regionId]: fraction,
    }));
  }

  function resetCalculator() {
    setSelections({});
    setWeight("");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-8">
        <Link
          href="/resources"
          className="text-sm font-semibold text-red-500 hover:text-red-400"
        >
          ← Back to Resources
        </Link>

        <h1 className="mt-8 text-4xl font-extrabold md:text-5xl">
          Burn Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-zinc-400">
          Estimate adult total body surface area burned using the Rule of Nines.
          Select whether one-quarter, one-half, three-quarters, or the entire
          region is burned.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {burnRegions.map((region) => {
              const selectedFraction = selections[region.id] ?? 0;
              const regionTbsa = region.percent * selectedFraction;

              return (
                <div
                  key={region.id}
                  className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-red-500">
                        {region.name}
                      </h2>

                      <p className="mt-1 text-sm text-zinc-400">
                        {region.description}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-zinc-300">
                        Entire region: {region.percent}%
                      </p>
                    </div>

                    <div className="w-full md:w-56">
                      <label
                        htmlFor={region.id}
                        className="text-sm font-semibold text-zinc-300"
                      >
                        Amount burned
                      </label>

                      <select
                        id={region.id}
                        value={selectedFraction}
                        onChange={(event) =>
                          updateRegion(
                            region.id,
                            Number(event.target.value)
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-red-500"
                      >
                        <option value={0}>None</option>
                        <option value={0.25}>One-quarter</option>
                        <option value={0.5}>One-half</option>
                        <option value={0.75}>Three-quarters</option>
                        <option value={1}>Entire region</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-zinc-700 bg-black p-3">
                    <p className="text-sm text-zinc-400">
                      TBSA contributed by this region
                    </p>

                    <p className="mt-1 text-2xl font-bold text-red-500">
                      {regionTbsa.toFixed(2)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="sticky top-28 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Estimated Burn Size
              </p>

              <p className="mt-3 text-6xl font-extrabold text-red-500">
                {totalTbsa.toFixed(2)}%
              </p>

              <p className="mt-2 text-zinc-300">
                Total body surface area burned
              </p>

              <div className="mt-6 border-t border-zinc-700 pt-6">
                <label
                  htmlFor="weight"
                  className="text-sm font-semibold text-zinc-300"
                >
                  Patient Weight in Kilograms
                </label>

                <input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.1"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  placeholder="Example: 80"
                  className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-red-500"
                />
              </div>

              <div className="mt-6 space-y-3">
                <ResultCard
                  label="Estimated 24-Hour Fluid Volume"
                  value={
                    parklandVolume > 0
                      ? `${parklandVolume.toFixed(0)} mL`
                      : "--"
                  }
                />

                <ResultCard
                  label="First 8 Hours"
                  value={
                    firstEightHours > 0
                      ? `${firstEightHours.toFixed(0)} mL`
                      : "--"
                  }
                />

                <ResultCard
                  label="Next 16 Hours"
                  value={
                    nextSixteenHours > 0
                      ? `${nextSixteenHours.toFixed(0)} mL`
                      : "--"
                  }
                />
              </div>

              <button
                type="button"
                onClick={resetCalculator}
                className="mt-6 w-full rounded-lg border border-red-500 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                Reset Calculator
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-yellow-700 bg-yellow-950/20 p-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            Important Limitations
          </h2>

          <div className="mt-3 space-y-3 text-zinc-300">
            <p>
              The Rule of Nines is intended as a rapid adult burn-size estimate.
              Pediatric patients have proportionally larger heads and smaller
              legs, so a Lund-Browder chart is more accurate.
            </p>

            <p>
              Do not include superficial, first-degree burns when calculating
              TBSA for fluid-resuscitation decisions.
            </p>

            <p>
              The patient’s palm, including the fingers, is approximately 1% of
              body surface area and may be useful for small or irregular burns.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-red-700 bg-red-950/30 p-6">
          <h2 className="text-2xl font-bold text-red-500">
            Clinical Safety Reminder
          </h2>

          <p className="mt-3 text-zinc-300">
            This tool is for education and estimation only. Confirm burn depth,
            TBSA, fluid requirements, time of injury, inhalation injury risk,
            patient age, comorbidities, local EMS protocols, and medical-control
            direction before treatment or transport decisions.
          </p>
        </div>
      </section>
    </main>
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
    <div className="rounded-xl border border-zinc-700 bg-black p-4">
      <p className="text-xs font-semibold uppercase text-zinc-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-red-500">{value}</p>
    </div>
  );
}