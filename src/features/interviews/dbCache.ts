import { unstable_cache } from 'next/cache';
import { getInterviews as getInterviewsDb, getInterview as getInterviewDb } from './db';

export const INTERVIEW_CACHE_TAG = 'interviews';

export const getInterviews = unstable_cache(
  (jobInfoId?: string) => getInterviewsDb(jobInfoId),
  ['interviews'],
  { tags: [INTERVIEW_CACHE_TAG] }
);

export const getInterview = unstable_cache(
  (id: string) => getInterviewDb(id),
  ['interview'],
  { tags: [INTERVIEW_CACHE_TAG] }
);
