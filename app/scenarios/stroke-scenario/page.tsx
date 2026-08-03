"use client";

import { useState } from "react";

type FastEdAnswers = {
  facial: number | null;
  arm: number | null;
  speech: number | null;
  eye: number | null;
  neglect: number | null;
};

export default function StrokeScenarioPage() {
  const [answers, setAnswers] = useState<FastEdAnswers>({
    facial: null,
    arm: null,
    speech: null,
    eye: null,
    neglect: null,
  });

  const totalScore = Object.values(answers).reduce<number>(
    (total, value) => total + (value ?? 0),
    0
  );

  function updateAnswer(
    category: keyof FastEdAnswers,
    value: number
  ) {
    setAnswers((previous) => ({
      ...previous,
      [category]: value,
    }));
  }

  function resetAssessment() {
    setAnswers({
      facial: null,
      arm: null,
      speech: null,
      eye: null,
      neglect: null,
    });
  }

  return (
    <main className="stroke-scenario">
      <section className="scenario-header">
        <span className="scenario-label">
          Interactive EMS Scenario
        </span>

        <h1>Suspected Stroke: FAST-ED Assessment</h1>

        <p>
          Assess the patient, calculate the FAST-ED score, and determine
          the appropriate prehospital priorities.
        </p>
      </section>

      <section className="scenario-card">
        <h2>FAST-ED Assessment</h2>

        <div className="score-display">
          <span>Current Score</span>
          <strong>{totalScore}</strong>
          <small>out of 9</small>
        </div>

        <FastEdSection
          letter="F"
          title="Facial Palsy"
          description="The patient has noticeable drooping of the right side of his face."
          name="facial"
          selectedValue={answers.facial}
          options={[
            { value: 0, label: "Normal or minor paralysis" },
            { value: 1, label: "Partial or complete facial paralysis" },
          ]}
          onChange={(value) => updateAnswer("facial", value)}
        />

        <FastEdSection
          letter="A"
          title="Arm Weakness"
          description="The patient’s right arm immediately falls and cannot be lifted against gravity."
          name="arm"
          selectedValue={answers.arm}
          options={[
            { value: 0, label: "No drift" },
            { value: 1, label: "Drift or some effort against gravity" },
            { value: 2, label: "Little or no effort against gravity" },
          ]}
          onChange={(value) => updateAnswer("arm", value)}
        />

        <FastEdSection
          letter="S"
          title="Speech Changes"
          description="The patient produces only a few incomprehensible words."
          name="speech"
          selectedValue={answers.speech}
          options={[
            { value: 0, label: "Normal speech" },
            { value: 1, label: "Mild-to-moderate speech difficulty" },
            {
              value: 2,
              label: "Severe aphasia, mute, or unable to follow commands",
            },
          ]}
          onChange={(value) => updateAnswer("speech", value)}
        />

        <div className="time-reminder">
          <span className="scale-letter">T</span>

          <div>
            <strong>Time</strong>
            <p>
              Last known well was 8:10 AM. Time does not add points to
              the FAST-ED score.
            </p>
          </div>
        </div>

        <FastEdSection
          letter="E"
          title="Eye Deviation"
          description="The patient has forced gaze deviation toward the left."
          name="eye"
          selectedValue={answers.eye}
          options={[
            { value: 0, label: "No gaze deviation" },
            { value: 1, label: "Partial gaze limitation" },
            { value: 2, label: "Forced gaze deviation" },
          ]}
          onChange={(value) => updateAnswer("eye", value)}
        />

        <FastEdSection
          letter="D"
          title="Denial or Neglect"
          description="The patient recognizes both sides of his body."
          name="neglect"
          selectedValue={answers.neglect}
          options={[
            { value: 0, label: "No neglect" },
            { value: 1, label: "Partial neglect" },
            {
              value: 2,
              label: "Profound neglect or denial of an affected limb",
            },
          ]}
          onChange={(value) => updateAnswer("neglect", value)}
        />

        <button type="button" onClick={resetAssessment}>
          Reset Assessment
        </button>

        {totalScore === 7 && (
          <div className="result-box">
            <strong>Correct: FAST-ED score 7</strong>
            <p>
              This score is concerning for a severe stroke and possible
              large-vessel occlusion.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

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
    <fieldset className="fast-ed-item">
      <legend>
        <span className="scale-letter">{letter}</span>
        {title}
      </legend>

      <p>{description}</p>

      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />

          <span>
            {option.value} — {option.label}
          </span>
        </label>
      ))}
    </fieldset>
  );
}