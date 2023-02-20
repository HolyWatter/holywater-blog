import { useEffect, useState } from 'react'
import { Link, Router, useNavigate } from 'react-router-dom'
import Markdown from '../../components/Markdown/Markdow'
import { gql, useMutation } from '@apollo/client'
import PostDevelopForm from '../../components/pages/Develop/PostDevelop/PostDevelopForm'
import { useRecoilValue } from 'recoil'
import { loginState } from '../../common/Atom'

const ADDMARKDOWN = gql`
  mutation addMarkdown(
    $title: String!
    $text: String!
    $tag: [String]
    $img: [Upload]
  ) {
    addMarkdown(title: $title, text: $text, tag: $tag, img: $img) {
      id
      text
      title
      created
      user_id
      MarkdownImg {
        id
        location
      }
      MarkdownTag {
        id
        tag
      }
    }
  }
`

export default function PostDevelop() {
  const [tagList, setTagList] = useState<string[]>([])
  const currentUser = useRecoilValue(loginState)
  const [contents, setContents] = useState({
    title: '',
    text: '',
  })
  const [img, setImg] = useState<any>([])
  const navigate = useNavigate()

  const [addMarkdown, { data }] = useMutation(ADDMARKDOWN, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })

  useEffect(() => {
    if (currentUser.role !== 'creator') {
      alert('권한이 없습니다.')
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (data) {
      navigate(`/develop/${data.addMarkdown.id}`)
    }
  }, [data])

  const submitPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    addMarkdown({
      variables: {
        title: contents.title,
        text: contents.text,
        tag: tagList,
        img,
      },
    })
  }

  return (
    <div className="h-full w-full py-10 md:pr-10">
      <div className="h-full w-full space-y-3 xl:inline-block xl:w-[40%]">
        <PostDevelopForm
          contents={contents}
          setContents={setContents}
          setImg={setImg}
          setTagList={setTagList}
          tagList={tagList}
          img={img}
        />
        <div className="fixed bottom-0 left-0 z-10 flex h-20 w-full items-center justify-between border-t bg-origin px-5">
          <Link
            to="/develop"
            className="flex items-center space-x-3 text-xl text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <p>나가기</p>
          </Link>
          <button
            onClick={submitPost}
            className="rounded-md border bg-white py-2 px-3 text-origin"
          >
            글쓰기
          </button>
        </div>
      </div>
      <div className="mt-10 break-words align-top xl-m:hidden xl:ml-10 xl:inline-block xl:w-[40%]">
        <Markdown markdown={contents.text} />
      </div>
    </div>
  )
}
