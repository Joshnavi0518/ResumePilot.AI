import React from 'react';

const ContemporaryTechTemplate = ({
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
    <div className="bg-white text-slate-700 font-poppins max-w-6xl mx-auto p-8 leading-relaxed">
      {/* Header Section with Shadow */}
      <header className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8 border-l-4 border-blue-500">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          {name || "Your Name"}
        </h1>
        <div className="text-slate-600 font-medium">
          Software Engineer | AI/ML Developer
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          {/* Contact Information */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              {contact?.email && (
                <div className="flex items-center">
                  <span className="font-medium text-slate-700">Email:</span>
                  <span className="ml-2 text-blue-600">{contact.email}</span>
                </div>
              )}
              {contact?.phone && (
                <div className="flex items-center">
                  <span className="font-medium text-slate-700">Phone:</span>
                  <span className="ml-2">{contact.phone}</span>
                </div>
              )}
              {contact?.location && (
                <div className="flex items-center">
                  <span className="font-medium text-slate-700">Location:</span>
                  <span className="ml-2">{contact.location}</span>
                </div>
              )}
              {contact?.linkedin && (
                <div className="flex items-center">
                  <span className="font-medium text-slate-700">LinkedIn:</span>
                  <span className="ml-2 text-blue-600">{contact.linkedin}</span>
                </div>
              )}
            </div>
          </section>

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="border-l-4 border-blue-400 pl-4">
                    <div className="font-semibold text-slate-800 text-sm">{cert.name}</div>
                    <div className="text-slate-600 text-xs">{cert.issuer}</div>
                    <div className="text-slate-500 text-xs">{cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
              Key Achievements
            </h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">Led development of scalable AI solutions</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">Improved system performance by 40%</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-slate-700">Mentored junior developers</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          {/* Professional Summary */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {summary || "Experienced software engineer with expertise in AI/ML development, full-stack web applications, and cloud technologies. Passionate about creating innovative solutions and continuously learning new technologies."}
            </p>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
              Education
            </h2>
            {education && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                  {education.degree}
                </h3>
                <div className="text-slate-600 font-medium mb-1">
                  {education.institution}
                </div>
                <div className="text-slate-500 text-sm">
                  {education.year}
                </div>
                {education.gpa && (
                  <div className="text-slate-500 text-sm">
                    GPA: {education.gpa}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
              Projects
            </h2>
            {projects && projects.map((project, index) => (
              <div key={index} className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {project.name}
                </h3>
                <p className="text-slate-700 mb-3 leading-relaxed">
                  {project.description}
                </p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <div className="text-blue-600 text-sm">
                    <span className="font-medium">Link:</span> {project.link}
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {skills && skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-slate-700">{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">
                    {exp.title}
                  </h3>
                  <div className="text-slate-600 font-medium mb-1">
                    {exp.company}
                  </div>
                  <div className="text-slate-500 text-sm mb-3">
                    {exp.duration}
                  </div>
                  {exp.achievements && (
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span className="text-slate-700 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContemporaryTechTemplate;
