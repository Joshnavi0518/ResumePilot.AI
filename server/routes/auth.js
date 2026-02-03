import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

const createJwt = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in environment variables')
  }

  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(400).json({ message: 'Account already exists. Please sign in.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
    })

    res.status(201).json({
      message: 'Account created successfully.',
      user: user.toSafeObject(),
    })
  } catch (error) {
    console.error('Register error:', error.message)
    res.status(500).json({ message: 'Unable to create account right now.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash')

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' })
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid credentials.' })
    }

    const token = createJwt(user._id)

    res.json({
      token,
      user: user.toSafeObject(),
    })
  } catch (error) {
    console.error('Login error:', error.message)
    res.status(500).json({ message: 'Unable to sign in right now.' })
  }
})

export default router


