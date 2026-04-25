import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { createServer } from 'http'
import { initSocket } from './src/config/socket.js'
import { connectDatabases, getDB } from './src/config/database.js'

const app = express()
const httpServer = createServer(app)
const io = initSocket(httpServer)

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'WealthVerse API is running' })
})

// Admin DB Explorer Endpoint
app.get('/api/admin/db-explorer', async (req, res) => {
  try {
    const db = getDB()
    const users = await db.all('SELECT id, email, full_name, created_at FROM users')
    const transactions = await db.all('SELECT * FROM transactions LIMIT 10')
    const sessions = await db.all('SELECT * FROM voice_sessions LIMIT 10')
    
    res.json({
      users,
      transactions,
      sessions,
      stats: {
        userCount: users.length,
        transactionCount: (await db.get('SELECT COUNT(*) as count FROM transactions')).count,
        sessionCount: (await db.get('SELECT COUNT(*) as count FROM voice_sessions')).count
      }
    })
  } catch (error) {
    console.error('DB Explorer Error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Routes
import authRoutes from './src/routes/authRoutes.js'
app.use('/api/auth', authRoutes)

httpServer.listen(PORT, async () => {
  await connectDatabases()
  console.log(`Server is running on port ${PORT}`)
})
