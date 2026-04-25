import { motion } from 'framer-motion'
import { Mic, Volume2, Home, History, Languages } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function GaonVerse() {
  return (
    <div className="min-h-screen bg-orange-50 text-slate-800">
      {/* Top Bar */}
      <div className="bg-orange-500 text-white p-4 flex justify-between items-center shadow-md">
        <Link to="/" className="font-bold text-xl">WealthVerse <span className="text-sm font-normal">Gaon</span></Link>
        <button className="flex items-center gap-2 bg-orange-600 px-3 py-1.5 rounded-full text-sm">
          <Languages size={16} />
          हिन्दी (Hindi)
        </button>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-orange-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl -mr-10 -mt-10" />
          <p className="text-slate-500 font-medium mb-2 relative z-10">कुल बचत (Total Savings)</p>
          <h1 className="text-5xl font-extrabold text-orange-600 relative z-10">₹ 45,000</h1>
        </div>

        {/* Voice Assistant Button - Huge Touch Target */}
        <motion.div 
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 text-white rounded-[3rem] p-10 flex flex-col items-center justify-center shadow-xl shadow-orange-200 cursor-pointer"
        >
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <Mic size={48} />
          </div>
          <h2 className="text-2xl font-bold">बोल कर पूछें</h2>
          <p className="text-orange-100 mt-2">Tap to speak</p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <Volume2 size={28} />
            </div>
            <span className="font-semibold text-lg">सलाह सुनें<br/><span className="text-xs text-slate-400">Listen Advice</span></span>
          </button>
          <button className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <History size={28} />
            </div>
            <span className="font-semibold text-lg">लेन-देन<br/><span className="text-xs text-slate-400">History</span></span>
          </button>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full bg-white border-t border-slate-100 flex justify-around p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button className="flex flex-col items-center text-orange-500">
          <Home size={28} />
          <span className="text-xs mt-1 font-medium">होम</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <Mic size={28} />
          <span className="text-xs mt-1 font-medium">आवाज़</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <History size={28} />
          <span className="text-xs mt-1 font-medium">खाता</span>
        </button>
      </div>
    </div>
  )
}
