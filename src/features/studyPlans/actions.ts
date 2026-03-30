'use server';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createStudyPlan,
  createStudyPlanDay,
  createStudyPlanTask,
  deleteStudyPlan,
  updateStudyPlan,
  completeTask,
  getStudyPlanTasks,
} from './db';
import { STUDY_PLAN_CACHE_TAG } from './dbCache';
import { generateStudyPlan } from '@/services/ai/studyPlanGeneration';

export async function createStudyPlanAction(formData: FormData) {
  const jobInfoId = formData.get('jobInfoId') as string | null;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string | null;
  const totalDays = parseInt(formData.get('totalDays') as string, 10);
  const startDateStr = formData.get('startDate') as string;

  const startDate = new Date(startDateStr);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + totalDays - 1);

  const [plan] = await createStudyPlan({
    jobInfoId: jobInfoId || undefined,
    title,
    description: description || undefined,
    totalDays,
    startDate,
    endDate,
    aiGenerated: false,
  });

  revalidateTag(STUDY_PLAN_CACHE_TAG);
  redirect(`/app/plans/${plan.id}`);
}

export async function createAIStudyPlanAction(formData: FormData) {
  const jobInfoId = formData.get('jobInfoId') as string | null;
  const totalDays = parseInt(formData.get('totalDays') as string, 10);
  const startDateStr = formData.get('startDate') as string;
  const jobTitle = formData.get('jobTitle') as string | null;
  const jobDescription = formData.get('jobDescription') as string;
  const experienceLevel = formData.get('experienceLevel') as string;
  const targetDateStr = formData.get('targetDate') as string | null;

  const startDate = new Date(startDateStr);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + totalDays - 1);

  const generated = await generateStudyPlan(
    {
      title: jobTitle,
      description: jobDescription,
      experienceLevel,
      targetDate: targetDateStr ? new Date(targetDateStr) : null,
    },
    totalDays
  );

  const [plan] = await createStudyPlan({
    jobInfoId: jobInfoId || undefined,
    title: generated.title,
    description: generated.description,
    totalDays,
    startDate,
    endDate,
    aiGenerated: true,
  });

  // Create days and tasks
  for (const day of generated.days) {
    const dayDate = new Date(startDate);
    dayDate.setDate(dayDate.getDate() + day.dayNumber - 1);

    const [planDay] = await createStudyPlanDay({
      studyPlanId: plan.id,
      dayNumber: day.dayNumber,
      date: dayDate,
      theme: day.theme,
    });

    for (let i = 0; i < day.tasks.length; i++) {
      const task = day.tasks[i];
      await createStudyPlanTask({
        studyPlanDayId: planDay.id,
        type: task.type,
        title: task.title,
        description: task.description,
        estimatedMinutes: task.estimatedMinutes,
        targetCount: task.targetCount ?? 1,
        order: i,
      });
    }
  }

  revalidateTag(STUDY_PLAN_CACHE_TAG);
  redirect(`/app/plans/${plan.id}`);
}

export async function deleteStudyPlanAction(id: string) {
  await deleteStudyPlan(id);
  revalidateTag(STUDY_PLAN_CACHE_TAG);
  redirect('/app/plans');
}

export async function updateStudyPlanAction(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string | null;

  await updateStudyPlan(id, {
    title,
    description: description || undefined,
  });

  revalidateTag(STUDY_PLAN_CACHE_TAG);
  redirect(`/app/plans/${id}`);
}

export async function completeTaskAction(taskId: string) {
  await completeTask(taskId);
  revalidateTag(STUDY_PLAN_CACHE_TAG);
}

export async function toggleTaskAction(taskId: string, studyPlanDayId: string) {
  const tasks = await getStudyPlanTasks(studyPlanDayId);
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const { updateStudyPlanTask } = await import('./db');
  await updateStudyPlanTask(taskId, {
    isComplete: !task.isComplete,
    completedAt: !task.isComplete ? new Date() : undefined,
  });

  revalidateTag(STUDY_PLAN_CACHE_TAG);
}
