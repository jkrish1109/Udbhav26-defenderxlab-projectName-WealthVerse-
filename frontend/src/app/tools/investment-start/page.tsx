"use client"

import { useState } from 'react'
import Sidebar from '../../../components/common/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart as LineChartIcon, ArrowLeft, Shield, TrendingUp, Banknote, Gem, Building, Coins, ChevronRight, Check, Zap } from 'lucide-react'
import Link from 'next/link'

const riskQuiz = [
  { question: 'How would you react if your investment drops 20% in one month?', options: [
    { text: 'Sell everything immediately', score: 1 },
    { text: 'Feel worried but hold', score: 2 },
    { text: 'Buy more at lower price', score: 3 },
  ]},
  { question: 'What is your investment time horizon?', options: [
    { text: 'Less than 1 year', score: 1 },
    { text: '1-5 years', score: 2 },
    { text: 'More than 5 years', score: 3 },
  ]},
  { question: 'What percentage of income can you invest monthly?', options: [
    { text: 'Less than 10%', score: 1 },
    { text: '10-25%', score: 2 },
    { text: 'More than 25%', score: 3 },
  ]},
  { question: 'Do you have an emergency fund (3-6 months expenses)?', options: [
    { text: 'No', score: 1 },
    { text: 'Partially built', score: 2 },
    { text: 'Yes, fully built', score: 3 },
  ]},
]

const assetClasses = [
  { name: 'Index Funds (Nifty 50)', icon: TrendingUp, color: '#c6ff00', risk: 'Medium', returns: '12-15% p.a.', minSIP: '₹500/mo', desc: 'Diversified equity exposure. Best for long-term wealth. Start with Nifty 50 or Nifty Next 50 index fund.', profiles: ['moderate', 'aggressive'] },
  { name: 'Fixed Deposits', icon: Shield, color: '#4d7cfe', risk: 'Low', returns: '6-7.5% p.a.', minSIP: '₹1,000 lump', desc: 'Guaranteed returns. DICGC insured up to ₹5L. Good for emergency fund parking.', profiles: ['conservative', 'moderate'] },
  { name: 'Gold (SGBs/ETFs)', icon: Coins, color: '#f59e0b', risk: 'Low-Med', returns: '8-10% p.a.', minSIP: '₹500/mo', desc: 'Inflation hedge. Sovereign Gold Bonds offer 2.5% extra interest. Zero risk of theft.', profiles: ['conservative', 'moderate'] },
  { name: 'PPF (Public Provident Fund)', icon: Building, color: '#8b5cf6', risk: 'Zero', returns: '7.1% p.a.', minSIP: '₹500/mo', desc: 'Government backed. 80C tax benefit up to ₹1.5L. 15 year lock-in with partial withdrawal after 7 years.', profiles: ['conservative', 'moderate'] },
  { name: 'Large Cap Mutual Funds', icon: Banknote, color: '#06b6d4', risk: 'Medium', returns: '10-14% p.a.', minSIP: '₹500/mo', desc: 'Top 100 companies by market cap. Less volatile than small/mid cap. Active fund management.', profiles: ['moderate', 'aggressive'] },
  { name: 'Small/Mid Cap Funds', icon: Gem, color: '#f43f5e', risk: 'High', returns: '15-20% p.a.', minSIP: '₹500/mo', desc: 'High growth potential. Very volatile short-term. Only for 7+ year horizon.', profiles: ['aggressive'] },
]

export default function InvestmentStart() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [profile, setProfile] = useState<string | null>(null)

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)
    if (currentQ < riskQuiz.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      const total = newAnswers.reduce((a, b) => a + b, 0)
      if (total <= 5) setProfile('conservative')
      else if (total <= 9) setProfile('moderate')
      else setProfile('aggressive')
    }
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQ(0)
    setAnswers([])
    setProfile(null)
  }

  const filteredAssets = profile
    ? assetClasses.filter(a => a.profiles.includes(profile))
    : assetClasses

  const profileColors: Record<string, string> = {
    conservative: '#4d7cfe',
    moderate: '#c6ff00',
    aggressive: '#f43f5e',
  }

  const profileDescriptions: Record<string, string> = {
    conservative: 'Capital preservation is your priority. You prefer low-risk, guaranteed returns over high-growth assets.',
    moderate: 'You seek a balance between growth and safety. Diversified portfolios with mix of equity and debt suit you best.',
    aggressive: 'You chase maximum growth and can handle volatility. High equity allocation and long holding periods work for you.',
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#080808] flex overflow-hidden font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
          <div className="max-w-[1100px] mx-auto space-y-6">

            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-[#c6ff00] hover:border-[#c6ff00]/20 transition-all">
                <ArrowLeft size={18} />
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Investment Start</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Your beginner's guide to smart investing in India</p>
              </div>
            </div>

            {/* Risk Profiling Section */}
            <div className="card-dashboard relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#c6ff00]/5 blur-3xl" />
              <div className="relative z-10">
                {!quizStarted && !profile ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#c6ff00]/20 to-[#4d7cfe]/20 flex items-center justify-center mx-auto mb-4">
                      <Zap size={28} className="text-[#c6ff00]" />
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">Discover Your Investor Profile</h3>
                    <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">Take a 30-second quiz to find which investments match your risk appetite and goals.</p>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setQuizStarted(true)}
                      className="px-8 py-3 rounded-xl bg-[#c6ff00] text-black font-bold text-sm hover:bg-[#d4ff33] transition-all shadow-[0_0_24px_rgba(198,255,0,0.2)]">
                      Start Quiz <ChevronRight size={16} className="inline ml-1" />
                    </motion.button>
                  </div>
                ) : profile ? (
                  <div className="text-center py-6">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${profileColors[profile]}15` }}>
                      <span className="text-4xl">{profile === 'conservative' ? '🛡️' : profile === 'moderate' ? '⚖️' : '🚀'}</span>
                    </motion.div>
                    <h3 className="text-2xl font-black text-white mb-1 capitalize">{profile} Investor</h3>
                    <p className="text-sm text-slate-400 max-w-lg mx-auto mb-4">{profileDescriptions[profile]}</p>
                    <button onClick={resetQuiz} className="text-[10px] font-bold text-slate-500 hover:text-[#c6ff00] uppercase tracking-widest transition-colors">
                      Retake Quiz
                    </button>
                  </div>
                ) : (
                  <div className="py-4">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Question {currentQ + 1}/{riskQuiz.length}</span>
                      <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${((currentQ + 1) / riskQuiz.length) * 100}%` }} className="h-full bg-[#c6ff00] rounded-full" />
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h3 className="text-lg font-black text-white mb-5">{riskQuiz[currentQ].question}</h3>
                        <div className="space-y-3">
                          {riskQuiz[currentQ].options.map((opt, i) => (
                            <motion.button key={i} whileHover={{ x: 4 }} onClick={() => handleAnswer(opt.score)}
                              className="w-full text-left p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-[#c6ff00]/20 transition-all flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center text-slate-500 text-xs font-black">{String.fromCharCode(65 + i)}</div>
                              <span className="text-sm text-slate-300 font-medium">{opt.text}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Asset Classes */}
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">
                {profile ? `Recommended for ${profile} profile` : 'All Asset Classes'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAssets.map((asset, i) => (
                  <motion.div key={asset.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="card-dashboard hover:border-white/[0.08] group cursor-default">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${asset.color}15` }}>
                        <asset.icon size={20} style={{ color: asset.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-white truncate">{asset.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-md" style={{ backgroundColor: `${asset.color}15`, color: asset.color }}>{asset.risk}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{asset.desc}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                        <p className="text-[8px] font-bold text-slate-500 uppercase">Returns</p>
                        <p className="text-xs font-black text-white">{asset.returns}</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                        <p className="text-[8px] font-bold text-slate-500 uppercase">Min SIP</p>
                        <p className="text-xs font-black" style={{ color: asset.color }}>{asset.minSIP}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Getting Started Steps */}
            <div className="card-dashboard">
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-6">How to Start Investing</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { step: '01', title: 'Build Emergency Fund', desc: 'Save 3-6 months of expenses in FD or savings account before investing.' },
                  { step: '02', title: 'Open Demat Account', desc: 'Use Zerodha, Groww, or Kite. KYC takes 15 minutes with Aadhaar.' },
                  { step: '03', title: 'Start a SIP', desc: 'Begin with ₹500/mo in Nifty 50 Index Fund. Set auto-debit on salary day.' },
                  { step: '04', title: 'Stay Disciplined', desc: "Don't check daily. Review quarterly. Increase SIP by 10% every year." },
                ].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] relative">
                    <span className="text-4xl font-black text-white/[0.04] absolute top-3 right-4">{s.step}</span>
                    <h4 className="text-sm font-black text-white mb-2">{s.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
