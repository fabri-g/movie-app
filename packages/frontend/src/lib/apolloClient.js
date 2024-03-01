// frontend/lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache,
});

export default apolloClient;
