"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary via-primary-800 to-secondary py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-parchment-50/10 text-accent-300 text-sm font-mono mb-6">
            <Mail className="h-4 w-4" />
            Weekly Newsletter
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-parchment-50 mb-4">
            This Week in History That Still Matters
          </h2>

          <p className="font-body text-parchment-200 max-w-xl mx-auto mb-8">
            Every week, we curate the most relevant historical lessons for today&apos;s challenges.
            Join 10,000+ history enthusiasts who learn from the past to navigate the present.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-accent-300"
            >
              <CheckCircle className="h-6 w-6" />
              <span className="font-body text-lg">Welcome aboard! Check your inbox for a confirmation.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-parchment-50/10 border-parchment-50/20 text-parchment-50 placeholder:text-parchment-300 focus-visible:ring-accent"
                required
              />
              <Button
                type="submit"
                variant="accent"
                disabled={status === "loading"}
                className="w-full sm:w-auto shrink-0"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe Free"
                )}
              </Button>
            </form>
          )}

          {status === "error" && (
            <p className="font-body text-sm text-red-300 mt-3">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="font-body text-xs text-parchment-400 mt-4">
            No spam. Unsubscribe anytime. We respect your inbox as we respect the archives.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
