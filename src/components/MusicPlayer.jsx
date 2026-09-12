import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX, Volume2, Sparkles } from 'lucide-react';

export default function MusicPlayer({ isMusicPlaying, setIsMusicPlaying }) {
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Initialize audio element with public/music.mp3
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle Play/Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicPlaying) {
      audio.play().then(() => {
        setHasInteracted(true);
      }).catch((err) => {
        console.warn('Autoplay blocked by browser policy:', err);
        setIsMusicPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isMusicPlaying, setIsMusicPlaying]);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={toggleMusic}
        aria-label="Toggle background music"
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-md ${
          isMusicPlaying
            ? 'bg-gradient-to-r from-love-500 to-rose-400 text-white shadow-love-400/40 animate-pulse-subtle scale-105'
            : 'bg-white/80 text-love-700 hover:bg-white border border-love-200'
        }`}
      >
        {isMusicPlaying ? (
          <>
            <Music className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Music ON</span>
            <Volume2 className="w-3.5 h-3.5" />
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            <span>Music OFF</span>
          </>
        )}
      </button>
    </div>
  );
}
