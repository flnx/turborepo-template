import { api } from './api-client';

import type { Habit } from '@repo/schemas/types/habit';

export const getHabits = async () => api.get<Habit[]>('v1/habits');
