import { useCallback, useState } from 'react';

import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { Spacer } from '@heroui/spacer';
import { cn } from '@heroui/theme';
import { Tooltip } from '@heroui/tooltip';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useMediaQuery } from 'usehooks-ts';

import Sidebar from './sidebar';
import { sectionItems } from './sidebar-items';

export const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const isCompact = isCollapsed || isMobile;

  const onToggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <div className="flex h-full min-h-[48rem]">
      <div
        className={cn(
          '!border-r-small border-divider transition-width relative flex h-full w-72 flex-col',
          {
            'w-16 items-center px-2 py-6': isCompact,
          },
        )}
      >
        <div
          className={cn(
            'flex items-center gap-3 px-3',

            {
              'justify-center gap-0': isCompact,
            },
          )}
        >
          <div className="flex w-full items-center justify-between">
            <div></div>
            <Button isIconOnly size="sm" variant="light" onPress={onToggle}>
              <Icon
                className="text-default-500"
                height={24}
                icon="solar:sidebar-minimalistic-outline"
                width={24}
              />
            </Button>
          </div>
        </div>
        <Spacer y={8} />
        <div className="flex items-center gap-3 px-3">
          <Avatar
            isBordered
            className="flex-none"
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          />
          <div className={cn('flex max-w-full flex-col', { hidden: isCompact })}>
            <p className="text-small text-default-600 truncate font-medium">
              John Doe
            </p>
            <p className="text-tiny text-default-400 truncate">Product Designer</p>
          </div>
        </div>
        <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
          <Sidebar
            defaultSelectedKey="home"
            isCompact={isCompact}
            items={sectionItems}
          />
        </ScrollShadow>
        <Spacer y={2} />
        <div
          className={cn('mt-auto flex flex-col', {
            'items-center': isCompact,
          })}
        >
          <Tooltip
            content="Help & Feedback"
            isDisabled={!isCompact}
            placement="right"
          >
            <Button
              fullWidth
              className={cn(
                'text-default-500 data-[hover=true]:text-foreground justify-start truncate',
                {
                  'justify-center': isCompact,
                },
              )}
              isIconOnly={isCompact}
              startContent={
                isCompact ? null : (
                  <Icon
                    className="text-default-500 flex-none"
                    icon="solar:info-circle-line-duotone"
                    width={24}
                  />
                )
              }
              variant="light"
            >
              {isCompact ? (
                <Icon
                  className="text-default-500"
                  icon="solar:info-circle-line-duotone"
                  width={24}
                />
              ) : (
                'Help & Information'
              )}
            </Button>
          </Tooltip>
          <Tooltip content="Log Out" isDisabled={!isCompact} placement="right">
            <Button
              className={cn(
                'text-default-500 data-[hover=true]:text-foreground justify-start',
                {
                  'justify-center': isCompact,
                },
              )}
              isIconOnly={isCompact}
              startContent={
                isCompact ? null : (
                  <Icon
                    className="text-default-500 flex-none rotate-180"
                    icon="solar:minus-circle-line-duotone"
                    width={24}
                  />
                )
              }
              variant="light"
            >
              {isCompact ? (
                <Icon
                  className="text-default-500 rotate-180"
                  icon="solar:minus-circle-line-duotone"
                  width={24}
                />
              ) : (
                'Log Out'
              )}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
