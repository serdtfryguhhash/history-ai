"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRICING_TIERS } from "@/lib/stripe";
import { Check, Crown, Sparkles, Star } from "lucide-react";

export default function PricingCards() {
  const tiers = Object.entries(PRICING_TIERS);

  const handleSubscribe = async (tier: string) => {
    if (tier === "free") {
      window.location.href = "/signup";
      return;
    }

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const icons = {
    free: Star,
    scholar: Sparkles,
    historian: Crown,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {tiers.map(([key, tier], index) => {
        const Icon = icons[key as keyof typeof icons];
        const isPopular = "popular" in tier && tier.popular;

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className={isPopular ? "md:-mt-4 md:mb-4" : ""}
          >
            <Card
              className={`relative h-full flex flex-col ${
                isPopular
                  ? "border-2 border-accent shadow-xl shadow-accent/10"
                  : "border-accent/20"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="accent" className="px-4 py-1 text-sm shadow-md">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-display text-2xl">{tier.name}</CardTitle>
                <CardDescription className="font-body">{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="font-display text-4xl font-bold text-primary">{tier.price}</span>
                  <span className="font-body text-ink-400 ml-1">/{tier.period}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-ink-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4">
                <Button
                  onClick={() => handleSubscribe(key)}
                  variant={isPopular ? "default" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
