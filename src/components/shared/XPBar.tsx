"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getXPData,
  getRankForXP,
  getProgressToNextRank,
  getRankThreshold,
  awardXP,
} from "@/lib/gamification";
import { Star } from "lucide-react";

export function XPBar() {
  const [xp, setXP] = useState(0);
  const [rank, setRank] = useState("Student");
  const [progress, setProgress] = useState({ current: 0, needed: 1, percentage: 0 });

  useEffect(() => {
    const data = getXPData();
    const result = awardXP("daily_visit");
    setXP(result.newTotal);
    setRank(getRankForXP(result.newTotal));
    setProgress(getProgressToNextRank(result.newTotal));
  }, []);

  const threshold = getRankThreshold(rank as any);

  return (
    <div
      className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium cursor-pointer group relative"
    >
      <Star className="w-4 h-4" />
      <span className="font-mono text-xs">{xp} XP</span>
      <div className="absolute top-full right-0 mt-2 px-4 py-3 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="font-semibold text-amber-400 mb-1">{rank}</div>
        <div className="w-32 h-1.5 bg-gray-700 rounded-full overflow-hidden mb-1">
          <motion.div
            className="h-full bg-amber-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress.percentage}%` }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
          />
        </div>
        <div className="text-gray-400">{progress.current}/{progress.needed} to next rank</div>
        <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 rotate-45" />
      </div>
    </div>
  );
}
