import { unstable_cache } from 'next/cache';
import { getJobInfos as getJobInfosDb, getJobInfo as getJobInfoDb } from './db';

export const JOB_INFO_CACHE_TAG = 'job-infos';

export const getJobInfos = unstable_cache(
  () => getJobInfosDb(),
  ['job-infos'],
  { tags: [JOB_INFO_CACHE_TAG] }
);

export const getJobInfo = unstable_cache(
  (id: string) => getJobInfoDb(id),
  ['job-info', 'id'],
  { tags: [JOB_INFO_CACHE_TAG] }
);
