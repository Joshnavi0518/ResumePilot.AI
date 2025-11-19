import React from 'react';
import { jsPDF } from 'jspdf';
import ProfessionalClassicTemplate from './ProfessionalClassicTemplate';
import ContemporaryTechTemplate from './ContemporaryTechTemplate';
import ModernBlueProfessionalTemplate from './ModernBlueProfessionalTemplate';

// Resume Template Styles
export const resumeTemplates = {
  professionalClassic: {
    name: "Professional Classic",
    description: "Clean academic-style single column layout",
    primaryColor: "#1f2937",
    secondaryColor: "#6b7280",
    backgroundColor: "#ffffff",
    fontFamily: "Inter, sans-serif",
    component: ProfessionalClassicTemplate
  },
  contemporaryTech: {
    name: "Contemporary Tech",
    description: "Modern two-column layout for tech professionals",
    primaryColor: "#2C3E50",
    secondaryColor: "#2980B9",
    backgroundColor: "#ffffff",
    fontFamily: "Poppins, sans-serif",
    component: ContemporaryTechTemplate
  },
  modernBlueProfessional: {
    name: "Modern Blue Professional",
    description: "Recruiter-ready portfolio design with blue accents",
    primaryColor: "#007BFF",
    secondaryColor: "#6c757d",
    backgroundColor: "#ffffff",
    fontFamily: "Poppins, sans-serif",
    component: ModernBlueProfessionalTemplate
  },
  minimal: {
    name: "Minimal",
    description: "Clean and simple design",
    primaryColor: "#2c3e50",
    secondaryColor: "#7f8c8d",
    backgroundColor: "#ffffff",
    fontFamily: "Arial, sans-serif",
    component: null
  },
  modern: {
    name: "Modern",
    description: "Contemporary with subtle colors",
    primaryColor: "#3498db",
    secondaryColor: "#95a5a6",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica, sans-serif",
    component: null
  },
  tech: {
    name: "Tech",
    description: "Technical-focused with code elements",
    primaryColor: "#27ae60",
    secondaryColor: "#34495e",
    backgroundColor: "#ffffff",
    fontFamily: "Courier New, monospace",
    component: null
  },
  elegant: {
    name: "Elegant",
    description: "Professional with sophisticated styling",
    primaryColor: "#8e44ad",
    secondaryColor: "#7f8c8d",
    backgroundColor: "#ffffff",
    fontFamily: "Georgia, serif",
    component: null
  }
};

// Resume Template Component
export const ResumeTemplate = ({ 
  template, 
  resumeData, 
  isPreview = false,
  onEdit = null 
}) => {
  console.log('ResumeTemplate received template:', template);
  console.log('ResumeTemplate received resumeData:', resumeData);
  console.log('ResumeTemplate isPreview:', isPreview);
  console.log('ResumeTemplate onEdit function:', onEdit);
  
  // Fallback template if none provided
  const safeTemplate = template || {
    name: "Modern",
    description: "Contemporary with subtle colors",
    primaryColor: "#3498db",
    secondaryColor: "#95a5a6",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica, sans-serif",
    component: null
  };

  // If template has a custom component, use it
  if (safeTemplate.component) {
    const TemplateComponent = safeTemplate.component;
    return (
      <TemplateComponent
        name={resumeData.name}
        contact={resumeData}
        summary={resumeData.summary}
        skills={resumeData.skills}
        experience={resumeData.experience}
        projects={resumeData.projects}
        education={resumeData.education}
        certifications={resumeData.certifications}
        selectedTemplate={safeTemplate}
      />
    );
  }
  
  const styles = {
    container: {
      fontFamily: safeTemplate.fontFamily,
      backgroundColor: safeTemplate.backgroundColor,
      color: safeTemplate.primaryColor,
      padding: isPreview ? '20px' : '40px',
      maxWidth: isPreview ? '600px' : '800px',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    header: {
      borderBottom: `3px solid ${safeTemplate.primaryColor}`,
      paddingBottom: '20px',
      marginBottom: '30px'
    },
    name: {
      fontSize: isPreview ? '24px' : '32px',
      fontWeight: 'bold',
      color: safeTemplate.primaryColor,
      margin: '0 0 10px 0'
    },
    contact: {
      fontSize: isPreview ? '12px' : '14px',
      color: safeTemplate.secondaryColor,
      margin: '5px 0'
    },
    section: {
      marginBottom: '25px'
    },
    sectionTitle: {
      fontSize: isPreview ? '16px' : '18px',
      fontWeight: 'bold',
      color: safeTemplate.primaryColor,
      borderBottom: `2px solid ${safeTemplate.secondaryColor}`,
      paddingBottom: '5px',
      marginBottom: '15px'
    },
    summary: {
      fontSize: isPreview ? '12px' : '14px',
      lineHeight: '1.6',
      marginBottom: '20px'
    },
    skillsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px'
    },
    skillTag: {
      backgroundColor: safeTemplate.primaryColor,
      color: 'white',
      padding: '5px 12px',
      borderRadius: '20px',
      fontSize: isPreview ? '10px' : '12px',
      fontWeight: '500'
    },
    experienceItem: {
      marginBottom: '20px',
      paddingLeft: '0'
    },
    jobTitle: {
      fontSize: isPreview ? '14px' : '16px',
      fontWeight: 'bold',
      color: safeTemplate.primaryColor,
      margin: '0 0 5px 0'
    },
    company: {
      fontSize: isPreview ? '12px' : '14px',
      color: safeTemplate.secondaryColor,
      fontWeight: '500',
      margin: '0 0 5px 0'
    },
    duration: {
      fontSize: isPreview ? '10px' : '12px',
      color: safeTemplate.secondaryColor,
      fontStyle: 'italic',
      margin: '0 0 10px 0'
    },
    achievements: {
      fontSize: isPreview ? '11px' : '13px',
      paddingLeft: '20px'
    },
    achievement: {
      marginBottom: '5px'
    },
    projectItem: {
      marginBottom: '15px',
      paddingLeft: '0'
    },
    projectName: {
      fontSize: isPreview ? '13px' : '15px',
      fontWeight: 'bold',
      color: safeTemplate.primaryColor,
      margin: '0 0 5px 0'
    },
    projectDescription: {
      fontSize: isPreview ? '11px' : '13px',
      marginBottom: '5px'
    },
    technologies: {
      fontSize: isPreview ? '10px' : '12px',
      color: safeTemplate.secondaryColor,
      fontStyle: 'italic'
    }
  };

  const handleEdit = (section, field, value) => {
    console.log('ResumeTemplate handleEdit called:', section, field, value);
    if (onEdit) {
      onEdit(section, field, value);
    } else {
      console.log('onEdit function not provided');
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.name}>{resumeData.name || "Your Name"}</h1>
        <div style={styles.contact}>
          <div>{resumeData.email || "your.email@example.com"}</div>
          <div>{resumeData.phone || "+1 (555) 123-4567"}</div>
          <div>{resumeData.location || "Your Location"}</div>
          {resumeData.linkedin && <div>{resumeData.linkedin}</div>}
        </div>
      </div>

      {/* Professional Summary */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Professional Summary</h2>
        {isPreview ? (
          <div style={styles.summary}>{resumeData.summary}</div>
        ) : (
          <textarea
            style={{
              ...styles.summary, 
              width: '100%', 
              border: '2px solid #007bff', 
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#f8f9fa'
            }}
            value={resumeData.summary || ''}
            onChange={(e) => handleEdit('summary', 'summary', e.target.value)}
            rows="3"
            placeholder="Click here to edit your professional summary..."
          />
        )}
      </div>

      {/* Skills */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Skills</h2>
        <div style={styles.skillsList}>
          {resumeData.skills?.map((skill, index) => (
            <span key={index} style={styles.skillTag}>
              {isPreview ? skill : (
                <input
                  type="text"
                  value={skill || ''}
                  onChange={(e) => handleEdit('skills', index, e.target.value)}
                  style={{
                    background: 'transparent', 
                    border: 'none', 
                    color: 'white', 
                    width: Math.max(50, (skill || '').length * 8) + 'px',
                    outline: 'none'
                  }}
                  placeholder="Skill name..."
                />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Experience</h2>
        {resumeData.experience?.map((exp, index) => (
          <div key={index} style={styles.experienceItem}>
            <h3 style={styles.jobTitle}>
              {isPreview ? exp.title : (
                <input
                  type="text"
                  value={exp.title || ''}
                  onChange={(e) => handleEdit('experience', index, {...exp, title: e.target.value})}
                  style={{
                    border: '2px solid #007bff', 
                    borderRadius: '3px', 
                    width: '60%',
                    padding: '5px',
                    backgroundColor: '#f8f9fa'
                  }}
                  placeholder="Job Title..."
                />
              )}
            </h3>
            <div style={styles.company}>
              {isPreview ? exp.company : (
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleEdit('experience', index, {...exp, company: e.target.value})}
                  style={{border: 'none', borderBottom: '1px solid #ddd', width: '40%'}}
                />
              )}
            </div>
            <div style={styles.duration}>{exp.duration}</div>
            <ul style={styles.achievements}>
              {exp.achievements?.map((achievement, achIndex) => (
                <li key={achIndex} style={styles.achievement}>
                  {isPreview ? achievement : (
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => {
                        const newAchievements = [...exp.achievements];
                        newAchievements[achIndex] = e.target.value;
                        handleEdit('experience', index, {...exp, achievements: newAchievements});
                      }}
                      style={{border: 'none', borderBottom: '1px solid #ddd', width: '90%'}}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Projects</h2>
        {resumeData.projects?.map((project, index) => (
          <div key={index} style={styles.projectItem}>
            <h3 style={styles.projectName}>
              {isPreview ? project.name : (
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => handleEdit('projects', index, {...project, name: e.target.value})}
                  style={{border: 'none', borderBottom: '1px solid #ddd', width: '70%'}}
                />
              )}
            </h3>
            <div style={styles.projectDescription}>
              {isPreview ? project.description : (
                <textarea
                  value={project.description}
                  onChange={(e) => handleEdit('projects', index, {...project, description: e.target.value})}
                  style={{border: 'none', borderBottom: '1px solid #ddd', width: '100%'}}
                  rows="2"
                />
              )}
            </div>
            <div style={styles.technologies}>
              Technologies: {project.technologies?.join(', ')}
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Education</h2>
        <div style={styles.experienceItem}>
          <h3 style={styles.jobTitle}>
            {isPreview ? resumeData.education?.degree : (
              <input
                type="text"
                value={resumeData.education?.degree || ''}
                onChange={(e) => handleEdit('education', 'degree', e.target.value)}
                style={{border: 'none', borderBottom: '1px solid #ddd', width: '60%'}}
              />
            )}
          </h3>
          <div style={styles.company}>
            {isPreview ? resumeData.education?.institution : (
              <input
                type="text"
                value={resumeData.education?.institution || ''}
                onChange={(e) => handleEdit('education', 'institution', e.target.value)}
                style={{border: 'none', borderBottom: '1px solid #ddd', width: '40%'}}
              />
            )}
          </div>
          <div style={styles.duration}>{resumeData.education?.year}</div>
        </div>
      </div>
    </div>
  );
};

// PDF Generation Function
export const generatePDF = (resumeData, template) => {
  // Validate input data
  if (!resumeData) {
    console.error('No resume data provided for PDF generation');
    alert('No resume data available for PDF generation');
    return;
  }

  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Fallback template if none provided
  const safeTemplate = template || {
    name: "Modern",
    description: "Contemporary with subtle colors",
    primaryColor: "#3498db",
    secondaryColor: "#95a5a6",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica, sans-serif"
  };
  
  // Set font
  pdf.setFont(safeTemplate.fontFamily);
  
  // Colors
  const primaryColor = safeTemplate.primaryColor;
  const secondaryColor = safeTemplate.secondaryColor;
  
  let yPosition = 20;
  
  // Helper function to add text with word wrapping
  const addText = (text, fontSize, isBold = false, color = '#000000', maxWidth = pageWidth - 40) => {
    pdf.setFontSize(fontSize);
    pdf.setTextColor(color);
    if (isBold) {
      pdf.setFont(undefined, 'bold');
    } else {
      pdf.setFont(undefined, 'normal');
    }
    
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, 20, yPosition);
    yPosition += lines.length * (fontSize * 0.4) + 5;
  };
  
  // Header
  addText(resumeData.name || "Your Name", 20, true, primaryColor);
  addText(`${resumeData.email || "your.email@example.com"} | ${resumeData.phone || "+1 (555) 123-4567"} | ${resumeData.location || "Your Location"}`, 10, false, secondaryColor);
  
  // Draw line
  pdf.setDrawColor(primaryColor);
  pdf.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 10;
  
  // Professional Summary
  addText("Professional Summary", 14, true, primaryColor);
  addText(resumeData.summary || "", 10, false, '#000000');
  yPosition += 5;
  
  // Skills
  addText("Skills", 14, true, primaryColor);
  const skillsText = resumeData.skills?.join(" • ") || "";
  addText(skillsText, 10, false, '#000000');
  yPosition += 10;
  
  // Experience
  if (resumeData.experience && resumeData.experience.length > 0) {
    addText("Experience", 14, true, primaryColor);
    resumeData.experience.forEach(exp => {
      if (exp && exp.title) {
        addText(exp.title, 12, true, primaryColor);
        addText(`${exp.company || 'Company'} | ${exp.duration || 'Duration'}`, 10, false, secondaryColor);
        if (exp.achievements && exp.achievements.length > 0) {
          exp.achievements.forEach(achievement => {
            addText(`• ${achievement}`, 9, false, '#000000', pageWidth - 60);
          });
        }
        yPosition += 5;
      }
    });
  }
  
  // Projects
  if (resumeData.projects && resumeData.projects.length > 0) {
    addText("Projects", 14, true, primaryColor);
    resumeData.projects.forEach(project => {
      if (project && project.name) {
        addText(project.name, 12, true, primaryColor);
        addText(project.description || '', 10, false, '#000000');
        if (project.technologies && project.technologies.length > 0) {
          addText(`Technologies: ${project.technologies.join(', ')}`, 9, false, secondaryColor);
        }
        yPosition += 5;
      }
    });
  }
  
  // Education
  if (resumeData.education) {
    addText("Education", 14, true, primaryColor);
    addText(resumeData.education.degree || "", 12, true, primaryColor);
    addText(`${resumeData.education.institution || ""} | ${resumeData.education.year || ""}`, 10, false, secondaryColor);
  }
  
  // Save PDF
  try {
    pdf.save(`${resumeData.name || 'Resume'}_${safeTemplate.name}.pdf`);
  } catch (error) {
    console.error('Error saving PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};
