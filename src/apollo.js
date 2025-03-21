import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

// HttpLink를 생성하고 API 엔드포인트를 설정
const httpLink = new HttpLink({
  uri: 'http://api.siggwon-moa.shop/graphql',
})

// 인증 토큰을 헤더에 추가하는 링크 생성
const authLink = new ApolloLink((operation, forward) => {
  let token

  if (localStorage.getItem('companyToken')) {
    token = localStorage.getItem('companyToken')
  } else if (localStorage.getItem('userToken')) {
    token = localStorage.getItem('userToken')
  } else if (localStorage.getItem('storeToken')) {
    token = localStorage.getItem('storeToken')
  }

  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  // 헤더에 Authorization을 추가
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  })

  return forward(operation)
})

// Apollo Client 인스턴스 생성
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink), // authLink와 httpLink 연결
  cache: new InMemoryCache(),
})

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})
