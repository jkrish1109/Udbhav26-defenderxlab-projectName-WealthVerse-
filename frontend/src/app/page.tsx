"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '../components/common/Navbar'
import { TrendingUp, ShieldCheck, Cpu, ArrowRight, Sparkles, Users, BarChart3 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Landing() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#080808] overflow-hidden relative">
      {/* Ambient background */}
      <div className="absolute top-[-30%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#c6ff00]/[0.03] blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[10%] w-[35%] h-[35%] rounded-full bg-[#4d7cfe]/[0.03] blur-[150px]" />
      
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto pt-24 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#c6ff00] text-xs font-bold mb-8 uppercase tracking-[0.15em]">
              <Sparkles size={12} />
              AI-Powered Financial Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              One Smart Financial
              <br />
              <span className="gradient-text">Universe for Everyone</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto font-medium">
              India's first AI ecosystem designed for every lifestyle — from students and rural users to business owners and salaried professionals.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/register">
                <motion.button 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 rounded-xl bg-[#c6ff00] text-black text-sm font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(198,255,0,0.15)] hover:bg-[#d4ff33] transition-colors"
                >
                  Get Started Free <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link href="/login">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-bold hover:bg-white/[0.06] transition-all"
                >
                  Sign In
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex justify-center gap-12 md:gap-20 mb-24 py-6 border-y border-white/[0.04]"
        >
          {[
            { value: '50K+', label: 'Active Users' },
            { value: '₹12Cr+', label: 'Managed' },
            { value: '6', label: 'Universes' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-5 mb-24">
          {[
            { icon: TrendingUp, title: "Salary-Driven AI", desc: "Enter your salary and AI automatically creates budgets, SIP plans, EMI strategies, and tax-saving recommendations.", accent: '#c6ff00' },
            { icon: Cpu, title: "Smart AI Advisor", desc: "Your personal CFO analyzes spending habits and gives actionable, tier-specific financial advice daily.", accent: '#4d7cfe' },
            { icon: ShieldCheck, title: "Bank-Grade Security", desc: "End-to-end encryption, biometric locks, and secure data storage. Your finances stay private.", accent: '#8b5cf6' }
          ].map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.15 + 0.4 }}
              className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all hover:bg-white/[0.03]"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors" style={{ backgroundColor: `${feature.accent}10`, color: feature.accent }}>
                <feature.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Universe showcase */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Built for Every Indian</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">From college students managing pocket money to business owners tracking profit — one platform adapts to all.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { emoji: '🎓', name: 'Student' },
              { emoji: '🌾', name: 'Rural' },
              { emoji: '💳', name: 'Loan' },
              { emoji: '📈', name: 'SIP' },
              { emoji: '👔', name: 'Salaried' },
              { emoji: '💼', name: 'Business' },
            ].map((u, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center hover:border-white/[0.08] transition-all cursor-default">
                <span className="text-3xl block mb-2">{u.emoji}</span>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{u.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="text-center pb-20"
        >
          <div className="p-12 rounded-3xl bg-gradient-to-br from-[#c6ff00]/[0.04] to-[#4d7cfe]/[0.04] border border-white/[0.04]">
            <h2 className="text-3xl font-black text-white mb-3">Ready to Take Control?</h2>
            <p className="text-slate-400 mb-8 text-sm">Join thousands of Indians building smarter financial futures.</p>
            <Link href="/register">
              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 rounded-xl bg-[#c6ff00] text-black font-bold flex items-center gap-2 mx-auto shadow-[0_0_30px_rgba(198,255,0,0.15)] hover:bg-[#d4ff33] transition-colors"
              >
                Start Your Universe <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="py-8 border-t border-white/[0.04] flex justify-between items-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.15em]">© 2026 Student Universe</p>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.15em]">Made in India 🇮🇳</p>
        </footer>
      </main>
    </div>
  )
}
