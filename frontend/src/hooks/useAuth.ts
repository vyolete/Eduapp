// Custom hook for authentication
// To be implemented

import { useAuthStore } from '../store/useAuthStore';

export function useAuth() {
  const { user, session, isLoading } = useAuthStore();
  
  return {
    user,
    session,
    isLoading,
  };
}
