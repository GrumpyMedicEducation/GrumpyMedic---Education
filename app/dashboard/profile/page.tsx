"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { supabase } from "../../../lib/supabase/client";

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  provider_level: string | null;
  department: string | null;
  role: string | null;
  created_at: string | null;
};

const providerLevels = [
  "",
  "EMR",
  "EMT",
  "Advanced EMT",
  "Paramedic",
  "Firefighter/EMT",
  "Firefighter/Paramedic",
  "Nurse",
  "Physician",
  "Dispatcher",
  "Student",
  "Other",
];

function isProfileComplete(profile: Profile | null) {
  return Boolean(
    profile?.full_name?.trim() &&
      profile?.provider_level?.trim() &&
      profile?.department?.trim(),
  );
}

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [fullName, setFullName] = useState("");
  const [providerLevel, setProviderLevel] =
    useState("");
  const [department, setDepartment] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setPageError("");
    setSuccessMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error(
        "Unable to load authenticated user:",
        userError,
      );

      setPageError(
        userError.message ||
          "Your account could not be loaded.",
      );

      setLoading(false);
      return;
    }

    if (!user) {
      router.replace(
        "/login?redirect=/dashboard/profile",
      );
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
          id,
          email,
          full_name,
          provider_level,
          department,
          role,
          created_at
        `,
      )
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error(
        "Unable to load profile:",
        error,
      );

      setPageError(
        error.message ||
          "Your profile could not be loaded.",
      );

      setLoading(false);
      return;
    }

    const loadedProfile: Profile =
      data ??
      ({
        id: user.id,
        email: user.email ?? null,
        full_name: null,
        provider_level: null,
        department: null,
        role: "student",
        created_at: new Date().toISOString(),
      } satisfies Profile);

    setProfile(loadedProfile);
    setFullName(loadedProfile.full_name ?? "");
    setProviderLevel(
      loadedProfile.provider_level ?? "",
    );
    setDepartment(
      loadedProfile.department ?? "",
    );

    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  async function saveProfile(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setPageError("");
    setSuccessMessage("");

    if (!profile) {
      setPageError(
        "Your profile has not finished loading.",
      );
      return;
    }

    if (!fullName.trim()) {
      setPageError(
        "Please enter your full name.",
      );
      return;
    }

    if (!providerLevel.trim()) {
      setPageError(
        "Please select your provider level.",
      );
      return;
    }

    if (!department.trim()) {
      setPageError(
        "Please enter your department, service, school, or organization.",
      );
      return;
    }

    setSaving(true);

    const profileUpdate = {
      id: profile.id,
      email: profile.email,
      full_name: fullName.trim(),
      provider_level: providerLevel.trim(),
      department: department.trim(),
      role: profile.role ?? "student",
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(profileUpdate, {
        onConflict: "id",
      })
      .select(
        `
          id,
          email,
          full_name,
          provider_level,
          department,
          role,
          created_at
        `,
      )
      .single();

    if (error) {
      console.error(
        "Unable to save profile:",
        error,
      );

      setPageError(
        `Your profile could not be saved: ${error.message}`,
      );

      setSaving(false);
      return;
    }

    const savedProfile = data as Profile;

    setProfile(savedProfile);
    setFullName(savedProfile.full_name ?? "");
    setProviderLevel(
      savedProfile.provider_level ?? "",
    );
    setDepartment(
      savedProfile.department ?? "",
    );

    setSuccessMessage(
      "Your profile was saved successfully. You are now eligible for certificates and education records.",
    );

    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600" />

            <h1 className="mt-6 text-2xl font-extrabold">
              Loading Profile
            </h1>

            <p className="mt-3 text-zinc-400">
              Retrieving your student information.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const profileComplete =
    isProfileComplete(profile);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-red-900 bg-gradient-to-b from-red-950/30 to-black">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">
            Student Account
          </p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Complete Your Profile
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-zinc-300">
            Your profile information is used for
            certificates, course records, continuing
            education tracking, and your student
            dashboard.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div
          className={`rounded-2xl border p-6 ${
            profileComplete
              ? "border-green-800 bg-green-950/20"
              : "border-yellow-800 bg-yellow-950/20"
          }`}
        >
          <p
            className={`font-bold ${
              profileComplete
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >
            {profileComplete
              ? "Profile Complete"
              : "Profile Information Required"}
          </p>

          <p className="mt-2 leading-7 text-zinc-300">
            {profileComplete
              ? "Your account is ready for certificates and education records."
              : "Complete all three required fields before printing certificates or receiving official education records."}
          </p>
        </div>

        {pageError && (
          <div className="mt-6 rounded-2xl border border-red-700 bg-red-950/30 p-5 text-red-200">
            <p className="font-bold">
              Profile Error
            </p>

            <p className="mt-2">{pageError}</p>
          </div>
        )}

        {successMessage && (
          <div className="mt-6 rounded-2xl border border-green-800 bg-green-950/30 p-5 text-green-300">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={saveProfile}
          className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8"
        >
          <div>
            <label
              htmlFor="profileEmail"
              className="block font-bold"
            >
              Email Address
            </label>

            <input
              id="profileEmail"
              type="email"
              value={profile?.email ?? ""}
              disabled
              className="mt-3 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-zinc-500"
            />

            <p className="mt-2 text-sm text-zinc-600">
              Your email comes from your authenticated
              account and cannot be changed here.
            </p>
          </div>

          <div className="mt-7">
            <label
              htmlFor="fullName"
              className="block font-bold"
            >
              Full Name
            </label>

            <p className="mt-2 text-sm text-zinc-500">
              Enter your name exactly as it should appear
              on certificates.
            </p>

            <input
              id="fullName"
              type="text"
              value={fullName}
              disabled={saving}
              onChange={(event) =>
                setFullName(event.target.value)
              }
              placeholder="Example: William Howard"
              className="mt-3 w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600 disabled:opacity-50"
            />
          </div>

          <div className="mt-7">
            <label
              htmlFor="providerLevel"
              className="block font-bold"
            >
              Provider Level
            </label>

            <select
              id="providerLevel"
              value={providerLevel}
              disabled={saving}
              onChange={(event) =>
                setProviderLevel(event.target.value)
              }
              className="mt-3 w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-red-600 disabled:opacity-50"
            >
              {providerLevels.map((level) => (
                <option key={level} value={level}>
                  {level || "Select provider level"}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-7">
            <label
              htmlFor="department"
              className="block font-bold"
            >
              Department, Service, School, or Organization
            </label>

            <input
              id="department"
              type="text"
              value={department}
              disabled={saving}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
              placeholder="Example: Merrimac Fire Department"
              className="mt-3 w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600 disabled:opacity-50"
            />
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-zinc-800 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/dashboard"
              className="rounded-xl border border-zinc-700 px-6 py-3 text-center font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400"
            >
              Return to Dashboard
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-900"
            >
              {saving
                ? "Saving Profile..."
                : "Save Profile"}
            </button>
          </div>
        </form>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="font-bold text-red-400">
            How course access will work
          </p>

          <p className="mt-3 leading-7 text-zinc-300">
            Course previews remain public. A login will be
            required for full lessons, quizzes, saved
            progress, and the student dashboard. A
            completed profile will be required for
            certificates and continuing-education records.
          </p>
        </div>
      </div>
    </main>
  );
}