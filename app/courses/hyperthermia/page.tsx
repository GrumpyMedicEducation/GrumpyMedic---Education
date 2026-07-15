import Link from "next/link";
import Navbar from "../../components/Navbar";

const learningObjectives = [
  "Recognize the major types of heat-related illness.",
  "Differentiate heat cramps, heat exhaustion, and heat stroke.",
  "Identify altered mental status as a critical heat-stroke finding.",
  "Apply rapid cooling strategies for severe hyperthermia.",
  "Review adult and pediatric treatment considerations.",
  "Make appropriate transport and destination decisions.",
];

const heatIllnessTypes = [
  {
    title: "Heat Cramps",
    level: "Mild Heat Illness",
    description:
      "Painful muscle cramping associated with heat exposure, exertion, sweating, and electrolyte loss.",
    findings: [
      "Painful muscle spasms",
      "Heavy sweating",
      "Normal or mildly elevated temperature",
      "Normal mental status",
      "Possible thirst and fatigue",
    ],
    treatment: [
      "Move the patient to a cooler environment.",
      "Stop exertion and allow the patient to rest.",
      "Provide oral water or electrolyte solution when the patient is alert and can swallow safely.",
      "Monitor for progression to heat exhaustion or heat stroke.",
    ],
  },
  {
    title: "Heat Exhaustion",
    level: "Moderate Heat Illness",
    description:
      "Heat-related illness caused by fluid and electrolyte loss without the central nervous system dysfunction associated with heat stroke.",
    findings: [
      "Weakness or fatigue",
      "Dizziness or headache",
      "Nausea or vomiting",
      "Heavy sweating",
      "Tachycardia",
      "Possible hypotension",
      "Usually normal mental status",
    ],
    treatment: [
      "Move the patient to a cool environment.",
      "Remove unnecessary clothing.",
      "Begin active cooling.",
      "Provide oral hydration when the patient is alert with a normal gag reflex.",
      "Place the supine patient with legs elevated when appropriate.",
      "Monitor closely for altered mental status or worsening instability.",
    ],
  },
  {
    title: "Heat Stroke",
    level: "Life-Threatening Emergency",
    description:
      "Severe hyperthermia with central nervous system dysfunction caused by failure of normal thermoregulation.",
    findings: [
      "Altered mental status",
      "Confusion, agitation, seizures, or coma",
      "Core temperature commonly 104°F (40°C) or greater",
      "Hot skin that may be dry or sweaty",
      "Tachycardia",
      "Hypotension may develop",
      "Rapid progression toward organ failure",
    ],
    treatment: [
      "Begin rapid cooling immediately.",
      "Do not delay cooling for IV access or transport preparation.",
      "Use ice-water immersion when available and practical.",
      "Continuously monitor airway, breathing, circulation, mental status, and temperature.",
      "Prepare for seizures, vomiting, aspiration, dysrhythmias, and cardiovascular collapse.",
    ],
  },
];

const redFlags = [
  "Altered mental status",
  "Seizure activity",
  "Core temperature greater than or near 104°F",
  "Hypotension",
  "Signs of shock",
  "Loss of airway protection",
  "Severe agitation or coma",
  "Dysrhythmia",
  "Persistent vomiting",
  "Evidence of organ dysfunction",
];

const riskFactors = [
  "Strenuous exertion or athletic activity",
  "Outdoor labor in hot or humid conditions",
  "Extremes of age",
  "Dehydration",
  "Poor access to air conditioning",
  "Cardiovascular disease",
  "Obesity",
  "Recent illness",
  "Alcohol or stimulant use",
  "Medications such as diuretics or anticholinergics",
];

const coolingMethods = [
  {
    title: "Ice-Water Immersion",
    description:
      "Preferred when severe exertional heat stroke is suspected and the method can be performed safely.",
    steps: [
      "Remove unnecessary clothing.",
      "Place the patient in an ice-water bath, tub, or tarp system.",
      "Keep the airway and upper chest accessible.",
      "Continuously monitor the patient.",
      "Massage the extremities when appropriate to encourage cooled blood return.",
    ],
  },
  {
    title: "Tarp-Assisted Cooling",
    description:
      "A tarp may be used as an improvised immersion container when a tub is unavailable.",
    steps: [
      "Place the patient in the center of the tarp.",
      "Raise the tarp edges to form a basin.",
      "Add water and ice.",
      "Maintain airway access and continuous monitoring.",
      "Assign personnel to stabilize the tarp and assist cooling.",
    ],
  },
  {
    title: "Ice Packs and Evaporative Cooling",
    description:
      "Use when immersion is unavailable, unsafe, or impractical.",
    steps: [
      "Apply ice packs to the groin and axillae.",
      "Consider additional packs around the neck when appropriate.",
      "Wet the skin with cool water.",
      "Use fans or moving air to improve evaporative cooling.",
      "Rotate packs and continue temperature reassessment.",
    ],
  },
];

export default function HyperthermiaCoursePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education Course
          </p>

          <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">
            Hyperthermia
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            Recognition and prehospital management of environmental and
            exertional heat illness in adult and pediatric patients.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
            <CourseBadge text="Adult & Pediatric" />
            <CourseBadge text="Environmental Emergency" />
            <CourseBadge text="Heat Stroke" />
            <CourseBadge text="Rapid Cooling" />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#course-content"
              className="rounded-xl bg-red-600 px-7 py-4 text-center font-bold transition hover:bg-red-500"
            >
              Start Course
            </a>

            <Link
              href="/courses/hyperthermia/quiz"
              className="rounded-xl border border-red-500 px-7 py-4 text-center font-bold text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              Take the Quiz
            </Link>

            <Link
              href="/courses"
              className="rounded-xl border border-zinc-600 px-7 py-4 text-center font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </section>

      <section
        id="course-content"
        className="mx-auto max-w-6xl px-6 py-14"
      >
        <CourseSection
          number="01"
          title="Learning Objectives"
          description="By the end of this course, the learner should be able to:"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {learningObjectives.map((objective) => (
              <div
                key={objective}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <p className="font-semibold leading-7 text-zinc-200">
                  {objective}
                </p>
              </div>
            ))}
          </div>
        </CourseSection>

        <CourseSection
          number="02"
          title="What Is Hyperthermia?"
          description="Hyperthermia occurs when heat production or environmental heat exposure exceeds the body's ability to dissipate heat."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard title="Normal Thermoregulation">
              <p>
                The body normally controls temperature through sweating,
                vasodilation, convection, radiation, and evaporation.
              </p>

              <p>
                High humidity, dehydration, heavy clothing, medication effects,
                illness, or extreme exertion can overwhelm these mechanisms.
              </p>
            </InfoCard>

            <InfoCard title="Why It Becomes Dangerous">
              <p>
                When thermoregulation fails, core temperature rises and cells
                begin to malfunction.
              </p>

              <p>
                Continued heat exposure can lead to protein breakdown,
                inflammation, coagulopathy, brain injury, renal injury, liver
                failure, shock, and death.
              </p>
            </InfoCard>
          </div>

          <AlertBox
            title="Critical Principle"
            text="A patient with significant heat exposure and altered mental status should be treated as possible heat stroke even when a confirmed core temperature is not yet available."
          />
        </CourseSection>

        <CourseSection
          number="03"
          title="Types of Heat Illness"
          description="Heat illness exists on a spectrum. Rapidly recognize when a patient has progressed from a minor illness to heat stroke."
        >
          <div className="space-y-6">
            {heatIllnessTypes.map((illness) => (
              <HeatIllnessCard
                key={illness.title}
                title={illness.title}
                level={illness.level}
                description={illness.description}
                findings={illness.findings}
                treatment={illness.treatment}
              />
            ))}
          </div>
        </CourseSection>

        <CourseSection
          number="04"
          title="Recognizing Heat Stroke"
          description="Altered mental status is the key clinical feature separating heat stroke from less severe heat illness."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard
              title="Core Temperature"
              text="Core temperature is commonly 104°F or greater, but treatment should not wait when the clinical presentation strongly suggests heat stroke."
            />

            <FeatureCard
              title="CNS Dysfunction"
              text="Confusion, agitation, bizarre behavior, seizures, collapse, or coma are critical findings."
            />

            <FeatureCard
              title="Rapid Progression"
              text="Cellular injury and organ dysfunction can develop quickly. Cooling is a time-sensitive intervention."
            />
          </div>

          <div className="mt-8 rounded-2xl border border-red-600 bg-red-950/20 p-7">
            <h3 className="text-2xl font-bold text-red-400">
              Heat Stroke Red Flags
            </h3>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {redFlags.map((flag) => (
                <div
                  key={flag}
                  className="rounded-lg border border-red-900 bg-black p-4 font-semibold text-zinc-200"
                >
                  {flag}
                </div>
              ))}
            </div>
          </div>
        </CourseSection>

        <CourseSection
          number="05"
          title="Risk Factors"
          description="Some patients are more likely to develop heat illness or deteriorate quickly."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {riskFactors.map((factor) => (
              <div
                key={factor}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <p className="font-semibold text-zinc-200">
                  {factor}
                </p>
              </div>
            ))}
          </div>
        </CourseSection>

        <CourseSection
          number="06"
          title="Patient Assessment"
          description="Perform routine patient care while rapidly identifying the severity of the heat emergency."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ChecklistCard
              title="Primary Assessment"
              items={[
                "Assess airway protection.",
                "Evaluate respiratory rate and effort.",
                "Assess circulation and perfusion.",
                "Determine level of consciousness.",
                "Move the patient away from the heat source.",
                "Remove unnecessary clothing and equipment.",
              ]}
            />

            <ChecklistCard
              title="Focused Assessment"
              items={[
                "Obtain vital signs and repeat frequently.",
                "Obtain core temperature when appropriate equipment is available.",
                "Ask about duration of exposure and exertion.",
                "Determine fluid intake and urine output.",
                "Review medications, illness, drugs, or alcohol.",
                "Evaluate for trauma, infection, hypoglycemia, or toxicologic causes.",
              ]}
            />
          </div>

          <AlertBox
            title="Do Not Rely on Skin Moisture"
            text="Heat-stroke patients do not always have dry skin. Exertional heat-stroke patients may continue sweating."
          />
        </CourseSection>

        <CourseSection
          number="07"
          title="Rapid Cooling"
          description="Rapid cooling is the most important treatment for suspected heat stroke."
        >
          <div className="space-y-6">
            {coolingMethods.map((method) => (
              <CoolingCard
                key={method.title}
                title={method.title}
                description={method.description}
                steps={method.steps}
              />
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-yellow-500 bg-yellow-950/20 p-7">
            <h3 className="text-2xl font-bold text-yellow-400">
              Cooling Target
            </h3>

            <p className="mt-4 text-lg leading-8 text-zinc-200">
              Continue active cooling while repeatedly reassessing temperature
              and clinical status. Avoid overcooling once the patient reaches
              approximately 102.2°F or 39°C, or follow the current applicable
              protocol and medical-control direction.
            </p>
          </div>
        </CourseSection>

        <CourseSection
          number="08"
          title="Heat Exhaustion and Heat Cramps"
          description="Patients without central nervous system dysfunction may often be treated with cooling, rest, and hydration."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard title="Oral Rehydration">
              <p>
                Water or an electrolyte-containing fluid may be given when the
                patient is alert, has a normal gag reflex, and can swallow
                safely.
              </p>

              <p>
                Avoid oral intake in patients with altered mental status,
                vomiting, aspiration risk, or anticipated procedures.
              </p>
            </InfoCard>

            <InfoCard title="Positioning and Monitoring">
              <p>
                A patient with heat exhaustion may be placed supine with legs
                elevated when clinically appropriate.
              </p>

              <p>
                Continue monitoring for altered mental status, hypotension,
                worsening temperature, or progression to heat stroke.
              </p>
            </InfoCard>
          </div>
        </CourseSection>

        <CourseSection
          number="09"
          title="ALS Considerations"
          description="Advanced care supports circulation and treats complications but must not delay rapid cooling."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard
              title="Adult Fluids"
              text="Consider an adult crystalloid bolus when clinically indicated and consistent with the current protocol."
            />

            <FeatureCard
              title="Pediatric Fluids"
              text="Consider pediatric fluid administration by weight when indicated and consistent with the current protocol."
            />

            <FeatureCard
              title="Cardiac Monitoring"
              text="Monitor for tachycardia, dysrhythmias, ischemia, electrolyte disturbance, and cardiovascular collapse."
            />
          </div>

          <ChecklistCard
            title="Additional ALS Priorities"
            items={[
              "Establish vascular access without delaying cooling.",
              "Check blood glucose.",
              "Treat seizures according to protocol.",
              "Manage airway failure or loss of airway protection.",
              "Monitor ECG and perfusion.",
              "Consider other causes of altered mental status.",
              "Contact medical control when indicated.",
            ]}
          />
        </CourseSection>

        <CourseSection
          number="10"
          title="Transport Considerations"
          description="Cooling and transport must be coordinated rather than treated as competing priorities."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard title="Cool First When Possible">
              <p>
                When effective immersion cooling is available, continuing
                cooling on scene for a limited period may produce faster
                temperature reduction than immediate transport without
                effective cooling.
              </p>

              <p>
                Assign adequate personnel and maintain continuous airway and
                cardiovascular monitoring.
              </p>
            </InfoCard>

            <InfoCard title="Do Not Delay Necessary Transport">
              <p>
                Begin transport when cooling cannot be performed effectively,
                the patient requires hospital intervention, the scene is
                unsafe, or the patient's condition requires immediate
                movement.
              </p>

              <p>
                Continue cooling during transport whenever practical and safe.
              </p>
            </InfoCard>
          </div>
        </CourseSection>

        <CourseSection
          number="11"
          title="Clinical Scenario"
          description="Apply the course concepts to a patient encountered during an outdoor race."
        >
          <div className="rounded-2xl border border-red-600 bg-zinc-900 p-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Scenario
            </p>

            <h3 className="mt-3 text-3xl font-extrabold">
              Runner Collapse
            </h3>

            <p className="mt-5 text-lg leading-8 text-zinc-300">
              A runner collapses near the finish line during a summer road
              race. The patient is hot, confused, combative, and unable to
              answer questions appropriately. A core temperature of 104°F is
              obtained.
            </p>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <ScenarioPanel
                title="Assessment Findings"
                items={[
                  "Altered mental status",
                  "Recent strenuous exertion",
                  "Hot environment",
                  "Core temperature of 104°F",
                  "Tachycardia",
                  "Severe heat-stroke concern",
                ]}
              />

              <ScenarioPanel
                title="Immediate Priorities"
                items={[
                  "Remove the patient from the heat source.",
                  "Remove unnecessary clothing.",
                  "Begin immediate ice-water immersion or tarp cooling.",
                  "Maintain airway access.",
                  "Monitor temperature and vital signs.",
                  "Prepare for seizure, vomiting, or deterioration.",
                ]}
              />
            </div>

            <div className="mt-7 rounded-xl border border-green-600 bg-green-950/20 p-6">
              <h4 className="text-xl font-bold text-green-400">
                Best Initial Action
              </h4>

              <p className="mt-3 leading-7 text-zinc-200">
                Begin rapid cooling immediately while maintaining airway and
                cardiovascular monitoring. Do not delay cooling while waiting
                for IV access or transport preparation.
              </p>
            </div>
          </div>
        </CourseSection>

        <CourseSection
          number="12"
          title="Key Takeaways"
          description="Remember these principles when treating heat-related emergencies."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <TakeawayCard text="Altered mental status is the key indicator of heat stroke." />
            <TakeawayCard text="Rapid cooling is the most important early treatment." />
            <TakeawayCard text="Ice-water immersion is preferred for severe exertional heat stroke when practical." />
            <TakeawayCard text="Do not delay cooling for IV placement or transport preparation." />
            <TakeawayCard text="Heat-stroke patients may still be sweating." />
            <TakeawayCard text="Continue airway, cardiac, temperature, and mental-status monitoring throughout care." />
          </div>
        </CourseSection>

        <section className="rounded-2xl border border-red-600 bg-gradient-to-br from-red-950/40 to-zinc-900 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Course Complete
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Test Your Knowledge
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-300">
            Complete the 15-question Hyperthermia quiz to review recognition,
            cooling, fluid considerations, and transport priorities.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/courses/hyperthermia/quiz"
              className="rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-500"
            >
              Start Hyperthermia Quiz
            </Link>

            <a
              href="#course-content"
              className="rounded-xl border border-zinc-600 px-8 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Review Course
            </a>
          </div>
        </section>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-500">
          This educational material is intended for training and review. Always
          follow the most current statewide protocols, local service policies,
          medical-control direction, and your authorized scope of practice.
        </div>
      </section>
    </main>
  );
}

function CourseBadge({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-red-800 bg-red-950/40 px-4 py-2 text-red-300">
      {text}
    </span>
  );
}

function CourseSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16 scroll-mt-24">
      <div className="mb-7 border-b border-zinc-800 pb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          Section {number}
        </p>

        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          {title}
        </h2>

        <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-400">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h3 className="text-2xl font-bold text-red-500">
        {title}
      </h3>

      <div className="mt-4 space-y-4 leading-7 text-zinc-300">
        {children}
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xl font-bold text-red-500">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-300">
        {text}
      </p>
    </div>
  );
}

function AlertBox({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="mt-7 rounded-2xl border border-red-600 bg-red-950/20 p-6">
      <h3 className="text-xl font-bold text-red-400">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-200">
        {text}
      </p>
    </div>
  );
}

function HeatIllnessCard({
  title,
  level,
  description,
  findings,
  treatment,
}: {
  title: string;
  level: string;
  description: string;
  findings: string[];
  treatment: string[];
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-500">
        {level}
      </p>

      <h3 className="mt-2 text-3xl font-extrabold">
        {title}
      </h3>

      <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
        {description}
      </p>

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <ChecklistCard
          title="Common Findings"
          items={findings}
        />

        <ChecklistCard
          title="Treatment Priorities"
          items={treatment}
        />
      </div>
    </article>
  );
}

function ChecklistCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-black p-6">
      <h3 className="text-xl font-bold text-red-500">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 leading-7 text-zinc-300"
          >
            <span className="mt-1 font-bold text-red-500">
              ✓
            </span>

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoolingCard({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: string[];
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h3 className="text-2xl font-bold text-red-500">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-zinc-300">
        {description}
      </p>

      <ol className="mt-6 space-y-3">
        {steps.map((step, index) => (
          <li
            key={step}
            className="flex gap-4 rounded-lg border border-zinc-800 bg-black p-4 text-zinc-300"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
              {index + 1}
            </span>

            <span className="leading-7">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </article>
  );
}

function ScenarioPanel({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-black p-6">
      <h4 className="text-xl font-bold text-red-500">
        {title}
      </h4>

      <ul className="mt-4 space-y-3 text-zinc-300">
        {items.map((item) => (
          <li
            key={item}
            className="leading-7"
          >
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TakeawayCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="font-semibold leading-7 text-zinc-200">
        {text}
      </p>
    </div>
  );
}