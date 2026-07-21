"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "../../../lib/supabase/client";

type UserRole = "student" | "moderator" | "admin";

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  provider_level: string | null;
  department: string | null;
  role: UserRole;
  created_at: string;
};

function formatDate(dateValue: string) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function displayValue(
  value: string | null,
  fallback = "Not provided",
) {
  const cleanedValue = value?.trim();

  return cleanedValue || fallback;
}

export default function AdminUsersPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [workingUserId, setWorkingUserId] =
    useState("");
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const loadProfiles = useCallback(async () => {
    setLoading(true);
    setPageError("");
    setSuccessMessage("");

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
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Unable to load user profiles:",
        error,
      );

      setPageError(
        error.message ||
          "The users page could not be loaded.",
      );

      setLoading(false);
      return;
    }

    setProfiles((data ?? []) as Profile[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const filteredProfiles = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return profiles.filter((profile) => {
      const searchableValues = [
        profile.email,
        profile.full_name,
        profile.provider_level,
        profile.department,
        profile.role,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableValues.includes(normalizedSearch);

      const matchesRole =
        roleFilter === "all" ||
        profile.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [profiles, roleFilter, searchTerm]);

  function clearMessages() {
    setPageError("");
    setSuccessMessage("");
  }

  async function updateRole(
    profile: Profile,
    newRole: UserRole,
  ) {
    clearMessages();
    setWorkingUserId(profile.id);

    const { error } = await supabase
      .from("profiles")
      .update({
        role: newRole,
      })
      .eq("id", profile.id);

    if (error) {
      console.error(
        "Unable to update user role:",
        error,
      );

      setPageError(
        `The user role could not be updated: ${error.message}`,
      );

      setWorkingUserId("");
      return;
    }

    setProfiles((currentProfiles) =>
      currentProfiles.map((currentProfile) =>
        currentProfile.id === profile.id
          ? {
              ...currentProfile,
              role: newRole,
            }
          : currentProfile,
      ),
    );

    setSuccessMessage(
      `${displayValue(
        profile.full_name,
        profile.email ?? "User",
      )} is now assigned the ${newRole} role.`,
    );

    setWorkingUserId("");
  }

  const totals = {
    all: profiles.length,
    students: profiles.filter(
      (profile) => profile.role === "student",
    ).length,
    moderators: profiles.filter(
      (profile) => profile.role === "moderator",
    ).length,
    admins: profiles.filter(
      (profile) => profile.role === "admin",
    ).length,
  };

  return (
    <section>
      <div className="flex flex-col gap-5 border-b border-zinc-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">
            Account Management
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Users
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
            Review registered accounts, provider
            information, departments, registration dates,
            and administrative roles.
          </p>
        </div>

        <button
          type="button"
          onClick={loadProfiles}
          disabled={loading}
          className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh Users"}
        </button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
            Total Users
          </p>

          <p className="mt-4 text-4xl font-extrabold">
            {loading ? "—" : totals.all}
          </p>
        </article>

        <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
            Students
          </p>

          <p className="mt-4 text-4xl font-extrabold">
            {loading ? "—" : totals.students}
          </p>
        </article>

        <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-zinc-500">
            Moderators
          </p>

          <p className="mt-4 text-4xl font-extrabold">
            {loading ? "—" : totals.moderators}
          </p>
        </article>

        <article className="rounded-2xl border border-red-900 bg-red-950/20 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-red-400">
            Administrators
          </p>

          <p className="mt-4 text-4xl font-extrabold">
            {loading ? "—" : totals.admins}
          </p>
        </article>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div>
          <label
            htmlFor="adminUserSearch"
            className="sr-only"
          >
            Search users
          </label>

          <input
            id="adminUserSearch"
            type="search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search name, email, provider level, or department..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600"
          />
        </div>

        <div>
          <label
            htmlFor="adminRoleFilter"
            className="sr-only"
          >
            Filter by role
          </label>

          <select
            id="adminRoleFilter"
            value={roleFilter}
            onChange={(event) =>
              setRoleFilter(event.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white outline-none transition focus:border-red-600"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="moderator">
              Moderators
            </option>
            <option value="admin">
              Administrators
            </option>
          </select>
        </div>
      </div>

      {pageError && (
        <div className="mt-6 rounded-2xl border border-red-700 bg-red-950/30 p-5 text-red-200">
          <p className="font-bold">
            User Management Error
          </p>

          <p className="mt-2">{pageError}</p>
        </div>
      )}

      {successMessage && (
        <div className="mt-6 rounded-2xl border border-green-800 bg-green-950/30 p-5 text-green-300">
          {successMessage}
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-12 text-center">
            <p className="text-lg font-bold">
              Loading users...
            </p>
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-12 text-center">
            <h2 className="text-2xl font-extrabold">
              No Users Found
            </h2>

            <p className="mt-3 text-zinc-400">
              No registered profiles match the current
              search and role filter.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredProfiles.map((profile) => {
              const isWorking =
                workingUserId === profile.id;

              const displayName = displayValue(
                profile.full_name,
                profile.email ?? "User",
              );

              return (
                <article
                  key={profile.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
                >
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl font-extrabold text-white">
                          {displayName
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <h2 className="text-xl font-extrabold">
                            {displayValue(
                              profile.full_name,
                              "Unnamed User",
                            )}
                          </h2>

                          <p className="mt-1 text-sm text-zinc-400">
                            {displayValue(
                              profile.email,
                              "No email available",
                            )}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                            profile.role === "admin"
                              ? "bg-red-600 text-white"
                              : profile.role ===
                                  "moderator"
                                ? "border border-yellow-700 bg-yellow-950/30 text-yellow-400"
                                : "border border-zinc-700 bg-zinc-900 text-zinc-400"
                          }`}
                        >
                          {profile.role}
                        </span>
                      </div>

                      <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-zinc-800 bg-black p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-zinc-600">
                            Provider Level
                          </p>

                          <p className="mt-2 font-semibold text-zinc-300">
                            {displayValue(
                              profile.provider_level,
                            )}
                          </p>
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-black p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-zinc-600">
                            Department
                          </p>

                          <p className="mt-2 font-semibold text-zinc-300">
                            {displayValue(
                              profile.department,
                            )}
                          </p>
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-black p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-zinc-600">
                            Registered
                          </p>

                          <p className="mt-2 font-semibold text-zinc-300">
                            {formatDate(
                              profile.created_at,
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 xl:w-64">
                      <label
                        htmlFor={`role-${profile.id}`}
                        className="block text-sm font-bold text-zinc-300"
                      >
                        Account Role
                      </label>

                      <select
                        id={`role-${profile.id}`}
                        value={profile.role}
                        disabled={isWorking}
                        onChange={(event) =>
                          updateRole(
                            profile,
                            event.target
                              .value as UserRole,
                          )
                        }
                        className="mt-3 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="student">
                          Student
                        </option>

                        <option value="moderator">
                          Moderator
                        </option>

                        <option value="admin">
                          Administrator
                        </option>
                      </select>

                      {isWorking && (
                        <p className="mt-3 text-sm text-zinc-500">
                          Updating role...
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}