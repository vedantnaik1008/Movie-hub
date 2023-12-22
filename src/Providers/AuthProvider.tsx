import { Auth0Provider } from '@auth0/auth0-react';

const AuthProvider = ({children} : {children: React.ReactNode}) => {
  return (
    <Auth0Provider
    domain="dev-d7njwf2anlycyht4.us.auth0.com"
    clientId="f35nARgdC4PhCBFLGIAkoiSyL2lUFqPx"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    {children}
  </Auth0Provider>
  )
}

export default AuthProvider
