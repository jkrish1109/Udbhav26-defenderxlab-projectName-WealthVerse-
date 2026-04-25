import { useState } from 'react'
import Card from '../common/Card'

export default function EMICalculator() {
  const [loan, setLoan] = useState(1000000)
  const [rate, setRate] = useState(9.5)
  const [tenure, setTenure] = useState(5)

  const r = rate / 12 / 100
  const n = tenure * 12
  const emi = loan * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))
  const totalPayment = emi * n
  const totalInterest = totalPayment - loan

  return (
    <Card className="col-span-1">
      <h3 className="text-xl font-bold text-white mb-6">EMI Calculator</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-xs text-slate-400">Loan Amount</label>
          <div className="flex bg-slate-800 rounded-lg p-2 mt-1">
            <span className="text-slate-400 px-2">₹</span>
            <input 
              type="number" value={loan} onChange={(e) => setLoan(Number(e.target.value))}
              className="bg-transparent text-white outline-none w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400">Interest (%)</label>
            <input 
              type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}
              className="bg-slate-800 text-white rounded-lg p-2 mt-1 w-full outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400">Tenure (Yrs)</label>
            <input 
              type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
              className="bg-slate-800 text-white rounded-lg p-2 mt-1 w-full outline-none"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 pt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Monthly EMI</span>
          <span className="text-xl font-bold text-cyan-400">₹{Math.round(emi).toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Total Interest</span>
          <span className="text-slate-200">₹{Math.round(totalInterest).toLocaleString()}</span>
        </div>
      </div>
    </Card>
  )
}
