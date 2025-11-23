import React from 'react'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexProviderWithAuthKit } from '@convex-dev/workos'
import { useAuth } from '@workos-inc/authkit-react'

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL
if (!CONVEX_URL) {
  throw new Error('Missing required environment variable: VITE_CONVEX_URL')
}

// Create the client at module level - this is fine as long as CONVEX_URL is available
const convexQueryClient = new ConvexQueryClient(CONVEX_URL)

export default function AppConvexProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // useAuth must be available from AuthKitProvider context
  // Since this component is rendered inside WorkOSProvider, the context should be available
  // Passing the hook function itself allows ConvexProviderWithAuthKit to call it internally
  return (
    <ConvexProviderWithAuthKit client={convexQueryClient.convexClient} useAuth={useAuth}>
      {children}
    </ConvexProviderWithAuthKit>
  )
}
