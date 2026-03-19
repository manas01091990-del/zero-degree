
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { CONTACT_NUMBER } from '../constants';
import { Booking } from '../types';
import { playSFX, SFX_URLS } from '../utils/sfx';

const BookPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const today = new Date().toLocaleDateString('en-CA');
  const [formData, setFormData] = useState<Booking>({
    name: '',
    contact: '',
    date: today,
    time: '06:00 PM',
    guests: 2,
    location: 'indoor',
    notes: ''
  });

  const [selHour, setSelHour] = useState('06');
  const [selMinute, setSelMinute] = useState('00');
  const [selPeriod, setSelPeriod] = useState('PM');

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

  const handleBook = () => {
    playSFX(SFX_URLS.CHIME, 0.4);
    const formattedTime = `${selHour}:${selMinute} ${selPeriod}`;
    const message = `Hello ZERO DEGREES KOTA! I would like to book a table:%0A%0AName: ${formData.name}%0AContact: ${formData.contact}%0ADate: ${formData.date}%0ATime: ${formattedTime}%0AGuests: ${formData.guests}%0ALocation: ${formData.location}%0ANotes: ${formData.notes}%0A%0APlease confirm my booking.`;
    window.open(`https://wa.me/${CONTACT_NUMBER}?text=${message}`, '_blank');
    setStep(2);
    playSFX(SFX_URLS.WHOOSH, 0.2);
  };

  return (
    <div className="space-y-8 pb-12 px-4">
      <AnimatePresence mode="wait">
        {step === 2 ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="w-24 h-24 bg-[#00C853]/20 text-[#00C853] rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,200,83,0.2)]"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-black italic tracking-tighter mb-4 uppercase"
            >
              REQUEST SENT!
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-lg font-light leading-relaxed mb-12"
            >
              We've sent your details to our team via WhatsApp. Please check your chat for confirmation.
            </motion.p>
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={() => { playSFX(SFX_URLS.CLICK); setStep(1); }}
              className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-95"
            >
              Book Another Table
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl font-black italic tracking-tighter mb-2 uppercase"
              >
                RESERVE A SPOT
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500"
              >
                Fine dining at the heart of Kota
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#1A1A1A] rounded-[2.5rem] border border-white/5 p-8 shadow-2xl space-y-6"
            >
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-black/30 border border-white/5 rounded-xl h-14 px-4 focus:ring-2 focus:ring-[#00C853] outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Contact Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-black/30 border border-white/5 rounded-xl h-14 px-4 focus:ring-2 focus:ring-[#00C853] outline-none transition-all"
                  value={formData.contact}
                  onChange={e => setFormData({...formData, contact: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Date (Today Only)</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="date" 
                      className="w-full bg-black/30 border border-white/5 rounded-xl h-14 pl-12 pr-4 focus:ring-2 focus:ring-[#00C853] outline-none transition-all"
                      value={formData.date}
                      min={today}
                      max={today}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Time (12H Format)</label>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-black/30 border border-white/5 rounded-xl h-14 flex items-center px-2">
                      <select 
                        value={selHour} 
                        onChange={(e) => { playSFX(SFX_URLS.CLICK, 0.1); setSelHour(e.target.value); }}
                        className="w-full bg-transparent outline-none font-bold text-center appearance-none"
                      >
                        {hours.map(h => <option key={h} value={h} className="bg-[#1A1A1A]">{h}</option>)}
                      </select>
                    </div>
                    <div className="flex-1 bg-black/30 border border-white/5 rounded-xl h-14 flex items-center px-2">
                      <select 
                        value={selMinute} 
                        onChange={(e) => { playSFX(SFX_URLS.CLICK, 0.1); setSelMinute(e.target.value); }}
                        className="w-full bg-transparent outline-none font-bold text-center appearance-none"
                      >
                        {minutes.map(m => <option key={m} value={m} className="bg-[#1A1A1A]">{m}</option>)}
                      </select>
                    </div>
                    <div className="flex-1 bg-black/30 border border-white/5 rounded-xl h-14 flex items-center px-2">
                      <select 
                        value={selPeriod} 
                        onChange={(e) => { playSFX(SFX_URLS.CLICK, 0.1); setSelPeriod(e.target.value); }}
                        className="w-full bg-transparent outline-none font-bold text-center appearance-none"
                      >
                        <option value="AM" className="bg-[#1A1A1A]">AM</option>
                        <option value="PM" className="bg-[#1A1A1A]">PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <select 
                      className="w-full bg-black/30 border border-white/5 rounded-xl h-14 pl-12 pr-4 focus:ring-2 focus:ring-[#00C853] outline-none transition-all appearance-none"
                      value={formData.guests}
                      onChange={e => { playSFX(SFX_URLS.CLICK, 0.1); setFormData({...formData, guests: parseInt(e.target.value)}); }}
                    >
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-[#1A1A1A]">{n} Guests</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Seating</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <select 
                      className="w-full bg-black/30 border border-white/5 rounded-xl h-14 pl-12 pr-4 focus:ring-2 focus:ring-[#00C853] outline-none transition-all appearance-none"
                      value={formData.location}
                      onChange={e => { playSFX(SFX_URLS.CLICK, 0.1); setFormData({...formData, location: e.target.value as any}); }}
                    >
                      <option value="indoor" className="bg-[#1A1A1A]">Indoor</option>
                      <option value="outdoor" className="bg-[#1A1A1A]">Outdoor</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Special Notes</label>
                <textarea 
                  placeholder="Birthday surprise? Allergies? Let us know."
                  className="w-full bg-black/30 border border-white/5 rounded-xl p-4 h-32 focus:ring-2 focus:ring-[#00C853] outline-none transition-all resize-none"
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBook}
                disabled={!formData.name || !formData.contact}
                className="w-full h-16 bg-[#00C853] text-black rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl disabled:opacity-50 disabled:grayscale shadow-[0_20px_40px_rgba(0,200,83,0.3)]"
              >
                CONFIRM ON WHATSAPP <Send size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookPage;

