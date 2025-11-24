import { AuthKitProvider } from '@workos-inc/authkit-react'
import { useNavigate } from '@tanstack/react-router'

export default function AppWorkOSProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const navigate = useNavigate()
  const clientId = import.meta.env.VITE_WORKOS_CLIENT_ID;
  const apiHostname = import.meta.env.VITE_WORKOS_API_HOSTNAME;
  const redirectUri = import.meta.env.VITE_WORKOS_REDIRECT_URI;

  return <AuthKitProvider
      clientId={clientId}
      apiHostname={apiHostname}
      redirectUri={redirectUri}
      onRedirectCallback={({ state }) => {
        if (state?.returnTo) {
          navigate(state.returnTo)
        }
      }}
    >
      {children}
    </AuthKitProvider>  
}
