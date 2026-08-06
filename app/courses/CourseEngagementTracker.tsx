"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CourseEngagementTrackerProps = {
  courseSlug?: string;
  courseTitle?: string;
  requiredMinutes?: number;
};

const IDLE_LIMIT_MS = 3 * 60 * 1000;
const TIMER_INTERVAL_MS = 1000;

export default function CourseEngagementTracker({
  courseSlug = "acute-pulmonary-edema",
  courseTitle = "Acute Pulmonary Edema",
  requiredMinutes = 30,
}: CourseEngagementTrackerProps) {
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const lastActivityRef = useRef(Date.now());
  const isPausedRef = useRef(false);

  const storageKey = `course-engagement-${courseSlug}`;

  const requiredSeconds = requiredMinutes * 60;
  const completedRequiredTime = activeSeconds >= requiredSeconds;

  const formatTime = useCallback((totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const recordActivity = useCallback(() => {
    if (isPausedRef.current) {
      return;
    }

    lastActivityRef.current = Date.now();
  }, []);

  const pauseCourse = useCallback(() => {
    isPausedRef.current = true;
    setIsPaused(true);
  }, []);

  const resumeCourse = useCallback(() => {
    lastActivityRef.current = Date.now();
    isPausedRef.current = false;
    setIsPaused(false);
  }, []);

  useEffect(() => {
    try {
      const savedValue = window.localStorage.getItem(storageKey);

      if (savedValue !== null) {
        const parsedValue = Number.parseInt(savedValue, 10);

        if (Number.isFinite(parsedValue) && parsedValue >= 0) {
          setActiveSeconds(parsedValue);
        }
      }
    } catch (error) {
      console.error("Unable to load saved course time:", error);
    } finally {
      setIsLoaded(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      window.localStorage.setItem(storageKey, activeSeconds.toString());
    } catch (error) {
      console.error("Unable to save course time:", error);
    }
  }, [activeSeconds, isLoaded, storageKey]);

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
        window.removeEventListener(eventName, recordActivity);
      });
    };
  }, [recordActivity]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseCourse();
      } else if (!isPausedRef.current) {
        lastActivityRef.current = Date.now();
      }
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

    const interval = window.setInterval(() => {
      if (isPausedRef.current || document.hidden) {
        return;
      }

      const idleTime = Date.now() - lastActivityRef.current;

      if (idleTime >= IDLE_LIMIT_MS) {
        pauseCourse();
        return;
      }

      setActiveSeconds((currentSeconds) => currentSeconds + 1);
    }, TIMER_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [isLoaded, pauseCourse]);

  const progressPercent = Math.min(
    100,
    Math.round((activeSeconds / requiredSeconds) * 100),
  );

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <section className="mx-auto mt-6 max-w-6xl px-6">
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
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
                {requiredMinutes} minutes required
              </p>
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
              Idle pause after {IDLE_LIMIT_MS / 60_000} minutes
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
              Active course time has stopped. Select Resume Course
              when you are ready to continue reviewing the content.
            </p>

            <button
              type="button"
              onClick={resumeCourse}
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