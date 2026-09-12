import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Heart, ArrowRight, Sparkles } from 'lucide-react';

export default function GalleryStep({ customPhotos, onNext, playClickSFX }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const defaultPhotos = [
    { id: 1, src: '/photos/photo1.jpeg', caption: 'Little moments, big memories. ❤️', rotate: '-2deg' },
    { id: 2, src: '/photos/photo2.jpeg', caption: 'Your smile makes my day brighter ✨', rotate: '2.5deg' },
    { id: 3, src: '/photos/photo3.jpeg', caption: 'Coffee & sweet conversations ☕', rotate: '-1.5deg' },
    { id: 4, src: '/photos/photo4.jpeg', caption: 'Every adventure with you is magical ✈️', rotate: '3deg' },
    { id: 5, src: '/photos/photo5.jpeg', caption: 'Warmest hugs & happiest laughter 🫂', rotate: '-2.8deg' },
    { id: 6, src: '/photos/photo6.jpeg', caption: 'My favorite person in the whole world 💖', rotate: '1.8deg' },
    { id: 7, src: '/photos/photo7.jpeg', caption: 'Stargazing & dreaming together 🌙', rotate: '-3deg' },
    { id: 8, src: '/photos/photo8.jpeg', caption: 'Hand in hand, step by step 🐾', rotate: '2.2deg' },
    { id: 9, src: '/photos/photo9.jpeg', caption: 'Forever & always my favorite memory 💍', rotate: '-1.8deg' },
  ];

  const photos = customPhotos || defaultPhotos;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full my-auto py-4 sm:py-6 flex flex-col items-center text-center px-4 max-w-5xl mx-auto z-10"
    >
      {/* Title */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-love-100 text-love-800 text-xs font-semibold uppercase tracking-wider mb-2">
          <Camera className="w-3.5 h-3.5" />
          <span>Our Memory Scrapbook</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-love-950 tracking-tight">
          A Few Memories 📸
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Tap or hover on any photo to look closer.
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 w-full my-4 px-2">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id || index}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.05, rotate: '0deg', zIndex: 20 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              playClickSFX();
              setSelectedPhoto(photo);
            }}
            style={{ transform: `rotate(${photo.rotate || '0deg'})` }}
            className="group relative bg-white p-3.5 sm:p-4 rounded-xl shadow-polaroid border border-slate-100 cursor-pointer transition-all duration-300 hover:shadow-2xl"
          >
            {/* Cute Tape Effect on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/70 border border-amber-200/50 backdrop-blur-sm -rotate-2 z-10 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity" />

            {/* Photo Container */}
            <div className="w-full aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 relative">
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                onError={(e) => {
                  // Fallback placeholder gradient if image fails
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('bg-gradient-to-tr', 'from-love-200', 'to-blush-light', 'flex', 'items-center', 'justify-center');
                }}
              />
            </div>

            {/* Caption */}
            <div className="pt-3 pb-1 text-center font-handwriting text-slate-800 text-lg sm:text-xl font-bold tracking-wide">
              {photo.caption}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Preview Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 sm:p-6 rounded-2xl max-w-lg w-full shadow-2xl relative border border-love-100 cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-love-500 text-white flex items-center justify-center shadow-lg hover:bg-love-600 transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo */}
              <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 mb-4 shadow-inner">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Handwritten Caption */}
              <div className="text-center font-handwriting text-slate-900 text-2xl sm:text-3xl font-bold">
                {selectedPhoto.caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playClickSFX();
          onNext();
        }}
        className="mt-10 group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-love-500 via-rose-500 to-love-600 text-white font-semibold text-base sm:text-lg shadow-glow-pink hover:shadow-love-500/50 transition-all duration-300 cursor-pointer"
      >
        <span>THERE’S MORE...</span>
        <Sparkles className="w-5 h-5 text-gold-light group-hover:rotate-12 transition-transform duration-300" />
      </motion.button>
    </motion.div>
  );
}
