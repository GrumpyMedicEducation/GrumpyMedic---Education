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
  patientUpdate: string;
  question: string;
  choices: Choice[];
};

const stages: Stage[] = [
  {
    id: "scene-safety",
    title: "Scene Arrival",
    patientUpdate:
      "You arrive at a two-vehicle head-on collision. One vehicle has significant front-end damage. A 34-year-old male driver remains seated behind the wheel. The airbag deployed, the windshield is starred, and the steering wheel appears deformed. Fire personnel report that the vehicle has been stabilized.",
    question: "What should you do first?",
    choices: [
      {
        text: "Immediately enter the vehicle and begin moving the patient",
        correct: false,
        feedback:
          "Confirm scene safety, vehicle stabilization, hazards, and the number of patients before beginning patient contact.",
      },
      {
        text: "Confirm scene safety, use appropriate PPE, and determine the number of patients",
        correct: true,
        feedback:
          "Correct. Begin with scene safety, appropriate PPE, mechanism of injury, vehicle stability, and identification of all patients.",
      },
      {
        text: "Wait for law enforcement to complete its investigation",
        correct: false,
        feedback:
          "Patient care should not be delayed for a traffic investigation once the scene has been made safe.",
      },
      {
        text: "Begin gathering insurance and registration information",
        correct: false,
        feedback:
          "Administrative information is not the priority during the initial management of a critically injured patient.",
      },
    ],
  },
  {
    id: "primary-survey",
    title: "Primary Trauma Survey",
    patientUpdate:
      "The patient is pale and diaphoretic. He opens his eyes to voice and answers slowly. His airway is patent, but respirations are rapid and shallow. Bright red blood is actively flowing from a deep wound to his left thigh.",
    question: "What is the immediate priority?",
    choices: [
      {
        text: "Obtain a complete medical history",
        correct: false,
        feedback:
          "A complete history should not delay treatment of an immediate life threat.",
      },
      {
        text: "Control the severe external hemorrhage immediately",
        correct: true,
        feedback:
          "Correct. Life-threatening external hemorrhage must be controlled immediately while the primary trauma assessment continues.",
      },
      {
        text: "Apply a cervical collar before addressing the bleeding",
        correct: false,
        feedback:
          "Spinal precautions may be appropriate, but uncontrolled life-threatening hemorrhage takes priority.",
      },
      {
        text: "Assess distal pulses before controlling the bleeding",
        correct: false,
        feedback:
          "A distal neurovascular assessment is important, but it should not delay immediate hemorrhage control.",
      },
    ],
  },
  {
    id: "hemorrhage-control",
    title: "Hemorrhage Control",
    patientUpdate:
      "Direct pressure and wound packing do not control the bleeding. Blood continues to flow rapidly from the left thigh wound.",
    question: "What should you do next?",
    choices: [
      {
        text: "Continue holding the same pressure indefinitely",
        correct: false,
        feedback:
          "When appropriate direct pressure and wound packing fail to control severe extremity hemorrhage, escalate hemorrhage-control measures.",
      },
      {
        text: "Apply a commercial tourniquet high and tight on the injured extremity",
        correct: true,
        feedback:
          "Correct. Apply a commercial tourniquet proximal to the wound, tighten it until bleeding stops, secure it, and document the application time.",
      },
      {
        text: "Release pressure to inspect the wound repeatedly",
        correct: false,
        feedback:
          "Repeatedly releasing pressure may disrupt clot formation and worsen blood loss.",
      },
      {
        text: "Place ice directly into the wound",
        correct: false,
        feedback:
          "Ice placed into an open wound is not an appropriate method of controlling life-threatening hemorrhage.",
      },
    ],
  },
  {
    id: "airway-breathing",
    title: "Airway and Breathing",
    patientUpdate:
      "The tourniquet controls the bleeding. The patient is confused but continues to maintain his airway. Respirations are 30/min and shallow. Breath sounds are present bilaterally but diminished on the left. SpO₂ is 89% on room air.",
    question: "What is the most appropriate next action?",
    choices: [
      {
        text: "Delay respiratory care until extrication is complete",
        correct: false,
        feedback:
          "Hypoxemia and inadequate ventilation require immediate attention during extrication.",
      },
      {
        text: "Provide oxygen and assist ventilation as clinically indicated while reassessing the chest",
        correct: true,
        feedback:
          "Correct. Address hypoxemia and inadequate ventilation while reassessing for evolving chest injuries.",
      },
      {
        text: "Have the patient take several deep breaths without oxygen",
        correct: false,
        feedback:
          "This patient is hypoxemic and has shallow respirations. Supportive respiratory care is required.",
      },
      {
        text: "Give the patient water because he appears anxious",
        correct: false,
        feedback:
          "Keep a seriously injured patient NPO because surgery, altered mental status, and aspiration risk may be present.",
      },
    ],
  },
  {
    id: "shock",
    title: "Shock Recognition",
    patientUpdate:
      "The patient has been extricated. Vital signs are BP 82/54, HR 132, RR 30, SpO₂ 95% with oxygen, and GCS 13. His skin is cool, pale, and diaphoretic. The abdomen is tender and mildly distended.",
    question: "What do these findings most strongly suggest?",
    choices: [
      {
        text: "Compensated anxiety without significant injury",
        correct: false,
        feedback:
          "Hypotension, tachycardia, altered mental status, cool skin, and abdominal findings suggest significant traumatic shock.",
      },
      {
        text: "Hemorrhagic shock with possible internal bleeding",
        correct: true,
        feedback:
          "Correct. The mechanism, hypotension, tachycardia, altered mental status, and abdominal findings are concerning for hemorrhagic shock and internal bleeding.",
      },
      {
        text: "An isolated minor extremity injury",
        correct: false,
        feedback:
          "The patient has systemic evidence of shock and possible internal injury, not an isolated minor wound.",
      },
      {
        text: "Hypertensive emergency",
        correct: false,
        feedback:
          "The patient is hypotensive, not hypertensive.",
      },
    ],
  },
  {
    id: "pelvic-injury",
    title: "Additional Trauma Findings",
    patientUpdate:
      "During the rapid trauma assessment, the pelvis appears unstable and the patient reports severe pelvic pain. There is no impaled object. The patient remains hypotensive.",
    question: "What intervention should be considered?",
    choices: [
      {
        text: "Repeatedly rock the pelvis to confirm instability",
        correct: false,
        feedback:
          "Avoid repeated pelvic manipulation because it can worsen bleeding and disrupt clot formation.",
      },
      {
        text: "Apply an appropriately positioned pelvic binder",
        correct: true,
        feedback:
          "Correct. A properly positioned pelvic binder may reduce pelvic volume and help limit hemorrhage in a suspected unstable pelvic injury.",
      },
      {
        text: "Have the patient stand to determine whether the pelvis can support weight",
        correct: false,
        feedback:
          "Do not ambulate a hypotensive trauma patient with suspected pelvic instability.",
      },
      {
        text: "Place the binder around the patient’s waist",
        correct: false,
        feedback:
          "A pelvic binder should be positioned according to its instructions, generally over the greater trochanters rather than the abdomen or waist.",
      },
    ],
  },
  {
    id: "transport",
    title: "Transport Decision",
    patientUpdate:
      "The patient has suspected internal hemorrhage, an unstable pelvic injury, controlled severe extremity bleeding, hypotension, tachycardia, and altered mental status. Extrication is complete.",
    question: "What is the most appropriate transport plan?",
    choices: [
      {
        text: "Remain on scene until the blood pressure returns to normal",
        correct: false,
        feedback:
          "Definitive hemorrhage control is usually surgical. Do not delay transport while waiting for the blood pressure to normalize.",
      },
      {
        text: "Initiate rapid transport to an appropriate trauma center while continuing care en route",
        correct: true,
        feedback:
          "Correct. Minimize scene time, provide early trauma notification, and transport according to current Massachusetts OEMS and regional trauma destination guidance.",
      },
      {
        text: "Transport to the nearest urgent care center",
        correct: false,
        feedback:
          "This critically injured patient requires a trauma center capable of definitive hemorrhage control and surgical intervention.",
      },
      {
        text: "Complete a detailed head-to-toe examination before leaving",
        correct: false,
        feedback:
          "Do not delay transport for a lengthy secondary assessment. Continue reassessment and additional care during transport.",
      },
    ],
  },
  {
    id: "radio-report",
    title: "Trauma Center Notification",
    patientUpdate:
      "You are transporting with an estimated arrival time of 14 minutes. The patient remains hypotensive but is maintaining his airway. The tourniquet and pelvic binder remain in place.",
    question: "Which radio report is most appropriate?",
    choices: [
      {
        text: "We are transporting an adult male involved in a motor vehicle crash. More information will follow after arrival.",
        correct: false,
        feedback:
          "The trauma center needs the mechanism, injuries, vital signs, treatments, patient response, and estimated arrival time before arrival.",
      },
      {
        text: "Trauma alert: 34-year-old male after a head-on collision with prolonged extrication, severe left thigh hemorrhage controlled with a tourniquet, suspected unstable pelvis with binder applied, abdominal tenderness, BP 82/54, HR 132, GCS 13, and ETA 14 minutes.",
        correct: true,
        feedback:
          "Correct. This report communicates the mechanism, major injuries, shock findings, treatments, current status, and estimated arrival time.",
      },
      {
        text: "The patient has a leg injury and will need sutures",
        correct: false,
        feedback:
          "This report significantly understates the patient’s condition and omits the evidence of hemorrhagic shock and possible internal bleeding.",
      },
      {
        text: "The patient is stable because the external bleeding has stopped",
        correct: false,
        feedback:
          "Control of external bleeding does not eliminate the risk of internal hemorrhage or traumatic shock.",
      },
    ],
  },
];

export default function TraumaSimulatorPage() {
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
              Major Trauma With Hemorrhagic Shock
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

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-300">
              The patient sustained life-threatening external
              hemorrhage, a suspected unstable pelvic injury, possible
              abdominal bleeding, and hemorrhagic shock following a
              high-energy motor vehicle collision.
            </p>

            <div className="mt-8 rounded-2xl border border-zinc-700 bg-black p-6 text-left">
              <h2 className="text-2xl font-bold text-red-500">
                Final Patient Summary
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <SummaryItem
                  label="Patient"
                  value="34-year-old male"
                />

                <SummaryItem
                  label="Mechanism"
                  value="Head-on motor vehicle collision"
                />

                <SummaryItem
                  label="Blood Pressure"
                  value="82/54 mmHg"
                />

                <SummaryItem
                  label="Heart Rate"
                  value="132 beats/minute"
                />

                <SummaryItem label="GCS" value="13" />

                <SummaryItem
                  label="Primary Concern"
                  value="Hemorrhagic shock"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-700 bg-black p-6 text-left">
              <h2 className="text-2xl font-bold text-red-500">
                Major Interventions
              </h2>

              <ul className="mt-4 space-y-3 text-zinc-300">
                <li>• Immediate control of life-threatening hemorrhage</li>
                <li>• Tourniquet application with time documented</li>
                <li>• Oxygen and ventilatory support as indicated</li>
                <li>• Pelvic binder for suspected unstable pelvic injury</li>
                <li>• Shock management and prevention of hypothermia</li>
                <li>• Rapid transport with early trauma-center notification</li>
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-yellow-700/50 bg-yellow-950/30 p-5 text-left text-yellow-100">
              <strong>Training reminder:</strong> Follow current
              Massachusetts OEMS trauma protocols, spinal-assessment
              guidance, hemorrhage-control procedures, trauma
              point-of-entry plans, medical-control direction, and
              local service policies.
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
              Major Trauma
            </h1>

            <p className="mt-4 max-w-3xl text-zinc-400">
              Perform the trauma assessment, control life-threatening
              hemorrhage, recognize shock, and make appropriate
              transport decisions.
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
              “Medic 1, respond with Engine 2 to Route 110 for a
              two-vehicle head-on collision. One driver is trapped,
              bleeding heavily, and becoming less responsive.”
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

          <div className="mt-6 rounded-2xl border border-zinc-700 bg-black p-5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
              Patient Update
            </p>

            <p className="mt-2 leading-7 text-zinc-200">
              {currentStage.patientUpdate}
            </p>
          </div>

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
                choiceClasses =
                  "border-red-600 bg-red-950/30";
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
          This simulator is for educational use only. Follow current
          Massachusetts OEMS protocols, regional trauma plans, medical
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