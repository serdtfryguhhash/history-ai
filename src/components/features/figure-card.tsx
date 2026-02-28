"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HistoricalFigure } from "@/types";
import { getInitials } from "@/lib/utils";
import { MessageSquare, Quote } from "lucide-react";

interface FigureCardProps {
  figure: HistoricalFigure;
  index?: number;
}

export default function FigureCard({ figure, index = 0 }: FigureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/figures/${figure.slug}`}>
        <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden h-full">
          {/* Portrait Area */}
          <div className="relative h-48 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-parchment-50/80 to-transparent z-10" />
            <div className="relative z-0 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 border-2 border-accent/30">
              <span className="font-display text-3xl font-bold text-primary">
                {getInitials(figure.name)}
              </span>
            </div>
            {/* Era Badge */}
            <div className="absolute top-3 right-3 z-20">
              <Badge variant="parchment" className="text-[10px] font-mono">
                {figure.era}
              </Badge>
            </div>
          </div>

          <CardContent className="p-5">
            {/* Name & Title */}
            <h3 className="font-display text-xl font-bold text-ink group-hover:text-primary transition-colors">
              {figure.name}
            </h3>
            <p className="font-body text-sm text-accent-700 mt-0.5">{figure.title}</p>

            {/* Dates */}
            <p className="font-mono text-xs text-ink-300 mt-2">
              {figure.born} — {figure.died}
            </p>

            {/* Bio */}
            <p className="font-body text-sm text-ink-400 mt-3 line-clamp-3 leading-relaxed">
              {figure.short_bio}
            </p>

            {/* Quote */}
            <div className="mt-4 p-3 rounded-lg bg-parchment-200/50 border border-accent/10">
              <div className="flex gap-2">
                <Quote className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <p className="font-mono text-xs text-ink-500 italic line-clamp-2">
                  {figure.famous_quotes[0]}
                </p>
              </div>
            </div>

            {/* Categories & Chat */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-wrap gap-1">
                {figure.categories.slice(0, 2).map((cat) => (
                  <Badge key={cat} variant="outline" className="text-[10px]">
                    {cat}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-1 text-accent text-xs font-body group-hover:text-primary transition-colors">
                <MessageSquare className="h-3.5 w-3.5" />
                Chat
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
