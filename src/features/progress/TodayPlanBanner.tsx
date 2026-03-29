import Link from 'next/link';
import { getStudyPlans } from '@/features/studyPlans/dbCache';
import { getStudyPlanDays, getStudyPlanTasks } from '@/features/studyPlans/dbCache';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export async function TodayPlanBanner() {
  let plans: Awaited<ReturnType<typeof getStudyPlans>> = [];
  try {
    plans = await getStudyPlans();
  } catch {
    return null;
  }

  const activePlan = plans.find(p => p.isActive);
  if (!activePlan) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(activePlan.startDate);
  startDate.setHours(0, 0, 0, 0);
  const dayNumber = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  if (dayNumber < 1 || dayNumber > activePlan.totalDays) return null;

  let days: Awaited<ReturnType<typeof getStudyPlanDays>> = [];
  try {
    days = await getStudyPlanDays(activePlan.id);
  } catch {
    return null;
  }

  const todayDay = days.find(d => d.dayNumber === dayNumber);
  if (!todayDay) return null;

  const tasks = await getStudyPlanTasks(todayDay.id).catch(() => []);
  const completedCount = tasks.filter(t => t.isComplete).length;
  const totalCount = tasks.length;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          📅 Today&apos;s Plan — Day {dayNumber}: {todayDay.theme ?? activePlan.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {completedCount}/{totalCount} tasks completed
          </p>
          <Button size="sm" asChild>
            <Link href={`/app/plans/${activePlan.id}/today`}>View Tasks</Link>
          </Button>
        </div>
        <div className="mt-2 w-full h-1.5 bg-muted rounded-full">
          <div
            className="h-1.5 bg-primary rounded-full"
            style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
