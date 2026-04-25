import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { TrendingUp, ShieldCheck, Cpu } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px]" />
      
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="px-4 py-1.5 rounded-full glass border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6 inline-block shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              India's Next-Gen Financial Simulator
            </span>
            <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
              Master Your Money with <br />
              <span className="gradient-text">AI & Simulation</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Learn, simulate, and grow your wealth using our advanced AI Twin technology and hyper-realistic financial engine built for India.
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/dashboard">
                <Button variant="primary" className="text-lg px-8 py-4">Enter Simulator</Button>
              </Link>
              <Button variant="outline" className="text-lg px-8 py-4">Watch Demo</Button>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            { icon: TrendingUp, title: "Hyper-Realistic Simulation", desc: "Test strategies before risking real money with our India-focused financial engine." },
            { icon: Cpu, title: "AI Twin Recommendations", desc: "Your personal AI analyzes your habits and gives actionable wealth-building advice." },
            { icon: ShieldCheck, title: "Bank-Grade Security", desc: "Your data is encrypted and secure. Connect accounts safely when you are ready." }
          ].map((feature, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 + 0.4 }}>
              <Card className="h-full border-t border-t-emerald-500/20">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
