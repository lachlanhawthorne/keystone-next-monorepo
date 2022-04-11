import { 
  initUrqlClient,
  withUrqlClient,
} from 'next-urql'

import { 
  ssrExchange, 
  dedupExchange, 
  cacheExchange, 
  fetchExchange,
  TypedDocumentNode,
  Client
} from 'urql'

// getStaticProps for server side rendering
export async function getSsrProps( 
  query: TypedDocumentNode, 
  varaiables?: Record<string, unknown> 
) {
  // urql Client
  const ssrCache = ssrExchange({ isClient: false })

  const client = initUrqlClient({
    url: process.env['CMS_API_URL'] as string,
    exchanges: [
      dedupExchange,
      cacheExchange,
      ssrCache,
      fetchExchange
    ],
  }, false) as Client

  // run the page query
  await client.query(query, varaiables).toPromise()

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    }
  }
}

// === Return component with urql client ===
export function withSsrClient( component: any ) {  
  return withUrqlClient(
    _ssr => ({ url: process.env['CMS_API_URL'] as string }),
    // Important so we don't wrap our component in getInitialProps
    { 
      ssr: false,
      staleWhileRevalidate: true,
      neverSuspend: true
    } 
  )(component)
}