import Card from '../common/Card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function SpendingChart() {
  const data = [
    { name: 'Mon', spend: 400 },
    { name: 'Tue', spend: 300 },
    { name: 'Wed', spend: 550 },
    { name: 'Thu', spend: 200 },
    { name: 'Fri', spend: 800 },
    { name: 'Sat', spend: 1200 },
    { name: 'Sun', spend: 600 },
  ]

  return (
    <Card className="col-span-1 md:col-span-3">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Spending Analytics</h3>
        <select className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-1 outline-none">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <Tooltip 
              cursor={{ fill: '#334155', opacity: 0.4 }}
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: '#10b981' }}
            />
            <Bar dataKey="spend" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
