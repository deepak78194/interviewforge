import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ScoreDisplay({ score, maxScore = 10, size = 'md', showLabel = true, className }: ScoreDisplayProps) {
  const percentage = (score / maxScore) * 100;

  const getColor = () => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getBgColor = () => {
    if (percentage >= 80) return 'bg-green-100 dark:bg-green-950';
    if (percentage >= 60) return 'bg-yellow-100 dark:bg-yellow-950';
    return 'bg-red-100 dark:bg-red-950';
  };

  const sizeClasses = {
    sm: 'text-sm px-2 py-0.5',
    md: 'text-base px-3 py-1',
    lg: 'text-xl px-4 py-2',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full font-semibold',
      getBgColor(),
      getColor(),
      sizeClasses[size],
      className
    )}>
      {score}/{maxScore}
      {showLabel && (
        <span className="font-normal text-xs opacity-75">
          {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Needs Work'}
        </span>
      )}
    </span>
  );
}
