
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, ThumbsUp, Plus, X } from 'lucide-react';
import { REVIEWS } from '../constants';
import { playSFX, SFX_URLS } from '../utils/sfx';

const ReviewsPage: React.FC = () => {
  const [showAddReview, setShowAddReview] = useState(false);

  const toggleReviewForm = (show: boolean) => {
    playSFX(SFX_URLS.WHOOSH, 0.2);
    setShowAddReview(show);
  };

  const submitReview = () => {
    playSFX(SFX_URLS.CHIME);
    setShowAddReview(false);
  };

  return (
    <div className="space-y-8 pb-12 px-4">
      <div className="flex items-end justify-between overflow-hidden">
        <div>
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-black italic tracking-tighter mb-2 uppercase"
          >
            REVIEWS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 italic"
          >
            What people are saying
          </motion.p>
        </div>
        <motion.button 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleReviewForm(true)}
          className="bg-[#00C853] text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-[0_20px_40px_rgba(0,200,83,0.2)]"
        >
          Rate Us <Plus size={18} />
        </motion.button>
      </div>

      {/* Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#1A1A1A] rounded-[2.5rem] p-8 border border-white/5 flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <Star size={200} fill="currentColor" />
        </div>
        <div className="text-center md:text-left relative z-10">
          <div className="text-8xl font-black italic text-[#00C853] tracking-tighter mb-2">4.8</div>
          <div className="flex gap-1 mb-2 justify-center md:justify-start text-[#FFD700]">
            {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
          </div>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-black">128 Total Reviews</p>
        </div>
        <div className="flex-grow space-y-4 w-full max-w-sm relative z-10">
          {[5,4,3,2,1].map((n, idx) => (
            <div key={n} className="flex items-center gap-4">
              <span className="text-[10px] font-black text-gray-500 w-4">{n}</span>
              <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${n === 5 ? 85 : n === 4 ? 10 : 5}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 }}
                  className="h-full bg-[#00C853] shadow-[0_0_10px_rgba(0,200,83,0.5)]" 
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* List */}
      <div className="space-y-6">
        {REVIEWS.map((review, idx) => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#1A1A1A] rounded-[2rem] p-8 border border-white/5 shadow-lg group hover:border-[#00C853]/30 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={review.avatar} alt={review.user} className="w-14 h-14 rounded-2xl border-2 border-[#00C853]/20 group-hover:scale-110 transition-transform" />
                  <div className="absolute -bottom-1 -right-1 bg-[#00C853] text-black rounded-full p-1 shadow-lg">
                    <CheckCircle2 size={10} />
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-tight">{review.user}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-1 text-[#FFD700]">
                {Array.from({length: review.rating}).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            </div>
            <p className="text-gray-400 font-light leading-relaxed mb-8 italic text-lg">"{review.comment}"</p>
            <div className="flex items-center gap-8 text-gray-500 pt-6 border-t border-white/5">
              <motion.button whileHover={{ scale: 1.1, color: "#00C853" }} onClick={() => playSFX(SFX_URLS.CLICK, 0.2)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
                <ThumbsUp size={16} /> Helpful
              </motion.button>
              <motion.button whileHover={{ scale: 1.1, color: "#00C853" }} onClick={() => playSFX(SFX_URLS.CLICK, 0.2)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
                <MessageSquare size={16} /> Reply
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Review Modal */}
      <AnimatePresence>
        {showAddReview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => toggleReviewForm(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#121212] rounded-[3rem] p-10 border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => toggleReviewForm(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-4xl font-black italic tracking-tighter mb-8 uppercase">RATE YOUR<br/>EXPERIENCE.</h2>
              <div className="flex justify-center gap-4 mb-10 text-[#FFD700]">
                {[1,2,3,4,5].map(n => (
                  <motion.div
                    key={n}
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star 
                      size={40} 
                      onClick={() => playSFX(SFX_URLS.CLICK)}
                      className="cursor-pointer transition-colors hover:fill-current" 
                    />
                  </motion.div>
                ))}
              </div>
              <textarea 
                placeholder="Tell us about the vibes, the flavor, the architecture..."
                className="w-full bg-black/30 border border-white/5 rounded-[2rem] p-6 h-40 focus:ring-2 focus:ring-[#00C853] outline-none transition-all resize-none mb-8 text-sm"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={submitReview}
                className="w-full h-16 bg-[#00C853] text-black rounded-2xl font-black tracking-[0.3em] text-xs transition-all shadow-xl shadow-[0_20px_40px_rgba(0,200,83,0.3)]"
              >
                SUBMIT REVIEW
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CheckCircle2 = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

export default ReviewsPage;

