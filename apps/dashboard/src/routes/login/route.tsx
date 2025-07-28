import { Icon } from '@iconify/react';

import logo from '@/assets/logox.png';
import { Button } from '@heroui/button';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { supabase } from '@/utils/supabaseClient';

export const Route = createFileRoute('/login')({
  component: LoginComponent,

  beforeLoad({ context }) {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
});

function LoginComponent() {
  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/dashboard'
      }
    });
  };

  return (
    <section className="mt-4">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center pb-6">
          <img src={logo} alt="logo" className="mb-2" />
          <p className="text-xl font-medium">Welcome Back</p>
          <p className="text-default-500 text-small">
            Log in to your account to continue
          </p>
        </div>
        <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
          <div className="flex flex-col gap-2">
            <Button
              startContent={<Icon icon="flat-color-icons:google" width={24} />}
              variant="bordered"
              onPress={signIn}
            >
              Continue with Google
            </Button>
            <Button
              startContent={
                <Icon className="text-default-500" icon="fe:github" width={24} />
              }
              variant="bordered"
            >
              Continue with Github
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
