"use client"

import { useState, useMemo } from 'react'
import Sidebar from '../../../components/common/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { motion } from 'framer-motion'
import { Calculator, ArrowLeft, IndianRupee, Percent, Clock, TrendingDown } from 'lucide-react'
import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(5)

  const result = useMemo(() => {
    const P = loanAmount
    const r = interestRate / 12 / 100
    const n = tenure * 12
    if (r === 0) {
      const emi = P / n
      return { emi: Math.round(emi), totalPayment: Math.round(P), totalInterest: 0 }
    }
    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const totalPayment = emi * n
    const totalInterest = totalPayment - P
    return { emi: Math.round(emi), totalPayment: Math.round(totalPayment), totalInterest: Math.round(totalInterest) }
  }, [loanAmount, interestRate, tenure])

  const chartData = [
    { name: 'Principal', value: loanAmount, color: '#c6ff00' },
    { name: 'Interest', value: result.totalInterest, color: '#4d7cfe' },
  ]

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
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">EMI Calculator</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Calculate your Equated Monthly Installment</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left - Inputs */}
              <div className="lg:col-span-3 card-dashboard space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <Calculator size={20} className="text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-black text-white">Loan Details</h3>
                </div>

                {/* Loan Amount */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <IndianRupee size={12} /> Loan Amount
                    </label>
                    <span className="text-sm font-black text-[#c6ff00]">{formatCurrency(loanAmount)}</span>
                  </div>
                  <input type="range" min={50000} max={10000000} step={50000} value={loanAmount}
                    onChange={e => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06]"
                    style={{ accentColor: '#c6ff00' }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                    <span>₹50K</span><span>₹1 Cr</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Percent size={12} /> Interest Rate (p.a.)
                    </label>
                    <span className="text-sm font-black text-[#4d7cfe]">{interestRate}%</span>
                  </div>
                  <input type="range" min={1} max={30} step={0.1} value={interestRate}
                    onChange={e => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06]"
                    style={{ accentColor: '#4d7cfe' }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                    <span>1%</span><span>30%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Clock size={12} /> Loan Tenure
                    </label>
                    <span className="text-sm font-black text-[#8b5cf6]">{tenure} {tenure === 1 ? 'Year' : 'Years'}</span>
                  </div>
                  <input type="range" min={1} max={30} step={1} value={tenure}
                    onChange={e => setTenure(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06]"
                    style={{ accentColor: '#8b5cf6' }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                    <span>1 Yr</span><span>30 Yrs</span>
                  </div>
                </div>

                {/* Result Cards */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.04]">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-[#c6ff00]/5 border border-[#c6ff00]/10 text-center">
                    <p className="text-[9px] font-black uppercase text-[#c6ff00]/60 tracking-widest mb-1">Monthly EMI</p>
                    <p className="text-xl font-black text-[#c6ff00]">{formatCurrency(result.emi)}</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-4 rounded-2xl bg-[#4d7cfe]/5 border border-[#4d7cfe]/10 text-center">
                    <p className="text-[9px] font-black uppercase text-[#4d7cfe]/60 tracking-widest mb-1">Total Interest</p>
                    <p className="text-xl font-black text-[#4d7cfe]">{formatCurrency(result.totalInterest)}</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Total Payment</p>
                    <p className="text-xl font-black text-white">{formatCurrency(result.totalPayment)}</p>
                  </motion.div>
                </div>
              </div>

              {/* Right - Chart */}
              <div className="lg:col-span-2 card-dashboard flex flex-col items-center justify-center">
                <h3 className="text-sm font-black text-white mb-6 uppercase tracking-wider">Breakup</h3>
                <div className="w-full aspect-square max-w-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="value" strokeWidth={0}>
                        {chartData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val) => formatCurrency(Number(val))} contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', fontSize: '12px', color: '#fff' }} />

                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#c6ff00]" />
                    <span className="text-[10px] font-bold text-slate-400">Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#4d7cfe]" />
                    <span className="text-[10px] font-bold text-slate-400">Interest</span>
                  </div>
                </div>

                {/* Amortization Insight */}
                <div className="mt-8 w-full p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown size={12} className="text-amber-400" />
                    <span className="text-[9px] font-black uppercase text-amber-400/70 tracking-widest">Insight</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {result.totalInterest > loanAmount * 0.5
                      ? `⚠️ Interest exceeds 50% of principal! Consider shorter tenure or prepayment.`
                      : result.totalInterest > loanAmount * 0.3
                        ? `💡 Moderate interest load. A 1% rate reduction saves ~₹${Math.round((result.totalInterest * 0.12)).toLocaleString('en-IN')}.`
                        : `✅ Efficient loan structure. Your interest-to-principal ratio is healthy.`}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
