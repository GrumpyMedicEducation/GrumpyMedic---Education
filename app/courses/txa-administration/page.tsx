import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function TXAAdministrationCoursePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-red-900 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="rounded-full bg-red-700 px-4 py-1 text-sm font-bold uppercase tracking-wider">
            Trauma Pharmacology
          </span>

          <h1 className="mt-5 text-5xl font-extrabold text-white">
            TXA Administration
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-300">
            Learn when Tranexamic Acid (TXA) should be administered under the
            Massachusetts 2026.2 Statewide Treatment Protocols, understand the
            updated adult dosing recommendations, and recognize patients who may
            benefit from early hemorrhage control.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/courses/txa-administration/quiz"
              className="rounded-lg bg-red-600 px-6 py-3 font-bold hover:bg-red-700"
            >
              Take Quiz
            </Link>

            <Link
              href="/courses"
              className="rounded-lg border border-zinc-700 px-6 py-3 font-bold hover:border-red-500"
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">

        {/* Infographic */}
        <div className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900">
          <img
            src="/images/txa-administration-2026-2.png"
            alt="Massachusetts 2026.2 TXA Administration"
            className="w-full h-auto"
          />
        </div>

        {/* Learning Objectives */}
        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-8">
          <h2 className="text-3xl font-bold text-red-500">
            Learning Objectives
          </h2>

          <ul className="mt-6 space-y-4 text-lg text-zinc-300">
            <li>• Explain how Tranexamic Acid (TXA) works.</li>
            <li>• Identify patients who meet Massachusetts protocol criteria.</li>
            <li>• Describe the updated 2026.2 adult dosing.</li>
            <li>• Recognize when TXA should be administered.</li>
            <li>• Understand contraindications and precautions.</li>
            <li>• Apply TXA knowledge during trauma scenarios.</li>
          </ul>
        </div>

        {/* What is TXA */}
        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-8">
          <h2 className="text-3xl font-bold text-red-500">
            What is Tranexamic Acid?
          </h2>

          <p className="mt-6 leading-8 text-zinc-300">
            Tranexamic Acid (TXA) is an antifibrinolytic medication that helps
            preserve existing blood clots. It does not create new clots. Instead,
            it prevents premature breakdown of fibrin, allowing the body's
            natural clotting process to stabilize hemorrhage.
          </p>

          <p className="mt-6 leading-8 text-zinc-300">
            Multiple large studies have demonstrated improved survival when TXA
            is administered early to appropriate trauma patients experiencing
            significant bleeding.
          </p>
        </div>

        {/* Massachusetts Protocol */}
        <div className="mt-10 rounded-2xl border border-red-700 bg-red-950/20 p-8">
          <h2 className="text-3xl font-bold text-red-400">
            Massachusetts 2026.2 Adult Protocol
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-xl bg-zinc-900 p-6">
              <h3 className="text-2xl font-bold text-white">
                Indications
              </h3>

              <ul className="mt-5 space-y-3 text-zinc-300">
                <li>✔ Adult multisystem trauma</li>
                <li>✔ Suspected significant hemorrhage</li>
                <li>✔ SBP less than 90 mmHg</li>
                <li>✔ Heart rate greater than 110 bpm</li>
                <li>✔ Provider believes patient is at high risk for major bleeding</li>
              </ul>
            </div>

            <div className="rounded-xl bg-zinc-900 p-6">
              <h3 className="text-2xl font-bold text-white">
                Adult Dose
              </h3>

              <div className="mt-5 text-center">
                <p className="text-6xl font-extrabold text-red-500">
                  2 g
                </p>

                <p className="mt-3 text-xl">
                  Slow IV Push
                </p>

                <p className="text-zinc-400">
                  Administer over 10 minutes
                </p>
              </div>
            </div>

          </div>
        </div>
                {/* Obstetrical Emergencies */}
                <div className="mt-10 rounded-2xl border border-purple-700 bg-purple-950/20 p-8">
          <h2 className="text-3xl font-bold text-purple-400">
            Obstetrical Emergencies
          </h2>

          <p className="mt-6 leading-8 text-zinc-300">
            TXA may also be considered for severe obstetrical hemorrhage when
            permitted by the Massachusetts statewide protocol and local medical
            direction. These patients require rapid recognition, aggressive
            supportive care, and early transport.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
              <h3 className="text-2xl font-bold text-white">
                Consider TXA When
              </h3>

              <ul className="mt-5 space-y-3 text-zinc-300">
                <li>✔ Significant postpartum hemorrhage is suspected</li>
                <li>✔ The patient has ongoing or uncontrolled bleeding</li>
                <li>✔ The patient demonstrates signs of hemorrhagic shock</li>
                <li>✔ Rapid transport and obstetrical notification are underway</li>
              </ul>
            </div>

            <div className="rounded-xl border border-purple-700 bg-zinc-900 p-6">
              <h3 className="text-2xl font-bold text-white">
                Obstetrical Dose
              </h3>

              <div className="mt-5 text-center">
                <p className="text-6xl font-extrabold text-purple-400">
                  2 g
                </p>

                <p className="mt-3 text-xl">
                  Slow IV Push
                </p>

                <p className="mt-2 text-zinc-400">
                  Administer according to current protocol and medical direction
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-yellow-700 bg-yellow-950/20 p-5">
            <p className="font-bold text-yellow-400">
              Important
            </p>

            <p className="mt-2 leading-7 text-zinc-300">
              TXA does not replace uterine massage, hemorrhage control,
              resuscitation, rapid transport, or consultation with medical
              control.
            </p>
          </div>
        </div>

        {/* Administration */}
        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-8">
          <h2 className="text-3xl font-bold text-red-500">
            Administration and Monitoring
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-black p-6">
              <h3 className="text-2xl font-bold">
                Before Administration
              </h3>

              <ul className="mt-5 space-y-3 text-zinc-300">
                <li>• Confirm the patient meets protocol criteria.</li>
                <li>• Verify the medication, concentration, and expiration date.</li>
                <li>• Confirm IV or IO access is functioning properly.</li>
                <li>• Assess for contraindications and precautions.</li>
                <li>• Obtain and document baseline vital signs.</li>
              </ul>
            </div>

            <div className="rounded-xl bg-black p-6">
              <h3 className="text-2xl font-bold">
                During Administration
              </h3>

              <ul className="mt-5 space-y-3 text-zinc-300">
                <li>• Administer the medication slowly as directed.</li>
                <li>• Continuously monitor blood pressure and heart rate.</li>
                <li>• Observe for adverse reactions.</li>
                <li>• Continue hemorrhage-control measures.</li>
                <li>• Reassess the patient frequently.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-red-800 bg-red-950/20 p-6">
            <h3 className="text-xl font-bold text-red-400">
              Avoid Rapid Administration
            </h3>

            <p className="mt-3 leading-7 text-zinc-300">
              Rapid administration of TXA may contribute to hypotension. Follow
              the administration rate required by the current protocol,
              manufacturer guidance, and medical direction.
            </p>
          </div>
        </div>

        {/* Contraindications */}
        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-8">
          <h2 className="text-3xl font-bold text-red-500">
            Contraindications and Precautions
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-red-800 bg-red-950/20 p-6">
              <h3 className="text-2xl font-bold text-red-400">
                Do Not Administer
              </h3>

              <ul className="mt-5 space-y-3 text-zinc-300">
                <li>• Known hypersensitivity to tranexamic acid</li>
                <li>• Patients who do not meet protocol criteria</li>
                <li>• Isolated minor trauma without significant bleeding risk</li>
                <li>• Situations specifically excluded by local protocol</li>
              </ul>
            </div>

            <div className="rounded-xl border border-yellow-700 bg-yellow-950/20 p-6">
              <h3 className="text-2xl font-bold text-yellow-400">
                Use Caution
              </h3>

              <ul className="mt-5 space-y-3 text-zinc-300">
                <li>• Known history of thromboembolic disease</li>
                <li>• Suspected active intravascular clotting</li>
                <li>• Significant renal impairment</li>
                <li>• Uncertainty regarding the cause of bleeding</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Clinical Pearls */}
        <div className="mt-10 rounded-2xl border border-blue-700 bg-blue-950/20 p-8">
          <h2 className="text-3xl font-bold text-blue-400">
            Clinical Pearls
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-zinc-900 p-5">
              <h3 className="font-bold text-white">
                TXA Preserves Existing Clots
              </h3>

              <p className="mt-2 leading-7 text-zinc-300">
                TXA does not directly stop bleeding and does not replace direct
                pressure, tourniquets, wound packing, pelvic stabilization, or
                surgical hemorrhage control.
              </p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-5">
              <h3 className="font-bold text-white">
                Early Recognition Matters
              </h3>

              <p className="mt-2 leading-7 text-zinc-300">
                Look beyond a single blood-pressure reading. Consider mechanism,
                mental status, skin signs, heart rate, shock index, and suspected
                internal bleeding.
              </p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-5">
              <h3 className="font-bold text-white">
                Do Not Delay Transport
              </h3>

              <p className="mt-2 leading-7 text-zinc-300">
                TXA should be administered while definitive transport and trauma
                or obstetrical-center notification continue.
              </p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-5">
              <h3 className="font-bold text-white">
                Document Thoroughly
              </h3>

              <p className="mt-2 leading-7 text-zinc-300">
                Document the indication, dose, route, administration time,
                patient response, reassessment findings, and medical-control
                contact when applicable.
              </p>
            </div>
          </div>
        </div>

        {/* Knowledge Check */}
        <div className="mt-10 rounded-2xl border border-green-700 bg-green-950/20 p-8">
          <h2 className="text-3xl font-bold text-green-400">
            Knowledge Check
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            A 42-year-old adult is involved in a high-speed motor-vehicle crash.
            The patient is pale and diaphoretic, has a heart rate of 126 beats
            per minute, a systolic blood pressure of 84 mmHg, and suspected
            internal bleeding.
          </p>

          <div className="mt-6 rounded-xl bg-zinc-900 p-6">
            <p className="font-bold text-white">
              Does this patient meet the general criteria for TXA consideration?
            </p>

            <p className="mt-3 leading-7 text-zinc-300">
              Yes. This patient has multisystem trauma, hypotension, tachycardia,
              and a high risk for significant hemorrhage. The provider should
              continue hemorrhage control, resuscitation, rapid transport, and
              administer TXA according to the current Massachusetts protocol and
              local authorization.
            </p>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="mt-10 rounded-2xl border border-red-700 bg-gradient-to-br from-red-950/30 to-zinc-900 p-8">
          <h2 className="text-3xl font-bold text-red-400">
            Key Takeaways
          </h2>

          <ul className="mt-6 space-y-4 text-lg text-zinc-300">
            <li>• TXA helps prevent the premature breakdown of existing clots.</li>
            <li>• Adult multisystem-trauma dosing is 2 g slow IV push.</li>
            <li>• Obstetrical hemorrhage dosing is 2 g slow IV push.</li>
            <li>• TXA should never delay transport or definitive hemorrhage control.</li>
            <li>• Monitor the patient closely and document all reassessments.</li>
            <li>• Always follow current statewide and local protocols.</li>
          </ul>
        </div>

        {/* Course Completion */}
        <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Course Complete
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Ready to Test Your Knowledge?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-zinc-300">
            Complete the TXA Administration quiz and earn a printable course
            certificate after achieving the required passing score.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/courses/txa-administration/quiz"
              className="rounded-xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
            >
              Start TXA Quiz
            </Link>

            <Link
              href="/courses"
              className="rounded-xl border border-zinc-600 px-7 py-4 font-bold transition hover:border-red-500 hover:text-red-400"
            >
              Return to Courses
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-sm leading-6 text-zinc-500">
          This course is provided for education and protocol review. Always
          follow the most current Massachusetts Statewide Treatment Protocols,
          local service policies, manufacturer instructions, medical-control
          direction, and your authorized scope of practice.
        </div>
      </section>
    </main>
  );
}