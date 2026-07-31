"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "../../lib/supabase/client";

type AccessLevel = "login" | "profile";

type CourseAccessGateProps = {
  children: ReactNode;
  accessLevel?: AccessLevel;
  title?: string;
  description?: string;
};

type Profile = {
  full_name: string | null;
  provider_level: string | null;
  department: string | null;
};

function profileIsComplete(profile: Profile | null) {
  return Boolean(
    profile?.full_name?.trim() &&
      profile?.provider_level?.trim() &&
      profile?.department?.trim(),
  );
}

function isMissingSessionError(message?: string) {
  const normalizedMessage = message?.toLowerCase() ?? "";

  return (
    normalizedMessage.includes("auth session missing") ||
    normalizedMessage.includes("session missing") ||
    normalizedMessage.includes("no session")
  );
}

export default function CourseAccessGate({
  children,
  accessLevel = "login",
  title,
  description,
}: CourseAccessGateProps) {
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [profileComplete, setProfileComplete] =
    useState(false);
  const [pageError, setPageError] = useState("");

  const checkAccess = useCallback(async () => {
    setLoading(true);
    setPageError("");

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      if (isMissingSessionError(sessionError.message)) {
        setSignedIn(false);
        setProfileComplete(false);
        setLoading(false);
        return;
      }

      console.error(
        "Unable to verify course session:",
        sessionError,
      );

      setPageError(
        sessionError.message ||
          "Your account session could not be verified.",
      );

      setSignedIn(false);
      setProfileComplete(false);
      setLoading(false);
      return;
    }

    const user = session?.user ?? null;

    if (!user) {
      setSignedIn(false);
      setProfileComplete(false);
      setLoading(false);
      return;
    }

    setSignedIn(true);

    if (accessLevel === "login") {
      setProfileComplete(false);
      setLoading(false);
      return;
    }

    const { data, error: profileError } =
      await supabase
        .from("profiles")
        .select(
          `
            full_name,
            provider_level,
            department
          `,
        )
        .eq("id", user.id)
        .maybeSingle();

    if (profileError) {
      console.error(
        "Unable to verify profile completion:",
        profileError,
      );

      setPageError(
        profileError.message ||
          "Your profile could not be verified.",
      );

      setProfileComplete(false);
      setLoading(false);
      return;
    }

    setProfileComplete(
      profileIsComplete(
        (data ?? null) as Profile | null,
      ),
    );

    setLoading(false);
  }, [accessLevel]);

  useEffect(() => {
    checkAccess();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkAccess();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkAccess]);

  const redirectPath = pathname
    ? encodeURIComponent(pathname)
    : encodeURIComponent("/courses");

  if (loading) {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center text-white">
        <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

        <h2 className="mt-5 text-2xl font-extrabold">
          Checking Course Access
        </h2>

        <p className="mt-3 text-zinc-400">
          Verifying your student account.
        </p>
      </section>
    );
  }

  if (pageError) {
    return (
      <section className="rounded-2xl border border-red-800 bg-red-950/20 p-8 text-center text-white">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          Access Error
        </p>

        <h2 className="mt-4 text-2xl font-extrabold">
          Unable to Verify Access
        </h2>

        <p className="mt-4 leading-7 text-zinc-300">
          {pageError}
        </p>

        <button
          type="button"
          onClick={checkAccess}
          className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-500"
        >
          Try Again
        </button>
      </section>
    );
  }

  if (!signedIn) {
    return (
      <section className="rounded-2xl border border-red-800 bg-gradient-to-br from-red-950/30 to-zinc-950 p-8 text-center text-white">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          Student Login Required
        </p>

        <h2 className="mt-4 text-3xl font-extrabold">
          {title ?? "Sign In to Continue"}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-300">
          {description ??
            "Create a free account or sign in to access the full course, quizzes, saved progress, and student dashboard."}
        </p>

        <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={`/login?redirect=${redirectPath}`}
            className="rounded-xl bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-500"
          >
            Log In
          </Link>

          <Link
            href={`/signup?redirect=${redirectPath}`}
            className="rounded-xl border border-zinc-700 px-7 py-3 font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400"
          >
            Create Account
          </Link>
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          Course previews and public resources remain
          available without an account.
        </p>
      </section>
    );
  }

  if (
    accessLevel === "profile" &&
    !profileComplete
  ) {
    return (
      <section className="rounded-2xl border border-yellow-800 bg-yellow-950/15 p-8 text-center text-white">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">
          Profile Required
        </p>

        <h2 className="mt-4 text-3xl font-extrabold">
          {title ?? "Complete Your Student Profile"}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-300">
          {description ??
            "Your full name, provider level, and department or organization are required before certificates and official education records can be issued."}
        </p>

        <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={`/dashboard/profile?redirect=${redirectPath}`}
            className="rounded-xl bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-500"
          >
            Complete Profile
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-zinc-700 px-7 py-3 font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400"
          >
            Student Dashboard
          </Link>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}