"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import AdminSidebar from "./components/AdminSidebar";
import { supabase } from "../../lib/supabase/client";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const router = useRouter();

  const [checkingAccess, setCheckingAccess] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [accessMessage, setAccessMessage] = useState(
    "Checking administrator access...",
  );

  useEffect(() => {
    let mounted = true;

    async function checkAdminAccess() {
      const adminEmail =
        process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase();

      if (!adminEmail) {
        if (mounted) {
          setAccessMessage(
            "Administrator email is missing from .env.local.",
          );
          setCheckingAccess(false);
        }

        return;
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!mounted) {
        return;
      }

      if (error || !user) {
        router.replace("/login");
        return;
      }

      const userEmail = user.email?.trim().toLowerCase();

      if (userEmail !== adminEmail) {
        setAccessMessage(
          "You are signed in, but this account does not have administrator access.",
        );
        setAuthorized(false);
        setCheckingAccess(false);
        return;
      }

      setAuthorized(true);
      setCheckingAccess(false);
    }

    checkAdminAccess();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.replace("/login");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (checkingAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

          <h1 className="mt-6 text-2xl font-extrabold">
            Admin Access
          </h1>

          <p className="mt-3 text-zinc-400">
            {accessMessage}
          </p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-lg rounded-2xl border border-red-800 bg-zinc-950 p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Access Denied
          </p>

          <h1 className="mt-4 text-3xl font-extrabold">
            Administrator Access Required
          </h1>

          <p className="mt-4 leading-7 text-zinc-300">
            {accessMessage}
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-7 rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
          >
            Return to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[1600px] flex-col lg:flex-row">
        <AdminSidebar />

        <main className="min-w-0 flex-1 bg-black p-5 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}