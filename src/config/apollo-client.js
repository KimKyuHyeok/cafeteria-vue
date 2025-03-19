import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client/core'

const httpLink = new HttpLink({
  uri: import.meta.env.API_URL,
  headers: () => ({
    Authorization: `Bearer ${
      localStorage.getItem('userToken') ||
      localStorage.getItem('companyToken') ||
      localStorage.getItem('storeToken') ||
      ''
    }`,
  }),
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export { apolloClient, gql }
