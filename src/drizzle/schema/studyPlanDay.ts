import { pgTable, varchar, uuid, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { StudyPlanTable } from "./studyPlan";

export const StudyPlanDayTable = pgTable("study_plan_days", {
  id,
  studyPlanId: uuid("study_plan_id")
    .references(() => StudyPlanTable.id, { onDelete: "cascade" })
    .notNull(),
  dayNumber: integer("day_number").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  theme: varchar("theme"),
  notes: varchar("notes"),
  isComplete: boolean("is_complete").notNull().default(false),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt,
  updatedAt,
});

export const StudyPlanDayRelations = relations(StudyPlanDayTable, ({ one, many }) => ({
  studyPlan: one(StudyPlanTable, {
    fields: [StudyPlanDayTable.studyPlanId],
    references: [StudyPlanTable.id],
  }),
  tasks: many(StudyPlanTaskTable),
}));

import { StudyPlanTaskTable } from "./studyPlanTask";
