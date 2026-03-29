// Barrel export for all schema tables, relations, and enums
export {
  JobInfoTable,
  JobInfoRelations,
  experienceLevelEnum,
} from "./schema/jobInfo";

export {
  TopicTable,
  TopicRelations,
  topicCategoryEnum,
} from "./schema/topic";

export {
  QuestionTable,
  QuestionRelations,
  difficultyEnum,
  questionTypeEnum,
} from "./schema/question";

export {
  AnswerTable,
  AnswerRelations,
} from "./schema/answer";

export {
  InterviewTable,
  InterviewRelations,
} from "./schema/interview";

export {
  ResumeAnalysisTable,
} from "./schema/resumeAnalysis";

export {
  StudyPlanTable,
  StudyPlanRelations,
} from "./schema/studyPlan";

export {
  StudyPlanDayTable,
  StudyPlanDayRelations,
} from "./schema/studyPlanDay";

export {
  StudyPlanTaskTable,
  StudyPlanTaskRelations,
  taskTypeEnum,
} from "./schema/studyPlanTask";

export {
  PracticeHistoryTable,
  activityTypeEnum,
} from "./schema/practiceHistory";
