import { generateObject } from 'ai';
import { z } from 'zod';
import { getFeatureModel } from './provider';

const feedbackSchema = z.object({
  overallScore: z.number().min(1).max(10),
  communicationScore: z.number().min(1).max(10),
  technicalScore: z.number().min(1).max(10),
  starMethodScore: z.number().min(1).max(10),
  feedback: z.string(),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
});

export async function generateInterviewFeedback(
  transcript: Array<{ role: string; content: string }>,
  jobTitle: string
) {
  const { object } = await generateObject({
    model: getFeatureModel('interviewFeedback'),
    schema: feedbackSchema,
    prompt: `Evaluate this mock interview transcript for a ${jobTitle} position:

${transcript.map(t => `${t.role}: ${t.content}`).join('\n\n')}

Provide comprehensive feedback with scores (1-10) for:
- Overall performance
- Communication skills
- Technical accuracy
- STAR method usage
Plus specific strengths and areas for improvement.`,
  });

  return object;
}
