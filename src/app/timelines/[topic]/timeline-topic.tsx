"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import InteractiveTimeline from "@/components/features/interactive-timeline";
import { TimelineEvent } from "@/types";
import { ArrowLeft } from "lucide-react";

interface TimelineTopicPageProps {
  topic: { slug: string; name: string; description: string };
  events: TimelineEvent[];
}

export default function TimelineTopicPage({ topic, events }: TimelineTopicPageProps) {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-parchment-100 border-b border-accent/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/timelines"
            className="inline-flex items-center gap-2 text-sm font-body text-ink-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Timelines
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
            {topic.name}
          </h1>
          <p className="font-body text-ink-400 max-w-2xl mx-auto">{topic.description}</p>
          <p className="font-mono text-xs text-ink-300 mt-2">{events.length} events</p>
        </motion.div>

        <InteractiveTimeline events={events} title="" />
      </div>
    </div>
  );
}
