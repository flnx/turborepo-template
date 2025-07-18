import Providers from '@/providers';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Navbar } from '@/components/navbar/navbar';

import type { TAuthContext } from '@/contexts/AuthContext';

export interface MyRouterContext {
  auth: TAuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Providers>
        <Navbar />
        <main className="min-h-svh md:min-h-screen">
          <Outlet />
        </main>
      </Providers>
      <TanStackRouterDevtools />
    </>
  ),
});
