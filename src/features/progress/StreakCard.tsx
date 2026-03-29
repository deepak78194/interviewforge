interface HistoryEntry {
  createdAt: Date;
}

interface StreakCardProps {
  history: HistoryEntry[];
}

function calculateStreaks(history: HistoryEntry[]) {
  if (history.length === 0) return { current: 0, longest: 0 };

  const dates = new Set(
    history.map(h => new Date(h.createdAt).toISOString().split('T')[0])
  );
  const sorted = Array.from(dates).sort().reverse();

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let current = 0;
  if (sorted[0] === today || sorted[0] === yesterday) {
    let checkDate = new Date(sorted[0]);
    for (let i = 0; i < sorted.length; i++) {
      const expected = checkDate.toISOString().split('T')[0];
      if (sorted[i] === expected) {
        current++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  let longest = 0;
  let runLength = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = Math.round((prev.getTime() - curr.getTime()) / 86400000);
    if (diff === 1) {
      runLength++;
      longest = Math.max(longest, runLength);
    } else {
      runLength = 1;
    }
  }
  longest = Math.max(longest, current, 1);

  return { current, longest };
}

export function StreakCard({ history }: StreakCardProps) {
  const { current, longest } = calculateStreaks(history);

  return (
    <div className="flex gap-4">
      <div className="flex-1 text-center p-4 bg-muted rounded-lg">
        <div className="text-3xl font-bold">{current}</div>
        <div className="text-sm text-muted-foreground mt-1">🔥 Current Streak</div>
        <div className="text-xs text-muted-foreground">days</div>
      </div>
      <div className="flex-1 text-center p-4 bg-muted rounded-lg">
        <div className="text-3xl font-bold">{longest}</div>
        <div className="text-sm text-muted-foreground mt-1">🏆 Longest Streak</div>
        <div className="text-xs text-muted-foreground">days</div>
      </div>
    </div>
  );
}
