import type { SidebarItem } from './sidebar';

export const sectionItems: SidebarItem[] = [
  {
    key: 'overview',
    title: 'Overview',
    items: [
      {
        key: 'today',
        href: '/dashboard',
        icon: 'solar:home-2-linear',
        title: 'Today',
      },
      {
        key: 'all-habits',
        href: '/dashboard',
        icon: 'solar:home-2-linear',
        title: 'Habit List',
      },
    ],
  },
];
