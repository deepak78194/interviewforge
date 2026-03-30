export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJobInfo } from '@/features/jobInfos/dbCache';
import { deleteJobInfoAction } from '@/features/jobInfos/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const [job] = await getJobInfo(id);

  if (!job) notFound();

  const deleteAction = deleteJobInfoAction.bind(null, id);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/app/jobs" className="text-muted-foreground hover:text-foreground text-sm">
          ← Jobs
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{job.name}</h1>
          {(job.title || job.companyName) && (
            <p className="text-muted-foreground mt-1">
              {job.title}
              {job.title && job.companyName && ' at '}
              {job.companyName}
            </p>
          )}
        </div>
        <Badge variant="secondary" className="capitalize">{job.experienceLevel}</Badge>
      </div>

      <div className="flex gap-3 mb-6">
        <Link href={`/app/jobs/${id}/edit`}>
          <Button variant="outline" size="sm">Edit</Button>
        </Link>
        <form action={deleteAction}>
          <Button type="submit" variant="destructive" size="sm">Delete</Button>
        </form>
        <Link href={`/app/questions?jobInfoId=${id}`}>
          <Button variant="outline" size="sm">View Questions</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {job.companyInfo && (
          <Card>
            <CardHeader><CardTitle className="text-base">Company Info</CardTitle></CardHeader>
            <CardContent><p className="text-sm whitespace-pre-wrap">{job.companyInfo}</p></CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle className="text-base">Job Description</CardTitle></CardHeader>
          <CardContent><p className="text-sm whitespace-pre-wrap">{job.description}</p></CardContent>
        </Card>

        {job.targetDate && (
          <Card>
            <CardHeader><CardTitle className="text-base">Target Date</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm">{new Date(job.targetDate).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
