"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getXPData, getRankForXP } from "@/lib/gamification";
import { getProgressData, ERA_KEYS, getEraProgress } from "@/lib/progress-tracker";
import { getAllPathProgress } from "@/data/learning-paths";
import { getLearningStreak } from "@/lib/progress-tracker";
import { historicalFigures } from "@/data/figures";
import { Copy, Download, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [figuresExplored, setFiguresExplored] = useState(0);
  const [rank, setRank] = useState("Student");
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [pathsCompleted, setPathsCompleted] = useState(0);
  const [eraData, setEraData] = useState<Record<string, number>>({});

  useEffect(() => {
    const progress = getProgressData();
    const xpData = getXPData();
    const pathProgress = getAllPathProgress();
    const completed = Object.values(pathProgress).filter(
      (p) => p.completedDays.length >= 28
    ).length;

    setFiguresExplored(progress.viewedFigures.length);
    setRank(getRankForXP(xpData.totalXP));
    setStreak(getLearningStreak());
    setTotalXP(xpData.totalXP);
    setPathsCompleted(completed);

    const eraProgress = getEraProgress(historicalFigures);
    const eData: Record<string, number> = {};
    for (const era of ERA_KEYS) {
      eData[era] = eraProgress[era].percentage;
    }
    setEraData(eData);
  }, []);

  const shareText = `I've explored ${figuresExplored} historical figures and completed ${pathsCompleted} learning paths on History AI! My rank: ${rank} with ${totalXP} XP and a ${streak}-day learning streak. #HistoryAI`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareText]);

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 p-6 text-white shadow-xl"
      >
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/20">
              <Share2 className="h-4 w-4 text-amber-300" />
            </div>
            <span className="font-display text-lg font-bold">History.ai</span>
          </div>

          <h3 className="font-display text-2xl font-bold mb-1">
            {rank}
          </h3>
          <p className="font-mono text-xs text-amber-300 mb-4">{totalXP} XP earned</p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 rounded-lg bg-white/10">
              <div className="font-display text-xl font-bold">{figuresExplored}</div>
              <div className="font-body text-[10px] text-amber-200">Figures</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-white/10">
              <div className="font-display text-xl font-bold">{pathsCompleted}</div>
              <div className="font-body text-[10px] text-amber-200">Paths</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-white/10">
              <div className="font-display text-xl font-bold">{streak}</div>
              <div className="font-body text-[10px] text-amber-200">Streak</div>
            </div>
          </div>

          {/* Era mini chart */}
          <div className="space-y-1.5">
            <p className="font-mono text-[10px] text-amber-300 uppercase tracking-wider">Era Exploration</p>
            <div className="flex gap-1">
              {ERA_KEYS.map((era) => (
                <div key={era} className="flex-1">
                  <div className="h-8 bg-white/10 rounded overflow-hidden relative">
                    <motion.div
                      className="absolute bottom-0 w-full bg-amber-400 rounded"
                      initial={{ height: 0 }}
                      animate={{ height: `${eraData[era] || 0}%` }}
                      transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] as const }}
                    />
                  </div>
                  <p className="font-mono text-[7px] text-amber-300/60 text-center mt-0.5 truncate">
                    {era.replace("20th Century ", "20th ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="flex-1 gap-2 border-white/20 text-white hover:bg-white/10"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Text"}
        </Button>
      </div>
    </div>
  );
}
