import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import MainLayout from '../components/mainLayout';

function MovieApp ({ Component, pageProps }) {

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope:"openid profile email read:users update:users"
      }}
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Auth0Provider>
  );
};

export default MovieApp;
