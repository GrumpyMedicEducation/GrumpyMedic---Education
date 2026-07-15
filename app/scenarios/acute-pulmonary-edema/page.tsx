"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

type TreatmentKey =
  | "oxygen"
  | "cpap"
  | "nitroglycerin"
  | "iv"
  | "twelveLead"
  | "capnography"
  | "radioReport";

type ScoreCategory =
  | "assessment"
  | "airway"
  | "medication"
  | "reassessment"
  | "transport";

type CategoryScores = Record<ScoreCategory, number>;

type Choice = {
  text: string;
  points: number;
  correct: boolean;
  category: ScoreCategory;
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

type ActionLogItem = {
  time: number;
  action: string;
  result: string;
  positive: boolean;
};

const MAX_CATEGORY_SCORES: CategoryScores = {
  assessment: 20,
  airway: 20,
  medication: 20,
  reassessment: 20,
  transport: 20,
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

const treatmentLabels: Record<TreatmentKey, string> = {
  oxygen: "Apply Oxygen",
  cpap: "Initiate CPAP",
  nitroglycerin: "Nitroglycerin",
  iv: "Establish IV",
  twelveLead: "Obtain 12-Lead",
  capnography: "Apply Capnography",
  radioReport: "Hospital Notification",
};

const scenarioSteps: ScenarioStep[] = [
  {
    phase: "Initial Assessment",
    title: "Patient Presentation",
    situation:
      "You enter a private residence and find a 72-year-old patient seated upright in a recliner. The patient appears anxious, pale, diaphoretic, and severely short of breath.",
    patientStatement: "I... cannot... catch my breath.",
    findings: [
      "Patient is alert and following commands",
      "Speaking in two- to three-word sentences",
      "Diffuse bilateral crackles",
      "Severe accessory-muscle use",
      "History of hypertension and congestive heart failure",
      "Symptoms began approximately 30 minutes ago",
    ],
    choices: [
      {
        text: "Keep the patient upright and begin immediate respiratory support",
        points: 20,
        correct: true,
        category: "assessment",
        feedback:
          "Correct. Upright positioning, rapid assessment, and immediate respiratory support are appropriate priorities.",
        patientResponse:
          "The patient remains distressed but cooperates with your assessment.",
        vitalChanges: {
          heartRate: 120,
          respiratoryRate: 33,
        },
      },
      {
        text: "Lay the patient flat and obtain a complete medical history first",
        points: 0,
        correct: false,
        category: "assessment",
        feedback:
          "Laying the patient flat may worsen pulmonary congestion. Respiratory support should not be delayed.",
        patientResponse:
          "The patient becomes increasingly anxious and reports worsening breathing.",
        vitalChanges: {
          heartRate: 128,
          respiratoryRate: 38,
          oxygenSaturation: 78,
        },
      },
      {
        text: "Have the patient walk to the ambulance before treating",
        points: 0,
        correct: false,
        category: "assessment",
        feedback:
          "Exertion may substantially worsen hypoxia and respiratory distress.",
        patientResponse:
          "The patient cannot stand and becomes increasingly fatigued.",
        vitalChanges: {
          heartRate: 132,
          respiratoryRate: 40,
          oxygenSaturation: 76,
        },
      },
    ],
  },
  {
    phase: "Respiratory Support",
    title: "Persistent Severe Hypoxia",
    situation:
      "The patient remains severely dyspneic. The patient is awake, cooperative, and able to follow instructions.",
    patientStatement: "Please... do something. I feel like I am drowning.",
    findings: [
      "Severe work of breathing",
      "Accessory-muscle use",
      "Diffuse crackles remain present",
      "Patient can maintain an open airway",
      "No vomiting",
      "No facial trauma preventing mask placement",
    ],
    choices: [
      {
        text: "Initiate CPAP and monitor closely",
        points: 20,
        correct: true,
        category: "airway",
        feedback:
          "Correct. The patient is awake, cooperative, severely hypoxic, and has findings consistent with acute pulmonary edema.",
        patientResponse:
          "The patient begins taking deeper breaths and appears less anxious.",
        vitalChanges: {
          heartRate: 112,
          respiratoryRate: 27,
          oxygenSaturation: 91,
          etco2: 32,
        },
      },
      {
        text: "Continue oxygen alone and wait another ten minutes",
        points: 5,
        correct: false,
        category: "airway",
        feedback:
          "Oxygen alone has not produced adequate improvement. Delaying positive-pressure support may allow deterioration.",
        patientResponse:
          "The patient continues to struggle and appears increasingly fatigued.",
        vitalChanges: {
          heartRate: 126,
          respiratoryRate: 36,
          oxygenSaturation: 84,
          etco2: 25,
        },
      },
      {
        text: "Immediately perform endotracheal intubation",
        points: 0,
        correct: false,
        category: "airway",
        feedback:
          "The patient remains awake, cooperative, and able to protect the airway. Noninvasive ventilation should be considered first when appropriate.",
        patientResponse:
          "The patient becomes frightened and pulls away from the equipment.",
        vitalChanges: {
          heartRate: 130,
          respiratoryRate: 38,
          oxygenSaturation: 80,
        },
      },
    ],
  },
  {
    phase: "Medication Decision",
    title: "Hypertensive Pulmonary Edema",
    situation:
      "The patient remains markedly hypertensive. The patient denies recent phosphodiesterase-inhibitor use and has no reported nitroglycerin allergy.",
    patientStatement: "The mask is helping, but my chest still feels tight.",
    findings: [
      "Markedly elevated blood pressure",
      "Patient remains alert",
      "No signs of hypotension",
      "No reported recent erectile-dysfunction medication use",
      "No known nitroglycerin allergy",
      "CPAP is being tolerated",
    ],
    choices: [
      {
        text: "Administer nitroglycerin according to protocol and reassess",
        points: 20,
        correct: true,
        category: "medication",
        feedback:
          "Correct. In hypertensive acute pulmonary edema, nitroglycerin may reduce preload and afterload when permitted by local protocol.",
        patientResponse:
          "The patient reports decreased chest pressure and easier breathing.",
        vitalChanges: {
          heartRate: 104,
          respiratoryRate: 24,
          oxygenSaturation: 94,
          systolicBloodPressure: 164,
          diastolicBloodPressure: 94,
          etco2: 34,
        },
      },
      {
        text: "Administer a large normal-saline bolus",
        points: 0,
        correct: false,
        category: "medication",
        feedback:
          "A large fluid bolus may worsen pulmonary edema unless another specific indication exists.",
        patientResponse:
          "The patient's breathing worsens and crackles become more pronounced.",
        vitalChanges: {
          heartRate: 132,
          respiratoryRate: 38,
          oxygenSaturation: 82,
          systolicBloodPressure: 198,
          diastolicBloodPressure: 116,
        },
      },
      {
        text: "Remove CPAP before giving medication",
        points: 0,
        correct: false,
        category: "medication",
        feedback:
          "Effective ventilatory support should not be discontinued without a clinical reason.",
        patientResponse:
          "The patient immediately becomes more short of breath.",
        vitalChanges: {
          heartRate: 124,
          respiratoryRate: 35,
          oxygenSaturation: 84,
        },
      },
    ],
  },
  {
    phase: "Reassessment",
    title: "Response to Treatment",
    situation:
      "The patient appears less anxious and is speaking in longer sentences. Crackles remain present but are less pronounced.",
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
        text: "Continue treatment and repeat a complete reassessment",
        points: 20,
        correct: true,
        category: "reassessment",
        feedback:
          "Correct. Continue effective treatment while reassessing mental status, respiratory effort, blood pressure, oxygenation, and fatigue.",
        patientResponse:
          "The patient continues improving and remains cooperative.",
        vitalChanges: {
          heartRate: 98,
          respiratoryRate: 22,
          oxygenSaturation: 96,
          systolicBloodPressure: 148,
          diastolicBloodPressure: 86,
          etco2: 36,
        },
      },
      {
        text: "Stop CPAP because the oxygen saturation improved",
        points: 0,
        correct: false,
        category: "reassessment",
        feedback:
          "Improvement does not mean the emergency has resolved. Abruptly removing support may cause deterioration.",
        patientResponse:
          "The patient becomes increasingly dyspneic and anxious.",
        vitalChanges: {
          heartRate: 120,
          respiratoryRate: 34,
          oxygenSaturation: 86,
        },
      },
      {
        text: "Have the patient stand and walk to test improvement",
        points: 0,
        correct: false,
        category: "reassessment",
        feedback:
          "The patient remains seriously ill and should not be subjected to unnecessary exertion.",
        patientResponse:
          "The patient becomes lightheaded and must sit back down.",
        vitalChanges: {
          heartRate: 126,
          respiratoryRate: 32,
          oxygenSaturation: 88,
        },
      },
    ],
  },
  {
    phase: "Transport",
    title: "Definitive Care",
    situation:
      "The patient has improved but continues to require respiratory support, cardiac monitoring, and frequent reassessment. The receiving hospital is approximately 12 minutes away.",
    patientStatement: "I feel better, but I still need the mask.",
    findings: [
      "Patient remains stable with treatment",
      "Oxygen saturation remains improved",
      "Blood pressure remains adequate",
      "Respiratory effort is improved but not normal",
      "Continuous monitoring remains indicated",
      "Hospital evaluation is still required",
    ],
    choices: [
      {
        text: "Transport promptly while continuing treatment and reassessment",
        points: 20,
        correct: true,
        category: "transport",
        feedback:
          "Correct. The patient requires hospital evaluation and continued treatment despite improvement.",
        patientResponse:
          "The patient remains stable during transport and is transferred to the emergency department.",
        vitalChanges: {
          heartRate: 94,
          respiratoryRate: 20,
          oxygenSaturation: 97,
          systolicBloodPressure: 142,
          diastolicBloodPressure: 82,
          etco2: 37,
        },
      },
      {
        text: "Cancel transport because the patient feels better",
        points: 0,
        correct: false,
        category: "transport",
        feedback:
          "Temporary improvement does not eliminate the risk of recurrence or deterioration.",
        patientResponse:
          "The patient's respiratory distress begins returning.",
        vitalChanges: {
          heartRate: 122,
          respiratoryRate: 34,
          oxygenSaturation: 87,
        },
      },
      {
        text: "Remain on scene until every symptom has resolved",
        points: 5,
        correct: false,
        category: "transport",
        feedback:
          "Treatment should continue during prompt transport. Unnecessary on-scene delay is inappropriate.",
        patientResponse:
          "The patient remains dependent on treatment while definitive care is delayed.",
        vitalChanges: {},
      },
    ],
  },
];

export default function AcutePulmonaryEdemaScenarioPage() {
  const [scenarioStarted, setScenarioStarted] = useState(false);
  const [scenarioComplete, setScenarioComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const [displayVitals, setDisplayVitals] =
    useState<VitalSigns>(initialVitals);

  const [targetVitals, setTargetVitals] =
    useState<VitalSigns>(initialVitals);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [usedTreatments, setUsedTreatments] =
    useState<TreatmentKey[]>([]);

  const [actionLog, setActionLog] =
    useState<ActionLogItem[]>([]);

  const [clinicalMessage, setClinicalMessage] = useState(
    "Complete your initial assessment and select treatments when appropriate."
  );

  const [categoryScores, setCategoryScores] =
    useState<CategoryScores>({
      assessment: 0,
      airway: 0,
      medication: 0,
      reassessment: 0,
      transport: 0,
    });

  useEffect(() => {
    if (!scenarioStarted || scenarioComplete) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [scenarioStarted, scenarioComplete]);

  useEffect(() => {
    if (!scenarioStarted || scenarioComplete) {
      return;
    }

    const monitorAnimation = window.setInterval(() => {
      setDisplayVitals((previous) => ({
        ...previous,

        heartRate: moveToward(
          previous.heartRate,
          targetVitals.heartRate
        ),

        respiratoryRate: moveToward(
          previous.respiratoryRate,
          targetVitals.respiratoryRate
        ),

        oxygenSaturation: moveToward(
          previous.oxygenSaturation,
          targetVitals.oxygenSaturation
        ),

        systolicBloodPressure: moveToward(
          previous.systolicBloodPressure,
          targetVitals.systolicBloodPressure,
          3
        ),

        diastolicBloodPressure: moveToward(
          previous.diastolicBloodPressure,
          targetVitals.diastolicBloodPressure,
          2
        ),

        etco2: moveToward(
          previous.etco2,
          targetVitals.etco2
        ),

        rhythm: targetVitals.rhythm,
      }));
    }, 650);

    return () => window.clearInterval(monitorAnimation);
  }, [scenarioStarted, scenarioComplete, targetVitals]);

  const step = scenarioSteps[currentStep];

  const selected =
    selectedChoice === null
      ? null
      : step.choices[selectedChoice];

  const progress =
    ((currentStep + 1) / scenarioSteps.length) * 100;

  const totalScore = Object.values(categoryScores).reduce(
    (sum, value) => sum + value,
    0
  );

  const dispatchTimes = useMemo(
    () => ({
      dispatched: "09:42:13",
      enRoute: "09:42:41",
      onScene: "09:45:02",
    }),
    []
  );

  function addLog(
    action: string,
    result: string,
    positive: boolean
  ) {
    setActionLog((previous) => [
      ...previous,
      {
        time: elapsedSeconds,
        action,
        result,
        positive,
      },
    ]);
  }

  function startScenario() {
    setScenarioStarted(true);

    addLog(
      "Patient contact",
      "72-year-old patient found in severe respiratory distress.",
      true
    );
  }

  function selectChoice(choiceIndex: number) {
    if (selectedChoice !== null) {
      return;
    }

    const choice = step.choices[choiceIndex];

    setSelectedChoice(choiceIndex);

    setCategoryScores((previous) => ({
      ...previous,
      [choice.category]: Math.min(
        MAX_CATEGORY_SCORES[choice.category],
        choice.points
      ),
    }));

    setTargetVitals((previous) => ({
      ...previous,
      ...choice.vitalChanges,
    }));

    setClinicalMessage(choice.feedback);

    addLog(
      choice.correct
        ? "Appropriate decision"
        : "Decision reviewed",
      choice.patientResponse,
      choice.correct
    );
  }

  function useTreatment(treatment: TreatmentKey) {
    if (usedTreatments.includes(treatment)) {
      setClinicalMessage(
        `${treatmentLabels[treatment]} has already been completed.`
      );

      return;
    }

    if (
      treatment === "cpap" &&
      !usedTreatments.includes("oxygen")
    ) {
      setClinicalMessage(
        "Apply initial oxygen and complete a rapid respiratory assessment before progressing to CPAP."
      );

      addLog(
        "CPAP deferred",
        "Initial oxygen and respiratory assessment should occur first.",
        false
      );

      return;
    }

    if (
      treatment === "nitroglycerin" &&
      currentStep < 2
    ) {
      setClinicalMessage(
        "Nitroglycerin is not yet appropriate. Confirm the blood pressure, contraindications, and clinical presentation first."
      );

      addLog(
        "Nitroglycerin deferred",
        "Medication prerequisites were not yet confirmed.",
        false
      );

      return;
    }

    const completeTreatment = (
      message: string,
      result: string,
      changes: Partial<VitalSigns>,
      positive = true
    ) => {
      setUsedTreatments((previous) => [
        ...previous,
        treatment,
      ]);

      setTargetVitals((previous) => ({
        ...previous,
        ...changes,
      }));

      setClinicalMessage(message);

      addLog(
        treatmentLabels[treatment],
        result,
        positive
      );
    };

    switch (treatment) {
      case "oxygen":
        completeTreatment(
          "Oxygen applied. Continue monitoring respiratory effort and oxygen saturation.",
          "SpO₂ begins improving, but severe respiratory distress remains.",
          {
            oxygenSaturation: Math.max(
              targetVitals.oxygenSaturation,
              86
            ),
            heartRate: 120,
          }
        );
        break;

      case "cpap":
        completeTreatment(
          "CPAP initiated. Monitor mental status, mask tolerance, blood pressure, and ventilation.",
          "Work of breathing decreases and oxygen saturation improves.",
          {
            oxygenSaturation: 92,
            respiratoryRate: 27,
            heartRate: 110,
            etco2: 33,
          }
        );
        break;

      case "nitroglycerin":
        if (
          targetVitals.systolicBloodPressure < 100
        ) {
          setClinicalMessage(
            "Nitroglycerin was withheld because the current blood pressure is inadequate. Follow local protocol."
          );

          addLog(
            "Nitroglycerin withheld",
            "Blood pressure did not meet safe administration criteria.",
            false
          );

          return;
        }

        completeTreatment(
          "Nitroglycerin administered according to protocol. Reassess blood pressure and symptoms.",
          "Blood pressure decreases and the patient reports easier breathing.",
          {
            systolicBloodPressure: 164,
            diastolicBloodPressure: 94,
            heartRate: 104,
            respiratoryRate: 24,
            oxygenSaturation: 94,
          }
        );
        break;

      case "iv":
        completeTreatment(
          "IV access established without delaying respiratory treatment or transport.",
          "Vascular access is available for further treatment if needed.",
          {}
        );
        break;

      case "twelveLead":
        completeTreatment(
          "12-lead ECG obtained while respiratory care continues.",
          "Sinus tachycardia is present without an obvious STEMI pattern.",
          {
            rhythm: "Sinus Tachycardia",
          }
        );
        break;

      case "capnography":
        completeTreatment(
          "Continuous waveform capnography applied.",
          "Ventilation can now be trended during treatment.",
          {
            etco2: Math.max(
              targetVitals.etco2,
              31
            ),
          }
        );
        break;

      case "radioReport":
        completeTreatment(
          "The receiving hospital has been notified.",
          "The emergency department prepares for the patient's arrival.",
          {}
        );
        break;
    }
  }

  function continueScenario() {
    if (
      currentStep ===
      scenarioSteps.length - 1
    ) {
      setScenarioComplete(true);
      return;
    }

    setCurrentStep(
      (previous) => previous + 1
    );

    setSelectedChoice(null);

    setClinicalMessage(
      "Continue assessing the patient and select your next treatment or decision."
    );
  }

  function restartScenario() {
    setScenarioStarted(false);
    setScenarioComplete(false);
    setCurrentStep(0);
    setSelectedChoice(null);

    setDisplayVitals(initialVitals);
    setTargetVitals(initialVitals);

    setElapsedSeconds(0);
    setUsedTreatments([]);
    setActionLog([]);

    setClinicalMessage(
      "Complete your initial assessment and select treatments when appropriate."
    );

    setCategoryScores({
      assessment: 0,
      airway: 0,
      medication: 0,
      reassessment: 0,
      transport: 0,
    });
  }

  function getPerformanceMessage() {
    if (totalScore >= 90) {
      return "Excellent performance. You recognized the emergency, supported ventilation, selected appropriate treatment, reassessed the patient, and transported promptly.";
    }

    if (totalScore >= 75) {
      return "Good performance. Review the category scores and action log for opportunities to improve sequencing and reassessment.";
    }

    if (totalScore >= 55) {
      return "Developing performance. Review CPAP indications, nitroglycerin considerations, respiratory reassessment, and transport priorities.";
    }

    return "Repeat this scenario. Focus on immediate respiratory support, avoiding harmful delays, reassessing treatment response, and continuing care during transport.";
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
              <DispatchDetail
                label="Unit"
                value="Medic 1"
              />

              <DispatchDetail
                label="Response"
                value="Priority 1"
              />

              <DispatchDetail
                label="Patient"
                value="72-year-old patient"
              />

              <DispatchDetail
                label="Location"
                value="Private residence"
              />
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

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <TimelineItem
                label="Dispatched"
                value={dispatchTimes.dispatched}
              />

              <TimelineItem
                label="En Route"
                value={dispatchTimes.enRoute}
              />

              <TimelineItem
                label="On Scene"
                value={dispatchTimes.onScene}
              />
            </div>

            <div className="mt-8 rounded-xl border border-yellow-600 bg-yellow-950/30 p-5">
              <p className="font-bold text-yellow-400">
                Training Objective
              </p>

              <p className="mt-2 text-zinc-300">
                Assess the patient, select treatments, monitor the response,
                and determine the transport plan.
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

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-red-600 bg-zinc-900 p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Scenario Complete
            </p>

            <h1 className="mt-3 text-4xl font-extrabold">
              Acute Pulmonary Edema
            </h1>

            <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-8 border-red-600 bg-black">
              <span className="text-5xl font-extrabold text-red-500">
                {totalScore}%
              </span>
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-300">
              {getPerformanceMessage()}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-5">
              {Object.entries(categoryScores).map(
                ([category, value]) => (
                  <SummaryCard
                    key={category}
                    label={category}
                    value={`${value}/${
                      MAX_CATEGORY_SCORES[
                        category as ScoreCategory
                      ]
                    }`}
                  />
                )
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              <SummaryCard
                label="Final SpO₂"
                value={`${displayVitals.oxygenSaturation}%`}
              />

              <SummaryCard
                label="Final BP"
                value={`${displayVitals.systolicBloodPressure}/${displayVitals.diastolicBloodPressure}`}
              />

              <SummaryCard
                label="Final RR"
                value={`${displayVitals.respiratoryRate}`}
              />

              <SummaryCard
                label="Scenario Time"
                value={formatTime(elapsedSeconds)}
              />
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

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
              <h2 className="text-2xl font-bold text-red-500">
                Scenario Debrief
              </h2>

              <ul className="mt-5 space-y-3 text-zinc-300">
                <li>
                  • Position the severely dyspneic patient upright when tolerated.
                </li>

                <li>
                  • Recognize severe respiratory distress, crackles, and hypoxia.
                </li>

                <li>
                  • Consider early positive-pressure ventilation when indicated.
                </li>

                <li>
                  • Follow local protocol before administering nitroglycerin.
                </li>

                <li>
                  • Reassess mental status, respiratory effort, blood pressure,
                  oxygenation, and fatigue.
                </li>

                <li>
                  • Continue effective treatment during prompt transport.
                </li>
              </ul>
            </section>

            <ActionLog items={actionLog} />
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

          <div className="flex flex-wrap gap-3">
            <StatusBox
              label="Score"
              value={`${totalScore}%`}
            />

            <StatusBox
              label="Time"
              value={formatTime(elapsedSeconds)}
            />
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

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
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

            <section className="mt-8 rounded-xl border border-zinc-700 bg-black p-5">
              <h3 className="text-xl font-bold text-red-500">
                Treatment Tray
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Select interventions as they become clinically appropriate.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(
                  Object.keys(
                    treatmentLabels
                  ) as TreatmentKey[]
                ).map((treatment) => {
                  const completed =
                    usedTreatments.includes(
                      treatment
                    );

                  return (
                    <button
                      key={treatment}
                      type="button"
                      onClick={() =>
                        useTreatment(treatment)
                      }
                      className={`rounded-xl border px-4 py-4 text-left font-bold transition ${
                        completed
                          ? "border-green-500 bg-green-950/30 text-green-300"
                          : "border-zinc-700 bg-zinc-950 hover:border-red-500"
                      }`}
                    >
                      <span className="block">
                        {treatmentLabels[treatment]}
                      </span>

                      <span className="mt-1 block text-xs font-normal text-zinc-500">
                        {completed
                          ? "Completed"
                          : "Select treatment"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="mt-8 rounded-xl border border-blue-500 bg-blue-950/20 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-300">
                Clinical Feedback
              </p>

              <p className="mt-3 leading-7 text-zinc-200">
                {clinicalMessage}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold">
                What is your next action?
              </h3>

              <div className="mt-5 space-y-4">
                {step.choices.map(
                  (choice, index) => {
                    const isSelected =
                      selectedChoice === index;

                    let style =
                      "border-zinc-700 bg-black hover:border-red-500";

                    if (
                      selectedChoice !== null
                    ) {
                      if (
                        isSelected &&
                        choice.correct
                      ) {
                        style =
                          "border-green-500 bg-green-950/40";
                      } else if (
                        isSelected &&
                        !choice.correct
                      ) {
                        style =
                          "border-red-500 bg-red-950/40";
                      } else {
                        style =
                          "border-zinc-800 bg-zinc-950 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={choice.text}
                        type="button"
                        disabled={
                          selectedChoice !== null
                        }
                        onClick={() =>
                          selectChoice(index)
                        }
                        className={`w-full rounded-xl border p-5 text-left font-semibold transition ${style}`}
                      >
                        {choice.text}
                      </button>
                    );
                  }
                )}
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
                  {currentStep ===
                  scenarioSteps.length - 1
                    ? "View Results"
                    : "Continue Scenario"}
                </button>
              </div>
            )}
          </article>

          <div className="space-y-6">
            <PatientMonitor
              vitals={displayVitals}
            />

            <ActionLog
              items={actionLog}
            />
          </div>
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

      <style jsx global>{`
        @keyframes monitor-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .monitor-wave {
          animation: monitor-scroll 5s linear infinite;
        }
      `}</style>
    </main>
  );
}

function PatientMonitor({
  vitals,
}: {
  vitals: VitalSigns;
}) {
  const waveform = [
    28, 28, 28, 16, 42, 5, 55, 22,
    28, 28, 28, 28, 28, 16, 42, 5,
    55, 22, 28, 28, 28, 28, 28, 16,
    42, 5, 55, 22, 28, 28, 28, 28,
  ];

  return (
    <aside className="h-fit rounded-2xl border border-green-500 bg-zinc-950 p-6 shadow-lg shadow-green-950/30 xl:sticky xl:top-6">
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
        <MonitorValue
          label="HR"
          value={`${vitals.heartRate}`}
        />

        <MonitorValue
          label="SpO₂"
          value={`${vitals.oxygenSaturation}%`}
        />

        <MonitorValue
          label="RR"
          value={`${vitals.respiratoryRate}`}
        />

        <MonitorValue
          label="EtCO₂"
          value={`${vitals.etco2}`}
        />
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

      <div className="mt-5 overflow-hidden rounded-lg border border-green-500 bg-green-950/20">
        <div className="relative h-28 w-full overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:18px_18px]" />

          <div className="monitor-wave absolute left-0 top-0 flex h-full w-[200%] items-center">
            {waveform.map(
              (height, index) => (
                <div
                  key={index}
                  className="w-5 shrink-0 border-t-2 border-green-400"
                  style={{
                    height: `${height}px`,
                    transform: `translateY(${
                      28 - height / 2
                    }px)`,
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

function ActionLog({
  items,
}: {
  items: ActionLogItem[];
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-bold text-red-500">
        Action Log
      </h2>

      <div className="mt-5 max-h-96 space-y-3 overflow-y-auto pr-2">
        {items.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Treatments and decisions will appear here.
          </p>
        ) : (
          items.map((item, index) => (
            <div
              key={`${item.action}-${index}`}
              className={`rounded-lg border p-4 ${
                item.positive
                  ? "border-green-900 bg-green-950/20"
                  : "border-red-900 bg-red-950/20"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold text-white">
                  {item.action}
                </p>

                <p className="text-xs font-bold text-zinc-500">
                  {formatTime(item.time)}
                </p>
              </div>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {item.result}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
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

function TimelineItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-2 font-mono text-lg font-bold text-red-400">
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

      <p className="mt-2 text-3xl font-extrabold text-green-400 transition-all duration-500">
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

      <p className="mt-2 font-bold capitalize text-red-500">
        {value}
      </p>
    </div>
  );
}

function moveToward(
  current: number,
  target: number,
  step = 1
) {
  if (current === target) {
    return current;
  }

  if (current < target) {
    return Math.min(
      current + step,
      target
    );
  }

  return Math.max(
    current - step,
    target
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(
    seconds / 60
  );

  const remainingSeconds =
    seconds % 60;

  return `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}