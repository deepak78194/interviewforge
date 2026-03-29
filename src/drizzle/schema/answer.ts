import { pgTable, varchar, uuid, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { QuestionTable } from "./question";

export const AnswerTable = pgTable("answers", {
  id,
  questionId: uuid("question_id")
    .references(() => QuestionTable.id, { onDelete: "cascade" })
    .notNull(),
  content: varchar("content").notNull(),
  code: varchar("code"),
  score: integer("score"),
  feedback: varchar("feedback"),
  correctAnswer: varchar("correct_answer"),
  aiModel: varchar("ai_model"),
  createdAt,
  updatedAt,
});

export const AnswerRelations = relations(AnswerTable, ({ one }) => ({
  question: one(QuestionTable, {
    fields: [AnswerTable.questionId],
    references: [QuestionTable.id],
  }),
}));
