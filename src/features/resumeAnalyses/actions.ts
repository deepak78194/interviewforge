'use server';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { analyzeResume } from '@/services/ai/resumeAnalysis';
import { createResumeAnalysis } from './db';

export const RESUME_ANALYSIS_CACHE_TAG = 'resume-analyses';

export async function analyzeResumeAction(jobInfoId: string, jobTitle: string, jobDescription: string, formData: FormData) {
  const resumeText = formData.get('resumeText') as string;

  if (!resumeText?.trim()) {
    throw new Error('Resume text is required');
  }

  const result = await analyzeResume(resumeText, jobDescription, jobTitle);

  await createResumeAnalysis({
    jobInfoId,
    fileName: 'pasted-resume.txt',
    fileUrl: undefined,
    overallScore: result.overallScore,
    atsScore: result.atsScore,
    jobMatchScore: result.keywordsScore,
    writingScore: result.formattingScore,
    keywordScore: result.keywordsScore,
    fullAnalysis: result,
    aiModel: 'gpt-4.1',
  });

  revalidateTag(RESUME_ANALYSIS_CACHE_TAG);
  redirect(`/app/resume?jobId=${jobInfoId}&done=1`);
}
