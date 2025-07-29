import { forwardRef } from 'react';

import { Avatar, AvatarProps } from '@heroui/avatar';
import { cn } from '@heroui/theme';

const TeamAvatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, className, classNames = {}, ...props }, ref) => (
    <Avatar
      {...props}
      ref={ref}
      classNames={{
        ...classNames,
        base: cn(
          'bg-transparent border border-divider',
          classNames?.base,
          className,
        ),
        name: cn('text-default-500 text-[0.6rem] font-semibold', classNames?.name),
      }}
      getInitials={(name) =>
        (name[0] || '') + (name[name.lastIndexOf(' ') + 1] || '').toUpperCase()
      }
      name={name}
      radius="md"
      size="sm"
    />
  ),
);

TeamAvatar.displayName = 'TeamAvatar';

export default TeamAvatar;
