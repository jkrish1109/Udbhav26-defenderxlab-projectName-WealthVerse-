import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GoalTracker() {
  const goals = [
    { name: 'Emergency Fund', current: 80000, target: 100000, color: '#c6ff00', ai: '80% completed. Stay consistent!' },
    { name: 'New Car (Tesla)', current: 1500000, target: 5000000, color: '#4d7cfe', ai: 'At current pace, goal completes in 8 months.' },
    { name: 'MacBook Pro', current: 120000, target: 250000, color: '#8b5cf6', ai: 'Consider increasing SIP by ₹2k to finish in 2 months.' },
  ];

  return (
    <div className="card-dashboard h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-white">Goal Progress</h3>
        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
          <Target size={20} />
        </div>
      </div>

      <div className="space-y-8">
        {goals.map((goal, i) => (
          <div key={i}>
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-white font-bold text-sm">{goal.name}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                  ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                </p>
              </div>
              <p className="text-white font-black text-sm">{Math.round((goal.current / goal.target) * 100)}%</p>
            </div>
            
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                className="h-full rounded-full"
                style={{ backgroundColor: goal.color, boxShadow: `0 0 10px ${goal.color}44` }}
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5">
              <TrendingUp size={10} className="text-slate-500" />
              <p className="text-[10px] text-slate-400 font-medium italic">
                <span className="font-bold text-white/50 uppercase mr-1">Coach:</span>
                {goal.ai}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
