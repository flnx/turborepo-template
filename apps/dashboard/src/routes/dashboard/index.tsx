import { useDate } from '@/contexts/DateContext';
import { getHabitsQueryOptions } from '@/queries/habitQueries';
import { Chip } from '@heroui/chip';
import { Divider } from '@heroui/divider';
import { CircularProgress } from '@heroui/progress';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { getFormattedDate, getLocalDate } from '@/utils/getLocalDate';

// import { CalendarModal } from '@/components/calendar/calendar-modal';
// import { HorizontalCalendar } from '@/components/calendar/horizontal-calendar';
import { HabitForm } from '@/components/habit-form/habit-form';
import { HabitsList } from '@/components/habits-list/habit-list';

// import { StatsCard } from '@/components/stats-card/stats-card';

export const Route = createFileRoute('/dashboard/')({
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    queryClient.ensureQueryData(getHabitsQueryOptions(getLocalDate()));
  },
  errorComponent: ({ error }) => <div>{error.message}</div>,
  component: () => {
    const { date } = useDate();

    const { data } = useSuspenseQuery(getHabitsQueryOptions(getLocalDate()));
    return (
      <section>
        <div className="mb-14 flex justify-between">
          <CircularProgress
            value={50}
            showValueLabel
            size="lg"
            color="danger"
            className="mb-4"
            classNames={{
              svg: 'w-16 h-16',
              value: 'text-[12px]',
            }}
          />
          <HabitForm />
        </div>

        <div className="flex items-center justify-between px-2">
          <section className="relative flex items-center gap-2">
            <h2 className="text-xl font-bold">Today</h2>
            <Chip size="sm" variant="dot" className="mt-0.5" color="success">
              5
            </Chip>
          </section>
          <time dateTime="12-05-12" className="text-tiny text-default-800">
            {getFormattedDate(date)}
          </time>
        </div>

        <Divider className="mt-4 mb-6" />
        {/* <CalendarModal /> */}
        <div className="h-full space-y-24">
          {/* <HorizontalCalendar /> */}
          <HabitsList habits={data} />
        </div>
        {/* <StatsCard /> */}
      </section>
    );
  },
});

// const habits: Habit[] = [
//   {
//     id: '1',
//     title: 'Cycling',
//     status: 'Active',
//     streak: 10,
//     user_id: 'userid1',
//     isCompleted: false,
//     repeat: 5,
//     description: 'Cycle 5 days a week',
//   },
//   {
//     id: '2',
//     title: 'Workout',
//     status: 'Active',
//     streak: 2,
//     user_id: 'userid1',
//     isCompleted: false,
//     repeat: 4,
//   },
//   {
//     id: '3',
//     title: 'Workout',
//     status: 'Active',
//     streak: 2,
//     user_id: 'userid1',
//     isCompleted: false,
//     repeat: 4,
//     description: 'Do something',
//   },
// ];
