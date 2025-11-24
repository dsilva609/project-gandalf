import { createFileRoute } from '@tanstack/react-router';
import { signOut } from '@workos/authkit-tanstack-react-start';

export const Route = createFileRoute('/auth/logout')({
  ssr: true,
  loader: async () => await signOut(),
});
