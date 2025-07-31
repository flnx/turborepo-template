import type { SidebarItem } from './sidebar';

export const sectionItems: SidebarItem[] = [
  {
    key: 'overview',
    title: 'Overview',
    items: [
      {
        key: 'home',
        href: '/dashboard',
        icon: 'solar:home-2-linear',
        title: 'Home',
      },
    ],
  },
];
