"use client"

import { useState, useMemo } from 'react'
import Sidebar from '../../../components/common/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { motion } from 'framer-motion'
import { ArrowLeftRight, ArrowLeft, IndianRupee, Percent, Clock, Trophy, TrendingDown } from 'lucide-react'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'

function calcEMI(P: number, r: number, n: number) {
  if (r === 0) return { emi: Math.round(P / n), total: Math.round(P), interest: 0 }
  const monthlyRate = r / 12 / 100
  const emi = P * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1)
  const total = emi * n
  return { emi: Math.round(emi), total: Math.round(total), interest: Math.round(total - P) }
}

export default function LoanCompare() {
  const [loanA, setLoanA] = useState({ amount: 2000000, rate: 8.5, tenure: 20 })
  const [loanB, setLoanB] = useState({ amount: 2000000, rate: 9.5, tenure: 15 })

  const resultA = useMemo(() => calcEMI(loanA.amount, loanA.rate, loanA.tenure * 12), [loanA])
  const resultB = useMemo(() => calcEMI(loanB.amount, loanB.rate, loanB.tenure * 12), [loanB])

  const betterLoan = resultA.total <= resultB.total ? 'A' : 'B'
  const savingsAmount = Math.abs(resultA.total - resultB.total)

  const chartData = [
    { name: 'Monthly EMI', 'Loan A': resultA.emi, 'Loan B': resultB.emi },
    { name: 'Total Interest', 'Loan A': resultA.interest, 'Loan B': resultB.interest },
    { name: 'Total Payment', 'Loan A': resultA.total, 'Loan B': resultB.total },
  ]

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return '₹' + (val / 10000000).toFixed(2) + ' Cr'
    if (val >= 100000) return '₹' + (val / 100000).toFixed(1) + ' L'
    return '₹' + val.toLocaleString('en-IN')
  }
  const formatFull = (val: number) => '₹' + val.toLocaleString('en-IN')

  const LoanForm = ({ label, loan, setLoan, color }: { label: string; loan: typeof loanA; setLoan: (l: typeof loanA) => void; color: string }) => (
    <div className="card-dashboard space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <IndianRupee size={16} style={{ color }} />
        </div>
        <h4 className="text-sm font-black text-white uppercase tracking-wider">{label}</h4>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between"><label className="text-[10px] font-bold text-slate-400 uppercase">Loan Amount</label><span className="text-xs font-black" style={{ color }}>{formatFull(loan.amount)}</span></div>
          <input type="range" min={100000} max={10000000} step={100000} value={loan.amount} onChange={e => setLoan({ ...loan, amount: Number(e.target.value) })} className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: color }} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between"><label className="text-[10px] font-bold text-slate-400 uppercase">Interest Rate</label><span className="text-xs font-black" style={{ color }}>{loan.rate}%</span></div>
          <input type="range" min={5} max={20} step={0.1} value={loan.rate} onChange={e => setLoan({ ...loan, rate: Number(e.target.value) })} className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: color }} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between"><label className="text-[10px] font-bold text-slate-400 uppercase">Tenure (Years)</label><span className="text-xs font-black" style={{ color }}>{loan.tenure} yrs</span></div>
          <input type="range" min={1} max={30} step={1} value={loan.tenure} onChange={e => setLoan({ ...loan, tenure: Number(e.target.value) })} className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: color }} />
        </div>
      </div>
    </div>
  )

  const ResultCard = ({ label, result, color, isBetter }: { label: string; result: typeof resultA; color: string; isBetter: boolean }) => (
    <div className={`card-dashboard border-2 ${isBetter ? 'border-[#c6ff00]/20' : 'border-white/[0.04]'}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-black uppercase tracking-wider" style={{ color }}>{label}</h4>
        {isBetter && <span className="text-[8px] px-2 py-0.5 rounded-md bg-[#c6ff00]/10 text-[#c6ff00] font-black uppercase flex items-center gap-1"><Trophy size={8} /> Better</span>}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
          <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">EMI</p>
          <p className="text-base font-black text-white">{formatCurrency(result.emi)}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
          <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Interest</p>
          <p className="text-base font-black" style={{ color }}>{formatCurrency(result.interest)}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
          <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Total</p>
          <p className="text-base font-black text-white">{formatCurrency(result.total)}</p>
        </div>
      </div>
    </div>
  )

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
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Loan Compare</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Side-by-side loan comparison tool</p>
              </div>
            </div>

            {/* Loan Forms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LoanForm label="Loan A" loan={loanA} setLoan={setLoanA} color="#4d7cfe" />
              <LoanForm label="Loan B" loan={loanB} setLoan={setLoanB} color="#8b5cf6" />
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResultCard label="Loan A" result={resultA} color="#4d7cfe" isBetter={betterLoan === 'A'} />
              <ResultCard label="Loan B" result={resultB} color="#8b5cf6" isBetter={betterLoan === 'B'} />
            </div>

            {/* Savings banner */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-gradient-to-r from-[#c6ff00]/5 to-[#4d7cfe]/5 border border-[#c6ff00]/10 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Choosing Loan {betterLoan} saves you</p>
              <p className="text-3xl font-black text-[#c6ff00]">{formatCurrency(savingsAmount)}</p>
            </motion.div>

            {/* Chart */}
            <div className="card-dashboard">
              <h3 className="text-sm font-black text-white mb-6 uppercase tracking-wider">Visual Comparison</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barGap={8}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={v => formatCurrency(v)} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} width={80} />
                    <Tooltip formatter={(val) => formatFull(Number(val))} contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700 }} />
                    <Bar dataKey="Loan A" fill="#4d7cfe" radius={[8, 8, 0, 0]} barSize={35} />
                    <Bar dataKey="Loan B" fill="#8b5cf6" radius={[8, 8, 0, 0]} barSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
