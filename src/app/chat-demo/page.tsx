"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Lock, ArrowRight } from "lucide-react";

interface DemoFigure {
  id: string;
  name: string;
  dates: string;
  tagline: string;
  initial: string;
  color: string;
  openingMessage: string;
}

const demoFigures: DemoFigure[] = [
  {
    id: "marcus",
    name: "Marcus Aurelius",
    dates: "121 - 180 CE",
    tagline: "Stoic Emperor of Rome",
    initial: "MA",
    color: "from-amber-700 to-amber-900",
    openingMessage:
      "Welcome. I am Marcus Aurelius, Emperor of Rome. What troubles you today that the Stoics might illuminate?",
  },
  {
    id: "cleopatra",
    name: "Cleopatra VII",
    dates: "69 - 30 BCE",
    tagline: "Last Pharaoh of Egypt",
    initial: "CL",
    color: "from-emerald-700 to-emerald-900",
    openingMessage:
      "I am Cleopatra, Pharaoh of Egypt, daughter of the Ptolemaic line. I ruled the wealthiest kingdom in the Mediterranean. What wisdom do you seek from me?",
  },
  {
    id: "leonardo",
    name: "Leonardo da Vinci",
    dates: "1452 - 1519",
    tagline: "Renaissance Polymath",
    initial: "LV",
    color: "from-blue-700 to-blue-900",
    openingMessage:
      "Greetings, curious soul! I am Leonardo, painter, inventor, and student of all nature. I believe observation is the key to understanding. What shall we explore together?",
  },
  {
    id: "suntzu",
    name: "Sun Tzu",
    dates: "544 - 496 BCE",
    tagline: "Master Strategist & Author",
    initial: "ST",
    color: "from-red-700 to-red-900",
    openingMessage:
      "I am Sun Tzu, author of The Art of War. Every battle is won before it is fought. Tell me of your conflict, and I shall help you see the path to victory.",
  },
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const MAX_MESSAGES = 5;

export default function ChatDemoPage() {
  const [selectedFigure, setSelectedFigure] = useState<DemoFigure>(
    demoFigures[0]
  );
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: demoFigures[0].openingMessage,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectFigure = (figure: DemoFigure) => {
    setSelectedFigure(figure);
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: figure.openingMessage,
      },
    ]);
    setInput("");
    setUserMessageCount(0);
    setIsLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading || userMessageCount >= MAX_MESSAGES) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    const newUserCount = userMessageCount + 1;
    setUserMessageCount(newUserCount);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMessage]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      // Include the opening message as the first assistant message for context
      const fullMessages = [
        { role: "assistant" as const, content: selectedFigure.openingMessage },
        ...apiMessages,
      ];

      const response = await fetch("/api/chat-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          figure_name: selectedFigure.name,
          messages: fullMessages,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            data.response ||
            "Forgive me, the connection between our ages has been disrupted.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Forgive me, the connection between our ages has been momentarily disrupted. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const limitReached = userMessageCount >= MAX_MESSAGES;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm py-10 md:py-14 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge
            variant="parchment"
            className="mb-4 font-mono bg-white/10 border-white/20 text-white/80"
          >
            Free Demo
          </Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Chat With History&apos;s Greatest Minds
          </h1>
          <p className="font-body text-white/70 max-w-xl mx-auto">
            Select a historical figure and start a conversation. Experience how
            the past can illuminate the present.
          </p>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm min-h-[70vh]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Figure Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {demoFigures.map((figure) => (
              <button
                key={figure.id}
                onClick={() => handleSelectFigure(figure)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
                  selectedFigure.id === figure.id
                    ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/10"
                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${figure.color} mb-3 shadow-md`}
                >
                  <span className="font-display text-sm font-bold text-white">
                    {figure.initial}
                  </span>
                </div>
                <h3 className="font-display text-sm font-bold text-white leading-tight mb-0.5">
                  {figure.name}
                </h3>
                <p className="font-mono text-[10px] text-white/40 mb-1">
                  {figure.dates}
                </p>
                <p className="font-body text-xs text-white/60 leading-snug">
                  {figure.tagline}
                </p>
                {selectedFigure.id === figure.id && (
                  <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-400" />
                )}
              </button>
            ))}
          </div>

          {/* Chat Interface */}
          <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col h-[500px]">
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-white/5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${selectedFigure.color} shadow-sm`}
              >
                <span className="font-display text-xs font-bold text-white">
                  {selectedFigure.initial}
                </span>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-white">
                  {selectedFigure.name}
                </h3>
                <p className="font-mono text-[10px] text-white/40">
                  {selectedFigure.tagline}
                </p>
              </div>
              <Badge
                variant="parchment"
                className="ml-auto text-[10px] font-mono bg-white/10 border-white/20 text-white/60"
              >
                {userMessageCount}/{MAX_MESSAGES} messages
              </Badge>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    } gap-2`}
                  >
                    {msg.role === "assistant" && (
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${selectedFigure.color} mt-1 shadow-sm`}
                      >
                        <span className="font-display text-[10px] font-bold text-white">
                          {selectedFigure.initial}
                        </span>
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-amber-600 text-white rounded-br-sm"
                          : "bg-amber-900/20 border border-amber-400/10 text-white/90 rounded-bl-sm"
                      }`}
                    >
                      <p className="font-body text-sm leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                    {msg.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 mt-1">
                        <span className="font-body text-xs text-white/70">
                          You
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${selectedFigure.color} shadow-sm`}
                  >
                    <span className="font-display text-[10px] font-bold text-white">
                      {selectedFigure.initial}
                    </span>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-400/10 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="inline-block h-2 w-2 rounded-full bg-amber-400/60 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="inline-block h-2 w-2 rounded-full bg-amber-400/60 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="inline-block h-2 w-2 rounded-full bg-amber-400/60 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Limit Reached CTA */}
              {limitReached && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center py-4"
                >
                  <div className="text-center rounded-xl border border-amber-400/20 bg-amber-400/5 px-6 py-5 max-w-md">
                    <Lock className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                    <h3 className="font-display text-lg font-bold text-white mb-1">
                      Demo Limit Reached
                    </h3>
                    <p className="font-body text-sm text-white/60 mb-4">
                      Sign up for unlimited conversations with 500+ historical
                      figures.
                    </p>
                    <Link href="/signup">
                      <Button className="gap-2">
                        Sign Up for Unlimited Conversations
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 bg-white/5 px-5 py-3">
              {limitReached ? (
                <div className="text-center py-2">
                  <p className="font-body text-sm text-white/40">
                    You have used all {MAX_MESSAGES} demo messages.{" "}
                    <Link
                      href="/signup"
                      className="text-amber-400 hover:text-amber-300 underline"
                    >
                      Sign up
                    </Link>{" "}
                    for unlimited access.
                  </p>
                </div>
              ) : (
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
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8">
            <p className="font-body text-sm text-white/50 mb-3">
              Want deeper conversations? Chat with 500+ figures across all eras
              of history.
            </p>
            <Link href="/figures">
              <Button
                variant="outline"
                className="gap-2 border-white/30 text-white hover:bg-white/10"
              >
                Browse All Historical Figures
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
