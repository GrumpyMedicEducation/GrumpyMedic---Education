"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

type FastEdAnswers = {
  facial: number | null;
  arm: number | null;
  speech: number | null;
  eye: number | null;
  neglect: number | null;
};

type FastEdSectionProps = {
  letter: string;
  title: string;
  description: string;
  name: string;
  selectedValue: number | null;
  options: {
    value: number;
    label: string;
  }[];
  onChange: (value: number) => void;
};

export default function StrokeScenarioPage() {
  const [answers, setAnswers] = useState<FastEdAnswers>({
    facial: null,
    arm: null,
    speech: null,
    eye: null,
    neglect: null,
  });

  const [checked, setChecked] = useState(false);

  const totalScore = Object.values(answers).reduce<number>(
    (total, value) => total + (value ?? 0),
    0
  );

  const allAnswered = Object.values(answers).every(
    (value) => value !== null
  );

  const correctAnswers: FastEdAnswers = {
    facial: 1,
    arm: 2,
    speech: 2,
    eye: 2,
    neglect: 0,
  };

  const isCorrect =
    allAnswered &&
    Object.entries(correctAnswers).every(
      ([key, value]) =>
        answers[key as keyof FastEdAnswers] === value
    );

  function updateAnswer(
    category: keyof FastEdAnswers,
    value: number
  ) {
    setAnswers((previous) => ({
      ...previous,
      [category]: value,
    }));

    setChecked(false);
  }

  function resetAssessment() {
    setAnswers({
      facial: null,
      arm: null,
      speech: null,
      eye: null,
      neglect: null,
    });

    setChecked(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6">
        <div className="rounded-3xl border border-red-900/50 bg-gradient-to-br from-zinc-950 to-zinc-900 p-7 shadow-2xl sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Interactive EMS Scenario
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Suspected Stroke: FAST-ED
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-zinc-300">
            Assess the patient, calculate the FAST-ED score, and
            determine the appropriate prehospital priorities.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-yellow-700/50 bg-yellow-950/30 p-5 text-yellow-100">
          <strong>Training use only:</strong> Follow the current
          Massachusetts OEMS protocols, regional point-of-entry plan,
          medical control, and local service policy.
        </div>

        <ScenarioSection title="Dispatch and Scene">
          <p className="text-zinc-300">
            Your ALS ambulance is dispatched for a 68-year-old male
            experiencing sudden weakness and difficulty speaking.
          </p>

          <p className="mt-4 text-zinc-300">
            The patient is sitting in a kitchen chair. He is awake but
            appears confused and frustrated.
          </p>

          <blockquote className="mt-5 rounded-xl border-l-4 border-red-600 bg-zinc-800 p-5 italic text-zinc-200">
            “We were eating breakfast when he suddenly dropped his
            coffee cup. When I asked what was wrong, he couldn’t answer
            me.”
          </blockquote>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <InfoBox label="Last Known Well" value="8:10 AM" />
            <InfoBox label="Current Time" value="8:42 AM" />
            <InfoBox label="Symptom Duration" value="32 minutes" />
          </div>
        </ScenarioSection>

        <ScenarioSection title="Initial Assessment">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoBox label="Airway" value="Patent" />
            <InfoBox
              label="Breathing"
              value="Regular and unlabored"
            />
            <InfoBox
              label="Circulation"
              value="Warm, dry skin"
            />
            <InfoBox label="Blood Pressure" value="186/102 mmHg" />
            <InfoBox label="Heart Rate" value="88, irregular" />
            <InfoBox label="Respiratory Rate" value="16/min" />
            <InfoBox label="SpO₂" value="96% on room air" />
            <InfoBox label="Blood Glucose" value="124 mg/dL" />
            <InfoBox label="GCS" value="13" />
          </div>

          <p className="mt-6 text-zinc-300">
            Medical history includes hypertension and atrial
            fibrillation. There is no reported trauma, seizure
            activity, recent surgery, or known anticoagulant use.
          </p>
        </ScenarioSection>

        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                Clinical Assessment
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Calculate the FAST-ED Score
              </h2>
            </div>

            <div className="rounded-2xl bg-red-600 px-6 py-4 text-center">
              <span className="block text-sm font-semibold">
                Current Score
              </span>

              <strong className="block text-4xl">
                {totalScore}
              </strong>

              <small>out of 9</small>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <FastEdSection
              letter="F"
              title="Facial Palsy"
              description="The patient has noticeable drooping of the right side of his face when asked to smile."
              name="facial"
              selectedValue={answers.facial}
              options={[
                {
                  value: 0,
                  label: "Normal or minor paralysis",
                },
                {
                  value: 1,
                  label: "Partial or complete facial paralysis",
                },
              ]}
              onChange={(value) =>
                updateAnswer("facial", value)
              }
            />

            <FastEdSection
              letter="A"
              title="Arm Weakness"
              description="The patient’s right arm immediately falls and cannot be lifted against gravity."
              name="arm"
              selectedValue={answers.arm}
              options={[
                {
                  value: 0,
                  label: "No drift",
                },
                {
                  value: 1,
                  label: "Drift or some effort against gravity",
                },
                {
                  value: 2,
                  label: "Little or no effort against gravity",
                },
              ]}
              onChange={(value) => updateAnswer("arm", value)}
            />

            <FastEdSection
              letter="S"
              title="Speech Changes"
              description="The patient produces only a few incomprehensible words and cannot identify common objects."
              name="speech"
              selectedValue={answers.speech}
              options={[
                {
                  value: 0,
                  label: "Normal speech",
                },
                {
                  value: 1,
                  label: "Mild-to-moderate speech difficulty",
                },
                {
                  value: 2,
                  label:
                    "Severe aphasia, mute, or unable to follow commands",
                },
              ]}
              onChange={(value) =>
                updateAnswer("speech", value)
              }
            />

            <div className="flex gap-4 rounded-2xl border border-blue-900 bg-blue-950/30 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-xl font-black">
                T
              </div>

              <div>
                <h3 className="text-xl font-bold">Time</h3>

                <p className="mt-1 text-zinc-300">
                  Last known well was 8:10 AM. Time does not add
                  points to FAST-ED, but it must be accurately
                  documented.
                </p>
              </div>
            </div>

            <FastEdSection
              letter="E"
              title="Eye Deviation"
              description="The patient’s eyes are persistently deviated toward the left, and he cannot voluntarily look toward the right."
              name="eye"
              selectedValue={answers.eye}
              options={[
                {
                  value: 0,
                  label: "No gaze deviation",
                },
                {
                  value: 1,
                  label: "Partial gaze limitation",
                },
                {
                  value: 2,
                  label: "Forced gaze deviation",
                },
              ]}
              onChange={(value) => updateAnswer("eye", value)}
            />

            <FastEdSection
              letter="D"
              title="Denial or Neglect"
              description="The patient recognizes both sides of his body and reacts appropriately when both arms are touched."
              name="neglect"
              selectedValue={answers.neglect}
              options={[
                {
                  value: 0,
                  label: "No neglect",
                },
                {
                  value: 1,
                  label: "Partial neglect",
                },
                {
                  value: 2,
                  label:
                    "Profound neglect or denial of an affected limb",
                },
              ]}
              onChange={(value) =>
                updateAnswer("neglect", value)
              }
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setChecked(true)}
              className="rounded-xl bg-red-600 px-5 py-3 font-bold transition hover:bg-red-500"
            >
              Check FAST-ED Score
            </button>

            <button
              type="button"
              onClick={resetAssessment}
              className="rounded-xl border border-zinc-600 px-5 py-3 font-bold text-zinc-200 transition hover:bg-zinc-800"
            >
              Reset Assessment
            </button>
          </div>

          {checked && !allAnswered && (
            <div className="mt-6 rounded-2xl border border-yellow-700 bg-yellow-950/30 p-5 text-yellow-100">
              Complete every FAST-ED category before checking your
              answer.
            </div>
          )}

          {checked && allAnswered && isCorrect && (
            <div className="mt-6 rounded-2xl border border-green-700 bg-green-950/30 p-5 text-green-100">
              <h3 className="text-xl font-bold">
                Correct: FAST-ED score 7
              </h3>

              <p className="mt-2">
                Facial palsy 1, arm weakness 2, speech changes 2,
                eye deviation 2, and neglect 0.
              </p>

              <p className="mt-2">
                This score is concerning for severe stroke and a
                possible large-vessel occlusion.
              </p>
            </div>
          )}

          {checked && allAnswered && !isCorrect && (
            <div className="mt-6 rounded-2xl border border-red-700 bg-red-950/30 p-5 text-red-100">
              <h3 className="text-xl font-bold">
                Reassess the findings
              </h3>

              <p className="mt-2">
                The correct FAST-ED score is 7.
              </p>
            </div>
          )}
        </section>

        <ScenarioSection title="Prehospital Priorities">
          <div className="space-y-3">
            {[
              "Maintain airway, breathing, and circulation.",
              "Check blood glucose and consider possible stroke mimics.",
              "Establish and document the exact last-known-well time.",
              "Perform and document the FAST-ED assessment.",
              "Minimize scene time and begin transport promptly.",
              "Keep the patient NPO and protect affected extremities.",
              "Obtain IV access, cardiac monitoring, and a 12-lead ECG when these do not delay transport.",
              "Initiate a stroke alert and provide early receiving-facility notification.",
              "Follow current Massachusetts OEMS and regional destination guidance.",
            ].map((priority, index) => (
              <div
                key={priority}
                className="flex gap-4 rounded-xl bg-zinc-800 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 font-bold">
                  {index + 1}
                </span>

                <p className="text-zinc-200">{priority}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border-l-4 border-red-600 bg-red-950/30 p-5 font-semibold text-red-100">
            Do not attempt to rapidly lower the patient’s blood
            pressure unless directed by an applicable protocol or
            medical control.
          </div>
        </ScenarioSection>

        <ScenarioSection title="Hospital Notification">
          <div className="rounded-2xl bg-zinc-950 p-6 text-zinc-200">
            “Stroke alert. We are transporting a 68-year-old male
            with sudden right facial droop, right arm paralysis,
            severe aphasia, and forced left gaze. Last known well was
            8:10 AM. FAST-ED score is 7. Blood glucose is 124. Blood
            pressure is 186/102. The patient has a history of atrial
            fibrillation. Estimated time of arrival is 12 minutes.”
          </div>
        </ScenarioSection>
      </section>
    </main>
  );
}

function ScenarioSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <h2 className="mb-5 text-3xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4">
      <span className="block text-xs font-bold uppercase tracking-wide text-zinc-400">
        {label}
      </span>

      <strong className="mt-1 block text-lg text-white">
        {value}
      </strong>
    </div>
  );
}

function FastEdSection({
  letter,
  title,
  description,
  name,
  selectedValue,
  options,
  onChange,
}: FastEdSectionProps) {
  return (
    <fieldset className="rounded-2xl border border-zinc-700 bg-zinc-950 p-5">
      <legend className="px-2 text-xl font-bold">
        <span className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white">
          {letter}
        </span>

        {title}
      </legend>

      <p className="mt-3 text-zinc-300">{description}</p>

      <div className="mt-5 space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${
              selectedValue === option.value
                ? "border-red-500 bg-red-950/40"
                : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="mt-1 h-4 w-4 accent-red-600"
            />

            <span>
              <strong>{option.value}</strong> — {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}