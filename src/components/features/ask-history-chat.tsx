"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


import { BookOpen, Loader2, Send, History, Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "How did ancient civilizations handle inflation?",
  "What can the Roman Empire teach us about immigration policy?",
  "How did past pandemics change society?",
  "What historical parallels exist for the AI revolution?",
  "How did leaders rebuild after devastating wars?",
  "What does history teach about managing political polarization?",
];

export default function AskHistoryChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (question?: string) => {
    const userMessage = question || input;
    if (!userMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer || "I apologize, but I was unable to find a historical parallel for that question. Please try rephrasing or asking something else.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (_error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize for the interruption. It seems our connection to the archives has been temporarily disrupted. Please try your question again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-6 mx-auto">
                <History className="h-10 w-10 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-3">
                Ask History Anything
              </h2>
              <p className="font-body text-ink-400 max-w-md mx-auto mb-8">
                Describe a modern problem or question, and our AI will find historical parallels,
                cite real sources, and extract timeless lessons.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {suggestedQuestions.map((q, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    onClick={() => handleSubmit(q)}
                    className="text-left p-3 rounded-lg border border-accent/20 bg-parchment-50/50 hover:bg-parchment-200 hover:border-accent/40 transition-all text-sm font-body text-ink-500 group"
                  >
                    <Lightbulb className="h-4 w-4 text-accent inline mr-2 group-hover:text-primary transition-colors" />
                    {q}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 ${
                    msg.role === "user"
                      ? "bg-primary text-parchment-50 rounded-br-md"
                      : "bg-parchment-100 border border-accent/20 text-ink rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-accent" />
                      <span className="font-display text-sm font-bold text-primary">History.ai</span>
                    </div>
                  )}
                  <div className={`font-body text-sm leading-relaxed ${
                    msg.role === "assistant" ? "prose prose-sm max-w-none prose-headings:font-display prose-headings:text-primary prose-strong:text-primary prose-a:text-accent" : ""
                  }`}>
                    {msg.role === "assistant" ? (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                  <div className={`text-xs mt-2 ${msg.role === "user" ? "text-parchment-200" : "text-ink-300"} font-mono`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-parchment-100 border border-accent/20 rounded-2xl rounded-bl-md px-5 py-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" />
                <span className="font-display text-sm font-bold text-primary">History.ai</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-ink-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="font-body text-sm">Searching the historical archives...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-accent/20 bg-parchment-50/80 backdrop-blur-sm px-4 py-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Describe a modern problem or ask a historical question..."
            className="min-h-[52px] max-h-[120px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={() => handleSubmit()}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-[52px] w-[52px] shrink-0"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
        <p className="text-center text-xs font-body text-ink-300 mt-2">
          History.ai uses AI to find parallels in real historical events. Always verify important claims with primary sources.
        </p>
      </div>
    </div>
  );
}
