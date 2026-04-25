import Card from '../common/Card'
import { Target } from 'lucide-react'

export default function GoalTracker() {
  const goals = [
    { name: 'Emergency Fund', target: 500000, current: 350000, color: 'bg-emerald-500' },
    { name: 'New Car', target: 1200000, current: 200000, color: 'bg-cyan-500' },
  ]

  return (
    <Card className="col-span-1">
      <div className="flex items-center gap-2 mb-6">
        <Target className="text-emerald-400" />
        <h3 className="text-xl font-bold text-white">Active Goals</h3>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.current / goal.target) * 100))
          return (
            <div key={goal.name}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-200 font-medium">{goal.name}</span>
                <span className="text-slate-400">{percent}%</span>
              </div>
              <div className="w-full bg-slate-700/50 h-2.5 rounded-full overflow-hidden mb-1">
                <div 
                  className={`h-full rounded-full ${goal.color}`} 
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>₹{(goal.current/100000).toFixed(1)}L</span>
                <span>₹{(goal.target/100000).toFixed(1)}L</span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
