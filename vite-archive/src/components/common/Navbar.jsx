import { Link } from 'react-router-dom'
import Button from './Button'

export default function Navbar() {
  return (
    <nav className="glass border-b border-slate-700/50 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <span className="text-white font-bold text-xl">W</span>
        </div>
        <span className="text-2xl font-bold gradient-text tracking-tight">WealthVerse</span>
      </Link>
      <div className="flex gap-4">
        <Button variant="secondary">Login</Button>
        <Link to="/dashboard">
          <Button variant="primary">Enter Simulator</Button>
        </Link>
      </div>
    </nav>
  )
}
