import Link from "next/link";
import Navbar from "../../components/Navbar";

const objectives = [
  "Identify indications and contraindications for supraglottic airway placement.",
  "Select the correct iGel size.",
  "Describe proper iGel preparation and insertion.",
  "Confirm airway placement using waveform capnography.",
  "Interpret common ETCO₂ values and waveform changes.",
  "Troubleshoot ineffective ventilation or failed SGA placement.",
];

const iGelSizes = [
  {
    size: "1",
    weight: "2–5 kg",
    color: "Pink",
    patient: "Neonate",
  },
  {
    size: "1.5",
    weight: "5–12 kg",
    color: "Blue",
    patient: "Infant",
  },
  {
    size: "2",
    weight: "10–25 kg",
    color: "Gray",
    patient: "Small pediatric",
  },
  {
    size: "2.5",
    weight: "25–35 kg",
    color: "White",
    patient: "Large pediatric",
  },
  {
    size: "3",
    weight: "30–60 kg",
    color: "Yellow",
    patient: "Small adult",
  },
  {
    size: "4",
    weight: "50–90 kg",
    color: "Green",
    patient: "Medium adult",
  },
  {
    size: "5",
    weight: "90+ kg",
    color: "Orange",
    patient: "Large adult",
  },
];

const confirmationFindings = [
  "Continuous waveform capnography",
  "Visible and symmetrical chest rise",
  "Bilateral breath sounds",
  "No sounds over the epigastrium",
  "Improving oxygen saturation",
  "Appropriate resistance and compliance during ventilation",
];

const capnographyUses = [
  "Confirms placement of an advanced airway",
  "Continuously monitors ventilation",
  "Helps assess CPR quality",
  "May provide early indication of ROSC",
  "Detects airway dislodgement or obstruction",
  "Helps identify hyperventilation or hypoventilation",
];

export default function BLSAirwayCapnographyCoursePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education Course
          </p>

          <h1 className="mt-4 text-4xl font-extrabold sm:text-6xl">
            BLS Airway & Capnography
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-300">
            Focused EMT-level training covering supraglottic airway placement,
            iGel selection and insertion, ventilation, and continuous waveform
            capnography.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <CourseBadge text="EMT-Level Care" />
            <CourseBadge text="Supraglottic Airway" />
            <CourseBadge text="iGel" />
            <CourseBadge text="Waveform Capnography" />
            <CourseBadge text="Cardiac Arrest" />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#course-content"
              className="rounded-xl bg-red-600 px-7 py-4 text-center font-bold transition hover:bg-red-500"
            >
              Start Course
            </a>

            <Link
              href="/courses/bls-airway-capnography/quiz"
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
          title="Training Objectives"
          description="By the end of this course, the learner should be able to:"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {objectives.map((objective) => (
              <InfoTile key={objective} text={objective} />
            ))}
          </div>
        </CourseSection>

        <CourseSection
          number="02"
          title="Scope of Practice"
          description="This course focuses on EMT-level airway care."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard title="EMT-Level Use">
              <p>
                Supraglottic airway placement must be consistent with the
                provider&apos;s current statewide protocol, local authorization,
                service policy, and completed training.
              </p>

              <p>
                The uploaded training identifies EMT use during cardiac arrest
                when basic airway maneuvers and BVM ventilation are inadequate.
              </p>
            </InfoCard>

            <InfoCard title="Important Requirements">
              <ul className="space-y-3">
                <li>• The provider must be trained and authorized.</li>
                <li>• Waveform capnography must be immediately available.</li>
                <li>• Airway placement must not interrupt high-quality CPR.</li>
                <li>• Basic airway care and BVM ventilation remain priorities.</li>
              </ul>
            </InfoCard>
          </div>

          <AlertBox
            title="Follow the Current Protocol"
            text="The exact timing and indications for EMT supraglottic-airway placement may change with statewide and local protocols. Always follow your current authorization and medical direction."
          />
        </CourseSection>

        <CourseSection
          number="03"
          title="What Is a Supraglottic Airway?"
          description="A supraglottic airway sits above the vocal cords and provides an alternative method of ventilation."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard
              title="Placement"
              text="The device is inserted through the mouth and seats above the laryngeal opening."
            />

            <FeatureCard
              title="Examples"
              text="Common supraglottic airways include the iGel, King airway, and laryngeal mask airway."
            />

            <FeatureCard
              title="Purpose"
              text="It can provide more consistent ventilation when basic airway maneuvers and BVM ventilation are inadequate."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="04"
          title="The iGel Airway"
          description="The iGel is a supraglottic airway designed for rapid insertion without an inflatable cuff."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard title="Key Features">
              <ul className="space-y-3">
                <li>• Non-inflatable anatomical cuff</li>
                <li>• Designed to form a seal around the laryngeal inlet</li>
                <li>• Rapid device preparation</li>
                <li>• No cuff inflation step</li>
                <li>• Available in pediatric and adult sizes</li>
              </ul>
            </InfoCard>

            <InfoCard title="Clinical Advantages">
              <ul className="space-y-3">
                <li>• Fast insertion</li>
                <li>• Minimal interruption in compressions</li>
                <li>• Consistent airway connection</li>
                <li>• Can be confirmed continuously with capnography</li>
                <li>• Does not require direct laryngoscopy</li>
              </ul>
            </InfoCard>
          </div>
        </CourseSection>

        <CourseSection
          number="05"
          title="Indications and Contraindications"
          description="Select the device only when the patient and clinical situation meet protocol requirements."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ChecklistCard
              title="Consider an SGA When"
              items={[
                "The patient is in cardiac arrest.",
                "Basic airway maneuvers are ineffective.",
                "BVM ventilation is inadequate or difficult.",
                "The patient has no intact gag reflex.",
                "The provider is trained and authorized.",
                "Capnography is immediately available.",
                "Placement will not delay or interrupt CPR.",
              ]}
            />

            <ChecklistCard
              title="Do Not Use When"
              items={[
                "The patient has an intact gag reflex.",
                "A foreign-body obstruction has not been relieved.",
                "The provider lacks training or authorization.",
                "Severe airway or facial trauma prevents safe placement.",
                "BVM ventilation is effective and an advanced airway is unnecessary.",
                "The device cannot be confirmed or ventilated effectively.",
              ]}
            />
          </div>
        </CourseSection>

        <CourseSection
          number="06"
          title="iGel Size Selection"
          description="Select the device according to the manufacturer's weight-based recommendations."
        >
          <div className="overflow-x-auto rounded-2xl border border-zinc-800">
            <table className="w-full min-w-[700px] bg-zinc-900 text-left">
              <thead className="bg-red-950/40 text-red-400">
                <tr>
                  <th className="px-5 py-4">Size</th>
                  <th className="px-5 py-4">Weight</th>
                  <th className="px-5 py-4">Color</th>
                  <th className="px-5 py-4">Patient Category</th>
                </tr>
              </thead>

              <tbody>
                {iGelSizes.map((item) => (
                  <tr
                    key={item.size}
                    className="border-t border-zinc-800"
                  >
                    <td className="px-5 py-4 font-bold text-red-400">
                      {item.size}
                    </td>
                    <td className="px-5 py-4 text-zinc-300">
                      {item.weight}
                    </td>
                    <td className="px-5 py-4 text-zinc-300">
                      {item.color}
                    </td>
                    <td className="px-5 py-4 text-zinc-300">
                      {item.patient}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <AlertBox
            title="Check the Packaging"
            text="Always verify the manufacturer's current sizing chart and the device packaging before insertion."
          />
        </CourseSection>

        <CourseSection
          number="07"
          title="Preparation"
          description="Prepare the device and monitoring equipment before attempting placement."
        >
          <NumberedSteps
            steps={[
              "Select the correct iGel size.",
              "Inspect the device for damage or contamination.",
              "Apply water-based lubricant to the posterior surface of the cuff.",
              "Avoid placing lubricant inside the airway opening.",
              "Prepare the BVM and oxygen source.",
              "Place the capnography adapter between the BVM and airway device.",
              "Position the patient according to training and protocol.",
              "Continue CPR and minimize pauses.",
            ]}
          />
        </CourseSection>

        <CourseSection
          number="08"
          title="Insertion Technique"
          description="Insert the device smoothly and stop if significant resistance is encountered."
        >
          <NumberedSteps
            steps={[
              "Open the patient’s mouth.",
              "Hold the lubricated iGel along the integral bite block.",
              "Insert the device in the midline.",
              "Glide the cuff along the hard palate.",
              "Advance until firm resistance is felt.",
              "Do not force or twist the device.",
              "Connect the BVM and capnography adapter.",
              "Begin ventilation and immediately assess placement.",
              "Secure the airway after confirmation.",
              "Resume or continue uninterrupted compressions.",
            ]}
          />

          <AlertBox
            title="Never Force the Device"
            text="If the iGel does not advance normally, stop. Reassess size, position, obstruction, and technique."
          />
        </CourseSection>

        <CourseSection
          number="09"
          title="Confirming Placement"
          description="Waveform capnography is the most important confirmation method and must be evaluated continuously."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {confirmationFindings.map((finding) => (
              <InfoTile key={finding} text={finding} />
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-green-600 bg-green-950/20 p-7">
            <h3 className="text-2xl font-bold text-green-400">
              Continuous Confirmation
            </h3>

            <p className="mt-4 leading-7 text-zinc-200">
              Placement confirmation is not a one-time event. Continuously
              assess the capnography waveform, ventilation compliance, chest
              rise, breath sounds, oxygen saturation, and device position.
            </p>
          </div>
        </CourseSection>

        <CourseSection
          number="10"
          title="If the SGA Fails"
          description="An ineffective supraglottic airway must not remain in place."
        >
          <ChecklistCard
            title="Troubleshooting Priorities"
            items={[
              "Check the BVM connection and oxygen source.",
              "Check the capnography adapter and sampling line.",
              "Assess chest rise and ventilation compliance.",
              "Reposition the head and airway when appropriate.",
              "Check device depth and securement.",
              "Suction when indicated.",
              "If ventilation remains ineffective, remove the device.",
              "Immediately return to BVM ventilation.",
              "Reattempt placement only when appropriate and without interrupting CPR.",
            ]}
          />
        </CourseSection>

        <CourseSection
          number="11"
          title="What Is Capnography?"
          description="Capnography measures exhaled carbon dioxide and displays both a waveform and a numeric ETCO₂ value."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard title="ETCO₂">
              <p>
                End-tidal carbon dioxide is the concentration or partial
                pressure of carbon dioxide measured at the end of exhalation.
              </p>

              <p>
                It reflects ventilation and is also influenced by circulation,
                metabolism, airway integrity, and equipment function.
              </p>
            </InfoCard>

            <InfoCard title="Waveform">
              <p>
                The waveform shows exhaled carbon dioxide breath by breath. A
                consistent waveform is essential for confirming and monitoring
                airway placement.
              </p>

              <p>
                Trending the waveform and values is usually more useful than
                interpreting a single number.
              </p>
            </InfoCard>
          </div>
        </CourseSection>

        <CourseSection
          number="12"
          title="Why Capnography Matters"
          description="Capnography provides immediate information about airway placement, ventilation, circulation, and CPR."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {capnographyUses.map((use) => (
              <InfoTile key={use} text={use} />
            ))}
          </div>
        </CourseSection>

        <CourseSection
          number="13"
          title="Understanding the Waveform"
          description="A normal waveform has a recognizable square-like appearance with a consistent expiratory plateau."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard
              title="Normal Waveform"
              text="A consistent waveform with a clear expiratory upstroke and plateau suggests exhaled carbon dioxide is being detected."
            />

            <FeatureCard
              title="Irregular Waveform"
              text="An irregular or changing waveform may indicate poor seal, airway movement, obstruction, altered ventilation, or equipment problems."
            />

            <FeatureCard
              title="Flat Line"
              text="A flat waveform indicates no detected carbon dioxide. Immediately assess airway placement, circulation, ventilation, and equipment."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="14"
          title="ETCO₂ Values"
          description="Interpret ETCO₂ in the context of the entire patient and the waveform."
        >
          <div className="space-y-5">
            <ValueCard
              range="35–45 mmHg"
              title="Typical Normal Range"
              description="Often considered a normal ETCO₂ range in a ventilating patient, though the clinical context remains essential."
            />

            <ValueCard
              range="Below 10 mmHg during CPR"
              title="Poor Perfusion or Compression Concern"
              description="Consistently low ETCO₂ during CPR may indicate poor perfusion, inadequate compressions, excessive ventilation, or another problem."
            />

            <ValueCard
              range="Sudden Sustained Increase"
              title="Possible ROSC"
              description="A sudden sustained rise in ETCO₂ during CPR may be an early sign of return of spontaneous circulation."
            />

            <ValueCard
              range="Above 45 mmHg"
              title="Possible Hypoventilation"
              description="A high ETCO₂ may indicate inadequate ventilation, increased carbon-dioxide production, rebreathing, or another clinical issue."
            />

            <ValueCard
              range="Low ETCO₂"
              title="Possible Hyperventilation or Low Perfusion"
              description="Low values may occur with excessive ventilation, poor perfusion, shock, pulmonary embolism, or poor-quality CPR."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="15"
          title="Ventilation During CPR"
          description="Avoid excessive ventilation after an advanced airway has been placed."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard
              title="Ventilation Rate"
              text="Provide approximately one breath every six seconds unless the applicable protocol directs otherwise."
            />

            <FeatureCard
              title="Continuous Compressions"
              text="Once an advanced airway is in place, continue compressions without pausing for ventilations."
            />

            <FeatureCard
              title="Avoid Overventilation"
              text="Excessive ventilation can increase intrathoracic pressure, reduce venous return, and decrease coronary and cerebral perfusion."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="16"
          title="Documentation"
          description="Document the airway procedure and capnography findings thoroughly."
        >
          <ChecklistCard
            title="Include in the Patient-Care Report"
            items={[
              "Indication for SGA placement",
              "Device type and size",
              "Number of placement attempts",
              "Confirmation findings",
              "Initial and trending ETCO₂ values",
              "Waveform presence and quality",
              "Ventilation rate",
              "Patient response",
              "Any troubleshooting or device removal",
              "ROSC-related ETCO₂ changes",
            ]}
          />
        </CourseSection>

        <CourseSection
          number="17"
          title="Key Takeaways"
          description="Remember these priorities during BLS airway management."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Takeaway text="High-quality CPR remains the top priority." />
            <Takeaway text="Do not delay or interrupt compressions for airway placement." />
            <Takeaway text="Use an SGA only within current training and authorization." />
            <Takeaway text="Select the correct device size." />
            <Takeaway text="Never force the iGel during insertion." />
            <Takeaway text="Waveform capnography is required for confirmation and monitoring." />
            <Takeaway text="If ventilation is ineffective, remove the SGA and return to BVM ventilation." />
            <Takeaway text="Trend the waveform and ETCO₂ rather than relying on one number." />
          </div>
        </CourseSection>

        <section className="rounded-2xl border border-red-600 bg-gradient-to-br from-red-950/40 to-zinc-900 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Course Complete
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Test Your Knowledge
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-zinc-300">
            Complete the BLS Airway & Capnography quiz to review indications,
            iGel placement, ventilation, capnography, ETCO₂ interpretation,
            troubleshooting, and CPR priorities.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/courses/bls-airway-capnography/quiz"
              className="rounded-xl bg-red-600 px-8 py-4 font-bold transition hover:bg-red-500"
            >
              Start Quiz
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
          This course is intended for education and review. Always follow the
          current statewide protocols, device manufacturer instructions, local
          service policies, medical-control direction, and your authorized
          scope of practice.
        </div>
      </section>
    </main>
  );
}

function CourseBadge({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-red-800 bg-red-950/40 px-4 py-2 text-sm font-bold text-red-300">
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
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h3 className="text-2xl font-bold text-red-500">
        {title}
      </h3>

      <div className="mt-4 space-y-4 leading-7 text-zinc-300">
        {children}
      </div>
    </article>
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
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xl font-bold text-red-500">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-300">
        {text}
      </p>
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
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
      <h3 className="text-2xl font-bold text-red-500">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 leading-7 text-zinc-300"
          >
            <span className="font-bold text-red-500">
              ✓
            </span>

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function InfoTile({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="font-semibold leading-7 text-zinc-200">
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

function NumberedSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, index) => (
        <li
          key={step}
          className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 font-bold">
            {index + 1}
          </span>

          <span className="pt-1 leading-7 text-zinc-300">
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

function ValueCard({
  range,
  title,
  description,
}: {
  range: string;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-2xl font-extrabold text-green-400">
        {range}
      </p>

      <h3 className="mt-2 text-xl font-bold text-red-500">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-300">
        {description}
      </p>
    </article>
  );
}

function Takeaway({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="font-semibold leading-7 text-zinc-200">
        {text}
      </p>
    </div>
  );
}