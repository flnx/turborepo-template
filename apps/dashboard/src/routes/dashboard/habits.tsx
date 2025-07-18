import { createFileRoute } from '@tanstack/react-router';

import { HabitForm } from '@/components/habit-form/habit-form';
import { HabitsProgress } from '@/components/habits-progress/habits-progress';
import { StatsCard } from '@/components/stats-card/stats-card';

export const Route = createFileRoute('/dashboard/habits')({
  component: DashboardHabitsDataComponent,
});

function DashboardHabitsDataComponent() {
  return (
    <section>
      <div>Dashboard</div>
      <HabitsProgress />
      <StatsCard />
      <HabitForm />
    </section>
  );
}
