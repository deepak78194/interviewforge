import { pgTable, varchar, pgEnum, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";

export const experienceLevelEnum = pgEnum("experience_level", [
  "junior",
  "mid-level",
  "senior",
]);

export const JobInfoTable = pgTable("job_infos", {
  id,
  name: varchar("name").notNull(),
  title: varchar("title"),
  companyName: varchar("company_name"),
  companyInfo: varchar("company_info"),
  experienceLevel: experienceLevelEnum("experience_level").notNull(),
  description: varchar("description").notNull(),
  targetDate: timestamp("target_date", { withTimezone: true }),
  createdAt,
  updatedAt,
});

export const JobInfoRelations = relations(JobInfoTable, ({ many }) => ({
  questions: many(QuestionTable),
  interviews: many(InterviewTable),
  resumeAnalyses: many(ResumeAnalysisTable),
  studyPlans: many(StudyPlanTable),
}));

// Forward references - these will be imported from their respective files
import { QuestionTable } from "./question";
import { InterviewTable } from "./interview";
import { ResumeAnalysisTable } from "./resumeAnalysis";
import { StudyPlanTable } from "./studyPlan";
