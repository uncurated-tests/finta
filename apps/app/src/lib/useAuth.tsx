import { createContext, ReactNode, useContext, useMemo } from "react";
import { useAuthenticationStatus } from "@nhost/react";

interface AuthContextType {
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { isLoading: isAuthLoading } = useAuthenticationStatus();

  const memoedValue = useMemo(
    () => ({
      isLoading: isAuthLoading
    }) as AuthContextType,
    [ isAuthLoading ]
  );

  return <AuthContext.Provider value = { memoedValue }>{ children }</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);