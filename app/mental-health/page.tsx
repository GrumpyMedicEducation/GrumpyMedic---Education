import Navbar from "../components/Navbar";

export default function MentalHealthPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-900 text-white p-8">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold text-red-500 mb-6">
            Mental Health Awareness
          </h1>

          <p className="text-zinc-300 text-lg mb-10">
            Mental health is just as important as physical health. This section
            provides educational resources for EMS providers, firefighters,
            healthcare professionals, patients, and families.
          </p>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="bg-zinc-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-3">
                Mental Health Crisis
              </h2>

              <ul className="space-y-2">
                <li>• Depression</li>
                <li>• Anxiety</li>
                <li>• Suicidal Ideation</li>
                <li>• Behavioral Emergencies</li>
                <li>• Psychosis</li>
                <li>• Panic Attacks</li>
              </ul>
            </div>

            <div className="bg-zinc-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-3">
                EMS Assessment
              </h2>

              <ul className="space-y-2">
                <li>• Scene Safety</li>
                <li>• ABCs</li>
                <li>• Rule Out Medical Causes</li>
                <li>• Suicide Risk Assessment</li>
                <li>• Capacity Evaluation</li>
              </ul>
            </div>

            <div className="bg-zinc-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-3">
                Crisis Intervention
              </h2>

              <ul className="space-y-2">
                <li>• Verbal De-escalation</li>
                <li>• Active Listening</li>
                <li>• Crisis Communication</li>
                <li>• Law Enforcement Coordination</li>
                <li>• Safe Patient Transport</li>
              </ul>
            </div>

            <div className="bg-zinc-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-3">
                First Responder Wellness
              </h2>

              <ul className="space-y-2">
                <li>• PTSD Awareness</li>
                <li>• Burnout</li>
                <li>• Compassion Fatigue</li>
                <li>• Peer Support</li>
                <li>• Sleep & Recovery</li>
              </ul>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}