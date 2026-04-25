"use client"

import { useState, useEffect, useCallback } from 'react'
import { RefreshCw } from 'lucide-react'

interface CaptchaProps {
  onVerify: (isValid: boolean) => void
}

export default function Captcha({ onVerify }: CaptchaProps) {
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const generateCaptcha = useCallback(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCode(result)
    setInput('')
    setError(false)
    onVerify(false)
  }, [onVerify])

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase()
    setInput(val)
    if (val === code) {
      setError(false)
      onVerify(true)
    } else {
      onVerify(false)
    }
  }

  const validateOnBlur = () => {
    if (input !== code && input !== '') {
      setError(true)
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300">Security Verification</label>
      <div className="flex gap-4 items-center">
        <div className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-3 select-none flex justify-center items-center relative overflow-hidden group">
          {/* Captcha Noise/Background Effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             {[...Array(20)].map((_, i) => (
               <div 
                 key={i} 
                 className="absolute bg-[#c6ff00] rounded-full" 
                 style={{
                   width: Math.random() * 40,
                   height: 1,
                   top: Math.random() * 100 + '%',
                   left: Math.random() * 100 + '%',
                   transform: `rotate(${Math.random() * 360}deg)`
                 }}
               />
             ))}
          </div>
          
          <span className="text-2xl font-mono font-bold tracking-[0.5em] text-[#c6ff00] italic shadow-sm z-10">
            {code}
          </span>
          
          <button 
            type="button"
            onClick={generateCaptcha}
            className="absolute right-2 text-slate-500 hover:text-[#c6ff00] transition-colors p-1"
            title="Refresh Captcha"
          >
            <RefreshCw size={18} />
          </button>
        </div>
        
        <div className="flex-1">
          <input 
            type="text"
            value={input}
            onChange={handleInputChange}
            onBlur={validateOnBlur}
            placeholder="Type code"
            className={`w-full px-3 py-3 border rounded-lg shadow-sm bg-slate-800 text-white focus:outline-none sm:text-sm transition-all ${
              error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700 focus:ring-[#c6ff00] focus:border-[#c6ff00]'
            }`}
          />
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">Captcha code is incorrect. Please try again.</p>}
    </div>
  )
}
