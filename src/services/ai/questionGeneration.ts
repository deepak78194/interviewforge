import { generateObject } from 'ai';
import { z } from 'zod';
import { getFeatureModel } from './provider';

const questionSchema = z.object({
  questions: z.array(
    z.object({
      text: z.string(),
      difficulty: z.enum(['easy', 'medium', 'hard']),
      type: z.enum(['behavioral', 'technical', 'coding', 'system-design']),
      starterCode: z.string().optional(),
      expectedOutput: z.string().optional(),
    })
  ),
});

export async function generateQuestions(
  jobInfo: {
    title?: string | null;
    companyName?: string | null;
    description: string;
    experienceLevel: string;
  },
  count: number = 10
) {
  const { object } = await generateObject({
    model: getFeatureModel('questionGeneration'),
    schema: questionSchema,
    prompt: `Generate ${count} interview questions for this position:
Job Title: ${jobInfo.title ?? 'Software Engineer'}
Company: ${jobInfo.companyName ?? 'Unknown'}
Experience Level: ${jobInfo.experienceLevel}
Job Description: ${jobInfo.description}

Generate a mix of behavioral, technical, coding, and system-design questions appropriate for the experience level.`,
  });

  return object.questions;
}
