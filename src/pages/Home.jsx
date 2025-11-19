import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo.jsx";
import {
  detectJobRole,
  improveResume,
  generateCoverLetter,
  getATSBreakdown,
  getSkillGapAnalysis,
  getProjectSuggestions,
  recommendTemplate
} from "../services/geminiApi";

import { useResumeData } from "../context/ResumeDataContext.jsx";

function HomePage() {
  const navigate = useNavigate();
  const { setAnalysis } = useResumeData();
  const [formData, setFormData] = useState({
    companyName: "",
    applyAsA: "Fresher",
    jobDescription: "",
    currentResume: "",
    coverLetterTone: "Formal",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("form"); // form, analysis

  // Enhanced generation function with all new features
  async function handleGenerateData() {
    if (!formData.companyName || !formData.jobDescription) {
      alert("Please fill in Company Name and Job Description");
      return;
    }

    setIsLoading(true);
    setCurrentStep("analysis");

    try {
      // Step 1: Detect Job Role
      console.log("Step 1: Detecting job role...");
      const role = await detectJobRole(formData.jobDescription);
      console.log("Detected role:", role);

      // Step 2: Get template recommendation
      console.log("Step 2: Getting template recommendation...");
      const template = await recommendTemplate(role, formData.applyAsA);

      // Step 3: Improve Resume
      console.log("Step 3: Improving resume...");
      const improvedResume = await improveResume(formData, role);

      // Step 4: Generate Cover Letter
      console.log("Step 4: Generating cover letter...");
      const coverLetterText = await generateCoverLetter(formData, role);

      // Step 5: Get ATS Breakdown
      console.log("Step 5: Getting ATS breakdown...");
      const atsBreakdown = await getATSBreakdown(formData, improvedResume, role);

      // Step 6: Get Skill Gap Analysis
      console.log("Step 6: Getting skill gap analysis...");
      const skillGap = await getSkillGapAnalysis(formData, improvedResume, role);

      // Step 7: Get Project Suggestions (for freshers)
      let projects = [];
      if (formData.applyAsA === "Fresher") {
        console.log("Step 7: Getting project suggestions...");
        projects = await getProjectSuggestions(formData, role);
      }

      const analysisPayload = {
        detectedRole: role,
        improvedResumeData: improvedResume,
        coverLetter: coverLetterText,
        atsData: atsBreakdown,
        skillGapData: skillGap,
        projectSuggestions: projects,
        showProjectSuggestions: formData.applyAsA === "Fresher",
        selectedTemplate: template,
        recommendedTemplate: template,
        personalInfo: {
          name: "",
          email: "",
          phone: "+91 ",
          location: "",
          linkedin: ""
        },
      };

      setAnalysis(analysisPayload);
      navigate('/analysis');
    } catch (error) {
      console.error("Error in generation process:", error);
      const errorMessage = error?.message || "Unknown error occurred";
      // Show more specific error message
      if (errorMessage.includes("API key") || errorMessage.includes("VITE_GEMINI_API_KEY")) {
        alert("API Key Error: Please check your .env file and ensure VITE_GEMINI_API_KEY is set correctly. You may need to restart your dev server after updating the .env file.");
      } else if (errorMessage.includes("cover letter")) {
        alert(`Error generating cover letter: ${errorMessage}`);
      } else {
        alert(`Error generating analysis: ${errorMessage}. Please check your console for more details.`);
      }
    } finally {
      setIsLoading(false);
      setCurrentStep("form");
    }
  }

  return (
    <>
      {/* Step 1: Input Form */}
      {currentStep === "form" && (
      <div className="row justify-content-center">
          <div className="col-lg-10">
          <div className="card shadow-lg border-0">
          <div className="card-header bg-gradient text-white border-0" style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
              }}>
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                <BrandLogo />
                <div className="text-md-end">
                  <h3 className="card-title mb-1">Mission Control · Builder Mode</h3>
                  <small className="text-white-50">ResumePilot.AI preps forms, ATS intel, and cover letters in one flight deck.</small>
                </div>
              </div>
            </div>
            <div className="card-body p-4">
              <form>
                <div className="row">
                  {/* Company name */}
                  <div className="col-md-6 mb-4">
                    <label htmlFor="companyName" className="form-label fw-semibold">
                      <i className="fas fa-building me-2 text-primary"></i>
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="companyName"
                      placeholder="e.g., Google, Microsoft, Apple"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                    />
                    <div className="form-text">Company you are applying to</div>
                  </div>

                  {/* Apply as */}
                  <div className="col-md-6 mb-4">
                    <label htmlFor="applyAsA" className="form-label fw-semibold">
                      <i className="fas fa-user-graduate me-2 text-primary"></i>
                      Experience Level
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="applyAsA"
                      value={formData.applyAsA}
                      onChange={(e) =>
                        setFormData({ ...formData, applyAsA: e.target.value })
                      }
                    >
                      <option value="Fresher">Fresher</option>
                      <option value="Experienced">Experienced</option>
                    </select>
                    <div className="form-text">Your professional experience level</div>
                  </div>
                </div>

                {/* Job description */}
                <div className="mb-4">
                  <label htmlFor="jobDescription" className="form-label fw-semibold">
                    <i className="fas fa-briefcase me-2 text-primary"></i>
                    Job Description
                  </label>
                  <textarea
                    id="jobDescription"
                    className="form-control"
                    rows="4"
                    placeholder="Paste the job description here..."
                    value={formData.jobDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, jobDescription: e.target.value })
                    }
                  ></textarea>
                  <div className="form-text">Copy and paste the complete job description</div>
                </div>

                {/* Resume */}
                <div className="mb-4">
                  <label htmlFor="currentResume" className="form-label fw-semibold">
                    <i className="fas fa-file-alt me-2 text-primary"></i>
                    Current Resume Content
                  </label>
                  <textarea
                    id="currentResume"
                    className="form-control"
                    rows="4"
                    placeholder="Paste your current resume content here..."
                    value={formData.currentResume}
                    onChange={(e) =>
                      setFormData({ ...formData, currentResume: e.target.value })
                    }
                  ></textarea>
                  <div className="form-text">Optional: Your current resume for comparison and optimization</div>
                </div>

                {/* Cover letter tone */}
                <div className="mb-4">
                  <label htmlFor="coverLetterTone" className="form-label fw-semibold">
                    <i className="fas fa-palette me-2 text-primary"></i>
                    Cover Letter Tone
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="coverLetterTone"
                    value={formData.coverLetterTone}
                    onChange={(e) =>
                      setFormData({ ...formData, coverLetterTone: e.target.value })
                    }
                  >
                    <option value="Formal">Formal</option>
                    <option value="Informal">Informal</option>
                    <option value="Casual">Casual</option>
                  </select>
                  <div className="form-text">Choose the tone that matches your personality and the company culture</div>
                </div>

                {/* Submit */}
                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={handleGenerateData}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Analyzing...
                        </>
                      ) : (
                        <>
                    <i className="fas fa-magic me-2"></i>
                          Generate AI-Powered Analysis
                        </>
                      )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Loading State */}
      {currentStep === "analysis" && (
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="spinner-border text-primary mb-4" style={{ width: '3rem', height: '3rem' }} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h4 className="text-primary mb-3">AI is analyzing your data...</h4>
                <p className="text-muted">This may take a few moments. We're processing your job description and optimizing your resume.</p>
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default HomePage;
