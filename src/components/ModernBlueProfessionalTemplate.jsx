import React from 'react';

const ModernBlueProfessionalTemplate = ({
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
    <div className="bg-white text-gray-800 font-poppins max-w-6xl mx-auto p-8 leading-relaxed">
      {/* Header Section with Blue Accent */}
      <header className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 mb-8 border-l-8 border-blue-600">
        <h1 className="text-5xl font-bold text-blue-600 mb-2">
          {name || "Your Name"}
        </h1>
        <div className="text-xl text-gray-700 font-medium">
          Software Engineer | Full Stack Developer
        </div>
      </header>

      <div className="grid grid-cols-10 gap-8">
        {/* Left Column - 30% */}
        <div className="col-span-3 space-y-8">
          {/* Contact Information */}
          <section>
            <h2 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
              Contact Information
            </h2>
            <div className="space-y-3 text-sm">
              {contact?.email && (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">{contact.email}</span>
                </div>
              )}
              {contact?.phone && (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">{contact.phone}</span>
                </div>
              )}
              {contact?.location && (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">{contact.location}</span>
                </div>
              )}
              {contact?.linkedin && (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-blue-600">{contact.linkedin}</span>
                </div>
              )}
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
              Key Achievements
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <div className="font-semibold text-gray-800 text-sm mb-1">Performance Optimization</div>
                <div className="text-gray-600 text-xs">Improved application performance by 50%</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <div className="font-semibold text-gray-800 text-sm mb-1">Team Leadership</div>
                <div className="text-gray-600 text-xs">Led cross-functional team of 5 developers</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <div className="font-semibold text-gray-800 text-sm mb-1">Innovation</div>
                <div className="text-gray-600 text-xs">Implemented AI-powered features</div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
              Technical Skills
            </h2>
            <div className="space-y-3">
              {skills && skills.map((skill, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500">
                  <span className="text-gray-800 font-medium text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-semibold text-gray-800 text-sm mb-1">{cert.name}</div>
                    <div className="text-gray-600 text-xs">{cert.issuer}</div>
                    <div className="text-blue-600 text-xs">{cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - 70% */}
        <div className="col-span-7 space-y-8">
          {/* Professional Summary */}
          <section>
            <h2 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              {summary || "Experienced software engineer with a passion for creating innovative solutions and driving technological excellence. Proven track record in full-stack development, team leadership, and delivering high-quality software products."}
            </p>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
              Education
            </h2>
            {education && (
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {education.degree}
                </h3>
                <div className="text-gray-700 font-semibold mb-1">
                  {education.institution}
                </div>
                <div className="text-gray-600">
                  {education.year}
                </div>
                {education.gpa && (
                  <div className="text-blue-600 font-medium mt-2">
                    GPA: {education.gpa}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
                Professional Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-6 bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {exp.title}
                      </h3>
                      <div className="text-gray-700 font-semibold">
                        {exp.company}
                      </div>
                    </div>
                    <div className="text-blue-600 font-medium text-sm bg-blue-100 px-3 py-1 rounded-full">
                      {exp.duration}
                    </div>
                  </div>
                  {exp.achievements && (
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          <section>
            <h2 className="text-lg font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
              Notable Projects
            </h2>
            {projects && projects.map((project, index) => (
              <div key={index} className="mb-6 bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {project.name}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {project.description}
                </p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <div className="text-blue-600 font-medium">
                    <span>View Project:</span> {project.link}
                  </div>
                )}
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernBlueProfessionalTemplate;
