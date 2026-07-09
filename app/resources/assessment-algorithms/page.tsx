import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function AssessmentAlgorithmsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-8 py-10">
        <Link href="/resources" className="text-sm font-semibold text-red-500">
          ← Back to Resources
        </Link>

        <h1 className="mt-8 text-5xl font-extrabold">
          XABC, ABC & MARCH
        </h1>

        <p className="mt-3 text-zinc-400">
          Visual EMS assessment algorithms for trauma and patient assessment.
        </p>

        <div className="mt-10 grid gap-8">
          <AlgorithmImage
            title="XABC"
            image="/images/XABC.png"
            description="Use XABC when life-threatening external hemorrhage must be controlled before airway, breathing, and circulation."
          />

          <AlgorithmImage
            title="ABC"
            image="/images/abc.png"
            description="Use ABC for standard patient assessment: airway, breathing, and circulation."
          />

          <AlgorithmImage
            title="MARCH"
            image="/images/MARCH.png"
            description="Use MARCH for major trauma and tactical-style assessment priorities."
          />
        </div>
      </section>
    </main>
  );
}

function AlgorithmImage({
  title,
  image,
  description,
}: {
  title: string;
  image: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
      <h2 className="text-3xl font-bold text-red-500">{title}</h2>

      <p className="mt-3 text-zinc-400">{description}</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-700 bg-black">
        <Image
          src={image}
          alt={`${title} EMS Algorithm`}
          width={1000}
          height={1000}
          className="h-auto w-full object-contain"
        />
      </div>
    </div>
  );
}