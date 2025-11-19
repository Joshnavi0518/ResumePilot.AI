import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ResumeTemplate, resumeTemplates, generatePDF } from '../components/ResumeTemplates'
import { ProjectSuggestions } from '../components/ProjectSuggestions'
import BrandLogo from '../components/BrandLogo.jsx'
import { useResumeData } from '../context/ResumeDataContext.jsx'

const defaultPersonalInfo = {
  name: '',
  email: '',
  phone: '+91 ',
  location: '',
  linkedin: '',
}

function Editor() {
  const navigate = useNavigate()
  const { analysis } = useResumeData()

  useEffect(() => {
    if (!analysis) {
      navigate('/', { replace: true })
    }
  }, [analysis, navigate])

  const initialTemplate = analysis?.selectedTemplate || analysis?.recommendedTemplate || 'Modern'
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate)
  const [personalInfo, setPersonalInfo] = useState({
    ...defaultPersonalInfo,
    ...(analysis?.personalInfo || {}),
  })
  const [resumeData, setResumeData] = useState(analysis?.improvedResumeData || null)
  const [projects, setProjects] = useState(analysis?.projectSuggestions || [])
  const [showProjects, setShowProjects] = useState(analysis?.showProjectSuggestions || false)

  const templateOptions = useMemo(() => Object.values(resumeTemplates), [])

  if (!analysis) {
    return null
  }

  const handleResumeEdit = (section, field, value) => {
    setResumeData((prev) => {
      if (!prev) return prev
      const updated = { ...prev }
      if (section && typeof updated[section] === 'object') {
        updated[section] = {
          ...updated[section],
          [field]: value,
        }
      } else {
        updated[field] = value
      }
      return updated
    })
  }

  const handleDownloadPDF = () => {
    if (!resumeData) return
    generatePDF({
      template: templateOptions.find((t) => t.name === selectedTemplate) || resumeTemplates.modern,
      resumeData: { ...resumeData, ...personalInfo },
    })
  }

  const handleAddProject = (project) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...(prev?.projects || []), project],
    }))
  }

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <BrandLogo />
          <p className="text-muted mb-0 mt-2">
            Fine-tune templates, fill your details, and export a polished ResumePilot.AI draft.
          </p>
        </div>
        <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/')}>
          ← Back to dashboard
        </button>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-lg-10">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-center mb-3">🧭 Editor checklist</h6>
              <div className="row text-center">
                {[
                  { label: 'Role detected', value: analysis.detectedRole },
                  { label: 'Template selected', value: selectedTemplate },
                  { label: 'Personal info', value: personalInfo.name ? 'Added' : 'Pending' },
                  { label: 'PDF export', value: resumeData ? 'Ready' : 'Generate first' },
                ].map((item) => (
                  <div className="col-md-3 mb-3 mb-md-0" key={item.label}>
                    <div className={`p-3 rounded ${item.value ? 'bg-success text-white' : 'bg-light'}`}>
                      <strong>{item.label}</strong>
                      <div className="small mt-1">{item.value || 'Loading...'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {analysis.detectedRole && (
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <div className="alert alert-info border-0 shadow-sm">
              <div className="d-flex align-items-center">
                <i className="fas fa-search fa-2x me-3 text-info" />
                <div>
                  <h5 className="alert-heading mb-1">AI detected role</h5>
                  <p className="mb-0">{analysis.detectedRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row justify-content-center mb-4">
        <div className="col-lg-10">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0">
                <i className="fas fa-palette me-2 text-primary" />
                Choose a template
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {templateOptions.map((template) => (
                  <div key={template.name} className="col-md-3">
                    <button
                      type="button"
                      className={`card h-100 border-2 text-start ${
                        selectedTemplate === template.name ? 'border-primary shadow-lg' : 'border-light'
                      }`}
                      onClick={() => setSelectedTemplate(template.name)}
                    >
                      <div className="card-body">
                        <div
                          className="rounded mb-3 text-white text-center"
                          style={{
                            backgroundColor: template.primaryColor,
                            height: '70px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                          }}
                        >
                          {template.name}
                        </div>
                        <h6>{template.name}</h6>
                        <p className="small text-muted mb-0">{template.description}</p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-lg-10">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0">
                <i className="fas fa-id-badge me-2 text-primary" />
                Personal info
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {[
                  { label: 'Full name', key: 'name', type: 'text' },
                  { label: 'Professional email', key: 'email', type: 'email' },
                  { label: 'Phone number', key: 'phone', type: 'text' },
                  { label: 'Location', key: 'location', type: 'text' },
                  { label: 'LinkedIn URL', key: 'linkedin', type: 'url' },
                ].map((field) => (
                  <div className="col-md-6" key={field.key}>
                    <label className="form-label">{field.label}</label>
                    <input
                      type={field.type}
                      className="form-control"
                      value={personalInfo[field.key]}
                      onChange={(event) =>
                        setPersonalInfo((prev) => ({ ...prev, [field.key]: event.target.value }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showProjects && (
        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <ProjectSuggestions projects={projects} onAddProject={handleAddProject} isVisible />
          </div>
        </div>
      )}

      {resumeData && (
        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 d-flex flex-wrap justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="fas fa-edit me-2 text-primary" />
                  Smart resume editor · {selectedTemplate}
                </h5>
                <button type="button" className="btn btn-success" onClick={handleDownloadPDF}>
                  <i className="fas fa-download me-2" />
                  Download PDF
                </button>
              </div>
              <div className="card-body">
                <div className="alert alert-info mb-3">
                  <i className="fas fa-lightbulb me-2" />
                  Live editing enabled — click any text to change it. Changes auto-save while you work.
                </div>
                <ResumeTemplate
                  key={selectedTemplate}
                  template={templateOptions.find((t) => t.name === selectedTemplate) || resumeTemplates.modern}
                  resumeData={{ ...resumeData, ...personalInfo }}
                  isPreview={false}
                  onEdit={handleResumeEdit}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ATS metrics and cover letter now live on the analysis page */}
    </div>
  )
}

export default Editor


