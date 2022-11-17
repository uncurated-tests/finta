import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "src/lib/useAuth";

export interface AuthGateParams {
  children: ReactElement;
  shouldBeSignedIn?: boolean;
}

export type LocationStateType = {
  from: {
    path: string,
    pathname: string,
    search: string
  }
}

export const AuthGate = (params: AuthGateParams) => {
  const location = useLocation();
  const { children, shouldBeSignedIn } = params;
  const { user, isLoading } = useAuth();

  if ( shouldBeSignedIn && isLoading ) {
    return <></>
  }

  if ( shouldBeSignedIn && !user ) {
    const onAuthRedirect = location.pathname + location.search || "/";
    return <Navigate to = "/login" state = {{ redirect: onAuthRedirect }} />
  }

  return children;
}