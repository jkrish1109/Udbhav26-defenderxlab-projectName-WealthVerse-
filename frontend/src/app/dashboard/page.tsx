"use client"

import { useState, useEffect } from 'react'
import Sidebar from '../../components/common/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, User as UserIcon, Globe, Settings } from 'lucide-react'

// Core Dashboard Components
import SpendingChart from '../../components/dashboard/SpendingChart'
import GoalTracker from '../../components/dashboard/GoalTracker'
import FinancialCalendar from '../../components/dashboard/FinancialCalendar'
import DailySavings from '../../components/dashboard/DailySavings'
import ProductiveTime from '../../components/dashboard/ProductiveTime'
import QuickActions from '../../components/dashboard/QuickActions'
import DecisionScore from '../../components/ai-twin/DecisionScore'

// Salary-Driven AI Components
import SalarySetup from '../../components/dashboard/SalarySetup'
import SalaryBreakdown from '../../components/dashboard/SalaryBreakdown'
import SIPProjection from '../../components/dashboard/SIPProjection'
import EMIRiskScore from '../../components/dashboard/EMIRiskScore'
import AIAdvisor from '../../components/dashboard/AIAdvisor'
import FinancialHealthScore from '../../components/dashboard/FinancialHealthScore'
import SmartBudget from '../../components/dashboard/SmartBudget'
import VoiceAssistant from '../../components/dashboard/VoiceAssistant'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)
  const [aiSubtitle, setAiSubtitle] = useState("")
  const [showSalarySetup, setShowSalarySetup] = useState(false)
  const [salaryProfile, setSalaryProfile] = useState<any>(null)

  const aiMessages = [
    "Ready to grow your wealth in the Student Universe?",
    "Your smart financial journey starts now.",
    "Let's optimize your money decisions today.",
    "AI is analyzing your lifestyle-specific trends...",
    "Your personal CFO has new optimization tips.",
    "Today's market favors disciplined investors.",
    "Small savings today = big wealth tomorrow."
  ]

  useEffect(() => {
    setMounted(true)
    setAiSubtitle(aiMessages[Math.floor(Math.random() * aiMessages.length)])
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('salaryProfile')
      if (saved) {
        setSalaryProfile(JSON.parse(saved))
      } else {
        setShowSalarySetup(true)
      }
    }
  }, [])

  const handleSalaryComplete = (profile: any) => {
    setSalaryProfile(profile)
    setShowSalarySetup(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('salaryProfile', JSON.stringify(profile))
    }
  }

  if (!mounted) return null

  const firstName = user?.fullName?.split(' ')[0] || 'Investor'
  const universeType = user?.universe || 'student'
  const salary = salaryProfile?.salary || 50000
  const tier = salaryProfile?.tier || 'medium'
  const emi = parseInt(salaryProfile?.existingEMI) || 0
  const risk = salaryProfile?.riskLevel || 'moderate'
  const city = salaryProfile?.city || 'metro'
  const savingsGoal = parseInt(salaryProfile?.savingsGoal) || 10000

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#080808] flex overflow-hidden font-sans">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
          <div className="max-w-[1440px] mx-auto space-y-6">
            
            {/* ═══ HEADER ═══ */}
            <header className="flex justify-between items-start">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                   <div className="w-7 h-7 rounded-lg bg-[#c6ff00]/10 flex items-center justify-center text-[#c6ff00]">
                      <Globe size={14} />
                   </div>
                   <span className="text-[10px] font-bold uppercase text-[#c6ff00]/80 tracking-[0.2em]">Student Universe</span>
                   {salaryProfile && (
                     <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-500 uppercase">
                       {tier === 'high' ? '🚀 Wealth' : tier === 'low' ? '🛡️ Survival' : '⚖️ Balanced'}
                     </span>
                   )}
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Hello, <span className="gradient-text">{firstName}!</span>
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <Sparkles size={12} className="text-[#c6ff00]/60" />
                  <p className="text-slate-500 text-xs font-medium italic">{aiSubtitle}</p>
                </div>
              </motion.div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowSalarySetup(true)}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-[#c6ff00] transition-all hover:border-[#c6ff00]/20"
                  title="Reconfigure Salary"
                >
                  <Settings size={18} strokeWidth={1.5} />
                </button>
                <div className="flex items-center gap-3 pl-3 border-l border-white/[0.06]">
                  <div className="text-right hidden md:block">
                    <p className="text-[11px] font-bold text-white">{user?.fullName || 'User'}</p>
                    <p className="text-[9px] font-semibold text-slate-500 capitalize">{universeType} Universe</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c6ff00]/20 to-[#4d7cfe]/20 flex items-center justify-center border border-white/[0.06]">
                    <span className="text-white font-bold text-sm">{firstName[0]}</span>
                  </div>
                </div>
              </div>
            </header>

            {/* ═══ ROW 1: Salary + SIP (equal height tall cards) ═══ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <SalaryBreakdown salary={salary} city={city} />
              <SIPProjection salary={salary} riskLevel={risk} />
            </div>

            {/* ═══ ROW 2: Small metric strip ═══ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <DailySavings />
              <ProductiveTime />
              <DecisionScore />
              <EMIRiskScore salary={salary} existingEMI={emi} />
            </div>

            {/* ═══ ROW 3: Net Worth Chart (full width) ═══ */}
            <SpendingChart />

            {/* ═══ ROW 4: Budget + Health Score + Calendar ═══ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <SmartBudget salary={salary} existingEMI={emi} tier={tier} />
              <FinancialHealthScore salary={salary} existingEMI={emi} savingsGoal={savingsGoal} tier={tier} />
              <FinancialCalendar />
            </div>

            {/* ═══ ROW 5: AI Advisor + Goals + Quick Actions ═══ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <AIAdvisor salary={salary} tier={tier} existingEMI={emi} riskLevel={risk} />
              <GoalTracker />
              <QuickActions />
            </div>

            {/* ═══ FOOTER ═══ */}
            <footer className="pt-6 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.15em]">
                Student Universe v4.0
              </p>
              <div className="flex gap-5">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#c6ff00]/70 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c6ff00] animate-pulse" />
                  AI Active
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  ₹{salary.toLocaleString('en-IN')}/mo
                </span>
              </div>
            </footer>

          </div>
        </main>
      </div>

      <VoiceAssistant />

      {/* Salary Setup Modal */}
      <AnimatePresence>
        {showSalarySetup && (
          <SalarySetup 
            onComplete={handleSalaryComplete}
            onClose={salaryProfile ? () => setShowSalarySetup(false) : undefined}
          />
        )}
      </AnimatePresence>
    </ProtectedRoute>
  )
}
