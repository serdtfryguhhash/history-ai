"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProgressData } from "@/lib/progress-tracker";
import { awardXP } from "@/lib/gamification";
import { recordQuizPerformance } from "@/lib/ai-memory";
import { AchievementToast } from "@/components/shared/AchievementToast";
import {
  Brain,
  CheckCircle2,
  XCircle,
  Loader2,
  Trophy,
  Flame,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_HISTORY_KEY = "history_ai_quiz_history";

interface QuizHistory {
  bestScore: number;
  totalQuizzes: number;
  quizStreak: number;
  lastQuizDate: string;
  scores: { date: string; score: number }[];
}

function getQuizHistory(): QuizHistory {
  if (typeof window === "undefined") return { bestScore: 0, totalQuizzes: 0, quizStreak: 0, lastQuizDate: "", scores: [] };
  const stored = localStorage.getItem(QUIZ_HISTORY_KEY);
  if (!stored) return { bestScore: 0, totalQuizzes: 0, quizStreak: 0, lastQuizDate: "", scores: [] };
  try { return JSON.parse(stored); } catch { return { bestScore: 0, totalQuizzes: 0, quizStreak: 0, lastQuizDate: "", scores: [] }; }
}

function saveQuizResult(score: number): QuizHistory {
  const history = getQuizHistory();
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  history.totalQuizzes++;
  history.bestScore = Math.max(history.bestScore, score);

  if (history.lastQuizDate === yesterday) {
    history.quizStreak++;
  } else if (history.lastQuizDate !== today) {
    history.quizStreak = 1;
  }
  history.lastQuizDate = today;

  history.scores.push({ date: today, score });
  if (history.scores.length > 50) history.scores = history.scores.slice(-50);

  localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
  return history;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<QuizHistory>(getQuizHistory());
  const [toast, setToast] = useState({ show: false, message: "", xp: 0 });

  const generateQuiz = useCallback(async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);

    try {
      const progress = getProgressData();
      const response = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exploredFigures: progress.viewedFigures.slice(-20),
          exploredEras: [],
          exploredTopics: [],
        }),
      });

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        setError("Failed to generate quiz. Please try again.");
      }
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === questions[currentQ].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      const finalScore = selectedAnswer === questions[currentQ].correctIndex ? score + 1 : score;
      const updatedHistory = saveQuizResult(finalScore);
      setHistory(updatedHistory);

      const result = awardXP("ace_quiz", `Score: ${finalScore}/5`);
      recordQuizPerformance("general", finalScore, 5);

      setToast({
        show: true,
        message: `Quiz Complete! ${finalScore}/5 correct`,
        xp: result.xpGained,
      });
    }
  };

  const finalScore = quizComplete
    ? (selectedAnswer === questions[currentQ]?.correctIndex ? score : score)
    : score;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm py-12 md:py-16 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/20 mx-auto mb-4">
              <Brain className="h-7 w-7 text-amber-400" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Daily History Quiz
            </h1>
            <p className="font-body text-lg text-white/70 max-w-xl mx-auto mb-6">
              Test your knowledge with AI-generated questions based on your learning history.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Trophy className="h-4 w-4" />
                <span className="font-mono text-sm">Best: {history.bestScore}/5</span>
              </div>
              <div className="flex items-center gap-1.5 text-orange-400">
                <Flame className="h-4 w-4" />
                <span className="font-mono text-sm">Quiz Streak: {history.quizStreak}</span>
              </div>
              <div className="text-white/50">
                <span className="font-mono text-sm">{history.totalQuizzes} quizzes taken</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm min-h-[60vh]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Start / Loading state */}
          {questions.length === 0 && !loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Brain className="h-16 w-16 text-amber-400/30 mx-auto mb-6" />
              <h2 className="font-display text-2xl font-bold text-white mb-3">
                Ready to Test Your Knowledge?
              </h2>
              <p className="font-body text-white/60 mb-8 max-w-md mx-auto">
                Our AI will generate 5 questions based on the historical figures and eras you have explored.
              </p>
              <Button onClick={generateQuiz} size="lg" className="gap-2">
                <Brain className="h-5 w-5" />
                Start Quiz
              </Button>
            </motion.div>
          )}

          {loading && (
            <div className="text-center py-16">
              <Loader2 className="h-12 w-12 text-amber-400 animate-spin mx-auto mb-4" />
              <p className="font-body text-white/60">Generating your personalized quiz...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="font-body text-red-400 mb-4">{error}</p>
              <Button onClick={generateQuiz} variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10">
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          )}

          {/* Quiz Questions */}
          {questions.length > 0 && !quizComplete && (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <Badge variant="outline" className="border-white/20 text-white/60 font-mono">
                  Question {currentQ + 1} of {questions.length}
                </Badge>
                <Badge variant="outline" className="border-amber-400/30 text-amber-400 font-mono">
                  Score: {score}
                </Badge>
              </div>

              <div className="h-1 bg-white/10 rounded-full mb-8">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-bold text-white leading-relaxed">
                    {questions[currentQ].question}
                  </h2>
                </CardContent>
              </Card>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {questions[currentQ].options.map((option, idx) => {
                  const isCorrect = idx === questions[currentQ].correctIndex;
                  const isSelected = idx === selectedAnswer;
                  let className = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";

                  if (!showResult) {
                    className += "border-white/10 bg-white/5 hover:border-amber-400/50 hover:bg-amber-400/5 cursor-pointer";
                  } else if (isCorrect) {
                    className += "border-green-500 bg-green-500/10";
                  } else if (isSelected && !isCorrect) {
                    className += "border-red-500 bg-red-500/10";
                  } else {
                    className += "border-white/10 bg-white/5 opacity-50";
                  }

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={className}
                      whileHover={!showResult ? { scale: 1.01 } : {}}
                      whileTap={!showResult ? { scale: 0.99 } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 shrink-0 ${
                          showResult && isCorrect ? "border-green-500 bg-green-500/20" :
                          showResult && isSelected && !isCorrect ? "border-red-500 bg-red-500/20" :
                          "border-white/20"
                        }`}>
                          {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                          {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-400" />}
                          {!showResult && <span className="font-mono text-sm text-white/50">{String.fromCharCode(65 + idx)}</span>}
                        </div>
                        <span className="font-body text-sm text-white/90">{option}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Card className="bg-amber-400/5 border-amber-400/20 backdrop-blur-sm mb-6">
                      <CardContent className="p-4">
                        <p className="font-body text-sm text-white/70">
                          {questions[currentQ].explanation}
                        </p>
                      </CardContent>
                    </Card>

                    <div className="flex justify-end">
                      <Button onClick={handleNext} className="gap-2">
                        {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Quiz Complete */}
          {quizComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-400/20 mx-auto mb-6">
                <Trophy className="h-10 w-10 text-amber-400" />
              </div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">
                Quiz Complete!
              </h2>
              <p className="font-display text-5xl font-bold text-amber-400 mb-2">
                {score}/{questions.length}
              </p>
              <p className="font-body text-white/60 mb-8">
                {score === 5
                  ? "Perfect score! You are a true history scholar!"
                  : score >= 3
                  ? "Great job! Keep learning to improve!"
                  : "Keep exploring - every quiz makes you stronger!"}
              </p>

              <div className="flex items-center justify-center gap-4">
                <Button onClick={generateQuiz} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Take Another Quiz
                </Button>
              </div>

              {/* Personal Best */}
              {history.scores.length > 1 && (
                <div className="mt-8 max-w-sm mx-auto">
                  <h3 className="font-display text-sm font-bold text-white/60 mb-3">Recent Scores</h3>
                  <div className="flex items-end justify-center gap-1.5">
                    {history.scores.slice(-10).map((s, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div
                          className={`w-6 rounded-t ${s.score === 5 ? "bg-green-500" : s.score >= 3 ? "bg-amber-400" : "bg-red-400"}`}
                          style={{ height: `${(s.score / 5) * 60 + 10}px` }}
                        />
                        <span className="font-mono text-[9px] text-white/30">{s.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
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
