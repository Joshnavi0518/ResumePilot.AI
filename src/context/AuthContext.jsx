import { createContext, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { loginUser, registerUser } from '../services/authApi'

const AuthContext = createContext({
  user: null,
  token: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  clearError: () => {},
})

const USER_KEY = 'airb:user'
const TOKEN_KEY = 'airb:token'

const getStoredUser = () => {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(USER_KEY)
  return stored ? JSON.parse(stored) : null
}

const getStoredToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)
  const [token, setToken] = useState(getStoredToken)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const persistAuthState = (nextUser, nextToken) => {
    if (typeof window === 'undefined') {
      return
    }
    if (nextUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    } else {
      localStorage.removeItem(USER_KEY)
    }

    if (nextToken) {
      localStorage.setItem(TOKEN_KEY, nextToken)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  }

  const login = async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await loginUser(credentials)
      setUser(data?.user ?? null)
      setToken(data?.token ?? null)
      persistAuthState(data?.user ?? null, data?.token ?? null)
      return data
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Unable to sign in. Please try again.'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await registerUser(payload)
      return data
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Unable to create account. Please try again.'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    persistAuthState(null, null)
  }

  const clearError = () => setError(null)

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      login,
      register,
      logout,
      clearError,
    }),
    [user, token, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAuth = () => useContext(AuthContext)


