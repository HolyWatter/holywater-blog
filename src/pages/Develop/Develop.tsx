import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { PostingType } from '../../common/interface'
import MarkdownPosting from '../../components/Develop/MarkdownPosting'

const GETMARKDOWN = gql`
  query allMarkdown {
    allMarkdown {
      id
      title
      text
      created
      author {
        nickname
      }
      comments {
        id
      }
    }
  }
`
export default function Develop() {
  const { data, loading } = useQuery(GETMARKDOWN)

  return (
    <div className="h-full w-full sm:px-[13%] md:px-[15%] lg:px-[20%]">
      <div className="mx-auto">
        {!loading &&
          data.allMarkdown.map((item: PostingType) => (
            <MarkdownPosting key={item.id} posting={item} />
          ))}
      </div>
    </div>
  )
}
