import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function Login() {
  const [mode, setMode] = useState('login')
  const [formValues, setFormValues] = useState(initialState)
  const [successMessage, setSuccessMessage] = useState('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login, register, loading, error, clearError, token } = useAuth()

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true })
    }
  }, [navigate, token])

  useEffect(() => {
    if (searchParams.get('welcome')) {
      setSuccessMessage('Account created! You can now sign in.')
    }
  }, [searchParams])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'))
    setFormValues(initialState)
    setSuccessMessage('')
    clearError()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    clearError()
    setSuccessMessage('')

    try {
      if (mode === 'register') {
        if (!formValues.name.trim()) {
          throw new Error('Please enter your name.')
        }
        if (formValues.password !== formValues.confirmPassword) {
          throw new Error('Passwords must match.')
        }
        await register({
          name: formValues.name.trim(),
          email: formValues.email.trim(),
          password: formValues.password,
        })
        setSuccessMessage('Account created! Sign in to continue.')
        setMode('login')
        setFormValues(initialState)
      } else {
        await login({
          email: formValues.email.trim(),
          password: formValues.password,
        })
        navigate('/', { replace: true })
      }
    } catch (submitError) {
      setSuccessMessage('')
      if (submitError?.message && !error) {
        console.error(submitError.message)
      }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="overlay" />
        <div className="hero-content">
          <span className="hero-brand-pill">ResumePilot.AI</span>
          <h1 className="display-5 fw-bold text-white mt-4 mb-3">
            Navigate every resume mission with a single AI pilot.
          </h1>
          <p className="lead text-white-50 mb-4">
            Craft ATS-ready resumes, cover letters, and scorecards from one control deck.
          </p>
          <div className="hero-highlights">
            <div>
              <p className="hero-highlight-title">ATS Radar</p>
              <p className="text-white-50 mb-0">Instant compatibility scoring</p>
            </div>
            <div>
              <p className="hero-highlight-title">Resume Co-pilot</p>
              <p className="text-white-50 mb-0">Role-aware writing upgrades</p>
            </div>
            <div>
              <p className="hero-highlight-title">Cover Letter Lab</p>
              <p className="text-white-50 mb-0">Tailored narratives on demand</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-wrapper">
        <div className="auth-card shadow-lg">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-muted mb-0">
              {mode === 'login'
                ? 'Sign in to turn your experience into job-winning stories.'
                : 'Create your account to unlock the AI resume workspace.'}
            </p>
          </div>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'register' && (
              <div className="mb-3">
                <label className="form-label">Full name</label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Alex Morgan"
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="form-control"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Create a strong password"
                required
                minLength={6}
              />
            </div>

            {mode === 'register' && (
              <div className="mb-3">
                <label className="form-label">Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Re-enter password"
                  required
                  minLength={6}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={loading}
            >
              {loading
                ? 'Please wait...'
                : mode === 'login'
                  ? 'Sign in'
                  : 'Create account'}
            </button>
          </form>

          <p className="text-center text-muted mt-4">
            {mode === 'login' ? 'New to AI Resume Builder?' : 'Already onboard?'}{' '}
            <button
              type="button"
              className="btn btn-link p-0 align-baseline"
              onClick={toggleMode}
            >
              {mode === 'login' ? 'Create an account' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login


