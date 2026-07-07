export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold">Courses</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="text-2xl font-semibold">Cardiology</h2>
          <p className="mt-2 text-gray-400">
            ECG interpretation, STEMI, dysrhythmias, ACLS review.
          </p>
          <button className="mt-4 rounded bg-red-600 px-4 py-2 hover:bg-red-700">
            Start Course
          </button>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="text-2xl font-semibold">Trauma</h2>
          <p className="mt-2 text-gray-400">
            Shock, bleeding, TXA, chest trauma, burns.
          </p>
          <button className="mt-4 rounded bg-red-600 px-4 py-2 hover:bg-red-700">
            Start Course
          </button>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
          <h2 className="text-2xl font-semibold">Airway</h2>
          <p className="mt-2 text-gray-400">
            BLS and ALS airway management, RSI, capnography.
          </p>
          <button className="mt-4 rounded bg-red-600 px-4 py-2 hover:bg-red-700">
            Start Course
          </button>
        </div>
      </div>
    </main>
  );
}