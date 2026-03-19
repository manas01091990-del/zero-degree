
import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Clock, Navigation } from 'lucide-react';
import { CONTACT_NUMBER } from '../constants';

const ContactPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 px-4">
      <div className="overflow-hidden">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-black italic tracking-tighter mb-2 uppercase"
        >
          CONTACT US
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 italic"
        >
          Visit us at Kota
        </motion.p>
      </div>

      {/* Map Placeholder */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="h-64 rounded-[2.5rem] bg-[#1A1A1A] border border-white/5 overflow-hidden relative group shadow-2xl"
      >
        <iframe 
          title="Google Maps"
          className="w-full h-full grayscale invert opacity-60"
          src={`https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_YOUR_KEY&q=Kota,Rajasthan`}
          allowFullScreen
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3 text-white"
          >
            <MapPin className="text-[#00C853]" size={20} />
            <span className="font-medium">ZERO DEGREES, KOTA</span>
          </motion.div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-6 right-6 bg-[#00C853] text-black p-4 rounded-full shadow-2xl transition-all"
        >
          <Navigation size={24} />
        </motion.button>
      </motion.div>

      {/* Info Cards */}
      <div className="grid gap-4">
        {[
          { icon: <Phone size={24} />, label: "Call Us", value: `+91 ${CONTACT_NUMBER}`, color: "text-[#00C853]", bgColor: "bg-[#00C853]/10" },
          { icon: <MessageCircle size={24} />, label: "WhatsApp", value: "Chat with Owner", color: "text-[#25D366]", bgColor: "bg-[#25D366]/10" },
          { icon: <Clock size={24} />, label: "Opening Hours", value: "11:00 AM — 11:30 PM", color: "text-[#FFD700]", bgColor: "bg-[#FFD700]/10" }
        ].map((info, i) => (
          <motion.div 
            key={info.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + (i * 0.1) }}
            whileHover={{ x: 10 }}
            className="bg-[#1A1A1A] rounded-3xl p-6 border border-white/5 flex items-center gap-6 shadow-xl group transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl ${info.bgColor} flex items-center justify-center ${info.color} group-hover:scale-110 transition-transform`}>
              {info.icon}
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{info.label}</p>
              <h3 className="text-xl font-bold tracking-tight">{info.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pt-8 text-center space-y-4"
      >
        <p className="text-gray-500 text-sm italic font-light">"Come for the burgers, stay for the vibes."</p>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">We are currently OPEN</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;

