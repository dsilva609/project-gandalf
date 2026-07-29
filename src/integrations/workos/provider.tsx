import { AuthKitProvider } from '@workos/authkit-tanstack-react-start/client';

import type { AuthKitProviderProps } from '@workos/authkit-tanstack-react-start/client';

export default function AppWorkOSProvider({
  children,
  initialAuth,
}: {
  children: React.ReactNode;
  // Seeded from the root loader so the provider doesn't re-fetch auth on mount
  initialAuth?: AuthKitProviderProps['initialAuth'];
}) {
  return <AuthKitProvider initialAuth={initialAuth}>{children}</AuthKitProvider>;
}
