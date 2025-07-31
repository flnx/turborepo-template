import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import '@/styles/index.css';

import { createRouter, RouterProvider } from '@tanstack/react-router';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app

function InnerApp() {
  const auth = useAuth();

  if (auth.isAuthReady) {
    // Auth session is extracted from localStorage/cookies super fast. Loading component not needed
    return <RouterProvider router={router} context={{ auth }} />;
  }

  return null;
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </StrictMode>,
  );
}

export type TanstackRouterPaths = keyof typeof router.routesById;
