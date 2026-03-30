import { pgEnum } from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const questionTypeEnum = pgEnum("question_type", [
  "behavioral",
  "technical",
  "coding",
  "system-design",
]);
