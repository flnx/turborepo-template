import { createFileRoute } from '@tanstack/react-router';

import { HabitForm } from '@/components/habit-form/habit-form';
import { HabitsList } from '@/components/habits-list/habit-list';
import { HabitsProgress } from '@/components/habits-progress/habits-progress';
import { StatsCard } from '@/components/stats-card/stats-card';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="container space-y-10">
        <StatsCard />
        <HabitsList />
        <HabitsProgress />
        <HabitForm />
      </div>
    </>
  );
}
