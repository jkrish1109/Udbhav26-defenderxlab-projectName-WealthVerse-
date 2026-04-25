"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, MapPin, Shield, Target, Users, Zap, ArrowRight, X } from 'lucide-react';

export default function SalarySetup({ onComplete, onClose }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    salary: '',
    city: 'metro',
    existingEMI: '',
    savingsGoal: '',
    riskLevel: 'moderate',
    dependents: '0'
  });

  const handleSubmit = () => {
    const sal = parseInt(profile.salary) || 0;
    let tier = 'low';
    if (sal >= 100000) tier = 'high';
    else if (sal >= 40000) tier = 'medium';
    onComplete({ ...profile, salary: sal, tier });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        className="w-full max-w-lg bg-[#141414] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#c6ff00]/5 rounded-full blur-[100px]" />

        {onClose && (
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10">
            <X size={20} />
          </button>
        )}

        <div className="relative z-10">
          {/* Progress */}
          <div className="flex gap-2 mb-10">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-[#c6ff00]' : 'bg-white/5'}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="w-14 h-14 rounded-2xl bg-[#c6ff00]/10 flex items-center justify-center text-[#c6ff00] mb-6">
                  <IndianRupee size={28} />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">What's your monthly income?</h2>
                <p className="text-slate-500 text-sm mb-8">AI will auto-customize your entire financial strategy.</p>
                
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Monthly Salary (₹)</label>
                    <input
                      type="number"
                      value={profile.salary}
                      onChange={e => setProfile({...profile, salary: e.target.value})}
                      placeholder="e.g. 50000"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-5 py-4 text-white text-lg font-bold focus:outline-none focus:border-[#c6ff00]/50 focus:ring-2 focus:ring-[#c6ff00]/20 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">City / Lifestyle</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'metro', label: 'Metro', icon: '🏙️' },
                        { id: 'tier2', label: 'Tier 2', icon: '🏘️' },
                        { id: 'rural', label: 'Rural', icon: '🌾' }
                      ].map(c => (
                        <button 
                          key={c.id}
                          onClick={() => setProfile({...profile, city: c.id})}
                          className={`p-4 rounded-2xl border text-center transition-all ${profile.city === c.id ? 'bg-[#c6ff00]/10 border-[#c6ff00]/50 text-white' : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10'}`}
                        >
                          <span className="text-2xl block mb-1">{c.icon}</span>
                          <span className="text-[10px] font-black uppercase">{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => profile.salary && setStep(2)}
                  disabled={!profile.salary}
                  className="w-full mt-8 bg-[#c6ff00] text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#d4ff33] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(198,255,0,0.2)]"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="w-14 h-14 rounded-2xl bg-[#4d7cfe]/10 flex items-center justify-center text-[#4d7cfe] mb-6">
                  <Shield size={28} />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Financial Commitments</h2>
                <p className="text-slate-500 text-sm mb-8">Help AI understand your existing obligations.</p>

                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Existing EMI / Month (₹)</label>
                    <input
                      type="number"
                      value={profile.existingEMI}
                      onChange={e => setProfile({...profile, existingEMI: e.target.value})}
                      placeholder="0"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-[#4d7cfe]/50 focus:ring-2 focus:ring-[#4d7cfe]/20 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Family Dependents</label>
                    <div className="grid grid-cols-4 gap-3">
                      {['0', '1', '2', '3+'].map(d => (
                        <button 
                          key={d}
                          onClick={() => setProfile({...profile, dependents: d})}
                          className={`p-3 rounded-xl border text-center text-sm font-bold transition-all ${profile.dependents === d ? 'bg-[#4d7cfe]/10 border-[#4d7cfe]/50 text-white' : 'bg-white/[0.02] border-white/5 text-slate-500'}`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(1)} className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all">Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-[#4d7cfe] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#5d8cff] transition-all shadow-[0_0_30px_rgba(77,124,254,0.2)]">
                    Continue <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="w-14 h-14 rounded-2xl bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] mb-6">
                  <Target size={28} />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Goals & Risk Appetite</h2>
                <p className="text-slate-500 text-sm mb-8">AI will build your personalized financial roadmap.</p>

                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Monthly Savings Goal (₹)</label>
                    <input
                      type="number"
                      value={profile.savingsGoal}
                      onChange={e => setProfile({...profile, savingsGoal: e.target.value})}
                      placeholder="e.g. 10000"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:outline-none focus:border-[#8b5cf6]/50 focus:ring-2 focus:ring-[#8b5cf6]/20 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Investment Risk Level</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'conservative', label: 'Safe', emoji: '🛡️' },
                        { id: 'moderate', label: 'Balanced', emoji: '⚖️' },
                        { id: 'aggressive', label: 'Growth', emoji: '🚀' }
                      ].map(r => (
                        <button
                          key={r.id}
                          onClick={() => setProfile({...profile, riskLevel: r.id})}
                          className={`p-4 rounded-2xl border text-center transition-all ${profile.riskLevel === r.id ? 'bg-[#8b5cf6]/10 border-[#8b5cf6]/50 text-white' : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10'}`}
                        >
                          <span className="text-2xl block mb-1">{r.emoji}</span>
                          <span className="text-[10px] font-black uppercase">{r.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(2)} className="flex-1 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all">Back</button>
                  <button 
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-[#c6ff00] to-[#4d7cfe] text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_0_40px_rgba(198,255,0,0.15)]"
                  >
                    <Zap size={18} /> Launch AI Dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
