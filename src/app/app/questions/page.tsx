export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getBookmarkedQuestions } from '@/features/questions/dbCache';
import { getJobInfos } from '@/features/jobInfos/dbCache';
import { getQuestions } from '@/features/questions/db';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface QuestionsPageProps {
  searchParams: Promise<{
    jobInfoId?: string;
    difficulty?: string;
    type?: string;
    bookmarked?: string;
  }>;
}

const difficultyVariant = (d: string) => {
  if (d === 'easy') return 'secondary';
  if (d === 'hard') return 'destructive';
  return 'outline';
};

export default async function QuestionsPage({ searchParams }: QuestionsPageProps) {
  const { jobInfoId, difficulty, type, bookmarked } = await searchParams;

  const [jobs, allBookmarked] = await Promise.all([
    getJobInfos(),
    bookmarked === 'true' ? getBookmarkedQuestions() : Promise.resolve(null),
  ]);

  const questions =
    allBookmarked !== null
      ? allBookmarked
      : jobInfoId
        ? await getQuestions(jobInfoId)
        : [];

  const filtered = questions.filter((q) => {
    if (difficulty && q.difficulty !== difficulty) return false;
    if (type && q.type !== type) return false;
    return true;
  });

  const selectedJob = jobs.find((j) => j.id === jobInfoId);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Questions</h1>
      <p className="text-muted-foreground mb-6">Practice and review your interview questions.</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-muted/40 rounded-lg">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Job</label>
          <div className="flex flex-wrap gap-1">
            <Link href={`/app/questions?${bookmarked ? 'bookmarked=true' : ''}`}>
              <Badge variant={!jobInfoId ? 'default' : 'outline'}>All Jobs</Badge>
            </Link>
            {jobs.map((j) => (
              <Link key={j.id} href={`/app/questions?jobInfoId=${j.id}`}>
                <Badge variant={jobInfoId === j.id ? 'default' : 'outline'} className="cursor-pointer">
                  {j.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Difficulty</label>
          <div className="flex gap-1">
            {['easy', 'medium', 'hard'].map((d) => (
              <Link
                key={d}
                href={`/app/questions?${jobInfoId ? `jobInfoId=${jobInfoId}&` : ''}difficulty=${d}`}
              >
                <Badge
                  variant={difficulty === d ? 'default' : 'outline'}
                  className="capitalize cursor-pointer"
                >
                  {d}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Type</label>
          <div className="flex flex-wrap gap-1">
            {['behavioral', 'technical', 'coding', 'system-design'].map((t) => (
              <Link
                key={t}
                href={`/app/questions?${jobInfoId ? `jobInfoId=${jobInfoId}&` : ''}type=${t}`}
              >
                <Badge
                  variant={type === t ? 'default' : 'outline'}
                  className="capitalize cursor-pointer"
                >
                  {t}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-end">
          <Link href="/app/questions?bookmarked=true">
            <Badge variant={bookmarked === 'true' ? 'default' : 'outline'} className="cursor-pointer">
              ⭐ Bookmarked
            </Badge>
          </Link>
        </div>
      </div>

      {!jobInfoId && bookmarked !== 'true' ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Select a job to view its questions, or view bookmarked questions.</p>
          <Link href="/app/jobs" className="text-primary hover:underline mt-2 block">
            Go to Jobs →
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No questions found.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <Link key={q.id} href={`/app/questions/${q.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-medium line-clamp-2">{q.text}</CardTitle>
                    <div className="flex gap-1 shrink-0">
                      {q.isBookmarked && <span className="text-sm">⭐</span>}
                      <Badge variant={difficultyVariant(q.difficulty)} className="capitalize">
                        {q.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="capitalize">{q.type.replace(/-/g, ' ')}</CardDescription>
                </CardHeader>
                {q.timesAttempted > 0 && (
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Attempted {q.timesAttempted}×
                      {q.bestScore != null && ` · Best: ${q.bestScore}/10`}
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
