import type { CourseDefinition } from "./types";

export const courseCatalog: CourseDefinition[] = [
  {
    slug: "glucagon-hypoglycemia",
    title: "Glucagon for Hypoglycemia",
    subtitle: "EMT Management of the Hypoglycemic Patient",
    description:
      "Recognition and treatment of hypoglycemia, glucagon indications, administration, reassessment, and transport considerations.",
    category: "EMS Medications",
    providerFocus: "EMT",
    instructor: "Lt. William Howard, NRP",
    passingScore: 80,
    ceHours: 1,
    certificateEnabled: true,

    sections: [
      {
        id: "hypoglycemia-overview",
        title: "What Is Hypoglycemia?",
        paragraphs: [
          "Hypoglycemia occurs when blood glucose falls low enough to impair normal brain function.",
        ],
        bulletPoints: [
          "Too much insulin",
          "Missed meals",
          "Excess exercise",
          "Alcohol use",
          "Oral diabetic medications",
        ],
      },
      {
        id: "signs-symptoms",
        title: "Signs and Symptoms",
        bulletPoints: [
          "Diaphoresis",
          "Tremors",
          "Hunger",
          "Tachycardia",
          "Anxiety",
          "Confusion",
          "Combativeness",
          "Seizures",
          "Unconsciousness",
          "Coma",
        ],
      },
      {
        id: "glucagon",
        title: "Glucagon",
        paragraphs: [
          "Glucagon stimulates the liver to convert stored glycogen into glucose, increasing blood sugar.",
        ],
        bulletPoints: [
          "Suspected hypoglycemia",
          "Unable to swallow safely",
          "Altered mental status",
          "Monitor and protect the airway",
          "Reassess mental status and blood glucose",
        ],
      },
      {
        id: "administration",
        title: "Administration",
        bulletPoints: [
          "Confirm the indication",
          "Check blood glucose if available",
          "Verify the medication and expiration date",
          "Reconstitute glucagon",
          "Administer according to local protocol",
          "Monitor and protect the airway",
          "Reassess mental status",
          "Repeat the blood-glucose check",
        ],
      },
      {
        id: "key-points",
        title: "Key Points",
        bulletPoints: [
          "Always protect the airway",
          "Never force oral glucose into an unconscious patient",
          "Reassess frequently",
          "Transport remains appropriate after treatment",
          "Follow current state and local EMS protocols",
        ],
      },
    ],

    questions: [
      {
        id: "glucagon-question-1",
        question:
          "Which condition must be present before administering glucagon?",
        options: [
          "Blood glucose below 100 mg/dL",
          "Altered mental status with suspected hypoglycemia",
          "Any diabetic patient requesting glucagon",
          "Blood glucose below 80 mg/dL with normal mental status",
        ],
        correctAnswer: 1,
        explanation:
          "Glucagon is appropriate when hypoglycemia is suspected or confirmed, the patient has altered mental status, and the patient cannot safely swallow oral glucose.",
      },
      {
        id: "glucagon-question-2",
        question: "What is the adult dose of glucagon?",
        options: [
          "0.5 mg IM only",
          "1 mg IM or IN",
          "2 mg IM only",
          "1 mg IV only",
        ],
        correctAnswer: 1,
        explanation:
          "The adult dose presented in this course is 1 mg administered intramuscularly or intranasally.",
      },
      {
        id: "glucagon-question-3",
        question:
          "When should blood glucose be rechecked after glucagon administration?",
        options: [
          "5 minutes",
          "10 minutes",
          "15 minutes",
          "30 minutes",
        ],
        correctAnswer: 2,
        explanation:
          "Blood glucose and mental status should be reassessed after 15 minutes.",
      },
      {
        id: "glucagon-question-4",
        question:
          "A pediatric patient weighs 18 kg. What is the correct glucagon dose?",
        options: [
          "0.25 mg IM or IN",
          "0.5 mg IM or IN",
          "1 mg IM or IN",
          "2 mg IM or IN",
        ],
        correctAnswer: 1,
        explanation:
          "A pediatric patient weighing less than 20 kg receives 0.5 mg IM or IN.",
      },
      {
        id: "glucagon-question-5",
        question:
          "A pediatric patient weighs 25 kg. What is the correct glucagon dose?",
        options: [
          "0.5 mg IM or IN",
          "0.75 mg IM only",
          "1 mg IM or IN",
          "2 mg IM or IN",
        ],
        correctAnswer: 2,
        explanation:
          "A pediatric patient weighing 20 kg or greater receives 1 mg IM or IN.",
      },
      {
        id: "glucagon-question-6",
        question:
          "Which routes are approved for glucagon administration in this course?",
        options: [
          "IV only",
          "IM only",
          "IN only",
          "IM or IN",
        ],
        correctAnswer: 3,
        explanation:
          "The routes presented in this course are intramuscular and intranasal.",
      },
      {
        id: "glucagon-question-7",
        question:
          "You arrive to find a 54-year-old diabetic patient unconscious. What is the next appropriate step?",
        details: [
          "Blood glucose: 42 mg/dL",
          "The patient cannot swallow.",
        ],
        options: [
          "Give oral glucose",
          "Administer 1 mg glucagon IM or IN",
          "Wait for ALS without providing treatment",
          "Start IV dextrose as an EMT-Basic",
        ],
        correctAnswer: 1,
        explanation:
          "The patient is hypoglycemic, has altered mental status, and cannot swallow. Administer glucagon while protecting the airway and preparing for transport.",
      },
      {
        id: "glucagon-question-8",
        question:
          "After glucagon administration, the patient becomes alert and can swallow safely. What is the appropriate next step?",
        options: [
          "Withhold all food and drink",
          "Provide oral glucose or carbohydrates",
          "Repeat glucagon immediately",
          "Cancel transport",
        ],
        correctAnswer: 1,
        explanation:
          "Once the patient can swallow safely, provide oral glucose or carbohydrates and continue monitoring and transport.",
      },
      {
        id: "glucagon-question-9",
        question:
          "What blood glucose level defines hypoglycemia in this course?",
        options: [
          "Below 60 mg/dL",
          "Below 70 mg/dL",
          "Below 80 mg/dL",
          "Below 100 mg/dL",
        ],
        correctAnswer: 1,
        explanation:
          "Hypoglycemia is defined in this course as a blood glucose level below 70 mg/dL.",
      },
      {
        id: "glucagon-question-10",
        question:
          "Which complication should EMTs commonly anticipate after glucagon administration?",
        options: [
          "Respiratory depression",
          "Vomiting",
          "Severe bradycardia",
          "Profound hypothermia",
        ],
        correctAnswer: 1,
        explanation:
          "Nausea and vomiting are common. Position the patient appropriately, prepare suction, and continue airway monitoring.",
      },
    ],
  },
];

export function getCourseBySlug(
  slug: string,
): CourseDefinition | undefined {
  return courseCatalog.find(
    (course) => course.slug === slug,
  );
}