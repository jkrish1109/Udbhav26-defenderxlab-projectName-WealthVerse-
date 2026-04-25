"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function FinancialHealthScore({ salary = 50000, existingEMI = 0, savingsGoal = 10000, tier = 'medium' }) {
  // Calculate composite score (0-100)
  const emiRatio = salary > 0 ? existingEMI / salary : 0;
  const savingsRatio = salary > 0 ? savingsGoal / salary : 0;

  let debtScore = 100;
  if (emiRatio > 0.5) debtScore = 20;
  else if (emiRatio > 0.3) debtScore = 50;
  else if (emiRatio > 0.1) debtScore = 75;

  let savingsScore = Math.min(100, savingsRatio * 500);
  let diversityScore = tier === 'high' ? 85 : tier === 'medium' ? 60 : 35;
  let disciplineScore = 72; // Simulated

  const overall = Math.round((debtScore * 0.3 + savingsScore * 0.25 + diversityScore * 0.2 + disciplineScore * 0.25));

  const metrics = [
    { label: 'Debt Health', score: debtScore, color: debtScore >= 70 ? '#c6ff00' : debtScore >= 40 ? '#f59e0b' : '#f43f5e' },
    { label: 'Savings Rate', score: Math.round(savingsScore), color: savingsScore >= 70 ? '#c6ff00' : savingsScore >= 40 ? '#f59e0b' : '#f43f5e' },
    { label: 'Investment Diversity', score: diversityScore, color: diversityScore >= 70 ? '#c6ff00' : diversityScore >= 40 ? '#f59e0b' : '#f43f5e' },
    { label: 'Spending Discipline', score: disciplineScore, color: disciplineScore >= 70 ? '#c6ff00' : disciplineScore >= 40 ? '#f59e0b' : '#f43f5e' },
  ];

  const overallColor = overall >= 70 ? '#c6ff00' : overall >= 40 ? '#f59e0b' : '#f43f5e';
  const overallLabel = overall >= 80 ? 'Excellent' : overall >= 60 ? 'Good' : overall >= 40 ? 'Fair' : 'Needs Work';

  return (
    <div className="card-dashboard relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-40 h-40 blur-3xl" style={{ backgroundColor: `${overallColor}08` }} />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-black text-white mb-1">Financial Health Score</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Composite Analysis</p>
          </div>
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${overallColor}15` }}>
            <Heart size={18} style={{ color: overallColor }} />
          </div>
        </div>

        {/* Main score */}
        <div className="flex items-center justify-center my-6">
          <div className="relative">
            <svg viewBox="0 0 120 120" className="w-36 h-36 -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
              <motion.circle
                cx="60" cy="60" r="52" fill="none" stroke={overallColor} strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${overall * 3.27} 327`}
                initial={{ strokeDasharray: '0 327' }}
                animate={{ strokeDasharray: `${overall * 3.27} 327` }}
                transition={{ duration: 2, delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                className="text-4xl font-black" style={{ color: overallColor }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              >
                {overall}
              </motion.span>
              <span className="text-[9px] font-black uppercase text-slate-500 mt-1">{overallLabel}</span>
            </div>
          </div>
        </div>

        {/* Metric bars */}
        <div className="space-y-4">
          {metrics.map((m, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-slate-400">{m.label}</span>
                <span className="text-[10px] font-black text-white">{m.score}/100</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: m.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${m.score}%` }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <span className="font-black uppercase mr-1" style={{ color: overallColor }}>Monthly Report:</span>
            {overall >= 70
              ? 'Your financial health is strong. Keep optimizing and stay disciplined for long-term wealth.'
              : overall >= 40
              ? 'Room for improvement. Focus on reducing debt and increasing savings rate by 5%.'
              : 'Urgent action needed. Cut discretionary expenses and build an emergency buffer immediately.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
