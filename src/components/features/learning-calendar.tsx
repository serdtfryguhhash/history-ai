"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getActivityDays, getLearningStreak } from "@/lib/progress-tracker";
import { Flame } from "lucide-react";

export function LearningCalendar() {
  const [activityDays, setActivityDays] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [weeks, setWeeks] = useState<string[][]>([]);

  useEffect(() => {
    const days = getActivityDays();
    setActivityDays(days);
    setStreak(getLearningStreak());

    // Build 52 weeks of data (one year)
    const today = new Date();
    const dayOfWeek = today.getDay();
    const allWeeks: string[][] = [];

    // Start from 52 weeks ago, aligned to Sunday
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - (52 * 7 + dayOfWeek));

    for (let w = 0; w < 53; w++) {
      const week: string[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + w * 7 + d);
        if (date <= today) {
          week.push(date.toISOString().split("T")[0]);
        }
      }
      if (week.length > 0) {
        allWeeks.push(week);
      }
    }
    setWeeks(allWeeks);
  }, []);

  const getColor = (date: string): string => {
    if (!activityDays.includes(date)) return "bg-white/5";
    return "bg-green-500";
  };

  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="space-y-4">
      {/* Streak display */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400">
          <Flame className="w-5 h-5" />
          <span className="font-display text-lg font-bold">{streak}</span>
          <span className="font-body text-sm">day streak</span>
        </div>
        <span className="font-body text-sm text-white/50">
          {activityDays.length} total active days
        </span>
      </div>

      {/* Calendar grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-0.5 min-w-[700px]">
          {/* Month labels */}
          <div className="flex gap-0.5 ml-0 mb-1">
            {weeks.map((week, wIdx) => {
              if (wIdx === 0 || !week[0]) return <div key={wIdx} className="w-[11px]" />;
              const date = new Date(week[0]);
              const prevWeek = weeks[wIdx - 1];
              const prevDate = prevWeek && prevWeek[0] ? new Date(prevWeek[0]) : null;
              if (prevDate && date.getMonth() !== prevDate.getMonth()) {
                return (
                  <div key={wIdx} className="w-[11px] relative">
                    <span className="absolute -top-4 left-0 font-mono text-[9px] text-white/40 whitespace-nowrap">
                      {monthLabels[date.getMonth()]}
                    </span>
                  </div>
                );
              }
              return <div key={wIdx} className="w-[11px]" />;
            })}
          </div>

          {/* Day rows */}
          {[0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => (
            <div key={dayOfWeek} className="flex gap-0.5">
              {weeks.map((week, wIdx) => {
                const date = week[dayOfWeek];
                if (!date) return <div key={wIdx} className="w-[11px] h-[11px]" />;
                return (
                  <motion.div
                    key={wIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: wIdx * 0.005, duration: 0.2 }}
                    className={`w-[11px] h-[11px] rounded-[2px] ${getColor(date)} transition-colors`}
                    title={`${date}${activityDays.includes(date) ? " - Active" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-xs font-mono text-white/40">
        <span>Less</span>
        <div className="w-[11px] h-[11px] rounded-[2px] bg-white/5" />
        <div className="w-[11px] h-[11px] rounded-[2px] bg-green-500" />
        <span>More</span>
      </div>
    </div>
  );
}
