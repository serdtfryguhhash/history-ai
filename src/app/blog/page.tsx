"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog-posts";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import NewsletterSignup from "@/components/features/newsletter-signup";

export default function BlogPage() {
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
              <Newspaper className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-3">
              The History.ai Blog
            </h1>
            <p className="font-body text-lg text-ink-400 max-w-2xl mx-auto">
              Deep dives into historical parallels for modern challenges. Written by our research team
              and powered by AI-assisted historical analysis.
            </p>
          </motion.div>

          {/* Featured Post */}
          {blogPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <Link href={`/blog/${blogPosts[0].slug}`}>
                <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-8 lg:p-12 flex items-center justify-center min-h-[250px]">
                      <div className="text-center">
                        <Newspaper className="h-16 w-16 text-primary/30 mx-auto mb-4" />
                        <Badge variant="accent">Featured</Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="parchment">{blogPosts[0].category}</Badge>
                        <span className="font-mono text-xs text-ink-300">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {blogPosts[0].published_at}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-ink group-hover:text-primary transition-colors mb-3">
                        {blogPosts[0].title}
                      </h2>
                      <p className="font-body text-ink-400 leading-relaxed mb-4">
                        {blogPosts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-accent font-body text-sm group-hover:text-primary transition-colors">
                        Read Article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )}

          {/* All Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="h-40 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
                      <Newspaper className="h-10 w-10 text-primary/20" />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="parchment" className="text-[10px]">{post.category}</Badge>
                        <span className="font-mono text-[10px] text-ink-300">{post.published_at}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="font-body text-sm text-ink-400 line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <NewsletterSignup />
    </div>
  );
}
