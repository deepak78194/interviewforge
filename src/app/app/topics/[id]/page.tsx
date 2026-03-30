import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTopic } from '@/features/topics/dbCache';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TopicDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TopicDetailPage({ params }: TopicDetailPageProps) {
  const { id } = await params;
  const [topic] = await getTopic(id);

  if (!topic) notFound();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/app/topics" className="text-muted-foreground hover:text-foreground text-sm">
          ← Topics
        </Link>
      </div>

      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{topic.name}</h1>
          <p className="text-muted-foreground capitalize mt-1">{topic.category.replace(/-/g, ' ')}</p>
        </div>
        <Badge variant="outline" className="capitalize">{topic.difficulty}</Badge>
      </div>

      <div className="space-y-4">
        {topic.description && (
          <Card>
            <CardHeader><CardTitle className="text-base">Description</CardTitle></CardHeader>
            <CardContent><p className="text-sm whitespace-pre-wrap">{topic.description}</p></CardContent>
          </Card>
        )}

        <div className="flex gap-4 text-sm text-muted-foreground">
          {topic.estimatedMinutes && <span>~{topic.estimatedMinutes} minutes to study</span>}
        </div>

        {topic.resourceUrl && (
          <Card>
            <CardHeader><CardTitle className="text-base">Resource</CardTitle></CardHeader>
            <CardContent>
              <a
                href={topic.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline break-all"
              >
                {topic.resourceUrl}
              </a>
            </CardContent>
          </Card>
        )}

        <Link href={`/app/questions?topicId=${topic.id}`}>
          <Button variant="outline">View Related Questions</Button>
        </Link>
      </div>
    </div>
  );
}
