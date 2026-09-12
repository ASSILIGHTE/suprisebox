import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, Heart, ArrowRight } from 'lucide-react';

export default function HiddenSurpriseStep({ onReveal, onNext, playClickSFX, playSparkleSFX }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (isRevealed) return;
    playClickSFX();
    playSparkleSFX();
    setIsRevealed(true);
    onReveal(); // Trigger dreamy background in parent
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full my-auto py-4 sm:py-6 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto z-10"
    >
      {/* Step Header */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-love-950 tracking-tight mb-6">
        There’s Still One More Thing... 👀
      </h2>

      {/* Sealed Surprise Card */}
      <motion.div
        layout
        className="w-full rounded-3xl p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-love-200 shadow-2xl relative overflow-hidden my-2 text-center"
      >
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Sealed Card State */
            <motion.div
              key="sealed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-8 flex flex-col items-center justify-center"
            >
              {/* Sealed Lock Icon */}
              <div className="w-16 h-16 rounded-full bg-love-100 border-2 border-love-300 text-love-600 flex items-center justify-center mb-4 animate-bounce-soft shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <p className="text-slate-600 text-sm sm:text-base font-medium mb-6">
                A secret message is locked inside this card.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReveal}
                className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-love-500 to-rose-500 text-white font-semibold text-base shadow-glow-pink hover:shadow-love-500/50 transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-gold-light group-hover:rotate-12 transition-transform" />
                <span>REVEAL IT</span>
              </motion.button>
            </motion.div>
          ) : (
            /* Revealed Surprise Message State */
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="py-4 text-left font-sans space-y-4"
            >
              <div className="flex items-center gap-2 text-love-600 font-semibold text-sm uppercase tracking-wider mb-2">
                <Unlock className="w-4 h-4" />
                <span>Secret Revealed ✨</span>
              </div>

              <p className="text-love-950 font-serif text-xl sm:text-2xl font-bold leading-relaxed">
                “Kalau kamu sudah sampai di sini, berarti kamu berhasil membuka semuanya. ❤️”
              </p>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Semoga hadiah kecil ini bisa membuat hari kamu sedikit lebih manis, membuatmu tersenyum hangat, dan mengingatkanmu betapa istimewanya dirimu.
              </p>

              <div className="pt-2 text-right">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-love-100 text-love-800">
                  Made especially for you ✨
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action Button (Visible after reveal) */}
      {isRevealed && (
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playClickSFX();
            onNext();
          }}
          className="mt-6 group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-love-500 via-rose-500 to-love-600 text-white font-semibold text-base sm:text-lg shadow-glow-pink hover:shadow-love-500/50 transition-all duration-300 cursor-pointer"
        >
          <span>SEE FINAL SURPRISE</span>
          <Heart className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
        </motion.button>
      )}
    </motion.div>
  );
}
