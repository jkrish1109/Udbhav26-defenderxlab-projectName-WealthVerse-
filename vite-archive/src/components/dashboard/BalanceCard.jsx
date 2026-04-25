import Card from '../common/Card'
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react'

export default function BalanceCard() {
  return (
    <Card className="col-span-1 md:col-span-2 relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-slate-400 font-medium mb-1">Total Net Worth</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">₹ 12,45,000</h2>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full text-sm font-medium">
            <TrendingUp size={16} />
            <span>+12.5%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="glass rounded-xl p-4 border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ArrowUpRight size={18} />
              </div>
              <span className="text-sm font-medium">Monthly Income</span>
            </div>
            <p className="text-2xl font-semibold text-white">₹ 85,000</p>
          </div>
          
          <div className="glass rounded-xl p-4 border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                <ArrowDownRight size={18} />
              </div>
              <span className="text-sm font-medium">Monthly Expenses</span>
            </div>
            <p className="text-2xl font-semibold text-white">₹ 42,300</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
