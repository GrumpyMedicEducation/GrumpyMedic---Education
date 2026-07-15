import Link from "next/link";
import Navbar from "../../../components/Navbar";

export default function HyperthermiaCertificatePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-2xl border border-red-600 bg-zinc-900 p-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            GrumpyMedic Education
          </p>

          <h1 className="mt-4 text-4xl font-extrabold">
            Hyperthermia Certificate
          </h1>

          <p className="mt-5 text-zinc-400">
            Complete the Hyperthermia quiz to generate your certificate.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/courses/hyperthermia/quiz"
              className="rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
            >
              Take the Quiz
            </Link>

            <Link
              href="/courses/hyperthermia"
              className="rounded-xl border border-zinc-600 px-6 py-3 font-bold transition hover:border-red-500"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}