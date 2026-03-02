"use client";

const MEMORY_KEY = "history_ai_memory";

export interface AIMemoryData {
  exploredFigures: string[];
  favoriteEras: Record<string, number>;
  learningLevel: "beginner" | "intermediate" | "advanced";
  conversationSummaries: string[];
  quizPerformance: Record<string, { correct: number; total: number }>;
  totalInteractions: number;
  topCategories: Record<string, number>;
}

function getMemory(): AIMemoryData {
  if (typeof window === "undefined") return getDefault();
  const stored = localStorage.getItem(MEMORY_KEY);
  if (!stored) return getDefault();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefault();
  }
}

function getDefault(): AIMemoryData {
  return {
    exploredFigures: [],
    favoriteEras: {},
    learningLevel: "beginner",
    conversationSummaries: [],
    quizPerformance: {},
    totalInteractions: 0,
    topCategories: {},
  };
}

function saveMemory(data: AIMemoryData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MEMORY_KEY, JSON.stringify(data));
}

export function recordFigureExploration(name: string, era: string, categories: string[]): void {
  const data = getMemory();
  if (!data.exploredFigures.includes(name)) {
    data.exploredFigures.push(name);
  }
  data.favoriteEras[era] = (data.favoriteEras[era] || 0) + 1;
  for (const cat of categories) {
    data.topCategories[cat] = (data.topCategories[cat] || 0) + 1;
  }
  data.totalInteractions++;
  updateLearningLevel(data);
  saveMemory(data);
}

export function recordConversationSummary(summary: string): void {
  const data = getMemory();
  data.conversationSummaries.push(summary);
  if (data.conversationSummaries.length > 50) {
    data.conversationSummaries = data.conversationSummaries.slice(-50);
  }
  data.totalInteractions++;
  updateLearningLevel(data);
  saveMemory(data);
}

export function recordQuizPerformance(topic: string, correct: number, total: number): void {
  const data = getMemory();
  const existing = data.quizPerformance[topic] || { correct: 0, total: 0 };
  data.quizPerformance[topic] = {
    correct: existing.correct + correct,
    total: existing.total + total,
  };
  data.totalInteractions++;
  updateLearningLevel(data);
  saveMemory(data);
}

function updateLearningLevel(data: AIMemoryData): void {
  const figureCount = data.exploredFigures.length;
  const interactions = data.totalInteractions;
  if (figureCount >= 50 || interactions >= 100) {
    data.learningLevel = "advanced";
  } else if (figureCount >= 15 || interactions >= 30) {
    data.learningLevel = "intermediate";
  } else {
    data.learningLevel = "beginner";
  }
}

export function getAIMemory(): AIMemoryData {
  return getMemory();
}

export function buildMemoryContext(): string {
  const data = getMemory();
  if (data.totalInteractions === 0) return "";

  const parts: string[] = [];

  parts.push(`The user has explored ${data.exploredFigures.length} historical figures.`);

  const topEras = Object.entries(data.favoriteEras)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([era]) => era);
  if (topEras.length > 0) {
    parts.push(`Their favorite eras are: ${topEras.join(", ")}.`);
  }

  const topCats = Object.entries(data.topCategories)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([cat]) => cat);
  if (topCats.length > 0) {
    parts.push(`They are most interested in: ${topCats.join(", ")}.`);
  }

  parts.push(`Their learning level is: ${data.learningLevel}.`);

  if (data.learningLevel === "advanced") {
    parts.push("Provide deeper, more nuanced analysis with primary source references and historiographical debates.");
  } else if (data.learningLevel === "intermediate") {
    parts.push("Include some nuance and connect topics across eras where relevant.");
  } else {
    parts.push("Keep explanations accessible and provide context for unfamiliar terms.");
  }

  const recentSummaries = data.conversationSummaries.slice(-5);
  if (recentSummaries.length > 0) {
    parts.push(`Recent conversation topics: ${recentSummaries.join("; ")}`);
  }

  return parts.join(" ");
}
