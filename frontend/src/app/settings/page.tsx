"use client"

import { useState } from 'react'
import Sidebar from '../../components/common/Sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Shield, Globe, Bell, Moon, Sun, Smartphone, CreditCard, Lock, ChevronRight, Zap, Palette, Database, LogOut, CheckCircle2 } from 'lucide-react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { logout } from '@/store/slices/authSlice'
import { useRouter } from 'next/navigation'

export default function Settings() {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [aiInsights, setAiInsights] = useState(true)
  const [biometricLock, setBiometricLock] = useState(false)
  
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleToggle = (name: string, currentValue: boolean, setter: (val: boolean) => void) => {
    setter(!currentValue)
    showToast(`${name} ${!currentValue ? 'Enabled' : 'Disabled'}`)
  }

  const handleLogout = () => {
    dispatch(logout())
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('salaryProfile')
    }
    router.push('/login')
  }

  const Toggle = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
    <button onClick={onClick} className={`settings-toggle ${active ? 'active' : ''}`} />
  )

  const universeName = user?.universe || 'student'

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#080808] flex overflow-hidden font-sans relative">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="max-w-3xl mx-auto">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <h1 className="text-3xl font-black text-white tracking-tight">Settings</h1>
              <p className="text-sm text-slate-500 mt-1">Manage your account, preferences, and security.</p>
            </motion.div>

            {/* ── Profile ── */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8">
              <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] mb-4 px-1">Profile</h2>
              <div className="settings-card">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c6ff00]/20 to-[#4d7cfe]/20 flex items-center justify-center border border-white/[0.06] shrink-0">
                    <span className="text-white font-black text-2xl">{(user?.fullName?.[0] || 'U').toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-white truncate">{user?.fullName || 'User'}</p>
                    <p className="text-sm text-slate-500 truncate">{user?.email || 'user@example.com'}</p>
                    <p className="text-[10px] font-bold text-[#c6ff00] uppercase tracking-widest mt-1 capitalize">{universeName} Universe</p>
                  </div>
                  <button 
                    onClick={() => showToast('Edit Profile modal opening...')}
                    className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs font-bold text-slate-400 hover:text-white hover:border-white/10 transition-all"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </motion.section>

            {/* ── Preferences ── */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
              <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] mb-4 px-1">Preferences</h2>
              <div className="space-y-2">
                {[
                  { icon: darkMode ? Moon : Sun, label: darkMode ? 'Dark Mode' : 'Light Mode', desc: `Use ${darkMode ? 'dark' : 'light'} theme across the app`, value: darkMode, toggle: () => handleToggle('Theme', darkMode, setDarkMode) },
                  { icon: Bell, label: 'Push Notifications', desc: 'EMI reminders, SIP alerts, AI tips', value: notifications, toggle: () => handleToggle('Notifications', notifications, setNotifications) },
                  { icon: Zap, label: 'AI Insights', desc: 'Personalized financial recommendations', value: aiInsights, toggle: () => handleToggle('AI Insights', aiInsights, setAiInsights) },
                ].map((item, i) => (
                  <div key={i} className="settings-card flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-slate-500">
                        <item.icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-[11px] text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                    <Toggle active={item.value} onClick={item.toggle} />
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ── Security ── */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8">
              <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] mb-4 px-1">Security</h2>
              <div className="space-y-2">
                <div className="settings-card flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-slate-500">
                      <Smartphone size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Biometric Lock</p>
                      <p className="text-[11px] text-slate-500">Require fingerprint or face ID</p>
                    </div>
                  </div>
                  <Toggle active={biometricLock} onClick={() => handleToggle('Biometric Lock', biometricLock, setBiometricLock)} />
                </div>

                {[
                  { icon: Lock, label: 'Change Password', desc: 'Update your account password' },
                  { icon: Shield, label: 'Two-Factor Auth', desc: 'Add extra security layer' },
                  { icon: Database, label: 'Export Data', desc: 'Download all your financial data' },
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => showToast(`${item.label} initiated...`)}
                    className="settings-card flex items-center justify-between w-full text-left group hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                        <item.icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-[11px] text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </button>
                ))}
              </div>
            </motion.section>

            {/* ── Financial Setup ── */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
              <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] mb-4 px-1">Financial Setup</h2>
              <div className="space-y-2">
                {[
                  { icon: CreditCard, label: 'Salary Configuration', desc: 'Update income, EMI, and risk profile' },
                  { icon: Globe, label: 'Switch Universe', desc: `Current: ${universeName} universe` },
                  { icon: Palette, label: 'Customize Theme', desc: 'Accent colors and display options' },
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => showToast(`Opening ${item.label}...`)}
                    className="settings-card flex items-center justify-between w-full text-left group hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-slate-500 group-hover:text-[#c6ff00] transition-colors">
                        <item.icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-[11px] text-slate-500 capitalize">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </button>
                ))}
              </div>
            </motion.section>

            {/* ── Danger Zone ── */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-16">
              <h2 className="text-[11px] font-black text-rose-500/60 uppercase tracking-[0.15em] mb-4 px-1">Account</h2>
              <button 
                onClick={handleLogout}
                className="settings-card flex items-center gap-4 w-full text-left group hover:border-rose-500/20 hover:bg-rose-500/5 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/5 flex items-center justify-center text-rose-400 group-hover:bg-rose-500/10 transition-colors">
                  <LogOut size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-rose-400">Sign Out</p>
                  <p className="text-[11px] text-slate-500 capitalize">Log out of your {universeName} Universe account</p>
                </div>
              </button>
            </motion.section>

            {/* Footer */}
            <div className="text-center pb-8">
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">WealthVerse v4.0</p>
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#c6ff00] text-black px-6 py-3 rounded-full text-sm font-bold shadow-[0_10px_30px_rgba(198,255,0,0.2)] z-50 flex items-center gap-2"
          >
            <CheckCircle2 size={16} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </ProtectedRoute>
  )
}
