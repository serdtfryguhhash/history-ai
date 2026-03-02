"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProgressData } from "@/lib/progress-tracker";
import { getXPData, getRankForXP } from "@/lib/gamification";
import {
  Sparkles,
  Lightbulb,
  Target,
  BookOpen,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface DigestData {
  summary: string;
  knowledgeGaps: string[];
  recommendations: string[];
  funFact: string;
  encouragement: string;
}

export function WeeklyDigest() {
  const [digest, setDigest] = useState<DigestData | null>(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generateDigest = useCallback(async () => {
    setLoading(true);
    try {
      const progress = getProgressData();
      const xpData = getXPData();
      const rank = getRankForXP(xpData.totalXP);

      const response = await fetch("/api/ai/digest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exploredFigures: progress.viewedFigures,
          exploredLessons: progress.viewedLessons,
          exploredTimelines: progress.viewedTimelines,
          totalXP: xpData.totalXP,
          rank,
        }),
      });

      const data = await response.json();
      setDigest(data);
      setGenerated(true);
    } catch {
      setDigest({
        summary: "Keep exploring! Every figure you discover adds to your understanding of history.",
        knowledgeGaps: ["Ancient civilizations", "Modern era leaders"],
        recommendations: ["Marcus Aurelius", "Cleopatra VII", "Leonardo da Vinci"],
        funFact: "The Roman Empire at its peak was home to roughly 70 million people.",
        encouragement: "As Confucius said, 'It does not matter how slowly you go as long as you do not stop.'",
      });
      setGenerated(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <h3 className="font-display text-lg font-bold text-white">Weekly Digest</h3>
          </div>
          <Badge variant="outline" className="border-white/20 text-white/50 font-mono text-[10px]">
            AI-Powered
          </Badge>
        </div>

        {!generated ? (
          <div className="text-center py-6">
            <p className="font-body text-sm text-white/60 mb-4">
              Get a personalized summary of your learning journey this week.
            </p>
            <Button
              onClick={generateDigest}
              disabled={loading}
              variant="outline"
              className="gap-2 border-white/20 text-white hover:bg-white/10"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {loading ? "Generating..." : "Generate My Digest"}
            </Button>
          </div>
        ) : digest ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Summary */}
            <p className="font-body text-sm text-white/70 leading-relaxed">{digest.summary}</p>

            {/* Knowledge Gaps */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Target className="h-3.5 w-3.5 text-amber-400" />
                <h4 className="font-display text-xs font-bold text-white/80">Areas to Explore</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {digest.knowledgeGaps.map((gap, i) => (
                  <Badge key={i} variant="outline" className="border-amber-400/20 text-amber-300 text-[10px]">
                    {gap}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                <h4 className="font-display text-xs font-bold text-white/80">Recommended Next</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {digest.recommendations.map((rec, i) => (
                  <Badge key={i} variant="outline" className="border-white/20 text-white/60 text-[10px]">
                    {rec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Fun Fact */}
            <div className="p-3 rounded-lg bg-amber-400/5 border border-amber-400/10">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="font-mono text-xs text-white/70 italic">{digest.funFact}</p>
              </div>
            </div>

            {/* Encouragement */}
            <p className="font-body text-xs text-white/50 italic">{digest.encouragement}</p>

            <Button
              onClick={generateDigest}
              disabled={loading}
              variant="ghost"
              size="sm"
              className="gap-1.5 text-white/40 hover:text-white"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
              Regenerate
            </Button>
          </motion.div>
        ) : null}
      </CardContent>
    </Card>
  );
}
