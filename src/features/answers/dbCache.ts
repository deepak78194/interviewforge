import { unstable_cache } from 'next/cache';
import { getAnswers as getAnswersDb } from './db';

export const ANSWER_CACHE_TAG = 'answers';

export const getAnswers = unstable_cache(
  (questionId: string) => getAnswersDb(questionId),
  ['answers'],
  { tags: [ANSWER_CACHE_TAG] }
);
