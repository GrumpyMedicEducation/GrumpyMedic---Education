"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  name: string;
  href: string;
  icon: string;
};

const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: "▦",
  },
  {
    name: "Questions",
    href: "/admin/questions",
    icon: "?",
  },
  {
    name: "Replies",
    href: "/admin/replies",
    icon: "↩",
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: "♟",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: "⌁",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: "⚙",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="w-full border-b border-zinc-800 bg-zinc-950 lg:min-h-[calc(100vh-80px)] lg:w-72 lg:border-b-0 lg:border-r">
      <div className="p-6">
        <div className="rounded-2xl border border-red-900 bg-gradient-to-br from-red-950/60 to-black p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-500">
            GrumpyMedic
          </p>

          <h2 className="mt-2 text-xl font-extrabold text-white">
            Admin Control Center
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Manage the forum, users, content, and website activity.
          </p>
        </div>

        <nav className="mt-6 space-y-2" aria-label="Admin navigation">
          {navigationItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 font-semibold transition ${
                  active
                    ? "bg-red-600 text-white shadow-lg shadow-red-950/30"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold ${
                    active
                      ? "bg-white/15 text-white"
                      : "bg-zinc-900 text-red-500"
                  }`}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 border-t border-zinc-800 pt-6">
          <Link
            href="/ask-grumpymedic"
            className="flex items-center gap-3 rounded-xl border border-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-400 transition hover:border-red-800 hover:text-red-400"
          >
            <span aria-hidden="true">←</span>
            Return to Ask GrumpyMedic
          </Link>

          <Link
            href="/"
            className="mt-3 flex items-center gap-3 rounded-xl border border-zinc-800 px-4 py-3 text-sm font-semibold text-zinc-400 transition hover:border-red-800 hover:text-red-400"
          >
            <span aria-hidden="true">⌂</span>
            Return to Website
          </Link>
        </div>
      </div>
    </aside>
  );
}