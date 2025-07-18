import { Button } from '@heroui/button';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { supabase } from '@/utils/supabaseClient';

export const Route = createFileRoute('/login')({
  component: RouteComponent,

  beforeLoad({ context }) {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
});

function RouteComponent() {
  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <section>
      <div>Hello "/login"!</div>
      <Button onPress={signIn}>Login with Google</Button>
    </section>
  );
}
