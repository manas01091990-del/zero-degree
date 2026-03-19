
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';
import { playSFX, SFX_URLS } from '../utils/sfx';

const IMAGES = [
  'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460306423018-2b0017349997?q=80&w=800&auto=format&fit=crop',
];

const GalleryPage: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const openLightbox = (img: string) => {
    playSFX(SFX_URLS.WHOOSH, 0.3);
    setSelectedImg(img);
  };

  const closeLightbox = () => {
    playSFX(SFX_URLS.WHOOSH, 0.2);
    setSelectedImg(null);
  };

  return (
    <div className="space-y-8 pb-12 px-4">
      <div className="overflow-hidden">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-black italic tracking-tighter mb-2 uppercase"
        >
          GALLERY
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 italic"
        >
          Vibe of ZERO DEGREES KOTA
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {IMAGES.map((img, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-xl"
            onClick={() => openLightbox(img)}
          >
            <img 
              src={img} 
              alt={`Gallery ${idx}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="text-white" size={32} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.button 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={closeLightbox}
              className="absolute top-8 right-8 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={32} />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              src={selectedImg} 
              alt="Enlarged" 
              className="max-w-full max-h-[80vh] rounded-[3rem] shadow-2xl" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;

