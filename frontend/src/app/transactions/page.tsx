"use client"

import { useState } from 'react'
import Sidebar from '../../components/common/Sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowLeft, IndianRupee, Calendar, Tag, FileText, ShoppingBag, Coffee, Car, Home, Zap, Heart, Trash2, TrendingDown, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: 'Food & Dining', icon: Coffee, color: '#f59e0b' },
  { name: 'Shopping', icon: ShoppingBag, color: '#f43f5e' },
  { name: 'Transport', icon: Car, color: '#4d7cfe' },
  { name: 'Housing', icon: Home, color: '#8b5cf6' },
  { name: 'Utilities', icon: Zap, color: '#06b6d4' },
  { name: 'Health', icon: Heart, color: '#10b981' },
  { name: 'Entertainment', icon: Tag, color: '#ec4899' },
  { name: 'Other', icon: FileText, color: '#64748b' },
]

interface Transaction {
  id: string
  amount: number
  category: string
  note: string
  date: string
  type: 'expense' | 'income'
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', amount: 450, category: 'Food & Dining', note: 'Lunch at Dominos', date: '2026-04-25', type: 'expense' },
    { id: '2', amount: 1200, category: 'Transport', note: 'Uber rides this week', date: '2026-04-24', type: 'expense' },
    { id: '3', amount: 50000, category: 'Other', note: 'Salary credit', date: '2026-04-22', type: 'income' },
    { id: '4', amount: 15000, category: 'Housing', note: 'Monthly rent', date: '2026-04-20', type: 'expense' },
    { id: '5', amount: 2500, category: 'Shopping', note: 'Amazon order', date: '2026-04-19', type: 'expense' },
    { id: '6', amount: 800, category: 'Entertainment', note: 'Netflix + Spotify', date: '2026-04-18', type: 'expense' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newTx, setNewTx] = useState({ amount: '', category: 'Food & Dining', note: '', date: new Date().toISOString().split('T')[0], type: 'expense' as 'expense' | 'income' })

  const handleAdd = () => {
    if (!newTx.amount || Number(newTx.amount) <= 0) return
    const tx: Transaction = {
      id: Date.now().toString(),
      amount: Number(newTx.amount),
      category: newTx.category,
      note: newTx.note || 'No description',
      date: newTx.date,
      type: newTx.type,
    }
    setTransactions([tx, ...transactions])
    setNewTx({ amount: '', category: 'Food & Dining', note: '', date: new Date().toISOString().split('T')[0], type: 'expense' })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)

  const getCategoryData = (cat: string) => categories.find(c => c.name === cat) || categories[categories.length - 1]
  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN')

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#080808] flex overflow-hidden font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
          <div className="max-w-[900px] mx-auto space-y-6">

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-[#c6ff00] hover:border-[#c6ff00]/20 transition-all">
                  <ArrowLeft size={18} />
                </Link>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Transactions</h1>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Track every rupee in & out</p>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowForm(!showForm)}
                className="px-5 py-2.5 rounded-xl bg-[#c6ff00] text-black font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(198,255,0,0.15)]">
                <Plus size={16} /> Add
              </motion.button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card-dashboard text-center">
                <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Income</p>
                <p className="text-xl font-black text-emerald-400 flex items-center justify-center gap-1"><TrendingUp size={16} /> {formatCurrency(totalIncome)}</p>
              </div>
              <div className="card-dashboard text-center">
                <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Expenses</p>
                <p className="text-xl font-black text-rose-400 flex items-center justify-center gap-1"><TrendingDown size={16} /> {formatCurrency(totalExpense)}</p>
              </div>
              <div className="card-dashboard text-center">
                <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Balance</p>
                <p className={`text-xl font-black ${totalIncome - totalExpense >= 0 ? 'text-[#c6ff00]' : 'text-rose-400'}`}>{formatCurrency(totalIncome - totalExpense)}</p>
              </div>
            </div>

            {/* Add Form */}
            <AnimatePresence>
              {showForm && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="card-dashboard space-y-5">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">New Transaction</h3>

                    <div className="flex gap-3">
                      <button onClick={() => setNewTx({ ...newTx, type: 'expense' })}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${newTx.type === 'expense' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/20' : 'bg-white/[0.02] text-slate-500 border border-white/[0.04]'}`}>
                        Expense
                      </button>
                      <button onClick={() => setNewTx({ ...newTx, type: 'income' })}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${newTx.type === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-white/[0.02] text-slate-500 border border-white/[0.04]'}`}>
                        Income
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">Amount</label>
                        <div className="relative">
                          <IndianRupee size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input type="number" value={newTx.amount} onChange={e => setNewTx({ ...newTx, amount: e.target.value })}
                            placeholder="0" className="premium-input w-full pl-10" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">Date</label>
                        <input type="date" value={newTx.date} onChange={e => setNewTx({ ...newTx, date: e.target.value })}
                          className="premium-input w-full" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Category</label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                          <button key={cat.name} onClick={() => setNewTx({ ...newTx, category: cat.name })}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition-all ${
                              newTx.category === cat.name
                                ? 'border-2'
                                : 'bg-white/[0.02] border border-white/[0.04] text-slate-400'
                            }`}
                            style={newTx.category === cat.name ? { backgroundColor: `${cat.color}15`, borderColor: `${cat.color}40`, color: cat.color } : {}}>
                            <cat.icon size={12} />
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block">Note</label>
                      <input type="text" value={newTx.note} onChange={e => setNewTx({ ...newTx, note: e.target.value })}
                        placeholder="What was this for?" className="premium-input w-full" />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-xl bg-white/[0.04] text-slate-400 font-bold text-sm border border-white/[0.06] hover:bg-white/[0.06] transition-all">Cancel</button>
                      <motion.button whileTap={{ scale: 0.95 }} onClick={handleAdd}
                        className="flex-1 py-3 rounded-xl bg-[#c6ff00] text-black font-bold text-sm shadow-[0_0_20px_rgba(198,255,0,0.15)]">Save Transaction</motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Transaction List */}
            <div className="card-dashboard">
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-5">Recent Transactions</h3>
              <div className="space-y-2">
                {transactions.map((tx, i) => {
                  const cat = getCategoryData(tx.category)
                  return (
                    <motion.div key={tx.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] transition-all group">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${cat.color}15` }}>
                        <cat.icon size={18} style={{ color: cat.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{tx.note}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>{tx.category}</span>
                          <span className="text-[10px] text-slate-600">{tx.date}</span>
                        </div>
                      </div>
                      <p className={`text-base font-black ${tx.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </p>
                      <button onClick={() => handleDelete(tx.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-rose-400 hover:bg-rose-400/10 transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </div>

          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
