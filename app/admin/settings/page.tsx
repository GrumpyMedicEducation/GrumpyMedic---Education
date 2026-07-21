"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { supabase } from "../../../lib/supabase/client";

type SiteSettings = {
  id: number;
  site_name: string;
  forum_notice: string;
  allow_new_questions: boolean;
  allow_anonymous_questions: boolean;
  maintenance_mode: boolean;
  updated_at: string;
};

const defaultSettings: SiteSettings = {
  id: 1,
  site_name: "GrumpyMedic Education",
  forum_notice:
    "Educational discussion only. Follow current protocols, medical direction, and local policy.",
  allow_new_questions: true,
  allow_anonymous_questions: true,
  maintenance_mode: false,
  updated_at: "",
};

function formatDate(dateValue: string) {
  if (!dateValue) {
    return "Not saved yet";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

type ToggleSettingProps = {
  title: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
  warning?: boolean;
  onChange: (enabled: boolean) => void;
};

function ToggleSetting({
  title,
  description,
  enabled,
  disabled = false,
  warning = false,
  onChange,
}: ToggleSettingProps) {
  return (
    <div
      className={`flex flex-col gap-5 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between ${
        warning
          ? "border-yellow-800 bg-yellow-950/10"
          : "border-zinc-800 bg-zinc-950"
      }`}
    >
      <div className="max-w-3xl">
        <h3
          className={`text-lg font-extrabold ${
            warning ? "text-yellow-400" : "text-white"
          }`}
        >
          {title}
        </h3>

        <p className="mt-2 leading-7 text-zinc-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-8 w-14 shrink-0 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 ${
          enabled
            ? warning
              ? "bg-yellow-500"
              : "bg-red-600"
            : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${
            enabled ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] =
    useState<SiteSettings>(defaultSettings);

  const [savedSettings, setSavedSettings] =
    useState<SiteSettings>(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const loadSettings = useCallback(async () => {
    setLoading(true);
    setPageError("");
    setSuccessMessage("");

    const { data, error } = await supabase
      .from("site_settings")
      .select(
        `
          id,
          site_name,
          forum_notice,
          allow_new_questions,
          allow_anonymous_questions,
          maintenance_mode,
          updated_at
        `,
      )
      .eq("id", 1)
      .single();

    if (error) {
      console.error(
        "Unable to load site settings:",
        error,
      );

      setPageError(
        error.message ||
          "The site settings could not be loaded.",
      );

      setLoading(false);
      return;
    }

    const loadedSettings = data as SiteSettings;

    setSettings(loadedSettings);
    setSavedSettings(loadedSettings);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const hasUnsavedChanges =
    JSON.stringify(settings) !==
    JSON.stringify(savedSettings);

  function updateSetting<K extends keyof SiteSettings>(
    key: K,
    value: SiteSettings[K],
  ) {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));

    setPageError("");
    setSuccessMessage("");
  }

  function resetChanges() {
    setSettings(savedSettings);
    setPageError("");
    setSuccessMessage(
      "Unsaved changes were discarded.",
    );
  }

  async function saveSettings(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setPageError("");
    setSuccessMessage("");

    if (!settings.site_name.trim()) {
      setPageError("The site name cannot be empty.");
      return;
    }

    if (!settings.forum_notice.trim()) {
      setPageError(
        "The forum notice cannot be empty.",
      );
      return;
    }

    setSaving(true);

    const updatedAt = new Date().toISOString();

    const { data, error } = await supabase
      .from("site_settings")
      .update({
        site_name: settings.site_name.trim(),
        forum_notice: settings.forum_notice.trim(),
        allow_new_questions:
          settings.allow_new_questions,
        allow_anonymous_questions:
          settings.allow_anonymous_questions,
        maintenance_mode:
          settings.maintenance_mode,
        updated_at: updatedAt,
      })
      .eq("id", 1)
      .select(
        `
          id,
          site_name,
          forum_notice,
          allow_new_questions,
          allow_anonymous_questions,
          maintenance_mode,
          updated_at
        `,
      )
      .single();

    if (error) {
      console.error(
        "Unable to save site settings:",
        error,
      );

      setPageError(
        `The settings could not be saved: ${error.message}`,
      );

      setSaving(false);
      return;
    }

    const updatedSettings = data as SiteSettings;

    setSettings(updatedSettings);
    setSavedSettings(updatedSettings);
    setSuccessMessage(
      "Site settings were saved successfully.",
    );
    setSaving(false);
  }

  return (
    <section>
      <div className="flex flex-col gap-5 border-b border-zinc-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-red-500">
            Administration
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Settings
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
            Manage website identity, forum notices,
            question submissions, anonymous posting, and
            maintenance status.
          </p>
        </div>

        <button
          type="button"
          onClick={loadSettings}
          disabled={loading || saving}
          className="rounded-xl border border-zinc-700 px-5 py-3 font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh Settings"}
        </button>
      </div>

      {pageError && (
        <div className="mt-6 rounded-2xl border border-red-700 bg-red-950/30 p-5 text-red-200">
          <p className="font-bold">Settings Error</p>
          <p className="mt-2">{pageError}</p>
        </div>
      )}

      {successMessage && (
        <div className="mt-6 rounded-2xl border border-green-800 bg-green-950/30 p-5 text-green-300">
          {successMessage}
        </div>
      )}

      {loading ? (
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-12 text-center">
          <p className="text-lg font-bold">
            Loading settings...
          </p>
        </div>
      ) : (
        <form
          onSubmit={saveSettings}
          className="mt-8 space-y-8"
        >
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950">
            <div className="border-b border-zinc-800 p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-red-500">
                Website Identity
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                General Settings
              </h2>
            </div>

            <div className="space-y-6 p-6">
              <div>
                <label
                  htmlFor="siteName"
                  className="block font-bold text-white"
                >
                  Site Name
                </label>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  The public name used for your education
                  platform.
                </p>

                <input
                  id="siteName"
                  type="text"
                  value={settings.site_name}
                  disabled={saving}
                  onChange={(event) =>
                    updateSetting(
                      "site_name",
                      event.target.value,
                    )
                  }
                  className="mt-3 w-full rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-red-600 disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="forumNotice"
                  className="block font-bold text-white"
                >
                  Forum Notice
                </label>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Educational and safety notice shown to
                  Ask GrumpyMedic users.
                </p>

                <textarea
                  id="forumNotice"
                  rows={5}
                  value={settings.forum_notice}
                  disabled={saving}
                  onChange={(event) =>
                    updateSetting(
                      "forum_notice",
                      event.target.value,
                    )
                  }
                  className="mt-3 w-full resize-y rounded-xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition focus:border-red-600 disabled:opacity-50"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="mb-5">
              <p className="text-sm font-bold uppercase tracking-wide text-red-500">
                Forum Controls
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                Ask GrumpyMedic Settings
              </h2>
            </div>

            <div className="space-y-5">
              <ToggleSetting
                title="Allow New Questions"
                description="When enabled, users may submit new questions to Ask GrumpyMedic. Turning this off will preserve existing discussions while preventing new submissions."
                enabled={
                  settings.allow_new_questions
                }
                disabled={saving}
                onChange={(enabled) =>
                  updateSetting(
                    "allow_new_questions",
                    enabled,
                  )
                }
              />

              <ToggleSetting
                title="Allow Anonymous Questions"
                description="When enabled, users may hide their display name when submitting a question. Protected patient information must still never be posted."
                enabled={
                  settings.allow_anonymous_questions
                }
                disabled={
                  saving ||
                  !settings.allow_new_questions
                }
                onChange={(enabled) =>
                  updateSetting(
                    "allow_anonymous_questions",
                    enabled,
                  )
                }
              />

              <ToggleSetting
                title="Maintenance Mode"
                description="Use maintenance mode when performing major updates. This setting is stored now and can be connected to a public maintenance screen."
                enabled={settings.maintenance_mode}
                disabled={saving}
                warning
                onChange={(enabled) =>
                  updateSetting(
                    "maintenance_mode",
                    enabled,
                  )
                }
              />
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-bold text-white">
                  Settings Status
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  Last saved:{" "}
                  {formatDate(settings.updated_at)}
                </p>

                {hasUnsavedChanges && (
                  <p className="mt-2 text-sm font-bold text-yellow-400">
                    You have unsaved changes.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetChanges}
                  disabled={
                    saving || !hasUnsavedChanges
                  }
                  className="rounded-xl border border-zinc-700 px-6 py-3 font-bold text-zinc-300 transition hover:border-red-600 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Discard Changes
                </button>

                <button
                  type="submit"
                  disabled={
                    saving || !hasUnsavedChanges
                  }
                  className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-950 disabled:text-red-400"
                >
                  {saving
                    ? "Saving..."
                    : "Save Settings"}
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-yellow-800 bg-yellow-950/10 p-6">
            <p className="font-bold text-yellow-400">
              Important
            </p>

            <p className="mt-3 leading-7 text-zinc-300">
              This page now stores your settings in
              Supabase. The next step will be connecting
              these settings to the public Ask
              GrumpyMedic page so the question and
              anonymous-posting controls are enforced.
            </p>
          </section>
        </form>
      )}
    </section>
  );
}