import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { env } from 'envin/env';

const { getClient, PreloadQuery, query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://api.cloudflare.com/client/v4/graphql',
      headers: {
        Authorization: `Bearer ${env.CLOUDFLARE_TOKEN}`,
      },
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      },
    }),
  });
});

export const graphql = Object.assign(getClient, {
  query,
  getClient,
  PreloadQuery,
});
