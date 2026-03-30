import { unstable_cache } from 'next/cache';
import { getPracticeHistory as getPracticeHistoryDb } from './db';

export const PROGRESS_CACHE_TAG = 'progress';

export const getPracticeHistory = unstable_cache(
  (days?: number) => getPracticeHistoryDb(days),
  ['practice-history'],
  { tags: [PROGRESS_CACHE_TAG], revalidate: 300 }
);
