"use client"

import { useState, useEffect } from 'react'
import Card from '../common/Card'
import { Database, Users, History, Activity } from 'lucide-react'

export default function DBExplorer() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/db-explorer')
        if (!response.ok) throw new Error('Failed to fetch database data')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  )

  if (error) return (
    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-6 rounded-2xl">
      Error loading database: {error}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Users</p>
            <p className="text-2xl font-bold text-white">{data.stats.userCount}</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Transactions</p>
            <p className="text-2xl font-bold text-white">{data.stats.transactionCount}</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Database size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Voice Sessions</p>
            <p className="text-2xl font-bold text-white">{data.stats.sessionCount}</p>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-slate-700/50 flex items-center gap-2">
          <Users size={20} className="text-emerald-400" />
          <h3 className="text-xl font-bold text-white">Live Users Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {data.users.map((user) => (
                <tr key={user.id} className="text-slate-300 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{user.id.substring(0, 8)}...</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.full_name || 'N/A'}</td>
                  <td className="px-6 py-4 text-xs">{new Date(user.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Schema Info */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
        <p className="text-sm text-slate-400 italic">
          * Showing live data from <strong>wealthverse.db</strong> (SQLite). 
          Production environment will switch to PostgreSQL/MongoDB hybrid.
        </p>
      </div>
    </div>
  )
}
