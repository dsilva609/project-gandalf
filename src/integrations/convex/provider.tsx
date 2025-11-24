'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { ConvexQueryClient } from '@convex-dev/react-query';
import { useAuth, useAccessToken, AuthKitProvider } from '@workos/authkit-tanstack-react-start/client';

import { ConvexProvider, ConvexProviderWithAuth } from 'convex/react';

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
if (!CONVEX_URL) {
  throw new Error('Missing required environment variable: VITE_CONVEX_URL');
}

// Create the client at module level - this is fine as long as CONVEX_URL is available
const convexQueryClient = new ConvexQueryClient(CONVEX_URL);

export default function AppConvexProvider({ children }: { children: React.ReactNode }) {
  // useAuth must be available from AuthKitProvider context
  // Since this component is rendered inside WorkOSProvider, the context should be available
  // Passing the hook function itself allows ConvexProviderWithAuthKit to call it internally

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <ConvexProvider client={convexQueryClient.convexClient}>{children}</ConvexProvider>;
  }

  return (
    // Doesn't seem to be picked up with the WorkOSProvider context in Root
    <AuthKitProvider>
      <ConvexProviderWithAuth client={convexQueryClient.convexClient} useAuth={useAuthFromAuthKit}>
        {children}
      </ConvexProviderWithAuth>
    </AuthKitProvider>
  );
}
function useAuthFromAuthKit() {
  const { user, loading: isLoading } = useAuth();
  const { getAccessToken, refresh } = useAccessToken();

  const isAuthenticated = !!user;
  console.log({ isAuthenticated, user });
  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken?: boolean } = {}): Promise<string | null> => {
      if (!user) {
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
    [user, refresh, getAccessToken],
  );

  return {
    user,
    isLoading,
    isAuthenticated,
    fetchAccessToken,
  };
}
