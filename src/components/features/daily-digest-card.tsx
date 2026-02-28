"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DailyDigest } from "@/types";
import { Calendar, Lightbulb, Share2 } from "lucide-react";

interface DailyDigestCardProps {
  digest: DailyDigest;
}

export default function DailyDigestCard({ digest }: DailyDigestCardProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: digest.title,
        text: digest.share_text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(digest.share_text);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-parchment-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="font-mono text-sm">{digest.date}</span>
            </div>
            <Badge className="bg-parchment-50/20 text-parchment-50 border-parchment-50/30">
              {digest.category}
            </Badge>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">{digest.title}</h2>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Historical Fact */}
          <div>
            <h3 className="font-display text-lg font-bold text-ink mb-2">What Happened</h3>
            <p className="font-body text-ink-500 leading-relaxed">{digest.historical_fact}</p>
          </div>

          {/* Modern Relevance */}
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-bold text-primary">Why It Still Matters</h3>
            </div>
            <p className="font-body text-sm text-ink-500 leading-relaxed">{digest.modern_relevance}</p>
          </div>

          {/* Share */}
          <div className="flex items-center justify-between pt-4 border-t border-accent/10">
            <p className="font-mono text-xs text-ink-300">Share this insight</p>
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
