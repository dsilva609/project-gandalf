import { createFileRoute } from '@tanstack/react-router';
import { handleCallbackRoute } from '@workos/authkit-tanstack-react-start';
import { ConvexHttpClient } from 'convex/browser';
import { api } from 'convex/_generated/api';

const CONVEX_URL = process.env.VITE_CONVEX_URL || process.env.CONVEX_URL;
if (!CONVEX_URL) {
  throw new Error('Missing required environment variable: VITE_CONVEX_URL or CONVEX_URL');
}

const convexClient = new ConvexHttpClient(CONVEX_URL);

export const Route = createFileRoute('/api/auth/callback')({  
  server: {
    handlers: {
      GET: handleCallbackRoute({
        onSuccess: async ({ user, authenticationMethod }) => {
          console.log('Authentication successful:', user.email, authenticationMethod);
          
          const exists = await convexClient.query(api.users.getByExternalId, { externalId: user.id });
        
          if (!exists) {
            await convexClient.mutation(api.users.create, { externalId: user.id, displayName: user.email, firstName: user.firstName!, lastName: user.lastName! });
          }
          console.log(exists);
        },
        onError: ({ error }) => {
          console.error('Authentication failed:', error);
          return new Response(
            JSON.stringify({
              error: {
                message: 'Authentication failed',
                description: 'Something went wrong during sign in. Please try again.',
              },
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        },
      }),
    },
  },
});