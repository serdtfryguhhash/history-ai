"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { awardXP } from "@/lib/gamification";
import { AchievementToast } from "@/components/shared/AchievementToast";
import {
  Swords,
  Send,
  Loader2,
  Trophy,
  RotateCcw,
  User,
  Bot,
  Star,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface DebateTopic {
  id: string;
  question: string;
  sideA: string;
  sideB: string;
  era: string;
}

const debateTopics: DebateTopic[] = [
  {
    id: "d1",
    question: "Was the Roman Empire's fall inevitable?",
    sideA: "Yes, internal decay made collapse inevitable",
    sideB: "No, different leadership could have prevented it",
    era: "Ancient",
  },
  {
    id: "d2",
    question: "Was dropping the atomic bomb on Japan justified?",
    sideA: "Yes, it saved more lives than it cost",
    sideB: "No, it was an unnecessary atrocity",
    era: "20th Century",
  },
  {
    id: "d3",
    question: "Was Alexander the Great a visionary unifier or a ruthless conqueror?",
    sideA: "Visionary who spread civilization",
    sideB: "Ruthless conqueror driven by ego",
    era: "Classical",
  },
  {
    id: "d4",
    question: "Did the Renaissance begin in Italy or was it a broader European phenomenon?",
    sideA: "It was distinctly Italian in origin",
    sideB: "It was a pan-European development",
    era: "Renaissance",
  },
  {
    id: "d5",
    question: "Was the French Revolution a success or a failure?",
    sideA: "A success that advanced democracy and human rights",
    sideB: "A failure that led to tyranny and mass violence",
    era: "Enlightenment",
  },
  {
    id: "d6",
    question: "Was colonialism a net positive or negative for colonized peoples?",
    sideA: "It brought modernization and infrastructure",
    sideB: "It caused exploitation, cultural destruction, and lasting harm",
    era: "19th Century",
  },
  {
    id: "d7",
    question: "Is democracy the best form of government for all societies?",
    sideA: "Yes, it best protects human rights and dignity",
    sideB: "No, different societies may thrive under different systems",
    era: "Modern",
  },
  {
    id: "d8",
    question: "Was Machiavelli right that the ends justify the means in politics?",
    sideA: "Yes, pragmatic leadership requires difficult choices",
    sideB: "No, ethical means are essential regardless of outcomes",
    era: "Renaissance",
  },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Evaluation {
  evaluation: string;
  score: number;
  strengths: string[];
  improvements: string[];
}

const DEBATE_HISTORY_KEY = "history_ai_debate_history";

interface DebateRecord {
  topic: string;
  score: number;
  date: string;
}

function getDebateHistory(): DebateRecord[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(DEBATE_HISTORY_KEY);
  if (!stored) return [];
  try { return JSON.parse(stored); } catch { return []; }
}

function saveDebateResult(topic: string, score: number): void {
  const history = getDebateHistory();
  history.push({ topic, score, date: new Date().toISOString() });
  localStorage.setItem(DEBATE_HISTORY_KEY, JSON.stringify(history));
}

export default function DebatePage() {
  const [selectedTopic, setSelectedTopic] = useState<DebateTopic | null>(null);
  const [userSide, setUserSide] = useState<"A" | "B" | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [round, setRound] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [debateHistory, setDebateHistory] = useState<DebateRecord[]>([]);
  const [toast, setToast] = useState({ show: false, message: "", xp: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setDebateHistory(getDebateHistory());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startDebate = async (topic: DebateTopic, side: "A" | "B") => {
    setSelectedTopic(topic);
    setUserSide(side);
    setRound(1);
    setEvaluation(null);
    setMessages([]);
    setIsLoading(true);

    const aiSide = side === "A" ? topic.sideB : topic.sideA;

    try {
      const response = await fetch("/api/ai/debate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.question,
          aiSide,
          roundNumber: 1,
          messages: [
            {
              role: "user",
              content: `The debate topic is: "${topic.question}". I will argue: "${side === "A" ? topic.sideA : topic.sideB}". You argue: "${aiSide}". Please make your opening argument.`,
            },
          ],
        }),
      });

      const data = await response.json();
      setMessages([
        { role: "assistant", content: data.response || "Let me begin my argument..." },
      ]);
    } catch {
      setMessages([
        { role: "assistant", content: "I apologize, but I am having trouble forming my argument. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading || !selectedTopic || !userSide) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const nextRound = round + 1;
    const aiSide = userSide === "A" ? selectedTopic.sideB : selectedTopic.sideA;

    try {
      const response = await fetch("/api/ai/debate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic.question,
          aiSide,
          roundNumber: nextRound,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (nextRound > 4) {
        // Evaluation
        const evalData = data.evaluation;
        setEvaluation(evalData);
        saveDebateResult(selectedTopic.question, evalData.score);
        setDebateHistory(getDebateHistory());

        const result = awardXP("debate_score", `Debate score: ${evalData.score}/10`);
        setToast({
          show: true,
          message: `Debate scored ${evalData.score}/10`,
          xp: result.xpGained,
        });
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.response }]);
        setRound(nextRound);
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "I seem to have lost my train of thought. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetDebate = () => {
    setSelectedTopic(null);
    setUserSide(null);
    setMessages([]);
    setInput("");
    setRound(0);
    setEvaluation(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm py-12 md:py-16 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/20 mx-auto mb-4">
            <Swords className="h-7 w-7 text-amber-400" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Debate Mode
          </h1>
          <p className="font-body text-lg text-white/70 max-w-xl mx-auto">
            Argue history&apos;s biggest questions against an AI opponent. Four rounds, then get scored.
          </p>
          {debateHistory.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="font-mono text-sm text-white/50">{debateHistory.length} debates completed</span>
              <span className="font-mono text-sm text-amber-400">
                Avg score: {(debateHistory.reduce((s, d) => s + d.score, 0) / debateHistory.length).toFixed(1)}/10
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm min-h-[60vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {!selectedTopic ? (
            /* Topic Selection */
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-white mb-6">Choose a Debate Topic</h2>
              {debateTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:border-amber-400/20 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <Badge variant="outline" className="mb-2 border-white/20 text-white/50 font-mono text-[10px]">
                            {topic.era}
                          </Badge>
                          <h3 className="font-display text-lg font-bold text-white">{topic.question}</h3>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button
                          onClick={() => startDebate(topic, "A")}
                          variant="outline"
                          className="text-left justify-start border-white/20 text-white/80 hover:bg-white/10 hover:border-amber-400/30"
                        >
                          <span className="truncate">{topic.sideA}</span>
                        </Button>
                        <Button
                          onClick={() => startDebate(topic, "B")}
                          variant="outline"
                          className="text-left justify-start border-white/20 text-white/80 hover:bg-white/10 hover:border-amber-400/30"
                        >
                          <span className="truncate">{topic.sideB}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : evaluation ? (
            /* Evaluation */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h2 className="font-display text-3xl font-bold text-white mb-2">Debate Results</h2>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 10 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${i < evaluation.score ? "text-amber-400 fill-amber-400" : "text-white/20"}`}
                    />
                  ))}
                </div>
                <p className="font-display text-4xl font-bold text-amber-400">{evaluation.score}/10</p>
              </div>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-bold text-white mb-3">Evaluation</h3>
                  <p className="font-body text-white/70 leading-relaxed">{evaluation.evaluation}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-green-500/5 border-green-500/20 backdrop-blur-sm">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      <h3 className="font-display text-sm font-bold text-white">Strengths</h3>
                    </div>
                    <ul className="space-y-2">
                      {evaluation.strengths.map((s, i) => (
                        <li key={i} className="font-body text-sm text-white/60 flex items-start gap-2">
                          <span className="text-green-400 mt-1">+</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-amber-400/5 border-amber-400/20 backdrop-blur-sm">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                      <h3 className="font-display text-sm font-bold text-white">Areas to Improve</h3>
                    </div>
                    <ul className="space-y-2">
                      {evaluation.improvements.map((s, i) => (
                        <li key={i} className="font-body text-sm text-white/60 flex items-start gap-2">
                          <span className="text-amber-400 mt-1">-</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button onClick={resetDebate} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Start New Debate
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Debate Chat */
            <div>
              <div className="mb-4 flex items-center justify-between">
                <button
                  onClick={resetDebate}
                  className="text-sm font-body text-white/60 hover:text-amber-400 transition-colors"
                >
                  Forfeit &amp; Exit
                </button>
                <Badge variant="outline" className="border-amber-400/30 text-amber-400 font-mono">
                  Round {Math.min(round, 4)} of 4
                </Badge>
              </div>

              <Card className="bg-amber-400/5 border-amber-400/20 backdrop-blur-sm mb-6">
                <CardContent className="p-4">
                  <p className="font-display text-sm font-bold text-white">{selectedTopic.question}</p>
                  <p className="font-body text-xs text-white/50 mt-1">
                    You: {userSide === "A" ? selectedTopic.sideA : selectedTopic.sideB}
                  </p>
                </CardContent>
              </Card>

              <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col h-[500px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                      >
                        {msg.role === "assistant" && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-900/30 mt-1">
                            <Bot className="h-4 w-4 text-red-400" />
                          </div>
                        )}
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-red-900/20 border border-red-400/10 text-white/90 rounded-bl-sm"
                        }`}>
                          <p className="font-body text-sm leading-relaxed">{msg.content}</p>
                        </div>
                        {msg.role === "user" && (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900/30 mt-1">
                            <User className="h-4 w-4 text-blue-400" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-900/30">
                        <Bot className="h-4 w-4 text-red-400" />
                      </div>
                      <div className="bg-red-900/20 border border-red-400/10 rounded-2xl rounded-bl-sm px-4 py-3">
                        <div className="flex items-center gap-2 text-white/40">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="font-body text-sm italic">
                            {round > 4 ? "Evaluating arguments..." : "Preparing counter-argument..."}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-white/10 bg-white/5 px-5 py-3">
                  {round <= 4 ? (
                    <div className="flex gap-2">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                        placeholder={`Round ${round}: Make your argument...`}
                        disabled={isLoading}
                        rows={2}
                        className="flex-1 rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/30 font-body focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 disabled:opacity-50 resize-none"
                      />
                      <Button
                        onClick={handleSubmit}
                        disabled={!input.trim() || isLoading}
                        size="icon"
                        className="h-11 w-11 shrink-0 self-end"
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </div>
                  ) : (
                    <p className="font-body text-sm text-white/40 text-center py-2">
                      Debate complete. Waiting for evaluation...
                    </p>
                  )}
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
