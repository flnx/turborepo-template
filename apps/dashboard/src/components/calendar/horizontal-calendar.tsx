import { useEffect, useRef, useState } from 'react';

import { Button } from '@heroui/button';
// import { Card } from '@heroui/card';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';

export const HorizontalCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(
    today(getLocalTimeZone()),
  );

  // Add new state for the date slider
  const [visibleDates, setVisibleDates] = useState<CalendarDate[]>([]);
  const dateSliderRef = useRef<HTMLDivElement>(null);

  // Generate 61 days (30 before, today, 30 after)
  useEffect(() => {
    const dates: CalendarDate[] = [];
    const baseDate = today(getLocalTimeZone());

    for (let i = -30; i <= 30; i++) {
      dates.push(baseDate.add({ days: i }));
    }

    setVisibleDates(dates);
  }, []);

  // Scroll to selected date when it changes
  useEffect(() => {
    if (dateSliderRef.current) {
      const selectedIndex = visibleDates.findIndex(
        (date) => date.toString() === selectedDate.toString(),
      );
      if (selectedIndex >= 0) {
        const scrollContainer = dateSliderRef.current;
        const dateElement = scrollContainer.children[selectedIndex] as HTMLElement;

        if (dateElement) {
          const scrollLeft =
            dateElement.offsetLeft -
            scrollContainer.clientWidth / 2 +
            dateElement.clientWidth / 2;
          scrollContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }
  }, [selectedDate, visibleDates]);

  const dateFormatter = useDateFormatter({
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-default-500">
          {dateFormatter.format(selectedDate.toDate(getLocalTimeZone()))}
        </div>
      </div>

      <div
        ref={dateSliderRef}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {visibleDates.map((date, index) => {
          const isToday = date.toString() === today(getLocalTimeZone()).toString();
          const isSelected = date.toString() === selectedDate.toString();
          const dateObj = date.toDate(getLocalTimeZone());
          const day = dateObj.getDate();
          const dayName = new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
          }).format(dateObj);

          return (
            <div
              key={index}
              className="flex-shrink-0 snap-center"
              style={{ scrollSnapAlign: 'center' }}
            >
              <Button
                className={`mx-1 flex h-16 w-16 flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-primary text-white'
                    : isToday
                      ? 'border border-primary bg-primary-100'
                      : 'bg-content2'
                }`}
                radius="lg"
                variant={isSelected ? 'solid' : 'flat'}
                color={isSelected ? 'primary' : 'default'}
                onPress={() => setSelectedDate(date)}
              >
                <span
                  className={`text-xs ${isSelected ? 'text-white' : 'text-default-500'}`}
                >
                  {dayName}
                </span>
                <span
                  className={`text-lg font-semibold ${isSelected ? 'text-white' : ''}`}
                >
                  {day}
                </span>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// export const HabitCalendar = () => {
//   let defaultDate = today(getLocalTimeZone());
//   let [value, setValue] = useState<DateValue | null>(defaultDate);
//   let { locale } = useLocale();

//   let now = today(getLocalTimeZone());
//   let nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
//   let nextMonth = startOfMonth(now.add({ months: 1 }));

//   return (
//     <div className="flex flex-col gap-4">
//       <Calendar
//         aria-label="Date (Presets)"
//         classNames={{
//           content: 'w-full',
//         }}
//         focusedValue={value}
//         nextButtonProps={{
//           variant: 'bordered',
//         }}
//         prevButtonProps={{
//           variant: 'bordered',
//         }}
//         topContent={
//           <ButtonGroup
//             fullWidth
//             className="bg-content1 px-3 pb-2 pt-3 [&>button]:border-default-200/60 [&>button]:text-default-500"
//             radius="full"
//             size="sm"
//             variant="bordered"
//           >
//             <Button onPress={() => setValue(now)}>Today</Button>
//             <Button onPress={() => setValue(nextWeek)}>Next week</Button>
//             <Button onPress={() => setValue(nextMonth)}>Next month</Button>
//           </ButtonGroup>
//         }
//         // @ts-expect-error
//         value={value}
//         onChange={setValue}
//         onFocusChange={setValue}
//       />
//     </div>
//   );
// };
