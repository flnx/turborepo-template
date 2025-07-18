import { createContext, use, useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';
// import { useRouter } from '@tanstack/react-router';

import { supabase } from '@/utils/supabaseClient';

export type TAuthContext = {
  session: Session | null;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isAuthReady: boolean;
};

const AuthContext = createContext<TAuthContext | undefined>({
  session: null,
  signOut: async () => undefined,
  isAuthenticated: false,
  isAuthReady: false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  // const router = useRouter();

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
    const { error } = await supabase.auth.signOut();

    console.log(error);
    // redirect to login or home-page
    // remove tanstack cache
    // setSession(null); // Optional, since Supabase also triggers onAuthStateChange
  };

  const isAuthenticated = !!session?.user;

  return (
    <AuthContext
      value={{
        session,
        signOut,
        isAuthenticated,
        isAuthReady
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
