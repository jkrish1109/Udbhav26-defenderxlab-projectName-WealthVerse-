import React from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Wallet, 
  Plus, 
  Target, 
  FileText, 
  ArrowLeftRight, 
  LineChart 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function QuickActions() {
  const router = useRouter();
  const actions = [
    { name: 'EMI Calculator', icon: Calculator, color: 'bg-emerald-500/10 text-emerald-400', route: '/tools/emi-calculator' },
    { name: 'SIP Planner', icon: TrendingUp, color: 'bg-[#c6ff00]/10 text-[#c6ff00]', route: '/tools/sip-planner' },
    { name: 'Budget Maker', icon: Wallet, color: 'bg-[#4d7cfe]/10 text-[#4d7cfe]', route: '/tools/budget-maker' },
    { name: 'Add Expense', icon: Plus, color: 'bg-rose-500/10 text-rose-400', route: '/transactions' },
    { name: 'Savings Challenge', icon: Target, color: 'bg-amber-500/10 text-amber-400', route: '/goals' },
    { name: 'Tax Planner', icon: FileText, color: 'bg-[#8b5cf6]/10 text-[#8b5cf6]', route: '/tools/tax-planner' },
    { name: 'Loan Compare', icon: ArrowLeftRight, color: 'bg-sky-500/10 text-sky-400', route: '/tools/loan-compare' },
    { name: 'Investment Start', icon: LineChart, color: 'bg-pink-500/10 text-pink-400', route: '/tools/investment-start' },
  ];

  return (
    <div className="card-dashboard">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-white">Quick Actions</h3>
        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Futuristic Lab</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <motion.button
            key={i}
            onClick={() => router.push(action.route)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center gap-3 p-4 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group w-full"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${action.color}`}>
              <action.icon size={20} />
            </div>
            <span className="text-[10px] font-black text-slate-400 text-center uppercase tracking-tighter leading-tight group-hover:text-white transition-colors">
              {action.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
