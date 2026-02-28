"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import FigureCard from "@/components/features/figure-card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { historicalFigures } from "@/data/figures";
import { Search, Users } from "lucide-react";

const categories = [
  "All",
  "Leadership",
  "War & Strategy",
  "Philosophy",
  "Science",
  "Innovation",
  "Art & Culture",
  "Governance",
  "Diplomacy",
  "Revolution",
  "Economics",
];


export default function FiguresPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFigures = useMemo(() => {
    let results = historicalFigures;

    if (search) {
      const lower = search.toLowerCase();
      results = results.filter(
        (f) =>
          f.name.toLowerCase().includes(lower) ||
          f.title.toLowerCase().includes(lower) ||
          f.era.toLowerCase().includes(lower) ||
          f.short_bio.toLowerCase().includes(lower)
      );
    }

    if (selectedCategory !== "All") {
      results = results.filter((f) => f.categories.includes(selectedCategory));
    }

    return results;
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <div className="bg-gradient-to-b from-parchment-100 to-parchment py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-4">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-3">
              Historical Figures
            </h1>
            <p className="font-body text-lg text-ink-400 max-w-2xl mx-auto">
              Explore {historicalFigures.length}+ detailed profiles of history&apos;s most influential
              minds. Click any figure to read their full story and chat with their AI simulation.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-300" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, era, or category..."
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "parchment"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="text-sm"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="font-body text-sm text-ink-400">
            Showing {filteredFigures.length} of {historicalFigures.length} figures
          </p>
        </div>

        {filteredFigures.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFigures.map((figure, index) => (
              <FigureCard key={figure.id} figure={figure} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Users className="h-12 w-12 text-ink-200 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-ink mb-2">No Figures Found</h3>
            <p className="font-body text-ink-400">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
