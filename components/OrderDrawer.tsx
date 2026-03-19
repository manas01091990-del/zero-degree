
import React, { useState, useEffect, useMemo } from 'react';
import { X, Clock, Calendar, User, Phone, ShoppingBag, ChevronRight, Zap, CheckCircle2, Flame, Star, Sparkles, Truck, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACT_NUMBER } from '../constants';
import { playSFX, SFX_URLS } from '../utils/sfx';
import { useCart } from '../context/CartContext';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'asap' | 'schedule';
}

const OrderDrawer: React.FC<OrderDrawerProps> = ({ isOpen, onClose, defaultType = 'asap' }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<'asap' | 'schedule'>(defaultType);
  const [name, setName] = useState(localStorage.getItem('user_name') || '');
  const [phone, setPhone] = useState(localStorage.getItem('user_phone') || '');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const availableDates = useMemo(() => {
    const dates = [];
    for (let i = 0; i < 1; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const localDate = d.toLocaleDateString('en-CA');
      dates.push({
        full: localDate,
        label: 'Today'
      });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState(availableDates[0].full);

  const timeSlots = useMemo(() => {
    const slots = [];
    const startHour = 11;
    const endHour = 23;
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += 15) {
        const period = h >= 12 ? 'PM' : 'AM';
        const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
        const displayMinute = m.toString().padStart(2, '0');
        slots.push(`${displayHour}:${displayMinute} ${period}`);
      }
    }
    return slots;
  }, []);

  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);

  useEffect(() => {
    if (isOpen) {
      setOrderType(defaultType);
      playSFX(SFX_URLS.WHOOSH, 0.4);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, defaultType]);

  if (!isOpen) return null;

  const handleClose = () => {
    playSFX(SFX_URLS.WHOOSH, 0.2);
    onClose();
  };

  const handleConfirm = () => {
    playSFX(SFX_URLS.CHIME, 0.5);
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_phone', phone);

    const timing = orderType === 'asap' 
      ? 'ASAP (Priority Assembly)' 
      : `SCHEDULED: ${selectedDate} at ${selectedTime}`;

    const itemsList = cart.map(item => `${item.quantity}x ${item.name.toUpperCase()} (₹${item.price * item.quantity})`).join('%0A');

    const message = `*ZERO DEGREES KOTA — ORDER*%0A%0A` +
      `*Items:*%0A${itemsList}%0A%0A` +
      `*Total Price:* ₹${totalPrice}%0A` +
      `*Timing:* ${timing}%0A%0A` +
      `*Identity*%0A` +
      `*Name:* ${name}%0A` +
      `*Phone:* ${phone}%0A%0A` +
      `Please reserve these flavor slots for me.`;

    window.open(`https://wa.me/${CONTACT_NUMBER}?text=${message}`, '_blank');
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-fade-in" onClick={handleClose} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md bg-[#121212] rounded-[3rem] p-10 border border-[#00C853]/30 text-center space-y-8 shadow-[0_0_100px_rgba(0,200,83,0.2)]"
        >
          <div className="w-24 h-24 bg-[#00C853]/20 text-[#00C853] rounded-full flex items-center justify-center mx-auto animate-pulse">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase">ORDERED!</h2>
          </div>
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            Your burger architecture is now being processed. We will contact you shortly.
          </p>
          <div className="grid gap-4">
            <button 
              onClick={handleClose}
              className="w-full h-16 bg-[#00C853] text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl"
            >
              DONE <CheckCircle2 size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-fade-in" onClick={handleClose} />
      
      <div className="relative w-full max-w-2xl bg-[#0A0A0A] rounded-t-[4rem] p-8 pb-12 shadow-[0_-30px_100px_rgba(0,0,0,0.8)] animate-slide-up border-t border-white/10 max-h-[96vh] overflow-y-auto no-scrollbar">
        {/* HYPE BANNER */}
        <div className="bg-[#00C853] text-black py-2 -mx-8 -mt-8 mb-8 flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap text-[9px] font-black uppercase tracking-[0.5em] py-1">
            {[1,2,3,4,5].map(i => (
              <span key={i} className="mx-8 flex items-center gap-2">
                <Flame size={12} fill="currentColor" /> ELITE SLOT ACCESS <Sparkles size={12} fill="currentColor" /> SKIP THE QUEUE
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Your Selection</h2>
          <button onClick={handleClose} className="p-4 bg-white/5 rounded-full text-gray-500 active:scale-90 transition-transform"><X size={24} /></button>
        </div>

        {/* CART ITEMS LIST */}
        <div className="space-y-4 mb-10">
          {cart.map(item => (
            <div key={item.id} className="bg-white/5 rounded-[2rem] p-4 flex items-center gap-4 border border-white/5">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover border border-[#00C853]/30" />
              <div className="flex-grow">
                <h3 className="text-sm font-black uppercase tracking-tight">{item.name}</h3>
                <p className="text-[#00C853] font-black text-sm">₹{item.price * item.quantity}</p>
              </div>
              <div className="flex items-center gap-3 bg-black/40 rounded-full p-1 border border-white/5">
                <button 
                  onClick={() => { playSFX(SFX_URLS.CLICK, 0.1); updateQuantity(item.id, item.quantity - 1); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => { playSFX(SFX_URLS.CLICK, 0.1); updateQuantity(item.id, item.quantity + 1); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#00C853] hover:scale-110 transition-transform"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button 
                onClick={() => { playSFX(SFX_URLS.CLICK, 0.1); removeFromCart(item.id); }}
                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          
          {cart.length === 0 && (
            <div className="text-center py-10 text-gray-600">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-xs font-black uppercase tracking-widest">Your selection is empty</p>
            </div>
          )}
        </div>

        {/* TOTAL SUMMARY */}
        {cart.length > 0 && (
          <div className="bg-white/5 rounded-[2.5rem] p-6 mb-10 border border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Total Architecture Value</span>
            <span className="text-3xl font-black text-[#00C853]">₹{totalPrice}</span>
          </div>
        )}

        {/* Priority Switcher - High Performance UI */}
        <div className="bg-[#1A1A1A] p-2 rounded-[2.5rem] flex mb-10 border border-white/5 shadow-inner">
          <button 
            onClick={() => { playSFX(SFX_URLS.CLICK); setOrderType('asap'); }}
            className={`flex-1 h-16 rounded-[2rem] flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${orderType === 'asap' ? 'bg-[#00C853] text-black shadow-[0_10px_30px_rgba(0,200,83,0.3)] scale-[1.02]' : 'text-gray-500 hover:text-white'}`}
          >
            <Zap size={18} fill={orderType === 'asap' ? 'currentColor' : 'none'} /> ASAP <span className="text-[7px] opacity-40 ml-1">KINETIC</span>
          </button>
          <button 
            onClick={() => { playSFX(SFX_URLS.CLICK); setOrderType('schedule'); }}
            className={`flex-1 h-16 rounded-[2rem] flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${orderType === 'schedule' ? 'bg-[#00C853] text-black shadow-[0_10px_30px_rgba(0,200,83,0.3)] scale-[1.02]' : 'text-gray-500 hover:text-white'}`}
          >
            <Clock size={18} fill={orderType === 'schedule' ? 'currentColor' : 'none'} /> ORDER <span className="text-[7px] opacity-40 ml-1">DROP</span>
          </button>
        </div>

        <div className="space-y-10">
          {orderType === 'schedule' && (
            <div className="space-y-8 animate-fade-in-up">
              {/* DATE PICKER */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black">1. CHOOSE YOUR DAY</label>
                  <span className="text-[7px] text-[#00C853] font-black uppercase bg-[#00C853]/10 px-2 py-0.5 rounded-full">Available</span>
                </div>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {availableDates.map(date => (
                    <button
                      key={date.full}
                      onClick={() => { playSFX(SFX_URLS.CLICK, 0.1); setSelectedDate(date.full); }}
                      className={`min-w-[100px] px-6 py-5 rounded-[1.5rem] flex flex-col items-center justify-center gap-1 border transition-all duration-500 ${selectedDate === date.full ? 'bg-white text-black border-white shadow-[0_20px_40px_rgba(255,255,255,0.1)] translate-y-[-4px]' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">{date.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* TIME SLOT PICKER */}
              <div className="space-y-4">
                 <div className="flex items-center justify-between px-2">
                  <label className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black">2. CHOOSE YOUR DROP TIME</label>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((slot, idx) => (
                    <button
                      key={slot}
                      onClick={() => { playSFX(SFX_URLS.CLICK, 0.1); setSelectedTime(slot); }}
                      className={`py-4 rounded-[1.5rem] text-[10px] font-black border transition-all duration-500 ${selectedTime === slot ? 'bg-[#00C853] text-black border-[#00C853] shadow-[0_10px_20px_rgba(0,200,83,0.2)]' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/[0.08]'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-black ml-2">AUTHENTICATION</label>
              <div className="grid gap-4">
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00C853] transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-[2rem] h-18 pl-16 pr-8 focus:ring-2 focus:ring-[#00C853]/50 outline-none transition-all font-black text-sm text-white placeholder:text-gray-700"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00C853] transition-colors" size={20} />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-[2rem] h-18 pl-16 pr-8 focus:ring-2 focus:ring-[#00C853]/50 outline-none transition-all font-black text-sm text-white placeholder:text-gray-700"
                    placeholder="Mobile number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL TRIGGER BUTTON */}
        <button 
          onClick={handleConfirm}
          disabled={!name || !phone || cart.length === 0}
          className="w-full h-24 bg-[#00C853] text-black rounded-[2.5rem] font-black text-xl flex flex-col items-center justify-center gap-1 mt-14 shadow-[0_30px_60px_rgba(0,200,83,0.4)] disabled:opacity-20 disabled:grayscale active:scale-95 transition-all relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <div className="relative z-10 flex items-center gap-4">
            {orderType === 'asap' ? 'ORDER NOW' : 'SECURE DROP SLOT'}
            <ChevronRight size={28} strokeWidth={4} className="group-hover:translate-x-2 transition-transform" />
          </div>
          <span className="relative z-10 text-[9px] uppercase tracking-[0.4em] opacity-60">Verified Order Flow</span>
        </button>
        
        <p className="text-center text-[8px] font-bold text-gray-700 uppercase tracking-[0.5em] mt-8">
           JOIN THE ELITE RANKINGS ONCE ORDER IS CONFIRMED
        </p>
      </div>

      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fade-in-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .h-18 { height: 4.5rem; }
      `}</style>
    </div>
  );
};

export default OrderDrawer;
