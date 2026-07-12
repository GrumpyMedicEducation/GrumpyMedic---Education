"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase/client";

export default function SignupForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [providerLevel, setProviderLevel] = useState("EMT");
  const [organization, setOrganization] = useState("");
  const [state, setState] = useState("Massachusetts");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setSuccess(false);

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("The passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          provider_level: providerLevel,
          organization: organization.trim(),
          state,
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setSuccess(true);
    setMessage(
      "Account created. Check your email for the confirmation link, then return to the login page."
    );
    setLoading(false);
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-zinc-700 bg-zinc-900 p-8 shadow-2xl">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
          GrumpyMedic Education
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-white">
          Create Your Account
        </h1>

        <p className="mt-3 text-zinc-400">
          Build your learner profile and track courses, scores, and certificates.
        </p>
      </div>

      <form onSubmit={handleSignup} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-semibold text-zinc-300"
          >
            Full name
          </label>

          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
            placeholder="First and last name"
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="providerLevel"
              className="mb-2 block text-sm font-semibold text-zinc-300"
            >
              Provider level
            </label>

            <select
              id="providerLevel"
              value={providerLevel}
              onChange={(event) => setProviderLevel(event.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
            >
              <option>EMR</option>
              <option>EMT</option>
              <option>AEMT</option>
              <option>Paramedic</option>
              <option>Firefighter</option>
              <option>Nurse</option>
              <option>Physician</option>
              <option>Student</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="state"
              className="mb-2 block text-sm font-semibold text-zinc-300"
            >
              State
            </label>

            <select
              id="state"
              value={state}
              onChange={(event) => setState(event.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
            >
              <option>Massachusetts</option>
              <option>New Hampshire</option>
              <option>Maine</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="organization"
            className="mb-2 block text-sm font-semibold text-zinc-300"
          >
            Department or organization
          </label>

          <input
            id="organization"
            type="text"
            value={organization}
            onChange={(event) => setOrganization(event.target.value)}
            placeholder="Optional"
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="signupEmail"
            className="mb-2 block text-sm font-semibold text-zinc-300"
          >
            Email address
          </label>

          <input
            id="signupEmail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="signupPassword"
              className="mb-2 block text-sm font-semibold text-zinc-300"
            >
              Password
            </label>

            <input
              id="signupPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-zinc-300"
            >
              Confirm password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="Repeat your password"
              className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-500"
            />
          </div>
        </div>

        {message && (
          <div
            className={`rounded-xl border p-4 text-sm ${
              success
                ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                : "border-red-500/60 bg-red-500/10 text-red-300"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-xl px-6 py-3 font-bold text-white transition ${
            loading
              ? "cursor-not-allowed bg-zinc-700"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-red-500 hover:text-red-400"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}