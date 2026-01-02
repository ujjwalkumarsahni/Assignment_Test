import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import authRoutes from './routes/authRoutes.js';
import courtRoutes from './routes/courtRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import connectDB from './config/db.js'

const app = express()

connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courts', courtRoutes);
app.use('/api/bookings', bookingRoutes);


app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Booking API is running',
    timestamp: new Date().toISOString()
  })
})


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  })
})

app.use((err, req, res, next) => {
  console.error('Error:', err.stack)

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development'
      ? err.message
      : undefined
  })
})

export default app
