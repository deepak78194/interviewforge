export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getQuestion } from '@/features/questions/dbCache';
import { deleteQuestionAction, toggleBookmarkAction } from '@/features/questions/actions';
import { db } from '@/drizzle/db';
import { AnswerTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface QuestionDetailPageProps {
  params: Promise<{ id: string }>;
}

const difficultyVariant = (d: string) => {
  if (d === 'easy') return 'secondary' as const;
  if (d === 'hard') return 'destructive' as const;
  return 'outline' as const;
};

export default async function QuestionDetailPage({ params }: QuestionDetailPageProps) {
  const { id } = await params;
  const [question] = await getQuestion(id);

  if (!question) notFound();

  const answers = await db
    .select()
    .from(AnswerTable)
    .where(eq(AnswerTable.questionId, id))
    .orderBy(AnswerTable.createdAt);

  const deleteAction = deleteQuestionAction.bind(null, id, question.jobInfoId);
  const bookmarkAction = toggleBookmarkAction.bind(null, id, !question.isBookmarked);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link
          href={`/app/questions?jobInfoId=${question.jobInfoId}`}
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          ← Questions
        </Link>
      </div>

      <div className="flex items-start justify-between gap-3 mb-4">
        <h1 className="text-xl font-semibold">{question.text}</h1>
        <div className="flex gap-1 shrink-0">
          <Badge variant={difficultyVariant(question.difficulty)} className="capitalize">
            {question.difficulty}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {question.type.replace(/-/g, ' ')}
          </Badge>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <form action={bookmarkAction}>
          <Button type="submit" variant="outline" size="sm">
            {question.isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
          </Button>
        </form>
        <form action={deleteAction}>
          <Button type="submit" variant="destructive" size="sm">Delete</Button>
        </form>
      </div>

      <div className="space-y-4">
        {question.starterCode && (
          <Card>
            <CardHeader><CardTitle className="text-base">Starter Code</CardTitle></CardHeader>
            <CardContent>
              <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">{question.starterCode}</pre>
            </CardContent>
          </Card>
        )}

        {question.expectedOutput && (
          <Card>
            <CardHeader><CardTitle className="text-base">Expected Output</CardTitle></CardHeader>
            <CardContent>
              <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">{question.expectedOutput}</pre>
            </CardContent>
          </Card>
        )}

        {question.personalNotes && (
          <Card>
            <CardHeader><CardTitle className="text-base">Personal Notes</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{question.personalNotes}</p>
            </CardContent>
          </Card>
        )}

        {question.timesAttempted > 0 && (
          <div className="text-sm text-muted-foreground">
            Attempted {question.timesAttempted}×
            {question.bestScore != null && ` · Best score: ${question.bestScore}/10`}
          </div>
        )}

        {answers.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Answer History</h2>
            <div className="space-y-3">
              {answers.map((answer) => (
                <Card key={answer.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-muted-foreground">
                        {new Date(answer.createdAt).toLocaleDateString()}
                        {answer.aiModel && ` · ${answer.aiModel}`}
                      </CardTitle>
                      {answer.score != null && (
                        <Badge variant="secondary">{answer.score}/10</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm whitespace-pre-wrap">{answer.content}</p>
                    {answer.feedback && (
                      <div className="mt-2 p-3 bg-muted rounded text-sm">
                        <p className="font-medium mb-1">Feedback</p>
                        <p className="text-muted-foreground">{answer.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
