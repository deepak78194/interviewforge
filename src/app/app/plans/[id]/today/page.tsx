export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStudyPlan, getStudyPlanDays, getStudyPlanTasks } from '@/features/studyPlans/dbCache';
import { DayView } from '@/features/studyPlans/DayView';

interface TodayPageProps {
  params: Promise<{ id: string }>;
}

export default async function TodayPage({ params }: TodayPageProps) {
  const { id } = await params;

  let plan: Awaited<ReturnType<typeof getStudyPlan>>[0] | undefined;
  try {
    [plan] = await getStudyPlan(id);
  } catch {
    notFound();
  }

  if (!plan) notFound();

  // Find today's day number
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(plan.startDate);
  startDate.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - startDate.getTime();
  const dayNumber = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

  if (dayNumber < 1 || dayNumber > plan.totalDays) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Link href={`/app/plans/${id}`} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
          ← Plan
        </Link>
        <p className="text-muted-foreground">
          {dayNumber < 1 ? "This plan hasn't started yet." : "This plan has ended."}
        </p>
      </div>
    );
  }

  let days: Awaited<ReturnType<typeof getStudyPlanDays>> = [];
  try {
    days = await getStudyPlanDays(id);
  } catch {
    // DB unavailable
  }

  const todayDay = days.find(d => d.dayNumber === dayNumber);
  const tasks = todayDay ? await getStudyPlanTasks(todayDay.id).catch(() => []) : [];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href={`/app/plans/${id}`} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
        ← Plan
      </Link>
      <h1 className="text-2xl font-bold mb-6">Today&apos;s Tasks</h1>

      {!todayDay ? (
        <p className="text-muted-foreground">No tasks scheduled for today (Day {dayNumber}).</p>
      ) : (
        <DayView
          day={{
            id: todayDay.id,
            dayNumber: todayDay.dayNumber,
            theme: todayDay.theme,
            date: todayDay.date,
            isComplete: todayDay.isComplete,
          }}
          tasks={tasks.map(t => ({
            id: t.id,
            studyPlanDayId: t.studyPlanDayId,
            type: t.type,
            title: t.title,
            description: t.description,
            estimatedMinutes: t.estimatedMinutes,
            targetCount: t.targetCount,
            isComplete: t.isComplete,
            order: t.order,
          }))}
        />
      )}
    </div>
  );
}
