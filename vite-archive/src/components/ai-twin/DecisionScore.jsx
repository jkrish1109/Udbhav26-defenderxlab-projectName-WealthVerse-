import Card from '../common/Card'
import { BrainCircuit } from 'lucide-react'

export default function DecisionScore() {
  const score = 84

  return (
    <Card className="col-span-1 flex flex-col justify-center relative overflow-hidden group">
      <div className="absolute right-[-20%] top-[-20%] w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <BrainCircuit className="text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Decision Score</h3>
        </div>

        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="45" fill="none" stroke="#06b6d4" strokeWidth="8"
                strokeDasharray={`${(score / 100) * 283} 283`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-white">{score}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-emerald-400 font-medium">Excellent Financial Health</p>
          <p className="text-sm text-slate-400 mt-2">Your recent decisions align perfectly with your long-term goals.</p>
        </div>
      </div>
    </Card>
  )
}
