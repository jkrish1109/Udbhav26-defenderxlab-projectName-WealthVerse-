"use client"
import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, X, MessageCircle } from 'lucide-react'

export default function VoiceAssistant({ dailyIncome = 500, monthlyEst = 12500, savings = 1875 }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'नमस्ते! मैं आपका AI सलाहकार हूँ। बोलिए या टाइप करें — मैं मदद करूँगा।' }
  ])
  const [inputText, setInputText] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    document.addEventListener('open-voice-assistant', handleOpen)
    return () => document.removeEventListener('open-voice-assistant', handleOpen)
  }, [])

  const getAIResponse = useCallback((query) => {
    const q = query.toLowerCase()
    const daily = dailyIncome
    const monthly = monthlyEst
    const save = savings
    const dailySave = Math.round(daily * 0.1)

    if (q.includes('कमाई') || q.includes('kamai') || q.includes('income') || q.includes('earning')) {
      return `आपकी रोज़ की कमाई ₹${daily} है। हफ़्ते में ₹${daily * 6} और महीने में लगभग ₹${monthly.toLocaleString('en-IN')} होता है।`
    }
    if (q.includes('बचत') || q.includes('bachat') || q.includes('saving') || q.includes('save')) {
      return `आपको रोज़ ₹${dailySave} बचाना चाहिए। महीने में ₹${save.toLocaleString('en-IN')} और साल में ₹${(dailySave * 365).toLocaleString('en-IN')} जमा हो जाएगा!`
    }
    if (q.includes('खर्च') || q.includes('kharcha') || q.includes('spend') || q.includes('expense')) {
      return `महीने का बजट: ज़रूरत पर ₹${Math.round(monthly * 0.6).toLocaleString('en-IN')}, परिवार ₹${Math.round(monthly * 0.2).toLocaleString('en-IN')}, बचत ₹${save.toLocaleString('en-IN')}। इससे ज़्यादा खर्च मत करें!`
    }
    if (q.includes('emi') || q.includes('कर्ज') || q.includes('loan') || q.includes('karz')) {
      return `आपकी कुल EMI ₹8,500/महीना है। अगला भुगतान 28 अप्रैल को है। कमाई का ${monthly > 0 ? Math.round(8500 / monthly * 100) : 0}% कर्ज़ पर जा रहा है।`
    }
    if (q.includes('योजना') || q.includes('scheme') || q.includes('yojana') || q.includes('sarkari')) {
      return 'आप PM किसान सम्मान निधि (₹6,000/साल), फसल बीमा योजना और मुद्रा लोन (₹10 लाख तक) के लिए पात्र हैं। अभी अप्लाई करें!'
    }
    if (q.includes('sip') || q.includes('invest') || q.includes('निवेश')) {
      return `₹${Math.round(monthly * 0.05)}/महीना SIP शुरू करें। 10 साल में ₹${Math.round(monthly * 0.05 * 12 * 10 * 1.5).toLocaleString('en-IN')}+ बन सकता है!`
    }
    if (q.includes('हेल्लो') || q.includes('hello') || q.includes('नमस्ते') || q.includes('hi')) {
      return 'नमस्ते! बताइए क्या जानना है — कमाई, बचत, खर्चा, कर्ज़, या सरकारी योजना?'
    }
    if (q.includes('help') || q.includes('मदद') || q.includes('kya')) {
      return 'आप मुझसे पूछ सकते हैं: "आज की कमाई बताओ", "कितना बचाऊँ?", "EMI कब है?", "कौन सी योजना मिलेगी?"'
    }
    return `आपने कहा: "${query}"। मैं कमाई, बचत, खर्च, कर्ज़, और सरकारी योजनाओं के बारे में बता सकता हूँ। कुछ और पूछें!`
  }, [dailyIncome, monthlyEst, savings])

  const speak = useCallback((text) => {
    if (typeof window === 'undefined') return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'hi-IN'
    utter.rate = 0.9
    utter.pitch = 1
    const voices = window.speechSynthesis.getVoices()
    const hindiVoice = voices.find(v => v.lang.startsWith('hi'))
    if (hindiVoice) utter.voice = hindiVoice
    window.speechSynthesis.speak(utter)
  }, [])

  const handleSend = useCallback((text) => {
    if (!text.trim()) return
    const userMsg = text.trim()
    const response = getAIResponse(userMsg)
    setMessages(prev => [...prev, { role: 'user', text: userMsg }, { role: 'ai', text: response }])
    setInputText('')
    setTranscript('')
    speak(response)
  }, [getAIResponse, speak])

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setMessages(prev => [...prev, { role: 'ai', text: 'माफ़ करें, आपके ब्राउज़र में आवाज़ पहचान काम नहीं करती। Chrome इस्तेमाल करें।' }])
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'hi-IN'
    recognition.interimResults = true
    recognition.continuous = false

    recognition.onstart = () => setIsListening(true)
    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1]
      setTranscript(result[0].transcript)
      if (result.isFinal) {
        handleSend(result[0].transcript)
        setIsListening(false)
      }
    }
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }, [handleSend])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }, [])

  return (
    <>
      {/* Floating Button */}
      <button onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-2xl bg-amber-400 text-black flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:scale-105 transition-all z-50">
        <Mic size={28} />
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[380px] max-h-[600px] rounded-3xl bg-[#111] border border-white/[0.06] shadow-2xl z-50 flex flex-col overflow-hidden">

            {/* Header */}
            <div className="p-5 border-b border-white/[0.06] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-black">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-white">AI सलाहकार</p>
                  <p className="text-[9px] text-amber-400 font-bold uppercase tracking-widest">
                    {isListening ? '🔴 सुन रहा हूँ...' : '🟢 तैयार'}
                  </p>
                </div>
              </div>
              <button onClick={() => { setIsOpen(false); window.speechSynthesis?.cancel() }}
                className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-500 hover:text-white transition-all">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar" style={{ maxHeight: '380px' }}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[12px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-400 text-black font-semibold rounded-br-md'
                      : 'bg-white/[0.04] text-slate-300 border border-white/[0.06] rounded-bl-md'
                  }`}>
                    {msg.text}
                    {msg.role === 'ai' && (
                      <button onClick={() => speak(msg.text)}
                        className="mt-2 flex items-center gap-1 text-[9px] text-amber-400/70 hover:text-amber-400 transition-colors">
                        <Volume2 size={10} /> सुनें
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {isListening && transcript && (
                <div className="flex justify-end">
                  <div className="max-w-[85%] px-4 py-3 rounded-2xl bg-amber-400/20 text-amber-300 text-[12px] border border-amber-400/20 rounded-br-md italic">
                    {transcript}...
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto shrink-0 border-t border-white/[0.04]">
              {['कमाई बताओ', 'कितना बचाऊँ?', 'EMI कब है?', 'योजनाएँ'].map((q, i) => (
                <button key={i} onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] text-[10px] text-slate-400 font-bold whitespace-nowrap hover:bg-amber-400/10 hover:text-amber-400 transition-all border border-white/[0.04]">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/[0.06] flex items-center gap-3 shrink-0">
              <input type="text" value={inputText} onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(inputText)}
                placeholder="टाइप करें या बोलें..."
                className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400/30" />
              <button onClick={isListening ? stopListening : startListening}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                    : 'bg-amber-400 text-black hover:scale-105'
                }`}>
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
