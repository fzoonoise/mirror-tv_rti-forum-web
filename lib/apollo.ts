import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

// Auth is handled server-side by the Proxy API Route — no token logic needed here.
const httpLink = createHttpLink({
  uri: '/api/graphql',
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
