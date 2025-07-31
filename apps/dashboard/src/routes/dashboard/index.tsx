import { createFileRoute } from '@tanstack/react-router';

import { CalendarModal } from '@/components/calendar/calendar-modal';
import { HorizontalCalendar } from '@/components/calendar/horizontal-calendar';
import { HabitForm } from '@/components/habit-form/habit-form';
import { HabitsList } from '@/components/habits-list/habit-list';
import { StatsCard } from '@/components/stats-card/stats-card';

import type { Habit } from '@/components/habits-list/habit-list';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardDailyLog,
});

const habits: Habit[] = [
  {
    id: '1',
    title: 'Cycling',
    status: 'Active',
    streak: 10,
    user_id: 'userid1',
    isCompleted: false,
    repeat: 5,
    description: 'Cycle 5 days a week',
  },
  {
    id: '2',
    title: 'Workout',
    status: 'Active',
    streak: 2,
    user_id: 'userid1',
    isCompleted: false,
    repeat: 4,
  },
  {
    id: '3',
    title: 'Workout',
    status: 'Active',
    streak: 2,
    user_id: 'userid1',
    isCompleted: false,
    repeat: 4,
    description: 'Do something',
  },
];

function DashboardDailyLog() {
  return (
    <section className="space-y-14">
      {/* <StatsCard /> */}
      {/* <CalendarModal /> */}
      <section className="h-full max-w-md space-y-24">
        {/* <HorizontalCalendar /> */}
        <HabitsList habits={habits} />
        <HabitForm />
      </section>
    </section>
  );
}
