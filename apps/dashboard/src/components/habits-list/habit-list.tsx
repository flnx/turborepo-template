import { useState } from 'react';

import { Checkbox } from '@heroui/checkbox';
import { Chip } from '@heroui/chip';
import { cn } from '@heroui/theme';

type Habit = {
  id: string;
  name: string;
  streak: number;
  status: 'Active' | 'In Progress' | 'Completed';
};

const habits: Habit[] = [
  {
    id: '1',
    name: 'Cycling',
    status: 'Active',
    streak: 10,
  },
  {
    id: '2',
    name: 'Cycling',
    status: 'Active',
    streak: 2,
  },
  {
    id: '3',
    name: 'Cycling',
    status: 'Active',
    streak: 5,
  },
  {
    id: '4',
    name: 'Cycling',
    status: 'Active',
    streak: 1,
  },
];

export const HabitsList = () => {
  return (
    <div className="flex flex-col gap-5">
      {habits.map((habit) => (
        <Habit habit={habit} />
      ))}
    </div>
  );
};

const Habit = ({ habit }: { habit: Habit }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Checkbox
      aria-label={habit.name}
      radius="sm"
      classNames={{
        base: cn(
          'inline-flex w-full max-w-md bg-content1 -mx-0',
          'hover:bg-content2 items-center justify-start',
          'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary',
        ),
        label: 'w-full',
      }}
      isSelected={isSelected}
      onValueChange={setIsSelected}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <p className="relative -mt-1 inline-block">
          <span className="relative z-10">{habit.name}</span>
          <span
            className={cn(
              'absolute left-0 top-[60%] h-[1px] w-full origin-left scale-x-0 bg-current transition-transform duration-300',
              {
                'scale-x-100': isSelected,
              },
            )}
          />
        </p>
        <div className="flex flex-col items-end gap-2">
          <span className="text-tiny text-default-500">
            {habit.streak} days streak
          </span>
          <Chip color="success" size="sm" variant="flat">
            {isSelected ? 'Completed' : 'Active'}
          </Chip>
        </div>
      </div>
    </Checkbox>
  );
};
