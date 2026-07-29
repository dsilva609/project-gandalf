import { useEffect } from 'react';

import { useLocation } from '@tanstack/react-router';
import { getSignInUrl } from '@workos/authkit-tanstack-react-start';
import { useAuth } from '@workos/authkit-tanstack-react-start/client';

type UserOrNull = ReturnType<typeof useAuth>['user'];

// redirects to the sign-in page if the user is not signed in
export const useUser = (): UserOrNull => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      getSignInUrl({ data: location.pathname }).then((url) => {
        window.location.href = url;
      });
    }
  }, [loading, user, location.pathname]);

  return user;
};
