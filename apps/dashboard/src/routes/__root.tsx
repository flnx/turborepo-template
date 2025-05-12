import Providers from '@/providers';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <Providers>
        <header className="flex gap-4 p-10">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/dashboard" className="[&.active]:font-bold">
            Dashboard
          </Link>{' '}
        </header>
        <main className="min-h-svh md:min-h-screen">
          <Outlet />
        </main>
      </Providers>
      <TanStackRouterDevtools />
    </>
  ),
});
