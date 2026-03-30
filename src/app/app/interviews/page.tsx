import Link from 'next/link';
import { getInterviews } from '@/features/interviews/dbCache';
import { getJobInfos } from '@/features/jobInfos/dbCache';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function InterviewsPage() {
  let interviews: Awaited<ReturnType<typeof getInterviews>> = [];
  let jobInfos: Awaited<ReturnType<typeof getJobInfos>> = [];

  try {
    [interviews, jobInfos] = await Promise.all([getInterviews(), getJobInfos()]);
  } catch {
    // DB not available
  }

  const jobMap = new Map(jobInfos.map(j => [j.id, j]));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Interviews</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your mock interview sessions.</p>
        </div>
        <Button asChild>
          <Link href="/app/interviews/new">+ New Interview</Link>
        </Button>
      </div>

      {interviews.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p className="text-lg mb-4">No interviews yet.</p>
            <Button asChild>
              <Link href="/app/interviews/new">Start your first mock interview</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {interviews.map(interview => {
            const job = jobMap.get(interview.jobInfoId);
            return (
              <Link key={interview.id} href={`/app/interviews/${interview.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">
                          {job ? (job.title ?? job.name) : 'Interview'}
                          {job?.companyName ? ` — ${job.companyName}` : ''}
                        </CardTitle>
                        <CardDescription>
                          {new Date(interview.createdAt).toLocaleDateString()} ·{' '}
                          {Math.round(interview.duration / 60)} min
                        </CardDescription>
                      </div>
                      <div className="flex gap-1 flex-wrap justify-end">
                        {interview.overallScore != null && (
                          <Badge variant="secondary">{interview.overallScore}/10</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {interview.feedback && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{interview.feedback}</p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
