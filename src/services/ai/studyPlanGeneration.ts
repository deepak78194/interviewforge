import { generateObject } from 'ai';
import { z } from 'zod';
import { getFeatureModel } from './provider';

const studyPlanSchema = z.object({
  title: z.string(),
  description: z.string(),
  days: z.array(z.object({
    dayNumber: z.number(),
    theme: z.string(),
    tasks: z.array(z.object({
      type: z.enum(['study_topic', 'solve_questions', 'mock_interview', 'resume_review', 'coding_challenge', 'system_design', 'custom']),
      title: z.string(),
      description: z.string(),
      estimatedMinutes: z.number(),
      targetCount: z.number().optional(),
    })),
  })),
});

export async function generateStudyPlan(
  jobInfo: {
    title?: string | null;
    description: string;
    experienceLevel: string;
    targetDate?: Date | null;
  },
  totalDays: number
) {
  const { object } = await generateObject({
    model: getFeatureModel('studyPlanGeneration'),
    schema: studyPlanSchema,
    prompt: `Create a ${totalDays}-day study plan for this job:
Title: ${jobInfo.title ?? 'Software Engineer'}
Experience Level: ${jobInfo.experienceLevel}
Job Description: ${jobInfo.description}
${jobInfo.targetDate ? `Target Date: ${jobInfo.targetDate.toDateString()}` : ''}

Create a comprehensive study plan that progressively builds skills. Each day should have 2-4 tasks totaling 2-4 hours of study.`,
  });

  return object;
}
