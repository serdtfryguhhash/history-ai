"use client";

const PROGRESS_KEY = "history_ai_progress";

export type EraKey =
  | "Ancient"
  | "Classical"
  | "Medieval"
  | "Renaissance"
  | "Enlightenment"
  | "19th Century"
  | "20th Century Early"
  | "20th Century Late";

export const ERA_KEYS: EraKey[] = [
  "Ancient",
  "Classical",
  "Medieval",
  "Renaissance",
  "Enlightenment",
  "19th Century",
  "20th Century Early",
  "20th Century Late",
];

export const ERA_FIGURE_PATTERNS: Record<EraKey, string[]> = {
  Ancient: ["Ancient Egypt", "Ancient Mesopotamia", "Ancient India", "Ancient China"],
  Classical: ["Ancient Greece", "Roman Republic", "Roman Empire", "Classical China"],
  Medieval: ["Medieval Europe", "Islamic Golden Age", "Medieval Asia"],
  Renaissance: ["Renaissance", "Age of Exploration"],
  Enlightenment: ["Enlightenment"],
  "19th Century": ["Industrial Revolution", "19th Century"],
  "20th Century Early": ["World War Era"],
  "20th Century Late": ["Cold War", "Modern Era"],
};

export interface ProgressData {
  viewedFigures: string[];
  viewedLessons: string[];
  viewedTimelines: string[];
  chattedFigures: string[];
  activityDays: string[];
  lastUpdated: string;
}

function getProgress(): ProgressData {
  if (typeof window === "undefined") return getDefault();
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (!stored) return getDefault();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefault();
  }
}

function getDefault(): ProgressData {
  return {
    viewedFigures: [],
    viewedLessons: [],
    viewedTimelines: [],
    chattedFigures: [],
    activityDays: [],
    lastUpdated: "",
  };
}

function saveProgress(data: ProgressData) {
  if (typeof window === "undefined") return;
  data.lastUpdated = new Date().toISOString();
  const today = new Date().toISOString().split("T")[0];
  if (!data.activityDays.includes(today)) {
    data.activityDays.push(today);
  }
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

export function trackFigureView(slug: string): void {
  const data = getProgress();
  if (!data.viewedFigures.includes(slug)) {
    data.viewedFigures.push(slug);
  }
  saveProgress(data);
}

export function trackLessonView(slug: string): void {
  const data = getProgress();
  if (!data.viewedLessons.includes(slug)) {
    data.viewedLessons.push(slug);
  }
  saveProgress(data);
}

export function trackTimelineView(topic: string): void {
  const data = getProgress();
  if (!data.viewedTimelines.includes(topic)) {
    data.viewedTimelines.push(topic);
  }
  saveProgress(data);
}

export function trackFigureChat(slug: string): void {
  const data = getProgress();
  if (!data.chattedFigures.includes(slug)) {
    data.chattedFigures.push(slug);
  }
  saveProgress(data);
}

export function trackActivity(): void {
  const data = getProgress();
  saveProgress(data);
}

export function getProgressData(): ProgressData {
  return getProgress();
}

export function getEraProgress(
  figures: { slug: string; era: string }[]
): Record<EraKey, { total: number; viewed: number; percentage: number }> {
  const data = getProgress();
  const result = {} as Record<EraKey, { total: number; viewed: number; percentage: number }>;

  for (const era of ERA_KEYS) {
    const patterns = ERA_FIGURE_PATTERNS[era];
    const eraFigures = figures.filter((f) =>
      patterns.some((p) => f.era.includes(p))
    );
    const viewed = eraFigures.filter((f) =>
      data.viewedFigures.includes(f.slug)
    ).length;
    const total = eraFigures.length;
    result[era] = {
      total,
      viewed,
      percentage: total > 0 ? Math.round((viewed / total) * 100) : 0,
    };
  }

  return result;
}

export function getActivityDays(): string[] {
  return getProgress().activityDays;
}

export function getLearningStreak(): number {
  const days = getProgress().activityDays.sort();
  if (days.length === 0) return 0;

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (!days.includes(today) && !days.includes(yesterday)) return 0;

  let streak = 0;
  let current = days.includes(today) ? today : yesterday;

  while (days.includes(current)) {
    streak++;
    const prev = new Date(current);
    prev.setDate(prev.getDate() - 1);
    current = prev.toISOString().split("T")[0];
  }

  return streak;
}
