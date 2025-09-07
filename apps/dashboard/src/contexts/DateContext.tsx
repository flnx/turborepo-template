import { createContext, use, useState } from 'react';

import { getLocalDate } from '@/utils/getLocalDate';

export type DateContext = {
  date: string;
  handleDateChange: (date: string) => void;
  resetToToday: () => void;
};

const DateContext = createContext<DateContext | undefined>({
  date: getLocalDate(),
  handleDateChange: () => undefined,
  resetToToday: () => undefined,
});

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState<string>(getLocalDate());

  const resetToToday = () => {
    setDate(getLocalDate());
  };

  const handleDateChange = (date: string) => {
    setDate(date);
  };

  const context = {
    date,
    handleDateChange,
    resetToToday,
  };

  return <DateContext value={context}>{children}</DateContext>;
};

export const useDate = () => {
  const context = use(DateContext);

  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }

  return context;
};
