import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const objectives = [
  "Identify indications and contraindications for supraglottic airway placement.",
  "Select the appropriate iGel size.",
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
            BLS Airway &amp; Capnography
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-300">
            EMT-level training covering supraglottic airway use, iGel
            preparation and insertion, ventilation, continuous waveform
            capnography, ETCO₂ interpretation, and airway troubleshooting.
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
          title="Learning Objectives"
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
          description="This course focuses on EMT-level airway care during cardiac arrest."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard title="When EMTs May Consider an SGA">
              <ul className="space-y-3">
                <li>• The patient is in cardiac arrest.</li>
                <li>• Basic airway maneuvers are ineffective.</li>
                <li>• BVM ventilation is inadequate or difficult.</li>
                <li>• The provider is trained and authorized.</li>
                <li>• Waveform capnography is immediately available.</li>
              </ul>
            </InfoCard>

            <InfoCard title="Important Priorities">
              <ul className="space-y-3">
                <li>• High-quality CPR remains the top priority.</li>
                <li>• Do not delay compressions for airway placement.</li>
                <li>• Continue basic airway care when it is effective.</li>
                <li>• Follow current statewide and local protocols.</li>
              </ul>
            </InfoCard>
          </div>

          <AlertBox
            title="Training and Authorization Required"
            text="A supraglottic airway may only be used within the provider’s current training, authorization, service policy, medical direction, and statewide scope of practice."
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
              text="The device is inserted through the mouth and rests above the laryngeal opening."
            />

            <FeatureCard
              title="Examples"
              text="Common supraglottic airway devices include the iGel, King airway, and laryngeal mask airway."
            />

            <FeatureCard
              title="Purpose"
              text="An SGA can provide more consistent ventilation when basic airway maneuvers and BVM ventilation are inadequate."
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
                <li>• Designed to seal around the laryngeal inlet</li>
                <li>• No cuff inflation step</li>
                <li>• Rapid preparation and insertion</li>
                <li>• Available in pediatric and adult sizes</li>
              </ul>
            </InfoCard>

            <InfoCard title="Benefits">
              <ul className="space-y-3">
                <li>• Fast placement</li>
                <li>• Minimal interruption in compressions</li>
                <li>• Does not require direct laryngoscopy</li>
                <li>• Works with waveform capnography</li>
                <li>• Provides a secure connection for ventilation</li>
              </ul>
            </InfoCard>
          </div>
        </CourseSection>

        <CourseSection
          number="05"
          title="Indications and Contraindications"
          description="Use the device only when the patient and clinical situation meet protocol requirements."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ChecklistCard
              title="Consider an iGel When"
              items={[
                "The patient is in cardiac arrest.",
                "Basic airway maneuvers are ineffective.",
                "BVM ventilation is inadequate.",
                "The patient has no intact gag reflex.",
                "The provider is trained and authorized.",
                "Capnography is immediately available.",
              ]}
            />

            <ChecklistCard
              title="Do Not Use When"
              items={[
                "The patient has an intact gag reflex.",
                "A foreign-body obstruction has not been relieved.",
                "The provider lacks training or authorization.",
                "Severe facial or airway trauma prevents placement.",
                "BVM ventilation is effective.",
                "The device cannot be confirmed or ventilated effectively.",
              ]}
            />
          </div>
        </CourseSection>

        <CourseSection
          number="06"
          title="iGel Size Selection"
          description="Select the device using the manufacturer’s weight-based sizing recommendations."
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
            title="Verify Before Use"
            text="Always confirm the current manufacturer sizing chart and inspect the device packaging before insertion."
          />
        </CourseSection>

        <CourseSection
          number="07"
          title="Preparation"
          description="Prepare the airway device, ventilation equipment, and capnography before attempting placement."
        >
          <NumberedSteps
            steps={[
              "Select the correct iGel size.",
              "Inspect the device for damage or contamination.",
              "Apply water-based lubricant to the posterior surface.",
              "Avoid placing lubricant inside the airway opening.",
              "Prepare the BVM and oxygen source.",
              "Prepare the capnography adapter and sampling line.",
              "Position the patient according to training and protocol.",
              "Continue CPR and minimize interruptions.",
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
              "Hold the iGel by the integral bite block.",
              "Insert the device in the midline.",
              "Glide the cuff along the hard palate.",
              "Advance until firm resistance is felt.",
              "Do not force or twist the device.",
              "Connect the BVM and capnography adapter.",
              "Begin ventilation and immediately assess placement.",
              "Secure the airway after confirmation.",
              "Continue uninterrupted compressions.",
            ]}
          />

          <AlertBox
            title="Never Force the iGel"
            text="If the device does not advance normally, stop and reassess the patient’s position, airway, device size, and insertion technique."
          />
        </CourseSection>

        <CourseSection
          number="09"
          title="Confirming Placement"
          description="Waveform capnography is the most important method for confirming and continuously monitoring placement."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InfoTile text="Continuous waveform capnography" />
            <InfoTile text="Visible and symmetrical chest rise" />
            <InfoTile text="Bilateral breath sounds" />
            <InfoTile text="No sounds over the epigastrium" />
            <InfoTile text="Improving oxygen saturation" />
            <InfoTile text="Appropriate ventilation compliance" />
          </div>

          <div className="mt-7 rounded-2xl border border-green-600 bg-green-950/20 p-7">
            <h3 className="text-2xl font-bold text-green-400">
              Confirmation Is Continuous
            </h3>

            <p className="mt-4 leading-7 text-zinc-200">
              Continue assessing the waveform, ETCO₂ value, chest rise, breath
              sounds, device position, oxygen saturation, and ventilation
              compliance throughout patient care.
            </p>
          </div>
        </CourseSection>

        <CourseSection
          number="10"
          title="If the SGA Fails"
          description="An ineffective supraglottic airway should not remain in place."
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
              "Remove the device if ventilation remains ineffective.",
              "Immediately return to BVM ventilation.",
              "Reattempt only when appropriate and without delaying CPR.",
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
                ETCO₂ is affected by ventilation, circulation, metabolism,
                airway integrity, and equipment function.
              </p>
            </InfoCard>

            <InfoCard title="Waveform">
              <p>
                The waveform displays exhaled carbon dioxide breath by breath.
                A consistent waveform supports proper airway placement and
                ventilation.
              </p>

              <p>
                Trends are usually more important than a single isolated
                number.
              </p>
            </InfoCard>
          </div>
        </CourseSection>

        <CourseSection
          number="12"
          title="Why Capnography Matters"
          description="Capnography provides real-time information about airway placement, ventilation, circulation, and CPR."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InfoTile text="Confirms advanced-airway placement" />
            <InfoTile text="Continuously monitors ventilation" />
            <InfoTile text="Helps assess CPR quality" />
            <InfoTile text="May provide an early indication of ROSC" />
            <InfoTile text="Detects airway dislodgement or obstruction" />
            <InfoTile text="Identifies hyperventilation or hypoventilation" />
          </div>
        </CourseSection>

        <CourseSection
          number="13"
          title="Understanding the Waveform"
          description="A normal waveform has a square-like appearance with a consistent expiratory plateau."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <FeatureCard
              title="Normal Waveform"
              text="A consistent waveform with a clear expiratory upstroke and plateau indicates detected exhaled carbon dioxide."
            />

            <FeatureCard
              title="Irregular Waveform"
              text="An irregular waveform may indicate poor seal, movement, obstruction, altered ventilation, or equipment problems."
            />

            <FeatureCard
              title="Flat Line"
              text="A flat waveform means no carbon dioxide is detected. Immediately assess the airway, circulation, ventilation, and equipment."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="14"
          title="Common Capnography Patterns"
          description="The waveform and trend often provide more useful information than a single ETCO₂ value."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <WaveformCard
              title="Normal Waveform"
              range="35–45 mmHg"
              pattern="Sharp rise, flat plateau, and rapid return to baseline."
              meaning="Consistent ventilation with a recognizable expiratory plateau."
              action="Know the patient’s baseline and continue trending."
              waveform="normal"
            />

            <WaveformCard
              title="Shark-Fin Pattern"
              range="Obstructive pattern"
              pattern="Sloping expiratory rise with no clear flat plateau."
              meaning="Commonly associated with bronchospasm, asthma, COPD, or expiratory obstruction."
              action="Assess breath sounds, ventilation resistance, and response to treatment."
              waveform="shark"
            />

            <WaveformCard
              title="Falling ETCO₂"
              range="Downward trend"
              pattern="The waveform remains present, but the value decreases over time."
              meaning="May indicate worsening perfusion, shock, excessive ventilation, or declining cardiac output."
              action="Reassess circulation, ventilation rate, CPR quality, and the patient’s overall condition."
              waveform="falling"
            />

            <WaveformCard
              title="Flat Line"
              range="No detected CO₂"
              pattern="No measurable waveform is present."
              meaning="May indicate airway displacement, apnea, absent perfusion, disconnected tubing, or equipment failure."
              action="Immediately check the airway, patient, ventilation circuit, and monitor."
              waveform="flat"
            />

            <WaveformCard
              title="Low ETCO₂"
              range="Below expected range"
              pattern="Small waveform with low numeric values."
              meaning="May be caused by hyperventilation, poor perfusion, shock, pulmonary embolism, or poor-quality CPR."
              action="Correct excessive ventilation and reassess perfusion and compression quality."
              waveform="low"
            />

            <WaveformCard
              title="Rising ETCO₂"
              range="Upward trend"
              pattern="Waveform height or numeric value rises over time."
              meaning="May indicate hypoventilation, CO₂ retention, respiratory fatigue, rebreathing, or increased metabolism."
              action="Assess ventilation adequacy, respiratory effort, equipment, and clinical deterioration."
              waveform="rising"
            />
          </div>

          <div className="mt-8 rounded-2xl border border-yellow-600 bg-yellow-950/20 p-7">
            <h3 className="text-2xl font-bold text-yellow-400">
              The Power Is in the Trend
            </h3>

            <p className="mt-4 leading-7 text-zinc-200">
              A single ETCO₂ number provides limited information. Watch the
              waveform, compare values over time, and correlate changes with the
              patient’s airway, ventilation, circulation, treatment response,
              and overall clinical condition.
            </p>
          </div>
        </CourseSection>

        <CourseSection
          number="15"
          title="ETCO₂ Values"
          description="Interpret ETCO₂ together with the waveform and the patient’s overall clinical condition."
        >
          <div className="space-y-5">
            <ValueCard
              range="35–45 mmHg"
              title="Typical Normal Range"
              description="This is commonly considered a normal ETCO₂ range in a ventilating patient."
            />

            <ValueCard
              range="Below 10 mmHg During CPR"
              title="Poor Perfusion or Compression Concern"
              description="Persistently low ETCO₂ may indicate poor perfusion, inadequate compressions, or excessive ventilation."
            />

            <ValueCard
              range="Sudden Sustained Increase"
              title="Possible ROSC"
              description="A sudden sustained rise in ETCO₂ during CPR may indicate return of spontaneous circulation."
            />

            <ValueCard
              range="Above 45 mmHg"
              title="Possible Hypoventilation"
              description="A high ETCO₂ may indicate inadequate ventilation, rebreathing, or increased carbon-dioxide production."
            />

            <ValueCard
              range="Low ETCO₂"
              title="Possible Hyperventilation or Low Perfusion"
              description="Low values may occur with excessive ventilation, poor perfusion, shock, pulmonary embolism, or poor-quality CPR."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="16"
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
              text="Continue chest compressions without pausing for ventilations after the advanced airway is placed."
            />

            <FeatureCard
              title="Avoid Overventilation"
              text="Excessive ventilation can decrease venous return and reduce coronary and cerebral perfusion."
            />
          </div>
        </CourseSection>

        <CourseSection
          number="17"
          title="Documentation"
          description="Document the airway procedure and capnography findings thoroughly."
        >
          <ChecklistCard
            title="Include in the Patient-Care Report"
            items={[
              "Indication for SGA placement",
              "Device type and size",
              "Number of placement attempts",
              "Placement-confirmation findings",
              "Initial and trending ETCO₂ values",
              "Waveform presence and quality",
              "Ventilation rate",
              "Patient response",
              "Troubleshooting or device removal",
              "ETCO₂ changes associated with possible ROSC",
            ]}
          />
        </CourseSection>

        <CourseSection
          number="18"
          title="Key Takeaways"
          description="Remember these priorities during BLS airway management."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Takeaway text="High-quality CPR remains the top priority." />
            <Takeaway text="Do not delay compressions for airway placement." />
            <Takeaway text="Use an SGA only within current training and authorization." />
            <Takeaway text="Select the correct iGel size." />
            <Takeaway text="Never force the iGel during insertion." />
            <Takeaway text="Use waveform capnography for confirmation and monitoring." />
            <Takeaway text="Remove the SGA and return to BVM if ventilation is ineffective." />
            <Takeaway text="Trend the waveform and ETCO₂ values continuously." />
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
            Complete the BLS Airway &amp; Capnography quiz to review
            indications, iGel placement, ventilation, waveform interpretation,
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
          This course is provided for education and review. Always follow
          current statewide protocols, manufacturer instructions, local service
          policies, medical-control direction, and your authorized scope of
          practice.
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
  children: ReactNode;
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
  children: ReactNode;
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

function WaveformCard({
  title,
  range,
  pattern,
  meaning,
  action,
  waveform,
}: {
  title: string;
  range: string;
  pattern: string;
  meaning: string;
  action: string;
  waveform: "normal" | "shark" | "falling" | "flat" | "low" | "rising";
}) {
  const paths = {
    normal: "M10 70 H35 V25 H90 V70 H120 V25 H175 V70 H205",
    shark:
      "M10 70 H35 Q60 65 90 25 V70 H120 Q145 65 175 25 V70 H205",
    falling:
      "M10 70 H35 V25 H75 V70 H105 V35 H145 V70 H175 V48 H205",
    flat: "M10 70 H205",
    low: "M10 70 H35 V55 H70 V70 H100 V58 H135 V70 H165 V60 H205",
    rising:
      "M10 70 H35 V55 H70 V70 H100 V45 H135 V70 H165 V30 H205",
  };

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-red-500">
            {title}
          </h3>

          <p className="mt-2 text-sm font-bold uppercase tracking-wide text-green-400">
            {range}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-zinc-700 bg-black p-4">
        <svg
          viewBox="0 0 215 90"
          className="h-28 w-full"
          role="img"
          aria-label={`${title} capnography waveform`}
        >
          <line
            x1="10"
            y1="70"
            x2="205"
            y2="70"
            stroke="currentColor"
            strokeWidth="1"
            className="text-zinc-700"
          />

          <path
            d={paths[waveform]}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-400"
          />
        </svg>
      </div>

      <div className="mt-5 space-y-4 leading-7 text-zinc-300">
        <p>
          <span className="font-bold text-white">
            Pattern:{" "}
          </span>
          {pattern}
        </p>

        <p>
          <span className="font-bold text-white">
            What it may mean:{" "}
          </span>
          {meaning}
        </p>

        <p>
          <span className="font-bold text-white">
            What to do:{" "}
          </span>
          {action}
        </p>
      </div>
    </article>
  );
}