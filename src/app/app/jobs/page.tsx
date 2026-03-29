import Link from 'next/link';
import { getJobInfos } from '@/features/jobInfos/dbCache';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function JobsPage() {
  const jobs = await getJobInfos();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Job Applications</h1>
          <p className="text-muted-foreground mt-1">Manage your job targets and interview prep.</p>
        </div>
        <Link href="/app/jobs/new">
          <Button>Add New Job</Button>
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No jobs added yet.</p>
          <p className="mt-2">Add your first job to start preparing.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Link key={job.id} href={`/app/jobs/${job.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{job.name}</CardTitle>
                      {(job.title || job.companyName) && (
                        <CardDescription className="mt-1">
                          {job.title}
                          {job.title && job.companyName && ' at '}
                          {job.companyName}
                        </CardDescription>
                      )}
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {job.experienceLevel}
                    </Badge>
                  </div>
                </CardHeader>
                {job.targetDate && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Target: {new Date(job.targetDate).toLocaleDateString()}
                    </p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
