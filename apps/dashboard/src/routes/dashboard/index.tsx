import { useEffect } from 'react';

import { Progress } from '@heroui/progress';
import { createFileRoute } from '@tanstack/react-router';

import { supabase } from '@/utils/supabaseClient';

import { HabitForm } from '@/components/habit-form/habit-form';
import { HabitsList } from '@/components/habits-list/habit-list';

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
});

const test = async () => {
  const accessToken = (await supabase.auth.getSession()).data.session?.access_token;

  if (!accessToken) throw new Error('Unauthenticated');


  console.log(accessToken)

  try {
    const data = await fetch('http://localhost:3000/v1/habits', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Trigger-Preflight': 'true'
      },
    });

    return data;
  } catch (err) {
    return false;
  }
};

function RouteComponent() {
  useEffect(() => {
    const testFn = async () => {
      const d = await test();

      console.log(d);
    };

    testFn();
  }, []);

  return (
    <>
      <section className="flex gap-12">
        <Stats title="Current Streak" content="21 days" />
      </section>

      <section className="max-w-md space-y-7">
        <DailyProgress />
        <HabitsList />
      </section>
      <HabitForm />
    </>
  );
}

const DailyProgress = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm text-default-500">Daily progress</h3>
      <Progress value={30} color="success" isStriped />
    </div>
  );
};

const Stats = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className="max-w-fit text-center">
      <p className="text-sm text-default-500">{title}</p>
      <h4 className="mt-1 text-2xl font-bold">{content}</h4>
    </div>
  );
};
