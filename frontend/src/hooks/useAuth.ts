// Custom hook for authentication
// To be implemented

import { useAuthStore } from '../store/useAuthStore';

export function useAuth() {
  const { user, isLoading } = useAuthStore();
  
  return {
    user,
    isLoading,
  };
}
