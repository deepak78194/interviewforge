import { TaskCheckbox } from './TaskCheckbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Task {
  id: string;
  studyPlanDayId: string;
  type: string;
  title: string;
  description?: string | null;
  estimatedMinutes?: number | null;
  targetCount?: number | null;
  isComplete: boolean;
  order: number;
}

interface Day {
  id: string;
  dayNumber: number;
  theme?: string | null;
  date: Date;
  isComplete: boolean;
}

interface DayViewProps {
  day: Day;
  tasks: Task[];
}

const taskTypeLabel: Record<string, string> = {
  study_topic: '📚 Study',
  solve_questions: '❓ Questions',
  mock_interview: '🎙️ Interview',
  resume_review: '📄 Resume',
  coding_challenge: '💻 Coding',
  system_design: '🏗️ System Design',
  custom: '✏️ Custom',
};

export function DayView({ day, tasks }: DayViewProps) {
  const completedCount = tasks.filter(t => t.isComplete).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Day {day.dayNumber}</h2>
          {day.theme && <p className="text-muted-foreground text-sm">{day.theme}</p>}
        </div>
        <Badge variant={day.isComplete ? 'default' : 'outline'}>
          {completedCount}/{tasks.length} done
        </Badge>
      </div>

      {tasks.length === 0 ? (
        <p className="text-muted-foreground text-sm">No tasks for this day.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <Card key={task.id}>
              <CardHeader className="py-3 px-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">
                        {taskTypeLabel[task.type] ?? task.type}
                      </span>
                      {task.estimatedMinutes && (
                        <span className="text-xs text-muted-foreground">· {task.estimatedMinutes}min</span>
                      )}
                    </div>
                    <TaskCheckbox
                      task={{
                        id: task.id,
                        studyPlanDayId: task.studyPlanDayId,
                        isComplete: task.isComplete,
                        title: task.title,
                      }}
                    />
                    {task.description && (
                      <p className="text-xs text-muted-foreground mt-1 ml-7">{task.description}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
