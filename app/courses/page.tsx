export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-6">Courses</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700">
          <h2 className="text-2xl font-semibold">Cardiology</h2>
          <p className="mt-2 text-gray-400">
            ECG interpretation, STEMI, dysrhythmias, ACLS review.
          </p>
          <button className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-700">
            Start Course
          </button>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700">
          <h2 className="text-2xl font-semibold">Trauma</h2>
          <p className="mt-2 text-gray-400">
            Shock, bleeding, TXA, chest trauma, burns.
          </p>
          <button className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-700">
            Start Course
          </button>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700">
          <h2 className="text-2xl font-semibold">Airway</h2>
          <p className="mt-2 text-gray-400">
            BLS & ALS airway management, RSI, capnography.
          </p>
          <button className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-700">
            Start Course
          </button>
        </div>

      </div>
    </main>
  );
}