import { pgTable, varchar, uuid, integer, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { JobInfoTable } from "./jobInfo";

export const InterviewTable = pgTable("interviews", {
  id,
  jobInfoId: uuid("job_info_id")
    .references(() => JobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
  duration: integer("duration_seconds").notNull(),
  feedback: varchar("feedback"),
  overallScore: integer("overall_score"),
  communicationScore: integer("communication_score"),
  technicalScore: integer("technical_score"),
  starMethodScore: integer("star_method_score"),
  transcript: jsonb("transcript"),
  questionsAsked: integer("questions_asked").default(0),
  aiModel: varchar("ai_model"),
  createdAt,
  updatedAt,
});

export const InterviewRelations = relations(InterviewTable, ({ one }) => ({
  jobInfo: one(JobInfoTable, {
    fields: [InterviewTable.jobInfoId],
    references: [JobInfoTable.id],
  }),
}));
