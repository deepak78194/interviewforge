import { pgTable, varchar, uuid, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { JobInfoTable } from "./jobInfo";

export const StudyPlanTable = pgTable("study_plans", {
  id,
  jobInfoId: uuid("job_info_id")
    .references(() => JobInfoTable.id, { onDelete: "set null" }),
  title: varchar("title").notNull(),
  description: varchar("description"),
  totalDays: integer("total_days").notNull(),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  aiGenerated: boolean("ai_generated").notNull().default(false),
  completedDays: integer("completed_days").notNull().default(0),
  createdAt,
  updatedAt,
});

export const StudyPlanRelations = relations(StudyPlanTable, ({ one, many }) => ({
  jobInfo: one(JobInfoTable, {
    fields: [StudyPlanTable.jobInfoId],
    references: [JobInfoTable.id],
  }),
  days: many(StudyPlanDayTable),
}));

import { StudyPlanDayTable } from "./studyPlanDay";
