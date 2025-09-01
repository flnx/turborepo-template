import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { createDatabaseError } from '@/utils/app-errors';
import { createService, ServiceContext } from '@/utils/createService';

import type { CreateHabitWithSchedule, Habit } from '@repo/schemas/types/habit';

declare module 'fastify' {
  export interface FastifyInstance {
    habitsRepository: ReturnType<typeof createRepository>;
  }
}

function createRepository(_app: FastifyInstance) {
  return {
    getAll: createService(
      async ({ supabase, user, body }: ServiceContext & { body: { date: string } }) => {
        const { data, error, status } = await supabase.rpc('get_habits_for_day', {
          p_date: body.date,
        });

        if (error) {
          throw createDatabaseError(error, status);
        }

        return data || [];
      },
    ),

    create: createService(
      async ({ supabase, body }: ServiceContext & { body: CreateHabitWithSchedule }) => {
        const { habit, habit_schedule } = body;

        const { data, error, status } = await supabase.rpc('create_habit_with_schedule', {
          p_days_of_week: habit_schedule.days_of_week,
          p_description: habit.description,
          p_title: habit.title,
        });

        if (error) {
          throw createDatabaseError(error, status);
        }

        return {
          id: data,
        };
      },
    ),

    delete: createService(
      async ({ supabase, body }: ServiceContext & { body: { id: string } }) => {
        const { error, status } = await supabase
          .from('habits')
          .delete()
          .eq('id', body.id);

        if (error) {
          throw createDatabaseError(error, status);
        }

        return { success: true };
      },
    ),
    complete: createService(
      async ({
        supabase,
        body,
      }: ServiceContext & { body: { id: string; date: string } }) => {
        const { error, status } = await supabase.from('habit_completions').insert({
          habit_id: body.id,
          completed_local_date: body.date,
        });

        if (error) {
          throw createDatabaseError(error, status);
        }

        return { success: true };
      },
    ),
  };
}

export default fp(
  function (fastify) {
    fastify.decorate('habitsRepository', createRepository(fastify));
  },
  {
    name: 'habits-repository',
  },
);

// -- In your Supabase SQL editor
// CREATE OR REPLACE FUNCTION get_habits_for_day(
//   p_user_id UUID,
//   p_date DATE
// )
// RETURNS TABLE (
//   id UUID,
//   title TEXT,
//   description TEXT,
//   created_at TIMESTAMPTZ,
//   user_id UUID,
//   is_completed BOOLEAN
// )
// LANGUAGE plpgsql
// AS $$
// DECLARE
//   day_of_week INT;
// BEGIN
//   -- Get day of week (1-7, Mon-Sun)
//   day_of_week := EXTRACT(ISODOW FROM p_date);

//   RETURN QUERY
//   SELECT
//     h.id,
//     h.title,
//     h.description,
//     h.created_at,
//     h.user_id,
//     EXISTS(
//       SELECT 1
//       FROM habit_completions hc
//       WHERE hc.habit_id = h.id
//       AND hc.completed_local_date = p_date
//     ) as is_completed
//   FROM habits h
//   INNER JOIN habit_schedules hs ON h.id = hs.habit_id
//   WHERE h.user_id = p_user_id
//     AND h.is_archived = false
//     AND day_of_week = ANY(hs.days_of_week);
// END;
// $$;
