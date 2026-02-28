"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lesson } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, BookOpen, Clock, Lightbulb, Users } from "lucide-react";

interface LessonDetailPageProps {
  lesson: Lesson;
}

export default function LessonDetailPage({ lesson }: LessonDetailPageProps) {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-parchment-100 border-b border-accent/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/lessons"
            className="inline-flex items-center gap-2 text-sm font-body text-ink-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Lessons Library
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="accent">{lesson.category}</Badge>
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {lesson.read_time} min read
              </Badge>
              <Badge variant="parchment" className="capitalize">
                {lesson.difficulty}
              </Badge>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
              {lesson.title}
            </h1>
            <p className="font-body text-xl text-ink-400">{lesson.subtitle}</p>
          </div>

          <Separator className="mb-8" />

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="font-display text-2xl font-bold text-ink mt-8 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-display text-xl font-bold text-ink mt-6 mb-3">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="font-body text-ink-500 leading-relaxed mb-4">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-primary">{children}</strong>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 font-body text-ink-500">{children}</ol>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 font-body text-ink-500">{children}</ul>
                ),
              }}
            >
              {lesson.content}
            </ReactMarkdown>
          </div>

          {/* Key Takeaways */}
          <Card className="bg-accent/5 border-accent/20 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-accent" />
                <h3 className="font-display text-xl font-bold text-primary">Key Takeaways</h3>
              </div>
              <ul className="space-y-3">
                {lesson.key_takeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 shrink-0 mt-0.5">
                      <span className="font-mono text-xs font-bold text-accent">{i + 1}</span>
                    </div>
                    <span className="font-body text-sm text-ink-500">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Historical Examples */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-accent" />
                <h3 className="font-display text-xl font-bold text-ink">Historical Examples</h3>
              </div>
              <ul className="space-y-2">
                {lesson.historical_examples.map((example, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent font-mono">&#8226;</span>
                    <span className="font-body text-sm text-ink-500">{example}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Figures Mentioned */}
          {lesson.figures_mentioned.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Users className="h-5 w-5 text-ink-300" />
              <span className="font-body text-sm text-ink-400">Figures mentioned:</span>
              {lesson.figures_mentioned.map((slug) => (
                <Link key={slug} href={`/figures/${slug}`}>
                  <Badge variant="parchment" className="capitalize hover:bg-primary/10 cursor-pointer transition-colors">
                    {slug.replace(/-/g, " ")}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </motion.article>
      </div>
    </div>
  );
}
