"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '@/store/slices/authSlice'
import Button from '../../components/common/Button'
import { GraduationCap, Sprout, Briefcase, Building2, ArrowRight, User, Mail, Lock, ChevronLeft, Activity } from 'lucide-react'

const universes = [
  {
    id: 'student',
    title: 'Student Universe',
    description: 'Pocket money tracking, daily savings, and education goals.',
    icon: GraduationCap,
    color: 'emerald'
  },
  {
    id: 'rural',
    title: 'Rural Universe',
    description: 'Irregular income, family support, and micro-savings.',
    icon: Sprout,
    color: 'amber'
  },
  {
    id: 'loan',
    title: 'Loan Universe',
    description: 'EMI management, debt payoff, and credit health.',
    icon: Lock,
    color: 'rose'
  },
  {
    id: 'sip',
    title: 'SIP Investor',
    description: 'Portfolio growth, compounding, and wealth targets.',
    icon: Activity,
    color: 'blue'
  },
  {
    id: 'salaried',
    title: 'Salaried Pro',
    description: 'Tax optimization, GST estimator, and budget plans.',
    icon: Briefcase,
    color: 'indigo'
  },
  {
    id: 'business',
    title: 'Business Owner',
    description: 'Cash flow analytics, profit intelligence, and growth.',
    icon: Building2,
    color: 'purple'
  }
]

export default function Register() {
  const router = useRouter()
  const [step, setStep] = useState<'universe' | 'details'>('universe')
  const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001/api'

  const dispatch = useDispatch()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, universe: selectedUniverse }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Registration failed')

      // Success - log in user automatically
      dispatch(loginSuccess({
        user: data.user,
        token: data.token
      }))
      
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token)
      }
      
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Registration error:', err)
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#c6ff00]/5 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#4d7cfe]/5 blur-[120px]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-4xl relative z-10">
        <Link href="/" className="flex justify-center items-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c6ff00] to-[#4d7cfe] flex items-center justify-center">
            <span className="text-black font-bold text-xl">W</span>
          </div>
          <span className="text-3xl font-bold text-white">Student Universe</span>
        </Link>

        <AnimatePresence mode="wait">
          {step === 'universe' ? (
            <motion.div
              key="universe-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-4xl font-extrabold text-white mb-4">Choose Your Financial Universe</h2>
              <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
                We believe money is personal. Select the path that matches your real-life challenges to enter a tailored financial ecosystem.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {universes.map((univ) => {
                  const Icon = univ.icon
                  const isSelected = selectedUniverse === univ.id
                  return (
                    <motion.button
                      key={univ.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedUniverse(univ.id)}
                      className={`relative p-6 rounded-3xl border text-left transition-all group ${
                        isSelected 
                          ? 'bg-[#1c1c1c] border-[#c6ff00] ring-2 ring-[#c6ff00]/50' 
                          : 'bg-[#1c1c1c]/50 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                        isSelected ? 'bg-[#c6ff00] text-black' : 'bg-[#121212] text-slate-400 group-hover:text-white'
                      }`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{univ.title}</h3>
                      <p className="text-sm text-slate-500 group-hover:text-slate-400">{univ.description}</p>
                      
                      {isSelected && (
                        <motion.div 
                          layoutId="selected-check"
                          className="absolute top-4 right-4 w-6 h-6 bg-[#c6ff00] rounded-full flex items-center justify-center"
                        >
                          <ArrowRight size={14} className="text-black" />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <div className="mt-12">
                <Button 
                  variant="primary" 
                  disabled={!selectedUniverse}
                  onClick={() => setStep('details')}
                  className="px-12 py-3 rounded-2xl h-auto text-lg glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Journey
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md mx-auto"
            >
              <button 
                onClick={() => setStep('universe')}
                className="mb-8 flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={18} />
                Change Universe
              </button>

              <div className="bg-[#1c1c1c] border border-white/5 p-8 rounded-[2rem] shadow-2xl">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                  <p className="text-slate-400">Joining the <span className="text-[#c6ff00] font-medium capitalize">{selectedUniverse}</span> Universe</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Full Name"
                      className="premium-input w-full pl-12"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Email Address"
                      className="premium-input w-full pl-12"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Password"
                      className="premium-input w-full pl-12"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full h-12 flex items-center justify-center gap-2 glow-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-[#121212]/30 border-t-[#121212] rounded-full animate-spin" />
                    ) : (
                      <>
                        Begin Experience
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </div>

              <p className="mt-8 text-center text-slate-500">
                Already part of a universe?{' '}
                <Link href="/login" className="text-[#c6ff00] hover:text-[#c6ff00]/80 font-medium">Sign In</Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
