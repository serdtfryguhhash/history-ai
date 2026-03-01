"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroSection from "@/components/features/hero-section";
import FigureCard from "@/components/features/figure-card";
import NewsletterSignup from "@/components/features/newsletter-signup";
import DailyDigestCard from "@/components/features/daily-digest-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { historicalFigures } from "@/data/figures";
import { lessons } from "@/data/lessons";
import { dailyDigests } from "@/data/daily-digests";
import {
  ArrowRight,
  Clock,
  GraduationCap,
  History,
  MessageSquare,
  Newspaper,
  Sparkles,
  Users,
  Quote,
  Lightbulb,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Ask History Engine",
    description:
      "Describe any modern problem and get historical parallels with real sources, dates, and actionable lessons.",
    href: "/ask",
  },
  {
    icon: Users,
    title: "500+ Historical Figures",
    description:
      'Chat with AI simulations of history\'s greatest minds. Ask Marcus Aurelius about leadership or Cleopatra about diplomacy.',
    href: "/figures",
  },
  {
    icon: Clock,
    title: "Interactive Timelines",
    description:
      "Explore zoomable timelines spanning 5,000 years. Click any event for AI-powered analysis and modern relevance.",
    href: "/timelines",
  },
  {
    icon: GraduationCap,
    title: "Lessons Library",
    description:
      "Curated historical lessons on Leadership, Strategy, Economics, Innovation, and more—with real examples.",
    href: "/lessons",
  },
  {
    icon: Sparkles,
    title: "Daily History Digest",
    description:
      "Every day, a curated historical fact with modern relevance. Shareable social cards for your network.",
    href: "/daily",
  },
  {
    icon: Newspaper,
    title: "Weekly Newsletter",
    description:
      '"This Week in History That Still Matters." Join 10,000+ history enthusiasts who learn from the past.',
    href: "/blog",
  },
];

export default function HomePage() {
  const featuredFigures = historicalFigures.slice(0, 4);
  const todayDigest = dailyDigests[0];
  const featuredLessons = lessons.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="parchment" className="mb-4 font-mono bg-white/10 border-white/20 text-white/80">
              Features
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              5,000 Years of Wisdom, One Platform
            </h2>
            <p className="font-body text-white/70 max-w-2xl mx-auto">
              History.ai combines AI technology with comprehensive historical scholarship to help you
              learn from humanity&apos;s collective experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/20 mb-4 group-hover:bg-amber-400/30 transition-colors">
                        <feature.icon className="h-6 w-6 text-amber-400" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                        {feature.title}
                      </h3>
                      <p className="font-body text-sm text-white/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Figures */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge variant="parchment" className="mb-3 font-mono bg-white/10 border-white/20 text-white/80">
                Historical Figures
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                Converse With History&apos;s Greatest Minds
              </h2>
            </div>
            <Link href="/figures">
              <Button variant="outline" className="hidden md:flex gap-2 border-white/30 text-white hover:bg-white/10">
                View All Figures
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFigures.map((figure, index) => (
              <FigureCard key={figure.id} figure={figure} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/figures">
              <Button variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10">
                View All Figures
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary-800 to-secondary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Quote className="h-10 w-10 text-accent/60 mx-auto mb-6" />
            <blockquote className="font-display text-2xl md:text-3xl font-bold text-parchment-50 italic leading-relaxed mb-6">
              &ldquo;The farther backward you can look, the farther forward you are likely to see.&rdquo;
            </blockquote>
            <p className="font-mono text-accent-300">— Winston Churchill</p>
          </motion.div>
        </div>
      </section>

      {/* Daily Digest Preview */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="parchment" className="mb-3 font-mono bg-white/10 border-white/20 text-white/80">
                Daily Digest
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                History That Matters Today
              </h2>
              <p className="font-body text-white/70 mb-6 leading-relaxed">
                Every day, we curate a historical fact with modern relevance. Share it, discuss it,
                and add it to your understanding of how the past illuminates the present.
              </p>
              <Link href="/daily">
                <Button className="gap-2">
                  See All Digests
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <DailyDigestCard digest={todayDigest} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lessons Preview */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="parchment" className="mb-3 font-mono bg-white/10 border-white/20 text-white/80">
              Lessons Library
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Curated Wisdom From the Ages
            </h2>
            <p className="font-body text-white/70 max-w-2xl mx-auto">
              In-depth lessons drawn from real historical events, curated by category for practical
              modern application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/lessons/${lesson.slug}`}>
                  <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="accent">{lesson.category}</Badge>
                        <span className="font-mono text-xs text-white/50">{lesson.read_time} min read</span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                        {lesson.title}
                      </h3>
                      <p className="font-body text-sm text-white/70 mb-4">{lesson.subtitle}</p>
                      <div className="flex flex-wrap gap-1">
                        {lesson.key_takeaways.slice(0, 2).map((takeaway, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs font-body text-white/60">
                            <Lightbulb className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/lessons">
              <Button variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10">
                Browse All Lessons
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ask History CTA */}
      <section className="py-20 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/20 mb-6 mx-auto">
              <History className="h-8 w-8 text-amber-400" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              What Would History Do?
            </h2>
            <p className="font-body text-white/70 max-w-xl mx-auto mb-8">
              Every problem you face has been faced before—by emperors, generals, scientists, and
              revolutionaries. Let their experience guide your decisions.
            </p>
            <Link href="/ask">
              <Button size="xl" className="gap-2">
                <MessageSquare className="h-5 w-5" />
                Ask History Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  );
}
