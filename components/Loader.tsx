
import React, { useState, useEffect } from 'react';

const Loader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  
  const statusMessages = [
    "CALIBRATING_OPTICS",
    "THERMAL_STABILIZATION",
    "CORE_GEOMETRY_LOAD",
    "KOTA_ELITE_SYNC",
    "ABSOLUTE_ZERO_REACHED"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFinished(true), 800);
          return 100;
        }
        // Smooth logarithmic progress
        const remaining = 100 - prev;
        const step = Math.max(0.05, Math.random() * (remaining / 12));
        return Math.min(100, prev + step);
      });
    }, 30);

    const statusInterval = setInterval(() => {
      setStatusIdx(prev => (prev + 1) % statusMessages.length);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, []);

  // Circle properties
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className={`fixed inset-0 z-[250] flex flex-col items-center justify-center bg-[#080808] transition-all duration-[1000ms] cubic-bezier(0.9, 0, 0.1, 1) ${
        isFinished ? 'opacity-0 scale-125 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#00C853]/5 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative flex flex-col items-center justify-center">
        
        {/* Main Lens / Progress Circle */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
          
          {/* Rotating Outer Ring */}
          <div className="absolute inset-0 border border-white/[0.03] rounded-full animate-spin-very-slow" />
          
          {/* Animated SVG Progress */}
          <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_15px_rgba(0,200,83,0.3)]">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="currentColor"
              strokeWidth="1.5"
              fill="transparent"
              className="text-white/[0.05]"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#00C853"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.1s linear' }}
              strokeLinecap="round"
            />
          </svg>

          {/* Central Branding Hub */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative flex flex-col items-center">
              {/* Zero Degrees Logo Marker */}
              <div className={`transition-all duration-1000 transform ${progress > 10 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
                <div className="w-16 h-16 rounded-full border-2 border-[#00C853] flex items-center justify-center text-[#00C853] font-black text-2xl mb-4 bg-[#00C853]/5 shadow-[0_0_30px_rgba(0,200,83,0.2)]">
                  0°
                </div>
              </div>

              {/* Text Reveal */}
              <div className="overflow-hidden h-12 flex items-center">
                <h1 className="text-2xl md:text-3xl font-black italic tracking-[0.4em] text-white uppercase flex items-center">
                  {['Z','E','R','O'].map((char, i) => (
                    <span 
                      key={i} 
                      className="inline-block transition-all duration-700"
                      style={{ 
                        transform: progress > (20 + i*5) ? 'translateY(0)' : 'translateY(100%)',
                        opacity: progress > (20 + i*5) ? 1 : 0,
                        transitionDelay: `${i * 50}ms`
                      }}
                    >
                      {char}
                    </span>
                  ))}
                  <span className="w-4" />
                  {['D','E','G','R','E','E','S'].map((char, i) => (
                    <span 
                      key={i} 
                      className="inline-block transition-all duration-700 text-[#00C853]"
                      style={{ 
                        transform: progress > (40 + i*5) ? 'translateY(0)' : 'translateY(100%)',
                        opacity: progress > (40 + i*5) ? 1 : 0,
                        transitionDelay: `${(i + 4) * 50}ms`
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Subtle Subline */}
              <div 
                className={`text-[8px] font-black tracking-[0.8em] text-gray-600 uppercase mt-4 transition-all duration-1000 ${progress > 70 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              >
                ARCHITECTURAL_FLAVOR
              </div>
            </div>
          </div>

          {/* Floating Data Points (Cosmetic) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[15%] left-[15%] w-1 h-1 bg-[#00C853] rounded-full animate-ping" />
            <div className="absolute bottom-[20%] right-[10%] w-1 h-1 bg-white/20 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="mt-16 flex flex-col items-center gap-4 w-64">
          <div className="flex justify-between w-full px-1 items-end">
            <div className="flex flex-col">
               <span className="text-[7px] text-gray-600 font-bold uppercase tracking-widest leading-none mb-1">Status_Feed</span>
               <span className="font-mono text-[9px] text-[#00C853] uppercase tracking-[0.1em] h-3 overflow-hidden">
                 {statusMessages[statusIdx]}
               </span>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[7px] text-gray-600 font-bold uppercase tracking-widest leading-none mb-1">Completion</span>
               <span className="font-mono text-[10px] text-white font-black">
                 {Math.round(progress)}%
               </span>
            </div>
          </div>
          
          {/* Progress Bar (Minimal) */}
          <div className="h-[1px] w-full bg-white/5 relative">
            <div 
              className="absolute inset-y-0 left-0 bg-[#00C853] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-spin-very-slow {
          animation: spin-very-slow 20s linear infinite;
        }
        .cubic-bezier(0.9, 0, 0.1, 1) {
          transition-timing-function: cubic-bezier(0.9, 0, 0.1, 1);
        }
      `}</style>
    </div>
  );
};

export default Loader;
