"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { lessons, lessonCategories } from "@/data/lessons";
import { GraduationCap, ArrowRight, Clock, Lightbulb } from "lucide-react";

export default function LessonsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredLessons = selectedCategory === "All"
    ? lessons
    : lessons.filter((l) => l.category === selectedCategory);

  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-gradient-to-b from-parchment-100 to-parchment py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-4">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-3">
              Lessons Library
            </h1>
            <p className="font-body text-lg text-ink-400 max-w-2xl mx-auto">
              In-depth historical lessons curated for modern application. Each lesson draws from real
              events, real figures, and real outcomes.
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <Button
              variant={selectedCategory === "All" ? "default" : "parchment"}
              size="sm"
              onClick={() => setSelectedCategory("All")}
            >
              All
            </Button>
            {lessonCategories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "parchment"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/lessons/${lesson.slug}`}>
                  <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="accent">{lesson.category}</Badge>
                        <Badge variant="outline" className="gap-1 text-[10px]">
                          <Clock className="h-3 w-3" />
                          {lesson.read_time} min
                        </Badge>
                        <Badge variant="parchment" className="text-[10px] capitalize">
                          {lesson.difficulty}
                        </Badge>
                      </div>

                      <h3 className="font-display text-xl font-bold text-ink group-hover:text-primary transition-colors mb-2">
                        {lesson.title}
                      </h3>
                      <p className="font-body text-sm text-ink-400 mb-4">{lesson.subtitle}</p>

                      <div className="space-y-2 mb-4">
                        {lesson.key_takeaways.slice(0, 3).map((takeaway, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs font-body text-ink-400">
                            <Lightbulb className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{takeaway}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-accent text-sm font-body group-hover:text-primary transition-colors">
                        Read Lesson
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
