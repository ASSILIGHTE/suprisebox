import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingBackground from './components/FloatingBackground';
import MusicPlayer from './components/MusicPlayer';
import CustomizerModal from './components/CustomizerModal';
import { useAudioSFX } from './hooks/useAudioSFX';

import GiftBoxStep from './components/Steps/GiftBoxStep';
import ChibiStep from './components/Steps/ChibiStep';
import LoveLetterStep from './components/Steps/LoveLetterStep';
import GalleryStep from './components/Steps/GalleryStep';
import HiddenSurpriseStep from './components/Steps/HiddenSurpriseStep';
import FinalSurpriseStep from './components/Steps/FinalSurpriseStep';

import { Edit3, Heart } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isDreamy, setIsDreamy] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [letterContent, setLetterContent] = useState(null);

  const { playClickSFX, playSparkleSFX, playBoxOpenSFX, playCelebrateSFX } = useAudioSFX();

  const totalSteps = 6;

  // Step Advancement Handlers
  const handleOpenGift = () => {
    setIsMusicPlaying(true); // Automatically start music playback when unboxing!
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReplay = () => {
    setIsDreamy(false);
    setCurrentStep(0);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-love-200">
      {/* Floating Canvas Background */}
      <FloatingBackground isDreamy={isDreamy} />

      {/* Floating Music Controller Header */}
      <header className="relative z-40 px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Brand/Logo */}
        <div className="flex items-center gap-2 text-love-800 font-serif font-bold text-lg sm:text-xl tracking-tight">
          <Heart className="w-5 h-5 text-love-500 fill-love-500 animate-pulse" />
          <span>Surprise Doll Box</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Customizer Modal Trigger */}
          <button
            onClick={() => {
              playClickSFX();
              setIsCustomizerOpen(true);
            }}
            title="Edit Letter Text"
            className="p-2.5 rounded-full bg-white/80 hover:bg-white text-love-700 border border-love-200 shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Music Controller */}
          <MusicPlayer
            isMusicPlaying={isMusicPlaying}
            setIsMusicPlaying={setIsMusicPlaying}
          />
        </div>
      </header>

      {/* Main Interactive Step Renderer */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center py-4 sm:py-6 px-2 sm:px-4 w-full max-w-6xl mx-auto overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <GiftBoxStep
              key="step-0"
              onOpenGift={handleOpenGift}
              playClickSFX={playClickSFX}
              playBoxOpenSFX={playBoxOpenSFX}
            />
          )}

          {currentStep === 1 && (
            <ChibiStep
              key="step-1"
              onNext={handleNextStep}
              playClickSFX={playClickSFX}
            />
          )}

          {currentStep === 2 && (
            <LoveLetterStep
              key="step-2"
              letterContent={letterContent}
              onNext={handleNextStep}
              playClickSFX={playClickSFX}
            />
          )}

          {currentStep === 3 && (
            <GalleryStep
              key="step-3"
              onNext={handleNextStep}
              playClickSFX={playClickSFX}
            />
          )}

          {currentStep === 4 && (
            <HiddenSurpriseStep
              key="step-4"
              onReveal={() => setIsDreamy(true)}
              onNext={handleNextStep}
              playClickSFX={playClickSFX}
              playSparkleSFX={playSparkleSFX}
            />
          )}

          {currentStep === 5 && (
            <FinalSurpriseStep
              key="step-5"
              onReplay={handleReplay}
              playClickSFX={playClickSFX}
              playCelebrateSFX={playCelebrateSFX}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Progress Dots Indicator (Steps 1 to 5) */}
      <footer className="relative z-40 py-4 flex flex-col items-center justify-center gap-2">
        {currentStep > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-love-200/50 shadow-sm">
            {[0, 1, 2, 3, 4, 5].map((stepIdx) => (
              <button
                key={stepIdx}
                onClick={() => {
                  if (stepIdx <= currentStep) {
                    playClickSFX();
                    setCurrentStep(stepIdx);
                  }
                }}
                disabled={stepIdx > currentStep}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  stepIdx === currentStep
                    ? 'w-7 bg-love-500 shadow-sm'
                    : stepIdx < currentStep
                    ? 'bg-love-300 hover:bg-love-400 cursor-pointer'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        )}

        <p className="text-[11px] text-slate-400 font-medium tracking-wider uppercase">
          Made with ❤️ for someone special
        </p>
      </footer>

      {/* Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        letterContent={letterContent}
        setLetterContent={setLetterContent}
      />
    </div>
  );
}
