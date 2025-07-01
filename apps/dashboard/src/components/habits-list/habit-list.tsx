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

import { HorizontalCalendar } from '@/components/calendar/calendar';

type Habit = {
  id: string;
  user_id: string;
  title: string;
  streak: number;
  status: 'Active' | 'In Progress' | 'Completed';
  isCompleted: boolean;
  repeat: 1 | 2 | 3 | 4 | 5 | 6 | 7
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
    name: 'Running',
    status: 'Active',
    streak: 2,
  },
  {
    id: '3',
    name: 'Coding',
    status: 'Active',
    streak: 5,
  },
  {
    id: '4',
    name: 'Shopping',
    status: 'Active',
    streak: 1,
  },
];

export const HabitsList = () => {
  return (
    <div className="flex flex-col gap-16">
      <HorizontalCalendar />
      {habits.map((habit) => (
        <Habit habit={habit} />
      ))}
    </div>
  );
};

const Habit = ({ habit }: { habit: Habit }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex w-full">
      <Checkbox
        aria-label={habit.name}
        isSelected={isSelected}
        radius="sm"
        classNames={{
          base: 'gap-1.5',
        }}
        onValueChange={setIsSelected}
        lineThrough
      >
        <div className="-mt-1 flex flex-col">
          <span className="font-semibold">{habit.name}</span>
          <small className="absolute top-7 w-56 text-tiny text-default-500">
            10 days streak
          </small>
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

//  <Checkbox
//   aria-label={habit.name}
//   radius="sm"
//   classNames={{
//     base: cn(
//       'inline-flex w-full max-w-md bg-content1 -mx-0',
//       'hover:bg-content2 items-center justify-start',
//       'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
//       'data-[selected=true]:border-primary',
//     ),
//     label: 'w-full',
//   }}
//   isSelected={isSelected}
//   onValueChange={setIsSelected}
// >
//   <div className="flex w-full items-center justify-between gap-2">
//     <p className="relative -mt-1 inline-block">
//       <span className="relative z-10">{habit.name}</span>
//       <span
//         className={cn(
//           'absolute left-0 top-[60%] h-[1px] w-full origin-left scale-x-0 bg-current transition-transform duration-300',
//           {
//             'scale-x-100': isSelected,
//           },
//         )}
//       />
//     </p>
//     <div className="flex flex-col items-end gap-2">
//       <span className="text-tiny text-default-500">
//         {habit.streak} days streak
//       </span>
//       <Chip color="success" size="sm" variant="flat">
//         {isSelected ? 'Completed' : 'Active'}
//       </Chip>
//     </div>
//   </div>
// </Checkbox>
