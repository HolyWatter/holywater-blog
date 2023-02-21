import { useQuery, gql, useMutation } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import Markdown from '../../components/Markdown/Markdow'
import { CommentType } from '../../common/interface'
import SwiperComponents from '../../components/SwiperComponent'
import DevelopCommentForm from '../../components/pages/Develop/DevelopDetail/DevelopCommentForm'
import DevelopComment from '../../components/pages/Develop/DevelopDetail/DevelopComment'
import { useRecoilValue } from 'recoil'
import { loginState } from '../../common/Atom'
import { useEffect, useState } from 'react'
import DeleteModal from '../../components/Modal/DeleteModal'

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

const DELETE = gql`
  mutation deleteMarkdown($id: Int!) {
    deleteMarkdown(id: $id) {
      id
    }
  }
`
export default function DevelopDetail() {
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)
  const navigate = useNavigate();
  const { id } = useParams<string>()
  const currentUser = useRecoilValue(loginState)
  const { data, loading, refetch } = useQuery(DETAIL, {
    variables: {
      id: parseInt(id!),
    },
  })
  const [deleteMutation , deleteRes] = useMutation(DELETE, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })

  useEffect(() => {
    refetch()
  }, [data])

  const clickDelete = () => {
    setIsDeleteModal((prev) => !prev)
  }

  useEffect(()=>{
    if(deleteRes.data){
      alert("삭제되었습니다.")
      navigate('/develop')
    }
  } , [deleteRes])

  const clickConfirm = async () => {
    await deleteMutation({
      variables: {
        id: data.markdownDetail.id,
      },
    })

  }

  return (
    <div className="px-20 py-16 sm-m:px-3">
      {!loading && data && (
        <div>
          <div className="flex items-end justify-between border-b-2 border-origin">
            <p className=" pb-4 text-5xl font-semibold sm-m:text-4xl">
              {data.markdownDetail.title}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-4 py-3">
              <p className="text-xl">{data.markdownDetail.author.nickname}</p>
              <p className="text-sm text-gray-500">
                {new Intl.DateTimeFormat('KR', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(data.markdownDetail.created))}
              </p>
            </div>
            {currentUser?.nickname === data.markdownDetail.author.nickname && (
              <div className="space-x-3">
                <button onClick={clickDelete} className="underline">
                  삭제
                </button>
                <button onClick={() => {}} className="underline">
                  수정
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap space-x-3">
            {data.markdownDetail.MarkdownTag.map(
              (item: { id: number; tag: string }) => (
                <p
                  className="mb-4 rounded-full bg-origin px-3 py-1 text-white"
                  key={item.id}
                >
                  {item.tag}
                </p>
              )
            )}
          </div>
          <div className="z-0 px-5">
            {<SwiperComponents img={data.markdownDetail.MarkdownImg} />}
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
              <DevelopComment key={comment.id} comment={comment} refetch={refetch} />
            ))}
          </div>
        </div>
      )}
      {isDeleteModal && (
        <DeleteModal message="게시글" clickClose={clickDelete} clickConfirm={clickConfirm} />
      )}
    </div>
  )
}
