import { HabitsList } from './components/habits-list/habits-list';
import { ThemeSwitcher } from './components/theme-switcher';

function App() {
  return (
    <div className="container flex flex-row gap-10">
      <HabitsList />
    </div>
  );
}

export default App;
