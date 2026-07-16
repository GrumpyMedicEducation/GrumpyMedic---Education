"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "../../../components/Navbar";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const questions: Question[] = [
  {
    question:
      "At the EMT level, when is it appropriate to consider placement of a supraglottic airway?",
    options: [
      "Any respiratory distress",
      "Cardiac arrest only",
      "Altered mental status",
      "Trauma patients only",
    ],
    correctAnswer: 1,
    explanation:
      "For the scope covered in this course, EMT supraglottic-airway placement is considered during cardiac arrest when the provider is trained and authorized.",
  },
  {
    question: "Before placing an SGA, what must be true?",
    options: [
      "IV access is established",
      "The patient is breathing spontaneously",
      "Basic airway maneuvers are ineffective",
      "A blood pressure is obtained",
    ],
    correctAnswer: 2,
    explanation:
      "An SGA should be considered when basic airway maneuvers and BVM ventilation are ineffective or inadequate.",
  },
  {
    question:
      "When during resuscitation may EMTs consider SGA placement, if authorized?",
    options: [
      "Immediately upon arrival",
      "After the first compression cycle",
      "After approximately 8 minutes of resuscitation",
      "Only after ROSC",
    ],
    correctAnswer: 2,
    explanation:
      "The training material identifies approximately 8 minutes of resuscitation before EMT SGA placement is considered, when authorized.",
  },
  {
    question:
      "What is the MOST important method to confirm SGA placement?",
    options: [
      "Chest rise",
      "Breath sounds",
      "Pulse oximetry",
      "Waveform capnography",
    ],
    correctAnswer: 3,
    explanation:
      "Continuous waveform capnography is the most important method for confirming and continuously monitoring placement.",
  },
  {
    question:
      "If an SGA is placed but ventilation is ineffective, what should you do?",
    options: [
      "Leave it in place and continue",
      "Increase the oxygen flow",
      "Remove it and resume BVM ventilation",
      "Wait for paramedics",
    ],
    correctAnswer: 2,
    explanation:
      "An ineffective airway should be removed, and the provider should immediately return to BVM ventilation.",
  },
  {
    question: "What is capnography?",
    options: [
      "Measurement of oxygen in the blood",
      "Measurement of exhaled carbon dioxide",
      "Measurement of heart rate",
      "Measurement of blood pressure",
    ],
    correctAnswer: 1,
    explanation:
      "Capnography measures exhaled carbon dioxide and displays both a waveform and numeric ETCO₂ value.",
  },
  {
    question: "What does ETCO₂ stand for?",
    options: [
      "End-tidal carbon monoxide",
      "End-tidal carbon dioxide",
      "Estimated total carbon dioxide",
      "External tidal carbon dioxide",
    ],
    correctAnswer: 1,
    explanation:
      "ETCO₂ stands for end-tidal carbon dioxide.",
  },
  {
    question:
      "What is a typical normal ETCO₂ value in a non-arrest patient?",
    options: [
      "10–20 mmHg",
      "20–30 mmHg",
      "35–45 mmHg",
      "45–60 mmHg",
    ],
    correctAnswer: 2,
    explanation:
      "A typical normal ETCO₂ range is approximately 35–45 mmHg.",
  },
  {
    question:
      "During CPR, an ETCO₂ reading consistently below 10 mmHg may indicate:",
    options: [
      "ROSC",
      "Excellent compressions",
      "Poor perfusion or inadequate compressions",
      "Normal ventilation",
    ],
    correctAnswer: 2,
    explanation:
      "Persistently low ETCO₂ during CPR may indicate poor perfusion, inadequate compressions, or excessive ventilation.",
  },
  {
    question: "A sudden increase in ETCO₂ during CPR may indicate:",
    options: [
      "Airway dislodgement",
      "Equipment failure",
      "Return of spontaneous circulation",
      "Hyperventilation",
    ],
    correctAnswer: 2,
    explanation:
      "A sudden sustained rise in ETCO₂ during CPR may be an early sign of ROSC.",
  },
  {
    question: "What does a normal capnography waveform look like?",
    options: [
      "A flat line",
      "Irregular spikes",
      "A square-shaped waveform with a plateau",
      "A circular pattern",
    ],
    correctAnswer: 2,
    explanation:
      "A normal waveform has a recognizable square-like appearance with a consistent expiratory plateau.",
  },
  {
    question:
      "Capnography use at the BLS level when using an SGA is:",
    options: [
      "Optional",
      "Not allowed",
      "Required",
      "Only for paramedics",
    ],
    correctAnswer: 2,
    explanation:
      "Waveform capnography is required when an EMT uses an SGA under the protocol covered in this course.",
  },
  {
    question:
      "EMTs using capnography are required to document it:",
    options: [
      "Always",
      "Never",
      "Only if abnormal",
      "Only after ROSC",
    ],
    correctAnswer: 0,
    explanation:
      "Capnography use, waveform findings, and ETCO₂ values should be documented.",
  },
  {
    question:
      "When assessing an SGA, which finding suggests proper placement?",
    options: [
      "No chest rise",
      "Unilateral breath sounds",
      "Consistent waveform capnography",
      "ETCO₂ decreasing to zero",
    ],
    correctAnswer: 2,
    explanation:
      "A consistent capnography waveform strongly supports proper airway placement and ventilation.",
  },
  {
    question:
      "What is the priority during cardiac-arrest airway management?",
    options: [
      "Advanced-airway placement",
      "Medication administration",
      "High-quality CPR",
      "Immediate transport",
    ],
    correctAnswer: 2,
    explanation:
      "High-quality CPR remains the top priority. Airway placement must not cause prolonged interruptions.",
  },
  {
    question: "The iGel is best described as:",
    options: [
      "An endotracheal tube",
      "A supraglottic airway device",
      "A nasal airway adjunct",
      "A surgical airway",
    ],
    correctAnswer: 1,
    explanation:
      "The iGel is a supraglottic airway device positioned above the vocal cords.",
  },
  {
    question:
      "What is unique about the iGel compared with many other SGAs?",
    options: [
      "It requires cuff inflation",
      "It has a metal tip",
      "It has a non-inflatable cuff",
      "It requires direct laryngoscopy",
    ],
    correctAnswer: 2,
    explanation:
      "The iGel uses a non-inflatable anatomical cuff.",
  },
  {
    question: "Before inserting an iGel, the provider should confirm:",
    options: [
      "The blood glucose level",
      "The absence of an intact gag reflex",
      "The patient’s blood pressure",
      "The patient’s temperature",
    ],
    correctAnswer: 1,
    explanation:
      "An intact gag reflex is a contraindication to iGel placement.",
  },
  {
    question:
      "Which of the following is a contraindication to iGel placement?",
    options: [
      "Cardiac arrest",
      "No gag reflex",
      "An intact gag reflex",
      "Apnea",
    ],
    correctAnswer: 2,
    explanation:
      "An intact gag reflex increases the risk of vomiting, aspiration, and intolerance of the device.",
  },
  {
    question: "What is the correct iGel insertion technique?",
    options: [
      "Insert and twist it 90 degrees",
      "Insert it blindly downward",
      "Glide it along the hard palate until resistance is felt",
      "Use a laryngoscope",
    ],
    correctAnswer: 2,
    explanation:
      "The lubricated iGel is inserted in the midline and advanced along the hard palate until firm resistance is felt.",
  },
  {
    question: "When inserting the iGel, you should:",
    options: [
      "Force it into position",
      "Stop if significant resistance is met",
      "Inflate the cuff",
      "Rotate it continuously",
    ],
    correctAnswer: 1,
    explanation:
      "Never force the iGel. Stop and reassess device size, position, and technique if it does not advance normally.",
  },
  {
    question: "Where is the capnography adapter placed?",
    options: [
      "Between the oxygen tank and regulator",
      "Between the BVM and iGel",
      "On the patient’s finger",
      "On the patient’s chest",
    ],
    correctAnswer: 1,
    explanation:
      "The capnography adapter is placed in the ventilation circuit between the BVM and airway device.",
  },
  {
    question:
      "What is the correct ventilation rate with an iGel in place during CPR?",
    options: [
      "One breath every 3 seconds",
      "One breath every 6 seconds",
      "One breath every 10 seconds",
      "Two breaths after every 30 compressions",
    ],
    correctAnswer: 1,
    explanation:
      "With an advanced airway in place during adult CPR, ventilate approximately once every 6 seconds while compressions continue.",
  },
  {
    question:
      "What is the top priority during cardiac-arrest airway management?",
    options: [
      "Placing the iGel as quickly as possible",
      "Establishing IV access",
      "High-quality CPR",
      "Immediate transport",
    ],
    correctAnswer: 2,
    explanation:
      "High-quality CPR remains the priority throughout airway management.",
  },
];

const passingPercentage = 80;

export default function BLSAirwayCapnographyQuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [studentName, setStudentName] = useState("");

  const completedCount = Object.keys(answers).length;

  const correctCount = useMemo(() => {
    return questions.reduce((total, question, index) => {
      return answers[index] === question.correctAnswer ? total + 1 : total;
    }, 0);
  }, [answers]);

  const percentage = Math.round((correctCount / questions.length) * 100);
  const passed = percentage >= passingPercentage;

  function selectAnswer(questionIndex: number, answerIndex: number) {
    if (submitted) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [questionIndex]: answerIndex,
    }));
  }

  function submitQuiz() {
    if (completedCount !== questions.length) {
      return;
    }

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function retakeQuiz() {
    setAnswers({});
    setSubmitted(false);
    setStudentName("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const certificateHref =
    `/courses/bls-airway-capnography/certificate?name=${encodeURIComponent(
      studentName.trim()
    )}&score=${percentage}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            BLS Airway & Capnography Quiz
          </h1>

          <p className="mt-4 text-lg leading-8 text-zinc-300">
            Complete all {questions.length} questions. A score of{" "}
            {passingPercentage}% or greater is required to pass.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard label="Questions" value={String(questions.length)} />
            <StatCard label="Passing Score" value={`${passingPercentage}%`} />
            <StatCard
              label="Completed"
              value={`${completedCount}/${questions.length}`}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        {submitted && (
          <section
            className={`mb-10 rounded-2xl border p-8 text-center ${
              passed
                ? "border-green-500 bg-green-950/20"
                : "border-red-600 bg-red-950/20"
            }`}
          >
            <p
              className={`text-sm font-bold uppercase tracking-[0.2em] ${
                passed ? "text-green-400" : "text-red-400"
              }`}
            >
              {passed ? "Quiz Passed" : "Quiz Not Passed"}
            </p>

            <p className="mt-3 text-5xl font-extrabold">
              {percentage}%
            </p>

            <p className="mt-4 text-lg text-zinc-200">
              You answered {correctCount} of {questions.length} questions
              correctly.
            </p>

            {passed ? (
              <div className="mx-auto mt-8 max-w-xl text-left">
                <label
                  htmlFor="studentName"
                  className="block text-sm font-bold uppercase tracking-wide text-zinc-300"
                >
                  Name for Certificate
                </label>

                <input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(event) => setStudentName(event.target.value)}
                  placeholder="Enter your full name"
                  className="mt-3 w-full rounded-xl border border-zinc-600 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
                />

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  {studentName.trim() ? (
                    <Link
                      href={certificateHref}
                      className="rounded-xl bg-green-600 px-6 py-4 text-center font-bold text-white transition hover:bg-green-500"
                    >
                      View Certificate
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="cursor-not-allowed rounded-xl bg-zinc-700 px-6 py-4 font-bold text-zinc-400"
                    >
                      View Certificate
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={retakeQuiz}
                    className="rounded-xl border border-zinc-600 px-6 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-7">
                <p className="text-zinc-300">
                  Review the missed questions and try again.
                </p>

                <button
                  type="button"
                  onClick={retakeQuiz}
                  className="mt-5 rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </section>
        )}

        <div className="space-y-6">
          {questions.map((question, questionIndex) => {
            const selectedAnswer = answers[questionIndex];
            const selectedCorrectly =
              selectedAnswer === question.correctAnswer;

            return (
              <article
                key={question.question}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 font-bold">
                    {questionIndex + 1}
                  </span>

                  <div className="flex-1">
                    <h2 className="text-xl font-bold leading-8">
                      {question.question}
                    </h2>

                    <div className="mt-5 space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const selected = selectedAnswer === optionIndex;
                        const correct =
                          submitted &&
                          optionIndex === question.correctAnswer;
                        const incorrect =
                          submitted &&
                          selected &&
                          optionIndex !== question.correctAnswer;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              selectAnswer(questionIndex, optionIndex)
                            }
                            disabled={submitted}
                            className={`flex w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition ${
                              correct
                                ? "border-green-500 bg-green-950/30 text-green-100"
                                : incorrect
                                  ? "border-red-500 bg-red-950/30 text-red-100"
                                  : selected
                                    ? "border-red-500 bg-red-950/20 text-white"
                                    : "border-zinc-700 bg-black text-zinc-300 hover:border-red-500"
                            }`}
                          >
                            <span
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                                selected
                                  ? "border-red-500 bg-red-600 text-white"
                                  : "border-zinc-600 text-zinc-400"
                              }`}
                            >
                              {String.fromCharCode(65 + optionIndex)}
                            </span>

                            <span className="pt-0.5 leading-6">
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {submitted && (
                      <div
                        className={`mt-5 rounded-xl border p-4 ${
                          selectedCorrectly
                            ? "border-green-700 bg-green-950/20"
                            : "border-red-700 bg-red-950/20"
                        }`}
                      >
                        <p
                          className={`font-bold ${
                            selectedCorrectly
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {selectedCorrectly ? "Correct" : "Incorrect"}
                        </p>

                        <p className="mt-2 leading-7 text-zinc-300">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {!submitted && (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
            {completedCount < questions.length && (
              <p className="mb-5 text-center text-zinc-400">
                Answer all {questions.length} questions before submitting.
              </p>
            )}

            <button
              type="button"
              onClick={submitQuiz}
              disabled={completedCount !== questions.length}
              className={`w-full rounded-xl px-7 py-4 font-bold transition ${
                completedCount === questions.length
                  ? "bg-red-600 text-white hover:bg-red-500"
                  : "cursor-not-allowed bg-zinc-800 text-zinc-500"
              }`}
            >
              Submit Quiz
            </button>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/courses/bls-airway-capnography"
            className="rounded-xl border border-zinc-600 px-6 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
          >
            Back to Course
          </Link>

          <Link
            href="/courses"
            className="rounded-xl border border-zinc-600 px-6 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
          >
            All Courses
          </Link>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-extrabold text-red-500">
        {value}
      </p>
    </div>
  );
}