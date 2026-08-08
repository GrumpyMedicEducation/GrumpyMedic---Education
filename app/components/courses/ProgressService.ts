"use client";

import { getCourseBySlug } from "../../lib/courses/catalog";
import { supabase } from "../../lib/supabase/client";

const DEFAULT_REQUIRED_SECONDS = 60 * 60;

type CourseProgressRow = {
  user_id: string;
  course_slug: string;
  course_title: string;
  completed_seconds: number | null;
  required_seconds: number | null;
  quiz_score: number | null;
  quiz_passed: boolean | null;
  certificate_unlocked: boolean | null;
  completed: boolean | null;
  progress_percent: number | null;
  progress_percentage: number | null;
};

export type CourseProgress = {
  completedMinutes: number;
  requiredMinutes: number;
  quizPassed: boolean;
  quizScore: number | null;
  certificateUnlocked: boolean;
};

function getCourseTitle(courseSlug: string): string {
  return getCourseBySlug(courseSlug)?.title ?? courseSlug;
}

function toCourseProgress(row: CourseProgressRow): CourseProgress {
  const completedSeconds = Math.max(0, row.completed_seconds ?? 0);
  const requiredSeconds = Math.max(
    1,
    row.required_seconds ?? DEFAULT_REQUIRED_SECONDS,
  );

  return {
    completedMinutes: Math.floor(completedSeconds / 60),
    requiredMinutes: Math.ceil(requiredSeconds / 60),
    quizPassed: row.quiz_passed ?? false,
    quizScore: row.quiz_score,
    certificateUnlocked: row.certificate_unlocked ?? false,
  };
}

async function getProgressRow(
  userId: string,
  courseSlug: string,
): Promise<CourseProgressRow | null> {
  const { data, error } = await supabase
    .from("course_progress")
    .select(
      [
        "user_id",
        "course_slug",
        "course_title",
        "completed_seconds",
        "required_seconds",
        "quiz_score",
        "quiz_passed",
        "certificate_unlocked",
        "completed",
        "progress_percent",
        "progress_percentage",
      ].join(","),
    )
    .eq("user_id", userId)
    .eq("course_slug", courseSlug)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load course progress: ${error.message}`);
  }

  return (data as unknown as CourseProgressRow | null) ?? null;
}

async function ensureProgressRow(
  userId: string,
  courseSlug: string,
): Promise<CourseProgressRow> {
  const existing = await getProgressRow(userId, courseSlug);

  if (existing) {
    return existing;
  }

  const courseTitle = getCourseTitle(courseSlug);

  const { data, error } = await supabase
    .from("course_progress")
    .insert({
      user_id: userId,
      course_slug: courseSlug,
      course_title: courseTitle,
      completed_seconds: 0,
      required_seconds: DEFAULT_REQUIRED_SECONDS,
      quiz_passed: false,
      certificate_unlocked: false,
      completed: false,
      progress_percent: 0,
      progress_percentage: 0,
      lesson_started: true,
      lesson_completed: false,
      quiz_started: false,
      quiz_completed: false,
      last_section: "course-started",
      last_accessed: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select(
      [
        "user_id",
        "course_slug",
        "course_title",
        "completed_seconds",
        "required_seconds",
        "quiz_score",
        "quiz_passed",
        "certificate_unlocked",
        "completed",
        "progress_percent",
        "progress_percentage",
      ].join(","),
    )
    .single();

  if (error) {
    if (error.code === "23505") {
      const racedExisting = await getProgressRow(userId, courseSlug);

      if (racedExisting) {
        return racedExisting;
      }
    }

    throw new Error(`Unable to create course progress: ${error.message}`);
  }

  return data as unknown as CourseProgressRow;
}

export async function getCourseProgress(
  userId: string,
  courseSlug: string,
): Promise<CourseProgress> {
  const row = await ensureProgressRow(userId, courseSlug);
  return toCourseProgress(row);
}

/**
 * Saves the learner's total credited engagement time.
 *
 * Pass the total elapsed minutes for the course, not only the newest interval.
 * Stored time never moves backward.
 */
export async function saveEngagementTime(
  userId: string,
  courseSlug: string,
  minutes: number,
): Promise<CourseProgress> {
  if (!Number.isFinite(minutes) || minutes < 0) {
    throw new Error("Engagement time must be a non-negative number.");
  }

  const existing = await ensureProgressRow(userId, courseSlug);
  const requiredSeconds = Math.max(
    1,
    existing.required_seconds ?? DEFAULT_REQUIRED_SECONDS,
  );
  const incomingSeconds = Math.floor(minutes * 60);
  const completedSeconds = Math.max(
    existing.completed_seconds ?? 0,
    incomingSeconds,
  );
  const timeRequirementMet = completedSeconds >= requiredSeconds;
  const quizPassed = existing.quiz_passed ?? false;
  const certificateUnlocked = timeRequirementMet && quizPassed;
  const progressPercentage = Math.min(
    100,
    Math.floor((completedSeconds / requiredSeconds) * 100),
  );

  const updatePayload: Record<string, unknown> = {
    completed_seconds: completedSeconds,
    required_seconds: requiredSeconds,
    progress_percent: progressPercentage,
    progress_percentage: progressPercentage,
    last_accessed: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    certificate_unlocked: certificateUnlocked,
    certificate_earned: certificateUnlocked,
    completed: certificateUnlocked,
  };

  if (timeRequirementMet) {
    updatePayload.lesson_completed = true;
    updatePayload.lesson_completed_at = new Date().toISOString();
  }

  if (certificateUnlocked) {
    updatePayload.completed_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("course_progress")
    .update(updatePayload)
    .eq("user_id", userId)
    .eq("course_slug", courseSlug)
    .select(
      [
        "user_id",
        "course_slug",
        "course_title",
        "completed_seconds",
        "required_seconds",
        "quiz_score",
        "quiz_passed",
        "certificate_unlocked",
        "completed",
        "progress_percent",
        "progress_percentage",
      ].join(","),
    )
    .single();

  if (error) {
    throw new Error(`Unable to save engagement time: ${error.message}`);
  }

  return toCourseProgress(data as unknown as CourseProgressRow);
}

export async function markQuizPassed(
  userId: string,
  courseSlug: string,
  score: number,
): Promise<CourseProgress> {
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    throw new Error("Quiz score must be between 0 and 100.");
  }

  const existing = await ensureProgressRow(userId, courseSlug);
  const completedSeconds = existing.completed_seconds ?? 0;
  const requiredSeconds =
    existing.required_seconds ?? DEFAULT_REQUIRED_SECONDS;
  const timeRequirementMet = completedSeconds >= requiredSeconds;

  const { data, error } = await supabase
    .from("course_progress")
    .update({
      quiz_score: Math.round(score),
      quiz_passed: true,
      quiz_started: true,
      quiz_completed: true,
      certificate_unlocked: timeRequirementMet,
      certificate_earned: timeRequirementMet,
      completed: timeRequirementMet,
      completed_at: timeRequirementMet ? new Date().toISOString() : null,
      last_accessed: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("course_slug", courseSlug)
    .select(
      [
        "user_id",
        "course_slug",
        "course_title",
        "completed_seconds",
        "required_seconds",
        "quiz_score",
        "quiz_passed",
        "certificate_unlocked",
        "completed",
        "progress_percent",
        "progress_percentage",
      ].join(","),
    )
    .single();

  if (error) {
    throw new Error(`Unable to save passing quiz result: ${error.message}`);
  }

  return toCourseProgress(data as unknown as CourseProgressRow);
}

export async function markQuizFailed(
  userId: string,
  courseSlug: string,
  score: number,
): Promise<CourseProgress> {
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    throw new Error("Quiz score must be between 0 and 100.");
  }

  await ensureProgressRow(userId, courseSlug);

  const { data, error } = await supabase
    .from("course_progress")
    .update({
      quiz_score: Math.round(score),
      quiz_passed: false,
      quiz_started: true,
      quiz_completed: true,
      certificate_unlocked: false,
      certificate_earned: false,
      completed: false,
      completed_at: null,
      last_accessed: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("course_slug", courseSlug)
    .select(
      [
        "user_id",
        "course_slug",
        "course_title",
        "completed_seconds",
        "required_seconds",
        "quiz_score",
        "quiz_passed",
        "certificate_unlocked",
        "completed",
        "progress_percent",
        "progress_percentage",
      ].join(","),
    )
    .single();

  if (error) {
    throw new Error(`Unable to save failed quiz result: ${error.message}`);
  }

  return toCourseProgress(data as unknown as CourseProgressRow);
}

export async function hasCompletedRequiredTime(
  userId: string,
  courseSlug: string,
): Promise<boolean> {
  const row = await ensureProgressRow(userId, courseSlug);
  const completedSeconds = row.completed_seconds ?? 0;
  const requiredSeconds = row.required_seconds ?? DEFAULT_REQUIRED_SECONDS;

  return completedSeconds >= requiredSeconds;
}

export async function canViewCertificate(
  userId: string,
  courseSlug: string,
): Promise<boolean> {
  const row = await ensureProgressRow(userId, courseSlug);
  const completedSeconds = row.completed_seconds ?? 0;
  const requiredSeconds = row.required_seconds ?? DEFAULT_REQUIRED_SECONDS;

  return (
    completedSeconds >= requiredSeconds &&
    (row.quiz_passed ?? false) &&
    (row.certificate_unlocked ?? false)
  );
}

export async function unlockCertificate(
  userId: string,
  courseSlug: string,
): Promise<CourseProgress> {
  const existing = await ensureProgressRow(userId, courseSlug);
  const completedSeconds = existing.completed_seconds ?? 0;
  const requiredSeconds =
    existing.required_seconds ?? DEFAULT_REQUIRED_SECONDS;
  const quizPassed = existing.quiz_passed ?? false;

  if (completedSeconds < requiredSeconds) {
    throw new Error(
      "The required engagement time must be completed before the certificate can be unlocked.",
    );
  }

  if (!quizPassed) {
    throw new Error(
      "A passing quiz score is required before the certificate can be unlocked.",
    );
  }

  const { data, error } = await supabase
    .from("course_progress")
    .update({
      certificate_unlocked: true,
      certificate_earned: true,
      completed: true,
      completed_at: new Date().toISOString(),
      progress_percent: 100,
      progress_percentage: 100,
      last_accessed: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("course_slug", courseSlug)
    .select(
      [
        "user_id",
        "course_slug",
        "course_title",
        "completed_seconds",
        "required_seconds",
        "quiz_score",
        "quiz_passed",
        "certificate_unlocked",
        "completed",
        "progress_percent",
        "progress_percentage",
      ].join(","),
    )
    .single();

  if (error) {
    throw new Error(`Unable to unlock certificate: ${error.message}`);
  }

  return toCourseProgress(data as unknown as CourseProgressRow);
}