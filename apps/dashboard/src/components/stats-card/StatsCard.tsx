import { Icon } from '@iconify/react';

import { Card, CardBody } from '@heroui/card';

const stats = [
  {
    title: 'Total Habits',
    value: '8',
    icon: 'lucide:list-checks',
    change: '+2',
    changeType: 'positive',
  },
  {
    title: 'Completion Rate',
    value: '87%',
    icon: 'lucide:percent',
    change: '+5%',
    changeType: 'positive',
  },
  {
    title: 'Longest Streak',
    value: '21',
    icon: 'lucide:flame',
    change: 'Best',
    changeType: 'neutral',
  },
  {
    title: 'Monthly Score',
    value: '925',
    icon: 'lucide:trophy',
    change: '+125',
    changeType: 'positive',
  },
];

export const StatsCard = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardBody>
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-default-500">{stat.title}</p>
                <h3 className="mt-1 text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon icon={stat.icon} className="text-2xl text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm ${
                  stat.changeType === 'positive'
                    ? 'text-success'
                    : stat.changeType === 'negative'
                      ? 'text-danger'
                      : 'text-default-500'
                }`}
              >
                {stat.change}
              </span>
              <span className="ml-2 text-sm text-default-400">vs last month</span>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
