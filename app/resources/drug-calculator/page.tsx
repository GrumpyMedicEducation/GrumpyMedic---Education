"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function DrugCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [dose, setDose] = useState("");
  const [concentration, setConcentration] = useState("");

  const weightNum = Number(weight);
  const doseNum = Number(dose);
  const concentrationNum = Number(concentration);

  const totalDose =
    weightNum > 0 && doseNum > 0 ? weightNum * doseNum : 0;

  const volume =
    totalDose > 0 && concentrationNum > 0
      ? totalDose / concentrationNum
      : 0;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-8 py-10">
        <Link href="/resources" className="text-sm font-semibold text-red-500">
          ← Back to Resources
        </Link>

        <h1 className="mt-8 text-5xl font-extrabold">Drug Calculator</h1>

        <p className="mt-3 text-zinc-400">
          Calculate weight-based medication doses and estimated volume to administer.
          Always verify with your local protocols and medical control.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="text-3xl font-bold text-red-500">
            Weight-Based Dose Calculator
          </h2>

          <div className="mt-6 grid gap-6">
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
                Dose Ordered (mg/kg)
              </label>
              <input
                type="number"
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                placeholder="Example: 0.3"
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-zinc-300">
                Medication Concentration (mg/mL)
              </label>
              <input
                type="number"
                value={concentration}
                onChange={(e) => setConcentration(e.target.value)}
                placeholder="Example: 5"
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-700 bg-black p-5">
              <p className="text-xs uppercase text-zinc-400">Total Dose</p>
              <p className="mt-2 text-3xl font-bold text-red-500">
                {totalDose > 0 ? `${totalDose.toFixed(2)} mg` : "--"}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-700 bg-black p-5">
              <p className="text-xs uppercase text-zinc-400">
                Volume to Administer
              </p>
              <p className="mt-2 text-3xl font-bold text-red-500">
                {volume > 0 ? `${volume.toFixed(2)} mL` : "--"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-red-700 bg-red-950/30 p-6">
          <h2 className="text-2xl font-bold text-red-500">
            Safety Reminder
          </h2>

          <p className="mt-3 text-zinc-300">
            This calculator is an educational tool only. Always confirm the dose,
            concentration, route, max dose, contraindications, patient condition,
            and local EMS protocol before administering medication.
          </p>
        </div>
      </section>
    </main>
  );
}