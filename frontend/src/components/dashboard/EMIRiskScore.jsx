"use client"
import React from 'react';
import { AlertTriangle, ShieldCheck, TrendingDown } from 'lucide-react';

export default function EMIRiskScore({ salary = 50000, existingEMI = 0 }) {
  const emiRatio = salary > 0 ? (existingEMI / salary) * 100 : 0;
  
  let riskLevel, riskColor, riskIcon, riskAdvice;
  if (emiRatio === 0) {
    riskLevel = 'No Debt';
    riskColor = '#c6ff00';
    riskIcon = ShieldCheck;
    riskAdvice = 'Zero EMI — perfect time for investments.';
  } else if (emiRatio <= 30) {
    riskLevel = 'Healthy';
    riskColor = '#c6ff00';
    riskIcon = ShieldCheck;
    riskAdvice = `EMI at ${emiRatio.toFixed(0)}% of income — safe range.`;
  } else if (emiRatio <= 50) {
    riskLevel = 'Moderate';
    riskColor = '#f59e0b';
    riskIcon = AlertTriangle;
    riskAdvice = `EMI at ${emiRatio.toFixed(0)}% — avoid new loans.`;
  } else {
    riskLevel = 'Critical';
    riskColor = '#f43f5e';
    riskIcon = TrendingDown;
    riskAdvice = `EMI at ${emiRatio.toFixed(0)}% — consolidate debt now.`;
  }

  const Icon = riskIcon;

  return (
    <div className="card-dashboard flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">EMI Risk</h4>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[9px] font-bold uppercase" style={{ backgroundColor: `${riskColor}15`, color: riskColor }}>
            <Icon size={10} /> {riskLevel}
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <p className="text-3xl font-black text-white">{emiRatio.toFixed(0)}%</p>
          <p className="text-slate-500 text-[10px] font-bold">of income</p>
        </div>
        <div className="mt-3 h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(emiRatio, 100)}%`, backgroundColor: riskColor }} />
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl border" style={{ backgroundColor: `${riskColor}08`, borderColor: `${riskColor}15` }}>
        <p className="text-white text-[10px] leading-relaxed">
          <span className="font-black uppercase mr-1" style={{ color: riskColor }}>AI:</span>
          {riskAdvice}
        </p>
      </div>
    </div>
  );
}
