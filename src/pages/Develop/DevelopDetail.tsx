import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Markdown from '../../components/Markdown/Markdow'
import { CommentType } from '../../common/interface'
import SwiperComponents from '../../components/SwiperComponent'
import DevelopCommentForm from '../../components/pages/Develop/DevelopDetail/DevelopCommentForm'
import DevelopComment from '../../components/pages/Develop/DevelopDetail/DevelopComment'

const DETAIL = gql`
  query markdownDetail($id: Int!) {
    markdownDetail(id: $id) {
      id
      text
      title
      created
      comments {
        id
        text
        writer {
          id
          nickname
        }
      }
      MarkdownTag {
        id
        tag
      }
      MarkdownImg {
        id
        location
      }
      author {
        id
        nickname
      }
    }
  }
`
export default function DevelopDetail() {
  const { id } = useParams<string>()
  const { data, loading, refetch } = useQuery(DETAIL, {
    variables: {
      id: parseInt(id!),
    },
  })

  return (
    <div className="px-20 py-16 sm-m:px-3">
      {!loading && (
        <div>
          <p className="border-b-2 border-origin pb-4 text-5xl font-semibold sm-m:text-4xl">
            {data.markdownDetail.title}
          </p>
          <div className="flex items-center space-x-4 py-3">
            <p className="text-xl">{data.markdownDetail.author.nickname}</p>
            <p className="text-sm text-gray-500">
              {new Intl.DateTimeFormat('KR', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(new Date(data.markdownDetail.created))}
            </p>
          </div>
          <div className="z-0 px-5">
            {data.markdownDetail.MarkdownImg && (
              <SwiperComponents img={data.markdownDetail.MarkdownImg} />
            )}
          </div>
          <div className="py-[20px]">
            <Markdown markdown={data.markdownDetail.text} />
          </div>
          <div className="space-y-3">
            <p>{data.markdownDetail.comments.length} 개의 댓글</p>
            <DevelopCommentForm refetch={refetch} />
          </div>
          <div>
            {data.markdownDetail.comments.map((comment: CommentType) => (
              <DevelopComment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
