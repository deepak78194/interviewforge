import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStudyPlan, getStudyPlanDays } from '@/features/studyPlans/dbCache';
import { PlanCalendar } from '@/features/studyPlans/PlanCalendar';
import { deleteStudyPlanAction } from '@/features/studyPlans/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PlanDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  const { id } = await params;

  let plan: Awaited<ReturnType<typeof getStudyPlan>>[0] | undefined;
  let days: Awaited<ReturnType<typeof getStudyPlanDays>> = [];

  try {
    [plan] = await getStudyPlan(id);
    if (!plan) notFound();
    days = await getStudyPlanDays(id);
  } catch {
    notFound();
  }

  if (!plan) notFound();

  const progress = plan.totalDays > 0 ? Math.round((plan.completedDays / plan.totalDays) * 100) : 0;
  const deleteAction = deleteStudyPlanAction.bind(null, id);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/app/plans" className="text-sm text-muted-foreground hover:text-foreground">
          ← Plans
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{plan.title}</h1>
            {plan.aiGenerated && <Badge variant="secondary">AI</Badge>}
            {plan.isActive && <Badge>Active</Badge>}
          </div>
          {plan.description && <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>}
          <p className="text-xs text-muted-foreground mt-1">
            {plan.totalDays} days · {plan.completedDays} completed · {progress}%
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/app/plans/${id}/today`}>Today&apos;s Tasks</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/app/plans/${id}/edit`}>Edit</Link>
          </Button>
          <form action={deleteAction}>
            <Button variant="destructive" size="sm" type="submit">Delete</Button>
          </form>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full h-2 bg-muted rounded-full">
          <div className="h-2 bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <PlanCalendar
            days={days.map(d => ({
              id: d.id,
              dayNumber: d.dayNumber,
              date: d.date,
              theme: d.theme,
              isComplete: d.isComplete,
            }))}
            planId={id}
            startDate={plan.startDate}
            totalDays={plan.totalDays}
          />
        </CardContent>
      </Card>
    </div>
  );
}
