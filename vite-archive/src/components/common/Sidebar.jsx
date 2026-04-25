import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Target, Activity, Settings, Mic } from 'lucide-react'

export default function Sidebar() {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: Activity },
    { name: 'Goals', path: '/goals', icon: Target },
    { name: 'GaonVerse', path: '/gaonverse', icon: Mic },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  return (
    <aside className="w-64 glass border-r border-slate-700/50 h-[calc(100vh-73px)] hidden md:block">
      <div className="p-6">
        <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-4">Menu</p>
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 font-medium' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`
              }
            >
              <link.icon size={20} />
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
