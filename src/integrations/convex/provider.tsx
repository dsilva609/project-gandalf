'use client';

import { useCallback } from 'react';

import { ConvexQueryClient } from '@convex-dev/react-query';
import { useAccessToken, useAuth } from '@workos/authkit-tanstack-react-start/client';

import { ConvexProviderWithAuth } from 'convex/react';

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
if (!CONVEX_URL) {
  throw new Error('Missing required environment variable: VITE_CONVEX_URL');
}

// Create the client at module level - this is fine as long as CONVEX_URL is available
const convexQueryClient = new ConvexQueryClient(CONVEX_URL);

export default function AppConvexProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProviderWithAuth client={convexQueryClient.convexClient} useAuth={useAuthFromAuthKit}>
      {children}
    </ConvexProviderWithAuth>
  );
}

function useAuthFromAuthKit() {
  const { user, loading: isLoading } = useAuth();
  const { getAccessToken, refresh } = useAccessToken();

  const isAuthenticated = !!user;
  // Depend on the boolean rather than the `user` object: Convex re-runs its auth
  // effects (tearing down and re-establishing the connection) whenever this
  // callback's identity changes, and `user` gets a fresh identity on every refresh.
  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken?: boolean } = {}): Promise<string | null> => {
      if (!isAuthenticated) {
        return null;
      }

      try {
        if (forceRefreshToken) {
          return (await refresh()) ?? null;
        }

        return (await getAccessToken()) ?? null;
      } catch (error) {
        console.error('Failed to get access token:', error);
        return null;
      }
    },
    [isAuthenticated, refresh, getAccessToken],
  );

  return {
    user,
    isLoading,
    isAuthenticated,
    fetchAccessToken,
  };
}
