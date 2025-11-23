import { createStart } from '@tanstack/react-start'
import { authkitMiddleware } from '@workos/authkit-tanstack-react-start'

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
  // Map VITE_ prefixed environment variables to the non-prefixed versions
  // that the middleware expects (for server-side usage)
  // if (process.env.VITE_WORKOS_CLIENT_ID && !process.env.WORKOS_CLIENT_ID) {
  //   process.env.WORKOS_CLIENT_ID = process.env.VITE_WORKOS_CLIENT_ID
  // }
  // if (
  //   process.env.VITE_WORKOS_REDIRECT_URI &&
  //   !process.env.WORKOS_REDIRECT_URI
  // ) {
  //   process.env.WORKOS_REDIRECT_URI = process.env.VITE_WORKOS_REDIRECT_URI
  // }
  // if (process.env.VITE_WORKOS_API_KEY && !process.env.WORKOS_API_KEY) {
  //   process.env.WORKOS_API_KEY = process.env.VITE_WORKOS_API_KEY
  // }

  // // Check for required environment variables
  // if (!process.env.WORKOS_CLIENT_ID) {
  //   console.warn(
  //     'Warning: WORKOS_CLIENT_ID environment variable is not set. AuthKit middleware may not work correctly.',
  //   )
  // }
  // if (!process.env.WORKOS_API_KEY) {
  //   console.warn(
  //     'Warning: WORKOS_API_KEY environment variable is not set. AuthKit middleware may not work correctly.',
  //   )
  // }
  // if (!process.env.WORKOS_REDIRECT_URI) {
  //   console.warn(
  //     'Warning: WORKOS_REDIRECT_URI environment variable is not set. AuthKit middleware may not work correctly.',
  //   )
  // }
  // if (!process.env.WORKOS_COOKIE_PASSWORD) {
  //   console.warn(
  //     'Warning: WORKOS_COOKIE_PASSWORD environment variable is not set. AuthKit middleware may not work correctly.',
  //   )
  //   console.warn('Generate one with: openssl rand -base64 24')
  // }

  return {
    // Run AuthKit middleware on every request
    requestMiddleware: [authkitMiddleware()],
  }
})
