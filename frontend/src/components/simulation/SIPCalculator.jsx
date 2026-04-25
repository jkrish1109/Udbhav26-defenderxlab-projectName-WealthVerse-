import { useState } from 'react'
import Card from '../common/Card'
import Button from '../common/Button'

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [timePeriod, setTimePeriod] = useState(10)
  const [result, setResult] = useState(null)

  const calculateSIP = () => {
    const P = monthlyInvestment
    const i = expectedReturn / 12 / 100
    const n = timePeriod * 12
    const M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
    
    setResult({
      invested: P * n,
      wealth: Math.round(M),
      returns: Math.round(M - (P * n))
    })
  }

  return (
    <Card className="col-span-1 md:col-span-2">
      <h3 className="text-xl font-bold text-white mb-6">SIP Projection Engine</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-slate-300 mb-2">
              <span>Monthly Investment</span>
              <span className="text-emerald-400 font-medium">₹{monthlyInvestment}</span>
            </label>
            <input 
              type="range" min="500" max="100000" step="500"
              value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
          
          <div>
            <label className="flex justify-between text-slate-300 mb-2">
              <span>Expected Return (p.a)</span>
              <span className="text-emerald-400 font-medium">{expectedReturn}%</span>
            </label>
            <input 
              type="range" min="1" max="30" step="1"
              value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
          
          <div>
            <label className="flex justify-between text-slate-300 mb-2">
              <span>Time Period</span>
              <span className="text-emerald-400 font-medium">{timePeriod} Years</span>
            </label>
            <input 
              type="range" min="1" max="40" step="1"
              value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <Button variant="primary" className="w-full" onClick={calculateSIP}>
            Run Simulation
          </Button>
        </div>

        <div className="glass rounded-xl p-6 flex flex-col justify-center border-slate-700/50">
          {result ? (
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Wealth Generated</p>
                <p className="text-3xl font-bold text-emerald-400">₹{(result.wealth/100000).toFixed(2)}L</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-slate-400 text-xs">Total Invested</p>
                  <p className="font-semibold text-white">₹{(result.invested/100000).toFixed(2)}L</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Est. Returns</p>
                  <p className="font-semibold text-emerald-400">₹{(result.returns/100000).toFixed(2)}L</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500">
              <p>Adjust the parameters and run the simulation to see your future wealth projection.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
