import { pgTable, varchar, uuid, integer, jsonb } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { JobInfoTable } from "./jobInfo";

export const ResumeAnalysisTable = pgTable("resume_analyses", {
  id,
  jobInfoId: uuid("job_info_id")
    .references(() => JobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
  fileName: varchar("file_name").notNull(),
  fileUrl: varchar("file_url"),
  overallScore: integer("overall_score").notNull(),
  atsScore: integer("ats_score").notNull(),
  jobMatchScore: integer("job_match_score").notNull(),
  writingScore: integer("writing_score").notNull(),
  keywordScore: integer("keyword_score").notNull(),
  fullAnalysis: jsonb("full_analysis").notNull(),
  aiModel: varchar("ai_model"),
  createdAt,
  updatedAt,
});
