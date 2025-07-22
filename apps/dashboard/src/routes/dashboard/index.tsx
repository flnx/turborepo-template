import { createFileRoute } from '@tanstack/react-router';

import { HabitForm } from '@/components/habit-form/habit-form';
import { HabitsList } from '@/components/habits-list/habit-list';

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
];

function DashboardDailyLog() {
  return (
    <>
      <section className="max-w-md space-y-7">
        <HabitsList habits={habits} />
      </section>
      <HabitForm />
    </>
  );
}
