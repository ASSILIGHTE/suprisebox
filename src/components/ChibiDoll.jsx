import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChibiDoll({ speechText, showSpeech = true, size = "md", isHoldingLetter = false }) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWaving, setIsWaving] = useState(true);

  // Automatic eye blinking cycle
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 220);
    }, 3200);

    return () => clearInterval(blinkInterval);
  }, []);

  const sizeClasses = {
    sm: "w-36 h-36 sm:w-44 sm:h-44",
    md: "w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72",
    lg: "w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        {showSpeech && speechText && (
          <motion.div
            key={speechText}
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-4 max-w-xs sm:max-w-md px-5 py-3.5 bg-white/95 rounded-2xl shadow-lg border border-love-200 text-slate-800 text-center relative z-20 backdrop-blur-md"
          >
            <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-love-900">
              {speechText}
            </p>
            {/* Speech bubble triangle tail */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-white drop-shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Chibi Character */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 1.5, -1.5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`relative ${sizeClasses[size]} drop-shadow-xl cursor-pointer`}
      >
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Soft Skin & Hair Gradients */}
            <linearGradient id="chibiHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A3030" />
              <stop offset="100%" stopColor="#2D1A1A" />
            </linearGradient>

            <linearGradient id="chibiSkin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF3EE" />
              <stop offset="100%" stopColor="#FFE4D6" />
            </linearGradient>

            <linearGradient id="chibiHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8BA7" />
              <stop offset="100%" stopColor="#FF5C8a" />
            </linearGradient>

            <filter id="blushGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>

            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#f37194" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Halo Floating Heart Above Head */}
          <g transform="translate(150, 25)">
            <path
              d="M0 -10 C -6 -18, -16 -12, -16 -4 C -16 5, 0 14, 0 18 C 0 14, 16 5, 16 -4 C 16 -12, 6 -18, 0 -10 Z"
              fill="#FF4B72"
              className="animate-pulse"
            />
          </g>

          {/* Chibi Hair Back */}
          <path
            d="M 80 140 C 60 70, 240 70, 220 140 C 235 180, 65 180, 80 140 Z"
            fill="url(#chibiHair)"
          />

          {/* Chibi Body (Bear Hoodie / Cute Dress) */}
          <g filter="url(#softShadow)">
            <path
              d="M 100 180 Q 150 170 200 180 L 215 255 Q 150 270 85 255 Z"
              fill="url(#chibiHoodie)"
            />
            {/* Hoodie Ribbon Bow */}
            <circle cx="150" cy="195" r="5" fill="#FFF" />
            <path d="M 142 195 C 130 190, 130 202, 145 197 Z" fill="#FFF" />
            <path d="M 158 195 C 170 190, 170 202, 155 197 Z" fill="#FFF" />
          </g>

          {/* Chibi Head */}
          <ellipse
            cx="150"
            cy="135"
            rx="65"
            ry="55"
            fill="url(#chibiSkin)"
            filter="url(#softShadow)"
          />

          {/* Cute Bear Ears on Head */}
          <circle cx="92" cy="85" r="22" fill="#FF8BA7" />
          <circle cx="92" cy="85" r="13" fill="#FFF0F5" />
          <circle cx="208" cy="85" r="22" fill="#FF8BA7" />
          <circle cx="208" cy="85" r="13" fill="#FFF0F5" />

          {/* Front Hair Bangs */}
          <path
            d="M 85 115 Q 115 85 150 95 Q 185 85 215 115 Q 180 100 150 110 Q 120 100 85 115 Z"
            fill="url(#chibiHair)"
          />

          {/* Blushing Cheeks */}
          <ellipse cx="112" cy="148" rx="12" ry="7" fill="#FF7597" opacity="0.65" filter="url(#blushGlow)" />
          <ellipse cx="188" cy="148" rx="12" ry="7" fill="#FF7597" opacity="0.65" filter="url(#blushGlow)" />

          {/* Eyes (Blinking Animation) */}
          {!isBlinking ? (
            <g>
              {/* Left Eye */}
              <ellipse cx="122" cy="138" rx="11" ry="14" fill="#362222" />
              <ellipse cx="125" cy="133" rx="4" ry="5" fill="#FFF" />
              <circle cx="119" cy="143" r="2" fill="#FFF" opacity="0.8" />
              {/* Eye lash */}
              <path d="M 110 130 Q 122 122 134 130" stroke="#2D1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Right Eye */}
              <ellipse cx="178" cy="138" rx="11" ry="14" fill="#362222" />
              <ellipse cx="181" cy="133" rx="4" ry="5" fill="#FFF" />
              <circle cx="175" cy="143" r="2" fill="#FFF" opacity="0.8" />
              {/* Eye lash */}
              <path d="M 166 130 Q 178 122 190 130" stroke="#2D1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            /* Closed Happy Eyes ^ ^ */
            <g stroke="#362222" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M 112 140 Q 122 130 132 140" />
              <path d="M 168 140 Q 178 130 188 140" />
            </g>
          )}

          {/* Mouth (Happy Cute Smile) */}
          <path
            d="M 143 154 Q 150 162 157 154"
            stroke="#632B2B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Arm */}
          <g>
            <path
              d="M 100 190 Q 75 210 88 225"
              stroke="#FF8BA7"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="88" cy="225" r="9" fill="url(#chibiSkin)" />
          </g>

          {/* Right Arm (Waving 👋) */}
          <motion.g
            animate={{
              rotate: [0, 20, -10, 20, 0]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "200px 190px" }}
          >
            <path
              d="M 200 190 Q 230 180 235 160"
              stroke="#FF8BA7"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="235" cy="160" r="9" fill="url(#chibiSkin)" />
            {/* Tiny Wave Sparkles */}
            <circle cx="248" cy="150" r="3" fill="#FFD700" className="animate-ping" />
          </motion.g>

          {/* Holding Letter / Envelope (If enabled) */}
          {isHoldingLetter && (
            <g transform="translate(125, 200)">
              <rect x="0" y="0" width="50" height="34" rx="4" fill="#FFFDF0" stroke="#FF4B72" strokeWidth="2" />
              <path d="M 0 0 L 25 18 L 50 0" stroke="#FF4B72" strokeWidth="2" fill="none" />
              {/* Wax Seal Heart */}
              <circle cx="25" cy="17" r="6" fill="#FF4B72" />
              <path d="M 25 14 L 27 17 L 23 17 Z" fill="#FFF" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
}
