"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase/client";

type CourseEngagementTrackerProps = {
  courseSlug?: string;
  courseTitle?: string;
  requiredMinutes?: number;
  onEligibilityChange?: (result: {
    activeSeconds: number;
    requiredSeconds: number;
    timeRequirementMet: boolean;
  }) => void;
};

type EngagementHeartbeatRow = {
  enrollment_id: string;
  total_active_seconds: number;
  required_active_seconds: number;
  time_requirement_met: boolean;
};

type SyncState = "idle" | "saving" | "saved" | "error";

const IDLE_LIMIT_MS = 3 * 60 * 1000;
const HEARTBEAT_INTERVAL_MS = 15 * 1000;
const LOCAL_DISPLAY_INTERVAL_MS = 1000;

export default function CourseEngagementTracker({
  courseSlug = "acute-pulmonary-edema",
  courseTitle = "Acute Pulmonary Edema",
  requiredMinutes = 30,
  onEligibilityChange,
}: CourseEngagementTrackerProps) {
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [requiredSeconds, setRequiredSeconds] = useState(
    requiredMinutes * 60,
  );
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [syncError, setSyncError] = useState("");

  const lastActivityRef = useRef(Date.now());
  const pausedRef = useRef(false);
  const signedInRef = useRef(false);
  const activeSecondsRef = useRef(0);
  const requiredSecondsRef = useRef(requiredMinutes * 60);
  const heartbeatRunningRef = useRef(false);
  const serverRequirementMetRef = useRef(false);

  const completedRequiredTime =
    serverRequirementMetRef.current ||
    activeSeconds >= requiredSeconds;

  const formatTime = useCallback((totalSeconds: number) => {
    const safeSeconds = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const seconds = safeSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const applyServerProgress = useCallback(
    (row: EngagementHeartbeatRow) => {
      const serverSeconds = Math.max(
        0,
        Number(row.total_active_seconds ?? 0),
      );

      const serverRequiredSeconds = Math.max(
        1,
        Number(
          row.required_active_seconds ??
            requiredMinutes * 60,
        ),
      );

      const timeRequirementMet =
        Boolean(row.time_requirement_met) ||
        serverSeconds >= serverRequiredSeconds;

      activeSecondsRef.current = serverSeconds;
      requiredSecondsRef.current = serverRequiredSeconds;
      serverRequirementMetRef.current =
        timeRequirementMet;

      setActiveSeconds(serverSeconds);
      setRequiredSeconds(serverRequiredSeconds);

      onEligibilityChange?.({
        activeSeconds: serverSeconds,
        requiredSeconds: serverRequiredSeconds,
        timeRequirementMet,
      });
    },
    [onEligibilityChange, requiredMinutes],
  );

  const recordHeartbeat = useCallback(async () => {
    if (
      !signedInRef.current ||
      pausedRef.current ||
      document.hidden ||
      heartbeatRunningRef.current ||
      serverRequirementMetRef.current
    ) {
      return;
    }

    heartbeatRunningRef.current = true;
    setSyncState("saving");
    setSyncError("");

    try {
      const { data, error } = await supabase.rpc(
        "record_course_engagement",
        {
          requested_course_slug: courseSlug,
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      const row = Array.isArray(data)
        ? data[0]
        : data;

      if (!row) {
        throw new Error(
          "The engagement heartbeat returned no progress record.",
        );
      }

      applyServerProgress(
        row as unknown as EngagementHeartbeatRow,
      );

      setSyncState("saved");
    } catch (error) {
      console.error(
        "Unable to record course engagement:",
        error,
      );

      setSyncError(
        error instanceof Error
          ? error.message
          : "Course engagement could not be saved.",
      );

      setSyncState("error");
    } finally {
      heartbeatRunningRef.current = false;
    }
  }, [applyServerProgress, courseSlug]);

  const resetHeartbeat = useCallback(async () => {
    if (!signedInRef.current) {
      return;
    }

    try {
      const { error } = await supabase.rpc(
        "reset_course_engagement_heartbeat",
        {
          requested_course_slug: courseSlug,
        },
      );

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error(
        "Unable to reset course heartbeat:",
        error,
      );
    }
  }, [courseSlug]);

  const initializeTracker = useCallback(async () => {
    setIsLoaded(false);
    setSyncError("");

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error(sessionError.message);
      }

      const signedIn = Boolean(session?.user);
      signedInRef.current = signedIn;
      setIsSignedIn(signedIn);

      if (!signedIn) {
        activeSecondsRef.current = 0;
        setActiveSeconds(0);
        setIsLoaded(true);
        return;
      }

      /*
        The first call establishes or refreshes the server heartbeat.
        It does not grant the full course time; the database only
        credits the small elapsed interval between valid heartbeats.
      */
      await resetHeartbeat();
      await recordHeartbeat();
    } catch (error) {
      console.error(
        "Unable to initialize engagement tracking:",
        error,
      );

      setSyncError(
        error instanceof Error
          ? error.message
          : "Course engagement could not be initialized.",
      );

      setSyncState("error");
    } finally {
      setIsLoaded(true);
    }
  }, [recordHeartbeat, resetHeartbeat]);

  const recordActivity = useCallback(() => {
    if (pausedRef.current) {
      return;
    }

    lastActivityRef.current = Date.now();
  }, []);

  const pauseCourse = useCallback(() => {
    pausedRef.current = true;
    setIsPaused(true);
  }, []);

  const resumeCourse = useCallback(async () => {
    lastActivityRef.current = Date.now();
    pausedRef.current = false;
    setIsPaused(false);

    /*
      Resetting the server timestamp prevents time spent on another
      tab or away from the device from being credited.
    */
    await resetHeartbeat();
  }, [resetHeartbeat]);

  useEffect(() => {
    void initializeTracker();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void initializeTracker();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [initializeTracker]);

  useEffect(() => {
    const activityEvents: Array<keyof WindowEventMap> = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, recordActivity, {
        passive: true,
      });
    });

    return () => {
      activityEvents.forEach((eventName) => {
        window.removeEventListener(
          eventName,
          recordActivity,
        );
      });
    };
  }, [recordActivity]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseCourse();
        return;
      }

      /*
        The learner must deliberately resume after leaving the tab.
        This avoids silently crediting inactive time.
      */
      pausedRef.current = true;
      setIsPaused(true);
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [pauseCourse]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const displayInterval = window.setInterval(() => {
      if (
        pausedRef.current ||
        document.hidden ||
        !signedInRef.current ||
        activeSecondsRef.current >= requiredSecondsRef.current
      ) {
        return;
      }

      const idleTime =
        Date.now() - lastActivityRef.current;

      if (idleTime >= IDLE_LIMIT_MS) {
        pauseCourse();
        return;
      }

      const nextSeconds = Math.min(
        activeSecondsRef.current + 1,
        requiredSecondsRef.current,
      );

      activeSecondsRef.current = nextSeconds;
      setActiveSeconds(nextSeconds);
    }, LOCAL_DISPLAY_INTERVAL_MS);

    return () => {
      window.clearInterval(displayInterval);
    };
  }, [isLoaded, pauseCourse]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    const heartbeatInterval = window.setInterval(() => {
      void recordHeartbeat();
    }, HEARTBEAT_INTERVAL_MS);

    return () => {
      window.clearInterval(heartbeatInterval);
    };
  }, [isLoaded, isSignedIn, recordHeartbeat]);

  const progressPercent = Math.min(
    100,
    Math.round(
      (activeSeconds / Math.max(1, requiredSeconds)) * 100,
    ),
  );

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <section className="border-b border-zinc-800 bg-black px-6 py-6 text-white">
        <div className="mx-auto max-w-6xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                Course Engagement
              </p>

              <h2 className="mt-2 text-xl font-bold text-white">
                {courseTitle}
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Active course time:{" "}
                <span className="font-bold text-white">
                  {formatTime(activeSeconds)}
                </span>
                {" / "}
                {Math.ceil(requiredSeconds / 60)} minutes
                required
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                {!isSignedIn
                  ? "Sign in to begin official engagement tracking."
                  : syncState === "saving"
                    ? "Saving official course time…"
                    : syncState === "error"
                      ? "Official course time could not be saved."
                      : "Official course time is being saved to your account."}
              </p>

              {syncError && (
                <p className="mt-2 text-xs text-red-400">
                  {syncError}
                </p>
              )}
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                isPaused
                  ? "bg-amber-500/20 text-amber-300"
                  : completedRequiredTime
                    ? "bg-green-500/20 text-green-300"
                    : "bg-red-500/20 text-red-300"
              }`}
            >
              {isPaused
                ? "Timer Paused"
                : completedRequiredTime
                  ? "Required Time Met"
                  : "Timer Active"}
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-red-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-zinc-500">
            <span>{progressPercent}% complete</span>
            <span>
              Idle pause after{" "}
              {IDLE_LIMIT_MS / 60_000} minutes
            </span>
          </div>
        </div>
      </section>

      {isPaused && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5">
          <div className="w-full max-w-lg rounded-2xl border border-red-700 bg-zinc-950 p-8 text-center shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Course Paused
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-white">
              Are You Still There?
            </h2>

            <p className="mt-4 leading-7 text-zinc-300">
              Official active course time has stopped. Select
              Resume Course when you are ready to continue
              reviewing the content.
            </p>

            <button
              type="button"
              onClick={() => void resumeCourse()}
              className="mt-7 rounded-xl bg-red-600 px-7 py-3 font-bold text-white transition hover:bg-red-500"
            >
              Resume Course
            </button>
          </div>
        </div>
      )}
    </>
  );
}