"use client"

import { useState, useMemo, useEffect } from 'react'
import Sidebar from '../../../components/common/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { motion } from 'framer-motion'
import { Wallet, ArrowLeft, IndianRupee, Home, ShoppingBag, PiggyBank, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function BudgetMaker() {
  const [income, setIncome] = useState(50000)
  const [fixedEMI, setFixedEMI] = useState(0)
  const [needsPercent, setNeedsPercent] = useState(50)
  const [wantsPercent, setWantsPercent] = useState(30)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const savingsPercent = Math.max(0, 100 - needsPercent - wantsPercent)
  const disposable = income - fixedEMI

  const budget = useMemo(() => ({
    needs: Math.round(disposable * needsPercent / 100),
    wants: Math.round(disposable * wantsPercent / 100),
    savings: Math.round(disposable * savingsPercent / 100),
  }), [disposable, needsPercent, wantsPercent, savingsPercent])

  const chartData = [
    { name: 'Needs', value: budget.needs, color: '#4d7cfe' },
    { name: 'Wants', value: budget.wants, color: '#8b5cf6' },
    { name: 'Savings', value: budget.savings, color: '#c6ff00' },
    ...(fixedEMI > 0 ? [{ name: 'EMI/Fixed', value: fixedEMI, color: '#f43f5e' }] : []),
  ]

  const needsBreakdown = [
    { name: 'Rent/Housing', amount: Math.round(budget.needs * 0.45), icon: Home },
    { name: 'Groceries', amount: Math.round(budget.needs * 0.25), icon: ShoppingBag },
    { name: 'Utilities & Bills', amount: Math.round(budget.needs * 0.15), icon: Wallet },
    { name: 'Transport', amount: Math.round(budget.needs * 0.15), icon: Wallet },
  ]

  const tips = useMemo(() => {
    const t = []
    if (savingsPercent < 20) t.push({ icon: '⚠️', text: `Savings at ${savingsPercent}% — below the recommended 20%. Try reducing Wants.` })
    if (needsPercent > 60) t.push({ icon: '💡', text: 'Needs exceed 60%. Look for ways to reduce housing or utility costs.' })
    if (fixedEMI > income * 0.4) t.push({ icon: '🔴', text: 'EMI load exceeds 40% of income! Consider refinancing or debt consolidation.' })
    if (savingsPercent >= 20 && needsPercent <= 50) t.push({ icon: '✅', text: 'Excellent budget discipline! You follow the ideal 50/30/20 rule.' })
    if (t.length === 0) t.push({ icon: '👍', text: 'Good budget structure. Small optimizations can yield big long-term gains.' })
    return t
  }, [savingsPercent, needsPercent, fixedEMI, income])

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN')

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#080808] flex overflow-hidden font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
          <div className="max-w-[1100px] mx-auto space-y-6">

            {/* Header */}
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-[#c6ff00] hover:border-[#c6ff00]/20 transition-all">
                <ArrowLeft size={18} />
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Budget Maker</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">50/30/20 Rule — Interactive Budget Planner</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left - Controls */}
              <div className="lg:col-span-3 space-y-6">
                {/* Income / EMI */}
                <div className="card-dashboard space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#4d7cfe]/10 flex items-center justify-center">
                      <IndianRupee size={20} className="text-[#4d7cfe]" />
                    </div>
                    <h3 className="text-lg font-black text-white">Income Details</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Income</label><span className="text-sm font-black text-[#c6ff00]">{formatCurrency(income)}</span></div>
                      <input type="range" min={5000} max={500000} step={1000} value={income} onChange={e => setIncome(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: '#c6ff00' }} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fixed EMI</label><span className="text-sm font-black text-rose-400">{formatCurrency(fixedEMI)}</span></div>
                      <input type="range" min={0} max={Math.round(income * 0.6)} step={500} value={fixedEMI} onChange={e => setFixedEMI(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: '#f43f5e' }} />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Disposable Income</p>
                    <p className="text-xl font-black text-white">{formatCurrency(disposable)}</p>
                  </div>
                </div>

                {/* Allocation Sliders */}
                <div className="card-dashboard space-y-6">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">Allocation</h3>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-xs font-bold text-[#4d7cfe] uppercase tracking-wider flex items-center gap-2"><Home size={12} /> Needs</span><span className="text-sm font-black text-[#4d7cfe]">{needsPercent}% — {formatCurrency(budget.needs)}</span></div>
                      <input type="range" min={20} max={70} step={1} value={needsPercent} onChange={e => { const v = Number(e.target.value); if (v + wantsPercent <= 100) setNeedsPercent(v) }} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: '#4d7cfe' }} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-xs font-bold text-[#8b5cf6] uppercase tracking-wider flex items-center gap-2"><ShoppingBag size={12} /> Wants</span><span className="text-sm font-black text-[#8b5cf6]">{wantsPercent}% — {formatCurrency(budget.wants)}</span></div>
                      <input type="range" min={5} max={50} step={1} value={wantsPercent} onChange={e => { const v = Number(e.target.value); if (v + needsPercent <= 100) setWantsPercent(v) }} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: '#8b5cf6' }} />
                    </div>
                    <div className="p-4 rounded-2xl bg-[#c6ff00]/5 border border-[#c6ff00]/10 flex justify-between items-center">
                      <span className="text-xs font-bold text-[#c6ff00] uppercase tracking-wider flex items-center gap-2"><PiggyBank size={14} /> Savings</span>
                      <span className="text-xl font-black text-[#c6ff00]">{savingsPercent}% — {formatCurrency(budget.savings)}</span>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="h-4 rounded-full overflow-hidden flex">
                    <div style={{ width: `${needsPercent}%` }} className="bg-[#4d7cfe] transition-all" />
                    <div style={{ width: `${wantsPercent}%` }} className="bg-[#8b5cf6] transition-all" />
                    <div style={{ width: `${savingsPercent}%` }} className="bg-[#c6ff00] transition-all" />
                  </div>
                </div>

                {/* Needs Breakdown */}
                <div className="card-dashboard">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">Needs Breakdown (Suggested)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {needsBreakdown.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#4d7cfe]/10 flex items-center justify-center">
                          <item.icon size={14} className="text-[#4d7cfe]" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">{item.name}</p>
                          <p className="text-sm font-black text-white">{formatCurrency(item.amount)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Chart + Tips */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card-dashboard flex flex-col items-center">
                  <h3 className="text-sm font-black text-white mb-4 uppercase tracking-wider">Budget Split</h3>
                  <div className="w-full aspect-square max-w-[230px]">
                    {mounted && (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" strokeWidth={0}>
                            {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                          </Pie>
                          <Tooltip formatter={(val: any) => formatCurrency(Number(val))} contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', fontSize: '12px', color: '#fff' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {chartData.map((d, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="text-[10px] font-bold text-slate-400">{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Tips */}
                <div className="card-dashboard">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb size={14} className="text-amber-400" />
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">AI Tips</h3>
                  </div>
                  <div className="space-y-3">
                    {tips.map((tip, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <p className="text-[11px] text-slate-300 leading-relaxed">{tip.icon} {tip.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
