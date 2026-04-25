import axios from 'axios'
import { env } from '../config/env.js'

const aiClient = axios.create({
  baseURL: process.env.AI_ENGINE_URL || 'http://localhost:8000/api',
  timeout: 10000,
})

export const getSpendingInsights = async (userId, transactions) => {
  try {
    const response = await aiClient.post('/ai/analyze-spending', {
      user_id: userId,
      transactions
    })
    return response.data
  } catch (error) {
    console.error('AI Engine Error:', error.message)
    throw new Error('Failed to communicate with AI Engine')
  }
}

export const getFinancialAdvice = async (userId, context) => {
  try {
    const response = await aiClient.post('/ai/generate-advice', {
      user_id: userId,
      context
    })
    return response.data
  } catch (error) {
    console.error('AI Engine Error:', error.message)
    throw new Error('Failed to get AI advice')
  }
}
