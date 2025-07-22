import { Tab, Tabs } from '@heroui/tabs';
import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router';

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
    <div className="container mt-4 space-y-10">
      <TabsNav />
      <Outlet />
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
