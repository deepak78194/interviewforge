import { db } from '@/drizzle/db';
import { JobInfoTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export function getJobInfos() {
  return db.select().from(JobInfoTable).orderBy(JobInfoTable.createdAt);
}

export function getJobInfo(id: string) {
  return db.select().from(JobInfoTable).where(eq(JobInfoTable.id, id));
}

export function createJobInfo(data: typeof JobInfoTable.$inferInsert) {
  return db.insert(JobInfoTable).values(data).returning();
}

export function updateJobInfo(id: string, data: Partial<typeof JobInfoTable.$inferInsert>) {
  return db.update(JobInfoTable).set({ ...data, updatedAt: new Date() }).where(eq(JobInfoTable.id, id)).returning();
}

export function deleteJobInfo(id: string) {
  return db.delete(JobInfoTable).where(eq(JobInfoTable.id, id));
}
