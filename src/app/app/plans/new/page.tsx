export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getJobInfos } from '@/features/jobInfos/dbCache';
import { PlanForm } from '@/features/studyPlans/PlanForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function NewPlanPage() {
  let jobInfos: Awaited<ReturnType<typeof getJobInfos>> = [];
  try {
    jobInfos = await getJobInfos();
  } catch {
    // DB unavailable
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/app/plans" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
        ← Study Plans
      </Link>
      <h1 className="text-2xl font-bold mb-6">New Study Plan</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Create a Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <PlanForm jobInfos={jobInfos.map(j => ({
            id: j.id,
            name: j.name,
            title: j.title,
            description: j.description,
            experienceLevel: j.experienceLevel,
            targetDate: j.targetDate ?? null,
          }))} />
        </CardContent>
      </Card>
    </div>
  );
}
