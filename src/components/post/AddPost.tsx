import { useMutation, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADDPOST = gql`
  mutation addPosting($title: String!, $text: String!) {
    addPosting(title: $title, text: $text) {
      id
      text
      title
      user_id
    }
  }
`
interface Props {
  setIsPosting: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddPost({ setIsPosting }: Props) {
  const [contents, setContents] = useState({
    title: '',
    text: '',
  })
  const [tagList, setTagList] = useState<string[]>([])
  const [tag, setTag] = useState<string>('')
  const [addPosting, { data }] = useMutation(ADDPOST, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })

  const inputContents = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setContents({
      ...contents,
      [name]: value,
    })
  }
  useEffect(() => {
    if (data?.addPosting) {
      alert('게시글이 작성되었습니다.')
      closeModal()
    }
  }, [data])

  const clickPost = async () => {
    if (contents.text !== '' && contents.title !== '') {
      addPosting({ variables: contents })
    } else {
      alert('내용을 입력해주세요')
    }
  }

  const closeModal = () => {
    setIsPosting((prev) => !prev)
    setContents({
      title: '',
      text: '',
    })
  }
  const inputTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value)
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

  const deleteTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTagList(tagList.filter((tag) => tag !== e.currentTarget.value))
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/50">
      <div className="absolute top-[40%] left-[50%] flex w-[50%] translate-x-[-50%] translate-y-[-50%]  flex-col space-y-3 rounded-md border bg-white py-7 px-5">
        <div className="pb-3 text-center font-semibold text-gray-700">
          게시글 작성
        </div>
        <input
          onChange={inputContents}
          name="title"
          value={contents.title}
          placeholder="제목을 입력하세요"
          className="border-b py-1 pl-2 focus:outline-none"
        />
        <form className="" onSubmit={submitTagForm}>
          <input
            onChange={inputTag}
            value={tag}
            className="w-full border-b py-1 pl-2 focus:outline-none"
            placeholder="태그를 입력하세요"
          />
        </form>
        <div className="flex flex-wrap space-x-1">
          {tagList.map((tag) => (
            <div
              key={tag}
              className="mb-1 flex items-center space-x-2 rounded-full bg-origin py-1 px-3"
            >
              <p className="text-[8px] text-white">{tag}</p>
              <button value={tag} onClick={deleteTag}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <textarea
          onChange={inputContents}
          name="text"
          value={contents.text}
          placeholder="내용을 입력하세요"
          className="h-40 resize-none border py-1 pl-2 focus:outline-none"
        />
        <div className="flex space-x-3">
          <button onClick={clickPost}>게시글 작성</button>
          <button onClick={closeModal}>닫기</button>
        </div>
      </div>
    </div>
  )
}
