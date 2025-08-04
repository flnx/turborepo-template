import { Icon } from '@iconify/react';

import logo from '@/assets/logox.png';
import { Button } from '@heroui/button';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: LoginComponent,

  beforeLoad({ context }) {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  loader: ({ context }) => context.auth,
});

function LoginComponent() {
  const { signIn } = Route.useLoaderData();

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
        <div className="rounded-large bg-content1 shadow-small mt-2 flex w-full max-w-sm flex-col gap-4 px-8 py-6">
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
