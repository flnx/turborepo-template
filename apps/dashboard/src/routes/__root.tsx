import { useAuth } from '@/contexts/AuthContext';
import Providers from '@/providers';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
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

const Navbar = () => {
  const { session } = useAuth();

  return (
    <header className="flex gap-4 p-10">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/dashboard" className="[&.active]:font-bold">
        Dashboard
      </Link>{' '}
      <Link to="/login" className="[&.active]:font-bold">
        Login
      </Link>{' '}
    </header>
  );
};
