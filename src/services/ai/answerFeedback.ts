import { generateObject } from 'ai';
import { z } from 'zod';
import { getFeatureModel } from './provider';

const feedbackSchema = z.object({
  score: z.number().min(1).max(10),
  feedback: z.string(),
  correctAnswer: z.string(),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
});

export async function generateAnswerFeedback(
  question: string,
  answer: string,
  questionType: string
) {
  const { object } = await generateObject({
    model: getFeatureModel('answerFeedback'),
    schema: feedbackSchema,
    prompt: `Evaluate this interview answer:

Question: ${question}
Question Type: ${questionType}
Candidate's Answer: ${answer}

Provide:
1. A score from 1-10
2. Detailed feedback
3. An ideal/correct answer
4. Specific strengths in their answer
5. Areas for improvement`,
  });

  return object;
}
