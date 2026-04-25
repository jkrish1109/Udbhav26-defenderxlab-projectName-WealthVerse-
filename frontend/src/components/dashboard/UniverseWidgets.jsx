import React from 'react';
import { 
  GraduationCap, 
  Sprout, 
  Lock, 
  Activity, 
  Briefcase, 
  Building2,
  TrendingUp,
  Wallet,
  Zap,
  Clock,
  Target,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function UniverseWidgets({ universe }) {
  const renderStudent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Pocket Money Planner</h4>
        <p className="text-3xl font-black text-white">₹5,000</p>
        <p className="text-[#c6ff00] text-[10px] font-bold mt-1">₹1,200 remaining this month</p>
        <div className="mt-4 h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-[#c6ff00]" style={{ width: '24%' }} />
        </div>
      </div>
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Skill Investment</h4>
        <p className="text-3xl font-black text-white">2.5h</p>
        <p className="text-[#4d7cfe] text-[10px] font-bold mt-1">Daily learning goal: 3h</p>
      </div>
    </div>
  );

  const renderRural = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Family Micro-Savings</h4>
        <p className="text-3xl font-black text-white">₹12,400</p>
        <p className="text-amber-400 text-[10px] font-bold mt-1">Gold/Chit Fund Contribution</p>
      </div>
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Irregular Income Helper</h4>
        <p className="text-white text-xs leading-relaxed">
          <span className="text-amber-400 font-bold uppercase">AI Advice:</span> Your next major income is expected in 45 days. Keep ₹3,000 aside for emergency.
        </p>
      </div>
    </div>
  );

  const renderLoan = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Next EMI Due</h4>
        <p className="text-3xl font-black text-white">₹18,500</p>
        <p className="text-rose-500 text-[10px] font-bold mt-1">Due in 4 days (Home Loan)</p>
      </div>
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Credit Health</h4>
        <p className="text-3xl font-black text-white">785</p>
        <p className="text-[#c6ff00] text-[10px] font-bold mt-1">Excellent Range</p>
      </div>
    </div>
  );

  const renderSalaried = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Net Take-Home Salary</h4>
        <p className="text-3xl font-black text-white">₹1,24,500</p>
        <p className="text-[#4d7cfe] text-[10px] font-bold mt-1">After ₹12k Tax & Deductions</p>
      </div>
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Tax Estimator (FY 26-27)</h4>
        <p className="text-3xl font-black text-white">₹1.8L</p>
        <p className="text-[#c6ff00] text-[10px] font-bold mt-1">Current projected annual tax</p>
      </div>
    </div>
  );

  const renderBusiness = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Business Cash Flow</h4>
        <p className="text-3xl font-black text-white">+₹2.4L</p>
        <p className="text-[#c6ff00] text-[10px] font-bold mt-1">Net profit this month</p>
      </div>
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Profit Intelligence</h4>
        <p className="text-white text-xs leading-relaxed">
          <span className="text-purple-400 font-bold uppercase">AI Insight:</span> Your inventory turnover is 12% faster than last month. Scaling potential: High.
        </p>
      </div>
    </div>
  );

  const renderSIP = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Portfolio Valuation</h4>
        <p className="text-3xl font-black text-white">₹8.74L</p>
        <p className="text-[#c6ff00] text-[10px] font-bold mt-1">+24% overall returns</p>
      </div>
      <div className="card-dashboard">
        <h4 className="text-slate-500 text-[10px] uppercase font-black mb-4">Future Projection</h4>
        <p className="text-3xl font-black text-white">₹1.2Cr</p>
        <p className="text-[#4d7cfe] text-[10px] font-bold mt-1">Est. wealth in 10 years at 15%</p>
      </div>
    </div>
  );

  switch (universe) {
    case 'student': return renderStudent();
    case 'rural': return renderRural();
    case 'loan': return renderLoan();
    case 'sip': return renderSIP();
    case 'salaried': return renderSalaried();
    case 'business': return renderBusiness();
    default: return renderStudent();
  }
}
