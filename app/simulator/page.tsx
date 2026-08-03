import Link from "next/link";
import Navbar from "../components/Navbar";

type SimulatorCardProps = {
  title: string;
  description: string;
  href?: string;
  available?: boolean;
  features: string[];
};

export default function SimulatorPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            EMS Call Simulator
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
            Work through interactive EMS calls, make clinical decisions,
            receive immediate feedback, and compare your treatment plan with
            recommended prehospital care.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <SimulatorCard
            title="Acute Pulmonary Edema"
            description="Manage a patient with severe respiratory distress while evaluating CPAP, nitroglycerin, reassessment, and transport decisions."
            href="/simulator/acute-pulmonary-edema"
            available
            features={[
              "Primary assessment",
              "CPAP decision-making",
              "Nitroglycerin considerations",
              "Patient reassessment",
            ]}
          />

          <SimulatorCard
            title="Stroke"
            description="Identify an acute stroke, calculate the FAST-ED score, recognize a possible large-vessel occlusion, and make transport decisions."
            href="/simulator/stroke"
            available
            features={[
              "Last-known-well time",
              "Stroke-mimic assessment",
              "FAST-ED scoring",
              "Stroke alert and destination",
            ]}
          />

          <SimulatorCard
            title="Chest Pain"
            description="Evaluate a patient with possible acute coronary syndrome and make treatment and transport decisions."
            features={[
              "12-lead interpretation",
              "Aspirin administration",
              "Nitroglycerin considerations",
              "STEMI activation",
            ]}
          />

          <SimulatorCard
            title="Trauma"
            description="Manage a seriously injured patient using a structured trauma assessment and rapid transport priorities."
            features={[
              "Primary trauma survey",
              "Hemorrhage control",
              "Shock recognition",
              "Trauma-center destination",
            ]}
          />
        </div>

        <div className="mt-10 rounded-2xl border border-yellow-700/40 bg-yellow-950/20 p-5 text-sm leading-6 text-yellow-100">
          <strong>Training use only:</strong> These simulations do not replace
          current Massachusetts OEMS protocols, medical-control direction,
          regional plans, or local service policies.
        </div>
      </section>
    </main>
  );
}

function SimulatorCard({
  title,
  description,
  href,
  available = false,
  features,
}: SimulatorCardProps) {
  if (available && href) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition duration-200 hover:-translate-y-1 hover:border-red-500 hover:bg-zinc-800"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>

          <span className="shrink-0 rounded-full border border-green-700 bg-green-950/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-400">
            Available
          </span>
        </div>

        <p className="mt-4 leading-7 text-zinc-400">{description}</p>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
            Simulator Includes
          </p>

          <ul className="mt-3 space-y-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-zinc-300"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-7">
          <span className="inline-flex rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition group-hover:bg-red-500">
            Start Call →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-900 p-6 opacity-75">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        <span className="shrink-0 rounded-full border border-zinc-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-500">
          Coming Soon
        </span>
      </div>

      <p className="mt-4 leading-7 text-zinc-400">{description}</p>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
          Planned Content
        </p>

        <ul className="mt-3 space-y-2">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-zinc-400"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-7">
        <span className="inline-flex rounded-xl border border-zinc-700 px-5 py-3 font-bold text-zinc-500">
          Coming Soon
        </span>
      </div>
    </div>
  );
}