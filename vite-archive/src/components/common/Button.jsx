import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClass = "px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
  const variants = {
    primary: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/20",
    secondary: "glass hover:bg-slate-700/50 text-slate-200",
    outline: "border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
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
