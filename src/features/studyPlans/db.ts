import { db } from '@/drizzle/db';
import { StudyPlanTable, StudyPlanDayTable, StudyPlanTaskTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export function getStudyPlans() {
  return db.select().from(StudyPlanTable).orderBy(StudyPlanTable.createdAt);
}

export function getStudyPlan(id: string) {
  return db.select().from(StudyPlanTable).where(eq(StudyPlanTable.id, id));
}

export function createStudyPlan(data: typeof StudyPlanTable.$inferInsert) {
  return db.insert(StudyPlanTable).values(data).returning();
}

export function updateStudyPlan(id: string, data: Partial<typeof StudyPlanTable.$inferInsert>) {
  return db.update(StudyPlanTable).set({ ...data, updatedAt: new Date() }).where(eq(StudyPlanTable.id, id)).returning();
}

export function deleteStudyPlan(id: string) {
  return db.delete(StudyPlanTable).where(eq(StudyPlanTable.id, id));
}

export function getStudyPlanDays(studyPlanId: string) {
  return db.select().from(StudyPlanDayTable).where(eq(StudyPlanDayTable.studyPlanId, studyPlanId)).orderBy(StudyPlanDayTable.dayNumber);
}

export function getStudyPlanDay(id: string) {
  return db.select().from(StudyPlanDayTable).where(eq(StudyPlanDayTable.id, id));
}

export function createStudyPlanDay(data: typeof StudyPlanDayTable.$inferInsert) {
  return db.insert(StudyPlanDayTable).values(data).returning();
}

export function updateStudyPlanDay(id: string, data: Partial<typeof StudyPlanDayTable.$inferInsert>) {
  return db.update(StudyPlanDayTable).set({ ...data, updatedAt: new Date() }).where(eq(StudyPlanDayTable.id, id)).returning();
}

export function getStudyPlanTasks(studyPlanDayId: string) {
  return db.select().from(StudyPlanTaskTable).where(eq(StudyPlanTaskTable.studyPlanDayId, studyPlanDayId)).orderBy(StudyPlanTaskTable.order);
}

export function createStudyPlanTask(data: typeof StudyPlanTaskTable.$inferInsert) {
  return db.insert(StudyPlanTaskTable).values(data).returning();
}

export function updateStudyPlanTask(id: string, data: Partial<typeof StudyPlanTaskTable.$inferInsert>) {
  return db.update(StudyPlanTaskTable).set({ ...data, updatedAt: new Date() }).where(eq(StudyPlanTaskTable.id, id)).returning();
}

export function completeTask(id: string) {
  return db.update(StudyPlanTaskTable).set({
    isComplete: true,
    completedAt: new Date(),
    updatedAt: new Date(),
  }).where(eq(StudyPlanTaskTable.id, id)).returning();
}
