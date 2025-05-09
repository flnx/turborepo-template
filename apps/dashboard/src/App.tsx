import { HabitsList } from '@/components/habits-list/HabitsList';
import { HabitsProgress } from '@/components/habits-progress/HabitsProgress';
import { StatsCard } from '@/components/stats-card/StatsCard';

function App() {
  return (
    <main>
      <div className="container flex flex-row gap-10">
        <HabitsList />
      </div>

      <HabitsProgress />
      <StatsCard />
    </main>
  );
}

export default App;
