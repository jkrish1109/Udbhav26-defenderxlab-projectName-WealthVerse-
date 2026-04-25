import { LineChart, Line, ResponsiveContainer } from 'recharts'

export default function BalanceCard() {
  const data = [{ v: 400 }, { v: 600 }, { v: 500 }, { v: 700 }, { v: 600 }, { v: 800 }, { v: 750 }]
  
  return (
    <div className="bg-[#1c1c1c] rounded-[2rem] p-6 border border-white/5 relative overflow-hidden h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-slate-500 text-[10px] uppercase tracking-widest font-black">Total Balance</h4>
          <span className="text-[10px] text-slate-500 font-bold">Today</span>
        </div>
        
        <div className="h-16 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line 
                type="monotone" 
                dataKey="v" 
                stroke="#c6ff00" 
                strokeWidth={3} 
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-4xl font-black text-white">₹8,74,500</p>
        <div className="flex justify-between items-end mt-4">
          <div className="text-[10px]">
            <span className="text-slate-500 block uppercase font-black mb-1 opacity-50">Goal</span>
            <span className="text-white font-black text-xs">₹10,00,000</span>
          </div>
          <div className="text-[10px] text-right">
            <span className="text-slate-500 block uppercase font-black mb-1 opacity-50">Average</span>
            <span className="text-white font-black text-xs">₹9,45,000</span>
          </div>
        </div>
      </div>
    </div>
  )
}
