import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import Cookies from 'js-cookie'

const httpLink = createHttpLink({ uri: 'http://localhost:4001/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('token')

  // console.log("headers")

  return {
    headers: {
      ...headers, // all the headers already present and adds
      authorization: token
    }
  }
})

console.log("httpLink",httpLink)

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});