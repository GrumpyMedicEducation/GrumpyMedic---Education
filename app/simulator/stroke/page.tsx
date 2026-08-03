"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar";

type Choice = {
  text: string;
  correct: boolean;
  feedback: string;
};

type Stage = {
  id: string;
  title: string;
  patientUpdate?: string;
  question: string;
  choices: Choice[];
};

const stages: Stage[] = [
  {
    id: "primary-assessment",
    title: "Scene Arrival",
    patientUpdate:
      "You find a 68-year-old male sitting in a kitchen chair. He is awake but appears confused and frustrated. His wife reports that he suddenly dropped his coffee cup and could not speak.",
    question: "What should you do first?",
    choices: [
      {
        text: "Complete a detailed secondary assessment",
        correct: false,
        feedback:
          "Begin with the primary assessment. Identify immediate threats involving airway, breathing, circulation, and mental status before completing a detailed examination.",
      },
      {
        text: "Perform a primary assessment and identify immediate life threats",
        correct: true,
        feedback:
          "Correct. Begin with airway, breathing, circulation, mental status, and immediate life threats.",
      },
      {
        text: "Wait several minutes to see whether the symptoms improve",
        correct: false,
        feedback:
          "Stroke symptoms are time-sensitive. Assessment and transport should not be delayed while waiting for spontaneous improvement.",
      },
      {
        text: "Ask the family to drive the patient to the hospital",
        correct: false,
        feedback:
          "This patient requires EMS assessment, monitoring, stroke activation, and transport to an appropriate receiving facility.",
      },
    ],
  },
  {
    id: "glucose",
    title: "Primary Assessment",
    patientUpdate:
      "The airway is patent. Respirations are 16/min and unlabored. SpO₂ is 96% on room air. Skin is warm and dry. A radial pulse is present.",
    question: "What is the most appropriate next action?",
    choices: [
      {
        text: "Apply high-flow oxygen by nonrebreather mask",
        correct: false,
        feedback:
          "The patient is not hypoxemic and has no respiratory distress. Oxygen should be administered when clinically indicated.",
      },
      {
        text: "Check blood glucose and begin a focused neurologic assessment",
        correct: true,
        feedback:
          "Correct. Hypoglycemia can mimic a stroke. Check glucose while beginning the focused neurologic assessment.",
      },
      {
        text: "Administer nitroglycerin for the elevated blood pressure",
        correct: false,
        feedback:
          "Nitroglycerin is not indicated solely because the patient is hypertensive. Do not rapidly lower blood pressure unless directed by protocol or medical control.",
      },
      {
        text: "Give the patient water to assess swallowing",
        correct: false,
        feedback:
          "Keep suspected stroke patients NPO because swallowing may be impaired and aspiration may occur.",
      },
    ],
  },
  {
    id: "last-known-well",
    title: "Determine the Timeline",
    patientUpdate:
      "Blood glucose is 124 mg/dL. The current time is 8:42 AM. The patient’s wife says the symptoms began while they were eating breakfast.",
    question: "What is the most important follow-up question?",
    choices: [
      {
        text: "What did the patient eat for breakfast?",
        correct: false,
        feedback:
          "This does not establish the stroke timeline. Determine when the patient was last known to be at his normal neurologic baseline.",
      },
      {
        text: "When was the patient last known to be normal?",
        correct: true,
        feedback:
          "Correct. The wife confirms that the patient was normal at 8:10 AM. This is the last-known-well time.",
      },
      {
        text: "Has the patient ever experienced a headache?",
        correct: false,
        feedback:
          "Headache history may be relevant, but establishing the exact last-known-well time is the immediate priority.",
      },
      {
        text: "What time did the patient wake up?",
        correct: false,
        feedback:
          "Wake-up time may be useful, but the essential question is when the patient was last known to have no neurologic deficits.",
      },
    ],
  },
  {
    id: "fast-ed",
    title: "FAST-ED Assessment",
    patientUpdate:
      "The patient has right facial droop, no effort against gravity in the right arm, severe aphasia, forced gaze deviation to the left, and no evidence of neglect.",
    question: "What is the patient’s FAST-ED score?",
    choices: [
      {
        text: "3",
        correct: false,
        feedback:
          "The score is higher. Facial palsy is 1, arm weakness is 2, speech changes are 2, eye deviation is 2, and neglect is 0.",
      },
      {
        text: "5",
        correct: false,
        feedback:
          "The correct total is 7. Severe aphasia and forced gaze deviation each receive 2 points.",
      },
      {
        text: "7",
        correct: true,
        feedback:
          "Correct. Facial palsy 1 + arm weakness 2 + speech changes 2 + eye deviation 2 + neglect 0 = 7.",
      },
      {
        text: "9",
        correct: false,
        feedback:
          "The patient has no neglect, so the denial or neglect category receives 0 points. The total is 7.",
      },
    ],
  },
  {
    id: "interpretation",
    title: "Interpret the Findings",
    patientUpdate:
      "The FAST-ED score is 7. The neurologic deficits began suddenly, and the patient was last known well 32 minutes ago.",
    question: "What does this FAST-ED score suggest?",
    choices: [
      {
        text: "Stroke has been ruled out",
        correct: false,
        feedback:
          "FAST-ED does not rule out stroke. This patient has significant neurologic deficits consistent with an acute stroke.",
      },
      {
        text: "The patient is most likely hypoglycemic",
        correct: false,
        feedback:
          "The blood glucose is 124 mg/dL, making hypoglycemia unlikely as the cause of these deficits.",
      },
      {
        text: "There is high suspicion for a possible large-vessel occlusion",
        correct: true,
        feedback:
          "Correct. A high FAST-ED score raises concern for a severe stroke and possible large-vessel occlusion.",
      },
      {
        text: "The symptoms are most likely caused by anxiety",
        correct: false,
        feedback:
          "Sudden focal neurologic deficits should be treated as an acute stroke until proven otherwise.",
      },
    ],
  },
  {
    id: "treatment",
    title: "Prehospital Treatment",
    patientUpdate:
      "Vital signs are BP 186/102, HR 88 and irregular, RR 16, SpO₂ 96% on room air, glucose 124 mg/dL, and GCS 13.",
    question: "Which treatment plan is most appropriate?",
    choices: [
      {
        text: "Remain on scene and attempt to lower the blood pressure",
        correct: false,
        feedback:
          "Do not delay transport or rapidly lower blood pressure unless directed by an applicable protocol or medical control.",
      },
      {
        text: "Keep the patient NPO, monitor, obtain IV access when possible, and minimize scene time",
        correct: true,
        feedback:
          "Correct. Provide supportive care, protect the affected side, monitor the patient, establish IV access when it does not delay transport, and minimize scene time.",
      },
      {
        text: "Give oral glucose because the patient cannot speak",
        correct: false,
        feedback:
          "The patient is not hypoglycemic. Oral glucose is not indicated and could increase aspiration risk.",
      },
      {
        text: "Have the patient walk to the ambulance to assess balance",
        correct: false,
        feedback:
          "Do not ambulate a patient with significant neurologic deficits. Protect the weak extremities and move the patient safely.",
      },
    ],
  },
  {
    id: "destination",
    title: "Transport Decision",
    patientUpdate:
      "The patient remains hemodynamically stable. His FAST-ED score is 7, and the receiving-facility decision must now be made.",
    question: "What is the most appropriate transport plan?",
    choices: [
      {
        text: "Transport to the nearest urgent care center",
        correct: false,
        feedback:
          "This patient requires emergency stroke evaluation at an appropriate stroke receiving facility.",
      },
      {
        text: "Complete every procedure before leaving the scene",
        correct: false,
        feedback:
          "Do not delay transport for nonessential procedures. Complete appropriate interventions during transport when possible.",
      },
      {
        text: "Initiate a stroke alert and follow the current Massachusetts OEMS and regional destination plan",
        correct: true,
        feedback:
          "Correct. Follow the current Massachusetts OEMS protocol, regional point-of-entry plan, medical control, and local service policy.",
      },
      {
        text: "Transport without notifying the receiving hospital",
        correct: false,
        feedback:
          "Early notification allows the receiving facility to prepare imaging, stroke-team resources, and possible intervention.",
      },
    ],
  },
  {
    id: "notification",
    title: "Hospital Notification",
    patientUpdate:
      "You are transporting with an estimated arrival time of 12 minutes. The patient’s neurologic findings remain unchanged.",
    question: "Which radio report is most appropriate?",
    choices: [
      {
        text: "We are transporting an elderly male who does not feel well.",
        correct: false,
        feedback:
          "This report does not include the neurologic findings, last-known-well time, FAST-ED score, glucose, vital signs, or stroke alert.",
      },
      {
        text: "Stroke alert: 68-year-old male with right facial droop, right arm paralysis, severe aphasia, and forced left gaze. Last known well 8:10 AM. FAST-ED 7. Glucose 124. BP 186/102. ETA 12 minutes.",
        correct: true,
        feedback:
          "Correct. This report communicates the neurologic deficits, timeline, FAST-ED score, glucose, blood pressure, and estimated arrival time.",
      },
      {
        text: "The patient has hypertension and needs his blood pressure treated.",
        correct: false,
        feedback:
          "The primary concern is an acute stroke. The report should emphasize the neurologic findings and treatment timeline.",
      },
      {
        text: "Possible stroke. More information will be provided after arrival.",
        correct: false,
        feedback:
          "Provide the available information before arrival so the receiving facility can prepare appropriately.",
      },
    ],
  },
];

export default function StrokeSimulatorPage() {
  const [stageIndex, setStageIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(
    null
  );
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [scenarioComplete, setScenarioComplete] = useState(false);

  const currentStage = stages[stageIndex];
  const selectedAnswer =
    selectedChoice === null
      ? null
      : currentStage.choices[selectedChoice];

  const correctAnswers = useMemo(
    () => Object.values(results).filter(Boolean).length,
    [results]
  );

  const answeredQuestions = Object.keys(results).length;
  const finalPercentage = Math.round(
    (correctAnswers / stages.length) * 100
  );

  function selectChoice(choiceIndex: number) {
    if (selectedChoice !== null) {
      return;
    }

    const choice = currentStage.choices[choiceIndex];

    setSelectedChoice(choiceIndex);
    setResults((currentResults) => ({
      ...currentResults,
      [currentStage.id]: choice.correct,
    }));
  }

  function continueCall() {
    if (selectedChoice === null) {
      return;
    }

    if (stageIndex === stages.length - 1) {
      setScenarioComplete(true);
      return;
    }

    setStageIndex((currentIndex) => currentIndex + 1);
    setSelectedChoice(null);
  }

  function restartScenario() {
    setStageIndex(0);
    setSelectedChoice(null);
    setResults({});
    setScenarioComplete(false);
  }

  if (scenarioComplete) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 text-center shadow-2xl sm:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Scenario Complete
            </p>

            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Suspected Large-Vessel Stroke
            </h1>

            <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-8 border-red-600 bg-black">
              <div>
                <strong className="block text-4xl">
                  {correctAnswers}/{stages.length}
                </strong>

                <span className="text-zinc-400">
                  {finalPercentage}%
                </span>
              </div>
            </div>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
              The patient presented with right facial droop, right arm
              paralysis, severe aphasia, and forced left gaze. His
              FAST-ED score was 7, creating high suspicion for a
              possible large-vessel occlusion.
            </p>

            <div className="mt-8 rounded-2xl border border-zinc-700 bg-black p-6 text-left">
              <h2 className="text-2xl font-bold text-red-500">
                Final Patient Summary
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <SummaryItem
                  label="Patient"
                  value="68-year-old male"
                />

                <SummaryItem
                  label="Last Known Well"
                  value="8:10 AM"
                />

                <SummaryItem label="FAST-ED" value="7" />

                <SummaryItem
                  label="Blood Glucose"
                  value="124 mg/dL"
                />

                <SummaryItem
                  label="Blood Pressure"
                  value="186/102 mmHg"
                />

                <SummaryItem
                  label="Heart Rate"
                  value="88, irregular"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-yellow-700/50 bg-yellow-950/30 p-5 text-left text-yellow-100">
              <strong>Training reminder:</strong> Follow the current
              Massachusetts OEMS protocols, regional point-of-entry
              plan, medical-control direction, and local service
              policies.
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={restartScenario}
                className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
              >
                Restart Scenario
              </button>

              <Link
                href="/simulator"
                className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500 hover:bg-zinc-800"
              >
                Return to Simulator
              </Link>

              <Link
                href="/scenarios/stroke-scenario"
                className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500 hover:bg-zinc-800"
              >
                Review FAST-ED Lesson
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              GrumpyMedic Call Simulator
            </p>

            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
              Stroke
            </h1>

            <p className="mt-4 max-w-3xl text-zinc-400">
              Identify the stroke, calculate the FAST-ED score, and
              make appropriate prehospital treatment and transport
              decisions.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3">
            <span className="block text-xs font-bold uppercase tracking-wide text-zinc-500">
              Progress
            </span>

            <strong className="text-xl">
              {stageIndex + 1} of {stages.length}
            </strong>
          </div>
        </div>

        <div className="mt-7 h-3 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full bg-red-600 transition-all duration-300"
            style={{
              width: `${((stageIndex + 1) / stages.length) * 100}%`,
            }}
          />
        </div>

        {stageIndex === 0 && (
          <div className="mt-8 rounded-2xl border border-red-900/50 bg-red-950/20 p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-red-400">
              Dispatch
            </p>

            <p className="mt-2 text-lg leading-8 text-zinc-200">
              “Medic 1, respond for a 68-year-old male with sudden
              weakness and difficulty speaking. The caller reports
              that the symptoms began approximately 25 minutes ago.”
            </p>
          </div>
        )}

        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-red-500">
            Decision {stageIndex + 1}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {currentStage.title}
          </h2>

          {currentStage.patientUpdate && (
            <div className="mt-6 rounded-2xl border border-zinc-700 bg-black p-5">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
                Patient Update
              </p>

              <p className="mt-2 leading-7 text-zinc-200">
                {currentStage.patientUpdate}
              </p>
            </div>
          )}

          <p className="mt-7 text-xl font-semibold leading-8 text-white">
            {currentStage.question}
          </p>

          <div className="mt-7 space-y-4">
            {currentStage.choices.map((choice, choiceIndex) => {
              const isSelected = selectedChoice === choiceIndex;
              const hasAnswered = selectedChoice !== null;

              let choiceClasses =
                "border-zinc-700 bg-black hover:border-red-500 hover:bg-zinc-950";

              if (hasAnswered && isSelected && choice.correct) {
                choiceClasses =
                  "border-green-600 bg-green-950/30";
              }

              if (hasAnswered && isSelected && !choice.correct) {
                choiceClasses = "border-red-600 bg-red-950/30";
              }

              if (hasAnswered && !isSelected) {
                choiceClasses =
                  "border-zinc-800 bg-zinc-950 opacity-50";
              }

              return (
                <button
                  key={choice.text}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => selectChoice(choiceIndex)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${choiceClasses}`}
                >
                  <span className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 font-bold text-white">
                      {String.fromCharCode(65 + choiceIndex)}
                    </span>

                    <span className="pt-1 font-semibold leading-7">
                      {choice.text}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <div
              className={`mt-7 rounded-2xl border p-5 ${
                selectedAnswer.correct
                  ? "border-green-700 bg-green-950/30 text-green-100"
                  : "border-red-700 bg-red-950/30 text-red-100"
              }`}
            >
              <h3 className="text-xl font-bold">
                {selectedAnswer.correct
                  ? "Correct Decision"
                  : "Review This Decision"}
              </h3>

              <p className="mt-2 leading-7">
                {selectedAnswer.feedback}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-zinc-500">
              Current score: {correctAnswers}/{answeredQuestions}
            </span>

            <button
              type="button"
              disabled={selectedChoice === null}
              onClick={continueCall}
              className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stageIndex === stages.length - 1
                ? "Complete Scenario"
                : "Continue Call →"}
            </button>
          </div>
        </section>

        <div className="mt-6 rounded-2xl border border-yellow-700/40 bg-yellow-950/20 p-4 text-sm text-yellow-100">
          This simulator is for education only. Follow current
          Massachusetts OEMS protocols, regional plans, medical
          control, and local service policy.
        </div>
      </section>
    </main>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <span className="block text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </span>

      <strong className="mt-1 block text-lg text-white">
        {value}
      </strong>
    </div>
  );
}