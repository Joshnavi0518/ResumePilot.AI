import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo.jsx'
import { ATSDashboard } from '../components/ATSDashboard'
import { useResumeData } from '../context/ResumeDataContext.jsx'

function Analysis() {
  const navigate = useNavigate()
  const { analysis, clearAnalysis } = useResumeData()
  const [copyNotice, setCopyNotice] = useState('')

  useEffect(() => {
    if (!analysis) {
      navigate('/', { replace: true })
    }
  }, [analysis, navigate])

  if (!analysis) {
    return null
  }

  const handleCopyCoverLetter = () => {
    if (!analysis.coverLetter) return
    navigator.clipboard.writeText(analysis.coverLetter)
    setCopyNotice('Cover letter copied!')
    setTimeout(() => setCopyNotice(''), 2000)
  }

  const handleEditResume = () => navigate('/editor')

  const handleStartOver = () => {
    clearAnalysis()
    navigate('/')
  }

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-5">
          <div>
            <BrandLogo />
            <p className="text-muted mb-0 mt-2">
              Review your ATS intel and cover letter summary, then jump into resume edits when ready.
            </p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={handleEditResume}>
              Resume edit
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={handleStartOver}>
              Start over
            </button>
          </div>
        </div>

        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                <div>
                  <h4 className="mb-1">Analysis ready</h4>
                  {analysis.detectedRole && (
                    <p className="text-muted mb-0">
                      Suggested role focus:
                      <span className="fw-semibold text-primary ms-2">{analysis.detectedRole}</span>
                    </p>
                  )}
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {analysis.selectedTemplate && (
                    <span className="badge bg-primary-subtle text-primary px-3 py-2">
                      Template: {analysis.selectedTemplate}
                    </span>
                  )}
                  {analysis.showProjectSuggestions && (
                    <span className="badge bg-success-subtle text-success px-3 py-2">Project ideas added</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {analysis.atsData && analysis.skillGapData && (
          <div className="row justify-content-center mb-4">
            <div className="col-lg-10">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="mb-0">
                    <i className="fas fa-chart-line me-2 text-primary" />
                    ATS score & skill radar
                  </h5>
                </div>
                <div className="card-body">
                  <ATSDashboard atsData={analysis.atsData} skillGapData={analysis.skillGapData} />
                </div>
              </div>
            </div>
          </div>
        )}

        {analysis.coverLetter && (
          <div className="row justify-content-center mb-4">
            <div className="col-lg-10">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="fas fa-envelope me-2 text-primary" />
                    Cover letter draft
                  </h5>
                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleCopyCoverLetter}>
                    Copy
                  </button>
                </div>
                <div className="card-body">
                  <div className="p-4 border rounded bg-light" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                    {analysis.coverLetter}
                  </div>
                  {copyNotice && <p className="text-success mt-2 mb-0 small">{copyNotice}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <h5 className="mb-3">Ready to polish the resume?</h5>
                <button type="button" className="btn btn-primary btn-lg" onClick={handleEditResume}>
                  Go to resume edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analysis


