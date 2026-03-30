'use server';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { QuestionTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { createAnswer } from './db';
import { ANSWER_CACHE_TAG } from './dbCache';
import { QUESTION_CACHE_TAG } from '@/features/questions/dbCache';
import { generateAnswerFeedback } from '@/services/ai/answerFeedback';

export async function submitAnswerAction(
  questionId: string,
  questionText: string,
  questionType: string,
  formData: FormData
) {
  const content = formData.get('content') as string;
  const code = formData.get('code') as string | null;

  let score: number | undefined;
  let feedback: string | undefined;
  let correctAnswer: string | undefined;
  const aiModel = 'gemini-2.5-flash';

  try {
    const result = await generateAnswerFeedback(questionText, content, questionType);
    score = result.score;
    feedback = result.feedback;
    correctAnswer = result.correctAnswer;
  } catch (e) {
    console.error('AI feedback failed:', e);
  }

  await createAnswer({
    questionId,
    content,
    code: code || undefined,
    score,
    feedback,
    correctAnswer,
    aiModel,
  });

  await db
    .update(QuestionTable)
    .set({
      timesAttempted: sql`${QuestionTable.timesAttempted} + 1`,
      ...(score != null && { bestScore: sql`GREATEST(COALESCE(${QuestionTable.bestScore}, 0), ${score})` }),
      updatedAt: new Date(),
    })
    .where(eq(QuestionTable.id, questionId));

  revalidateTag(ANSWER_CACHE_TAG);
  revalidateTag(QUESTION_CACHE_TAG);

  redirect(`/app/questions/${questionId}`);
}
