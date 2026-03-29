import { unstable_cache } from 'next/cache';
import {
  getQuestions as getQuestionsDb,
  getQuestion as getQuestionDb,
  getBookmarkedQuestions as getBookmarkedQuestionsDb,
} from './db';

export const QUESTION_CACHE_TAG = 'questions';

export const getQuestions = unstable_cache(
  (jobInfoId: string) => getQuestionsDb(jobInfoId),
  ['questions', 'jobInfoId'],
  { tags: [QUESTION_CACHE_TAG] }
);

export const getQuestion = unstable_cache(
  (id: string) => getQuestionDb(id),
  ['question', 'id'],
  { tags: [QUESTION_CACHE_TAG] }
);

export const getBookmarkedQuestions = unstable_cache(
  () => getBookmarkedQuestionsDb(),
  ['bookmarked-questions'],
  { tags: [QUESTION_CACHE_TAG] }
);
