import { HeroUIProvider } from '@heroui/system';
import { ToastProvider } from '@heroui/toast';
import { useRouter } from '@tanstack/react-router';

import type { NavigateOptions, ToOptions } from '@tanstack/react-router';

declare module '@react-types/shared' {
  interface RouterConfig {
    href: ToOptions['to'];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

function Providers({ children }: { children: React.ReactNode }) {
  let router = useRouter();

  return (
    <HeroUIProvider
      disableAnimation
      navigate={(to, options) => router.navigate({ to, ...options })}
      useHref={(to) => router.buildLocation({ to }).href}
    >
      <ToastProvider placement="top-center" />
      {children}
    </HeroUIProvider>
  );
}

export default Providers;
