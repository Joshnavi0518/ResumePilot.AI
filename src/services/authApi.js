import axios from 'axios'

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000/api'

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


