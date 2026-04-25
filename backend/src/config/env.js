import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'wealthverse-super-secret-key-development-only',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  nodeEnv: process.env.NODE_ENV || 'development'
}
