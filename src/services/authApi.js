import axios from 'axios'

const rawApiBase = import.meta.env.VITE_API_URL?.trim()

if (!rawApiBase) {
  throw new Error(
    'VITE_API_URL is not set. Please configure it in your .env file (e.g., VITE_API_URL=http://localhost:5000/api)'
  )
}

const API_BASE = rawApiBase.replace(/\/$/, '')

export const authClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
})

export function registerUser(payload) {
  return authClient.post('/auth/register', payload)
}

export function loginUser(payload) {
  return authClient.post('/auth/login', payload)
}

export function verifyEmail(token) {
  return authClient.get(`/auth/verify-email/${token}`)
}


