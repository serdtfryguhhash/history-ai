"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

import { timelineTopics } from "@/data/timelines";
import { Clock, ArrowRight, Globe, Sword, Lightbulb, Crown, Scale } from "lucide-react";

const topicIcons: Record<string, React.ElementType> = {
  "rise-and-fall-of-empires": Globe,
  "scientific-revolution": Lightbulb,
  "democracy-and-freedom": Scale,
  "innovation-and-technology": Lightbulb,
  "great-leaders": Crown,
  "wars-that-changed-the-world": Sword,
};

export default function TimelinesPage() {
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
              <Clock className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-3">
              Interactive Timelines
            </h1>
            <p className="font-body text-lg text-ink-400 max-w-2xl mx-auto">
              Explore zoomable timelines spanning 5,000 years of human history. Click any event for
              AI-powered analysis and modern relevance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelineTopics.map((topic, index) => {
              const Icon = topicIcons[topic.slug] || Clock;
              return (
                <motion.div
                  key={topic.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/timelines/${topic.slug}`}>
                    <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-ink group-hover:text-primary transition-colors mb-2">
                          {topic.name}
                        </h3>
                        <p className="font-body text-sm text-ink-400 leading-relaxed mb-4">
                          {topic.description}
                        </p>
                        <div className="flex items-center gap-1 text-accent text-sm font-body group-hover:text-primary transition-colors">
                          Explore Timeline
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
