import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-8 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/grumpymedic-logo.jpeg"
            alt="GrumpyMedic24 Logo"
            width={55}
            height={55}
            className="rounded-full"
            priority
          />

          <span className="text-2xl font-bold text-red-500">
            GrumpyMedic Education
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-white font-medium">

          <Link
            href="/"
            className="hover:text-red-500 transition"
          >
            Home
          </Link>

          <Link
            href="/courses"
            className="hover:text-red-500 transition"
          >
            Courses
          </Link>

          <Link
            href="#"
            className="hover:text-red-500 transition"
          >
            Scenarios
          </Link>

          <Link
            href="#"
            className="hover:text-red-500 transition"
          >
            Quizzes
          </Link>

          <Link
            href="#"
            className="hover:text-red-500 transition"
          >
            Login
          </Link>

        </div>
      </div>
    </nav>
  );
}