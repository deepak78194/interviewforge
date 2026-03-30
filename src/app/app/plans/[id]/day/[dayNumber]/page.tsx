import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStudyPlanDays, getStudyPlanTasks } from '@/features/studyPlans/dbCache';
import { DayView } from '@/features/studyPlans/DayView';

interface DayPageProps {
  params: Promise<{ id: string; dayNumber: string }>;
}

export default async function DayPage({ params }: DayPageProps) {
  const { id, dayNumber: dayNumberStr } = await params;
  const dayNumber = parseInt(dayNumberStr, 10);

  let days: Awaited<ReturnType<typeof getStudyPlanDays>> = [];
  try {
    days = await getStudyPlanDays(id);
  } catch {
    notFound();
  }

  const day = days.find(d => d.dayNumber === dayNumber);
  if (!day) notFound();

  const tasks = await getStudyPlanTasks(day.id).catch(() => []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href={`/app/plans/${id}`} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
        ← Plan
      </Link>

      <DayView
        day={{
          id: day.id,
          dayNumber: day.dayNumber,
          theme: day.theme,
          date: day.date,
          isComplete: day.isComplete,
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
    </div>
  );
}
