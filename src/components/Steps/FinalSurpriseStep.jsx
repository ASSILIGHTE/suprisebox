import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import ChibiDoll from '../ChibiDoll';
import { RefreshCw, Heart, Sparkles } from 'lucide-react';

export default function FinalSurpriseStep({ onReplay, playClickSFX, playCelebrateSFX }) {
  // Trigger celebration confetti burst on mount
  useEffect(() => {
    playCelebrateSFX();

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4b72', '#ffd1dc', '#fffdd0', '#f59e0b', '#ffffff']
      });
      confetti({
        particleCount: particleCount * 0.5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4b72', '#ffd1dc', '#fffdd0']
      });
      confetti({
        particleCount: particleCount * 0.5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4b72', '#ffd1dc', '#fffdd0']
      });
    }, 250);

    return () => clearInterval(interval);
  }, [playCelebrateSFX]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7 }}
      className="w-full my-auto py-4 sm:py-6 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto z-10"
    >
      {/* Top Floating Badge */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-love-500 text-white text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-love-500/30"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Grand Surprise Finale</span>
        <Heart className="w-3.5 h-3.5 fill-white" />
      </motion.div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-love-950 tracking-tight leading-tight mb-4">
        This Little Surprise Is For You ❤️
      </h1>

      {/* Chibi Doll & Main Photo Card */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4 w-full">
        <ChibiDoll
          speechText="I hope this brings a big smile to your face today! ✨"
          showSpeech={true}
          size="sm"
        />

        {/* Featured Romantic Photo Frame */}
        <div className="bg-white p-3 rounded-2xl shadow-2xl border border-love-200 rotate-2 max-w-[220px] w-full">
          <div className="w-full aspect-square rounded-xl overflow-hidden bg-love-50">
            <img
              src="/photos/photo1.jpeg"
              alt="Main romantic memory"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.classList.add('bg-gradient-to-br', 'from-love-300', 'to-blush-light', 'flex', 'items-center', 'justify-center');
              }}
            />
          </div>
          <div className="pt-2 font-handwriting text-slate-800 text-base font-bold text-center">
            You & Me Forever 💕
          </div>
        </div>
      </div>

      {/* Romantic Closing Message */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-love-200/80 shadow-xl my-4 text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
        <p className="font-medium text-love-950 font-serif italic text-lg sm:text-xl mb-2">
          “Tidak perlu hadiah yang besar untuk membuat sebuah momen menjadi berarti. Kadang, sesuatu yang sederhana dibuat khusus untuk seseorang sudah cukup.”
        </p>
        <p className="text-xs sm:text-sm text-slate-500 font-sans mt-3">
          Thank you for being the sweetest part of my life.
        </p>
      </div>

      {/* Replay Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playClickSFX();
          onReplay();
        }}
        className="mt-6 group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-love-500 via-rose-500 to-love-600 text-white font-semibold text-base sm:text-lg shadow-glow-pink hover:shadow-love-500/50 transition-all duration-300 cursor-pointer"
      >
        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
        <span>REPLAY SURPRISE ↻</span>
      </motion.button>
    </motion.div>
  );
}
