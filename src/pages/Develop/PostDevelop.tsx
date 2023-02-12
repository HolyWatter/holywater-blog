import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Markdown from '../../components/Markdown/Markdow'
import DevelopTagForm from '../../components/Develop/DevelopTagForm'
import { gql, useMutation } from '@apollo/client'

const ADDMARKDOWN = gql`
  mutation addMarkdown($title: String!, $text: String!) {
    addMarkdown(title: $title, text: $text) {
      id
      text
      title
      created
      user_id
    }
  }
`

export default function PostDevelop() {
  const [tag, setTag] = useState<string>('')
  const [tagList, setTagList] = useState<string[]>([])
  const [contents, setContents] = useState({
    title: '',
    description: '',
  })
  const [addMarkdown, { data }] = useMutation(ADDMARKDOWN, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })
  const navigate = useNavigate()
  useEffect(() => {
    if (data?.addMarkdown) {
      alert('게시글이 작성되었습니다.')
      navigate(`/develop/${data.addMarkdown.id}`)
    }
  }, [data])
  const inputContents = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setContents({
      ...contents,
      [name]: value,
    })
  }

  const submitTagForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (tagList.includes(tag)) {
      alert('이미 포함된 태그입니다.')
      setTag('')
    } else {
      setTagList([...tagList, tag])
      setTag('')
    }
  }

  const inputTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value)
  }

  const deleteTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTagList(tagList.filter((tag) => tag !== e.currentTarget.value))
  }

  const pressTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      setContents({
        ...contents,
        description: contents.description + '\t',
      })
    }
  }

  const submitPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    addMarkdown({
      variables: {
        title: contents.title,
        text: contents.description,
      },
    })
  }

  return (
    <div className="flex h-full py-10 px-10 md:space-x-7">
      <div className="h-full  space-y-3 md-m:w-full md:w-[50%]">
        <input
          onChange={inputContents}
          className="border-b-4 border-origin bg-bg pl-3 pb-2 text-3xl focus:outline-none"
          placeholder="제목을 입력하세요"
          name="title"
          value={contents.title}
        />
        <DevelopTagForm
          deleteTag={deleteTag}
          inputTag={inputTag}
          tag={tag}
          submitTagForm={submitTagForm}
          tagList={tagList}
        />
        <textarea
          onKeyDown={pressTabKey}
          onChange={inputContents}
          name="description"
          value={contents.description}
          placeholder="오늘 공부한 내용을 적어보세요..."
          className="min-h-[350px] w-full resize-none bg-bg pl-3 focus:outline-none"
        />
        <div className="fixed bottom-0 left-0 flex h-20 w-full items-center justify-between border-t bg-origin px-5">
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
      <div className="w-[50%] break-words md-m:hidden">
        <Markdown markdown={contents.description} />
      </div>
    </div>
  )
}
