import React from 'react';
import { Target } from 'lucide-react';

export default function DecisionScore() {
  const score = 7.8;
  const pct = (score / 10) * 100;

  return (
    <div className="card-dashboard flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Decision Score</h4>
          <div className="w-7 h-7 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6]">
            <Target size={14} />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <p className="text-3xl font-black text-white">{score}</p>
          <p className="text-slate-500 text-[10px] font-bold">/ 10</p>
        </div>
        <div className="mt-3 h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div className="h-full bg-[#8b5cf6] rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-[#8b5cf6]/5 border border-[#8b5cf6]/10">
        <p className="text-white text-[10px] leading-relaxed">
          <span className="text-[#8b5cf6] font-black uppercase mr-1">AI:</span>
          Good decisions this week. Reduce impulse buying for higher score.
        </p>
      </div>
    </div>
  );
}
