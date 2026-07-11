"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar";

type Option = {
  text: string;
  correct: boolean;
  feedback: string;
};

type ScenarioStep = {
  title: string;
  situation: string;
  findings?: string[];
  question: string;
  options: Option[];
};

const scenarioSteps: ScenarioStep[] = [
  {
    title: "Initial Assessment",
    situation:
      "You arrive at a private residence for a 72-year-old patient experiencing severe shortness of breath.",
    findings: [
      "Patient is seated upright and appears anxious",
      "Respiratory rate: 32 breaths/min",
      "SpO₂: 82% on room air",
      "Heart rate: 118 beats/min",
      "Blood pressure: 194/112 mmHg",
      "Skin is pale, cool, and diaphoretic",
      "The patient can speak only two or three words at a time",
    ],
    question: "What should be your immediate priority?",
    options: [
      {
        text: "Complete a detailed medical history before treating",
        correct: false,
        feedback:
          "The patient has severe respiratory distress. Immediate airway, breathing, and oxygenation support takes priority over a detailed history.",
      },
      {
        text: "Position the patient upright and begin airway and breathing support",
        correct: true,
        feedback:
          "Correct. Positioning the patient upright can reduce respiratory effort while you immediately assess and support airway, breathing, and oxygenation.",
      },
      {
        text: "Place the patient supine for a complete physical examination",
        correct: false,
        feedback:
          "Supine positioning may worsen breathing in acute pulmonary edema. Keep the patient upright unless another condition requires different positioning.",
      },
      {
        text: "Have the patient walk to the ambulance",
        correct: false,
        feedback:
          "Exertion may worsen hypoxia and respiratory distress. Bring equipment and the stretcher to the patient.",
      },
    ],
  },
  {
    title: "Respiratory Findings",
    situation:
      "You begin your respiratory assessment while providing oxygen and preparing additional treatment.",
    findings: [
      "Diffuse crackles are heard bilaterally",
      "The patient has increased work of breathing",
      "Pink, frothy sputum is present",
      "SpO₂ remains 86% despite initial oxygen",
      "Blood pressure remains markedly elevated",
    ],
    question: "Which condition is most consistent with these findings?",
    options: [
      {
        text: "Acute pulmonary edema",
        correct: true,
        feedback:
          "Correct. Severe dyspnea, diffuse crackles, hypoxia, hypertension, and pink frothy sputum strongly suggest acute pulmonary edema.",
      },
      {
        text: "Simple anxiety attack",
        correct: false,
        feedback:
          "Anxiety may be present, but it does not explain the crackles, frothy sputum, and severe hypoxia.",
      },
      {
        text: "Isolated upper-airway obstruction",
        correct: false,
        feedback:
          "An upper-airway obstruction would not usually produce diffuse bilateral crackles and frothy sputum.",
      },
      {
        text: "Uncomplicated hyperventilation syndrome",
        correct: false,
        feedback:
          "The abnormal lung sounds, hypoxia, hypertension, and frothy sputum indicate a serious cardiopulmonary emergency.",
      },
    ],
  },
  {
    title: "Ventilatory Support",
    situation:
      "The patient remains alert and follows commands but continues to have severe respiratory distress.",
    findings: [
      "Respiratory rate: 34 breaths/min",
      "SpO₂: 87% with supplemental oxygen",
      "Blood pressure: 190/108 mmHg",
      "The patient can maintain their own airway",
      "No vomiting or facial trauma is present",
    ],
    question: "What treatment should be considered next?",
    options: [
      {
        text: "Apply CPAP according to protocol",
        correct: true,
        feedback:
          "Correct. This patient has severe respiratory distress, remains conscious, can protect the airway, and has adequate blood pressure. CPAP should be considered early according to protocol.",
      },
      {
        text: "Delay CPAP until the patient becomes unresponsive",
        correct: false,
        feedback:
          "CPAP is most useful when applied early to an appropriate conscious patient before respiratory failure occurs.",
      },
      {
        text: "Give the patient water and reassess in 20 minutes",
        correct: false,
        feedback:
          "This patient requires immediate respiratory support and rapid transport, not oral fluids or delayed reassessment.",
      },
      {
        text: "Place the patient flat and apply a nasal cannula",
        correct: false,
        feedback:
          "Flat positioning may worsen breathing, and a nasal cannula alone is unlikely to provide sufficient support for severe pulmonary edema.",
      },
    ],
  },
  {
    title: "Medication Considerations",
    situation:
      "The patient tolerates CPAP. Oxygen saturation begins to improve, but the patient remains hypertensive and dyspneic.",
    findings: [
      "SpO₂: 92% on CPAP",
      "Blood pressure: 186/104 mmHg",
      "The patient denies taking erectile-dysfunction medication",
      "No medication allergy is reported",
      "Local protocol permits nitroglycerin for this presentation",
    ],
    question: "What medication should be considered according to protocol?",
    options: [
      {
        text: "Nitroglycerin",
        correct: true,
        feedback:
          "Correct. In a hypertensive patient with suspected acute pulmonary edema, nitroglycerin may be indicated according to local protocol after contraindications are assessed.",
      },
      {
        text: "Oral glucose",
        correct: false,
        feedback:
          "There is no evidence of hypoglycemia in this scenario. Oral glucose does not treat pulmonary edema.",
      },
      {
        text: "Epinephrine for anaphylaxis",
        correct: false,
        feedback:
          "The findings are not consistent with anaphylaxis. Epinephrine is not the appropriate medication for this presentation.",
      },
      {
        text: "Withhold all treatment until arrival at the hospital",
        correct: false,
        feedback:
          "Appropriate prehospital treatment can improve oxygenation, reduce work of breathing, and prevent deterioration.",
      },
    ],
  },
  {
    title: "Reassessment and Transport",
    situation:
      "After CPAP and protocol-directed treatment, the patient reports that breathing is becoming easier.",
    findings: [
      "Respiratory rate: 24 breaths/min",
      "SpO₂: 96%",
      "Blood pressure: 164/92 mmHg",
      "The patient can speak in full sentences",
      "Crackles remain present but respiratory effort has improved",
    ],
    question: "What is the best next action?",
    options: [
      {
        text: "Discontinue all treatment because the patient improved",
        correct: false,
        feedback:
          "Improvement does not mean the emergency has resolved. Continue treatment, monitoring, reassessment, and transport.",
      },
      {
        text: "Continue CPAP and monitoring, reassess frequently, and transport",
        correct: true,
        feedback:
          "Correct. Continue effective therapy, monitor for deterioration, reassess vital signs and respiratory status, and transport to an appropriate facility.",
      },
      {
        text: "Allow the patient to refuse because oxygen saturation improved",
        correct: false,
        feedback:
          "Acute pulmonary edema can recur or deteriorate rapidly. Improvement after treatment does not eliminate the need for evaluation and transport.",
      },
      {
        text: "Remove CPAP and have the patient walk to the ambulance",
        correct: false,
        feedback:
          "Unnecessary exertion and early removal of effective treatment may cause deterioration. Continue support and move the patient safely.",
      },
    ],
  },
];

export default function AcutePulmonaryEdemaPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [complete, setComplete] = useState(false);

  const step = scenarioSteps[currentStep];
  const percentage = Math.round(
    (correctAnswers / scenarioSteps.length) * 100
  );

  function chooseOption(optionIndex: number) {
    if (answered) return;

    setSelectedOption(optionIndex);
    setAnswered(true);

    if (step.options[optionIndex].correct) {
      setCorrectAnswers((previous) => previous + 1);
    }
  }

  function continueScenario() {
    if (!answered) return;

    if (currentStep === scenarioSteps.length - 1) {
      setComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentStep((previous) => previous + 1);
    setSelectedOption(null);
    setAnswered(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restartScenario() {
    setCurrentStep(0);
    setSelectedOption(null);
    setAnswered(false);
    setCorrectAnswers(0);
    setComplete(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (complete) {
    const finalPercentage = Math.round(
      (correctAnswers / scenarioSteps.length) * 100
    );

    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="rounded-3xl border-2 border-emerald-500 bg-zinc-900 p-8 text-center shadow-2xl md:p-12">
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-emerald-400">
              Scenario Complete
            </p>

            <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">
              Acute Pulmonary Edema
            </h1>

            <p className="mt-6 text-6xl font-extrabold text-red-500">
              {finalPercentage}%
            </p>

            <p className="mt-3 text-xl font-semibold text-zinc-300">
              Correct decisions: {correctAnswers} / {scenarioSteps.length}
            </p>

            <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-black p-6 text-left">
              <h2 className="text-2xl font-extrabold">
                GrumpyMedic Debrief
              </h2>

              <p className="mt-4 leading-7 text-zinc-300">
                You assessed respiratory distress, recognized findings
                consistent with acute pulmonary edema, prioritized airway and
                breathing, considered early CPAP, evaluated nitroglycerin
                according to protocol, reassessed the patient, and continued
                appropriate transport.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={restartScenario}
                className="rounded-xl border border-zinc-600 px-6 py-3 font-bold text-zinc-200 transition hover:border-zinc-400 hover:bg-zinc-800"
              >
                Retake Scenario
              </button>

              <Link
                href="/courses"
                className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-500"
              >
                Return to Courses
              </Link>

              <Link
                href={`/courses/acute-pulmonary-edema/certificate?score=${finalPercentage}`}
                className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-500"
              >
                View Certificate
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
        <Link
          href="/courses"
          className="font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Courses
        </Link>

        <div className="mt-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">
            Interactive EMS Scenario
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Acute Pulmonary Edema
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
            Work through five clinical decisions involving recognition,
            respiratory support, CPAP, medication considerations, reassessment,
            and transport.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="font-semibold text-zinc-300">
              Decision {currentStep + 1} of {scenarioSteps.length}
            </span>

            <span className="font-bold text-red-400">
              {Math.round(
                ((currentStep + (answered ? 1 : 0)) /
                  scenarioSteps.length) *
                  100
              )}
              %
            </span>
          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-red-600 transition-all"
              style={{
                width: `${
                  ((currentStep + (answered ? 1 : 0)) /
                    scenarioSteps.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <article className="mt-8 rounded-3xl border border-zinc-700 bg-zinc-900 p-6 md:p-8">
          <p className="text-sm font-bold uppercase tracking-wide text-red-400">
            {step.title}
          </p>

          <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
            Patient Update
          </h2>

          <p className="mt-4 leading-7 text-zinc-300">{step.situation}</p>

          {step.findings && (
            <div className="mt-6 rounded-2xl bg-black p-5">
              <h3 className="font-extrabold text-zinc-100">
                Assessment findings
              </h3>

              <ul className="mt-3 space-y-2 text-zinc-300">
                {step.findings.map((finding) => (
                  <li key={finding}>• {finding}</li>
                ))}
              </ul>
            </div>
          )}

          <h3 className="mt-8 text-xl font-extrabold">{step.question}</h3>

          <div className="mt-5 space-y-3">
            {step.options.map((option, optionIndex) => {
              const selected = selectedOption === optionIndex;
              const showCorrect = answered && option.correct;
              const showIncorrect = answered && selected && !option.correct;

              return (
                <button
                  key={option.text}
                  type="button"
                  disabled={answered}
                  onClick={() => chooseOption(optionIndex)}
                  className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                    showCorrect
                      ? "border-emerald-500 bg-emerald-500/10"
                      : showIncorrect
                        ? "border-red-500 bg-red-500/10"
                        : selected
                          ? "border-red-500 bg-red-500/10"
                          : "border-zinc-700 bg-black hover:border-red-500"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold ${
                      selected
                        ? "bg-red-600 text-white"
                        : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    {String.fromCharCode(65 + optionIndex)}
                  </span>

                  <span className="pt-1 text-zinc-200">{option.text}</span>
                </button>
              );
            })}
          </div>

          {answered && selectedOption !== null && (
            <div
              className={`mt-6 rounded-2xl border p-5 ${
                step.options[selectedOption].correct
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-amber-500 bg-amber-500/10"
              }`}
            >
              <h3 className="font-extrabold">
                {step.options[selectedOption].correct
                  ? "Correct decision"
                  : "Review this decision"}
              </h3>

              <p className="mt-2 leading-7 text-zinc-300">
                {step.options[selectedOption].feedback}
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              disabled={!answered}
              onClick={continueScenario}
              className={`rounded-xl px-7 py-3 font-bold transition ${
                answered
                  ? "bg-red-600 text-white hover:bg-red-500"
                  : "cursor-not-allowed bg-zinc-800 text-zinc-600"
              }`}
            >
              {currentStep === scenarioSteps.length - 1
                ? "Complete Scenario"
                : "Continue →"}
            </button>
          </div>
        </article>

        <p className="mt-8 text-center text-sm leading-6 text-zinc-500">
          Educational content only. Follow current state and local protocols,
          medical-director guidance, service policy, and manufacturer
          instructions.
        </p>
      </section>
    </main>
  );
}