import React from 'react';

const ProfessionalClassicTemplate = ({
  name,
  contact,
  summary,
  skills,
  experience,
  projects,
  education,
  certifications,
  selectedTemplate
}) => {
  return (
    <div className="bg-white text-gray-900 font-inter max-w-4xl mx-auto p-8 leading-relaxed">
      {/* Header Section */}
      <header className="border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
          {name || "Your Name"}
        </h1>
        <div className="space-y-1 text-gray-700">
          {contact?.email && <div>{contact.email}</div>}
          {contact?.phone && <div>{contact.phone}</div>}
          {contact?.location && <div>{contact.location}</div>}
          {contact?.linkedin && <div>{contact.linkedin}</div>}
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {summary || "Professional summary will appear here..."}
        </p>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
          Education
        </h2>
        {education && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {education.degree}
              </h3>
              <div className="text-gray-700 font-medium">
                {education.institution}
              </div>
              <div className="text-gray-600 italic">
                {education.year}
              </div>
              {education.gpa && (
                <div className="text-gray-600">
                  GPA: {education.gpa}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills && skills.map((skill, index) => (
            <span 
              key={index}
              className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
          Projects
        </h2>
        {projects && projects.map((project, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {project.name}
            </h3>
            <p className="text-gray-700 mb-2 leading-relaxed">
              {project.description}
            </p>
            {project.technologies && (
              <div className="text-gray-600 text-sm">
                <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
              </div>
            )}
            {project.link && (
              <div className="text-gray-600 text-sm mt-1">
                <span className="font-medium">Link:</span> {project.link}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900">{cert.name}</div>
                  <div className="text-gray-600 text-sm">{cert.issuer}</div>
                </div>
                <div className="text-gray-600 text-sm">{cert.date}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
          Achievements
        </h2>
        <div className="space-y-2">
          {/* This would typically come from experience achievements or separate achievements data */}
          {experience && experience.map((exp, index) => (
            exp.achievements && exp.achievements.map((achievement, achIndex) => (
              <div key={`${index}-${achIndex}`} className="flex items-start">
                <span className="text-gray-800 mr-2">•</span>
                <span className="text-gray-700">{achievement}</span>
              </div>
            ))
          ))}
        </div>
      </section>

      {/* Strengths */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
          Strengths
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="text-gray-800 mr-2">•</span>
              <span className="text-gray-700">Problem Solving</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-800 mr-2">•</span>
              <span className="text-gray-700">Team Collaboration</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="text-gray-800 mr-2">•</span>
              <span className="text-gray-700">Adaptability</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-800 mr-2">•</span>
              <span className="text-gray-700">Continuous Learning</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalClassicTemplate;
