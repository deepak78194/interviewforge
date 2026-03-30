export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TodayPlanBanner } from '@/features/progress/TodayPlanBanner';

const features = [
  { title: 'Job Applications', description: 'Track job openings and manage interview targets.', href: '/app/jobs', emoji: '💼' },
  { title: 'Topics', description: 'Browse interview topics organized by category.', href: '/app/topics', emoji: '📚' },
  { title: 'Questions', description: 'Practice interview questions and track progress.', href: '/app/questions', emoji: '❓' },
  { title: 'Interviews', description: 'Mock voice interview sessions with AI feedback.', href: '/app/interviews', emoji: '🎙️' },
  { title: 'Resume', description: 'Analyze your resume against job descriptions.', href: '/app/resume', emoji: '📄' },
  { title: 'Study Plans', description: 'AI-generated structured preparation plans.', href: '/app/plans', emoji: '📅' },
  { title: 'Progress', description: 'Track streaks, scores, and activity over time.', href: '/app/progress', emoji: '📈' },
];

const quickActions = [
  { label: '🎙️ Start Interview', href: '/app/interviews/new' },
  { label: '❓ Practice Questions', href: '/app/questions' },
  { label: '📅 New Study Plan', href: '/app/plans/new' },
  { label: '📄 Analyze Resume', href: '/app/resume' },
];

export default function AppPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to InterviewForge. Let&apos;s get you prepared.</p>
      </div>

      <Suspense fallback={null}>
        <TodayPlanBanner />
      </Suspense>

      <div>
        <h2 className="text-base font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          {quickActions.map(action => (
            <Button key={action.href} variant="outline" size="sm" asChild>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold mb-3">Features</h2>
        <div className="grid gap-4 mt-2 sm:grid-cols-3">
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
    </div>
  );
}
