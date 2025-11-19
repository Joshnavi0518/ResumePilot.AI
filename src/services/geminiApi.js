// Gemini API Service for AI Resume Builder
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyDifUOP9q1RBslxtV9_O6YyZ0geWiPPILY"; // ⚠️ move to .env in production
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Generic function to call Gemini API
async function callGeminiAPI(prompt) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  };

  try {
    const response = await fetch(GEMINI_API_URL, options);
    const data = await response.json();
    
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

// 1. AI Job Role Detection
export async function detectJobRole(jobDescription) {
  const prompt = `Analyze the following job description and identify the primary job role/title.

Job Description: ${jobDescription}

Please respond with ONLY the job title/role in this exact format:
"Detected Role: [Job Title]"

Examples:
- "Detected Role: Software Engineer"
- "Detected Role: Marketing Manager"
- "Detected Role: Data Analyst"
- "Detected Role: Product Manager"

Be specific and concise. Do not include any additional text or explanation.`;

  try {
    const response = await callGeminiAPI(prompt);
    return response.trim();
  } catch (error) {
    return "Detected Role: General Position";
  }
}

// 2. Resume Improvement with Role-based Optimization
export async function improveResume(formData, detectedRole) {
  const prompt = `You are a professional career coach and resume optimization expert. 
Generate an improved resume tailored for the detected role: ${detectedRole}

Inputs:
Company Name: ${formData.companyName}
Experience Level: ${formData.applyAsA}
Job Description: ${formData.jobDescription}
Current Resume: ${formData.currentResume || "No resume provided"}
Detected Role: ${detectedRole}

Output (format as structured JSON):
{
  "summary": "Optimized professional summary (2-3 sentences)",
  "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "duration": "Duration",
      "achievements": ["achievement1", "achievement2", "achievement3"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Brief project description",
      "technologies": ["tech1", "tech2", "tech3"],
      "achievements": ["achievement1", "achievement2"]
    }
  ],
  "education": {
    "degree": "Degree Name",
    "institution": "Institution Name",
    "year": "Graduation Year"
  }
}

Ensure the content is:
- Tailored to ${detectedRole}
- ATS-friendly
- Achievement-focused with metrics where possible
- Professional and concise`;

  try {
    const response = await callGeminiAPI(prompt);
    // Clean the response to remove markdown formatting
    const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    console.log("Cleaned response:", cleanedResponse);
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Error improving resume:", error);
    // Return fallback data if JSON parsing fails
    return {
      summary: "Experienced professional with strong skills and achievements.",
      skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
      experience: [
        {
          title: "Software Developer",
          company: "Tech Company",
          duration: "2020-2023",
          achievements: ["Developed web applications", "Led team projects", "Improved performance by 50%"]
        }
      ],
      projects: [
        {
          name: "Web Application",
          description: "Full-stack web application with modern technologies",
          technologies: ["React", "Node.js", "MongoDB"],
          achievements: ["Implemented user authentication", "Optimized database queries"]
        }
      ],
      education: {
        degree: "Bachelor of Technology",
        institution: "University Name",
        year: "2020"
      }
    };
  }
}

// 3. Cover Letter Generation
export async function generateCoverLetter(formData, detectedRole) {
  const prompt = `Write a professional cover letter for the position: ${detectedRole}

Company: ${formData.companyName}
Experience Level: ${formData.applyAsA}
Job Description: ${formData.jobDescription}
Current Resume: ${formData.currentResume || "No resume provided"}
Tone: ${formData.coverLetterTone}

Requirements:
- Address to ${formData.companyName}
- Use ${formData.coverLetterTone} tone
- Highlight relevant skills for ${detectedRole}
- Show enthusiasm for the role
- Keep it professional and concise (3-4 paragraphs)
- Include specific references to the job description

Format as a proper cover letter with appropriate greeting and closing.`;

  try {
    const response = await callGeminiAPI(prompt);
    return response;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return "Error generating cover letter. Please try again.";
  }
}

// 4. ATS Breakdown Analysis
export async function getATSBreakdown(formData, improvedResume, detectedRole) {
  const prompt = `Analyze the resume for ATS compatibility and provide a detailed breakdown.

Job Description: ${formData.jobDescription}
Improved Resume: ${JSON.stringify(improvedResume)}
Detected Role: ${detectedRole}

Provide analysis in this JSON format:
{
  "overallScore": 85,
  "categories": {
    "formatting": {
      "score": 90,
      "feedback": "Well-formatted with clear sections"
    },
    "keywords": {
      "score": 80,
      "feedback": "Good keyword usage, missing some technical terms"
    },
    "readability": {
      "score": 85,
      "feedback": "Clear and concise writing"
    },
    "actionVerbs": {
      "score": 75,
      "feedback": "Could use more action verbs"
    }
  },
  "missingKeywords": ["keyword1", "keyword2", "keyword3"],
  "recommendations": [
    "Add more technical skills",
    "Include specific metrics",
    "Use more action verbs"
  ]
}

Evaluate based on:
- ATS-friendly formatting
- Keyword matching with job description
- Readability and clarity
- Use of action verbs
- Professional presentation`;

  try {
    const response = await callGeminiAPI(prompt);
    // Clean the response to remove markdown formatting
    const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    console.log("Cleaned ATS response:", cleanedResponse);
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Error getting ATS breakdown:", error);
    return {
      overallScore: 75,
      categories: {
        formatting: { score: 80, feedback: "Well-formatted resume structure" },
        keywords: { score: 70, feedback: "Good keyword usage, could be improved" },
        readability: { score: 85, feedback: "Clear and professional writing" },
        actionVerbs: { score: 65, feedback: "Some action verbs present, add more" }
      },
      missingKeywords: ["Python", "Machine Learning", "AWS"],
      recommendations: ["Add more quotes and metrics", "Include specific technologies", "Use more action verbs"]
    };
  }
}

// 5. Skill Gap Analysis
export async function getSkillGapAnalysis(formData, improvedResume, detectedRole) {
  const prompt = `Analyze the skill gap between the current resume and job requirements.

Job Description: ${formData.jobDescription}
Improved Resume: ${JSON.stringify(improvedResume)}
Detected Role: ${detectedRole}

Provide analysis in this JSON format:
{
  "missingSkills": [
    {
      "skill": "React.js",
      "importance": "High",
      "reason": "Required for frontend development"
    }
  ],
  "recommendedSkills": [
    {
      "skill": "TypeScript",
      "importance": "Medium",
      "reason": "Would strengthen the resume"
    }
  ],
  "existingSkills": ["JavaScript", "HTML", "CSS"],
  "skillMatchPercentage": 75
}

Focus on:
- Skills mentioned in job description but missing from resume
- Skills that would strengthen the application
- Current skills that match the requirements`;

  try {
    const response = await callGeminiAPI(prompt);
    // Clean the response to remove markdown formatting
    const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    console.log("Cleaned skill gap response:", cleanedResponse);
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Error getting skill gap analysis:", error);
    return {
      missingSkills: [
        { skill: "Python", importance: "High", reason: "Required for data analysis" },
        { skill: "Machine Learning", importance: "Medium", reason: "Would strengthen the resume" }
      ],
      recommendedSkills: [
        { skill: "AWS", importance: "Medium", reason: "Cloud computing skills are valuable" }
      ],
      existingSkills: ["JavaScript", "React", "Node.js"],
      skillMatchPercentage: 75
    };
  }
}

// 6. Project Suggestions for Freshers
export async function getProjectSuggestions(formData, detectedRole) {
  if (formData.applyAsA !== "Fresher") {
    return [];
  }

  const prompt = `Generate 2-3 relevant project ideas for a fresher applying for: ${detectedRole}

Job Description: ${formData.jobDescription}
Experience Level: Fresher

Provide projects in this JSON format:
[
  {
    "name": "Project Name",
    "description": "Detailed project description",
    "technologies": ["tech1", "tech2", "tech3"],
    "learningOutcomes": ["outcome1", "outcome2"],
    "difficulty": "Beginner/Intermediate",
    "estimatedTime": "2-3 weeks"
  }
]

Requirements:
- Projects should be relevant to ${detectedRole}
- Suitable for beginners
- Demonstrate practical skills
- Include modern technologies mentioned in job description
- Provide clear learning outcomes`;

  try {
    const response = await callGeminiAPI(prompt);
    // Clean the response to remove markdown formatting
    const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    console.log("Cleaned project suggestions response:", cleanedResponse);
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Error getting project suggestions:", error);
    return [
      {
        name: "E-Commerce Website",
        description: "Build a full-stack e-commerce website with user authentication, product catalog, and payment integration",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        learningOutcomes: ["Full-stack development", "Database design", "Payment integration", "User authentication"],
        difficulty: "Intermediate",
        estimatedTime: "3-4 weeks"
      },
      {
        name: "Task Management App",
        description: "Create a task management application with real-time updates and team collaboration features",
        technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
        learningOutcomes: ["Real-time applications", "Team collaboration", "Database optimization", "UI/UX design"],
        difficulty: "Beginner",
        estimatedTime: "2-3 weeks"
      }
    ];
  }
}

// 7. Template Recommendation
export async function recommendTemplate(detectedRole, experienceLevel) {
  const prompt = `Recommend the best resume template for this role and experience level.

Role: ${detectedRole}
Experience Level: ${experienceLevel}

Available templates:
- Minimal: Clean, simple design
- Modern: Contemporary with subtle colors
- Tech: Technical-focused with code elements
- Elegant: Professional with sophisticated styling

Respond with ONLY the template name (Minimal, Modern, Tech, or Elegant).

Consider:
- Industry standards for the role
- Experience level appropriateness
- Professional presentation`;

  try {
    const response = await callGeminiAPI(prompt);
    return response.trim();
  } catch (error) {
    return "Modern"; // Default fallback
  }
}
