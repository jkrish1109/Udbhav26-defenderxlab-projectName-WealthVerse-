"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, TrendingUp, Shield, Zap, AlertTriangle, Target, PiggyBank } from 'lucide-react';

export default function AIAdvisor({ salary = 50000, tier = 'medium', existingEMI = 0, riskLevel = 'moderate' }) {
  const getAdvice = () => {
    if (tier === 'low') return [
      { icon: Shield, color: '#f59e0b', text: 'Focus on building a 3-month emergency fund before investing.', tag: 'Priority' },
      { icon: PiggyBank, color: '#c6ff00', text: `Save at least ₹${Math.round(salary * 0.1).toLocaleString('en-IN')}/mo via auto-debit. Small amounts compound.`, tag: 'Savings' },
      { icon: Lightbulb, color: '#4d7cfe', text: 'Consider a ₹500/mo SIP in a low-risk index fund to start wealth building.', tag: 'Investment' },
      { icon: Zap, color: '#8b5cf6', text: 'Upskill via free courses (Coursera, NPTEL). Income growth is the best strategy.', tag: 'Income' },
      { icon: AlertTriangle, color: '#f43f5e', text: 'Avoid any new EMI or credit card debt at current income level.', tag: 'Warning' },
    ];
    if (tier === 'high') return [
      { icon: TrendingUp, color: '#c6ff00', text: `Diversify: 40% equity, 30% debt, 20% real estate, 10% gold/crypto.`, tag: 'Portfolio' },
      { icon: Target, color: '#4d7cfe', text: `Start ₹${Math.round(salary * 0.25).toLocaleString('en-IN')}/mo SIP with 10% annual step-up for ₹2Cr+ wealth.`, tag: 'Wealth' },
      { icon: Shield, color: '#f59e0b', text: 'Max out 80C deductions: ELSS + PPF + Insurance for ₹1.5L tax savings.', tag: 'Tax' },
      { icon: Zap, color: '#8b5cf6', text: 'Consider term insurance (1Cr cover) and health insurance (25L family floater).', tag: 'Protection' },
      { icon: PiggyBank, color: '#c6ff00', text: 'Your runway allows retirement planning. Start NPS for extra ₹50k tax benefit.', tag: 'Retirement' },
    ];
    // Medium tier
    return [
      { icon: PiggyBank, color: '#c6ff00', text: `Target ₹${Math.round(salary * 0.2).toLocaleString('en-IN')}/mo savings. You're at the sweet spot for disciplined growth.`, tag: 'Savings' },
      { icon: TrendingUp, color: '#4d7cfe', text: `Start SIP of ₹${Math.round(salary * 0.15).toLocaleString('en-IN')}/mo in a flexi-cap mutual fund for balanced returns.`, tag: 'SIP' },
      { icon: Shield, color: '#f59e0b', text: existingEMI > 0 ? `Clear high-interest EMIs first. Save ₹${Math.round(existingEMI * 0.15).toLocaleString('en-IN')}/mo in interest.` : 'No EMI detected. Great! Maintain this discipline.', tag: 'Debt' },
      { icon: Lightbulb, color: '#8b5cf6', text: 'Reduce discretionary spending by 15%. Redirect to SIP for ₹30L+ in 10 years.', tag: 'Optimize' },
      { icon: Target, color: '#c6ff00', text: 'Build 6-month emergency fund (₹' + (salary * 6).toLocaleString('en-IN') + ') before aggressive investing.', tag: 'Safety' },
    ];
  };

  const advice = getAdvice();

  return (
    <div className="card-dashboard relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#8b5cf6]/5 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c6ff00]/20 to-[#4d7cfe]/20 flex items-center justify-center">
            <Brain size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">AI Financial Advisor</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {tier === 'high' ? 'Wealth Growth Mode' : tier === 'low' ? 'Survival Optimization' : 'Balanced Strategy'} • Personalized
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {advice.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group cursor-default"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${item.color}15` }}>
                <item.icon size={14} style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    {item.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#c6ff00]/5 to-[#4d7cfe]/5 border border-white/5 text-center">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            <Zap size={10} className="inline mr-1 text-[#c6ff00]" />
            AI refreshes advice daily based on your spending patterns
          </p>
        </div>
      </div>
    </div>
  );
}
