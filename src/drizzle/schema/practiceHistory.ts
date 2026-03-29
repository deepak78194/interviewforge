import { pgTable, varchar, uuid, integer, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { JobInfoTable } from "./jobInfo";

export const activityTypeEnum = pgEnum("activity_type", [
  "question_answered",
  "interview_completed",
  "resume_analyzed",
  "coding_challenge",
  "study_session",
]);

export const PracticeHistoryTable = pgTable("practice_history", {
  id,
  jobInfoId: uuid("job_info_id")
    .references(() => JobInfoTable.id, { onDelete: "set null" }),
  activityType: activityTypeEnum("activity_type").notNull(),
  score: integer("score"),
  durationMinutes: integer("duration_minutes"),
  metadata: jsonb("metadata"),
  createdAt,
  updatedAt,
});
