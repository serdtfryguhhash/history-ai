"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { historicalFigures } from "@/data/figures";
import {
  getEraProgress,
  getProgressData,
  ERA_KEYS,
  type EraKey,
} from "@/lib/progress-tracker";
import { LearningCalendar } from "@/components/features/learning-calendar";
import { ShareCard } from "@/components/shared/ShareCard";
import { Map, BookOpen, Users, Clock, MessageSquare } from "lucide-react";

const eraIcons: Record<string, string> = {
  Ancient: "🏛️",
  Classical: "⚔️",
  Medieval: "🏰",
  Renaissance: "🎨",
  Enlightenment: "💡",
  "19th Century": "🏭",
  "20th Century Early": "✈️",
  "20th Century Late": "🚀",
};

function getStatusColor(percentage: number): string {
  if (percentage === 0) return "bg-white/10 border-white/10";
  if (percentage < 30) return "bg-yellow-500/10 border-yellow-500/30";
  return "bg-green-500/10 border-green-500/30";
}

function getBarColor(percentage: number): string {
  if (percentage === 0) return "bg-gray-600";
  if (percentage < 30) return "bg-yellow-500";
  return "bg-green-500";
}

function getStatusLabel(percentage: number): string {
  if (percentage === 0) return "Unexplored";
  if (percentage < 30) return "Started";
  return "Deep";
}

export default function KnowledgeMapPage() {
  const [eraProgress, setEraProgress] = useState<
    Record<EraKey, { total: number; viewed: number; percentage: number }>
  >({} as any);
  const [progress, setProgress] = useState({
    viewedFigures: [] as string[],
    viewedLessons: [] as string[],
    viewedTimelines: [] as string[],
    chattedFigures: [] as string[],
  });

  useEffect(() => {
    const ep = getEraProgress(historicalFigures);
    setEraProgress(ep);
    const pd = getProgressData();
    setProgress(pd);
  }, []);

  const totalFigures = historicalFigures.length;
  const viewedTotal = progress.viewedFigures.length;
  const overallPercentage = totalFigures > 0 ? Math.round((viewedTotal / totalFigures) * 100) : 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm py-12 md:py-16 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/20 mx-auto mb-4">
              <Map className="h-7 w-7 text-amber-400" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Knowledge Map
            </h1>
            <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
              Track your journey through 5,000 years of history. See what you have explored and discover what awaits.
            </p>
          </motion.div>

          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <Users className="h-5 w-5 text-amber-400 mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-white">{viewedTotal}</div>
              <div className="font-body text-xs text-white/50">Figures Explored</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <BookOpen className="h-5 w-5 text-amber-400 mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-white">{progress.viewedLessons.length}</div>
              <div className="font-body text-xs text-white/50">Lessons Read</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <Clock className="h-5 w-5 text-amber-400 mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-white">{progress.viewedTimelines.length}</div>
              <div className="font-body text-xs text-white/50">Timelines Explored</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <MessageSquare className="h-5 w-5 text-amber-400 mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-white">{progress.chattedFigures.length}</div>
              <div className="font-body text-xs text-white/50">Figures Chatted</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-display text-xl font-bold text-white mb-4">Overall Progress</h2>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallPercentage}%` }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] as const }}
              />
            </div>
            <p className="font-mono text-sm text-white/50 mt-2">
              {viewedTotal} of {totalFigures} figures explored ({overallPercentage}%)
            </p>
          </motion.div>

          {/* Era Grid */}
          <div>
            <h2 className="font-display text-xl font-bold text-white mb-6">Exploration by Era</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ERA_KEYS.map((era, index) => {
                const ep = eraProgress[era] || { total: 0, viewed: 0, percentage: 0 };
                return (
                  <motion.div
                    key={era}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Card className={`${getStatusColor(ep.percentage)} backdrop-blur-sm transition-all hover:scale-[1.02]`}>
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl">{eraIcons[era]}</span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] font-mono ${
                              ep.percentage === 0
                                ? "border-white/20 text-white/40"
                                : ep.percentage < 30
                                ? "border-yellow-500/40 text-yellow-400"
                                : "border-green-500/40 text-green-400"
                            }`}
                          >
                            {getStatusLabel(ep.percentage)}
                          </Badge>
                        </div>
                        <h3 className="font-display text-lg font-bold text-white mb-1">{era}</h3>
                        <p className="font-mono text-xs text-white/50 mb-3">
                          {ep.viewed} / {ep.total} figures
                        </p>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${getBarColor(ep.percentage)}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${ep.percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.4, 0, 0.2, 1] as const }}
                          />
                        </div>
                        <p className="font-mono text-xs text-white/40 mt-1 text-right">{ep.percentage}%</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Learning Calendar */}
          <div>
            <h2 className="font-display text-xl font-bold text-white mb-6">Learning Activity</h2>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <LearningCalendar />
              </CardContent>
            </Card>
          </div>

          {/* Share Card */}
          <div>
            <h2 className="font-display text-xl font-bold text-white mb-6">Share Your Progress</h2>
            <div className="max-w-md">
              <ShareCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
