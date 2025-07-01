import { Button } from '@heroui/button';
import { createFileRoute } from '@tanstack/react-router';

import { supabase } from '@/utils/supabaseClient';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
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
