import { createContext, use, useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';

import { supabase } from '@/utils/supabaseClient';

type TAuth = {
  session: Session | null;
};

const AuthContext = createContext<TAuth | undefined>({
  session: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session);
    });

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext
      value={{
        session,
      }}
    >
      {children}
    </AuthContext>
  );
};

export const useAuth = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('useUser must be used within a AuthProvider');
  }

  return context;
};
