import { db } from '@/drizzle/db';
import { PracticeHistoryTable } from '@/drizzle/schema';
import { desc, gte } from 'drizzle-orm';

export function getPracticeHistory(days: number = 90) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  return db
    .select()
    .from(PracticeHistoryTable)
    .where(gte(PracticeHistoryTable.createdAt, since))
    .orderBy(desc(PracticeHistoryTable.createdAt));
}

export function createPracticeHistory(data: typeof PracticeHistoryTable.$inferInsert) {
  return db.insert(PracticeHistoryTable).values(data).returning();
}
