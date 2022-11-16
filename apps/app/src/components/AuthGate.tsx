import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "src/lib/useAuth";

export interface AuthGateParams {
  children: ReactElement;
  shouldBeSignedIn?: boolean;
}

export const AuthGate = (params: AuthGateParams) => {
  const location = useLocation();
  const { children, shouldBeSignedIn } = params;
  const { isLoading, isAuthenticated } = useAuth();

  if ( shouldBeSignedIn && isLoading ) {
    return <></>
  }

  if ( shouldBeSignedIn && !isAuthenticated ) {
    const onAuthRedirect = location.pathname + location.search || "/";
    return <Navigate to = "/login" state = {{ redirect: onAuthRedirect }} />
  }

  return children;
}