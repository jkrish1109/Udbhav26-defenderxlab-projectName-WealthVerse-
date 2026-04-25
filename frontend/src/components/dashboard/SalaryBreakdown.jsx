"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingDown, Percent, Wallet } from 'lucide-react';

export default function SalaryBreakdown({ salary = 50000, city = 'metro' }) {
  // Indian tax regime calculation (simplified new regime FY 26-27)
  const annual = salary * 12;
  let tax = 0;
  if (annual > 1500000) tax = Math.round((annual - 1500000) * 0.3 + 150000);
  else if (annual > 1200000) tax = Math.round((annual - 1200000) * 0.2 + 90000);
  else if (annual > 900000) tax = Math.round((annual - 900000) * 0.15 + 45000);
  else if (annual > 600000) tax = Math.round((annual - 600000) * 0.1 + 15000);
  else if (annual > 300000) tax = Math.round((annual - 300000) * 0.05);
  const monthlyTax = Math.round(tax / 12);

  const pf = Math.round(salary * 0.12);
  const professional = city === 'metro' ? 200 : 150;
  const deductions = monthlyTax + pf + professional;
  const netSalary = salary - deductions;

  const items = [
    { label: 'Gross Salary', value: salary, color: '#fff', icon: IndianRupee },
    { label: 'Income Tax', value: monthlyTax, color: '#f43f5e', icon: TrendingDown },
    { label: 'PF (12%)', value: pf, color: '#f59e0b', icon: Percent },
    { label: 'Professional Tax', value: professional, color: '#6b7280', icon: Percent },
  ];

  const netPercent = Math.round((netSalary / salary) * 100);

  return (
    <div className="card-dashboard relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#4d7cfe]/5 blur-3xl group-hover:bg-[#4d7cfe]/10 transition-all duration-700" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xl font-black text-white mb-1">Salary Intelligence</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Auto-analyzed by AI</p>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#c6ff00]/10 text-[#c6ff00] text-[10px] font-black uppercase tracking-widest">
            {netPercent}% Take-Home
          </div>
        </div>

        {/* Visual breakdown bar */}
        <div className="h-4 w-full rounded-full overflow-hidden flex mb-8 bg-white/5">
          <motion.div initial={{ width: 0 }} animate={{ width: `${netPercent}%` }} transition={{ duration: 1.2, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-[#c6ff00] to-[#4d7cfe]" />
          <motion.div initial={{ width: 0 }} animate={{ width: `${((monthlyTax / salary) * 100)}%` }} transition={{ duration: 1.2, delay: 0.4 }}
            className="h-full bg-[#f43f5e]/60" />
          <motion.div initial={{ width: 0 }} animate={{ width: `${((pf / salary) * 100)}%` }} transition={{ duration: 1.2, delay: 0.6 }}
            className="h-full bg-[#f59e0b]/60" />
        </div>

        {/* Line items */}
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}10` }}>
                  <item.icon size={14} style={{ color: item.color }} />
                </div>
                <span className="text-sm text-slate-400 font-medium">{item.label}</span>
              </div>
              <span className="text-sm font-black text-white">
                {i === 0 ? '' : '−'} ₹{item.value.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        {/* Net salary */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Net In-Hand Salary</p>
              <p className="text-4xl font-black text-white">₹{netSalary.toLocaleString('en-IN')}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#c6ff00]/10 flex items-center justify-center text-[#c6ff00]">
              <Wallet size={22} />
            </div>
          </div>
        </div>

        {/* AI insight */}
        <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <span className="text-[#4d7cfe] font-black uppercase mr-1">AI Tax Advisor:</span>
            {monthlyTax > 5000 
              ? `You're losing ₹${monthlyTax.toLocaleString('en-IN')}/mo to tax. Consider ELSS mutual funds to save up to ₹46,800/year under old regime.`
              : `Your tax liability is low. Focus on maximizing PF contributions and emergency savings.`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
