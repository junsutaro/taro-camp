import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import {useEffect, useState} from 'react';

const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {user, isLoading};
};

export default useCurrentUser;
