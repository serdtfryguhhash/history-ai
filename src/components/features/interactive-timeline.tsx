"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineEvent } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatYear } from "@/lib/utils";
import { ChevronDown, Lightbulb, X } from "lucide-react";

interface InteractiveTimelineProps {
  events: TimelineEvent[];
  title: string;
}

export default function InteractiveTimeline({ events, title }: InteractiveTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const visibleEvents = events.slice(0, visibleCount);

  return (
    <div className="relative">
      <h2 className="font-display text-3xl font-bold text-ink mb-8 text-center">{title}</h2>

      {/* Timeline Line */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary -translate-x-1/2 hidden md:block" />

        {/* Events */}
        <div className="space-y-8 md:space-y-12">
          {visibleEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative flex items-center gap-4 md:gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content Card */}
              <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <Card
                  className="cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                  onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
                >
                  <CardContent className="p-5">
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <Badge variant="parchment" className="font-mono text-xs">
                        {formatYear(event.year)}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {event.category}
                      </Badge>
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="font-body text-sm text-ink-400 mt-1">{event.description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Center Dot */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                <div
                  className={`h-5 w-5 rounded-full border-3 border-parchment transition-all duration-300 ${
                    selectedEvent?.id === event.id
                      ? "bg-accent scale-125 shadow-lg shadow-accent/30"
                      : "bg-primary hover:bg-accent hover:scale-110"
                  }`}
                  style={{ borderWidth: "3px" }}
                />
              </div>

              {/* Spacer for other side */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>

        {/* Show More */}
        {visibleCount < events.length && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setVisibleCount((prev) => prev + 10)}
              className="gap-2"
            >
              <ChevronDown className="h-4 w-4" />
              Show More Events
            </Button>
          </div>
        )}
      </div>

      {/* Expanded Event Detail */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-parchment-50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="accent" className="font-mono">
                      {formatYear(selectedEvent.year)}
                    </Badge>
                    <Badge variant="outline">{selectedEvent.category}</Badge>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-1 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <X className="h-5 w-5 text-ink-400" />
                  </button>
                </div>

                <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-4">
                  {selectedEvent.title}
                </h2>

                <p className="font-body text-ink-500 leading-relaxed mb-6">
                  {selectedEvent.long_description}
                </p>

                {/* Modern Relevance */}
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    <h3 className="font-display text-lg font-bold text-primary">Modern Relevance</h3>
                  </div>
                  <p className="font-body text-sm text-ink-500 leading-relaxed">
                    {selectedEvent.modern_relevance}
                  </p>
                </div>

                {selectedEvent.figures_involved.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-body text-sm text-ink-400">Key Figures:</span>
                    {selectedEvent.figures_involved.map((f) => (
                      <Badge key={f} variant="parchment" className="capitalize">
                        {f.replace(/-/g, " ")}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
