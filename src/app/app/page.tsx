import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    title: 'Job Applications',
    description: 'Track job openings and manage interview targets.',
    href: '/app/jobs',
    emoji: '💼',
  },
  {
    title: 'Topics',
    description: 'Browse interview topics organized by category.',
    href: '/app/topics',
    emoji: '📚',
  },
  {
    title: 'Questions',
    description: 'Practice interview questions and track progress.',
    href: '/app/questions',
    emoji: '❓',
  },
];

export default function AppPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-1">Welcome to InterviewForge. Start by adding a job you're targeting.</p>

      <div className="grid gap-4 mt-8 sm:grid-cols-3">
        {features.map((f) => (
          <Link key={f.href} href={f.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="text-3xl mb-2">{f.emoji}</div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
                <CardDescription>{f.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
