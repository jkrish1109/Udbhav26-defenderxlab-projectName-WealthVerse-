import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { motion } from 'framer-motion'
import { TrendingUp, MessageSquareCode } from 'lucide-react'

export default function SpendingChart() {
  const data = [
    { name: 'Jan', value: 400000 },
    { name: 'Feb', value: 450000 },
    { name: 'Mar', value: 420000 },
    { name: 'Apr', value: 580000 },
    { name: 'May', value: 650000 },
    { name: 'Jun', value: 874500 },
  ]

  return (
    <div className="card-dashboard relative overflow-hidden group">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#c6ff00]/5 blur-3xl group-hover:bg-[#c6ff00]/10 transition-all duration-500" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-black text-white">Net Worth Growth</h3>
            <span className="bg-[#c6ff00]/10 text-[#c6ff00] text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">+12.5%</span>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-60">Real-time Asset Simulation</p>
        </div>
        
        <div className="flex gap-2">
          {['1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
            <button key={range} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${range === 'ALL' ? 'bg-[#c6ff00] text-black shadow-[0_0_15px_#c6ff00]' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}>
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c6ff00" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#c6ff00" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 800 }} 
              dy={15} 
            />
            <YAxis hide={true} domain={['dataMin - 100000', 'dataMax + 100000']} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1c1c1c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', color: '#fff', padding: '1rem' }}
              itemStyle={{ color: '#c6ff00', fontWeight: 'bold' }}
              cursor={{ stroke: '#c6ff00', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#c6ff00" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              dot={{ r: 0 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#c6ff00', shadow: '0 0 15px #c6ff00' }}
              isAnimationActive={true}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 flex items-start gap-4 p-5 rounded-[2rem] bg-white/[0.03] border border-white/5">
        <div className="w-10 h-10 rounded-2xl bg-[#4d7cfe]/10 flex items-center justify-center text-[#4d7cfe] shrink-0">
          <MessageSquareCode size={20} />
        </div>
        <div>
          <p className="text-white text-xs leading-relaxed">
            <span className="text-[#4d7cfe] font-black uppercase mr-2 tracking-widest">AI Trend Analysis:</span>
            Your net worth grew <span className="text-[#c6ff00] font-bold">₹1.5L (8%)</span> this month. 
            Reduce spending on 'Electronics' to improve next week's growth potential by <span className="text-[#c6ff00] font-bold">2.4%</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
