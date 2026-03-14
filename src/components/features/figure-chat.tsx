"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { HistoricalFigure } from "@/types";
import { getInitials } from "@/lib/utils";
import { Loader2, Send, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface FigureChatProps {
  figure: HistoricalFigure;
}

export default function FigureChat({ figure }: FigureChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Greetings. I am ${figure.name}, ${figure.title}. I have lived through extraordinary times - ${figure.era} - and I carry the weight of experience from ${figure.born} to ${figure.died}. What would you ask of me? I shall answer as honestly as my nature allows.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          figure_name: figure.name,
          personality_prompt: figure.personality_prompt,
          messages: [...messages, newUserMessage]
            .filter((m) => m.id !== "welcome" || m.role === "assistant")
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || `I find myself at a loss for words. Perhaps you could rephrase your question?`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (_error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Forgive me - the connection between our ages has been momentarily disrupted. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] rounded-xl border border-accent/20 bg-parchment-50/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-accent/20 bg-parchment-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 border border-accent/30">
          <span className="font-display text-sm font-bold text-primary">
            {getInitials(figure.name)}
          </span>
        </div>
        <div>
          <h3 className="font-display text-sm font-bold text-ink">{figure.name}</h3>
          <p className="font-mono text-[10px] text-ink-400">
            {figure.born} - {figure.died}
          </p>
        </div>
        <Badge variant="parchment" className="ml-auto text-[10px] font-mono">
          AI Simulation
        </Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 mt-1">
                  <span className="font-display text-xs font-bold text-primary">
                    {getInitials(figure.name)}
                  </span>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary text-parchment-50 rounded-br-sm"
                    : "bg-parchment-200/60 border border-accent/15 text-ink rounded-bl-sm"
                }`}
              >
                <div className={`font-body text-sm leading-relaxed ${
                  msg.role === "assistant" ? "prose prose-sm max-w-none" : ""
                }`}>
                  {msg.role === "assistant" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 mt-1">
                  <User className="h-4 w-4 text-accent" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <span className="font-display text-xs font-bold text-primary">
                {getInitials(figure.name)}
              </span>
            </div>
            <div className="bg-parchment-200/60 border border-accent/15 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-2 text-ink-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="font-body text-sm italic">{figure.name} is pondering...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-accent/20 bg-parchment-100 px-4 py-3">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder={`Ask ${figure.name} a question...`}
            className="min-h-[44px] max-h-[100px] resize-none text-sm"
            disabled={isLoading}
          />
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-[44px] w-[44px] shrink-0"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
