"use client";

import React from "react";
import { motion } from "framer-motion";
import PricingCards from "@/components/features/pricing-cards";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Scroll, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades and at the end of your current billing period for downgrades.",
  },
  {
    question: "Is there a free trial?",
    answer: "The Free Explorer plan gives you 5 queries per day forever. For Scholar and Historian plans, we offer a 7-day free trial so you can experience the full platform before committing.",
  },
  {
    question: "How accurate are the AI historical figures?",
    answer: "Our AI simulations are based on extensive historical research, including primary sources, scholarly biographies, and preserved writings. While they capture the figure's known personality, beliefs, and speech patterns, they are AI approximations, not the actual historical person.",
  },
  {
    question: "Can I use History.ai for academic research?",
    answer: "History.ai is an excellent starting point for research, providing historical parallels, sources, and context. However, we recommend verifying all claims with primary sources for academic work. Our Historian plan includes advanced source citations to help with this.",
  },
  {
    question: "What's included in the weekly newsletter?",
    answer: "\"This Week in History That Still Matters\" delivers curated historical parallels for current events, featured figure profiles, lesson highlights, and exclusive content. It's free for all subscribers.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes. If you're not satisfied within the first 30 days, we'll refund your subscription in full. No questions asked. We're that confident in the value of historical wisdom.",
  },
];

export default function PricingPage() {
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
              <Scroll className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-3">
              Choose Your Path Through History
            </h1>
            <p className="font-body text-lg text-ink-400 max-w-2xl mx-auto">
              Start free and upgrade as you explore deeper. Every plan includes access to our
              curated historical knowledge base and daily digest.
            </p>
          </motion.div>

          <PricingCards />

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-10">
              <Badge variant="parchment" className="mb-3 font-mono">
                FAQ
              </Badge>
              <h2 className="font-display text-3xl font-bold text-ink">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-2 mb-2">
                      <HelpCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <h3 className="font-display text-sm font-bold text-ink">{faq.question}</h3>
                    </div>
                    <p className="font-body text-sm text-ink-400 leading-relaxed pl-7">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
