import { unstable_cache } from 'next/cache';
import {
  getStudyPlans as getStudyPlansDb,
  getStudyPlan as getStudyPlanDb,
  getStudyPlanDays as getStudyPlanDaysDb,
  getStudyPlanTasks as getStudyPlanTasksDb,
} from './db';

export const STUDY_PLAN_CACHE_TAG = 'study-plans';

export const getStudyPlans = unstable_cache(
  () => getStudyPlansDb(),
  ['study-plans'],
  { tags: [STUDY_PLAN_CACHE_TAG] }
);

export const getStudyPlan = unstable_cache(
  (id: string) => getStudyPlanDb(id),
  ['study-plan'],
  { tags: [STUDY_PLAN_CACHE_TAG] }
);

export const getStudyPlanDays = unstable_cache(
  (studyPlanId: string) => getStudyPlanDaysDb(studyPlanId),
  ['study-plan-days'],
  { tags: [STUDY_PLAN_CACHE_TAG] }
);

export const getStudyPlanTasks = unstable_cache(
  (studyPlanDayId: string) => getStudyPlanTasksDb(studyPlanDayId),
  ['study-plan-tasks'],
  { tags: [STUDY_PLAN_CACHE_TAG] }
);
