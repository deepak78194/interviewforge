import Link from 'next/link';
import { getJobInfos } from '@/features/jobInfos/dbCache';
import { getResumeAnalyses } from '@/features/resumeAnalyses/db';
import { analyzeResumeAction } from '@/features/resumeAnalyses/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface ResumePageProps {
  searchParams: Promise<{ jobId?: string; done?: string }>;
}

export default async function ResumePage({ searchParams }: ResumePageProps) {
  const { jobId, done } = await searchParams;

  let jobInfos: Awaited<ReturnType<typeof getJobInfos>> = [];
  try {
    jobInfos = await getJobInfos();
  } catch {
    // DB unavailable
  }

  const selectedJob = jobId ? jobInfos.find(j => j.id === jobId) : jobInfos[0];

  const analyses = selectedJob
    ? await getResumeAnalyses(selectedJob.id).catch(() => [])
    : [];

  const latestAnalysis = analyses[analyses.length - 1];
  const fullAnalysis = (latestAnalysis?.fullAnalysis ?? null) as {
    summary?: string;
    strengths?: string[];
    recommendations?: string[];
    missingKeywords?: string[];
  } | null;

  const action = selectedJob
    ? analyzeResumeAction.bind(null, selectedJob.id, selectedJob.title ?? selectedJob.name, selectedJob.description)
    : null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Resume Analysis</h1>
      <p className="text-muted-foreground text-sm mb-6">Paste your resume to analyze it against a job description.</p>

      {jobInfos.length > 1 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {jobInfos.map(job => (
            <Link key={job.id} href={`/app/resume?jobId=${job.id}`}>
              <Badge variant={job.id === selectedJob?.id ? 'default' : 'outline'}>
                {job.title ?? job.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {!selectedJob ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground mb-4">Add a job first to analyze your resume against it.</p>
            <Button asChild><Link href="/app/jobs/new">Add Job</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {done && latestAnalysis && (
            <Card className="border-green-200 bg-green-50 dark:bg-green-950">
              <CardHeader>
                <CardTitle className="text-base text-green-700 dark:text-green-300">Analysis Complete!</CardTitle>
              </CardHeader>
            </Card>
          )}

          {latestAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Latest Analysis</CardTitle>
                <p className="text-xs text-muted-foreground">{new Date(latestAnalysis.createdAt).toLocaleDateString()}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Overall', value: latestAnalysis.overallScore },
                    { label: 'ATS', value: latestAnalysis.atsScore },
                    { label: 'Keywords', value: latestAnalysis.keywordScore },
                    { label: 'Job Match', value: latestAnalysis.jobMatchScore },
                    { label: 'Writing', value: latestAnalysis.writingScore },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center p-3 bg-muted rounded">
                      <div className="text-2xl font-bold">{value}</div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>

                {fullAnalysis?.summary && (
                  <div>
                    <p className="font-medium text-sm mb-1">Summary</p>
                    <p className="text-sm text-muted-foreground">{fullAnalysis.summary}</p>
                  </div>
                )}

                {fullAnalysis?.strengths && fullAnalysis.strengths.length > 0 && (
                  <div>
                    <p className="font-medium text-sm mb-1">Strengths</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {fullAnalysis.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-muted-foreground">{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {fullAnalysis?.recommendations && fullAnalysis.recommendations.length > 0 && (
                  <div>
                    <p className="font-medium text-sm mb-1">Recommendations</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {fullAnalysis.recommendations.map((r, i) => (
                        <li key={i} className="text-sm text-muted-foreground">{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {fullAnalysis?.missingKeywords && fullAnalysis.missingKeywords.length > 0 && (
                  <div>
                    <p className="font-medium text-sm mb-1">Missing Keywords</p>
                    <div className="flex flex-wrap gap-1">
                      {fullAnalysis.missingKeywords.map((kw, i) => (
                        <Badge key={i} variant="destructive" className="text-xs">{kw}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {action && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {latestAnalysis ? 'Analyze Again' : 'Analyze Resume'}
                </CardTitle>
                <p className="text-xs text-muted-foreground">Against: {selectedJob.title ?? selectedJob.name}</p>
              </CardHeader>
              <CardContent>
                <form action={action} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resumeText">Resume Text</Label>
                    <Textarea
                      id="resumeText"
                      name="resumeText"
                      rows={14}
                      placeholder="Paste your resume text here..."
                      required
                      className="font-mono text-sm resize-y"
                    />
                  </div>
                  <Button type="submit">Analyze Resume</Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
