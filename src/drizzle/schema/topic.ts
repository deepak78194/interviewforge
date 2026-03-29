import { pgTable, varchar, pgEnum, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { difficultyEnum } from "./enums";

export const topicCategoryEnum = pgEnum("topic_category", [
  "data-structures",
  "algorithms",
  "system-design",
  "behavioral",
  "database",
  "networking",
  "object-oriented",
  "frontend",
  "backend",
  "language-specific",
  "soft-skills",
]);

export const TopicTable = pgTable("topics", {
  id,
  name: varchar("name").notNull(),
  category: topicCategoryEnum("category").notNull(),
  description: varchar("description"),
  resourceUrl: varchar("resource_url"),
  estimatedMinutes: integer("estimated_minutes").default(45),
  difficulty: difficultyEnum("difficulty").notNull().default("medium"),
  order: integer("order").default(0),
  createdAt,
  updatedAt,
});

export const TopicRelations = relations(TopicTable, ({ many }) => ({
  studyPlanTasks: many(StudyPlanTaskTable),
  questions: many(QuestionTable),
}));

import { StudyPlanTaskTable } from "./studyPlanTask";
import { QuestionTable } from "./question";
