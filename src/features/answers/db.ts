import { db } from '@/drizzle/db';
import { AnswerTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export function getAnswers(questionId: string) {
  return db.select().from(AnswerTable).where(eq(AnswerTable.questionId, questionId)).orderBy(AnswerTable.createdAt);
}

export function createAnswer(data: typeof AnswerTable.$inferInsert) {
  return db.insert(AnswerTable).values(data).returning();
}
