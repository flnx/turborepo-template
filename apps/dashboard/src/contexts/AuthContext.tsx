import { createContext, use, useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';

import { supabase } from '@/utils/supabaseClient';

export type TAuthContext = {
  session: Session | null;
  signIn: () => void;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isAuthReady: boolean;
};

const AuthContext = createContext<TAuthContext | undefined>({
  session: null,
  signOut: async () => undefined,
  signIn: () => undefined,
  isAuthenticated: false,
  isAuthReady: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session);
      setIsAuthReady(true);
      // router.invalidate();
    });

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    // to-do: remove tanstack cache
  };

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/dashboard',
      },
    });
  };

  const isAuthenticated = !!session?.user;

  return (
    <AuthContext
      value={{
        session,
        signOut,
        isAuthenticated,
        isAuthReady,
        signIn,
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
