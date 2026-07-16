import Link from "next/link";
import Navbar from "../../../components/Navbar";

export default function BLSAirwayCertificatePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          GrumpyMedic Education
        </p>

        <h1 className="mt-4 text-4xl font-extrabold">
          BLS Airway & Capnography Certificate
        </h1>

        <p className="mt-5 text-lg text-zinc-300">
          Complete the course quiz with a passing score to receive your
          certificate.
        </p>

        <Link
          href="/courses/bls-airway-capnography/quiz"
          className="mt-8 inline-block rounded-xl bg-red-600 px-7 py-4 font-bold hover:bg-red-500"
        >
          Take the Quiz
        </Link>
      </section>
    </main>
  );
}