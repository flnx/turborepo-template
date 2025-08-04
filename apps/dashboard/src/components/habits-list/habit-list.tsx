import { Icon } from '@iconify/react';
import { useState } from 'react';

import { Button } from '@heroui/button';
import { Checkbox } from '@heroui/checkbox';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Progress } from '@heroui/progress';
import { cn } from '@heroui/theme';

export type Habit = {
  id: string;
  user_id: string;
  title: string;
  streak: number;
  status: 'Active' | 'In Progress' | 'Completed';
  isCompleted: boolean;
  repeat: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  description?: string;
};

export const HabitsList = ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="flex flex-col gap-y-12">
      {/* <DailyProgress /> */}
      {habits.map((habit) => (
        <Habit habit={habit} key={habit.id} />
      ))}
    </div>
  );
};

const Habit = ({ habit }: { habit: Habit }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex w-full">
      <Checkbox
        aria-label={habit.title}
        isSelected={isSelected}
        radius="sm"
        classNames={{
          base: 'gap-3',
        }}
        onValueChange={setIsSelected}
      />
      <div className="ml-1 flex w-full items-center justify-between gap-1">
        <span
          className={cn('transition-colors-opacity text-sm font-semibold', {
            'opacity-45': isSelected,
          })}
        >
          {habit.title}
        </span>
        {/* <small className="text-default-500 text-tiny">{habit?.description}</small> */}
        <div className="flex items-center gap-8">
          <small className="text-default-500 text-tiny">10 days streak</small>

          {isSelected ? (
            <small className="text-success text-tiny w-20 text-center">Completed</small>
          ) : (
            <small className="text-default-500 text-tiny w-20 flex-1 text-center">
              In Progress
            </small>
          )}
        </div>
      </div>
      <Dropdown
        classNames={{
          content: 'min-w-[120px]',
        }}
        placement="bottom-end"
      >
        <DropdownTrigger>
          <Button
            isIconOnly
            className="ml-auto rounded-full"
            size="sm"
            variant="light"
          >
            <Icon height={16} icon="solar:menu-dots-bold" width={16} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          itemClasses={{
            title: 'text-tiny',
          }}
          variant="flat"
        >
          <DropdownItem key="view-details">Edit</DropdownItem>
          <DropdownItem key="export-data">Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

// const DailyProgress = () => {
//   return (
//     <div className="space-y-2">
//       <h3 className="text-default-500 text-sm">Daily progress</h3>
//       <Progress value={30} color="success" isStriped />
//     </div>
//   );
// };
