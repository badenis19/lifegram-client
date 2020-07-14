import ApolloClient from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import Cookies from 'js-cookie'

// const httpLink = createHttpLink({ uri: 'http://localhost:4001/graphql' });

// const authLink = setContext((_, { headers }) => {
//   const token = Cookies.get('token')

//   return {
//     headers: {
//       ...headers,
//       authorization: `Bearer ${token}`
//     }
//   }
// })

// export default new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// })


export default new ApolloClient({
  uri: "http://localhost:4001/graphql",
});