"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-8 shadow-xl">
      <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.3em] text-red-500">
        GRUMPYMEDIC EDUCATION
      </p>

      <h1 className="mb-2 text-center text-3xl font-bold text-white">
        Welcome Back
      </h1>

      <p className="mb-8 text-center text-zinc-400">
        Log in to continue your EMS education.
      </p>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Email Address
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-red-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Password
          </label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-red-500"
            placeholder="Password"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-900/40 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 py-3 font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-bold text-red-500 hover:text-red-400"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}