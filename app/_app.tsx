import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'

const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache()
});
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <h1>hello world</h1>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}