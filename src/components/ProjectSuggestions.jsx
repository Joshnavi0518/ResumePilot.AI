import React, { useState } from 'react';

export const ProjectSuggestions = ({ projects, onAddProject, isVisible }) => {
  const [selectedProjects, setSelectedProjects] = useState([]);

  const handleProjectSelect = (projectIndex) => {
    setSelectedProjects(prev => {
      if (prev.includes(projectIndex)) {
        return prev.filter(index => index !== projectIndex);
      } else {
        return [...prev, projectIndex];
      }
    });
  };

  const handleAddSelectedProjects = () => {
    selectedProjects.forEach(index => {
      onAddProject(projects[index]);
    });
    setSelectedProjects([]);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-success';
      case 'intermediate':
        return 'bg-warning';
      case 'advanced':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'fas fa-seedling';
      case 'intermediate':
        return 'fas fa-rocket';
      case 'advanced':
        return 'fas fa-fire';
      default:
        return 'fas fa-code';
    }
  };

  if (!isVisible || !projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-gradient text-white border-0" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="rounded-circle p-2 me-3" style={{ 
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <i className="fas fa-lightbulb text-white"></i>
            </div>
            <h5 className="mb-0 text-white fw-bold">
              🚀 Project Suggestions for Freshers
            </h5>
          </div>
          <small className="text-white-50">
            Select projects to add to your resume
          </small>
        </div>
      </div>
      
      <div className="card-body p-4">
        <div className="row g-4">
          {projects.map((project, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div 
                className={`card h-100 border-2 transition-all ${
                  selectedProjects.includes(index) 
                    ? 'border-primary shadow-lg' 
                    : 'border-light'
                }`}
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: selectedProjects.includes(index) ? 'translateY(-2px)' : 'none'
                }}
                onClick={() => handleProjectSelect(index)}
              >
                <div className="card-body">
                  {/* Project Header */}
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <h6 className="card-title fw-bold text-primary mb-0">
                      {project.name}
                    </h6>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedProjects.includes(index)}
                        onChange={() => handleProjectSelect(index)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="mb-3">
                    <span className={`badge ${getDifficultyColor(project.difficulty)} text-white`}>
                      <i className={`${getDifficultyIcon(project.difficulty)} me-1`}></i>
                      {project.difficulty}
                    </span>
                    <span className="badge bg-light text-dark ms-2">
                      <i className="fas fa-clock me-1"></i>
                      {project.estimatedTime}
                    </span>
                  </div>

                  {/* Project Description */}
                  <p className="card-text text-muted small mb-3" style={{ 
                    lineHeight: '1.5',
                    minHeight: '60px'
                  }}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-3">
                    <h6 className="small fw-semibold text-dark mb-2">
                      <i className="fas fa-code me-1"></i>
                      Technologies:
                    </h6>
                    <div className="d-flex flex-wrap gap-1">
                      {project.technologies?.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25"
                          style={{ fontSize: '0.7rem' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div className="mb-3">
                    <h6 className="small fw-semibold text-dark mb-2">
                      <i className="fas fa-graduation-cap me-1"></i>
                      Learning Outcomes:
                    </h6>
                    <ul className="list-unstyled mb-0">
                      {project.learningOutcomes?.slice(0, 2).map((outcome, outcomeIndex) => (
                        <li key={outcomeIndex} className="small text-muted mb-1">
                          <i className="fas fa-check-circle text-success me-1" style={{ fontSize: '0.7rem' }}></i>
                          {outcome}
                        </li>
                      ))}
                      {project.learningOutcomes?.length > 2 && (
                        <li className="small text-muted">
                          <i className="fas fa-ellipsis-h text-secondary me-1"></i>
                          +{project.learningOutcomes.length - 2} more outcomes
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <button
                      className={`btn btn-sm w-100 ${
                        selectedProjects.includes(index) 
                          ? 'btn-outline-primary' 
                          : 'btn-primary'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddProject(project);
                      }}
                    >
                      <i className="fas fa-plus me-1"></i>
                      {selectedProjects.includes(index) ? 'Selected' : 'Add to Resume'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Actions */}
        {selectedProjects.length > 0 && (
          <div className="mt-4 p-3 bg-light rounded">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <strong className="text-primary">
                  {selectedProjects.length} project{selectedProjects.length !== 1 ? 's' : ''} selected
                </strong>
                <p className="mb-0 text-muted small">
                  Add all selected projects to your resume at once
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={handleAddSelectedProjects}
              >
                <i className="fas fa-plus me-2"></i>
                Add All Selected
              </button>
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-4 p-3 bg-info bg-opacity-10 rounded">
          <div className="d-flex align-items-start">
            <i className="fas fa-info-circle text-info me-2 mt-1"></i>
            <div>
              <h6 className="text-info mb-1">💡 Pro Tips for Freshers</h6>
              <ul className="mb-0 small text-muted">
                <li>Choose projects that align with your target role</li>
                <li>Start with beginner-level projects and gradually move to intermediate</li>
                <li>Document your learning process and challenges overcome</li>
                <li>Include live demos or GitHub repositories when possible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
