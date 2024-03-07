import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import MainLayout from '../components/mainLayout';

function MovieApp ({ Component, pageProps }) {

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={typeof window !== 'undefined' && window.location.origin}
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Auth0Provider>
  );
};

export default MovieApp;
