"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  learningPaths,
  type LearningPath,
  type LearningPathDay,
  getPathProgress,
  completePathDay,
  getAllPathProgress,
} from "@/data/learning-paths";
import { awardXP } from "@/lib/gamification";
import { trackFigureView } from "@/lib/progress-tracker";
import { AchievementToast } from "@/components/shared/AchievementToast";
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  GraduationCap,
  Lock,
  Map,
} from "lucide-react";

export default function PathsPage() {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [selectedDay, setSelectedDay] = useState<LearningPathDay | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [allProgress, setAllProgress] = useState<Record<string, { completedDays: number[] }>>({});
  const [toast, setToast] = useState({ show: false, message: "", xp: 0 });

  useEffect(() => {
    setAllProgress(getAllPathProgress());
  }, []);

  const handleSelectPath = (path: LearningPath) => {
    setSelectedPath(path);
    setSelectedDay(null);
    const progress = getPathProgress(path.id);
    setCompletedDays(progress?.completedDays || []);
  };

  const handleCompleteDay = useCallback((path: LearningPath, day: LearningPathDay) => {
    const progress = completePathDay(path.id, day.day);
    setCompletedDays(progress.completedDays);
    setAllProgress(getAllPathProgress());

    trackFigureView(day.figureSlug);
    const result = awardXP("complete_lesson", `${path.title} Day ${day.day}`);
    if (result.xpGained > 0) {
      setToast({
        show: true,
        message: `Day ${day.day} of ${path.title} complete!`,
        xp: result.xpGained,
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm py-12 md:py-16 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/20 mx-auto mb-4">
            <Map className="h-7 w-7 text-amber-400" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Learning Paths
          </h1>
          <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
            Curated multi-week journeys through history. Each day unlocks a figure, a reading, and a reflection question.
          </p>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm min-h-[60vh]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {!selectedPath ? (
            /* Path Selection */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => {
                const progress = allProgress[path.id];
                const completed = progress?.completedDays?.length || 0;
                const percentage = Math.round((completed / path.totalDays) * 100);

                return (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className="h-full bg-white/5 border-white/10 backdrop-blur-sm hover:border-amber-400/30 transition-all cursor-pointer group"
                      onClick={() => handleSelectPath(path)}
                    >
                      <CardContent className="p-6">
                        <div className={`h-3 w-full rounded-full bg-gradient-to-r ${path.coverColor} mb-4 opacity-60 group-hover:opacity-100 transition-opacity`} />
                        <Badge variant="outline" className="mb-3 border-white/20 text-white/60 font-mono text-[10px]">
                          {path.weeks} weeks &middot; {path.totalDays} days &middot; {path.difficulty}
                        </Badge>
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                          {path.title}
                        </h3>
                        <p className="font-body text-sm text-white/60 mb-4">{path.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="font-mono text-xs text-white/40">{percentage}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : !selectedDay ? (
            /* Path Detail - Day Grid */
            <div>
              <button
                onClick={() => setSelectedPath(null)}
                className="flex items-center gap-2 text-sm font-body text-white/60 hover:text-amber-400 transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to All Paths
              </button>

              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-white mb-2">{selectedPath.title}</h2>
                <p className="font-body text-white/60 mb-4">{selectedPath.description}</p>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-white/20 text-white/60 font-mono">
                    {completedDays.length} / {selectedPath.totalDays} days completed
                  </Badge>
                  <div className="flex-1 max-w-xs h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${Math.round((completedDays.length / selectedPath.totalDays) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Weeks */}
              {Array.from({ length: selectedPath.weeks }, (_, weekIdx) => {
                const weekDays = selectedPath.days.filter((d) => d.week === weekIdx + 1);
                return (
                  <div key={weekIdx} className="mb-8">
                    <h3 className="font-display text-lg font-bold text-white/80 mb-3">
                      Week {weekIdx + 1}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2">
                      {weekDays.map((day) => {
                        const isCompleted = completedDays.includes(day.day);
                        return (
                          <motion.button
                            key={day.day}
                            onClick={() => setSelectedDay(day)}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              isCompleted
                                ? "border-green-500/30 bg-green-500/10 hover:bg-green-500/20"
                                : "border-white/10 bg-white/5 hover:border-amber-400/30 hover:bg-amber-400/5"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                              ) : (
                                <Circle className="h-4 w-4 text-white/20" />
                              )}
                              <span className="font-mono text-xs text-white/40">Day {day.day}</span>
                            </div>
                            <p className="font-display text-xs font-bold text-white leading-tight truncate">
                              {day.figureName}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Day Detail */
            <div>
              <button
                onClick={() => setSelectedDay(null)}
                className="flex items-center gap-2 text-sm font-body text-white/60 hover:text-amber-400 transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {selectedPath.title}
              </button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Badge variant="outline" className="mb-4 border-white/20 text-white/60 font-mono">
                  Week {selectedDay.week} &middot; Day {selectedDay.day}
                </Badge>

                <h2 className="font-display text-3xl font-bold text-white mb-2">
                  {selectedDay.figureName}
                </h2>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="h-5 w-5 text-amber-400" />
                      <h3 className="font-display text-lg font-bold text-white">Today&apos;s Reading</h3>
                    </div>
                    <p className="font-body text-white/70 leading-relaxed">{selectedDay.reading}</p>
                  </CardContent>
                </Card>

                <Card className="bg-amber-400/5 border-amber-400/20 backdrop-blur-sm mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="h-5 w-5 text-amber-400" />
                      <h3 className="font-display text-lg font-bold text-white">Reflection Question</h3>
                    </div>
                    <p className="font-body text-white/80 leading-relaxed italic">{selectedDay.reflectionQuestion}</p>
                  </CardContent>
                </Card>

                {completedDays.includes(selectedDay.day) ? (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-body text-sm">Day completed</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleCompleteDay(selectedPath, selectedDay)}
                    className="gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Day as Complete
                  </Button>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <AchievementToast
        message={toast.message}
        xp={toast.xp}
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
