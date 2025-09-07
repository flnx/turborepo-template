import { DateProvider } from '@/contexts/DateContext';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { SideNav } from '@/components/sidenav/sidenav';

export const Route = createFileRoute('/dashboard')({
  component: DashboardMain,
  beforeLoad({ context }) {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
});

function DashboardMain() {
  return (
    <div className="container mt-4">
      <div className="flex space-x-10">
        <SideNav />
        <div className="w-full">
          <DateProvider>
            <Outlet />
          </DateProvider>
        </div>
      </div>
    </div>
  );
}
