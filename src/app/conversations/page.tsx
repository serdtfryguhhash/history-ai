"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { historicalFigures } from "@/data/figures";
import { HistoricalFigure } from "@/types";
import { getInitials } from "@/lib/utils";
import { trackFigureChat } from "@/lib/progress-tracker";
import { recordFigureExploration, recordConversationSummary } from "@/lib/ai-memory";
import { awardXP } from "@/lib/gamification";
import { AchievementToast } from "@/components/shared/AchievementToast";
import {
  MessageSquare,
  Search,
  Send,
  Loader2,
  User,
  ArrowLeft,
  History,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const CONVO_KEY = "history_ai_conversations";

interface ConversationRecord {
  figureSlug: string;
  messages: Message[];
  lastUpdated: string;
}

function getSavedConversations(): Record<string, ConversationRecord> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(CONVO_KEY);
  if (!stored) return {};
  try { return JSON.parse(stored); } catch { return {}; }
}

function saveConversation(figureSlug: string, messages: Message[]): void {
  if (typeof window === "undefined") return;
  const all = getSavedConversations();
  all[figureSlug] = { figureSlug, messages, lastUpdated: new Date().toISOString() };
  localStorage.setItem(CONVO_KEY, JSON.stringify(all));
}

function getChattedCount(): number {
  return Object.keys(getSavedConversations()).length;
}

export default function ConversationsPage() {
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chattedCount, setChattedCount] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", xp: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChattedCount(getChattedCount());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredFigures = useMemo(() => {
    if (!search) return historicalFigures.slice(0, 24);
    const lower = search.toLowerCase();
    return historicalFigures.filter(
      (f) =>
        f.name.toLowerCase().includes(lower) ||
        f.era.toLowerCase().includes(lower) ||
        f.title.toLowerCase().includes(lower)
    ).slice(0, 24);
  }, [search]);

  const handleSelectFigure = (figure: HistoricalFigure) => {
    setSelectedFigure(figure);
    setInput("");
    setIsLoading(false);

    // Load saved conversation or start fresh
    const saved = getSavedConversations();
    if (saved[figure.slug] && saved[figure.slug].messages.length > 0) {
      setMessages(saved[figure.slug].messages);
    } else {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Greetings. I am ${figure.name}, ${figure.title}. I have lived through extraordinary times - ${figure.era} - from ${figure.born} to ${figure.died}. What would you ask of me?`,
        },
      ]);
    }

    // Track
    trackFigureChat(figure.slug);
    recordFigureExploration(figure.name, figure.era, figure.categories);
    const result = awardXP("chat_figure", figure.name);
    if (result.xpGained > 0) {
      setToast({ show: true, message: `Chatting with ${figure.name}`, xp: result.xpGained });
    }
    setChattedCount(getChattedCount());
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading || !selectedFigure) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = newMessages
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          figure_name: selectedFigure.name,
          personality_prompt: selectedFigure.personality_prompt,
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "Forgive me - the connection between our ages has been disrupted.",
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
      saveConversation(selectedFigure.slug, updatedMessages);
      recordConversationSummary(`Discussed with ${selectedFigure.name}: ${input.trim().substring(0, 50)}`);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Forgive me - the connection between our ages has been momentarily disrupted. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm py-10 md:py-14 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/20 mx-auto mb-4">
            <MessageSquare className="h-7 w-7 text-amber-400" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Figure Conversations
          </h1>
          <p className="font-body text-lg text-white/70 max-w-xl mx-auto mb-4">
            Have in-depth, persistent conversations with history&apos;s greatest minds. Your transcripts are saved.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-amber-400">
            <History className="h-4 w-4" />
            <span className="font-mono text-sm">{chattedCount} figures chatted with</span>
          </div>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm min-h-[70vh]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {!selectedFigure ? (
            /* Figure Selection */
            <div>
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search figures by name, era..."
                    className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {filteredFigures.map((figure, index) => {
                  const hasConvo = !!getSavedConversations()[figure.slug];
                  return (
                    <motion.button
                      key={figure.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => handleSelectFigure(figure)}
                      className={`relative p-4 rounded-xl border-2 transition-all text-left group ${
                        hasConvo
                          ? "border-amber-400/30 bg-amber-400/5 hover:border-amber-400/50"
                          : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-900/30 mb-3">
                        <span className="font-display text-sm font-bold text-amber-400">
                          {getInitials(figure.name)}
                        </span>
                      </div>
                      <h3 className="font-display text-sm font-bold text-white leading-tight mb-0.5 group-hover:text-amber-400 transition-colors">
                        {figure.name}
                      </h3>
                      <p className="font-mono text-[10px] text-white/40">{figure.era}</p>
                      {hasConvo && (
                        <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-400" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Chat Interface */
            <div>
              <button
                onClick={() => setSelectedFigure(null)}
                className="flex items-center gap-2 text-sm font-body text-white/60 hover:text-amber-400 transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to All Figures
              </button>

              <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col h-[600px]">
                {/* Chat Header */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-white/5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-900/30">
                    <span className="font-display text-xs font-bold text-amber-400">
                      {getInitials(selectedFigure.name)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-white">{selectedFigure.name}</h3>
                    <p className="font-mono text-[10px] text-white/40">{selectedFigure.title}</p>
                  </div>
                  <Badge variant="parchment" className="ml-auto text-[10px] font-mono bg-white/10 border-white/20 text-white/60">
                    {selectedFigure.era}
                  </Badge>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                      >
                        {msg.role === "assistant" && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-900/30 mt-1">
                            <span className="font-display text-[10px] font-bold text-amber-400">
                              {getInitials(selectedFigure.name)}
                            </span>
                          </div>
                        )}
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === "user"
                            ? "bg-amber-600 text-white rounded-br-sm"
                            : "bg-amber-900/20 border border-amber-400/10 text-white/90 rounded-bl-sm"
                        }`}>
                          <div className="font-body text-sm leading-relaxed prose prose-sm max-w-none prose-invert">
                            {msg.role === "assistant" ? (
                              <ReactMarkdown>{msg.content}</ReactMarkdown>
                            ) : (
                              msg.content
                            )}
                          </div>
                        </div>
                        {msg.role === "user" && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 mt-1">
                            <User className="h-4 w-4 text-white/60" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-900/30">
                        <span className="font-display text-[10px] font-bold text-amber-400">
                          {getInitials(selectedFigure.name)}
                        </span>
                      </div>
                      <div className="bg-amber-900/20 border border-amber-400/10 rounded-2xl rounded-bl-sm px-4 py-3">
                        <div className="flex items-center gap-2 text-white/40">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="font-body text-sm italic">{selectedFigure.name} is pondering...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-white/10 bg-white/5 px-5 py-3">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                      placeholder={`Ask ${selectedFigure.name} a question...`}
                      disabled={isLoading}
                      className="flex-1 h-11 rounded-lg bg-white/10 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 font-body focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 disabled:opacity-50"
                    />
                    <Button
                      onClick={handleSubmit}
                      disabled={!input.trim() || isLoading}
                      size="icon"
                      className="h-11 w-11 shrink-0"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AchievementToast
        message={toast.message}
        xp={toast.xp}
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
