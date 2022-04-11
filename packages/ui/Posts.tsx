import * as React from 'react'
import { DocumentRenderer } from '@keystone-6/document-renderer'

export function Posts({ data }: { data: any }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
      }}
    >
      <h2>Posts</h2>

      {data.length > 0 && data.map(({ title, content }: any) => (
        <div
          style={{
            padding: 20,
            border: '1px solid',
            width: '100%',
            marginBottom: 25
          }}
        >
          <h3>{title}</h3>
          <DocumentRenderer document={content.document} />
        </div>
      ))}

      {!data.length && <p>No posts found, add some in Keystone</p>}
    </div>
  )
}