'use server';
import { z } from 'zod';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { createQuestion, updateQuestion, deleteQuestion, toggleBookmark } from './db';
import { QUESTION_CACHE_TAG } from './dbCache';

const questionSchema = z.object({
  jobInfoId: z.string().uuid(),
  topicId: z.string().uuid().optional(),
  text: z.string().min(1, 'Question text is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  type: z.enum(['behavioral', 'technical', 'coding', 'system-design']),
  starterCode: z.string().optional(),
  expectedOutput: z.string().optional(),
  personalNotes: z.string().optional(),
});

export type QuestionFormData = z.infer<typeof questionSchema>;

export async function createQuestionAction(formData: FormData) {
  const data = questionSchema.parse({
    jobInfoId: formData.get('jobInfoId'),
    topicId: formData.get('topicId') || undefined,
    text: formData.get('text'),
    difficulty: formData.get('difficulty'),
    type: formData.get('type'),
    starterCode: formData.get('starterCode') || undefined,
    expectedOutput: formData.get('expectedOutput') || undefined,
    personalNotes: formData.get('personalNotes') || undefined,
  });

  const [question] = await createQuestion(data);
  revalidateTag(QUESTION_CACHE_TAG);
  redirect(`/app/questions/${question.id}`);
}

export async function updateQuestionAction(id: string, formData: FormData) {
  const data = questionSchema.parse({
    jobInfoId: formData.get('jobInfoId'),
    topicId: formData.get('topicId') || undefined,
    text: formData.get('text'),
    difficulty: formData.get('difficulty'),
    type: formData.get('type'),
    starterCode: formData.get('starterCode') || undefined,
    expectedOutput: formData.get('expectedOutput') || undefined,
    personalNotes: formData.get('personalNotes') || undefined,
  });

  await updateQuestion(id, data);
  revalidateTag(QUESTION_CACHE_TAG);
  redirect(`/app/questions/${id}`);
}

export async function deleteQuestionAction(id: string, jobInfoId: string) {
  await deleteQuestion(id);
  revalidateTag(QUESTION_CACHE_TAG);
  redirect(`/app/questions?jobInfoId=${jobInfoId}`);
}

export async function toggleBookmarkAction(id: string, isBookmarked: boolean) {
  await toggleBookmark(id, isBookmarked);
  revalidateTag(QUESTION_CACHE_TAG);
}

export async function updateNotesAction(id: string, personalNotes: string) {
  await updateQuestion(id, { personalNotes });
  revalidateTag(QUESTION_CACHE_TAG);
}
