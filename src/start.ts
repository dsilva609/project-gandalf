import { createStart } from '@tanstack/react-start';
import { authkitMiddleware } from '@workos/authkit-tanstack-react-start';

/**
 * Configure TanStack Start with AuthKit middleware.
 * The middleware runs on every server request and provides auth context.
 *
 * The middleware reads configuration from environment variables:
 * - WORKOS_CLIENT_ID (required)
 * - WORKOS_API_KEY (required)
 * - WORKOS_REDIRECT_URI (required)
 * - WORKOS_COOKIE_PASSWORD (required, min 32 characters)
 *
 * If you're using VITE_ prefixed variables, they will be mapped to the non-prefixed versions.
 */
export const startInstance = createStart(() => {
  return {
    // Run AuthKit middleware on every request
    requestMiddleware: [authkitMiddleware()],
  };
});
