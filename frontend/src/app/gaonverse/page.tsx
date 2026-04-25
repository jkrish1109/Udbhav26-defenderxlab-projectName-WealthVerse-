"use client"
import { useState, useMemo } from 'react'
import Sidebar from '../../components/common/Sidebar'
import { motion } from 'framer-motion'
import { Sprout, Shield, ChevronRight, Zap, Sun } from 'lucide-react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import VoiceAssistant from '../../components/dashboard/VoiceAssistant'

export default function RuralVerse() {
  const { user } = useSelector((state: RootState) => state.auth)
  const firstName = user?.fullName?.split(' ')[0] || 'दोस्त'
  const [dailyIncome, setDailyIncome] = useState(500)

  const ai = useMemo(() => {
    const w = dailyIncome * 6, m = dailyIncome * 25
    const save = Math.round(m * 0.15), need = Math.round(m * 0.6)
    const fam = Math.round(m * 0.2), emg = Math.round(m * 0.05)
    const dailySave = Math.round(dailyIncome * 0.1)
    const yearlySave = dailySave * 365
    const tier = dailyIncome < 300 ? 'low' : dailyIncome < 800 ? 'mid' : 'high'

    const tips = tier === 'low' ? [
      { t: `रोज़ ₹${dailySave} बचाओ — महीने में ₹${dailySave*30} बन जाएगा!`, i: '💰' },
      { t: 'चाय-नाश्ते पर खर्च कम करो, घर का खाना लाओ।', i: '☕' },
      { t: 'PM किसान योजना के लिए अप्लाई करो — ₹6,000/साल मिलेगा।', i: '🏛️' },
      { t: `महीने की कमाई ₹${m} है — ₹${need} से ज़्यादा खर्च मत करो।`, i: '⚠️' },
    ] : tier === 'mid' ? [
      { t: `₹${dailySave}/दिन बचाकर साल में ₹${yearlySave.toLocaleString('en-IN')} जमा करो!`, i: '💰' },
      { t: `₹500/महीना SIP शुरू करो — 10 साल में ₹1.2 लाख+ बनेगा।`, i: '📈' },
      { t: 'फसल बीमा ज़रूर करवाओ — बारिश से पहले अप्लाई करो।', i: '🌧️' },
      { t: `कुल कमाई ₹${m}/महीना — बजट: ज़रूरत ₹${need}, बचत ₹${save}`, i: '📊' },
    ] : [
      { t: `अच्छी कमाई! ₹${save}/महीना बचत + ₹${Math.round(m*0.1)} SIP में लगाओ।`, i: '🚀' },
      { t: 'गोल्ड या म्यूचुअल फंड में निवेश का सही समय है।', i: '🥇' },
      { t: 'मुद्रा लोन से बिज़नेस बढ़ाओ — ₹10 लाख तक मिलता है।', i: '🏦' },
      { t: `₹${dailySave}/दिन बचत = साल में ₹${yearlySave.toLocaleString('en-IN')}!`, i: '💰' },
    ]
    return { w, m, save, need, fam, emg, dailySave, yearlySave, tier, tips }
  }, [dailyIncome])

  const goals = [
    { name: 'बेटी की शादी', target: 200000, saved: 85000, emoji: '💍' },
    { name: 'ट्रैक्टर खरीदना', target: 500000, saved: 120000, emoji: '🚜' },
    { name: 'इमरजेंसी फंड', target: 50000, saved: 32000, emoji: '🏥' },
    { name: 'बच्चे की पढ़ाई', target: 100000, saved: 45000, emoji: '📚' },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#080808] flex overflow-hidden font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
          <div className="max-w-[1440px] mx-auto space-y-6">

            {/* हैडर */}
            <header className="flex justify-between items-start">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400"><Sprout size={16} /></div>
                  <span className="text-[10px] font-bold uppercase text-amber-400/80 tracking-[0.2em]">RuralVerse — गाँव का अपना फाइनेंस</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  नमस्ते, <span className="text-amber-400">{firstName}!</span>
                </h1>
                <p className="text-slate-500 text-xs mt-1">आसान पैसा। समझदार फ़ैसले। आपका अपना गाइड।</p>
              </motion.div>
            </header>



            {/* पंक्ति 1: दैनिक आय + AI सलाहकार */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="card-dashboard">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-lg font-black text-white mb-1">💰 आज की कमाई</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">रोज़ाना आय ट्रैकर</p>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-amber-400/10 text-amber-400 text-[10px] font-bold uppercase">
                    <Sun size={10} className="inline mr-1" /> लाइव
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-slate-500 text-sm">₹</span>
                  <input type="number" value={dailyIncome} onChange={e => setDailyIncome(parseInt(e.target.value) || 0)}
                    className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-2xl font-black text-white focus:outline-none focus:border-amber-400/40 transition-all" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'हफ़्ता', value: ai.w, color: '#c6ff00' },
                    { label: 'महीना (अंदाज़ा)', value: ai.m, color: '#4d7cfe' },
                    { label: 'बचत लक्ष्य', value: ai.save, color: '#f59e0b' },
                  ].map((s, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">{s.label}</p>
                      <p className="text-sm font-black text-white">₹{s.value.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-dashboard">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400"><Zap size={18} /></div>
                  <div>
                    <h3 className="text-lg font-black text-white">AI सलाहकार</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {ai.tier === 'low' ? '🛡️ बचत मोड' : ai.tier === 'mid' ? '⚖️ संतुलित' : '🚀 ग्रोथ मोड'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {ai.tips.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-start gap-3 hover:bg-white/[0.04] transition-all">
                      <span className="text-xl shrink-0">{msg.i}</span>
                      <p className="text-[12px] text-slate-300 leading-relaxed font-medium">{msg.t}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* पंक्ति 2: बजट + गुल्लक + सेहत */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="card-dashboard">
                <h3 className="text-base font-black text-white mb-4">📊 बजट बाँटना</h3>
                <div className="h-4 w-full rounded-full overflow-hidden flex mb-5 bg-white/[0.04]">
                  {[{ p: 60, c: '#f43f5e' }, { p: 20, c: '#c6ff00' }, { p: 15, c: '#4d7cfe' }, { p: 5, c: '#f59e0b' }].map((b, i) => (
                    <motion.div key={i} className="h-full" style={{ backgroundColor: b.c }}
                      initial={{ width: 0 }} animate={{ width: `${b.p}%` }} transition={{ duration: 1, delay: i * 0.15 }} />
                  ))}
                </div>
                {[
                  { label: 'ज़रूरत (राशन, बिल)', amount: ai.need, pct: 60, color: '#f43f5e' },
                  { label: 'परिवार', amount: ai.fam, pct: 20, color: '#c6ff00' },
                  { label: 'बचत', amount: ai.save, pct: 15, color: '#4d7cfe' },
                  { label: 'इमरजेंसी', amount: ai.emg, pct: 5, color: '#f59e0b' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/[0.03] last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
                      <span className="text-[11px] text-slate-400">{b.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-white">₹{b.amount.toLocaleString('en-IN')}</span>
                      <span className="text-[9px] text-slate-500 ml-1.5">{b.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-dashboard">
                <h3 className="text-base font-black text-white mb-4">🐖 गुल्लक — छोटी बचत</h3>
                <div className="text-center py-4">
                  <p className="text-4xl font-black text-amber-400">₹{ai.dailySave}</p>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">रोज़ बचाओ — साल में ₹{ai.yearlySave.toLocaleString('en-IN')}</p>
                </div>
                <div className="mt-4 space-y-2.5">
                  {[
                    { label: 'चाय का पैसा बचाओ', save: `₹${Math.max(10, Math.round(dailyIncome*0.04))}/दिन`, icon: '☕' },
                    { label: 'हफ़्तेवारी SIP', save: `₹${Math.round(ai.w*0.05)}/हफ़्ता`, icon: '📈' },
                    { label: 'सोना/चिट फंड बचत', save: `₹${Math.round(ai.m*0.03)}/महीना`, icon: '🥇' },
                  ].map((t, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center gap-3">
                      <span className="text-lg">{t.icon}</span>
                      <div className="flex-1"><p className="text-[11px] text-white font-semibold">{t.label}</p></div>
                      <span className="text-[10px] font-bold text-amber-400">{t.save}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-dashboard">
                <h3 className="text-base font-black text-white mb-4">❤️ पैसों की सेहत</h3>
                <div className="flex items-center justify-center my-4">
                  <div className="relative">
                    <svg viewBox="0 0 120 120" className="w-28 h-28 -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
                      <motion.circle cx="60" cy="60" r="50" fill="none" stroke="#c6ff00" strokeWidth="10"
                        strokeLinecap="round" strokeDasharray={`${(ai.tier === 'low' ? 50 : ai.tier === 'mid' ? 70 : 88) * 3.14} 314`}
                        initial={{ strokeDasharray: '0 314' }}
                        animate={{ strokeDasharray: `${(ai.tier === 'low' ? 50 : ai.tier === 'mid' ? 70 : 88) * 3.14} 314` }}
                        transition={{ duration: 1.5 }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-[#c6ff00]">{ai.tier === 'low' ? 50 : ai.tier === 'mid' ? 70 : 88}</span>
                      <span className="text-[8px] font-bold text-slate-500 uppercase">स्कोर</span>
                    </div>
                  </div>
                </div>
                {[
                  { label: 'कमाई स्थिरता', score: ai.tier === 'low' ? 40 : ai.tier === 'mid' ? 65 : 85 },
                  { label: 'बचत दर', score: ai.tier === 'low' ? 30 : ai.tier === 'mid' ? 70 : 90 },
                  { label: 'कर्ज़ सुरक्षा', score: 85 },
                ].map((m, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-slate-400">{m.label}</span>
                      <span className="text-[10px] font-bold text-white">{m.score}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full bg-[#c6ff00]" initial={{ width: 0 }}
                        animate={{ width: `${m.score}%` }} transition={{ duration: 1, delay: 0.3 + i * 0.15 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* पंक्ति 3: लक्ष्य + कर्ज़ + सरकारी योजनाएँ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="card-dashboard">
                <h3 className="text-base font-black text-white mb-4">🎯 सपने — लक्ष्य ट्रैकर</h3>
                <div className="space-y-3">
                  {goals.map((g, i) => {
                    const pct = Math.round((g.saved / g.target) * 100)
                    return (
                      <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{g.emoji}</span>
                            <span className="text-xs font-bold text-white">{g.name}</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#c6ff00]">{pct}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                          <motion.div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#c6ff00]"
                            initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: i * 0.1 }} />
                        </div>
                        <p className="text-[9px] text-slate-500 mt-1.5">₹{g.saved.toLocaleString('en-IN')} / ₹{g.target.toLocaleString('en-IN')}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="card-dashboard">
                <h3 className="text-base font-black text-white mb-4">🏦 कर्ज़ / EMI कैलेंडर</h3>
                <div className="space-y-3">
                  {[
                    { name: 'किसान क्रेडिट कार्ड', emi: 2000, due: '28 अप्रैल', status: 'जल्दी', color: '#f59e0b' },
                    { name: 'ट्रैक्टर लोन', emi: 5000, due: '5 मई', status: 'सुरक्षित', color: '#c6ff00' },
                    { name: 'गोल्ड लोन', emi: 1500, due: '15 मई', status: 'सुरक्षित', color: '#4d7cfe' },
                  ].map((l, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">{l.name}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">EMI: ₹{l.emi.toLocaleString('en-IN')} • तारीख: {l.due}</p>
                      </div>
                      <div className="px-2 py-1 rounded-lg text-[9px] font-bold" style={{ backgroundColor: `${l.color}15`, color: l.color }}>
                        {l.status === 'जल्दी' ? '⏰ जल्दी' : '✅ सुरक्षित'}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl bg-amber-400/5 border border-amber-400/10">
                  <p className="text-[10px] text-slate-300">
                    <span className="text-amber-400 font-black mr-1">AI:</span>
                    कुल EMI ₹8,500/महीना — कमाई का {ai.m > 0 ? Math.round(8500 / ai.m * 100) : 0}%। {ai.m > 0 && 8500/ai.m < 0.4 ? 'सुरक्षित है।' : 'सावधान रहें!'}
                  </p>
                </div>
              </div>

              <div className="card-dashboard">
                <h3 className="text-base font-black text-white mb-4">🏛️ सरकारी योजनाएँ</h3>
                <div className="space-y-3">
                  {[
                    { name: 'PM किसान सम्मान निधि', benefit: '₹6,000/साल', status: 'पात्र हैं' },
                    { name: 'फसल बीमा योजना', benefit: 'फसल इंश्योरेंस', status: 'अप्लाई करें' },
                    { name: 'मुद्रा लोन', benefit: '₹10 लाख तक', status: 'जाँचें' },
                  ].map((s, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between group hover:bg-white/[0.04] transition-all cursor-pointer">
                      <div>
                        <p className="text-xs font-bold text-white">{s.name}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{s.benefit}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-[10px] font-bold">
                        {s.status} <ChevronRight size={12} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl bg-[#c6ff00]/5 border border-[#c6ff00]/10">
                  <p className="text-[10px] text-slate-300">
                    <span className="text-[#c6ff00] font-black mr-1">AI:</span>
                    आप PM किसान के लिए पात्र हैं। ₹6,000/साल मिल सकता है — अभी अप्लाई करें!
                  </p>
                </div>
              </div>
            </div>

            {/* सुरक्षा अलर्ट */}
            <div className="card-dashboard">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400"><Shield size={18} /></div>
                <div>
                  <h3 className="text-base font-black text-white">🚨 सुरक्षा अलर्ट</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">वित्तीय सुरक्षा कवच</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { title: 'फ्रॉड अलर्ट', desc: 'OTP या बैंक डिटेल्स फ़ोन पर कभी न बताएँ। कोई भी बैंक नहीं माँगता।', color: '#f43f5e', icon: '🚫' },
                  { title: 'साहूकार चेतावनी', desc: 'ज़्यादा ब्याज़ वाले लोन से बचें। मुद्रा लोन ट्राई करें।', color: '#f59e0b', icon: '⚠️' },
                  { title: 'बीमा रिमाइंडर', desc: 'फसल बीमा अभी करवा लें — मानसून से पहले ज़रूरी है।', color: '#4d7cfe', icon: '🛡️' },
                ].map((a, i) => (
                  <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: `${a.color}08`, borderColor: `${a.color}15` }}>
                    <p className="text-sm font-bold text-white mb-1">{a.icon} {a.title}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <footer className="pt-6 border-t border-white/[0.04] flex justify-between items-center">
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.15em]">RuralVerse v1.0 — गाँव का अपना फाइनेंस</p>
              <span className="text-[10px] font-bold text-amber-400/60 uppercase tracking-widest flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> AI सलाहकार सक्रिय
              </span>
            </footer>
          </div>
        </main>
      </div>

      {/* Voice Assistant */}
      <VoiceAssistant dailyIncome={dailyIncome} monthlyEst={ai.m} savings={ai.save} />
    </ProtectedRoute>
  )
}
