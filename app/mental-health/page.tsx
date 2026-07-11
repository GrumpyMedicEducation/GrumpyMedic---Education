export default function MentalHealthPage() {
    return (
      <main className="min-h-screen bg-zinc-900 text-white p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-red-500 mb-6">
            Mental Health Awareness
          </h1>
  
          <p className="text-zinc-300 text-lg mb-8">
            Mental health is just as important as physical health. This section
            provides resources for EMS providers, firefighters, healthcare
            professionals, patients, and families.
          </p>
  
          <div className="grid gap-6 md:grid-cols-2">
  
            <div className="bg-zinc-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-3">
                Mental Health Crisis
              </h2>
              <ul className="space-y-2">
                <li>• Depression</li>
                <li>• Anxiety</li>
                <li>• Suicidal ideation</li>
                <li>• Behavioral emergencies</li>
                <li>• Psychosis</li>
              </ul>
            </div>
  
            <div className="bg-zinc-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-3">
                EMS Assessment
              </h2>
              <ul className="space-y-2">
                <li>• Scene safety</li>
                <li>• ABCs</li>
                <li>• Rule out medical causes</li>
                <li>• Suicide risk assessment</li>
                <li>• Capacity evaluation</li>
              </ul>
            </div>
  
          </div>
        </div>
      </main>
    );
  }