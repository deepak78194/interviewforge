'use client';

interface Day {
  id: string;
  dayNumber: number;
  date: Date;
  theme?: string | null;
  isComplete: boolean;
}

interface PlanCalendarProps {
  days: Day[];
  planId: string;
  startDate: Date;
  totalDays: number;
}

export function PlanCalendar({ days, planId, startDate, totalDays }: PlanCalendarProps) {
  const dayMap = new Map(days.map(d => [d.dayNumber, d]));

  const weeks: (number | null)[][] = [];
  const firstDayOfWeek = new Date(startDate).getDay();
  const allSlots: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  for (let i = 0; i < allSlots.length; i += 7) {
    weeks.push(allSlots.slice(i, i + 7));
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-1">
          {week.map((dayNum, di) => {
            if (dayNum === null) {
              return <div key={di} className="aspect-square" />;
            }
            const day = dayMap.get(dayNum);
            const dayDate = new Date(startDate);
            dayDate.setDate(dayDate.getDate() + dayNum - 1);
            dayDate.setHours(0, 0, 0, 0);

            const isPast = dayDate < today;
            const isToday = dayDate.getTime() === today.getTime();
            const isComplete = day?.isComplete ?? false;

            let cellClass = 'aspect-square rounded flex items-center justify-center text-xs cursor-pointer transition-colors ';
            if (isComplete) {
              cellClass += 'bg-green-500 text-white';
            } else if (isToday) {
              cellClass += 'bg-primary text-primary-foreground font-bold';
            } else if (isPast) {
              cellClass += 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
            } else {
              cellClass += 'bg-muted hover:bg-muted/80 text-muted-foreground';
            }

            return (
              <a
                key={di}
                href={`/app/plans/${planId}/day/${dayNum}`}
                className={cellClass}
                title={day?.theme ?? `Day ${dayNum}`}
              >
                {dayNum}
              </a>
            );
          })}
        </div>
      ))}
      <div className="flex gap-4 text-xs text-muted-foreground mt-2">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" /> Done</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary inline-block" /> Today</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 dark:bg-red-900 inline-block" /> Missed</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-muted inline-block" /> Upcoming</span>
      </div>
    </div>
  );
}
