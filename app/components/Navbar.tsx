"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";

const navigationLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Scenarios",
    href: "/scenarios",
  },
  {
    name: "Call Simulator",
    href: "/simulator",
  },
  {
    name: "Quizzes",
    href: "/quizzes",
  },
  {
    name: "Resources",
    href: "/resources",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setLoggedIn(Boolean(session));
      setCheckingSession(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(Boolean(session));
      setCheckingSession(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  function linkIsActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    setLoggedIn(false);
    setMobileMenuOpen(false);

    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="GrumpyMedic Education home"
        >
          <Image
            src="/grumpy-medic-logo.jpeg"
            alt="GrumpyMedic Education logo"
            width={56}
            height={56}
            priority
            className="h-12 w-12 shrink-0 rounded-full border border-red-600 object-cover sm:h-14 sm:w-14"
          />

          <div className="min-w-0">
            <p className="truncate text-base font-extrabold text-red-500 sm:text-xl">
              GrumpyMedic Education
            </p>

            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-300 sm:block">
              Real EMS. Real Critical Thinking.
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {navigationLinks.map((link) => {
            const active = linkIsActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition ${
                  active
                    ? "text-red-500"
                    : "text-zinc-200 hover:text-red-500"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!checkingSession &&
            (loggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${
                    linkIsActive("/dashboard")
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-red-600 text-red-500 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border border-zinc-600 px-4 py-2 text-sm font-bold text-white transition hover:border-red-600 hover:bg-red-600"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-xl border border-red-600 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-600 hover:text-white"
              >
                Login
              </Link>
            ))}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((current) => !current)}
          className="rounded-lg border border-zinc-700 p-2 text-white transition hover:border-red-500 hover:text-red-500 xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-zinc-800 bg-black px-4 py-5 xl:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {navigationLinks.map((link) => {
              const active = linkIsActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-3 font-semibold transition ${
                    active
                      ? "bg-red-600 text-white"
                      : "text-zinc-200 hover:bg-zinc-900 hover:text-red-500"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {!checkingSession &&
              (loggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="mt-2 rounded-lg border border-red-600 px-4 py-3 font-bold text-red-500 transition hover:bg-red-600 hover:text-white"
                  >
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg border border-zinc-600 px-4 py-3 text-left font-bold text-white transition hover:border-red-600 hover:bg-red-600"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="mt-2 rounded-lg border border-red-600 px-4 py-3 font-bold text-red-500 transition hover:bg-red-600 hover:text-white"
                >
                  Login
                </Link>
              ))}
          </nav>
        </div>
      )}
    </header>
  );
}