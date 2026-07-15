"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar";

type Choice = {
  text: string;
  correct: boolean;
  points: number;
  feedback: string;
};

type ScenarioStep = {
  phase: string;
  title: string;
  situation: string;
  findings: string[];
  choices: Choice[];
};

const scenarioSteps: ScenarioStep[] = [
  {
    phase: "Initial Assessment",
    title: "Patient Presentation",
    situation:
      "You arrive at a private residence for a 72-year-old patient experiencing severe shortness of breath. The patient is seated upright, anxious, and speaking in short phrases.",
    findings: [
      "Respiratory rate: 32 breaths/min",
      "SpO₂: 82% on room air",
      "Heart rate: 118 beats/min",
      "Blood pressure: 194/112 mmHg",
      "Skin: Pale, cool, and diaphoretic",
      "Lung sounds: Diffuse bilateral crackles",
    ],
    choices: [
      {
        text: "Lay the patient flat and begin a detailed medical history",
        correct: false,
        points: 0,
        feedback:
          "Laying the patient flat may worsen respiratory distress. Immediate respiratory support and rapid assessment take priority.",
      },
      {
        text: "Keep the patient upright, apply oxygen, and begin an immediate respiratory assessment",
        correct: true,
        points: 20,
        feedback:
          "Correct. Upright positioning, oxygenation, and rapid assessment are appropriate initial priorities.",
      },
      {
        text: "Have the patient walk to the ambulance before beginning treatment",
        correct: false,
        points: 0,
        feedback:
          "Exertion may significantly worsen hypoxia and respiratory distress. Begin care where the patient is found.",
      },
    ],
  },
  {
    phase: "Respiratory Support",
    title: "Severe Hypoxia Persists",
    situation:
      "High-concentration oxygen has been applied. The patient remains awake and cooperative but continues to struggle to breathe. SpO₂ is now 86%.",
    findings: [
      "Respiratory rate: 34 breaths/min",
      "SpO₂: 86% with oxygen",
      "Heart rate: 122 beats/min",
      "Blood pressure: 190/108 mmHg",
      "Patient remains alert and follows commands",
    ],
    choices: [
      {
        text: "Begin CPAP and closely monitor the patient",
        correct: true,
        points: 20,
        feedback:
          "Correct. The patient is alert, cooperative, severely hypoxic, and showing signs consistent with acute pulmonary edema.",
      },
      {
        text: "Continue oxygen only and wait ten minutes before reassessing",
        correct: false,
        points: 5,
        feedback:
          "Oxygen alone is not producing adequate improvement. Delaying positive-pressure support may allow the patient to deteriorate.",
      },
      {
        text: "Immediately perform endotracheal intubation",
        correct: false,
        points: 0,
        feedback:
          "The patient is still alert and cooperative. Noninvasive positive-pressure ventilation should be considered before invasive airway management when appropriate.",
      },
    ],
  },
  {
    phase: "Medication Decision",
    title: "Hypertensive Pulmonary Edema",
    situation:
      "CPAP has been initiated. The patient tolerates the mask. Blood pressure remains markedly elevated, and the patient denies phosphodiesterase inhibitor use.",
    findings: [
      "Blood pressure: 186/104 mmHg",
      "SpO₂: 90% on CPAP",
      "Heart rate: 116 beats/min",
      "No reported medication allergy",
      "No recent erectile-dysfunction medication use",
    ],
    choices: [
      {
        text: "Administer nitroglycerin according to protocol and reassess",
        correct: true,
        points: 20,
        feedback:
          "Correct. In a hypertensive patient with suspected acute pulmonary edema, nitroglycerin may reduce preload and afterload when permitted by protocol.",
      },
      {
        text: "Give a large normal-saline bolus",
        correct: false,
        points: 0,
        feedback:
          "A large fluid bolus may worsen pulmonary edema unless another specific indication exists.",
      },
      {
        text: "Remove CPAP before giving any medication",
        correct: false,
        points: 0,
        feedback:
          "The patient is improving and tolerating CPAP. There is no reason to discontinue effective ventilatory support.",
      },
    ],
  },
  {
    phase: "Reassessment",
    title: "Patient Response",
    situation:
      "Several minutes after CPAP and nitroglycerin, the patient reports that breathing is becoming easier.",
    findings: [
      "Respiratory rate: 24 breaths/min",
      "SpO₂: 95%",
      "Heart rate: 102 beats/min",
      "Blood pressure: 154/88 mmHg",
      "Patient now speaks in full sentences",
      "Crackles remain but are less pronounced",
    ],
    choices: [
      {
        text: "Continue CPAP, repeat vital signs, and monitor for hypotension or fatigue",
        correct: true,
        points: 20,
        feedback:
          "Correct. Continue effective treatment while closely monitoring respiratory effort, mental status, blood pressure, and oxygenation.",
      },
      {
        text: "Stop all treatment because the oxygen saturation improved",
        correct: false,
        points: 0,
        feedback:
          "Improvement does not mean the underlying emergency has resolved. Continue support and reassessment.",
      },
      {
        text: "Allow the patient to remove the mask and walk around",
        correct: false,
        points: 0,
        feedback:
          "The patient remains seriously ill and requires continued support, monitoring, and transport.",
      },
    ],
  },
  {
    phase: "Transport Decision",
    title: "Definitive Care",
    situation:
      "The patient has improved but still requires CPAP and continuous monitoring. The receiving hospital is 12 minutes away.",
    findings: [
      "SpO₂ remains 95% on CPAP",
      "Blood pressure remains stable",
      "Patient remains alert",
      "Respiratory effort is improved but not normal",
    ],
    choices: [
      {
        text: "Transport promptly while continuing CPAP, monitoring, and reassessment",
        correct: true,
        points: 20,
        feedback:
          "Correct. The patient requires hospital evaluation and continued treatment despite improvement.",
      },
      {
        text: "Cancel transport because the patient feels better",
        correct: false,
        points: 0,
        feedback:
          "Temporary improvement does not eliminate the risk of recurrence or deterioration.",
      },
      {
        text: "Remain on scene for an extended period to see whether symptoms fully resolve",
        correct: false,
        points: 5,
        feedback:
          "Treatment should continue during prompt transport. Unnecessary on-scene delay is not appropriate.",
      },
    ],
  },
];

export default function AcutePulmonaryEdemaScenarioPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [scenarioComplete, setScenarioComplete] = useState(false);

  const step = scenarioSteps[currentStep];
  const progress = ((currentStep + 1) / scenarioSteps.length) * 100;

  function selectChoice(choiceIndex: number) {
    if (selectedChoice !== null) {
      return;
    }

    const choice = step.choices[choiceIndex];

    setSelectedChoice(choiceIndex);
    setFeedback(choice.feedback);
    setScore((previousScore) => previousScore + choice.points);
  }

  function moveToNextStep() {
    if (currentStep === scenarioSteps.length - 1) {
      setScenarioComplete(true);
      return;
    }

    setCurrentStep((previousStep) => previousStep + 1);
    setSelectedChoice(null);
    setFeedback("");
  }

  function restartScenario() {
    setCurrentStep(0);
    setScore(0);
    setSelectedChoice(null);
    setFeedback("");
    setScenarioComplete(false);
  }

  function getPerformanceMessage() {
    if (score >= 90) {
      return "Excellent clinical decision-making. You identified the emergency, supported ventilation, treated appropriately, reassessed, and transported promptly.";
    }

    if (score >= 70) {
      return "Good performance. Review the feedback for the decisions where points were lost.";
    }

    if (score >= 50) {
      return "Developing performance. Review CPAP indications, nitroglycerin considerations, and reassessment priorities.";
    }

    return "This scenario should be reviewed again. Focus on early respiratory support, avoiding harmful delays, and continuing treatment during transport.";
  }

  if (scenarioComplete) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-2xl border border-red-600 bg-zinc-900 p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Scenario Complete
            </p>

            <h1 className="mt-4 text-4xl font-extrabold">
              Acute Pulmonary Edema
            </h1>

            <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-8 border-red-600 bg-black">
              <span className="text-5xl font-extrabold text-red-500">
                {score}%
              </span>
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
              {getPerformanceMessage()}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <SummaryCard label="Recognition" value="Pulmonary edema" />
              <SummaryCard label="Ventilation" value="CPAP" />
              <SummaryCard label="Transport" value="Prompt" />
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
                className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500 hover:text-red-400"
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

          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold text-red-500">
              Key Learning Points
            </h2>

            <ul className="mt-5 space-y-3 text-zinc-300">
              <li>• Keep severely dyspneic patients upright when tolerated.</li>
              <li>• Recognize hypoxia, diffuse crackles, and severe hypertension.</li>
              <li>• Consider early CPAP when indications are present.</li>
              <li>• Follow protocol requirements before administering nitroglycerin.</li>
              <li>• Reassess mental status, respiratory effort, blood pressure, and SpO₂.</li>
              <li>• Improvement does not eliminate the need for prompt transport.</li>
            </ul>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Interactive EMS Scenario
            </p>

            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Acute Pulmonary Edema
            </h1>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
              Current Score
            </p>

            <p className="mt-1 text-2xl font-extrabold text-red-500">
              {score} points
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center justify-between">
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

        <article className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-7">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            {step.phase}
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            {step.title}
          </h2>

          <p className="mt-5 text-lg leading-8 text-zinc-300">
            {step.situation}
          </p>

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

                let choiceStyle =
                  "border-zinc-700 bg-black hover:border-red-500";

                if (selectedChoice !== null) {
                  if (isSelected && choice.correct) {
                    choiceStyle = "border-green-500 bg-green-950/40";
                  } else if (isSelected && !choice.correct) {
                    choiceStyle = "border-red-500 bg-red-950/40";
                  } else {
                    choiceStyle = "border-zinc-800 bg-zinc-950 opacity-60";
                  }
                }

                return (
                  <button
                    key={choice.text}
                    type="button"
                    disabled={selectedChoice !== null}
                    onClick={() => selectChoice(index)}
                    className={`w-full rounded-xl border p-5 text-left font-semibold transition ${choiceStyle}`}
                  >
                    {choice.text}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedChoice !== null && (
            <div
              className={`mt-8 rounded-xl border p-5 ${
                step.choices[selectedChoice].correct
                  ? "border-green-500 bg-green-950/30"
                  : "border-red-500 bg-red-950/30"
              }`}
            >
              <h3 className="text-xl font-bold">
                {step.choices[selectedChoice].correct
                  ? "Appropriate Decision"
                  : "Review This Decision"}
              </h3>

              <p className="mt-3 leading-7 text-zinc-200">
                {feedback}
              </p>

              <button
                type="button"
                onClick={moveToNextStep}
                className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
              >
                {currentStep === scenarioSteps.length - 1
                  ? "View Results"
                  : "Continue Scenario"}
              </button>
            </div>
          )}
        </article>

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