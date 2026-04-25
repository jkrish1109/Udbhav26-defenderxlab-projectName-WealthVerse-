"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, PiggyBank, Home, Gift, Briefcase, Landmark, CreditCard, Smartphone } from 'lucide-react';

export default function SmartBudget({ salary = 50000, existingEMI = 0, tier = 'medium' }) {
  const netSalary = salary - existingEMI;

  const getBudget = () => {
    if (tier === 'low') return [
      { label: 'Essentials', pct: 55, color: '#f43f5e', icon: Home, desc: 'Rent, Food, Transport' },
      { label: 'Savings', pct: 15, color: '#c6ff00', icon: PiggyBank, desc: 'Emergency Fund' },
      { label: 'EMI / Debt', pct: existingEMI > 0 ? 15 : 0, color: '#f59e0b', icon: CreditCard, desc: 'Loan Payments' },
      { label: 'Personal', pct: existingEMI > 0 ? 10 : 20, color: '#4d7cfe', icon: Smartphone, desc: 'Phone, Clothes' },
      { label: 'Investment', pct: 5, color: '#8b5cf6', icon: Landmark, desc: 'Micro SIP' },
    ];
    if (tier === 'high') return [
      { label: 'Essentials', pct: 30, color: '#f43f5e', icon: Home, desc: 'Rent, Food, Transport' },
      { label: 'Investments', pct: 30, color: '#c6ff00', icon: Landmark, desc: 'SIP, Stocks, MF' },
      { label: 'Savings', pct: 15, color: '#4d7cfe', icon: PiggyBank, desc: 'FD, Gold, Emergency' },
      { label: 'Lifestyle', pct: 15, color: '#8b5cf6', icon: Gift, desc: 'Travel, Dining, Fun' },
      { label: 'EMI', pct: existingEMI > 0 ? 10 : 0, color: '#f59e0b', icon: CreditCard, desc: 'Loan Payments' },
    ];
    return [
      { label: 'Essentials', pct: 40, color: '#f43f5e', icon: Home, desc: 'Rent, Food, Transport' },
      { label: 'Savings', pct: 20, color: '#c6ff00', icon: PiggyBank, desc: 'Emergency + Goals' },
      { label: 'Investment', pct: 15, color: '#4d7cfe', icon: Landmark, desc: 'SIP, Mutual Funds' },
      { label: 'EMI', pct: existingEMI > 0 ? 15 : 5, color: '#f59e0b', icon: CreditCard, desc: 'Loan Payments' },
      { label: 'Personal', pct: existingEMI > 0 ? 10 : 20, color: '#8b5cf6', icon: Smartphone, desc: 'Lifestyle, Fun' },
    ];
  };

  const budget = getBudget().filter(b => b.pct > 0);

  return (
    <div className="card-dashboard">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg font-black text-white mb-1">Smart Budget Allocation</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Auto-Generated • ₹{netSalary.toLocaleString('en-IN')} available</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
          <Wallet size={18} />
        </div>
      </div>

      {/* Visual bar */}
      <div className="h-5 w-full rounded-full overflow-hidden flex mb-8 bg-white/5">
        {budget.map((b, i) => (
          <motion.div
            key={i}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ backgroundColor: b.color }}
            initial={{ width: 0 }}
            animate={{ width: `${b.pct}%` }}
            transition={{ duration: 1, delay: i * 0.15 }}
          />
        ))}
      </div>

      {/* Budget items */}
      <div className="space-y-3">
        {budget.map((b, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${b.color}15` }}>
                <b.icon size={16} style={{ color: b.color }} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{b.label}</p>
                <p className="text-[9px] text-slate-500">{b.desc}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-white">₹{Math.round(netSalary * b.pct / 100).toLocaleString('en-IN')}</p>
              <p className="text-[9px] font-bold" style={{ color: b.color }}>{b.pct}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
