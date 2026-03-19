
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Utensils, Calendar, Image as ImageIcon, Star, MessageCircle, Menu as MenuIcon, X, MapPin, Phone, ChevronRight, ShoppingBag, Heart, Trophy, Zap, Sparkles, Truck } from 'lucide-react';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import BookPage from './pages/BookPage';
import GalleryPage from './pages/GalleryPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import FavoritesPage from './pages/FavoritesPage';
import RankingPage from './pages/RankingPage';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import MeshGradient from './components/MeshGradient';
import { COLORS, CONTACT_NUMBER } from './constants';
import { playSFX, SFX_URLS } from './utils/sfx';
import { useCart } from './context/CartContext';

import OrderDrawer from './components/OrderDrawer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  
  const { totalItems, orderPreference } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = (open: boolean) => {
    playSFX(SFX_URLS.WHOOSH, 0.2);
    setIsSidebarOpen(open);
  };

  if (loading) return <Loader />;

  return (
    <Router>
      <div className="min-h-screen text-[#F8F9FA] pb-24 relative">
        <MeshGradient />
        <CustomCursor />
        {/* Top Navbar */}
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <Link to="/" onClick={() => playSFX(SFX_URLS.CLICK)} className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#00C853] flex items-center justify-center text-black font-black">0°</div>
            <span>ZERO DEGREES</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <a 
              href={`tel:${CONTACT_NUMBER}`}
              onClick={() => playSFX(SFX_URLS.CLICK)}
              className="p-2 hover:bg-white/5 rounded-full transition-all text-gray-400 hover:text-[#00C853] active:scale-90"
              title="Call Us"
            >
              <Phone size={24} />
            </a>
            <Link 
              to="/favorites" 
              onClick={() => playSFX(SFX_URLS.CLICK)}
              className="p-2 hover:bg-white/5 rounded-full transition-all text-gray-400 hover:text-[#00C853] active:scale-90"
              title="Favorite Items"
            >
              <Heart size={24} />
            </Link>
            <Link 
              to="/menu" 
              onClick={() => playSFX(SFX_URLS.CLICK)}
              className="p-2 hover:bg-white/5 rounded-full transition-all text-gray-400 hover:text-[#00C853] active:scale-90 relative"
              title="Cart"
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#00C853] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#121212]"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            <button 
              onClick={() => toggleSidebar(true)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </nav>

          {/* Sidebar Drawer */}
          <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => toggleSidebar(false)} />
            <div className={`absolute top-0 right-0 w-80 h-full bg-[#1A1A1A] transition-transform duration-500 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} p-8 flex flex-col`}>
              <button 
                onClick={() => toggleSidebar(false)}
                className="self-end p-2 mb-8 bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col gap-6 text-2xl font-medium">
                <NavLink to="/" onClick={() => toggleSidebar(false)}>Home</NavLink>
                <NavLink to="/rank" onClick={() => toggleSidebar(false)}>Leaderboard</NavLink>
                <NavLink to="/menu" onClick={() => toggleSidebar(false)}>Menu</NavLink>
                <NavLink to="/favorites" onClick={() => toggleSidebar(false)}>Favorites</NavLink>
                <NavLink to="/book" onClick={() => toggleSidebar(false)}>Book a Table</NavLink>
                <NavLink to="/gallery" onClick={() => toggleSidebar(false)}>Gallery</NavLink>
                <NavLink to="/reviews" onClick={() => toggleSidebar(false)}>Reviews</NavLink>
                <NavLink to="/contact" onClick={() => toggleSidebar(false)}>Contact</NavLink>
              </div>
              <div className="mt-auto pt-8 border-t border-white/5">
                <p className="text-sm text-gray-500 mb-2">Located at Kota</p>
                <a href={`tel:${CONTACT_NUMBER}`} onClick={() => playSFX(SFX_URLS.CLICK)} className="flex items-center gap-2 text-[#00C853]">
                  <Phone size={16} />
                  <span>+91 {CONTACT_NUMBER}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="pt-20 px-4 md:px-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rank" element={<RankingPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/book" element={<BookPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>

          {/* Floating WhatsApp Button */}
          <a 
            href={`https://wa.me/${CONTACT_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSFX(SFX_URLS.CLICK)}
            className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-40 bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
          >
            <MessageCircle size={24} className="sm:w-7 sm:h-7" />
          </a>

          {/* GLOBAL FLOATING CART BUTTON - Enhanced Visibility */}
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.8 }}
                animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                exit={{ opacity: 0, y: 50, x: "-50%", scale: 0.8 }}
                className="fixed bottom-32 sm:bottom-40 left-1/2 z-[60] w-[90vw] sm:w-auto"
              >
                <button 
                  onClick={() => { playSFX(SFX_URLS.CHIME); setIsOrderDrawerOpen(true); }}
                  className="w-full sm:w-auto bg-[#00C853] text-black px-6 py-4 sm:px-12 sm:py-6 rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-[0_20px_50px_rgba(0,200,83,0.5)] flex items-center justify-center gap-3 sm:gap-5 border-2 border-white/30 hover:scale-105 active:scale-95 transition-all group relative overflow-hidden"
                >
                  {/* Subtle Shimmer Effect */}
                  <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  />
                  
                  <div className="relative">
                    <ShoppingBag size={24} strokeWidth={3} />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-black text-[#00C853] flex items-center justify-center text-[11px] font-black border-2 border-[#00C853]"
                    >
                      {totalItems}
                    </motion.div>
                  </div>
                  <span className="relative z-10">VIEW CART</span>
                  <ChevronRight size={20} strokeWidth={3} className="group-hover:translate-x-2 transition-transform relative z-10" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Navigation with High-Hype Central ORDER DROP Button */}
          <div className="fixed bottom-0 w-full z-50 glass border-t border-white/5 px-2 py-3 flex items-center justify-around">
            <BottomNavItem to="/" icon={<Home size={20} />} label="Home" />
            <BottomNavItem to="/menu" icon={<Utensils size={20} />} label="Menu" />
            
            {/* THE HYPE CENTRAL ORDER DROP BUTTON */}
            <Link 
              to="/menu"
              onClick={() => playSFX(SFX_URLS.CHIME, 0.4)}
              className="relative -top-10 group"
            >
              {/* Intense Neon Glow Layers */}
              <div className="absolute inset-0 bg-[#00C853] blur-3xl opacity-40 group-hover:opacity-80 transition-opacity animate-pulse" />
              <div className="absolute -inset-4 bg-[#00C853]/20 blur-2xl rounded-full animate-ping" />
              
              <div className="relative w-24 h-24 bg-gradient-to-br from-[#00C853] via-[#B9FBC0] to-[#00C853] rounded-[2.5rem] shadow-[0_0_50px_rgba(0,200,83,0.6)] flex flex-col items-center justify-center text-black border-4 border-[#121212] active:scale-90 transition-all duration-300 group-hover:rotate-3">
                <Zap size={28} fill="currentColor" className="animate-bounce" />
                <div className="flex flex-col items-center -mt-1">
                  <span className="text-[10px] font-black uppercase tracking-tighter leading-none">ORDER</span>
                  <span className="text-[10px] font-black uppercase tracking-tighter leading-none">DROP</span>
                </div>
              </div>
              
              {/* High-Hype Exclusive Badge */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-3 -right-6 bg-[#FF3D00] text-white text-[7px] font-black px-3 py-1 rounded-full shadow-[0_0_20px_rgba(255,61,0,0.5)] border border-white/20 whitespace-nowrap rotate-12"
              >
                LIMITED SLOTS 🔥
              </motion.div>
            </Link>

            <BottomNavItem to="/rank" icon={<Trophy size={20} />} label="Rank" />
            <BottomNavItem to="/book" icon={<Calendar size={20} />} label="Book" />
          </div>

          <OrderDrawer isOpen={isOrderDrawerOpen} defaultType={orderPreference} onClose={() => setIsOrderDrawerOpen(false)} />
        </div>
    </Router>
  );
};

const NavLink: React.FC<{ to: string, children: React.ReactNode, onClick: () => void }> = ({ to, children, onClick }) => (
  <Link to={to} onClick={() => { playSFX(SFX_URLS.CLICK); onClick(); }} className="hover:text-[#00C853] transition-colors">{children}</Link>
);

const BottomNavItem: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      onClick={() => playSFX(SFX_URLS.CLICK, 0.2)}
      className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#00C853]' : 'text-gray-400'}`}
    >
      <div className={`${isActive ? 'scale-110' : 'scale-100'} transition-transform`}>
        {icon}
      </div>
      <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${isActive ? 'opacity-100' : 'opacity-40'}`}>
        {label}
      </span>
    </Link>
  );
};

export default App;
