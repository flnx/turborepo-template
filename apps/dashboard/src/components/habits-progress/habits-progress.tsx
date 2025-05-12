import { Icon } from '@iconify/react';

import { Button } from '@heroui/button';
import { Card } from '@heroui/card';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Progress } from '@heroui/progress';
import { cn } from '@heroui/theme';

const data: {
  title: string;
  value: number;
  maxValue: number;
}[] = [
  {
    title: 'House Saving',
    value: 25,
    maxValue: 365,
  },
  {
    title: 'Laptop',
    value: 100,
    maxValue: 365,
  },
  {
    title: 'Trip Saving',
    value: 255,
    maxValue: 365,
  },
  {
    title: 'Scooter Saving',
    value: 255,
    maxValue: 365,
  },
];

export const HabitsProgress = () => {
  return (
    <dl className="flex w-full max-w-screen-sm flex-col gap-5">
      {data.map(({ title, value, maxValue }, index) => (
        <Card
          key={index}
          className="flex flex-col border border-transparent p-4 pt-3 dark:border-default-100"
        >
          <div className="flex flex-col items-start justify-start gap-y-1 px-0.5">
            <dt className="text-medium font-medium text-default-700">{title}</dt>
            <dd className="text-xs font-medium text-default-500">
              {value} days of {maxValue}
            </dd>
          </div>

          <Progress
            aria-label="status"
            className="mt-2"
            classNames={{
              track: 'bg-primary-100',
            }}
            color={'primary'}
            value={(value / maxValue) * 100}
          />

          <Dropdown
            classNames={{
              content: 'min-w-[120px]',
            }}
            placement="bottom-end"
          >
            <DropdownTrigger>
              <Button
                isIconOnly
                className="absolute right-2 top-2 w-auto rounded-full"
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
              <DropdownItem key="view-details">View Details</DropdownItem>
              <DropdownItem key="export-data">Export Data</DropdownItem>
              <DropdownItem key="set-alert">Set Alert</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Card>
      ))}
    </dl>
  );
};
