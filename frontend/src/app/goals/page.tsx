"use client"

import { useState } from 'react'
import Sidebar from '../../components/common/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { motion } from 'framer-motion'
import { Target, ArrowLeft, Trophy, Flame, Zap, PiggyBank, ShoppingBag, Calendar, Check, Star } from 'lucide-react'
import Link from 'next/link'

interface Challenge {
  id: string
  title: string
  description: string
  target: number
  current: number
  unit: string
  duration: string
  icon: typeof Target
  color: string
  badge: string
  active: boolean
}

export default function Goals() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: '1', title: '₹50K Emergency Fund', description: 'Build a safety net for unexpected expenses. Save consistently to reach your target.', target: 50000, current: 22500, unit: '₹', duration: '6 months', icon: PiggyBank, color: '#c6ff00', badge: '🛡️ Shield Builder', active: true },
    { id: '2', title: 'No-Spend Weekend', description: 'Skip all non-essential spending every weekend for a month. Track your saves.', target: 4, current: 2, unit: 'weekends', duration: '1 month', icon: ShoppingBag, color: '#f43f5e', badge: '🔥 Willpower Warrior', active: true },
    { id: '3', title: '₹1 Lakh SIP Portfolio', description: 'Build a mutual fund portfolio worth ₹1 Lakh through consistent monthly SIPs.', target: 100000, current: 35000, unit: '₹', duration: '12 months', icon: Target, color: '#4d7cfe', badge: '📈 Growth Champion', active: true },
    { id: '4', title: '30-Day Expense Tracker', description: 'Log every single expense for 30 days straight. No skipping!', target: 30, current: 18, unit: 'days', duration: '30 days', icon: Calendar, color: '#8b5cf6', badge: '📝 Discipline Master', active: true },
    { id: '5', title: '₹500/Day Savings Streak', description: 'Save at least ₹500 every single day. Small amounts compound into wealth.', target: 90, current: 45, unit: 'days', duration: '3 months', icon: Flame, color: '#f59e0b', badge: '⭐ Streak King', active: true },
    { id: '6', title: 'Credit Card Debt Zero', description: 'Pay off all outstanding credit card debt. Freedom from high-interest charges.', target: 25000, current: 25000, unit: '₹', duration: 'Completed', icon: Check, color: '#10b981', badge: '✅ Debt Free', active: false },
  ])

  const badges = challenges.filter(c => !c.active || c.current >= c.target).map(c => c.badge)

  const updateProgress = (id: string, increment: number) => {
    setChallenges(prev => prev.map(c => {
      if (c.id !== id) return c
      const newCurrent = Math.min(c.current + increment, c.target)
      return { ...c, current: newCurrent, active: newCurrent < c.target }
    }))
  }

  const formatValue = (val: number, unit: string) => {
    if (unit === '₹') return '₹' + val.toLocaleString('en-IN')
    return val + ' ' + unit
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
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Savings Challenges</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Gamified goals — Earn badges, build habits</p>
              </div>
            </div>

            {/* Badge Showcase */}
            {badges.length > 0 && (
              <div className="card-dashboard">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy size={16} className="text-amber-400" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">Your Badges</h3>
                  <span className="text-[9px] px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 font-black">{badges.length} EARNED</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {badges.map((badge, i) => (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1, type: 'spring' }}
                      className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400/5 to-[#c6ff00]/5 border border-amber-400/10 text-sm font-bold text-white">
                      {badge}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card-dashboard text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#c6ff00]/10 flex items-center justify-center mx-auto mb-2">
                  <Flame size={22} className="text-[#c6ff00]" />
                </div>
                <p className="text-2xl font-black text-white">{challenges.filter(c => c.active).length}</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active</p>
              </div>
              <div className="card-dashboard text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-2">
                  <Check size={22} className="text-emerald-400" />
                </div>
                <p className="text-2xl font-black text-white">{challenges.filter(c => !c.active || c.current >= c.target).length}</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Completed</p>
              </div>
              <div className="card-dashboard text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center mx-auto mb-2">
                  <Star size={22} className="text-amber-400" />
                </div>
                <p className="text-2xl font-black text-white">{badges.length}</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Badges</p>
              </div>
            </div>

            {/* Active Challenges */}
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">Active Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.filter(c => c.active && c.current < c.target).map((challenge, i) => {
                  const progress = (challenge.current / challenge.target) * 100
                  return (
                    <motion.div key={challenge.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="card-dashboard relative overflow-hidden group">
                      {/* Progress glow */}
                      <div className="absolute bottom-0 left-0 h-1 transition-all" style={{ width: `${progress}%`, backgroundColor: challenge.color, boxShadow: `0 0 16px ${challenge.color}40` }} />

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${challenge.color}15` }}>
                          <challenge.icon size={22} style={{ color: challenge.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-black text-white">{challenge.title}</h4>
                            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-md" style={{ backgroundColor: `${challenge.color}15`, color: challenge.color }}>{challenge.duration}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{challenge.description}</p>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between mb-1">
                              <span className="text-[10px] font-bold text-slate-500">{formatValue(challenge.current, challenge.unit)}</span>
                              <span className="text-[10px] font-bold" style={{ color: challenge.color }}>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full rounded-full" style={{ backgroundColor: challenge.color }} />
                            </div>
                            <p className="text-[10px] text-slate-600 mt-1 text-right">Target: {formatValue(challenge.target, challenge.unit)}</p>
                          </div>

                          {/* Increment Button */}
                          <motion.button whileTap={{ scale: 0.95 }}
                            onClick={() => updateProgress(challenge.id, challenge.unit === '₹' ? Math.round(challenge.target * 0.05) : 1)}
                            className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border"
                            style={{ backgroundColor: `${challenge.color}10`, borderColor: `${challenge.color}20`, color: challenge.color }}>
                            <Zap size={10} className="inline mr-1" />
                            Log Progress
                          </motion.button>
                        </div>
                      </div>

                      {/* Badge Preview */}
                      <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {challenge.badge}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Completed */}
            {challenges.some(c => !c.active || c.current >= c.target) && (
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" /> Completed
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {challenges.filter(c => !c.active || c.current >= c.target).map((challenge, i) => (
                    <motion.div key={challenge.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="card-dashboard opacity-60 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400" />
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-400/10 flex items-center justify-center">
                          <Check size={20} className="text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{challenge.title}</h4>
                          <p className="text-[10px] text-emerald-400 font-bold">{challenge.badge}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
