import { useState } from 'react'
import Sidebar from '../components/common/Sidebar'
import Navbar from '../components/common/Navbar'
import { motion } from 'framer-motion'
import BalanceCard from '../components/dashboard/BalanceCard'
import SpendingChart from '../components/dashboard/SpendingChart'
import GoalTracker from '../components/dashboard/GoalTracker'
import RecentActivity from '../components/dashboard/RecentActivity'
import SIPCalculator from '../components/simulation/SIPCalculator'
import EMICalculator from '../components/simulation/EMICalculator'
import Recommendations from '../components/ai-twin/Recommendations'
import DecisionScore from '../components/ai-twin/DecisionScore'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('realLife')

  const tabs = [
    { id: 'realLife', label: 'Real Life' },
    { id: 'simulation', label: 'Simulation' },
    { id: 'aiTwin', label: 'AI Twin' },
  ]

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-6xl mx-auto">
            
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <div className="glass rounded-full p-1 flex">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 relative ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-slate-700 rounded-full"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'realLife' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <BalanceCard />
                  <GoalTracker />
                  <SpendingChart />
                  <RecentActivity />
                </div>
              )}
              {activeTab === 'simulation' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SIPCalculator />
                  <EMICalculator />
                </div>
              )}
              {activeTab === 'aiTwin' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Recommendations />
                  <DecisionScore />
                </div>
              )}
            </motion.div>

          </div>
        </main>
      </div>
    </div>
  )
}
