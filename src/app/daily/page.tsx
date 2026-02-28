"use client";

import React from "react";
import { motion } from "framer-motion";
import DailyDigestCard from "@/components/features/daily-digest-card";
import { dailyDigests, getTodaysDigest } from "@/data/daily-digests";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Calendar } from "lucide-react";

export default function DailyPage() {
  const todayDigest = getTodaysDigest();

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-gradient-to-b from-parchment-100 to-parchment py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-4">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-3">
              Daily History Digest
            </h1>
            <p className="font-body text-lg text-ink-400 max-w-2xl mx-auto">
              Every day, a curated historical fact with modern relevance. Share these insights with
              your network and add to your historical literacy, one day at a time.
            </p>
          </motion.div>

          {/* Today's Digest */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="accent" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Today&apos;s Digest
              </Badge>
            </div>
            <DailyDigestCard digest={todayDigest} />
          </div>

          {/* Previous Digests */}
          <div>
            <h2 className="font-display text-2xl font-bold text-ink mb-6 text-center">
              Recent Digests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyDigests.map((digest, index) => (
                <motion.div
                  key={digest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="parchment" className="font-mono text-xs gap-1">
                          <Calendar className="h-3 w-3" />
                          {digest.date}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          {digest.category}
                        </Badge>
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink mb-2">{digest.title}</h3>
                      <p className="font-body text-sm text-ink-400 line-clamp-3 mb-3">
                        {digest.historical_fact}
                      </p>
                      <p className="font-mono text-xs text-accent italic line-clamp-2">
                        {digest.share_text}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
