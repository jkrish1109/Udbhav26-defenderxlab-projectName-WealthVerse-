import Card from '../common/Card'
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react'

export default function Recommendations() {
  const recs = [
    { id: 1, type: 'critical', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/20', text: "Your spending on 'Dining Out' has increased by 40% this month. Consider reducing it to stay on track for your New Car goal." },
    { id: 2, type: 'success', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/20', text: "Great job! You saved ₹15,000 extra this month. I recommend moving this to your Emergency Fund." },
    { id: 3, type: 'info', icon: Info, color: 'text-cyan-400', bg: 'bg-cyan-500/20', text: "Market conditions for your mutual fund portfolio are favorable. Consider increasing your SIP by 5%." },
  ]

  return (
    <Card className="col-span-1 md:col-span-2">
      <h3 className="text-xl font-bold text-white mb-6">AI Twin Recommendations</h3>
      
      <div className="space-y-4">
        {recs.map((rec) => (
          <div key={rec.id} className="flex gap-4 p-4 rounded-xl glass border-slate-700/50 hover:bg-slate-800 transition-colors">
            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${rec.bg} ${rec.color}`}>
              <rec.icon size={20} />
            </div>
            <div className="flex-1">
              <p className="text-slate-300 text-sm leading-relaxed">{rec.text}</p>
              <div className="mt-3 flex gap-2">
                <button className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full hover:bg-emerald-500/20 transition-colors">
                  Take Action
                </button>
                <button className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-700 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
