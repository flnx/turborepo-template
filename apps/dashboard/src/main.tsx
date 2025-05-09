import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import '@/styles/index.css';

import App from './App.tsx';
import Providers from './providers.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      {/* <main className="bg-background text-foreground dark"> */}
        <App />
      {/* </main> */}
    </Providers>
  </StrictMode>,
);
