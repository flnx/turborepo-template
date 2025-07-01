import { useState } from 'react';

import { Button, ButtonGroup } from '@heroui/button';
import { Calendar } from '@heroui/calendar';
import {
  getLocalTimeZone,
  startOfMonth,
  startOfWeek,
  today,
} from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';

import type { DateValue } from '@react-types/calendar';

export const CalendarModal = () => {
  let defaultDate = today(getLocalTimeZone());
  let [value, setValue] = useState<DateValue | null>(defaultDate);
  let { locale } = useLocale();

  let now = today(getLocalTimeZone());
  let nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
  let nextMonth = startOfMonth(now.add({ months: 1 }));

  return (
    <div className="flex flex-col gap-4">
      <Calendar
        aria-label="Date (Presets)"
        classNames={{
          content: 'w-full',
        }}
        focusedValue={value}
        nextButtonProps={{
          variant: 'bordered',
        }}
        prevButtonProps={{
          variant: 'bordered',
        }}
        topContent={
          <ButtonGroup
            fullWidth
            className="bg-content1 px-3 pb-2 pt-3 [&>button]:border-default-200/60 [&>button]:text-default-500"
            radius="full"
            size="sm"
            variant="bordered"
          >
            <Button onPress={() => setValue(now)}>Today</Button>
            <Button onPress={() => setValue(nextWeek)}>Next week</Button>
            <Button onPress={() => setValue(nextMonth)}>Next month</Button>
          </ButtonGroup>
        }
        // @ts-expect-error
        value={value}
        onChange={setValue}
        onFocusChange={setValue}
      />
    </div>
  );
};
