import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Editor from './pages/Editor.jsx'
import Analysis from './pages/Analysis.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContext.jsx'
import BrandLogo from './components/BrandLogo.jsx'
import ProfileMenu from './components/ProfileMenu.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function BuilderShell() {
  const { user, logout } = useAuth()

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-5 gap-4">
          <div className="text-center text-md-start">
            <BrandLogo />
            <p className="lead text-muted mb-0 mt-3">
              ResumePilot.AI pilots your resume, cover letters, and ATS intel with precision.
            </p>
          </div>
          <ProfileMenu user={user} onLogout={logout} />
        </div>
        <Home />
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BuilderShell />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editor"
        element={
          <ProtectedRoute>
            <Editor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analysis"
        element={
          <ProtectedRoute>
            <Analysis />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
