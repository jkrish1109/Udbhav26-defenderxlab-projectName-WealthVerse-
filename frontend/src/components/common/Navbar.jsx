import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 px-8 py-5 flex justify-between items-center" style={{ background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c6ff00] to-[#4d7cfe] flex items-center justify-center shadow-lg shadow-[#c6ff00]/20">
          <span className="text-black font-black text-lg">W</span>
        </div>
        <span className="text-xl font-black text-white tracking-tight">WealthVerse</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link href="/register" className="px-5 py-2.5 rounded-xl bg-[#c6ff00] text-black text-sm font-bold hover:bg-[#d4ff33] transition-all shadow-[0_0_20px_rgba(198,255,0,0.15)]">
          Get Started
        </Link>
      </div>
    </nav>
  )
}
