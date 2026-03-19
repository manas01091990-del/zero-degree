
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { MessageSquare, Mic, MicOff, Send, X, Bot, Sparkles, BrainCircuit, Loader2 } from 'lucide-react';
import { decode, encode, decodeAudioData } from '../utils/audio-helpers';
import { playSFX, SFX_URLS } from '../utils/sfx';

const SYSTEM_INSTRUCTION = `You are the AI Concierge for ZERO DEGREES KOTA, a high-end vegetarian burger joint in Kota, Rajasthan. 
You are sophisticated, friendly, and helpful. You are an expert on our menu which includes:
- Zero Classic Veg Burger (₹70): Fresh potato & pea patty.
- Spicy Kota Blast (₹90): Double patty with local green chillies.
- Royal Cheese Melt (₹110): Triple cheese with mozzarella.
- Veggie Supreme (₹130): Grilled veggies and paneer.
You can help with bookings, describe items, and offer food recommendations. 
For complex nutritional or food science queries, use your thinking capability to provide depth.`;

const AiConcierge: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai' | 'thinking'; text: string }[]>([
    { role: 'ai', text: 'Namaste! I am your Zero Degrees Concierge. How can I assist you today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [thinking, setThinking] = useState(false);

  // Live API Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Handle opening sound
  useEffect(() => {
    playSFX(SFX_URLS.WHOOSH, 0.3);
  }, []);

  const handleClose = () => {
    playSFX(SFX_URLS.WHOOSH, 0.2);
    onClose();
  };

  // Chat logic
  const handleSendChat = async () => {
    if (!inputText.trim()) return;
    playSFX(SFX_URLS.CLICK, 0.2);
    const userMsg = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputText('');
    setIsTyping(true);
    setThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMsg,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingBudget: 32768 }
        },
      });

      const aiText = response.text || "I couldn't quite catch that.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      playSFX(SFX_URLS.CHIME, 0.3);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsTyping(false);
      setThinking(false);
    }
  };

  // Live Audio logic
  const startVoiceSession = async () => {
    try {
      playSFX(SFX_URLS.CLICK, 0.3);
      setIsVoiceActive(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then((session) => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsVoiceActive(false),
          onerror: (e) => { console.error(e); setIsVoiceActive(false); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        }
      });
      sessionPromiseRef.current = sessionPromise;

    } catch (err) {
      console.error(err);
      setIsVoiceActive(false);
    }
  };

  const stopVoiceSession = () => {
    playSFX(SFX_URLS.CLICK, 0.2);
    setIsVoiceActive(false);
    if (audioContextRef.current) audioContextRef.current.close();
    if (outputAudioContextRef.current) outputAudioContextRef.current.close();
  };

  useEffect(() => {
    return () => {
      stopVoiceSession();
    };
  }, []);

  const handleModeToggle = (m: 'chat' | 'voice') => {
    playSFX(SFX_URLS.CLICK, 0.2);
    setMode(m);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#121212] animate-slide-up">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between glass">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00C853] flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,200,83,0.3)]">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold tracking-tight">AI Concierge</h2>
            <div className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${thinking ? 'text-violet-400' : isVoiceActive ? 'text-amber-400' : 'text-[#00C853]'}`}>
              <motion.div
                animate={{
                  scale: thinking ? [1, 1.5, 1] : isVoiceActive ? [1, 1.3, 1] : isTyping ? [1, 1.2, 1] : [1, 1.1, 1],
                  opacity: thinking ? [1, 0.3, 1] : isVoiceActive ? [1, 0.5, 1] : isTyping ? [1, 0.7, 1] : [1, 0.4, 1],
                  backgroundColor: thinking ? '#8B5CF6' : isVoiceActive ? '#F59E0B' : '#00C853',
                  boxShadow: thinking 
                    ? ['0 0 0px #8B5CF6', '0 0 20px #8B5CF6', '0 0 0px #8B5CF6'] 
                    : isVoiceActive
                    ? ['0 0 0px #F59E0B', '0 0 15px #F59E0B', '0 0 0px #F59E0B']
                    : ['0 0 0px #00C853', '0 0 10px #00C853', '0 0 0px #00C853']
                }}
                transition={{
                  duration: thinking ? 0.6 : isVoiceActive ? 0.8 : isTyping ? 1.2 : 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 rounded-full"
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={thinking ? 'thinking' : isVoiceActive ? 'listening' : isTyping ? 'typing' : 'idle'}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {thinking ? 'Deep Thinking' : isVoiceActive ? 'Listening...' : isTyping ? 'Drafting Response' : 'Live & Ready'}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <button 
          onClick={handleClose} 
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Mode Toggle */}
      <div className="p-4 flex gap-2">
        <button 
          onClick={() => handleModeToggle('chat')}
          className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-sm ${mode === 'chat' ? 'bg-[#00C853] text-black shadow-lg shadow-[#00C853]/20' : 'bg-white/5 text-gray-400'}`}
        >
          <MessageSquare size={18} /> Chat
        </button>
        <button 
          onClick={() => handleModeToggle('voice')}
          className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-sm ${mode === 'voice' ? 'bg-[#00C853] text-black shadow-lg shadow-[#00C853]/20' : 'bg-white/5 text-gray-400'}`}
        >
          <Mic size={18} /> Talk
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
        {mode === 'chat' ? (
          <>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#00C853] text-black font-medium shadow-md' : 'bg-white/5 border border-white/10 text-gray-200 shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            
            {/* ENHANCED THINKING INDICATOR */}
            {thinking && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/5 border border-[#00C853]/20 p-4 rounded-2xl flex items-center gap-3 text-xs text-gray-400 italic shadow-[inset_0_0_20px_rgba(0,200,83,0.05)]">
                  <div className="relative">
                    <BrainCircuit size={18} className="text-[#00C853] animate-pulse" />
                    <div className="absolute inset-0 bg-[#00C853]/20 blur-lg rounded-full animate-pulse" />
                  </div>
                  <span className="tracking-tight">Synthesizing zero-degree intel...</span>
                </div>
              </div>
            )}

            {/* ENHANCED TYPING INDICATOR (Dots) */}
            {isTyping && !thinking && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-12">
            <div className="relative">
              <div className={`w-32 h-32 rounded-full border-4 border-[#00C853] flex items-center justify-center transition-all duration-500 ${isVoiceActive ? 'scale-125 shadow-[0_0_50px_rgba(0,200,83,0.4)]' : 'scale-100 opacity-50'}`}>
                {isVoiceActive ? <Sparkles size={48} className="text-[#00C853] animate-bounce" /> : <MicOff size={48} className="text-gray-600" />}
              </div>
              {isVoiceActive && (
                <div className="absolute inset-0 rounded-full border border-[#00C853] animate-ping opacity-20" />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-black italic tracking-tighter mb-2">
                {isVoiceActive ? 'LISTENING TO YOU' : 'READY TO TALK'}
              </h3>
              <p className="text-gray-500 max-w-xs mx-auto text-sm font-light">
                {isVoiceActive ? 'Speak naturally. Our AI concierge is here to help you explore Zero Degrees.' : 'Tap the button below to start a real-time voice conversation.'}
              </p>
            </div>
            <button 
              onClick={isVoiceActive ? stopVoiceSession : startVoiceSession}
              className={`h-20 px-12 rounded-3xl font-black tracking-widest text-lg flex items-center gap-4 transition-all shadow-2xl active:scale-95 ${isVoiceActive ? 'bg-red-500 text-white' : 'bg-[#00C853] text-black hover:scale-105'}`}
            >
              {isVoiceActive ? 'STOP SESSION' : 'START CONVERSATION'}
              {isVoiceActive ? <X size={24} /> : <Mic size={24} />}
            </button>
          </div>
        )}
      </div>

      {/* Input Field for Chat */}
      {mode === 'chat' && (
        <div className="p-6 border-t border-white/5 glass">
          <div className="relative">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder="Ask about the menu, bookings..."
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl h-14 pl-6 pr-14 outline-none focus:ring-2 focus:ring-[#00C853] transition-all"
            />
            <button 
              onClick={handleSendChat}
              disabled={thinking || isTyping}
              className="absolute right-2 top-2 w-10 h-10 bg-[#00C853] text-black rounded-xl flex items-center justify-center active:scale-90 transition-all shadow-lg disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AiConcierge;
