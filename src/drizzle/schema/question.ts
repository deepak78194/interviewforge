import { pgTable, varchar, pgEnum, uuid, boolean, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { JobInfoTable } from "./jobInfo";
import { TopicTable } from "./topic";

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const questionTypeEnum = pgEnum("question_type", [
  "behavioral",
  "technical",
  "coding",
  "system-design",
]);

export const QuestionTable = pgTable("questions", {
  id,
  jobInfoId: uuid("job_info_id")
    .references(() => JobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
  topicId: uuid("topic_id")
    .references(() => TopicTable.id, { onDelete: "set null" }),
  text: varchar("text").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  type: questionTypeEnum("question_type").notNull().default("technical"),
  starterCode: varchar("starter_code"),
  expectedOutput: varchar("expected_output"),
  isBookmarked: boolean("is_bookmarked").notNull().default(false),
  personalNotes: varchar("personal_notes"),
  timesAttempted: integer("times_attempted").notNull().default(0),
  bestScore: integer("best_score"),
  createdAt,
  updatedAt,
});

export const QuestionRelations = relations(QuestionTable, ({ one, many }) => ({
  jobInfo: one(JobInfoTable, {
    fields: [QuestionTable.jobInfoId],
    references: [JobInfoTable.id],
  }),
  topic: one(TopicTable, {
    fields: [QuestionTable.topicId],
    references: [TopicTable.id],
  }),
  answers: many(AnswerTable),
}));

import { AnswerTable } from "./answer";
