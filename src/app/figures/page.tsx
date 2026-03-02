"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import FigureCard from "@/components/features/figure-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { historicalFigures } from "@/data/figures";
import { Search, Users, ChevronDown } from "lucide-react";

const FIGURES_PER_PAGE = 24;

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

const eras = [
  "All Eras",
  "Ancient Egypt",
  "Ancient Greece",
  "Ancient Mesopotamia",
  "Ancient India",
  "Ancient China",
  "Roman Republic",
  "Roman Empire",
  "Classical China",
  "Medieval Europe",
  "Islamic Golden Age",
  "Medieval Asia",
  "Renaissance",
  "Age of Exploration",
  "Enlightenment",
  "Industrial Revolution",
  "19th Century",
  "World War Era",
  "Cold War",
  "Modern Era",
];

export default function FiguresPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEra, setSelectedEra] = useState("All Eras");
  const [visibleCount, setVisibleCount] = useState(FIGURES_PER_PAGE);

  const filteredFigures = useMemo(() => {
    let results = historicalFigures;

    if (search) {
      const lower = search.toLowerCase();
      results = results.filter(
        (f) =>
          f.name.toLowerCase().includes(lower) ||
          f.title.toLowerCase().includes(lower) ||
          f.era.toLowerCase().includes(lower) ||
          f.short_bio.toLowerCase().includes(lower) ||
          f.nationality.toLowerCase().includes(lower)
      );
    }

    if (selectedCategory !== "All") {
      results = results.filter((f) => f.categories.includes(selectedCategory));
    }

    if (selectedEra !== "All Eras") {
      results = results.filter((f) =>
        f.era.toLowerCase().includes(selectedEra.toLowerCase())
      );
    }

    return results;
  }, [search, selectedCategory, selectedEra]);

  const visibleFigures = filteredFigures.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFigures.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + FIGURES_PER_PAGE);
  };

  // Reset visible count when filters change
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(FIGURES_PER_PAGE);
  };

  const handleEraChange = (era: string) => {
    setSelectedEra(era);
    setVisibleCount(FIGURES_PER_PAGE);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm py-12 md:py-16 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/20 mx-auto mb-4">
              <Users className="h-7 w-7 text-amber-400" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Historical Figures
            </h1>
            <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
              Explore {historicalFigures.length}+ detailed profiles of history&apos;s most influential
              minds. Click any figure to read their full story and chat with their AI simulation.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(FIGURES_PER_PAGE);
                }}
                placeholder="Search by name, era, nationality, or category..."
                className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400/50 focus:ring-amber-400/20"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(cat)}
                className={
                  selectedCategory === cat
                    ? "bg-amber-400 text-black hover:bg-amber-500 text-sm"
                    : "border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-sm"
                }
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Era Filter Dropdown */}
          <div className="flex justify-center">
            <select
              value={selectedEra}
              onChange={(e) => handleEraChange(e.target.value)}
              className="bg-white/10 border border-white/20 text-white/80 rounded-lg px-4 py-2 text-sm font-body focus:border-amber-400/50 focus:ring-amber-400/20 focus:outline-none appearance-none cursor-pointer"
            >
              {eras.map((era) => (
                <option key={era} value={era} className="bg-gray-900 text-white">
                  {era}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-black/30 backdrop-blur-sm min-h-[60vh]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="font-body text-sm text-white/60">
              Showing {visibleFigures.length} of {filteredFigures.length} figures
            </p>
          </div>

          {visibleFigures.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleFigures.map((figure, index) => (
                  <FigureCard key={figure.id} figure={figure} index={index % FIGURES_PER_PAGE} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    size="lg"
                    className="gap-2 border-white/30 text-white hover:bg-white/10 hover:border-amber-400/50 px-8"
                  >
                    <ChevronDown className="h-5 w-5" />
                    Load More Figures ({filteredFigures.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <Users className="h-12 w-12 text-white/20 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-white mb-2">No Figures Found</h3>
              <p className="font-body text-white/60">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
