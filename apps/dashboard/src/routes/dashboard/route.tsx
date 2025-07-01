import { Tab, Tabs } from '@heroui/tabs';
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container space-y-10">
      <TabsNav />
      <Outlet />
    </div>
  );
}

const TabsNav = () => {
  const { pathname } = useLocation();

  return (
    <Tabs selectedKey={pathname} aria-label="Tabs">
      <Tab key="/dashboard" href="/dashboard" title="Daily Log" />
      <Tab key="/dashboard/habits" href="/dashboard/habits" title="Habits" />
    </Tabs>
  );
};
