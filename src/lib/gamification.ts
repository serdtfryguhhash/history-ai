"use client";

const XP_KEY = "history_ai_xp";

export type ScholarRank = "Student" | "Scholar" | "Historian" | "Professor" | "Sage";

export interface XPAction {
  type: "read_figure" | "complete_lesson" | "ace_quiz" | "explore_timeline" | "chat_figure" | "daily_visit" | "debate_score";
  label: string;
  xp: number;
}

export const XP_VALUES: Record<string, number> = {
  read_figure: 10,
  complete_lesson: 50,
  ace_quiz: 25,
  explore_timeline: 15,
  chat_figure: 20,
  daily_visit: 10,
  debate_score: 30,
};

export const XP_LABELS: Record<string, string> = {
  read_figure: "Read a figure profile",
  complete_lesson: "Completed a lesson",
  ace_quiz: "Aced the quiz",
  explore_timeline: "Explored a timeline",
  chat_figure: "Chatted with a figure",
  daily_visit: "Daily visit",
  debate_score: "Debate performance",
};

export interface RankThreshold {
  rank: ScholarRank;
  minXP: number;
  maxXP: number;
  emoji: string;
  color: string;
}

export const RANK_THRESHOLDS: RankThreshold[] = [
  { rank: "Student", minXP: 0, maxXP: 199, emoji: "📚", color: "text-gray-400" },
  { rank: "Scholar", minXP: 200, maxXP: 599, emoji: "🎓", color: "text-blue-400" },
  { rank: "Historian", minXP: 600, maxXP: 1499, emoji: "📜", color: "text-green-400" },
  { rank: "Professor", minXP: 1500, maxXP: 3999, emoji: "🏛️", color: "text-purple-400" },
  { rank: "Sage", minXP: 4000, maxXP: Infinity, emoji: "⚡", color: "text-amber-400" },
];

export interface XPData {
  totalXP: number;
  history: { action: string; xp: number; date: string; detail?: string }[];
  dailyVisitDate: string;
  achievements: string[];
}

function getXP(): XPData {
  if (typeof window === "undefined") return getDefaultXP();
  const stored = localStorage.getItem(XP_KEY);
  if (!stored) return getDefaultXP();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultXP();
  }
}

function getDefaultXP(): XPData {
  return {
    totalXP: 0,
    history: [],
    dailyVisitDate: "",
    achievements: [],
  };
}

function saveXP(data: XPData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(XP_KEY, JSON.stringify(data));
}

export function awardXP(action: string, detail?: string): { xpGained: number; newTotal: number; rankUp: boolean; newRank: ScholarRank } {
  const data = getXP();
  const xp = XP_VALUES[action] || 0;

  if (action === "daily_visit") {
    const today = new Date().toISOString().split("T")[0];
    if (data.dailyVisitDate === today) {
      return { xpGained: 0, newTotal: data.totalXP, rankUp: false, newRank: getRankForXP(data.totalXP) };
    }
    data.dailyVisitDate = today;
  }

  const oldRank = getRankForXP(data.totalXP);
  data.totalXP += xp;
  const newRank = getRankForXP(data.totalXP);

  data.history.push({
    action,
    xp,
    date: new Date().toISOString(),
    detail,
  });

  if (data.history.length > 200) {
    data.history = data.history.slice(-200);
  }

  const rankUp = oldRank !== newRank;
  if (rankUp && !data.achievements.includes(`rank_${newRank}`)) {
    data.achievements.push(`rank_${newRank}`);
  }

  saveXP(data);

  return { xpGained: xp, newTotal: data.totalXP, rankUp, newRank };
}

export function getRankForXP(xp: number): ScholarRank {
  for (let i = RANK_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= RANK_THRESHOLDS[i].minXP) {
      return RANK_THRESHOLDS[i].rank;
    }
  }
  return "Student";
}

export function getRankThreshold(rank: ScholarRank): RankThreshold {
  return RANK_THRESHOLDS.find((r) => r.rank === rank) || RANK_THRESHOLDS[0];
}

export function getNextRankThreshold(xp: number): RankThreshold | null {
  const currentRank = getRankForXP(xp);
  const idx = RANK_THRESHOLDS.findIndex((r) => r.rank === currentRank);
  if (idx < RANK_THRESHOLDS.length - 1) {
    return RANK_THRESHOLDS[idx + 1];
  }
  return null;
}

export function getXPData(): XPData {
  return getXP();
}

export function getProgressToNextRank(xp: number): { current: number; needed: number; percentage: number } {
  const currentThreshold = RANK_THRESHOLDS.find((r) => xp >= r.minXP && xp <= r.maxXP) || RANK_THRESHOLDS[0];
  const nextThreshold = getNextRankThreshold(xp);

  if (!nextThreshold) {
    return { current: xp, needed: xp, percentage: 100 };
  }

  const rangeStart = currentThreshold.minXP;
  const rangeEnd = nextThreshold.minXP;
  const progress = xp - rangeStart;
  const total = rangeEnd - rangeStart;

  return {
    current: progress,
    needed: total,
    percentage: Math.min(100, Math.round((progress / total) * 100)),
  };
}
