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
      <DailyProgress />
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
        size="lg"
        classNames={{
          base: 'gap-3',
        }}
        onValueChange={setIsSelected}
      >
        <div className="transition-colors-opacity -mt-1 flex flex-col gap-3 group-data-[selected=true]:opacity-45">
          <span className="font-semibold">{habit.title}</span>
          <small className="text-default-500 text-sm">{habit?.description}</small>
          <small className="text-default-500 text-tiny">10 days streak</small>
        </div>
      </Checkbox>
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

const DailyProgress = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-default-500 text-sm">Daily progress</h3>
      <Progress value={30} color="success" isStriped />
    </div>
  );
};
