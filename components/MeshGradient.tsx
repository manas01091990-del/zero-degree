
import React from 'react';
import { motion } from 'motion/react';

const MeshGradient: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#0A0A0A]">
      {/* Primary Emerald Glow */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[#00C853]/10 blur-[120px] rounded-full"
      />

      {/* Secondary Deep Green Glow */}
      <motion.div
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 120, -40, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-[#004D40]/20 blur-[100px] rounded-full"
      />

      {/* Subtle Gold Accent */}
      <motion.div
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -100, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-[#FFD700]/5 blur-[150px] rounded-full"
      />

      {/* Center Softening Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]" />
      
      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
};

export default MeshGradient;
