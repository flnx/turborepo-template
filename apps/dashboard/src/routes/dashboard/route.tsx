import { Tab, Tabs } from '@heroui/tabs';
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router';

import { SideNav } from '@/components/sidenav/sidenav';

export const Route = createFileRoute('/dashboard')({
  component: DashboardTabsOutlet,
  beforeLoad({ context }) {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
});

function DashboardTabsOutlet() {
  return (
    <div className="container mt-4">
      <div className="flex space-x-10">
        <SideNav />
        {/* <TabsNav /> */}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const TabsNav = () => {
  const { pathname } = useLocation();

  return (
    <Tabs selectedKey={pathname} aria-label="Tabs" fullWidth className="max-w-md">
      <Tab key="/dashboard" href="/dashboard" title="Daily Log" />
      <Tab key="/dashboard/habits" href="/dashboard/habits" title="Habits" />
    </Tabs>
  );
};
