"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HistoricalFigure } from "@/types";
import FigureChat from "@/components/features/figure-chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Globe,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Quote,
  Star,
  Trophy,
  Users,
} from "lucide-react";

interface FigureProfilePageProps {
  figure: HistoricalFigure;
}

export default function FigureProfilePage({ figure }: FigureProfilePageProps) {
  return (
    <div className="min-h-screen bg-parchment">
      {/* Back nav */}
      <div className="bg-parchment-100 border-b border-accent/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/figures"
            className="inline-flex items-center gap-2 text-sm font-body text-ink-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Figures
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-primary/5 via-parchment-100 to-parchment py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Profile Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-primary/15 border-2 border-accent/30 shrink-0">
                  <span className="font-display text-3xl md:text-4xl font-bold text-primary">
                    {getInitials(figure.name)}
                  </span>
                </div>
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-ink">{figure.name}</h1>
                  <p className="font-body text-lg text-accent-700 mt-1">{figure.title}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <Badge variant="parchment" className="gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="font-mono text-xs">
                        {figure.born} — {figure.died}
                      </span>
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Globe className="h-3 w-3" />
                      {figure.nationality}
                    </Badge>
                    <Badge variant="outline">{figure.era}</Badge>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {figure.categories.map((cat) => (
                  <Badge key={cat} variant="accent">
                    {cat}
                  </Badge>
                ))}
              </div>

              {/* Bio */}
              <div className="prose max-w-none">
                {figure.full_bio.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="font-body text-ink-500 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Right: Quick Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="h-5 w-5 text-accent" />
                    Quick Facts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-display text-sm font-bold text-ink mb-1">Born</h4>
                    <p className="font-mono text-sm text-ink-400">{figure.born}</p>
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-ink mb-1">Died</h4>
                    <p className="font-mono text-sm text-ink-400">{figure.died}</p>
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-ink mb-1">Era</h4>
                    <p className="font-body text-sm text-ink-400">{figure.era}</p>
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-ink mb-1">Nationality</h4>
                    <p className="font-body text-sm text-ink-400">{figure.nationality}</p>
                  </div>
                  <Separator />
                  <Link href="/ask">
                    <Button variant="outline" className="w-full gap-2" size="sm">
                      <MessageSquare className="h-4 w-4" />
                      Ask History About {figure.name.split(" ")[0]}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Key Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="h-6 w-6 text-accent" />
            <h2 className="font-display text-2xl font-bold text-ink">Key Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {figure.key_achievements.map((achievement, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 shrink-0 mt-0.5">
                    <span className="font-mono text-sm font-bold text-accent">{i + 1}</span>
                  </div>
                  <p className="font-body text-sm text-ink-500">{achievement}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Famous Quotes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Quote className="h-6 w-6 text-accent" />
            <h2 className="font-display text-2xl font-bold text-ink">Famous Quotes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {figure.famous_quotes.map((quote, i) => (
              <Card key={i} className="bg-parchment-200/30">
                <CardContent className="p-5">
                  <Quote className="h-5 w-5 text-accent/40 mb-2" />
                  <p className="font-mono text-sm text-ink-600 italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
                  <p className="font-body text-xs text-ink-300 mt-3">— {figure.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Lessons for Today */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="h-6 w-6 text-accent" />
            <h2 className="font-display text-2xl font-bold text-ink">Lessons for Today</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {figure.lessons_for_today.map((lesson, i) => (
              <Card key={i} className="bg-accent/5 border-accent/20">
                <CardContent className="p-4 flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <p className="font-body text-sm text-ink-500">{lesson}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Chat Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="h-6 w-6 text-accent" />
            <h2 className="font-display text-2xl font-bold text-ink">
              Chat with {figure.name}
            </h2>
          </div>
          <p className="font-body text-ink-400 mb-6">
            Our AI simulates {figure.name}&apos;s voice, knowledge, and personality based on historical
            records. Ask anything about their life, philosophy, or how their experience applies to
            modern challenges.
          </p>
          <FigureChat figure={figure} />
        </motion.section>
      </div>
    </div>
  );
}
