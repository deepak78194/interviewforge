import { generateObject } from 'ai';
import { z } from 'zod';
import { getFeatureModel } from './provider';

const resumeAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  keywordsScore: z.number().min(0).max(100),
  formattingScore: z.number().min(0).max(100),
  experienceScore: z.number().min(0).max(100),
  skillsScore: z.number().min(0).max(100),
  atsScore: z.number().min(0).max(100),
  summary: z.string(),
  strengths: z.array(z.string()),
  gaps: z.array(z.string()),
  recommendations: z.array(z.string()),
  keywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
});

export async function analyzeResume(resumeText: string, jobDescription: string, jobTitle: string) {
  const { object } = await generateObject({
    model: getFeatureModel('resumeAnalysis'),
    schema: resumeAnalysisSchema,
    prompt: `Analyze this resume against the job description:

JOB TITLE: ${jobTitle}
JOB DESCRIPTION: ${jobDescription}

RESUME:
${resumeText}

Provide scores (0-100) for: overall, keywords match, formatting, experience relevance, skills alignment, ATS compatibility.
Also identify strengths, gaps, recommendations, matched keywords, and missing keywords.`,
  });

  return object;
}
