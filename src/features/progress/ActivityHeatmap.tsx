'use client';

interface ActivityDay {
  date: string; // YYYY-MM-DD
  count: number;
}

interface ActivityHeatmapProps {
  data: ActivityDay[];
}

function getColorClass(count: number): string {
  if (count === 0) return 'bg-muted';
  if (count === 1) return 'bg-green-200 dark:bg-green-900';
  if (count === 2) return 'bg-green-400 dark:bg-green-700';
  if (count <= 4) return 'bg-green-600 dark:bg-green-500';
  return 'bg-green-800 dark:bg-green-300';
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  // Build a map of date -> count
  const countMap = new Map(data.map(d => [d.date, d.count]));

  // Last 52 weeks = 364 days, starting from the most recent Sunday
  const today = new Date();
  const dayOfWeek = today.getDay();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() - dayOfWeek); // last Sunday (end of last complete week)
  endDate.setDate(endDate.getDate() + 6); // this Saturday

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 363); // 52 weeks back

  // Build weeks array
  const weeks: Date[][] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Find month label positions
  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((week, col) => {
    const firstDay = week[0];
    if (firstDay.getDate() <= 7) {
      monthLabels.push({ label: months[firstDay.getMonth()], col });
    }
  });

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* Month labels */}
        <div className="flex gap-0.5 mb-1 text-xs text-muted-foreground" style={{ paddingLeft: '20px' }}>
          {weeks.map((_, col) => {
            const ml = monthLabels.find(m => m.col === col);
            return (
              <div key={col} className="w-3 text-center shrink-0 overflow-visible whitespace-nowrap">
                {ml ? ml.label : ''}
              </div>
            );
          })}
        </div>

        <div className="flex gap-0.5">
          {/* Day labels */}
          <div className="flex flex-col gap-0.5 text-xs text-muted-foreground mr-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="w-3 h-3 flex items-center justify-center text-[10px]">{i % 2 === 1 ? d : ''}</div>
            ))}
          </div>

          {/* Grid */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day, di) => {
                const dateStr = day.toISOString().split('T')[0];
                const count = countMap.get(dateStr) ?? 0;
                const isFuture = day > today;
                return (
                  <div
                    key={di}
                    className={`w-3 h-3 rounded-sm ${isFuture ? 'opacity-30' : ''} ${getColorClass(count)}`}
                    title={`${dateStr}: ${count} activities`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} className={`w-3 h-3 rounded-sm ${getColorClass(level === 0 ? 0 : level)}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
