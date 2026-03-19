
import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 px-4">
      <div className="overflow-hidden">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-black italic tracking-tighter mb-2 uppercase"
        >
          YOUR FAVORITES
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 italic"
        >
          Saved for your next feast
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6"
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 bg-white/5 text-gray-600 rounded-full flex items-center justify-center mb-8 border border-white/5 shadow-2xl"
        >
          <Heart size={48} />
        </motion.div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">No favorites yet</h2>
        <p className="text-gray-400 text-sm font-light leading-relaxed mb-8 max-w-xs">
          Explore our menu and tap the heart icon to save the items you love most.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/menu" 
            className="bg-[#00C853] text-black h-16 px-12 rounded-2xl font-black text-sm flex items-center gap-3 transition-all shadow-xl tracking-widest shadow-[0_20px_40px_rgba(0,200,83,0.3)]"
          >
            BROWSE MENU <ArrowRight size={18} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FavoritesPage;

