export const dynamic = 'force-dynamic';

import { getPracticeHistory } from '@/features/progress/dbCache';
import { ScoreTrendChart } from '@/features/progress/ScoreTrendChart';
import { ActivityHeatmap } from '@/features/progress/ActivityHeatmap';
import { StreakCard } from '@/features/progress/StreakCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ProgressPage() {
  let history: Awaited<ReturnType<typeof getPracticeHistory>> = [];
  try {
    history = await getPracticeHistory(365);
  } catch {
    // DB unavailable
  }

  // Build chart data from history with scores
  const scoredHistory = history.filter(h => h.score != null);
  const chartData = scoredHistory.slice(0, 30).reverse().map(h => ({
    date: new Date(h.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: (h.score ?? 0) / 10, // normalize to 0-10 scale
  }));

  // Build activity heatmap data
  const activityMap = new Map<string, number>();
  for (const entry of history) {
    const dateStr = new Date(entry.createdAt).toISOString().split('T')[0];
    activityMap.set(dateStr, (activityMap.get(dateStr) ?? 0) + 1);
  }
  const heatmapData = Array.from(activityMap.entries()).map(([date, count]) => ({ date, count }));

  const totalActivities = history.length;
  const avgScore = scoredHistory.length > 0
    ? Math.round(scoredHistory.reduce((sum, h) => sum + (h.score ?? 0), 0) / scoredHistory.length)
    : 0;

  const questionAnswered = history.filter(h => h.activityType === 'question_answered').length;
  const interviewsDone = history.filter(h => h.activityType === 'interview_completed').length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Progress</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your improvement over time.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold">{totalActivities}</div>
            <div className="text-xs text-muted-foreground">Total Activities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold">{questionAnswered}</div>
            <div className="text-xs text-muted-foreground">Questions Answered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold">{interviewsDone}</div>
            <div className="text-xs text-muted-foreground">Interviews Done</div>
          </CardContent>
        </Card>
      </div>

      <StreakCard history={history.map(h => ({ createdAt: h.createdAt }))} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Score Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ScoreTrendChart data={chartData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityHeatmap data={heatmapData} />
        </CardContent>
      </Card>
    </div>
  );
}
