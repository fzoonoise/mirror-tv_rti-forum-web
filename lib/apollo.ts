import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { env } from './env'

const httpLink = createHttpLink({
  uri: env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
})

const authLink = setContext((_, { headers }) => {
  // Get token from localStorage (client-side only)
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('sessionToken') : null

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
