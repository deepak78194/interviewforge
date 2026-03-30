'use client';
import { useOptimistic, useTransition } from 'react';
import { toggleTaskAction } from './actions';

interface Task {
  id: string;
  studyPlanDayId: string;
  isComplete: boolean;
  title: string;
}

interface TaskCheckboxProps {
  task: Task;
}

export function TaskCheckbox({ task }: TaskCheckboxProps) {
  const [optimisticComplete, setOptimisticComplete] = useOptimistic(task.isComplete);
  const [, startTransition] = useTransition();

  const handleChange = () => {
    startTransition(async () => {
      setOptimisticComplete(!optimisticComplete);
      await toggleTaskAction(task.id, task.studyPlanDayId);
    });
  };

  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={optimisticComplete}
        onChange={handleChange}
        className="w-4 h-4 rounded accent-primary cursor-pointer"
      />
      <span className={`text-sm ${optimisticComplete ? 'line-through text-muted-foreground' : ''}`}>
        {task.title}
      </span>
    </label>
  );
}
