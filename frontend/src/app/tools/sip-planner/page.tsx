"use client"

import { useState, useMemo } from 'react'
import Sidebar from '../../../components/common/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowLeft, IndianRupee, Percent, Clock, Zap, Milestone } from 'lucide-react'
import Link from 'next/link'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SIPPlanner() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [timePeriod, setTimePeriod] = useState(10)

  const result = useMemo(() => {
    const P = monthlyInvestment
    const r = expectedReturn / 12 / 100
    const n = timePeriod * 12
    const totalInvested = P * n
    const futureValue = r === 0 ? totalInvested : P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    const wealthGained = futureValue - totalInvested
    return { totalInvested: Math.round(totalInvested), futureValue: Math.round(futureValue), wealthGained: Math.round(wealthGained) }
  }, [monthlyInvestment, expectedReturn, timePeriod])

  const chartData = useMemo(() => {
    const data = []
    const P = monthlyInvestment
    const r = expectedReturn / 12 / 100
    for (let year = 0; year <= timePeriod; year++) {
      const n = year * 12
      const invested = P * n
      const value = r === 0 ? invested : P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
      data.push({
        year: `Yr ${year}`,
        invested: Math.round(invested),
        value: Math.round(year === 0 ? 0 : value),
      })
    }
    return data
  }, [monthlyInvestment, expectedReturn, timePeriod])

  const milestones = useMemo(() => {
    const targets = [100000, 500000, 1000000, 2500000, 5000000, 10000000]
    const P = monthlyInvestment
    const r = expectedReturn / 12 / 100
    return targets.map(target => {
      if (r === 0) {
        const months = Math.ceil(target / P)
        return { target, years: (months / 12).toFixed(1), reachable: months <= 360 }
      }
      let months = 0
      let value = 0
      while (value < target && months < 600) {
        months++
        value = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
      }
      return { target, years: (months / 12).toFixed(1), reachable: months <= 360 }
    }).filter(m => m.reachable)
  }, [monthlyInvestment, expectedReturn])

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + ' Cr'
    if (val >= 100000) return '₹' + (val / 100000).toFixed(2) + ' L'
    return '₹' + val.toLocaleString('en-IN')
  }

  const formatFull = (val: number) => '₹' + val.toLocaleString('en-IN')

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
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">SIP Planner</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Systematic Investment Plan — Power of Compounding</p>
              </div>
            </div>

            {/* Inputs */}
            <div className="card-dashboard space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#c6ff00]/10 flex items-center justify-center">
                  <TrendingUp size={20} className="text-[#c6ff00]" />
                </div>
                <h3 className="text-lg font-black text-white">Investment Params</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Monthly Investment */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><IndianRupee size={12} /> Monthly SIP</label>
                    <span className="text-sm font-black text-[#c6ff00]">{formatFull(monthlyInvestment)}</span>
                  </div>
                  <input type="range" min={500} max={200000} step={500} value={monthlyInvestment}
                    onChange={e => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06]"
                    style={{ accentColor: '#c6ff00' }} />
                  <div className="flex justify-between text-[10px] text-slate-600 font-bold"><span>₹500</span><span>₹2L</span></div>
                </div>

                {/* Expected Return */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Percent size={12} /> Expected Return</label>
                    <span className="text-sm font-black text-[#4d7cfe]">{expectedReturn}%</span>
                  </div>
                  <input type="range" min={1} max={30} step={0.5} value={expectedReturn}
                    onChange={e => setExpectedReturn(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06]"
                    style={{ accentColor: '#4d7cfe' }} />
                  <div className="flex justify-between text-[10px] text-slate-600 font-bold"><span>1%</span><span>30%</span></div>
                </div>

                {/* Time Period */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Clock size={12} /> Time Period</label>
                    <span className="text-sm font-black text-[#8b5cf6]">{timePeriod} Years</span>
                  </div>
                  <input type="range" min={1} max={40} step={1} value={timePeriod}
                    onChange={e => setTimePeriod(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06]"
                    style={{ accentColor: '#8b5cf6' }} />
                  <div className="flex justify-between text-[10px] text-slate-600 font-bold"><span>1 Yr</span><span>40 Yrs</span></div>
                </div>
              </div>

              {/* Result Cards */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.04]">
                <motion.div key={result.totalInvested} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Invested</p>
                  <p className="text-2xl font-black text-white">{formatCurrency(result.totalInvested)}</p>
                </motion.div>
                <motion.div key={result.wealthGained} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-5 rounded-2xl bg-[#c6ff00]/5 border border-[#c6ff00]/10 text-center">
                  <p className="text-[9px] font-black uppercase text-[#c6ff00]/60 tracking-widest mb-1">Wealth Gained</p>
                  <p className="text-2xl font-black text-[#c6ff00]">{formatCurrency(result.wealthGained)}</p>
                </motion.div>
                <motion.div key={result.futureValue} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-5 rounded-2xl bg-[#4d7cfe]/5 border border-[#4d7cfe]/10 text-center">
                  <p className="text-[9px] font-black uppercase text-[#4d7cfe]/60 tracking-widest mb-1">Future Value</p>
                  <p className="text-2xl font-black text-[#4d7cfe]">{formatCurrency(result.futureValue)}</p>
                </motion.div>
              </div>
            </div>

            {/* Chart */}
            <div className="card-dashboard">
              <h3 className="text-sm font-black text-white mb-6 uppercase tracking-wider">Growth Projection</h3>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c6ff00" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#c6ff00" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4d7cfe" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#4d7cfe" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(val) => formatCurrency(val)} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} width={70} />
                    <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', fontSize: '11px', color: '#fff' }} formatter={(val) => formatFull(Number(val))} />
                    <Area type="monotone" dataKey="invested" stroke="#4d7cfe" strokeWidth={2} fill="url(#colorInvested)" name="Invested" />
                    <Area type="monotone" dataKey="value" stroke="#c6ff00" strokeWidth={2} fill="url(#colorValue)" name="Value" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Milestones */}
            {milestones.length > 0 && (
              <div className="card-dashboard">
                <div className="flex items-center gap-2 mb-5">
                  <Milestone size={16} className="text-amber-400" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">Wealth Milestones</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {milestones.map((m, i) => (
                    <motion.div key={m.target} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center hover:border-[#c6ff00]/20 transition-all">
                      <p className="text-lg font-black text-white">{formatCurrency(m.target)}</p>
                      <p className="text-[10px] font-bold text-[#c6ff00] mt-1">in {m.years} yrs</p>
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
