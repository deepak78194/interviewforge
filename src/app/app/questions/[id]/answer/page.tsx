export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getQuestion } from '@/features/questions/dbCache';
import { submitAnswerAction } from '@/features/answers/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AnswerPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnswerPage({ params }: AnswerPageProps) {
  const { id } = await params;
  const [question] = await getQuestion(id);

  if (!question) notFound();

  const action = submitAnswerAction.bind(null, id, question.text, question.type);

  const isCoding = question.type === 'coding';

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link
        href={`/app/questions/${id}`}
        className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
      >
        ← Back to question
      </Link>

      <h1 className="text-xl font-semibold mb-2">Submit Answer</h1>
      <p className="text-muted-foreground mb-6 text-sm">{question.text}</p>

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="content">Your Answer</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Type your answer here..."
            rows={8}
            required
            className="resize-y"
          />
        </div>

        {isCoding && (
          <div className="space-y-2">
            <Label htmlFor="code">Code (optional)</Label>
            <Textarea
              id="code"
              name="code"
              placeholder="Paste your code solution here..."
              rows={10}
              className="font-mono text-sm resize-y"
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button type="submit">Submit &amp; Get AI Feedback</Button>
          <Button type="button" variant="outline" asChild>
            <Link href={`/app/questions/${id}`}>Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
