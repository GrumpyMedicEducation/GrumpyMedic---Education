import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-8 py-5 flex justify-between items-center">
      <Link
        href="/"
        className="text-2xl font-bold text-red-500 hover:text-red-400"
      >
        GrumpyMedic Education
      </Link>

      <div className="flex gap-6 text-white">
        <Link href="/" className="hover:text-red-400">
          Home
        </Link>

        <Link href="/courses" className="hover:text-red-400">
          Courses
        </Link>

        <Link href="#" className="hover:text-red-400">
          Scenarios
        </Link>

        <Link href="#" className="hover:text-red-400">
          Quizzes
        </Link>

        <Link href="#" className="hover:text-red-400">
          Login
        </Link>
      </div>
    </nav>
  );
}