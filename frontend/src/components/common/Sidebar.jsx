"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Activity, Settings, Sprout, LogOut } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/store/slices/authSlice'

export default function Sidebar() {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useSelector((state) => state.auth)

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: Activity },
    { name: 'RuralVerse', path: '/gaonverse', icon: Sprout },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  const handleLogout = () => {
    dispatch(logout())
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('salaryProfile')
    }
    router.push('/login')
  }

  const firstName = user?.fullName?.split(' ')[0] || user?.name || 'U'

  return (
    <aside className="w-[88px] bg-[#111111] border-r border-white/[0.04] h-screen flex flex-col items-center py-8 justify-between sticky top-0">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <Link href="/dashboard">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#c6ff00] to-[#4d7cfe] flex items-center justify-center mb-2 shadow-[0_0_24px_rgba(198,255,0,0.2)] hover:shadow-[0_0_32px_rgba(198,255,0,0.35)] transition-all">
            <span className="text-black font-black text-xl">S</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.path
            return (
              <Link
                key={link.name}
                href={link.path}
                title={link.name}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#c6ff00] text-black shadow-[0_0_16px_rgba(198,255,0,0.25)]' 
                    : 'text-slate-600 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <link.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User Section */}
      <div className="flex flex-col items-center gap-4">
        <button 
          onClick={handleLogout}
          title="Sign Out"
          className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-600 hover:text-rose-400 hover:bg-rose-400/10 transition-all"
        >
          <LogOut size={20} strokeWidth={1.5} />
        </button>
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c6ff00]/20 to-[#4d7cfe]/20 flex items-center justify-center border border-white/[0.06]">
          <span className="text-white font-bold text-sm">{firstName[0]}</span>
        </div>
      </div>
    </aside>
  )
}
