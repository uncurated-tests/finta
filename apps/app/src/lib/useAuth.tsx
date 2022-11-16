import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import { useAuthenticationStatus } from "@nhost/react";

interface AuthErrorType { field: 'email' | 'password', message: string, code: string }

interface AuthContextType {
  user?: null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: ({ email, password, name }: { email: string; password: string; name: string }) => Promise<{ error?: AuthErrorType }>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const user = null;
  const { isLoading: isAuthLoading, isAuthenticated } = useAuthenticationStatus();

  const signUp = useCallback(async ({ email, password, name }: { email: string; password: string; name: string; }) => {
    return {}
  }, [])

  const memoedValue = useMemo(
    () => ({
      isLoading: isAuthLoading,
      isAuthenticated: isAuthenticated,
      user,
      signUp
    }) as AuthContextType,
    [ user, isAuthLoading, isAuthenticated, signUp ]
  );

  return <AuthContext.Provider value = { memoedValue }>{ children }</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);