import React from 'react';
import { Clock, BarChart3 } from 'lucide-react';

export default function ProductiveTime() {
  return (
    <div className="card-dashboard flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Productive Time</h4>
          <div className="w-7 h-7 rounded-lg bg-[#4d7cfe]/10 flex items-center justify-center text-[#4d7cfe]">
            <Clock size={14} />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <p className="text-3xl font-black text-white">2h 45m</p>
          <p className="text-slate-500 text-[10px] font-bold">today</p>
        </div>
        <p className="text-[#4d7cfe] text-[10px] font-bold mt-1 flex items-center gap-1">
          <BarChart3 size={10} /> Top 5% of users
        </p>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-[#4d7cfe]/5 border border-[#4d7cfe]/10">
        <p className="text-white text-[10px] leading-relaxed">
          <span className="text-[#4d7cfe] font-black uppercase mr-1">AI:</span>
          Excellent focus. 1 more hour can boost income skills by 15%.
        </p>
      </div>
    </div>
  );
}
