import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    const { resumeData } = await req.json();

    if (!resumeData) {
      return Response.json(
        { error: "No resume data provided" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build detailed context from extracted data
    const personalInfoText = resumeData.personalInfo 
      ? `${resumeData.personalInfo.fullName || ''}
${resumeData.personalInfo.email ? '📧 ' + resumeData.personalInfo.email : ''}${resumeData.personalInfo.phone ? ' | 📱 ' + resumeData.personalInfo.phone : ''}
${resumeData.personalInfo.location || ''}${resumeData.personalInfo.linkedIn ? ' | LinkedIn: ' + resumeData.personalInfo.linkedIn : ''}`
      : '';

    const skillsText = resumeData.skills && resumeData.skills.length > 0 
      ? resumeData.skills.join(', ')
      : '';

    const experienceText = resumeData.experience && resumeData.experience.length > 0
      ? resumeData.experience.map(exp => 
          `${exp.jobTitle} at ${exp.company} (${exp.duration || 'Dates not specified'})
${exp.description || 'Responsibilities and achievements'}`
        ).join('\n\n')
      : '';

    const educationText = resumeData.education && resumeData.education.length > 0
      ? resumeData.education.map(edu => 
          `${edu.degree} from ${edu.school} (${edu.graduationDate || 'Date not specified'})`
        ).join('\n')
      : '';

    const certificationsText = resumeData.certifications && resumeData.certifications.length > 0
      ? resumeData.certifications.join(', ')
      : '';

    const prompt = `You are an elite professional resume writer with 20+ years of experience. Your task is to create a polished, ATS-optimized, and highly detailed resume using EXACTLY the information provided below.

=== EXTRACTED RESUME DATA ===

PERSONAL INFORMATION:
${personalInfoText}

PROFESSIONAL SUMMARY:
${resumeData.summary || 'Not provided'}

SKILLS:
${skillsText || 'Not provided'}

WORK EXPERIENCE:
${experienceText || 'Not provided'}

EDUCATION:
${educationText || 'Not provided'}

CERTIFICATIONS & LICENSES:
${certificationsText || 'Not provided'}

=== RESUME FORMATTING REQUIREMENTS ===

Create a comprehensive, detailed resume that:

1. **HEADER SECTION:**
   - Full name (large, prominent)
   - Email address
   - Phone number
   - Location (City, State)
   - LinkedIn profile (if provided)

2. **PROFESSIONAL SUMMARY (if provided):**
   - 2-3 sentences highlighting key strengths and value proposition
   - Make it compelling and specific to the person's background

3. **CORE COMPETENCIES/SKILLS (if provided):**
   - Organize skills into categories (e.g., Technical, Leadership, Language, Software, etc.)
   - Use bullet points for clarity
   - List skills from most to least relevant

4. **PROFESSIONAL EXPERIENCE (if provided):**
   - For each position, include:
     * Job Title (bold)
     * Company Name
     * Dates (Month Year - Month Year)
     * 3-5 bullet points with strong action verbs
     * Quantify achievements with numbers, percentages, $ amounts where possible
     * Show impact and results, not just responsibilities
   - Start each bullet with powerful action verbs (Achieved, Increased, Reduced, Led, Developed, etc.)
   - Make accomplishments specific and measurable

5. **EDUCATION (if provided):**
   - Degree name
   - School/University name
   - Graduation date
   - GPA (if 3.5 or higher and provided)

6. **CERTIFICATIONS & LICENSES (if provided):**
   - List each certification with issuing organization and date

=== STYLE GUIDELINES ===
- Use clean, professional formatting
- ATS-optimized (simple fonts, no graphics, clear section headers)
- Proper grammar and punctuation
- Consistent formatting throughout
- Professional tone
- Concise but comprehensive
- Ready for immediate submission to employers

CRITICAL: Use ONLY the data provided. Do NOT make up achievements, skills, or experience that isn't mentioned. If a section is marked "Not provided", exclude it entirely.

Return the complete, detailed resume text properly formatted with clear sections. No explanations or meta text. Start with the name and end with certifications/last section.`;

    const result = await model.generateContent(prompt);
    const resume = result.response.text();

    return Response.json({ resume }, { status: 200 });
  } catch (error) {
    console.error("Resume generation error:", error);
    return Response.json(
      { error: error.message || "Failed to generate resume" },
      { status: 500 }
    );
  }
}
