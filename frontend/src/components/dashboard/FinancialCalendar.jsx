import React from 'react';
import { Mic, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinancialCalendar() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const events = [
    { day: 14, type: 'salary', color: '#c6ff00' },
    { day: 5, type: 'emi', color: '#f43f5e' },
    { day: 10, type: 'sip', color: '#4d7cfe' },
    { day: 25, type: 'bill', color: '#f59e0b' },
  ];

  return (
    <div className="bg-[#4d7cfe] rounded-[2.5rem] p-8 text-white h-full relative overflow-hidden shadow-[0_0_50px_rgba(77,124,254,0.3)]">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black">AI Financial Calendar</h3>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">April 2026</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                <ChevronLeft size={16} />
              </button>
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3 text-center">
            {days.map((d, i) => (
              <span key={i} className="text-[10px] font-black opacity-40 uppercase tracking-tighter">
                {d}
              </span>
            ))}
            {[...Array(30)].map((_, i) => {
              const day = i + 1;
              const event = events.find(e => e.day === day);
              const isToday = day === 25; // Dummy today

              return (
                <div 
                  key={i} 
                  className={`h-9 w-9 rounded-2xl flex items-center justify-center text-xs font-black relative cursor-pointer transition-all hover:scale-110
                    ${isToday ? 'bg-white text-[#4d7cfe] shadow-xl' : 'hover:bg-white/10'}
                  `}
                >
                  {day}
                  {event && (
                    <div 
                      className="absolute bottom-1 w-1 h-1 rounded-full"
                      style={{ backgroundColor: event.color }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <div 
            onClick={() => document.dispatchEvent(new CustomEvent('open-voice-assistant'))}
            className="p-5 rounded-3xl bg-black/20 border border-white/10 backdrop-blur-sm group cursor-pointer hover:bg-black/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#c6ff00] flex items-center justify-center text-black shadow-[0_0_20px_rgba(198,255,0,0.5)]">
                <Mic size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-0.5">AI Voice Reminder</p>
                <p className="text-sm font-bold leading-tight">"Your Credit Card bill is due in 2 days. Should I pay it?"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
