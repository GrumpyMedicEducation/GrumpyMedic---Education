"use client";

import CourseEngagementTracker from "../CourseEngagementTracker";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import CourseAccessGate from "../../components/CourseAccessGate";
import CourseAttestationForm from "../../components/courses/CourseAttestationForm";
import { supabase } from "../../../lib/supabase/client";

type Option = {
  text: string;
  correct: boolean;
  feedback: string;
};

type ScenarioStep = {
  title: string;
  situation: string;
  findings: string[];
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
          "The patient has severe respiratory distress. Immediate airway, breathing, and oxygenation support takes priority.",
      },
      {
        text: "Position the patient upright and begin airway and breathing support",
        correct: true,
        feedback:
          "Correct. Upright positioning and immediate respiratory support are appropriate.",
      },
      {
        text: "Place the patient supine for a complete examination",
        correct: false,
        feedback:
          "Supine positioning may worsen respiratory distress in pulmonary edema.",
      },
      {
        text: "Have the patient walk to the ambulance",
        correct: false,
        feedback:
          "Exertion may worsen hypoxia and respiratory distress.",
      },
    ],
  },
  {
    title: "Recognition",
    situation:
      "You continue your respiratory assessment while providing oxygen and preparing additional treatment.",
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
          "Correct. Severe dyspnea, diffuse crackles, hypoxia, hypertension, and frothy sputum are strongly suggestive of pulmonary edema.",
      },
      {
        text: "Simple anxiety attack",
        correct: false,
        feedback:
          "Anxiety does not explain diffuse crackles, severe hypoxia, and frothy sputum.",
      },
      {
        text: "Isolated upper-airway obstruction",
        correct: false,
        feedback:
          "Upper-airway obstruction would not usually produce diffuse bilateral crackles.",
      },
      {
        text: "Uncomplicated hyperventilation",
        correct: false,
        feedback:
          "The lung findings and hypoxia indicate a serious cardiopulmonary emergency.",
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
      "The patient can maintain their airway",
      "No vomiting or facial trauma is present",
    ],
    question: "What treatment should be considered next?",
    options: [
      {
        text: "Apply CPAP according to protocol",
        correct: true,
        feedback:
          "Correct. This patient appears to be an appropriate candidate for early CPAP.",
      },
      {
        text: "Wait until the patient becomes unresponsive",
        correct: false,
        feedback:
          "CPAP should be considered before respiratory failure occurs.",
      },
      {
        text: "Give the patient water and reassess later",
        correct: false,
        feedback:
          "The patient requires immediate respiratory support and transport.",
      },
      {
        text: "Place the patient flat and use only a nasal cannula",
        correct: false,
        feedback:
          "Flat positioning may worsen breathing, and low-flow oxygen alone may be inadequate.",
      },
    ],
  },
  {
    title: "Medication Considerations",
    situation:
      "The patient tolerates CPAP. Oxygen saturation improves, but the patient remains hypertensive and dyspneic.",
    findings: [
      "SpO₂: 92% on CPAP",
      "Blood pressure: 186/104 mmHg",
      "No reported medication allergy",
      "The patient denies recent erectile-dysfunction medication use",
      "Local protocol permits nitroglycerin for this presentation",
    ],
    question: "Which medication should be considered according to protocol?",
    options: [
      {
        text: "Nitroglycerin",
        correct: true,
        feedback:
          "Correct. Nitroglycerin may be appropriate after contraindications are evaluated and local protocol is followed.",
      },
      {
        text: "Oral glucose",
        correct: false,
        feedback:
          "There is no evidence of hypoglycemia in this scenario.",
      },
      {
        text: "Epinephrine for anaphylaxis",
        correct: false,
        feedback:
          "The presentation is not consistent with anaphylaxis.",
      },
      {
        text: "Withhold all treatment until hospital arrival",
        correct: false,
        feedback:
          "Appropriate prehospital care may reduce respiratory distress and prevent deterioration.",
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
      "Crackles remain present, but respiratory effort has improved",
    ],
    question: "What is the best next action?",
    options: [
      {
        text: "Discontinue treatment because the patient improved",
        correct: false,
        feedback:
          "Improvement does not mean the emergency has resolved.",
      },
      {
        text: "Continue treatment, reassess frequently, and transport",
        correct: true,
        feedback:
          "Correct. Continue effective treatment, monitor for deterioration, and transport.",
      },
      {
        text: "Allow the patient to refuse because oxygen saturation improved",
        correct: false,
        feedback:
          "Pulmonary edema can recur or worsen rapidly despite temporary improvement.",
      },
      {
        text: "Remove CPAP and have the patient walk",
        correct: false,
        feedback:
          "Unnecessary exertion and early removal of treatment may cause deterioration.",
      },
    ],
  },
];

export default function AcutePulmonaryEdemaPage() {
  const [engagementLoaded, setEngagementLoaded] =
    useState(false);
  const [timeRequirementMet, setTimeRequirementMet] =
    useState(false);
  const [officialActiveSeconds, setOfficialActiveSeconds] =
    useState(0);
  const [officialRequiredSeconds, setOfficialRequiredSeconds] =
    useState(45 * 60);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] =
    useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [complete, setComplete] = useState(false);

  const [secureAssessmentLoaded, setSecureAssessmentLoaded] =
    useState(false);
  const [secureAssessmentPassed, setSecureAssessmentPassed] =
    useState(false);

  const step = scenarioSteps[currentStep];

  const handleEligibilityChange = useCallback(
    (result: {
      activeSeconds: number;
      requiredSeconds: number;
      timeRequirementMet: boolean;
    }) => {
      setOfficialActiveSeconds(result.activeSeconds);
      setOfficialRequiredSeconds(result.requiredSeconds);
      setTimeRequirementMet(result.timeRequirementMet);
      setEngagementLoaded(true);
    },
    [],
  );

  useEffect(() => {
    if (!complete) {
      return;
    }

    let active = true;

    async function loadSecureAssessmentStatus() {
      setSecureAssessmentLoaded(false);
      setSecureAssessmentPassed(false);

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          return;
        }

        const {
          data: enrollmentId,
          error: enrollmentError,
        } = await supabase.rpc("enroll_in_course", {
          requested_course_slug: "acute-pulmonary-edema",
        });

        if (
          enrollmentError ||
          !enrollmentId ||
          typeof enrollmentId !== "string"
        ) {
          return;
        }

        const {
          data: latestAttempts,
          error: latestAttemptError,
        } = await supabase.rpc("get_latest_exam_attempt", {
          requested_enrollment_id: enrollmentId,
        });

        if (latestAttemptError) {
          return;
        }

        const latestAttempt = latestAttempts?.[0];

        if (active) {
          setSecureAssessmentPassed(
            Boolean(
              latestAttempt?.passed &&
                latestAttempt?.submitted_at,
            ),
          );
        }
      } finally {
        if (active) {
          setSecureAssessmentLoaded(true);
        }
      }
    }

    void loadSecureAssessmentStatus();

    return () => {
      active = false;
    };
  }, [complete]);

  function chooseOption(optionIndex: number) {
    if (answered) {
      return;
    }

    setSelectedOption(optionIndex);
    setAnswered(true);

    if (step.options[optionIndex].correct) {
      setCorrectAnswers((previous) => previous + 1);
    }
  }

  function continueScenario() {
    if (!answered) {
      return;
    }

    if (currentStep === scenarioSteps.length - 1) {
      setComplete(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    setCurrentStep((previous) => previous + 1);
    setSelectedOption(null);
    setAnswered(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function restartScenario() {
    setCurrentStep(0);
    setSelectedOption(null);
    setAnswered(false);
    setCorrectAnswers(0);
    setComplete(false);
    setSecureAssessmentLoaded(false);
    setSecureAssessmentPassed(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (complete) {
    const percentage = Math.round(
      (correctAnswers / scenarioSteps.length) * 100,
    );

    const passed = percentage >= 80;

    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <CourseEngagementTracker
          courseSlug="acute-pulmonary-edema"
          courseTitle="Acute Pulmonary Edema"
          requiredMinutes={30}
          onEligibilityChange={handleEligibilityChange}
        />

        <section className="mx-auto max-w-5xl px-6 py-12">
          <CourseAccessGate
            accessLevel="login"
            title="Sign In to View Course Results"
            description="Log in to review your Acute Pulmonary Edema course results and access any available certificate."
          >
            <div
              className={`rounded-3xl border-2 bg-zinc-900 p-8 text-center shadow-2xl md:p-12 ${
                passed
                  ? "border-emerald-500"
                  : "border-amber-500"
              }`}
            >
              <p
                className={`text-sm font-extrabold uppercase tracking-[0.25em] ${
                  passed
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {passed
                  ? "Scenario Passed"
                  : "Additional Review Required"}
              </p>

              <div
                className={`mx-auto mt-5 inline-flex rounded-full border px-5 py-2 text-sm font-extrabold uppercase tracking-wide ${
                  passed
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                    : "border-amber-500 bg-amber-500/10 text-amber-300"
                }`}
              >
                {passed
                  ? "✓ Scenario Complete"
                  : "Retake Required"}
              </div>

              <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">
                Acute Pulmonary Edema
              </h1>

              <p className="mt-6 text-6xl font-extrabold text-red-500">
                {percentage}%
              </p>

              <p className="mt-3 text-xl font-semibold text-zinc-300">
                Correct decisions: {correctAnswers} /{" "}
                {scenarioSteps.length}
              </p>

              <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-black p-6 text-left">
                <h2 className="text-2xl font-extrabold">
                  GrumpyMedic Debrief
                </h2>

                <p className="mt-4 leading-7 text-zinc-300">
                  You assessed respiratory distress,
                  recognized acute pulmonary edema,
                  prioritized airway and breathing,
                  considered early CPAP, evaluated
                  nitroglycerin according to protocol,
                  reassessed the patient, and continued
                  appropriate transport.
                </p>
              </div>

              <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-zinc-700 bg-black p-6">
                <h2 className="text-left text-xl font-extrabold">
                  Course Progress
                </h2>

                <div className="mt-5 grid gap-4 text-left sm:grid-cols-3">
                  <ProgressItem
                    title="Course Content"
                    status="Complete"
                    complete
                  />

                  <ProgressItem
                    title="Scenario"
                    status="Complete"
                    complete
                  />

                  <ProgressItem
                    title="Secure Assessment"
                    status={
                      !passed
                        ? "Scenario Pass Required"
                        : !secureAssessmentLoaded
                          ? "Checking"
                          : secureAssessmentPassed
                            ? "Passed"
                            : "Required"
                    }
                    complete={passed && secureAssessmentPassed}
                  />
                </div>
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
                  href="/courses/glucagon-hypoglycemia"
                  className="rounded-xl border border-red-500 px-6 py-3 font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  Next Course →
                </Link>
              </div>

              {passed && (
                <div className="mx-auto mt-8 max-w-3xl text-left">
                  {!secureAssessmentLoaded ? (
                    <div className="rounded-2xl border border-zinc-700 bg-black p-6 text-center">
                      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-zinc-400">
                        Checking Secure Assessment
                      </p>

                      <p className="mt-3 leading-7 text-zinc-300">
                        Verifying your official assessment result.
                      </p>
                    </div>
                  ) : !secureAssessmentPassed ? (
                    <div className="rounded-2xl border border-amber-700 bg-amber-950/20 p-6 text-center">
                      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-amber-400">
                        Secure Assessment Required
                      </p>

                      <h2 className="mt-3 text-2xl font-extrabold">
                        Complete the Official Course Assessment
                      </h2>

                      <p className="mt-3 leading-7 text-zinc-300">
                        Your scenario is complete, but the secure
                        assessment must be passed before the electronic
                        attestation and certificate can be completed.
                      </p>

                      <Link
                        href="/courses/acute-pulmonary-edema/quiz"
                        className="mt-6 inline-block rounded-xl bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-500"
                      >
                        Go to Secure Assessment
                      </Link>
                    </div>
                  ) : (
                    <CourseAttestationForm
                      courseSlug="acute-pulmonary-edema"
                      courseTitle="Acute Pulmonary Edema"
                      certificateHref="/courses/acute-pulmonary-edema/certificate"
                    />
                  )}
                </div>
              )}
            </div>
          </CourseAccessGate>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

        <CourseEngagementTracker
          courseSlug="acute-pulmonary-edema"
          courseTitle="Acute Pulmonary Edema"
          requiredMinutes={45}
          onEligibilityChange={handleEligibilityChange}
        />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href="/courses"
          className="font-semibold text-red-500 transition hover:text-red-400"
        >
          ← Back to Courses
        </Link>

        <div className="mt-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">
            Interactive EMS Course
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Acute Pulmonary Edema
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
            Complete five clinical decisions covering
            recognition, respiratory support, CPAP,
            medication considerations, reassessment, and
            transport.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Format
              </p>

              <p className="mt-2 font-bold text-white">
                Interactive Scenario
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Decisions
              </p>

              <p className="mt-2 font-bold text-white">
                Five Clinical Steps
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Passing Score
              </p>

              <p className="mt-2 font-bold text-white">
                80%
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Course Preview
          </p>

          <h2 className="mt-3 text-2xl font-extrabold">
            What You Will Practice
          </h2>

          <p className="mt-4 leading-7 text-zinc-300">
            This scenario focuses on recognizing severe
            acute pulmonary edema, supporting oxygenation
            and ventilation, considering CPAP and
            protocol-directed medication, monitoring the
            patient&apos;s response, and continuing
            appropriate transport.
          </p>

          <p className="mt-4 text-sm leading-6 text-zinc-500">
            The course overview remains public. A free
            GrumpyMedic Education account is required to
            begin the interactive scenario.
          </p>
        </div>

        <div className="mt-8">
          <CourseAccessGate
            accessLevel="login"
            title="Sign In to Begin the Course"
            description="Create a free GrumpyMedic Education account or log in to complete the interactive Acute Pulmonary Edema scenario, access your results, and qualify for a certificate."
          >
            {!engagementLoaded ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
                <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-500">
                  Checking Course Progress
                </p>

                <h2 className="mt-3 text-2xl font-extrabold text-white">
                  Loading Your Official Course Time
                </h2>

                <p className="mt-3 text-zinc-400">
                  Your engagement record is being retrieved from your
                  GrumpyMedic Education account.
                </p>
              </div>
            ) : !timeRequirementMet ? (
              <div className="rounded-3xl border border-amber-700 bg-amber-950/20 p-8 text-center">
                <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-amber-400">
                  Assessment Locked
                </p>

                <h2 className="mt-3 text-3xl font-extrabold text-white">
                  Complete the Required Course Time
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-300">
                  Continue reviewing the course content on this page.
                  The assessment will unlock automatically after your
                  official credited engagement time reaches the required
                  duration.
                </p>

                <div className="mx-auto mt-7 max-w-md rounded-2xl border border-zinc-700 bg-black p-6">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-zinc-400">
                      Official credited time
                    </span>

                    <span className="font-bold text-white">
                      {Math.floor(officialActiveSeconds / 60)}:
                      {(officialActiveSeconds % 60)
                        .toString()
                        .padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                    <span className="text-zinc-400">
                      Required time
                    </span>

                    <span className="font-bold text-white">
                      {Math.floor(officialRequiredSeconds / 60)}:
                      {(officialRequiredSeconds % 60)
                        .toString()
                        .padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                    <span className="text-zinc-400">
                      Remaining time
                    </span>

                    <span className="font-bold text-amber-300">
                      {Math.floor(
                        Math.max(
                          0,
                          officialRequiredSeconds -
                            officialActiveSeconds,
                        ) / 60,
                      )}
                      :
                      {(
                        Math.max(
                          0,
                          officialRequiredSeconds -
                            officialActiveSeconds,
                        ) % 60
                      )
                        .toString()
                        .padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-6 text-zinc-500">
                  The timer pauses when this browser tab is hidden or
                  after three minutes without activity.
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-2xl border border-emerald-700 bg-emerald-950/20 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-400">
                        Required Time Completed
                      </p>

                      <p className="mt-2 text-zinc-300">
                        Your official engagement requirement is complete.
                        The assessment is now available.
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-bold text-emerald-300">
                      Assessment Unlocked
                    </span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-zinc-300">
                  Decision {currentStep + 1} of{" "}
                  {scenarioSteps.length}
                </span>

                <span className="font-bold text-red-400">
                  {Math.round(
                    ((currentStep + (answered ? 1 : 0)) /
                      scenarioSteps.length) *
                      100,
                  )}
                  %
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full bg-red-600 transition-all"
                  style={{
                    width: `${
                      ((currentStep +
                        (answered ? 1 : 0)) /
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

              <p className="mt-4 leading-7 text-zinc-300">
                {step.situation}
              </p>

              <div className="mt-6 rounded-2xl bg-black p-5">
                <h3 className="font-extrabold text-zinc-100">
                  Assessment Findings
                </h3>

                <ul className="mt-3 space-y-2 text-zinc-300">
                  {step.findings.map((finding) => (
                    <li key={finding}>• {finding}</li>
                  ))}
                </ul>
              </div>

              <h3 className="mt-8 text-xl font-extrabold">
                {step.question}
              </h3>

              <div className="mt-5 space-y-3">
                {step.options.map(
                  (option, optionIndex) => {
                    const selected =
                      selectedOption === optionIndex;

                    const showCorrect =
                      answered && option.correct;

                    const showIncorrect =
                      answered &&
                      selected &&
                      !option.correct;

                    return (
                      <button
                        key={option.text}
                        type="button"
                        disabled={answered}
                        onClick={() =>
                          chooseOption(optionIndex)
                        }
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
                          {String.fromCharCode(
                            65 + optionIndex,
                          )}
                        </span>

                        <span className="pt-1 text-zinc-200">
                          {option.text}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>

              {answered &&
                selectedOption !== null && (
                  <div
                    className={`mt-6 rounded-2xl border p-5 ${
                      step.options[selectedOption].correct
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-amber-500 bg-amber-500/10"
                    }`}
                  >
                    <h3 className="font-extrabold">
                      {step.options[selectedOption].correct
                        ? "Correct Decision"
                        : "Review This Decision"}
                    </h3>

                    <p className="mt-2 leading-7 text-zinc-300">
                      {
                        step.options[selectedOption]
                          .feedback
                      }
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
                  {currentStep ===
                  scenarioSteps.length - 1
                    ? "Complete Course"
                    : "Continue →"}
                </button>
              </div>
            </article>

                <p className="mt-8 text-center text-sm leading-6 text-zinc-500">
                  Educational content only. Follow current
                  state and local protocols, medical-director
                  guidance, service policy, and manufacturer
                  instructions.
                </p>
              </>
            )}
          </CourseAccessGate>
        </div>
      </section>
    </main>
  );
}

function ProgressItem({
  title,
  status,
  complete,
}: {
  title: string;
  status: string;
  complete: boolean;
}) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
      <p className="font-bold text-white">{title}</p>

      <p
        className={`mt-2 text-sm font-semibold ${
          complete
            ? "text-emerald-400"
            : "text-zinc-500"
        }`}
      >
        {complete ? "✓ " : "○ "}
        {status}
      </p>
    </div>
  );
}