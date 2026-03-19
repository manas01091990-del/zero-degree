
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Crown, Flame, ArrowUp, ShoppingBag, Medal, Zap, Sparkles, Star } from 'lucide-react';
import { POTENTIAL_CUSTOMERS } from '../constants';
import { playSFX, SFX_URLS } from '../utils/sfx';
import { Link } from 'react-router-dom';

const RankingPage: React.FC = () => {
  const dailyTopCustomers = useMemo(() => {
    const today = new Date();
    const seedString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    
    const getHash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    };

    const hash = getHash(seedString);
    const shuffled = [...POTENTIAL_CUSTOMERS];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = (hash + i) % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const baseOrders = [94, 86, 79, 68, 57];
    
    return shuffled.slice(0, 5).map((c, idx) => {
      const variance = (hash + idx) % 7;
      return {
        ...c,
        orders: baseOrders[idx] + variance
      };
    });
  }, []);

  const topThree = dailyTopCustomers.slice(0, 3);

  return (
    <div className="min-h-screen bg-transparent pb-32 overflow-hidden relative">
      {/* Background Floating Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] text-[15rem] font-black italic text-white/5 select-none"
        >
          0°
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[10%] text-[10rem] font-black italic text-white/5 select-none"
        >
          0°
        </motion.div>
      </div>

      {/* Editorial Header */}
      <div className="pt-12 px-8 pb-6 space-y-4 relative z-10">
        <div className="flex items-center gap-3 text-[#FFD700]">
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 48 }}
            transition={{ duration: 0.8 }}
            className="w-1 bg-[#FFD700] rounded-full" 
          />
          <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              THE TEEN
            </motion.span>
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block"
            >
              TITANS.
            </motion.span>
          </h1>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.5em]"
        >
          Kota's Young Elite Connoisseurs
        </motion.p>
      </div>

      {/* PSYCHOLOGICAL INCENTIVE BANNER */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-6 mb-12"
      >
        <div className="relative overflow-hidden bg-gradient-to-r from-[#FFD700] to-[#FF8C00] rounded-[2.5rem] p-8 text-black shadow-[0_30px_60px_rgba(255,215,0,0.25)] group hover:scale-[1.02] transition-transform duration-700">
          <div className="absolute -top-10 -right-10 p-4 opacity-10 group-hover:rotate-45 transition-transform duration-1000">
             <Trophy size={180} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-black text-[#FFD700] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">ELITE ACCESS</span>
              <div className="flex text-black/40">
                {[1,2,3].map(i => <Star key={i} size={10} fill="currentColor" />)}
              </div>
            </div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-[0.9] mb-4">
              "TOP 5 CUSTOMERS GET A FREE MEAL ON EACH ORDER"
            </h2>
            <p className="text-black/80 text-[10px] font-extrabold uppercase tracking-widest leading-relaxed max-w-[80%]">
              THE ULTIMATE KOTA FLEX. DOMINATE THE RANKINGS AND CLAIM YOUR THRONE.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Podium Section - Enhanced with Floating and Glows */}
      <section className="px-6 mb-16 relative z-10">
        <div className="flex items-end justify-center gap-4 pt-10">
          {/* 2nd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center group"
          >
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img src={topThree[1].avatar} className="w-16 h-16 rounded-full border-2 border-white/10 relative z-10 grayscale group-hover:grayscale-0 transition-all object-cover shadow-2xl" />
              <div className="absolute -bottom-2 -right-2 bg-gray-400 text-black w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] z-20">2</div>
            </div>
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-24 w-20 bg-white/5 backdrop-blur-md border border-white/5 rounded-t-2xl flex flex-col items-center justify-center p-2 text-center group-hover:border-white/20 transition-colors"
            >
              <span className="text-[8px] font-black uppercase tracking-tighter text-white truncate w-full">{topThree[1].name}</span>
              <span className="text-xs font-black text-gray-400">{topThree[1].orders}</span>
            </motion.div>
          </motion.div>

          {/* 1st Place - The King of Teens */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.7 }}
            className="flex flex-col items-center group -translate-y-4"
          >
            <Crown className="text-[#FFD700] mb-2 animate-bounce" size={28} />
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-[#FFD700]/30 blur-[40px] rounded-full animate-pulse" />
              <div className="w-28 h-28 rounded-full border-4 border-[#FFD700] p-1 relative z-10 overflow-hidden shadow-[0_0_60px_rgba(255,215,0,0.5)] transition-transform duration-700 group-hover:scale-110">
                <img src={topThree[0].avatar} className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#FFD700] text-black w-8 h-8 rounded-full flex items-center justify-center font-black text-xs z-20 shadow-xl">1</div>
            </div>
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="h-32 w-24 bg-gradient-to-t from-[#FFD700]/20 to-white/5 backdrop-blur-md border border-[#FFD700]/40 rounded-t-3xl flex flex-col items-center justify-center p-2 text-center shadow-[0_-20px_40px_rgba(255,215,0,0.1)]"
            >
               <span className="text-[10px] font-black uppercase tracking-tighter text-white truncate w-full">{topThree[0].name}</span>
               <span className="text-2xl font-black text-[#FFD700]">{topThree[0].orders}</span>
               <span className="text-[6px] font-black text-white/40 tracking-[0.2em] uppercase">Feasts</span>
            </motion.div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center group"
          >
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-[#CD7F32]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img src={topThree[2].avatar} className="w-16 h-16 rounded-full border-2 border-white/10 relative z-10 grayscale group-hover:grayscale-0 transition-all object-cover shadow-2xl" />
              <div className="absolute -bottom-2 -right-2 bg-[#CD7F32] text-black w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] z-20">3</div>
            </div>
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-20 w-20 bg-white/5 backdrop-blur-md border border-white/5 rounded-t-2xl flex flex-col items-center justify-center p-2 text-center group-hover:border-white/20 transition-colors"
            >
              <span className="text-[8px] font-black uppercase tracking-tighter text-white truncate w-full">{topThree[2].name}</span>
              <span className="text-xs font-black text-gray-400">{topThree[2].orders}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Leaderboard List - Enhanced with Holographic Scan and Stagger */}
      <section className="px-6 space-y-4 relative z-10">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-6 flex items-center gap-4 px-4"
        >
           TEEN LEADERBOARD <div className="h-[1px] bg-white/5 flex-grow" />
        </motion.h3>

        <div className="space-y-3">
          {dailyTopCustomers.map((user, idx) => (
            <motion.div 
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white/5 backdrop-blur-md border border-white/5 p-5 rounded-[2.5rem] flex items-center justify-between transition-all duration-500 hover:bg-white/[0.03] hover:border-[#FFD700]/30 relative overflow-hidden"
            >
              {idx < 5 && (
                 <div className="absolute top-0 right-0 z-20">
                    <div className="bg-[#00C853] text-black text-[7px] font-black px-4 py-1 rounded-bl-2xl uppercase tracking-widest shadow-xl flex items-center gap-1">
                      <Zap size={8} fill="currentColor" /> FREE MEAL ELIGIBLE
                    </div>
                 </div>
              )}
              
              <div className="flex items-center gap-2 sm:gap-4">
                <span className={`w-6 text-center font-black italic text-lg ${idx < 3 ? 'text-[#FFD700]' : 'text-gray-700'}`}>
                  {idx + 1}.
                </span>
                
                {/* RANK INDICATOR BLOCK */}
                <div className="flex flex-col items-center justify-center bg-white/5 rounded-xl px-2 py-1 border border-white/5 group-hover:border-[#FFD700]/20 transition-all group-hover:bg-[#FFD700]/5">
                  <span className="text-[6px] font-black text-gray-600 uppercase tracking-tighter leading-none">RANK</span>
                  <span className={`text-sm font-black italic leading-none transition-all ${idx < 3 ? 'text-[#FFD700]' : 'text-white'}`}>
                    {idx + 1}
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-[#FFD700]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                  <img src={user.avatar} className="w-14 h-14 rounded-2xl border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700 object-cover shadow-2xl relative z-10" />
                  {idx === 0 && <Crown size={12} className="absolute -top-2 -left-2 text-[#FFD700] rotate-[-15deg] z-20" />}
                </div>
                <div className="relative z-10">
                  <h4 className="font-black italic text-xs sm:text-sm uppercase tracking-tighter text-white group-hover:text-[#FFD700] transition-colors">{user.name}</h4>
                  <p className="text-[7px] font-bold text-gray-600 uppercase tracking-widest mt-1">
                    {idx < 3 ? 'Elite Legend' : 'Rising Challenger'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 relative z-10">
                <div className="flex flex-col items-end">
                   <span className="text-xl sm:text-2xl font-black text-[#00C853] tracking-tighter group-hover:scale-110 transition-transform">{user.orders}</span>
                   <span className="text-[6px] font-black text-gray-700 uppercase tracking-widest">Total Feasts</span>
                </div>
                {idx > 0 && <ArrowUp size={14} className="text-green-500/40 animate-pulse hidden sm:block" />}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action - Enhanced Button Hover */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-16 px-6"
      >
        <div className="bg-white/5 backdrop-blur-md rounded-[3.5rem] p-12 text-center border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00C853]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <Zap className="mx-auto mb-6 text-[#00C853] group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700" size={56} />
          <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4 leading-none">DON'T BE A<br/>BYSTANDER.</h3>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed mb-12 max-w-xs mx-auto">
            KOTA'S MOST AGGRESSIVE FOODIES ARE DOMINATING. ORDER NOW TO OVERTHROW THEM.
          </p>
          <div className="flex flex-col gap-4">
            <Link 
              to="/menu" 
              onClick={() => playSFX(SFX_URLS.CLICK)}
              className="inline-flex items-center justify-center bg-white text-black h-24 px-12 rounded-[2rem] font-black text-sm uppercase tracking-[0.5em] active:scale-95 transition-all shadow-[0_30px_60px_rgba(255,255,255,0.1)] hover:bg-[#00C853] hover:shadow-[0_20px_40px_rgba(0,200,83,0.3)]"
            >
              ORDER & ASCEND <ShoppingBag className="ml-4" size={24} />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default RankingPage;

