import { withSsrClient, getSsrProps } from 'data-access'
import { usePostsQuery, PostsDocument } from 'operations'
import { Posts } from 'ui'

function IndexPage() {
  const [{ data, fetching, error }] = usePostsQuery()
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: 25
        }}
      >
        <h1>KeystoneJS &amp; Next.js Monorepo</h1>
        <div />
        <Posts data={data?.posts} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  return getSsrProps(
    PostsDocument,
    // you can pass in varaibles to the query document
    // { slug: 'hello-world' } 
  )
}

export default withSsrClient(IndexPage)
