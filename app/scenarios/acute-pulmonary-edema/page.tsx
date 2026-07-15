"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

type VitalSigns = {
  heartRate: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  etco2: number;
  rhythm: string;
};

type Choice = {
  text: string;
  points: number;
  correct: boolean;
  feedback: string;
  patientResponse: string;
  vitalChanges: Partial<VitalSigns>;
};

type ScenarioStep = {
  phase: string;
  title: string;
  situation: string;
  patientStatement: string;
  findings: string[];
  choices: Choice[];
};

const initialVitals: VitalSigns = {
  heartRate: 118,
  respiratoryRate: 32,
  oxygenSaturation: 82,
  systolicBloodPressure: 194,
  diastolicBloodPressure: 112,
  etco2: 28,
  rhythm: "Sinus Tachycardia",
};

const scenarioSteps: ScenarioStep[] = [
  {
    phase: "Initial Assessment",
    title: "Patient Presentation",
    situation:
      "You enter a private residence and find a 72-year-old patient seated upright in a recliner. The patient appears anxious, diaphoretic, and severely short of breath.",
    patientStatement: "I... cannot... catch my breath.",
    findings: [
      "Patient is alert and follows commands",
      "Skin is pale, cool, and diaphoretic",
      "Diffuse bilateral crackles",
      "Speaking in two- to three-word sentences",
      "History of hypertension and congestive heart failure",
      "Symptoms began approximately 30 minutes ago",
    ],
    choices: [
      {
        text: "Keep the patient upright, apply oxygen, and begin an immediate respiratory assessment",
        points: 20,
        correct: true,
        feedback:
          "Correct. Upright positioning, oxygenation, and rapid assessment are appropriate immediate priorities.",
        patientResponse:
          "The patient remains distressed but tolerates the oxygen and attempts to answer your questions.",
        vitalChanges: {
          oxygenSaturation: 86,
          heartRate: 120,
          respiratoryRate: 33,
        },
      },
      {
        text: "Lay the patient flat and begin obtaining a complete medical history",
        points: 0,
        correct: false,
        feedback:
          "Laying the patient flat may worsen pulmonary congestion and respiratory distress. Immediate respiratory support takes priority.",
        patientResponse:
          "The patient becomes more anxious and states that breathing is getting worse.",
        vitalChanges: {
          oxygenSaturation: 78,
          heartRate: 128,
          respiratoryRate: 38,
        },
      },
      {
        text: "Have the patient walk to the ambulance before beginning treatment",
        points: 0,
        correct: false,
        feedback:
          "Exertion can significantly worsen hypoxia and respiratory distress. Begin treatment where the patient is found.",
        patientResponse:
          "The patient is unable to stand and becomes increasingly fatigued.",
        vitalChanges: {
          oxygenSaturation: 76,
          heartRate: 132,
          respiratoryRate: 40,
        },
      },
    ],
  },
  {
    phase: "Respiratory Support",
    title: "Persistent Severe Hypoxia",
    situation:
      "Despite supplemental oxygen, the patient remains severely dyspneic. The patient is awake, cooperative, and able to follow instructions.",
    patientStatement: "Please... do something. I feel like I am drowning.",
    findings: [
      "Severe work of breathing",
      "Accessory muscle use",
      "Diffuse crackles remain present",
      "Patient can maintain an open airway",
      "No vomiting",
      "No facial trauma preventing mask placement",
    ],
    choices: [
      {
        text: "Begin CPAP and closely monitor respiratory effort, mental status, and blood pressure",
        points: 20,
        correct: true,
        feedback:
          "Correct. The patient is awake, cooperative, severely hypoxic, and showing findings consistent with acute pulmonary edema.",
        patientResponse:
          "After several minutes, the patient begins taking deeper breaths and appears slightly less anxious.",
        vitalChanges: {
          oxygenSaturation: 91,
          respiratoryRate: 28,
          heartRate: 114,
          etco2: 32,
        },
      },
      {
        text: "Continue oxygen alone and wait another ten minutes",
        points: 5,
        correct: false,
        feedback:
          "Oxygen alone has not produced adequate improvement. Delaying positive-pressure support may allow further deterioration.",
        patientResponse:
          "The patient continues to struggle and appears increasingly fatigued.",
        vitalChanges: {
          oxygenSaturation: 84,
          respiratoryRate: 36,
          heartRate: 126,
          etco2: 25,
        },
      },
      {
        text: "Immediately perform endotracheal intubation",
        points: 0,
        correct: false,
        feedback:
          "The patient remains awake, cooperative, and able to protect the airway. Noninvasive positive-pressure ventilation should be considered first when appropriate.",
        patientResponse:
          "The patient becomes frightened and pulls away from the equipment.",
        vitalChanges: {
          oxygenSaturation: 80,
          respiratoryRate: 38,
          heartRate: 130,
        },
      },
    ],
  },
  {
    phase: "Medication Decision",
    title: "Hypertensive Pulmonary Edema",
    situation:
      "CPAP is in place. The patient remains markedly hypertensive. The patient denies recent phosphodiesterase inhibitor use and has no reported nitroglycerin allergy.",
    patientStatement: "The mask is helping a little, but my chest still feels tight.",
    findings: [
      "Blood pressure remains markedly elevated",
      "Patient remains alert",
      "No signs of hypotension",
      "No reported recent erectile-dysfunction medication use",
      "No known nitroglycerin allergy",
      "CPAP is being tolerated",
    ],
    choices: [
      {
        text: "Administer nitroglycerin according to protocol and reassess blood pressure",
        points: 20,
        correct: true,
        feedback:
          "Correct. Nitroglycerin may reduce preload and afterload in hypertensive acute pulmonary edema when permitted by protocol.",
        patientResponse:
          "The patient reports decreased chest pressure and easier breathing.",
        vitalChanges: {
          systolicBloodPressure: 164,
          diastolicBloodPressure: 94,
          oxygenSaturation: 94,
          heartRate: 106,
          respiratoryRate: 25,
        },
      },
      {
        text: "Administer a large normal-saline bolus",
        points: 0,
        correct: false,
        feedback:
          "A large fluid bolus may worsen pulmonary edema unless another specific indication exists.",
        patientResponse:
          "The patient's breathing worsens, and crackles become more pronounced.",
        vitalChanges: {
          oxygenSaturation: 82,
          respiratoryRate: 38,
          heartRate: 132,
          systolicBloodPressure: 198,
          diastolicBloodPressure: 116,
        },
      },
      {
        text: "Remove CPAP before giving any medication",
        points: 0,
        correct: false,
        feedback:
          "The patient is improving and tolerating CPAP. Effective ventilatory support should not be removed without a clinical reason.",
        patientResponse:
          "The patient immediately becomes more short of breath after the mask is removed.",
        vitalChanges: {
          oxygenSaturation: 84,
          respiratoryRate: 35,
          heartRate: 124,
        },
      },
    ],
  },
  {
    phase: "Reassessment",
    title: "Response to Treatment",
    situation:
      "The patient appears less anxious and is now speaking in longer sentences. Crackles remain present but are less pronounced.",
    patientStatement: "I can breathe better now. Please do not take this mask off.",
    findings: [
      "Improved work of breathing",
      "Improved oxygen saturation",
      "Blood pressure has decreased",
      "Patient remains alert",
      "No vomiting",
      "No worsening fatigue",
    ],
    choices: [
      {
        text: "Continue CPAP, repeat vital signs, and monitor for hypotension, fatigue, or altered mental status",
        points: 20,
        correct: true,
        feedback:
          "Correct. Continue effective treatment while monitoring for complications and further changes.",
        patientResponse:
          "The patient continues to improve and remains cooperative.",
        vitalChanges: {
          oxygenSaturation: 96,
          respiratoryRate: 22,
          heartRate: 98,
          systolicBloodPressure: 148,
          diastolicBloodPressure: 86,
          etco2: 36,
        },
      },
      {
        text: "Stop CPAP and oxygen because the saturation has improved",
        points: 0,
        correct: false,
        feedback:
          "Improvement does not mean the underlying emergency has resolved. Abruptly removing support may cause deterioration.",
        patientResponse:
          "Within moments, the patient becomes more dyspneic and anxious.",
        vitalChanges: {
          oxygenSaturation: 86,
          respiratoryRate: 34,
          heartRate: 120,
        },
      },
      {
        text: "Allow the patient to stand and walk around to see whether symptoms return",
        points: 0,
        correct: false,
        feedback:
          "The patient remains seriously ill and should not be subjected to unnecessary exertion.",
        patientResponse:
          "The patient becomes lightheaded and must sit back down.",
        vitalChanges: {
          oxygenSaturation: 88,
          heartRate: 126,
          respiratoryRate: 32,
        },
      },
    ],
  },
  {
    phase: "Transport",
    title: "Definitive Care",
    situation:
      "The patient has improved but still requires CPAP, cardiac monitoring, and frequent reassessment. The receiving hospital is approximately 12 minutes away.",
    patientStatement: "I feel better, but I still need the mask.",
    findings: [
      "Patient remains stable on CPAP",
      "Oxygen saturation remains improved",
      "Blood pressure remains adequate",
      "Respiratory effort is improved but not normal",
      "Continuous monitoring remains indicated",
      "Hospital evaluation is still required",
    ],
    choices: [
      {
        text: "Transport promptly while continuing CPAP, monitoring, and reassessment",
        points: 20,
        correct: true,
        feedback:
          "Correct. The patient requires hospital evaluation and continued treatment despite improvement.",
        patientResponse:
          "The patient remains stable during transport and is transferred to the emergency department on CPAP.",
        vitalChanges: {
          oxygenSaturation: 97,
          respiratoryRate: 20,
          heartRate: 94,
          systolicBloodPressure: 142,
          diastolicBloodPressure: 82,
          etco2: 37,
        },
      },
      {
        text: "Cancel transport because the patient now feels better",
        points: 0,
        correct: false,
        feedback:
          "Temporary improvement does not eliminate the risk of recurrence or deterioration.",
        patientResponse:
          "Shortly afterward, the patient's respiratory distress begins returning.",
        vitalChanges: {
          oxygenSaturation: 87,
          respiratoryRate: 34,
          heartRate: 122,
        },
      },
      {
        text: "Remain on scene until every symptom has resolved",
        points: 5,
        correct: false,
        feedback:
          "Treatment should continue during prompt transport. Unnecessary on-scene delay is inappropriate.",
        patientResponse:
          "The patient remains dependent on CPAP while definitive care is delayed.",
        vitalChanges: {},
      },
    ],
  },
];

export default function AcutePulmonaryEdemaScenarioPage() {
  const [scenarioStarted, setScenarioStarted] = useState(false);
  const [scenarioComplete, setScenarioComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [vitals, setVitals] = useState<VitalSigns>(initialVitals);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!scenarioStarted || scenarioComplete) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds((previousTime) => previousTime + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [scenarioStarted, scenarioComplete]);

  const step = scenarioSteps[currentStep];
  const selected =
    selectedChoice === null ? null : step.choices[selectedChoice];

  const progress = ((currentStep + 1) / scenarioSteps.length) * 100;

  function startScenario() {
    setScenarioStarted(true);
  }

  function selectChoice(choiceIndex: number) {
    if (selectedChoice !== null) {
      return;
    }

    const choice = step.choices[choiceIndex];

    setSelectedChoice(choiceIndex);
    setScore((previousScore) => previousScore + choice.points);

    setVitals((previousVitals) => ({
      ...previousVitals,
      ...choice.vitalChanges,
    }));
  }

  function continueScenario() {
    if (currentStep === scenarioSteps.length - 1) {
      setScenarioComplete(true);
      return;
    }

    setCurrentStep((previousStep) => previousStep + 1);
    setSelectedChoice(null);
  }

  function restartScenario() {
    setScenarioStarted(false);
    setScenarioComplete(false);
    setCurrentStep(0);
    setScore(0);
    setSelectedChoice(null);
    setVitals(initialVitals);
    setElapsedSeconds(0);
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  function getPerformanceMessage() {
    if (score >= 90) {
      return "Excellent clinical decision-making. You recognized the emergency, supported ventilation, treated appropriately, reassessed, and transported promptly.";
    }

    if (score >= 70) {
      return "Good performance. Review the feedback for the decisions where points were lost.";
    }

    if (score >= 50) {
      return "Developing performance. Review CPAP indications, nitroglycerin considerations, reassessment, and transport priorities.";
    }

    return "This scenario should be repeated. Focus on early respiratory support, avoiding harmful delays, and continuing effective treatment.";
  }

  if (!scenarioStarted) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="rounded-2xl border border-red-600 bg-zinc-900 p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Incoming Call
            </p>

            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Difficulty Breathing
            </h1>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <DispatchDetail label="Unit" value="Medic 1" />
              <DispatchDetail label="Response" value="Priority 1" />
              <DispatchDetail label="Patient" value="72-year-old patient" />
              <DispatchDetail label="Location" value="Private residence" />
            </div>

            <div className="mt-8 rounded-xl border border-zinc-700 bg-black p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-red-500">
                Dispatch Notes
              </p>

              <p className="mt-3 text-xl leading-8 text-zinc-200">
                Caller reports that the patient is gasping for air and unable
                to speak normally. No additional information is available.
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-yellow-600 bg-yellow-950/30 p-5">
              <p className="font-bold text-yellow-400">
                Training Objective
              </p>

              <p className="mt-2 text-zinc-300">
                Assess the patient, choose appropriate treatments, monitor the
                response, and determine the transport plan.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={startScenario}
                className="rounded-xl bg-red-600 px-7 py-4 text-lg font-bold transition hover:bg-red-500"
              >
                Respond to Call
              </button>

              <Link
                href="/scenarios"
                className="rounded-xl border border-zinc-600 px-7 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
              >
                Back to Scenarios
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (scenarioComplete) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="rounded-2xl border border-red-600 bg-zinc-900 p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Scenario Complete
            </p>

            <h1 className="mt-3 text-4xl font-extrabold">
              Acute Pulmonary Edema
            </h1>

            <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-8 border-red-600 bg-black">
              <span className="text-5xl font-extrabold text-red-500">
                {score}%
              </span>
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-300">
              {getPerformanceMessage()}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <SummaryCard label="Final SpO₂" value={`${vitals.oxygenSaturation}%`} />
              <SummaryCard label="Final BP" value={`${vitals.systolicBloodPressure}/${vitals.diastolicBloodPressure}`} />
              <SummaryCard label="Scenario Time" value={formatTime(elapsedSeconds)} />
            </div>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={restartScenario}
                className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
              >
                Restart Scenario
              </button>

              <Link
                href="/scenarios"
                className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500"
              >
                Back to Scenarios
              </Link>

              <Link
                href="/simulator/acute-pulmonary-edema"
                className="rounded-xl border border-red-500 px-6 py-3 font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
              >
                Open Call Simulator
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
            <h2 className="text-2xl font-bold text-red-500">
              Scenario Debrief
            </h2>

            <ul className="mt-5 space-y-3 text-zinc-300">
              <li>• Position the patient upright when tolerated.</li>
              <li>• Recognize severe respiratory distress and hypoxia.</li>
              <li>• Consider early CPAP when indicated.</li>
              <li>• Follow local protocol before administering nitroglycerin.</li>
              <li>• Reassess respiratory effort, blood pressure, mental status, and oxygenation.</li>
              <li>• Continue effective treatment during prompt transport.</li>
            </ul>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Interactive EMS Scenario
            </p>

            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Acute Pulmonary Edema
            </h1>
          </div>

          <div className="flex gap-3">
            <StatusBox label="Score" value={`${score}`} />
            <StatusBox label="Time" value={formatTime(elapsedSeconds)} />
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex justify-between">
            <p className="font-bold">
              Decision {currentStep + 1} of {scenarioSteps.length}
            </p>

            <p className="font-bold text-red-500">
              {Math.round(progress)}%
            </p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-700">
            <div
              className="h-full rounded-full bg-red-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <article className="rounded-2xl border border-zinc-700 bg-zinc-900 p-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              {step.phase}
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              {step.title}
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-300">
              {step.situation}
            </p>

            <div className="mt-6 rounded-xl border-l-4 border-red-500 bg-black p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
                Patient
              </p>

              <p className="mt-2 text-xl italic text-white">
                “{step.patientStatement}”
              </p>
            </div>

            <div className="mt-7 rounded-xl border border-zinc-700 bg-black p-5">
              <h3 className="text-lg font-bold text-red-500">
                Assessment Findings
              </h3>

              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {step.findings.map((finding) => (
                  <li
                    key={finding}
                    className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-300"
                  >
                    {finding}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold">
                What is your next action?
              </h3>

              <div className="mt-5 space-y-4">
                {step.choices.map((choice, index) => {
                  const isSelected = selectedChoice === index;

                  let style =
                    "border-zinc-700 bg-black hover:border-red-500";

                  if (selectedChoice !== null) {
                    if (isSelected && choice.correct) {
                      style = "border-green-500 bg-green-950/40";
                    } else if (isSelected && !choice.correct) {
                      style = "border-red-500 bg-red-950/40";
                    } else {
                      style = "border-zinc-800 bg-zinc-950 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={choice.text}
                      type="button"
                      disabled={selectedChoice !== null}
                      onClick={() => selectChoice(index)}
                      className={`w-full rounded-xl border p-5 text-left font-semibold transition ${style}`}
                    >
                      {choice.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {selected && (
              <div
                className={`mt-8 rounded-xl border p-6 ${
                  selected.correct
                    ? "border-green-500 bg-green-950/30"
                    : "border-red-500 bg-red-950/30"
                }`}
              >
                <h3 className="text-xl font-bold">
                  {selected.correct
                    ? "Appropriate Decision"
                    : "Review This Decision"}
                </h3>

                <p className="mt-3 leading-7 text-zinc-200">
                  {selected.feedback}
                </p>

                <div className="mt-5 rounded-lg bg-black/50 p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-red-400">
                    Patient Response
                  </p>

                  <p className="mt-2 text-zinc-200">
                    {selected.patientResponse}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={continueScenario}
                  className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
                >
                  {currentStep === scenarioSteps.length - 1
                    ? "View Results"
                    : "Continue Scenario"}
                </button>
              </div>
            )}
          </article>

          <aside className="h-fit rounded-2xl border border-green-500 bg-zinc-950 p-6 shadow-lg shadow-green-950/30 lg:sticky lg:top-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Patient Monitor
            </p>

            <div className="mt-5 rounded-xl border border-green-500 p-5">
              <p className="text-xs font-bold uppercase text-green-400">
                ECG Rhythm
              </p>

              <p className="mt-2 text-2xl font-extrabold text-green-400">
                {vitals.rhythm}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <MonitorValue label="HR" value={`${vitals.heartRate}`} />
              <MonitorValue label="SpO₂" value={`${vitals.oxygenSaturation}%`} />
              <MonitorValue label="RR" value={`${vitals.respiratoryRate}`} />
              <MonitorValue label="EtCO₂" value={`${vitals.etco2}`} />
            </div>

            <div className="mt-4 rounded-xl border border-green-500 p-5">
              <p className="text-xs font-bold uppercase text-green-400">
                Blood Pressure
              </p>

              <p className="mt-2 text-3xl font-extrabold text-green-400">
                {vitals.systolicBloodPressure}/
                {vitals.diastolicBloodPressure}
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-lg border border-green-500 bg-green-950/30 p-3">
              <div className="flex h-12 items-end gap-1">
                {[12, 28, 18, 38, 15, 30, 20, 42, 18, 34, 16, 28].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-green-500"
                      style={{ height: `${height}px` }}
                    />
                  )
                )}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8">
          <Link
            href="/scenarios"
            className="font-bold text-red-500 transition hover:text-red-400"
          >
            ← Exit Scenario
          </Link>
        </div>
      </section>
    </main>
  );
}

function DispatchDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-black p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function StatusBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-24 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3">
      <p className="text-xs font-bold uppercase text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-extrabold text-red-500">
        {value}
      </p>
    </div>
  );
}

function MonitorValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-green-500 p-4">
      <p className="text-xs font-bold uppercase text-green-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-extrabold text-green-400">
        {value}
      </p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-black p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-2 font-bold text-red-500">
        {value}
      </p>
    </div>
  );
}