export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStudyPlan } from '@/features/studyPlans/dbCache';
import { updateStudyPlanAction } from '@/features/studyPlans/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EditPlanPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPlanPage({ params }: EditPlanPageProps) {
  const { id } = await params;

  let plan: Awaited<ReturnType<typeof getStudyPlan>>[0] | undefined;
  try {
    [plan] = await getStudyPlan(id);
  } catch {
    notFound();
  }

  if (!plan) notFound();

  const action = updateStudyPlanAction.bind(null, id);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href={`/app/plans/${id}`} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
        ← Plan
      </Link>
      <h1 className="text-2xl font-bold mb-6">Edit Plan</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Plan Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={plan.title} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={plan.description ?? ''}
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline" asChild>
                <Link href={`/app/plans/${id}`}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
