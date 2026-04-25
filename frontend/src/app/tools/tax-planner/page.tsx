"use client"

import { useState, useMemo } from 'react'
import Sidebar from '../../../components/common/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { motion } from 'framer-motion'
import { FileText, ArrowLeft, IndianRupee, Shield, Zap, Check } from 'lucide-react'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const OLD_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 },
]

const NEW_SLABS = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400000, max: 800000, rate: 5 },
  { min: 800000, max: 1200000, rate: 10 },
  { min: 1200000, max: 1600000, rate: 15 },
  { min: 1600000, max: 2000000, rate: 20 },
  { min: 2000000, max: 2400000, rate: 25 },
  { min: 2400000, max: Infinity, rate: 30 },
]

function calcTax(income: number, slabs: typeof OLD_SLABS) {
  let tax = 0
  for (const slab of slabs) {
    if (income <= slab.min) break
    const taxable = Math.min(income, slab.max) - slab.min
    tax += taxable * slab.rate / 100
  }
  return Math.round(tax)
}

export default function TaxPlanner() {
  const [annualIncome, setAnnualIncome] = useState(1000000)
  const [ded80C, setDed80C] = useState(150000)
  const [ded80D, setDed80D] = useState(25000)
  const [dedHRA, setDedHRA] = useState(0)
  const [dedNPS, setDedNPS] = useState(0)

  const result = useMemo(() => {
    const totalDeductions = ded80C + ded80D + dedHRA + dedNPS
    const oldTaxableIncome = Math.max(0, annualIncome - 50000 - totalDeductions)
    const newTaxableIncome = Math.max(0, annualIncome - 75000)
    const oldTax = calcTax(oldTaxableIncome, OLD_SLABS)
    const newTax = calcTax(newTaxableIncome, NEW_SLABS)
    const oldCess = Math.round(oldTax * 0.04)
    const newCess = Math.round(newTax * 0.04)
    return {
      totalDeductions,
      oldTaxable: oldTaxableIncome,
      newTaxable: newTaxableIncome,
      oldTax: oldTax + oldCess,
      newTax: newTax + newCess,
      savings: (oldTax + oldCess) - (newTax + newCess),
      betterRegime: (newTax + newCess) <= (oldTax + oldCess) ? 'New' : 'Old',
    }
  }, [annualIncome, ded80C, ded80D, dedHRA, dedNPS])

  const chartData = [
    { name: 'Old Regime', tax: result.oldTax, color: '#f59e0b' },
    { name: 'New Regime', tax: result.newTax, color: '#4d7cfe' },
  ]

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN')

  const savingOptions = [
    { name: 'ELSS Funds', max: '₹1.5L', section: '80C', desc: 'Lock-in 3 years, equity returns' },
    { name: 'PPF', max: '₹1.5L', section: '80C', desc: 'Sovereign guarantee, 15yr maturity' },
    { name: 'NPS (Tier-I)', max: '₹50K extra', section: '80CCD(1B)', desc: 'Additional deduction beyond 80C' },
    { name: 'Health Insurance', max: '₹25K/₹50K', section: '80D', desc: 'Self + Parents coverage' },
    { name: 'Home Loan Interest', max: '₹2L', section: '24(b)', desc: 'Self-occupied property' },
    { name: 'Education Loan', max: 'No limit', section: '80E', desc: 'Full interest deductible' },
  ]

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
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Tax Planner</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Old vs New Regime — FY 2025-26 Comparison</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left - Inputs */}
              <div className="lg:col-span-3 space-y-6">
                <div className="card-dashboard space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#8b5cf6]/10 flex items-center justify-center">
                      <FileText size={20} className="text-[#8b5cf6]" />
                    </div>
                    <h3 className="text-lg font-black text-white">Income & Deductions</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Annual CTC / Income</label><span className="text-sm font-black text-[#c6ff00]">{formatCurrency(annualIncome)}</span></div>
                    <input type="range" min={300000} max={5000000} step={50000} value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: '#c6ff00' }} />
                    <div className="flex justify-between text-[10px] text-slate-600 font-bold"><span>₹3L</span><span>₹50L</span></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.04]">
                    <div className="space-y-2">
                      <div className="flex justify-between"><label className="text-[10px] font-bold text-slate-400 uppercase">80C (ELSS, PPF, LIC)</label><span className="text-xs font-black text-amber-400">{formatCurrency(ded80C)}</span></div>
                      <input type="range" min={0} max={150000} step={5000} value={ded80C} onChange={e => setDed80C(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: '#f59e0b' }} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><label className="text-[10px] font-bold text-slate-400 uppercase">80D (Health Insurance)</label><span className="text-xs font-black text-amber-400">{formatCurrency(ded80D)}</span></div>
                      <input type="range" min={0} max={75000} step={5000} value={ded80D} onChange={e => setDed80D(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: '#f59e0b' }} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><label className="text-[10px] font-bold text-slate-400 uppercase">HRA Exemption</label><span className="text-xs font-black text-amber-400">{formatCurrency(dedHRA)}</span></div>
                      <input type="range" min={0} max={300000} step={5000} value={dedHRA} onChange={e => setDedHRA(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: '#f59e0b' }} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><label className="text-[10px] font-bold text-slate-400 uppercase">80CCD NPS</label><span className="text-xs font-black text-amber-400">{formatCurrency(dedNPS)}</span></div>
                      <input type="range" min={0} max={50000} step={5000} value={dedNPS} onChange={e => setDedNPS(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/[0.06]" style={{ accentColor: '#f59e0b' }} />
                    </div>
                  </div>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div className={`card-dashboard border-2 ${result.betterRegime === 'Old' ? 'border-amber-400/30' : 'border-white/[0.04]'}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <Shield size={16} className="text-amber-400" />
                      <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">Old Regime</h4>
                      {result.betterRegime === 'Old' && <span className="text-[8px] px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 font-black uppercase">Better</span>}
                    </div>
                    <div className="space-y-3">
                      <div><p className="text-[10px] text-slate-500 font-bold uppercase">Taxable Income</p><p className="text-lg font-black text-white">{formatCurrency(result.oldTaxable)}</p></div>
                      <div><p className="text-[10px] text-slate-500 font-bold uppercase">Total Deductions</p><p className="text-sm font-black text-amber-400">{formatCurrency(result.totalDeductions + 50000)}</p></div>
                      <div className="pt-3 border-t border-white/[0.04]"><p className="text-[10px] text-slate-500 font-bold uppercase">Tax Payable (incl. cess)</p><p className="text-2xl font-black text-amber-400">{formatCurrency(result.oldTax)}</p></div>
                    </div>
                  </motion.div>

                  <motion.div className={`card-dashboard border-2 ${result.betterRegime === 'New' ? 'border-[#4d7cfe]/30' : 'border-white/[0.04]'}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={16} className="text-[#4d7cfe]" />
                      <h4 className="text-sm font-black text-[#4d7cfe] uppercase tracking-wider">New Regime</h4>
                      {result.betterRegime === 'New' && <span className="text-[8px] px-2 py-0.5 rounded-md bg-[#4d7cfe]/10 text-[#4d7cfe] font-black uppercase">Better</span>}
                    </div>
                    <div className="space-y-3">
                      <div><p className="text-[10px] text-slate-500 font-bold uppercase">Taxable Income</p><p className="text-lg font-black text-white">{formatCurrency(result.newTaxable)}</p></div>
                      <div><p className="text-[10px] text-slate-500 font-bold uppercase">Std Deduction</p><p className="text-sm font-black text-[#4d7cfe]">{formatCurrency(75000)}</p></div>
                      <div className="pt-3 border-t border-white/[0.04]"><p className="text-[10px] text-slate-500 font-bold uppercase">Tax Payable (incl. cess)</p><p className="text-2xl font-black text-[#4d7cfe]">{formatCurrency(result.newTax)}</p></div>
                    </div>
                  </motion.div>
                </div>

                <div className={`p-4 rounded-2xl border text-center ${result.savings >= 0 ? 'bg-[#c6ff00]/5 border-[#c6ff00]/10' : 'bg-[#4d7cfe]/5 border-[#4d7cfe]/10'}`}>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">You save with {result.betterRegime} Regime</p>
                  <p className="text-2xl font-black" style={{ color: result.betterRegime === 'New' ? '#4d7cfe' : '#f59e0b' }}>{formatCurrency(Math.abs(result.savings))}</p>
                </div>
              </div>

              {/* Right - Chart + Recommendations */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card-dashboard">
                  <h3 className="text-sm font-black text-white mb-4 uppercase tracking-wider">Comparison</h3>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} barGap={20}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
                        <YAxis tickFormatter={v => '₹' + (v / 1000).toFixed(0) + 'K'} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(val) => formatCurrency(Number(val))} contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                        <Bar dataKey="tax" radius={[12, 12, 0, 0]} barSize={50}>
                          {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="card-dashboard">
                  <h3 className="text-sm font-black text-white mb-4 uppercase tracking-wider">Tax Saving Options</h3>
                  <div className="space-y-3">
                    {savingOptions.map((opt, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs font-black text-white">{opt.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 font-black">{opt.section}</span>
                            <p className="text-[10px] text-slate-400 font-bold mt-1">Max: {opt.max}</p>
                          </div>
                        </div>
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
