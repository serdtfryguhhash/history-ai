"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";

interface AchievementToastProps {
  message: string;
  xp: number;
  show: boolean;
  onClose: () => void;
}

export function AchievementToast({ message, xp, show, onClose }: AchievementToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-2xl shadow-amber-900/30 border border-amber-500/30"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-sm font-bold">{message}</p>
            <p className="font-mono text-xs text-amber-200">+{xp} XP earned</p>
          </div>
          <button
            onClick={onClose}
            className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
