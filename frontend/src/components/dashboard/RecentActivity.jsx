import Card from '../common/Card'
import { ShoppingBag, Coffee, ArrowUpRight } from 'lucide-react'

export default function RecentActivity() {
  const activities = [
    { id: 1, title: 'Amazon Shopping', type: 'expense', amount: 4500, date: 'Today, 2:30 PM', icon: ShoppingBag, color: 'text-orange-400', bg: 'bg-orange-500/20' },
    { id: 2, title: 'Salary Credited', type: 'income', amount: 85000, date: 'Yesterday', icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    { id: 3, title: 'Starbucks', type: 'expense', amount: 350, date: 'Mon, 9:15 AM', icon: Coffee, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  ]

  return (
    <Card className="col-span-1 md:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
        <button className="text-sm text-emerald-400 hover:text-emerald-300">View All</button>
      </div>

      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}>
                <item.icon size={18} />
              </div>
              <div>
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-xs text-slate-400">{item.date}</p>
              </div>
            </div>
            <div className={`font-semibold ${item.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
              {item.type === 'income' ? '+' : '-'} ₹{item.amount}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
