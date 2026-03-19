
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
import { ArrowRight, Star, Clock, Heart, ShoppingBag, MessageCircle, Image as ImageIcon, Sparkles, ShieldCheck, Zap, Leaf, TrendingUp, ChevronDown, MousePointer2 } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';
import OrderDrawer from '../components/OrderDrawer';
import AiConcierge from '../components/AiConcierge';
import { playSFX, SFX_URLS } from '../utils/sfx';

const HomePage: React.FC = () => {
  const [orderItem, setOrderItem] = useState<MenuItem | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Hero Animations
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.5]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, -150]);
  const heroParallax = useTransform(smoothProgress, [0, 0.5], [0, 200]);
  
  // Burger Rotation & Scale (Central Product)
  const burgerRotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const burgerScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
  const burgerY = useTransform(smoothProgress, [0, 0.5, 1], [0, -300, 0]);
  const burgerSkew = useTransform(smoothProgress, [0, 0.5, 1], [0, 10, 0]);

  const triggerOrder = (item: MenuItem) => {
    playSFX(SFX_URLS.CLICK);
    setOrderItem(item);
  };

  const featuredItems = MENU_ITEMS.slice(0, 4);

  return (
    <div 
      ref={containerRef}
      className="bg-transparent text-white selection:bg-[#00C853] selection:text-black"
    >
      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative h-screen md:h-[120vh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.15] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#00C853 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C853]/30 to-transparent z-[2] pointer-events-none"
        />

        {/* Technical Status Markers */}
        <div className="absolute top-24 left-6 md:left-12 z-20 hidden md:block font-mono text-[10px] text-[#00C853]/60 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse" />
            <span>SYSTEM_STATUS: OPTIMIZED</span>
          </div>
          <div>LOC: 25.1437° N, 75.8573° E [KOTA]</div>
          <div>ALGO_VERSION: 2.5.0_STABLE</div>
        </div>

        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity, y: heroParallax }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2000&auto=format&fit=crop" 
            alt="Background Burger" 
            className="w-full h-full object-cover brightness-[0.3] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24 relative inline-block group"
          >
            {/* Ultra-Intense Background Glow */}
            <div className="absolute -inset-10 bg-[#00C853]/20 rounded-full blur-[100px] animate-pulse" />
            
            {/* Rotating Gradient Border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[4px] bg-gradient-to-r from-[#00C853] via-white to-[#00C853] rounded-[3.5rem] opacity-60 blur-[2px]"
            />
            
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 40px rgba(0,200,83,0.4)", 
                  "0 0 100px rgba(0,200,83,0.8)", 
                  "0 0 40px rgba(0,200,83,0.4)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative bg-[#0A0A0A] backdrop-blur-3xl px-4 sm:px-14 md:px-20 py-3 sm:py-6 md:py-8 rounded-xl sm:rounded-[3rem] border-[1px] sm:border-[3px] border-[#00C853]/50 overflow-hidden w-[90vw] sm:w-auto mx-auto"
            >
              <motion.p 
                animate={{ 
                  backgroundPosition: ["0% 50%", "200% 50%"] 
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] via-white to-[#00C853] bg-[length:200%_auto] font-black uppercase tracking-[0.1em] sm:tracking-[0.4em] md:tracking-[1em] text-[3.8vw] sm:text-lg md:text-2xl whitespace-nowrap drop-shadow-[0_0_10px_rgba(0,200,83,0.5)] text-center"
              >
                order in class.eat on time.win both.
              </motion.p>

              {/* Comparison Text from Image - MASSIVE & PREMIUM UPGRADE */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="mt-8 sm:mt-12 space-y-6 w-full"
              >
                {/* Normal Way - Muted */}
                <div className="flex flex-col items-center justify-center gap-2 text-white/20 text-[10px] sm:text-[14px] md:text-base font-bold tracking-widest uppercase">
                  <div className="flex items-center gap-3">
                    <span className="opacity-50">🚶 Normal way:</span>
                    <span className="flex flex-wrap items-center justify-center gap-2 opacity-40">Walk <ArrowRight size={12} /> Wait <ArrowRight size={12} /> Order <ArrowRight size={12} /> Wait</span>
                  </div>
                </div>
                
                {/* Your Way - Premium Gold/Neon Focus */}
                <div className="relative py-4">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00C853]/10 to-transparent blur-2xl animate-pulse" />
                  
                  {/* Tech Corner Accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00C853]/30" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00C853]/30" />

                  <div className="relative flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center gap-4 text-[6vw] sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase">
                      <Sparkles size={24} className="text-[#FFD700] animate-pulse sm:w-8 sm:h-8" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] via-[#FFD700] to-[#00C853] bg-[length:200%_auto] animate-pulse drop-shadow-[0_0_20px_rgba(0,200,83,0.5)]">
                        Your way:
                      </span>
                      <Sparkles size={24} className="text-[#FFD700] animate-pulse sm:w-8 sm:h-8" />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-4 sm:gap-6 text-[5vw] sm:text-2xl md:text-3xl font-black tracking-tight text-white font-mono w-full max-w-[300px] sm:max-w-none">
                      <div className="flex flex-col items-center gap-1 group">
                        <div className="flex items-center gap-2">
                          <span className="group-hover:text-[#00C853] transition-colors">Tap</span>
                          <ArrowRight size={18} className="text-[#00C853]/50 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-[8px] md:text-[10px] text-[#00C853] font-black uppercase tracking-widest opacity-60 sm:opacity-0 group-hover:opacity-100 transition-opacity">Instant</span>
                      </div>
                      
                      <div className="flex flex-col items-center gap-1 group">
                        <div className="flex items-center gap-2">
                          <span className="group-hover:text-[#00C853] transition-colors">Study</span>
                          <ArrowRight size={18} className="text-[#00C853]/50 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-[8px] md:text-[10px] text-[#FFD700] font-black uppercase tracking-widest animate-pulse">Save 20m</span>
                      </div>
 
                      <div className="flex flex-col items-center gap-1 group">
                        <div className="flex items-center gap-2">
                          <span className="group-hover:text-[#00C853] transition-colors">Pick</span>
                          <ArrowRight size={18} className="text-[#00C853]/50 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-[8px] md:text-[10px] text-[#00C853] font-black uppercase tracking-widest opacity-60 sm:opacity-0 group-hover:opacity-100 transition-opacity">Skip Lines</span>
                      </div>
 
                      <div className="relative flex flex-col items-center gap-1">
                        <div className="relative">
                          <span className="text-[#00C853] drop-shadow-[0_0_15px_rgba(0,200,83,0.8)] underline decoration-wavy decoration-[#FFD700] underline-offset-8">Eat</span>
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-3 -right-3"
                          >
                            <Zap size={16} fill="#FFD700" className="text-[#FFD700] sm:w-5 sm:h-5" />
                          </motion.div>
                        </div>
                        <span className="text-[8px] md:text-[10px] text-white/50 font-black uppercase tracking-widest mt-2">Win Both</span>
                      </div>
                    </div>

                    {/* Final Advantage Summary */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="mt-6 bg-[#00C853]/10 border border-[#00C853]/20 px-6 py-3 rounded-2xl flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#00C853] flex items-center justify-center text-black">
                        <TrendingUp size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black text-[#00C853] uppercase tracking-widest">The Zero Degrees Advantage</p>
                        <p className="text-white/70 text-[12px] font-medium">Don't waste your study breaks in queues. Order ahead, rank higher.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Dynamic Light Sweep */}
              <motion.div 
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[35deg]"
              />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: heroTextY }} className="space-y-2 md:space-y-4">
            <h1 className="text-[12vw] md:text-[10vw] font-black italic tracking-tighter leading-[0.8] uppercase flex flex-col items-center">
              <div className="overflow-hidden py-2">
                <motion.span 
                  initial={{ y: "100%", opacity: 0, skewY: 10 }}
                  animate={{ y: 0, opacity: 1, skewY: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                  PUREST
                </motion.span>
              </div>
              
              <div className="flex items-center gap-4 md:gap-8">
                <div className="overflow-hidden py-2">
                  <motion.span 
                    initial={{ y: "100%", opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.5, type: "spring", damping: 12, delay: 0.2 }}
                    className="block text-[#00C853] drop-shadow-[0_0_60px_rgba(0,200,83,0.8)] text-[18vw] md:text-[15vw]"
                  >
                    0°
                  </motion.span>
                </div>
                
                <div className="overflow-hidden py-2">
                  <motion.span 
                    initial={{ x: "-100%", opacity: 0, skewX: 20 }}
                    animate={{ x: 0, opacity: 1, skewX: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30"
                  >
                    DEGREES
                  </motion.span>
                </div>
              </div>
            </h1>
          </motion.div>
        </div>

        {/* Floating Central Product */}
        <motion.div 
          style={{ 
            rotate: burgerRotate, 
            scale: burgerScale,
            y: burgerY,
            skew: burgerSkew
          }}
          className="absolute bottom-[-10%] md:bottom-[-20%] z-20 w-[80vw] md:w-[40vw] pointer-events-none drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
        >
          <img 
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop" 
            alt="Floating Burger" 
            className="w-full h-auto rounded-full"
          />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#00C853]/50"
        >
          <ChevronDown size={40} strokeWidth={1} />
        </motion.div>
      </section>

      {/* 2. BENTO GRID STATS */}
      <section className="py-20 md:py-32 px-4 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <motion.div 
            whileHover={{ y: -10 }}
            className="md:col-span-2 bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 group-hover:opacity-20 transition-opacity">
              <Leaf size={80} className="md:w-[120px] md:h-[120px] text-[#00C853]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-4 md:mb-6">100% ORGANIC<br/>ARCHITECTURE.</h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-md font-light leading-relaxed">
              We source our ingredients from hyper-local farms in Kota, ensuring every bite is a testament to freshness and purity.
            </p>
            <div className="mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-4">
              <div className="bg-[#00C853]/10 text-[#00C853] px-4 md:px-6 py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-[#00C853]/20">
                FARM TO TABLE
              </div>
              <div className="bg-white/5 text-white/50 px-4 md:px-6 py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-white/10">
                KOTA ORIGIN
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-[#00C853] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-black flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Tech Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)' , backgroundSize: '4px 4px' }} />
            
            <Zap size={32} className="md:w-[48px] md:h-[48px] mb-6 md:mb-8 relative z-10" />
            <div className="relative z-10">
              <h3 className="text-5xl md:text-6xl font-black italic tracking-tighter leading-none mb-3 md:mb-4 font-mono">12<br/>MINS.</h3>
              <p className="font-bold uppercase tracking-widest text-[10px] opacity-70">Average Prep Time</p>
            </div>
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-black/10 relative z-10">
              <p className="text-xs md:text-sm font-medium leading-tight">Precision timing for the perfect temperature and texture.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 flex flex-col justify-center items-center text-center group"
          >
            <div className="text-6xl md:text-7xl font-black italic text-[#00C853] mb-3 md:mb-4 tracking-tighter">4.9</div>
            <div className="flex gap-1 text-[#FFD700] mb-3 md:mb-4">
              {[1,2,3,4,5].map(s => <Star key={s} size={16} className="md:w-[20px] md:h-[20px]" fill="currentColor" />)}
            </div>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-[8px] md:text-[10px] font-black">Community Rating</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="md:col-span-2 bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
              <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop" alt="Texture" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="relative z-10">
              <ShieldCheck size={32} className="md:w-[48px] md:h-[48px] text-[#00C853] mb-6 md:mb-8" />
              <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-3 md:mb-4">HYGIENE PROTOCOL.</h3>
              <p className="text-gray-500 max-w-sm text-sm md:text-base font-light">
                Our kitchen operates at surgical precision levels, ensuring every sandwich is prepared in a pristine environment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. HORIZONTAL PRODUCT SHOWCASE */}
      <section className="py-20 md:py-32 overflow-hidden">
        <div className="px-6 md:px-20 mb-12 md:mb-16 flex items-end justify-between">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-9xl font-black italic tracking-tighter uppercase leading-none"
            >
              THE<br/><span className="text-[#00C853]">LINEUP.</span>
            </motion.h2>
          </div>
          <Link to="/menu" className="hidden md:flex items-center gap-4 text-gray-500 hover:text-white transition-colors group">
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Explore All</span>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#00C853] group-hover:text-black transition-all">
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>

        <div className="flex gap-8 px-8 md:px-20 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
          {featuredItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[85vw] md:min-w-[450px] snap-center"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-8 border border-white/5 h-full flex flex-col group hover:border-[#00C853]/30 transition-all shadow-2xl">
                <div className="relative aspect-square mb-8 overflow-hidden rounded-[2rem]">
                  <motion.img 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6">
                    <button className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:text-[#00C853] transition-colors">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="flex-grow space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-3xl font-black italic tracking-tighter uppercase">{item.name}</h4>
                    <span className="text-2xl font-black text-[#00C853]">₹{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#FFD700]">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">4.9</span>
                  </div>
                  <button 
                    onClick={() => triggerOrder(item)}
                    className="bg-white text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00C853] transition-all active:scale-95"
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION SLIDE */}
      <section className="relative py-24 md:py-40 px-6 md:px-8 text-center overflow-hidden">
        <motion.div 
          style={{ rotate: burgerRotate }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border border-white/[0.03] rounded-full pointer-events-none"
        />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#00C853] to-[#B9FBC0] flex items-center justify-center text-black font-black mx-auto mb-8 md:mb-12 text-3xl md:text-4xl shadow-[0_20px_50px_rgba(0,200,83,0.4)]"
          >
            0°
          </motion.div>
          
          <h2 className="text-5xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85] mb-8 md:mb-12">
            READY TO<br/>
            <span className="text-[#00C853]">EVOLVE?</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <Link to="/menu" className="w-full md:w-auto bg-[#00C853] text-black h-16 md:h-20 px-10 md:px-16 rounded-2xl md:rounded-3xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-105 transition-transform shadow-2xl">
              START ORDER <ArrowRight size={20} />
            </Link>
            <button 
              onClick={() => { playSFX(SFX_URLS.WHOOSH); setIsAiOpen(true); }}
              className="w-full md:w-auto bg-white/5 border border-white/10 text-white h-16 md:h-20 px-10 md:px-16 rounded-2xl md:rounded-3xl font-black text-[10px] md:text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-white/10 transition-all"
            >
              CHAT WITH AI <Sparkles size={20} />
            </button>
          </div>
        </div>

        <div className="mt-24 md:mt-40 space-y-4 md:space-y-6 opacity-20">
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] md:tracking-[1em]">Zero Degrees Kota — Architectural Cuisine</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em]">
            <span>Est. 2024</span>
            <span>Kota, Rajasthan</span>
            <span>Open 11AM - 11PM</span>
          </div>
        </div>
      </section>

      <OrderDrawer item={orderItem} onClose={() => setOrderItem(null)} />
      {isAiOpen && <AiConcierge onClose={() => setIsAiOpen(false)} />}
      
      {/* Custom Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX: smoothProgress }}
        className="fixed bottom-0 left-0 right-0 h-1 bg-[#00C853] origin-left z-[100] shadow-[0_0_10px_#00C853]"
      />
    </div>
  );
};

export default HomePage;


