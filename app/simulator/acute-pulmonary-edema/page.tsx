"use client";

import { useState } from "react";

import Navbar from "../../components/Navbar";
import DispatchCard from "../../components/DispatchCard";
import VitalSigns from "../../components/VitalSigns";
import PatientMonitor from "../../components/PatientMonitor";
import TreatmentPanel from "../../components/TreatmentPanel";
import AssessmentPanel from "../../components/AssessmentPanel";
import ActionLog from "../../components/ActionLog";

export default function AcutePulmonaryEdemaSimulator() {
  const [heartRate, setHeartRate] = useState(126);
  const [respRate, setRespRate] = useState(34);
  const [bloodPressure, setBloodPressure] = useState("198/112");
  const [spo2, setSpo2] = useState(82);
  const [temperature] = useState(98.7);
  const [gcs] = useState(15);
  const [rhythm] = useState("Sinus Tachycardia");

  const [findings, setFindings] = useState<string[]>([
    "Patient is sitting upright in a tripod position.",
    "Patient is speaking in two- to three-word sentences.",
    "Skin is cool, pale, and diaphoretic.",
    "Severe respiratory distress is present.",
  ]);

  const [actions, setActions] = useState<string[]>([]);

  function addFinding(finding: string) {
    setFindings((previousFindings) => {
      if (previousFindings.includes(finding)) {
        return previousFindings;
      }

      return [...previousFindings, finding];
    });
  }

  function addAction(action: string) {
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });

    setActions((previousActions) => [
      `${time} — ${action}`,
      ...previousActions,
    ]);
  }

  function handleTreatment(treatment: string) {
    addAction(treatment);

    switch (treatment) {
      case "Apply Oxygen":
        setSpo2((currentSpo2) => Math.max(currentSpo2, 88));
        addFinding(
          "Supplemental oxygen was applied. Oxygen saturation improved slightly, but severe distress remains."
        );
        break;

      case "CPAP":
        setSpo2((currentSpo2) => Math.max(currentSpo2, 95));
        setRespRate((currentRate) => Math.min(currentRate, 26));
        setHeartRate((currentRate) => Math.min(currentRate, 116));
        addFinding(
          "CPAP was initiated. Work of breathing is improving and the patient can speak in longer sentences."
        );
        break;

      case "Nitroglycerin":
        setBloodPressure("172/98");
        setHeartRate((currentRate) => Math.min(currentRate, 110));
        addFinding(
          "Nitroglycerin was administered after confirming adequate blood pressure and no contraindications."
        );
        break;

      case "Aspirin":
        addFinding(
          "Aspirin was administered. This does not directly treat pulmonary edema unless acute coronary syndrome is also suspected."
        );
        break;

      case "12 Lead ECG":
        addFinding(
          "The 12-lead ECG shows sinus tachycardia with left ventricular hypertrophy and no acute STEMI criteria."
        );
        break;

      case "IV Access":
        addFinding(
          "IV access was established without delaying airway or breathing interventions."
        );
        break;

      case "Nebulizer":
        setSpo2((currentSpo2) => Math.max(currentSpo2 - 4, 70));
        setRespRate((currentRate) => Math.min(currentRate + 4, 44));
        addFinding(
          "No wheezing is present. The nebulizer delayed definitive treatment, and respiratory distress worsened."
        );
        break;

      case "Reassess":
        addFinding(
          `Reassessment: HR ${heartRate}, RR ${respRate}, BP ${bloodPressure}, SpO₂ ${spo2}%.`
        );
        break;

      case "Transport":
        addFinding(
          "Transport was initiated with continuous monitoring and ongoing reassessment."
        );
        break;

      default:
        break;
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            GrumpyMedic Call Simulator
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Acute Pulmonary Edema
          </h1>

          <p className="mt-3 max-w-3xl text-zinc-400">
            You are the lead EMS provider. Assess the patient, select
            treatments, monitor the response, and determine the transport
            plan.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DispatchCard
            title="Medical Dispatch"
            dispatch="Difficulty breathing"
            age="72-year-old male"
            chiefComplaint="Severe respiratory distress"
            priority="Priority 1"
            location="Private residence"
          />

          <PatientMonitor
            rhythm={rhythm}
            heartRate={heartRate}
            spo2={spo2}
          />

          <VitalSigns
            heartRate={heartRate}
            respiratoryRate={respRate}
            bloodPressure={bloodPressure}
            spo2={spo2}
            temperature={temperature}
            gcs={gcs}
          />

          <AssessmentPanel findings={findings} />

          <TreatmentPanel onTreatment={handleTreatment} />

          <ActionLog actions={actions} />
        </div>
      </section>
    </main>
  );
}