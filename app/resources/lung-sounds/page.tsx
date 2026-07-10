import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function LungSoundsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12 text-center">
        <Link
          href="/resources"
          className="block text-left text-sm font-semibold text-red-500 hover:text-red-400"
        >
          ← Back to Resources
        </Link>

        <h1 className="mt-8 text-4xl font-extrabold md:text-5xl">
          Lung Sounds Reference
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          A quick EMS reference for identifying normal and abnormal lung
          sounds and considering possible causes.
        </p>

        <div className="mt-10">
          <Image
            src="/images/lung-sounds-reference.png"
            alt="EMS lung sounds quick reference guide"
            width={625}
            height={900}
            className="mx-auto h-auto w-full max-w-[625px] rounded-2xl border border-zinc-700 bg-white shadow-xl"
          />
        </div>

        <p className="mx-auto mt-6 max-w-[625px] text-sm text-zinc-500">
          Educational reference only. Assess the full clinical presentation and
          follow local protocols and medical-control guidance.
        </p>
      </section>
    </main>
  );
}