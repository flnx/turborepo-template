import { Icon } from '@iconify/react';
import { useState } from 'react';

import { Button } from '@heroui/button';
import { Checkbox } from '@heroui/checkbox';
import { Chip } from '@heroui/chip';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
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
    <div className="flex flex-col gap-1">
      {habits.map((habit) => (
        <Habit habit={habit} key={habit.id} />
      ))}
    </div>
  );
};

const Habit = ({ habit }: { habit: Habit }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="hover:bg-default-50/15 flex w-full rounded-md p-2">
      <Checkbox
        aria-label={habit.title}
        isSelected={isSelected}
        radius="sm"
        onValueChange={setIsSelected}
        color="success"
      />
      <div className="ml-2 flex w-full items-center justify-between gap-1">
        <span
          className={cn('transition-colors-opacity text-sm font-semibold', {
            'opacity-45': isSelected,
          })}
        >
          {habit.title}
        </span>
        {/* <small className="text-default-500 text-tiny">{habit?.description}</small> */}
        <div className="mr-4 flex w-52 items-center justify-between gap-8">
          <small className="text-default-500 text-tiny">10 days streak</small>

          {isSelected ? (
            <Chip color="success" className="text-tiny">
              Completed
            </Chip>
          ) : (
            <Chip color="default" className="text-tiny">
              In Progress
            </Chip>
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
