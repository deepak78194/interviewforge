import { db } from '@/drizzle/db';
import { ResumeAnalysisTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export function getResumeAnalyses(jobInfoId: string) {
  return db
    .select()
    .from(ResumeAnalysisTable)
    .where(eq(ResumeAnalysisTable.jobInfoId, jobInfoId))
    .orderBy(ResumeAnalysisTable.createdAt);
}

export function getResumeAnalysis(id: string) {
  return db.select().from(ResumeAnalysisTable).where(eq(ResumeAnalysisTable.id, id));
}

export function createResumeAnalysis(data: typeof ResumeAnalysisTable.$inferInsert) {
  return db.insert(ResumeAnalysisTable).values(data).returning();
}

export function deleteResumeAnalysis(id: string) {
  return db.delete(ResumeAnalysisTable).where(eq(ResumeAnalysisTable.id, id));
}
