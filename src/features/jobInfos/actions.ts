'use server';
import { z } from 'zod';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { createJobInfo, updateJobInfo, deleteJobInfo } from './db';
import { JOB_INFO_CACHE_TAG } from './dbCache';

const jobInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().optional(),
  companyName: z.string().optional(),
  companyInfo: z.string().optional(),
  experienceLevel: z.enum(['junior', 'mid-level', 'senior']),
  description: z.string().min(1, 'Job description is required'),
  targetDate: z.string().optional(),
});

export type JobInfoFormData = z.infer<typeof jobInfoSchema>;

export async function createJobInfoAction(formData: FormData) {
  const data = jobInfoSchema.parse({
    name: formData.get('name'),
    title: formData.get('title') || undefined,
    companyName: formData.get('companyName') || undefined,
    companyInfo: formData.get('companyInfo') || undefined,
    experienceLevel: formData.get('experienceLevel'),
    description: formData.get('description'),
    targetDate: formData.get('targetDate') || undefined,
  });

  await createJobInfo({
    ...data,
    targetDate: data.targetDate ? new Date(data.targetDate) : undefined,
  });

  revalidateTag(JOB_INFO_CACHE_TAG);
  redirect('/app/jobs');
}

export async function updateJobInfoAction(id: string, formData: FormData) {
  const data = jobInfoSchema.parse({
    name: formData.get('name'),
    title: formData.get('title') || undefined,
    companyName: formData.get('companyName') || undefined,
    companyInfo: formData.get('companyInfo') || undefined,
    experienceLevel: formData.get('experienceLevel'),
    description: formData.get('description'),
    targetDate: formData.get('targetDate') || undefined,
  });

  await updateJobInfo(id, {
    ...data,
    targetDate: data.targetDate ? new Date(data.targetDate) : undefined,
  });

  revalidateTag(JOB_INFO_CACHE_TAG);
  redirect('/app/jobs');
}

export async function deleteJobInfoAction(id: string) {
  await deleteJobInfo(id);
  revalidateTag(JOB_INFO_CACHE_TAG);
  redirect('/app/jobs');
}
