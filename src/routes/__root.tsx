import { TanStackDevtools } from '@tanstack/react-devtools';
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { getAuthAction } from '@workos/authkit-tanstack-react-start';

import Header from '~/components/Header';
import ConvexProvider from '~/integrations/convex/provider';
import TanStackQueryDevtools from '~/integrations/tanstack-query/devtools';
import WorkOSProvider from '~/integrations/workos/provider';

import appCss from '../styles.css?url';

import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  loader: async () => {
    // Sanitized auth state (no access token) - safe to serialize into the document
    // and used to seed AuthKitProvider so it doesn't re-fetch auth on the client.
    const auth = await getAuthAction();
    return {
      auth,
    };
  },
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { auth } = Route.useLoaderData();
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <WorkOSProvider initialAuth={auth}>
          <ConvexProvider>
            <Header />
            {children}
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtools,
              ]}
            />
          </ConvexProvider>
        </WorkOSProvider>
        <Scripts />
      </body>
    </html>
  );
}
