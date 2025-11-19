import { createContext, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const STORAGE_KEY = 'resumePilot:lastAnalysis'

const ResumeDataContext = createContext({
  analysis: null,
  setAnalysis: () => {},
  clearAnalysis: () => {},
})

export function ResumeDataProvider({ children }) {
  const [analysis, setAnalysisState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Failed to load stored analysis:', error)
      return null
    }
  })

  const setAnalysis = (payload) => {
    setAnalysisState(payload)
    if (payload) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const clearAnalysis = () => setAnalysis(null)

  const value = useMemo(
    () => ({
      analysis,
      setAnalysis,
      clearAnalysis,
    }),
    [analysis],
  )

  return <ResumeDataContext.Provider value={value}>{children}</ResumeDataContext.Provider>
}

ResumeDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useResumeData = () => useContext(ResumeDataContext)


