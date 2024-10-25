// src/contexts/AuthContext.tsx

import {auth} from '@/firebase';
import {User} from 'firebase/auth';
import {createContext, useEffect, useState} from 'react';

interface AuthContextProps {
  user: User | null;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoggedIn: false,
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user, isLoggedIn: !!user}}>
      {children}
    </AuthContext.Provider>
  );
};
