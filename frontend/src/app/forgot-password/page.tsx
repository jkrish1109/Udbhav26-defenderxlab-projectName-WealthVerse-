"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '../../components/common/Button'
import { Mail, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call for now
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex justify-center items-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <span className="text-3xl font-bold text-white">WealthVerse</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-2xl"
        >
          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <Link href="/login" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 w-fit">
                  <ArrowLeft size={16} />
                  Back to login
                </Link>
                <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
                <p className="text-slate-400">Enter your email address and we'll send you instructions to reset your password.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-4 flex items-center justify-center w-5 h-5 pointer-events-none">
                      <Mail className="text-slate-500" size={16} strokeWidth={1.5} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="premium-input w-full"
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full h-12 flex items-center justify-center gap-2 glow-emerald"
                  disabled={isLoading || !email}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-emerald-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Check your email</h2>
              <p className="text-slate-400 mb-8">
                We've sent password reset instructions to <span className="text-white font-medium">{email}</span>
              </p>
              <Link href="/login">
                <Button variant="primary" className="w-full justify-center">
                  Return to Login
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
