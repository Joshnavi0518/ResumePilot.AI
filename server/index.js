import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'


dotenv.config();

import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((url) => url.trim())
  : ['http://localhost:5173']

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Missing MONGODB_URI in environment')
    }

    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB connected')

    app.listen(PORT, () => {
      console.log(`🚀 Auth server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to launch server:', error.message)
    process.exit(1)
  }
}

startServer()


