import { HeroUIProvider } from '@heroui/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from '@tanstack/react-router';

import type { NavigateOptions, ToOptions } from '@tanstack/react-router';

declare module '@react-types/shared' {
  interface RouterConfig {
    href: ToOptions['to'];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  let router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider
        navigate={(to, options) => router.navigate({ to, ...options })}
        useHref={(to) => router.buildLocation({ to }).href}
      >
        {children}
      </HeroUIProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
