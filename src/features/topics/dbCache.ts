import { unstable_cache } from 'next/cache';
import {
  getTopics as getTopicsDb,
  getTopicsByCategory as getTopicsByCategoryDb,
  getTopic as getTopicDb,
} from './db';

export const TOPIC_CACHE_TAG = 'topics';

export const getTopics = unstable_cache(() => getTopicsDb(), ['topics'], {
  tags: [TOPIC_CACHE_TAG],
});

export const getTopicsByCategory = unstable_cache(
  (cat: string) => getTopicsByCategoryDb(cat),
  ['topics-by-category', 'cat'],
  { tags: [TOPIC_CACHE_TAG] }
);

export const getTopic = unstable_cache((id: string) => getTopicDb(id), ['topic', 'id'], {
  tags: [TOPIC_CACHE_TAG],
});
