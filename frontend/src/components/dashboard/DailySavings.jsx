import React from 'react';
import { TrendingUp, Zap } from 'lucide-react';

export default function DailySavings() {
  return (
    <div className="card-dashboard flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Daily Savings</h4>
          <div className="w-7 h-7 rounded-lg bg-[#c6ff00]/10 flex items-center justify-center text-[#c6ff00]">
            <TrendingUp size={14} />
          </div>
        </div>
        <p className="text-3xl font-black text-white">₹720</p>
        <p className="text-[#c6ff00] text-[10px] font-bold mt-1 flex items-center gap-1">
          <Zap size={10} /> +12% from average
        </p>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-[#c6ff00]/5 border border-[#c6ff00]/10">
        <p className="text-white text-[10px] leading-relaxed">
          <span className="text-[#c6ff00] font-black uppercase mr-1">AI:</span>
          Skip dining out today to hit your goal 4 days earlier.
        </p>
      </div>
    </div>
  );
}
