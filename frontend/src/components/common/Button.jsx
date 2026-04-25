import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClass = "px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
  const variants = {
    primary: "bg-gradient-to-r from-[#c6ff00] to-[#a3d900] hover:from-[#d4ff33] hover:to-[#c6ff00] text-[#121212] shadow-[#c6ff00]/20",
    secondary: "bg-gradient-to-r from-[#4d7cfe] to-[#3a60d1] hover:from-[#6a91ff] hover:to-[#4d7cfe] text-white shadow-[#4d7cfe]/20",
    outline: "border border-[#c6ff00]/50 text-[#c6ff00] hover:bg-[#c6ff00]/10",
    ghost: "glass hover:bg-white/5 text-slate-200"
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClass} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </motion.button>
  )
}
