import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/grumpy-medic-logo.jpeg"
            alt="GrumpyMedic24 Logo"
            width={75}
            height={75}
            className="rounded-full object-cover"
            priority
          />

          <div>
            <div className="text-2xl font-extrabold text-red-500">
              GrumpyMedic Education
            </div>
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Real EMS. Real Critical Thinking.
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-6 text-sm font-semibold text-zinc-200">
          <Link href="/" className="hover:text-red-500">
            Home
          </Link>

          <Link href="/courses" className="hover:text-red-500">
            Courses
          </Link>

          <Link href="/scenarios/acute-pulmonary-edema" className="hover:text-red-500">
  Scenarios
</Link>

          <Link href="/courses/acute-pulmonary-edema/quiz" className="hover:text-red-500">
            Quizzes
          </Link>

          <Link href="#" className="rounded-lg border border-red-600 px-4 py-2 text-red-500 hover:bg-red-600 hover:text-white">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}