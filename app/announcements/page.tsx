import Link from "next/link";
import Navbar from "../components/Navbar";

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-5xl font-extrabold text-red-500">
          Announcements
        </h1>

        <p className="mt-4 text-zinc-400">
          Important EMS protocol updates, training information, and educational
          announcements.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            href="/announcements/massachusetts-2026-2-protocol-update"
            className="block rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full border border-red-500 px-3 py-1 text-sm font-semibold text-red-500">
                Protocol Update
              </span>

              <span className="text-sm text-zinc-500">
                August 2, 2026
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-red-500">
              Massachusetts Statewide Treatment Protocols Version 2026.2
            </h2>

            <p className="mt-3 text-zinc-400">
              Review the major medication, scope-of-practice, cardiac,
              respiratory, trauma, obstetrical, and ambulance equipment changes
              included in the Massachusetts EMS Statewide Treatment Protocols
              Version 2026.2.
            </p>

            <p className="mt-5 font-semibold text-white">
              Read full announcement →
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}