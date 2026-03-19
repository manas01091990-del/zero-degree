
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, ShoppingBag, X, ChefHat, Timer, Flame, Filter, ChevronRight, Sparkles, Clock, Zap, Activity, Weight, Droplets, Check } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';
import { playSFX, SFX_URLS } from '../utils/sfx';
import { useCart } from '../context/CartContext';

const MenuPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  const [addedItemId, setAddedItemId] = useState<string | null>(null);
  
  const { addToCart, orderPreference, setOrderPreference } = useCart();

  const categories = ['All', ...Array.from(new Set(MENU_ITEMS.map(i => i.category)))];

  const filteredItems = MENU_ITEMS.filter(item => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const triggerOrder = (item: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSFX(SFX_URLS.CLICK);
    addToCart(item);
    
    // Amazon-style feedback
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 2000);
  };

  const handleCategoryChange = (cat: string) => {
    playSFX(SFX_URLS.CLICK);
    setSelectedCategory(cat);
  };

  return (
    <div className="min-h-screen bg-transparent pb-32">
      {/* Editorial Header with Masking Animation */}
      <div className="pt-12 px-6 md:px-8 pb-4 space-y-4">
        <div className="flex items-center gap-3 text-[#00C853]">
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 48 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-1 bg-[#00C853] rounded-full" 
          />
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              THE
            </motion.span>
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block"
            >
              CURATION.
            </motion.span>
          </h1>
        </div>
      </div>

      {/* UBER EATS STYLE SCHEDULING BAR */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 pb-6"
      >
        <div className="bg-white/5 backdrop-blur-md p-1.5 rounded-2xl flex border border-white/5">
          <button 
            onClick={() => { playSFX(SFX_URLS.CLICK, 0.2); setOrderPreference('asap'); }}
            className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${orderPreference === 'asap' ? 'bg-[#00C853] text-black shadow-lg shadow-[#00C853]/30 scale-[1.02]' : 'text-gray-500 hover:text-white'}`}
          >
            <Zap size={14} fill={orderPreference === 'asap' ? 'currentColor' : 'none'} /> ASAP
          </button>
          <button 
            onClick={() => { playSFX(SFX_URLS.CLICK, 0.2); setOrderPreference('schedule'); }}
            className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${orderPreference === 'schedule' ? 'bg-[#00C853] text-black shadow-lg shadow-[#00C853]/30 scale-[1.02]' : 'text-gray-500 hover:text-white'}`}
          >
            <Clock size={14} fill={orderPreference === 'schedule' ? 'currentColor' : 'none'} /> Order
          </button>
        </div>
      </motion.div>

      {/* Persistent Filters & Search */}
      <div className="sticky top-16 md:top-20 z-40 px-4 md:px-6 py-4 bg-black/20 backdrop-blur-3xl border-b border-white/5">
        <div className="space-y-4 md:space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00C853] transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search flavors..."
              className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl h-12 md:h-16 pl-12 md:pl-14 pr-6 focus:ring-2 focus:ring-[#00C853]/50 outline-none transition-all placeholder:text-gray-700 font-medium group-hover:border-white/20 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar py-2"
          >
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl whitespace-nowrap text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-500 border ${
                  selectedCategory === cat 
                  ? 'bg-[#00C853] text-black border-[#00C853] shadow-[0_10px_20px_rgba(0,200,83,0.3)] translate-y-[-2px]' 
                  : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Item Sections Grouped by Category */}
      <div className="px-6 pt-10 space-y-20">
        {categories.filter(cat => cat !== 'All').map((category) => {
          const itemsInCategory = filteredItems.filter(item => item.category === category);
          if (itemsInCategory.length === 0) return null;

          return (
            <section key={category} className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase text-[#00C853]">
                  {category}
                </h2>
                <div className="h-[1px] bg-white/10 flex-grow" />
              </div>

              <div className="grid gap-6">
                {itemsInCategory.map((item, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    whileHover={{ 
                      scale: 1.01,
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 200, 83, 0.1)",
                    }}
                    key={item.id} 
                    onClick={() => { playSFX(SFX_URLS.WHOOSH, 0.2); setSelectedItem(item); }}
                    className="group bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] border border-white/5 p-5 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 transition-all duration-500 hover:border-[#00C853]/40 hover:bg-white/[0.02] cursor-pointer shadow-2xl"
                  >
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-mono">
                            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#00C853] bg-[#00C853]/10 px-2 py-0.5 rounded-full">CAT_{item.category.toUpperCase()}</span>
                            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 border border-white/5 px-2 py-0.5 rounded-full">PREP_{item.prepTime.replace(' ', '_').toUpperCase()}</span>
                          </div>
                          {item.isSpicy && (
                            <div className="bg-red-500/20 backdrop-blur-md p-1.5 rounded-lg text-red-500 border border-red-500/20">
                              <Flame size={14} fill="currentColor" />
                            </div>
                          )}
                        </div>
                        <h3 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-tight group-hover:text-[#00C853] transition-colors">{item.name}</h3>
                        <p className="text-white/60 text-sm md:text-base font-light leading-relaxed group-hover:text-white/90 transition-colors">{item.description}</p>
                        
                        {item.nutrition && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1 md:pt-2 font-mono">
                            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5 transition-all group-hover:border-[#00C853]/20">
                              <Activity size={8} className="text-[#00C853]" />
                              <span className="text-[8px] font-black text-white">{item.nutrition.calories} KCAL</span>
                            </div>
                            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5 transition-all group-hover:border-blue-400/20">
                              <Weight size={8} className="text-blue-400" />
                              <span className="text-[8px] font-black text-white">P_{item.nutrition.protein}G</span>
                            </div>
                            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5 transition-all group-hover:border-amber-400/20">
                              <Zap size={8} className="text-amber-400" />
                              <span className="text-[8px] font-black text-white">C_{item.nutrition.carbs}G</span>
                            </div>
                            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5 transition-all group-hover:border-rose-400/20">
                              <Droplets size={8} className="text-rose-400" />
                              <span className="text-[8px] font-black text-white">F_{item.nutrition.fat}G</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-6 md:mt-8 font-mono">
                        <div className="flex flex-col">
                          <span className="text-2xl md:text-3xl font-black text-white">₹{item.price}.00</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={(e) => triggerOrder(item, e)}
                            className={`${addedItemId === item.id ? 'bg-white text-black' : 'bg-[#00C853] text-black'} h-12 md:h-14 px-6 md:px-8 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-[#00C853]/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 hover:shadow-[#00C853]/40`}
                          >
                            {addedItemId === item.id ? (
                              <>Added <Check size={14} strokeWidth={4} /></>
                            ) : (
                              <>Add to Cart <Plus size={14} strokeWidth={4} /></>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}

        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center space-y-6"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-700">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black italic uppercase">No Flavor Match</h3>
          </motion.div>
        )}
      </div>

      {/* Detailed Modal with Slide-Up Enhancement & Nutrition Intel */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
              onClick={() => setSelectedItem(null)} 
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full bg-black/60 backdrop-blur-3xl rounded-t-[2.5rem] md:rounded-t-[4rem] p-6 md:p-10 shadow-3xl overflow-y-auto max-h-[92vh] border-t border-white/10"
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 md:top-8 md:right-8 p-3 md:p-4 bg-white/5 rounded-full text-gray-500 hover:rotate-90 transition-transform"><X size={24} /></button>
              <div className="mb-6 md:mb-10">
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 font-mono">
                      <span className="bg-[#00C853] text-black px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black tracking-widest uppercase">CAT_{selectedItem.category.toUpperCase()}</span>
                      <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">PREP_{selectedItem.prepTime.replace(' ', '_').toUpperCase()}</span>
                    </div>
                    {selectedItem.isSpicy && (
                      <div className="bg-red-500/20 p-2 rounded-xl text-red-500 border border-red-500/20">
                        <Flame size={20} fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">{selectedItem.name}</h2>
                  <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed">{selectedItem.description}</p>
                  
                  {/* NUTRITION INTELLIGENCE GRID (Enhanced Visuals) */}
                  {selectedItem.nutrition && (
                    <div className="pt-6 md:pt-8 space-y-4 md:space-y-6 font-mono">
                      <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 flex items-center gap-4">
                        FUEL_PROFILE_ANALYSIS <div className="h-[1px] bg-white/5 flex-grow" />
                      </h4>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {[
                          { label: 'ENERGY_VAL', value: selectedItem.nutrition.calories, unit: 'KCAL', color: 'text-[#00C853]', barColor: 'bg-[#00C853]', icon: <Activity size={12} />, percent: (selectedItem.nutrition.calories / 1000) * 100 },
                          { label: 'PROTEIN_VAL', value: selectedItem.nutrition.protein, unit: 'G', color: 'text-blue-400', barColor: 'bg-blue-400', icon: <Weight size={12} />, percent: (selectedItem.nutrition.protein / 50) * 100 },
                          { label: 'CARBS_VAL', value: selectedItem.nutrition.carbs, unit: 'G', color: 'text-amber-400', barColor: 'bg-amber-400', icon: <Zap size={12} />, percent: (selectedItem.nutrition.carbs / 100) * 100 },
                          { label: 'FATS_VAL', value: selectedItem.nutrition.fat, unit: 'G', color: 'text-rose-400', barColor: 'bg-rose-400', icon: <Droplets size={12} />, percent: (selectedItem.nutrition.fat / 50) * 100 }
                        ].map((stat, i) => (
                          <motion.div 
                            key={stat.label} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="bg-white/5 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-5 relative overflow-hidden"
                          >
                            {/* Tech Accent */}
                            <div className="absolute top-0 right-0 w-8 h-8 opacity-5">
                              <div className="absolute top-2 right-2 w-4 h-[1px] bg-white" />
                              <div className="absolute top-2 right-2 h-4 w-[1px] bg-white" />
                            </div>

                            <div className="flex items-center justify-between mb-2 md:mb-3">
                              <div className={`${stat.color} p-1.5 md:p-2 bg-white/5 rounded-lg md:rounded-xl`}>{stat.icon}</div>
                              <span className={`text-[14px] md:text-[18px] font-black ${stat.color}`}>{stat.value}<span className="text-[8px] md:text-[10px] ml-0.5">{stat.unit}</span></span>
                            </div>
                            <p className="text-[7px] md:text-[8px] font-black text-gray-500 uppercase tracking-widest mb-2 md:mb-3">{stat.label}</p>
                            {/* Mini Progress Bar */}
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, stat.percent)}%` }}
                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                className={`h-full ${stat.barColor}`} 
                                />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between pt-8 md:pt-10 border-t border-white/5 mt-8 md:mt-10">
                  <div><p className="text-3xl md:text-5xl font-black text-[#00C853]">₹{selectedItem.price}</p></div>
                  <button 
                    onClick={() => { triggerOrder(selectedItem); setSelectedItem(null); }} 
                    className="bg-[#00C853] text-black h-16 md:h-20 px-8 md:px-12 rounded-[2rem] md:rounded-[2.5rem] font-black text-base md:text-lg flex items-center gap-3 md:gap-4 active:scale-95 transition-all shadow-xl hover:shadow-[#00C853]/40"
                  >
                    ADD TO CART <ShoppingBag size={20} md:size={24} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;

