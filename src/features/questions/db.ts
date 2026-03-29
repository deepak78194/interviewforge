import { db } from '@/drizzle/db';
import { QuestionTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export function getQuestions(jobInfoId: string) {
  return db
    .select()
    .from(QuestionTable)
    .where(eq(QuestionTable.jobInfoId, jobInfoId))
    .orderBy(QuestionTable.createdAt);
}

export function getQuestion(id: string) {
  return db.select().from(QuestionTable).where(eq(QuestionTable.id, id));
}

export function getBookmarkedQuestions() {
  return db.select().from(QuestionTable).where(eq(QuestionTable.isBookmarked, true));
}

export function createQuestion(data: typeof QuestionTable.$inferInsert) {
  return db.insert(QuestionTable).values(data).returning();
}

export function updateQuestion(id: string, data: Partial<typeof QuestionTable.$inferInsert>) {
  return db
    .update(QuestionTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(QuestionTable.id, id))
    .returning();
}

export function toggleBookmark(id: string, isBookmarked: boolean) {
  return db
    .update(QuestionTable)
    .set({ isBookmarked, updatedAt: new Date() })
    .where(eq(QuestionTable.id, id))
    .returning();
}

export function deleteQuestion(id: string) {
  return db.delete(QuestionTable).where(eq(QuestionTable.id, id));
}
