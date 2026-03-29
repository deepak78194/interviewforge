import { db } from '@/drizzle/db';
import { InterviewTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export function getInterviews(jobInfoId?: string) {
  if (jobInfoId) {
    return db.select().from(InterviewTable).where(eq(InterviewTable.jobInfoId, jobInfoId)).orderBy(InterviewTable.createdAt);
  }
  return db.select().from(InterviewTable).orderBy(InterviewTable.createdAt);
}

export function getInterview(id: string) {
  return db.select().from(InterviewTable).where(eq(InterviewTable.id, id));
}

export function createInterview(data: typeof InterviewTable.$inferInsert) {
  return db.insert(InterviewTable).values(data).returning();
}

export function updateInterview(id: string, data: Partial<typeof InterviewTable.$inferInsert>) {
  return db.update(InterviewTable).set({ ...data, updatedAt: new Date() }).where(eq(InterviewTable.id, id)).returning();
}
