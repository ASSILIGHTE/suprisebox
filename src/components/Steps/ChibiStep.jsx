import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChibiDoll from '../ChibiDoll';
import { Mail, Sparkles } from 'lucide-react';

export default function ChibiStep({ onNext, playClickSFX }) {
  const [speechIndex, setSpeechIndex] = useState(0);

  const speeches = [
    "Hi! 👋",
    "Aku datang membawa sesuatu dari seseorang yang sangat menyayangimu. ❤️"
  ];

  // Auto transition speech bubble after 2.2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (speechIndex < speeches.length - 1) {
        setSpeechIndex(speechIndex + 1);
      }
    }, 2400);

    return () => clearTimeout(timer);
  }, [speechIndex]);

  const handleNextClick = () => {
    playClickSFX();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full my-auto py-4 sm:py-6 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto z-10"
    >
      {/* Animated Chibi Doll */}
      <div className="relative mb-6">
        <ChibiDoll
          speechText={speeches[speechIndex]}
          showSpeech={true}
          size="md"
          isHoldingLetter={true}
        />
      </div>

      {/* Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNextClick}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-love-500 via-rose-500 to-love-600 text-white font-semibold text-base sm:text-lg shadow-glow-pink hover:shadow-love-500/50 transition-all duration-300 cursor-pointer"
      >
        <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        <span>OPEN THE LETTER 💌</span>
        <Sparkles className="w-4 h-4 text-gold-light" />
      </motion.button>
    </motion.div>
  );
}
