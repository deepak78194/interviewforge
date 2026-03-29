import { pgTable, varchar, uuid, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { StudyPlanDayTable } from "./studyPlanDay";
import { TopicTable } from "./topic";

export const taskTypeEnum = pgEnum("task_type", [
  "study_topic",
  "solve_questions",
  "mock_interview",
  "resume_review",
  "coding_challenge",
  "system_design",
  "custom",
]);

export const StudyPlanTaskTable = pgTable("study_plan_tasks", {
  id,
  studyPlanDayId: uuid("study_plan_day_id")
    .references(() => StudyPlanDayTable.id, { onDelete: "cascade" })
    .notNull(),
  type: taskTypeEnum("task_type").notNull(),
  title: varchar("title").notNull(),
  description: varchar("description"),
  topicId: uuid("topic_id")
    .references(() => TopicTable.id, { onDelete: "set null" }),
  targetCount: integer("target_count").default(1),
  completedCount: integer("completed_count").default(0),
  isComplete: boolean("is_complete").notNull().default(false),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  estimatedMinutes: integer("estimated_minutes"),
  order: integer("order").notNull().default(0),
  createdAt,
  updatedAt,
});

export const StudyPlanTaskRelations = relations(StudyPlanTaskTable, ({ one }) => ({
  studyPlanDay: one(StudyPlanDayTable, {
    fields: [StudyPlanTaskTable.studyPlanDayId],
    references: [StudyPlanDayTable.id],
  }),
  topic: one(TopicTable, {
    fields: [StudyPlanTaskTable.topicId],
    references: [TopicTable.id],
  }),
}));
