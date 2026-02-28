"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import NewsletterSignup from "@/components/features/newsletter-signup";

interface BlogDetailPageProps {
  post: BlogPost;
}

export default function BlogDetailPage({ post }: BlogDetailPageProps) {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="bg-parchment-100 border-b border-accent/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-body text-ink-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="accent">{post.category}</Badge>
              <div className="flex items-center gap-1 text-xs font-mono text-ink-300">
                <Calendar className="h-3 w-3" />
                {post.published_at}
              </div>
              <div className="flex items-center gap-1 text-xs font-body text-ink-300">
                <User className="h-3 w-3" />
                {post.author}
              </div>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
              {post.title}
            </h1>
            <p className="font-body text-xl text-ink-400">{post.excerpt}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="parchment" className="gap-1">
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="mb-8" />

          {/* Content */}
          <div className="prose prose-lg max-w-none">
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
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-accent/40 pl-4 my-4 italic font-mono text-sm text-ink-400">
                    {children}
                  </blockquote>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 font-body text-ink-500">{children}</ol>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 font-body text-ink-500">{children}</ul>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </article>

      <NewsletterSignup />
    </div>
  );
}
