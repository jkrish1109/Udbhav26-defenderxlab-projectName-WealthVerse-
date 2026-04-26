"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { loginSuccess } from '@/store/slices/authSlice'
import { RootState } from '@/store/store'
import Button from '../../components/common/Button'
import { Mail, ArrowRight, Lock, ShieldCheck } from 'lucide-react'
import LoginIllustration from '../../components/auth/LoginIllustration'

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001/api'

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!email) {
      setError('Please enter your email address')
      return
    }
    
    if (!password) {
      setError('Please enter your password')
      return
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error || 'Login failed')

      setSuccess('Login successful! Redirecting...')

      // Success - log in user
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
      console.error('Login error details:', err)
      if (err.message === 'Failed to fetch') {
        setError('Unable to connect to the server. Please make sure the backend is running.')
      } else {
        setError(err.message || 'Login failed. Please check your credentials.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const welcomeText = "Welcome Back :)".split("")

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col md:flex-row overflow-hidden">
      {/* Left Column: Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#1c1c1c] border-r border-white/5">
        <LoginIllustration />
      </div>

      {/* Right Column: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-24 bg-[#121212] relative">
        {/* Logo Mobile Only */}
        <div className="md:hidden absolute top-8 left-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c6ff00] to-[#4d7cfe] flex items-center justify-center">
              <span className="text-black font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-white">WealthVerse</span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-10">
              <motion.h1 className="text-4xl font-bold text-white mb-2 flex flex-wrap">
                {welcomeText.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: i * 0.05,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                    className={char === " " ? "mr-2" : ""}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
              <p className="text-slate-400">Enter your email and password to access your universe.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg text-sm"
                >
                  {success}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 flex items-center justify-center w-5 h-5 pointer-events-none">
                    <Mail className="text-slate-500" size={16} strokeWidth={1.5} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="premium-input w-full"
                    style={{ paddingLeft: '2.75rem' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 flex items-center justify-center w-5 h-5 pointer-events-none">
                    <Lock className="text-slate-500" size={16} strokeWidth={1.5} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="premium-input w-full"
                    style={{ paddingLeft: '2.75rem' }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-[#c6ff00] focus:ring-[#c6ff00]/50" />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-[#c6ff00] hover:text-[#c6ff00]/80 transition-colors">Forgot password?</Link>
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
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </form>

            {/* Security Note */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3 text-slate-500 text-xs">
                <ShieldCheck size={16} className="text-[#c6ff00]/60 shrink-0" />
                <span>Your data is encrypted end-to-end with bank-grade security. We never share your credentials.</span>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <Link href="/register" className="text-[#c6ff00] hover:text-[#c6ff00]/80 font-medium">Join WealthVerse</Link>
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 px-6 text-center text-slate-600 text-xs">
          © {new Date().getFullYear()} WealthVerse - Secure Financial Ecosystem.
        </div>
      </div>
    </div>
  )
}
