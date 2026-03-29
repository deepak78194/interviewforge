import Link from 'next/link';
import { getTopics, getTopicsByCategory } from '@/features/topics/dbCache';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const CATEGORIES = [
  'data-structures',
  'algorithms',
  'system-design',
  'behavioral',
  'database',
  'networking',
  'object-oriented',
  'frontend',
  'backend',
  'language-specific',
  'soft-skills',
] as const;

interface TopicsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function TopicsPage({ searchParams }: TopicsPageProps) {
  const { category } = await searchParams;

  const topics = category ? await getTopicsByCategory(category) : await getTopics();

  const grouped = topics.reduce<Record<string, typeof topics>>(
    (acc, topic) => {
      const cat = topic.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(topic);
      return acc;
    },
    {}
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Topics</h1>
      <p className="text-muted-foreground mb-6">Browse interview topics organized by category.</p>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/app/topics">
          <Badge variant={!category ? 'default' : 'outline'}>All</Badge>
        </Link>
        {CATEGORIES.map((cat) => (
          <Link key={cat} href={`/app/topics?category=${cat}`}>
            <Badge variant={category === cat ? 'default' : 'outline'} className="capitalize">
              {cat.replace(/-/g, ' ')}
            </Badge>
          </Link>
        ))}
      </div>

      {topics.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No topics found.</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([cat, catTopics]) => (
            <div key={cat}>
              <h2 className="text-lg font-semibold capitalize mb-3">{cat.replace(/-/g, ' ')}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {catTopics.map((topic) => (
                  <Link key={topic.id} href={`/app/topics/${topic.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base">{topic.name}</CardTitle>
                          <Badge variant="outline" className="capitalize ml-2 shrink-0">
                            {topic.difficulty}
                          </Badge>
                        </div>
                        {topic.description && (
                          <CardDescription className="mt-1 line-clamp-2">
                            {topic.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      {topic.estimatedMinutes && (
                        <CardContent>
                          <p className="text-xs text-muted-foreground">
                            ~{topic.estimatedMinutes} min
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
