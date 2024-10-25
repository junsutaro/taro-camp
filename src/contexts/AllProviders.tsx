// src/contexts/AllProviders.tsx

import { ReactNode } from 'react';
import {AuthProvider} from './AuthContext';

interface AllProvidersProps {
  children: ReactNode; // children의 타입 정의
}

export const AllProviders = ({children}: AllProvidersProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};
