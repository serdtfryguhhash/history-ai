"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEventForDate, getFallbackEvent } from "@/data/this-day-in-history";
import type { HistoricalDayEvent } from "@/data/this-day-in-history";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const monthNames = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const categoryColors: Record<string, string> = {
  War: "bg-red-500/20 text-red-300 border-red-500/30",
  Science: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Politics: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Culture: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Exploration: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Economics: "bg-green-500/20 text-green-300 border-green-500/30",
  Revolution: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Technology: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Diplomacy: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Philosophy: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export default function ThisDayInHistory() {
  const [dayOffset, setDayOffset] = useState(0);

  const currentDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    return d;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayOffset]);

  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const dateLabel = `${monthNames[month]} ${day}`;

  const event: HistoricalDayEvent = useMemo(() => {
    return getEventForDate(month, day) || getFallbackEvent();
  }, [month, day]);

  const yearLabel =
    event.year < 0
      ? `${Math.abs(event.year)} BCE`
      : event.year < 100
      ? `${event.year} CE`
      : `${event.year}`;

  const catColor =
    categoryColors[event.category] ||
    "bg-white/10 text-white/70 border-white/20";

  return (
    <section className="py-16 bg-black/50 backdrop-blur-sm border-b border-white/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/20 mx-auto mb-4">
              <CalendarDays className="h-6 w-6 text-amber-400" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
              On This Day in History
            </h2>
            <p className="font-body text-white/50 text-sm">
              Discover what happened on this date throughout the ages
            </p>
          </div>

          {/* Event Card */}
          <Card className="bg-gradient-to-br from-amber-900/20 via-black/40 to-amber-950/20 border border-amber-400/15 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              {/* Date Header Bar */}
              <div className="flex items-center justify-between px-5 py-3 bg-amber-400/5 border-b border-amber-400/10">
                <button
                  onClick={() => setDayOffset((prev) => prev - 1)}
                  className="flex items-center gap-1 text-white/50 hover:text-amber-400 transition-colors text-sm font-body"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous Day</span>
                </button>
                <div className="text-center">
                  <p className="font-display text-lg font-bold text-amber-400">
                    {dateLabel}
                  </p>
                </div>
                <button
                  onClick={() => setDayOffset((prev) => prev + 1)}
                  className="flex items-center gap-1 text-white/50 hover:text-amber-400 transition-colors text-sm font-body"
                >
                  <span className="hidden sm:inline">Next Day</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Event Content */}
              <div className="px-6 py-6 md:px-8 md:py-7">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge
                    className={`text-[11px] font-mono border ${catColor}`}
                  >
                    {event.category}
                  </Badge>
                  <span className="font-mono text-xs text-amber-400/70">
                    {yearLabel}
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                  {event.title}
                </h3>

                <p className="font-body text-sm md:text-base text-white/70 leading-relaxed mb-5">
                  {event.description}
                </p>

                {/* Why It Matters */}
                <div className="rounded-lg bg-amber-400/5 border border-amber-400/10 p-4">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-display text-sm font-semibold text-amber-400 mb-1">
                        Why It Matters Today
                      </p>
                      <p className="font-body text-sm text-white/60 leading-relaxed">
                        {event.whyItMatters}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ask AI Button */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link href={`/ask?q=Tell me more about: ${encodeURIComponent(event.title)}`}>
                    <Button
                      size="sm"
                      className="gap-2 bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Ask AI About This Event
                    </Button>
                  </Link>
                  {dayOffset !== 0 && (
                    <button
                      onClick={() => setDayOffset(0)}
                      className="text-xs font-body text-white/40 hover:text-white/60 transition-colors underline underline-offset-2"
                    >
                      Back to today
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
