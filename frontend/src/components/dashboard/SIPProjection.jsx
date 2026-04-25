"use client"
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles } from 'lucide-react';

export default function SIPProjection({ salary = 50000, riskLevel = 'moderate' }) {
  const sipAmount = Math.round(salary * (riskLevel === 'aggressive' ? 0.25 : riskLevel === 'moderate' ? 0.15 : 0.10));
  const rate = riskLevel === 'aggressive' ? 0.15 : riskLevel === 'moderate' ? 0.12 : 0.08;

  const projectionData = [];
  let total = 0;
  let invested = 0;
  for (let year = 0; year <= 10; year++) {
    invested = sipAmount * 12 * year;
    total = sipAmount * ((Math.pow(1 + rate / 12, year * 12) - 1) / (rate / 12)) * (1 + rate / 12);
    projectionData.push({
      year: `${year}Y`,
      invested: Math.round(invested),
      projected: Math.round(total),
      returns: Math.round(total - invested)
    });
  }

  const finalValue = projectionData[10];

  return (
    <div className="card-dashboard relative overflow-hidden group">
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#c6ff00]/5 blur-3xl group-hover:bg-[#c6ff00]/10 transition-all duration-700" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-black text-white mb-1">SIP Growth Projection</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">₹{sipAmount.toLocaleString('en-IN')}/mo • {(rate * 100)}% returns</p>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#c6ff00]/10 text-[#c6ff00] text-[10px] font-black uppercase">
            <TrendingUp size={12} /> {riskLevel}
          </div>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sipProjected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c6ff00" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c6ff00" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sipInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4d7cfe" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4d7cfe" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 9, fontWeight: 800 }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ backgroundColor: '#1c1c1c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', color: '#fff', padding: '12px' }}
                formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
              />
              <Area type="monotone" dataKey="invested" stroke="#4d7cfe" strokeWidth={2} fillOpacity={1} fill="url(#sipInvested)" dot={false} />
              <Area type="monotone" dataKey="projected" stroke="#c6ff00" strokeWidth={3} fillOpacity={1} fill="url(#sipProjected)" dot={false} animationDuration={2000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Invested</p>
            <p className="text-sm font-black text-white">₹{(finalValue.invested / 100000).toFixed(1)}L</p>
          </div>
          <div className="p-3 rounded-xl bg-[#c6ff00]/5 border border-[#c6ff00]/10 text-center">
            <p className="text-[9px] font-black text-[#c6ff00] uppercase mb-1">Wealth</p>
            <p className="text-sm font-black text-white">₹{(finalValue.projected / 100000).toFixed(1)}L</p>
          </div>
          <div className="p-3 rounded-xl bg-[#4d7cfe]/5 border border-[#4d7cfe]/10 text-center">
            <p className="text-[9px] font-black text-[#4d7cfe] uppercase mb-1">Returns</p>
            <p className="text-sm font-black text-white">₹{(finalValue.returns / 100000).toFixed(1)}L</p>
          </div>
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <span className="text-[#c6ff00] font-black uppercase mr-1">AI Projection:</span>
            At ₹{sipAmount.toLocaleString('en-IN')}/mo SIP, your wealth could reach <span className="text-white font-bold">₹{(finalValue.projected / 100000).toFixed(1)}L</span> in 10 years. 
            {salary >= 80000 ? ' Consider stepping up SIP by 10% annually for 2x faster growth.' : ' Start small, stay consistent. Every ₹500 matters.'}
          </p>
        </div>
      </div>
    </div>
  );
}
