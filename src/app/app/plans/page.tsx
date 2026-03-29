import Link from 'next/link';
import { getStudyPlans } from '@/features/studyPlans/dbCache';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function PlansPage() {
  let plans: Awaited<ReturnType<typeof getStudyPlans>> = [];
  try {
    plans = await getStudyPlans();
  } catch {
    // DB unavailable
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Study Plans</h1>
          <p className="text-muted-foreground text-sm mt-1">Structured preparation plans for your job search.</p>
        </div>
        <Button asChild>
          <Link href="/app/plans/new">+ New Plan</Link>
        </Button>
      </div>

      {plans.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p className="text-lg mb-4">No study plans yet.</p>
            <Button asChild>
              <Link href="/app/plans/new">Create your first plan</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {plans.map(plan => {
            const progress = plan.totalDays > 0 ? Math.round((plan.completedDays / plan.totalDays) * 100) : 0;
            return (
              <Link key={plan.id} href={`/app/plans/${plan.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{plan.title}</CardTitle>
                        <CardDescription>{plan.description ?? `${plan.totalDays}-day plan`}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {plan.aiGenerated && <Badge variant="secondary">AI</Badge>}
                        {plan.isActive && <Badge>Active</Badge>}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{plan.completedDays}/{plan.totalDays} days</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full">
                        <div
                          className="h-1.5 bg-primary rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
