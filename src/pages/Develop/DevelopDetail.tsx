import { useQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostingType } from '../../common/interface'
import Markdown from '../../components/Markdown/Markdow'

const DETAIL = gql`
  query markdownDetail($id: Int!) {
    markdownDetail(id: $id) {
      id
      text
      title
      comments {
        id
        text
      }
      author {
        id
        nickname
      }
    }
  }
`
export default function DevelopDetail() {
  const [detail, setDetail] = useState<PostingType>()
  const { id } = useParams<string>()
  const { data , loading} = useQuery(DETAIL, {
    variables: {
      id: parseInt(id!),
    },
  })

  useEffect(() => {
    if (!loading) {
      setDetail(data.markdownDetail)
    }
  }, [data])

  return (
    <div>
      {detail && (
        <div>
          <p>{detail.title}</p>
          <Markdown markdown={detail.text} />
        </div>
      )}
    </div>
  )
}
