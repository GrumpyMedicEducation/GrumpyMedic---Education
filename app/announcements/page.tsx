import Link from "next/link";
import Navbar from "../components/Navbar";

type AnnouncementCardProps = {
  href: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  effectiveDate?: string;
  important?: boolean;
  available?: boolean;
};

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            EMS Announcements
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            Important EMS protocol updates, training notices, course releases,
            continuing-education announcements, and statewide information.
          </p>

          <div className="mt-8 rounded-2xl border border-red-600 bg-red-950/30 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400">
                  Important Massachusetts Update
                </p>

                <h2 className="mt-2 text-2xl font-extrabold">
                  2026.2 Statewide Treatment Protocols
                </h2>

                <p className="mt-3 max-w-3xl leading-7 text-zinc-300">
                  All Massachusetts ambulance and EFR services must complete
                  training and implement the updated protocols no later than
                  August 17, 2026.
                </p>
              </div>

              <Link
                href="/announcements/massachusetts-2026-2-protocol-update"
                className="shrink-0 rounded-xl bg-red-600 px-6 py-4 text-center font-bold transition hover:bg-red-500"
              >
                Read Update →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Latest Information
            </p>

            <h2 className="mt-2 text-3xl font-extrabold">
              Current Announcements
            </h2>
          </div>

          <Link
            href="/resources/protocols"
            className="font-bold text-red-400 transition hover:text-red-300"
          >
            View State Protocol Resources →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <AnnouncementCard
            href="/announcements/massachusetts-2026-2-protocol-update"
            title="Massachusetts 2026.2 Protocol Update"
            summary="Review the updated scope-of-practice provisions, medication changes, CPAP revisions, TXA updates, burn-fluid clarification, and statewide training requirements."
            category="Massachusetts OEMS"
            date="July 2, 2026"
            effectiveDate="Mandatory August 17, 2026"
            important
          />

          <AnnouncementCard
            href="/resources/protocols"
            title="Massachusetts, New Hampshire, and Maine EMS Protocols"
            summary="Access the current statewide treatment and patient-care protocol resources for Massachusetts, New Hampshire, and Maine."
            category="Protocol Resources"
            date="Updated July 2026"
          />

          <AnnouncementCard
            href="#"
            title="New Hampshire EMS Updates"
            summary="Future New Hampshire protocol revisions, training notices, and implementation information will be posted here."
            category="New Hampshire EMS"
            date="Coming soon"
            available={false}
          />

          <AnnouncementCard
            href="#"
            title="Maine EMS Updates"
            summary="Future Maine protocol revisions, training notices, and implementation information will be posted here."
            category="Maine EMS"
            date="Coming soon"
            available={false}
          />
        </div>

        <section className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Announcement Categories
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            What Will Be Posted Here?
          </h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <CategoryCard
              title="Protocol Updates"
              description="Statewide treatment-protocol revisions, effective dates, and implementation requirements."
            />

            <CategoryCard
              title="Training Notices"
              description="Required training, continuing-education opportunities, and EMS education events."
            />

            <CategoryCard
              title="New Course Releases"
              description="Announcements when new GrumpyMedic courses, quizzes, and certificates become available."
            />

            <CategoryCard
              title="Simulator Updates"
              description="New interactive scenarios, call simulators, and major feature releases."
            />

            <CategoryCard
              title="State EMS Notices"
              description="Important notices from Massachusetts, New Hampshire, Maine, and other EMS agencies."
            />

            <CategoryCard
              title="Website Updates"
              description="New references, calculators, assessment tools, and improvements to the website."
            />
          </div>
        </section>

        <div className="mt-10 rounded-xl border border-yellow-700 bg-yellow-950/20 p-5 text-sm leading-6 text-zinc-300">
          <p className="font-bold text-yellow-400">
            Important
          </p>

          <p className="mt-2">
            Announcement summaries are provided for education and convenience.
            EMS personnel and services should always review the complete
            official source documents and follow current statewide protocols,
            local policies, medical-control direction, and authorized scope of
            practice.
          </p>
        </div>
      </section>
    </main>
  );
}

function AnnouncementCard({
  href,
  title,
  summary,
  category,
  date,
  effectiveDate,
  important = false,
  available = true,
}: AnnouncementCardProps) {
  const content = (
    <article
      className={`h-full rounded-2xl border p-7 transition ${
        available
          ? important
            ? "border-red-600 bg-red-950/20 hover:bg-red-950/30"
            : "border-zinc-700 bg-zinc-900 hover:border-red-500 hover:bg-zinc-800"
          : "border-zinc-800 bg-zinc-900/60 opacity-70"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            important
              ? "border-red-700 bg-red-950/40 text-red-300"
              : "border-zinc-700 bg-black text-zinc-300"
          }`}
        >
          {category}
        </span>

        {important && (
          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Important
          </span>
        )}
      </div>

      <h3 className="mt-5 text-2xl font-extrabold text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-zinc-300">
        {summary}
      </p>

      <div className="mt-6 border-t border-zinc-800 pt-5">
        <p className="text-sm font-semibold text-zinc-400">
          Published: {date}
        </p>

        {effectiveDate && (
          <p className="mt-2 text-sm font-bold text-red-400">
            {effectiveDate}
          </p>
        )}
      </div>

      <div className="mt-6">
        {available ? (
          <span className="inline-flex rounded-lg bg-red-600 px-4 py-2 font-bold text-white">
            Read Announcement →
          </span>
        ) : (
          <span className="inline-flex rounded-lg bg-zinc-800 px-4 py-2 font-semibold text-zinc-500">
            Coming Soon
          </span>
        )}
      </div>
    </article>
  );

  if (!available) {
    return content;
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}

function CategoryCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black p-5">
      <h3 className="text-xl font-bold text-red-500">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-400">
        {description}
      </p>
    </div>
  );
}