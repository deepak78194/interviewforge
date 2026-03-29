import dynamic from 'next/dynamic';
import { getJobInfos } from '@/features/jobInfos/dbCache';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const VoiceInterview = dynamic(
  () => import('@/features/interviews/VoiceInterview').then(m => m.VoiceInterview),
  { ssr: false, loading: () => <p className="text-muted-foreground">Loading interview...</p> }
);

interface NewInterviewPageProps {
  searchParams: Promise<{ jobId?: string }>;
}

export default async function NewInterviewPage({ searchParams }: NewInterviewPageProps) {
  const { jobId } = await searchParams;

  let jobInfos: Awaited<ReturnType<typeof getJobInfos>> = [];
  try {
    jobInfos = await getJobInfos();
  } catch {
    // DB unavailable
  }

  const selectedJob = jobId ? jobInfos.find(j => j.id === jobId) : null;

  if (!selectedJob) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Link href="/app/interviews" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
          ← Interviews
        </Link>
        <h1 className="text-2xl font-bold mb-6">Start Mock Interview</h1>

        {jobInfos.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">You need to add a job first.</p>
              <Button asChild>
                <Link href="/app/jobs/new">Add a Job</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div>
            <p className="text-muted-foreground mb-4">Select a job to practice for:</p>
            <div className="space-y-2">
              {jobInfos.map(job => (
                <Link key={job.id} href={`/app/interviews/new?jobId=${job.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">
                        {job.title ?? job.name}
                        {job.companyName ? ` — ${job.companyName}` : ''}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/app/interviews/new" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
        ← Change Job
      </Link>
      <h1 className="text-2xl font-bold mb-1">Mock Interview</h1>
      <p className="text-muted-foreground text-sm mb-6">
        {selectedJob.title ?? selectedJob.name}
        {selectedJob.companyName ? ` at ${selectedJob.companyName}` : ''}
      </p>

      <Card className="min-h-[500px]">
        <CardContent className="pt-6">
          <VoiceInterview
            jobInfo={{
              id: selectedJob.id,
              title: selectedJob.title,
              companyName: selectedJob.companyName,
              description: selectedJob.description,
              experienceLevel: selectedJob.experienceLevel,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
