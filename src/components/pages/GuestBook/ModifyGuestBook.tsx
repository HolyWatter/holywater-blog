import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'

const MODIFY = gql`
  mutation modifyGueshBook($id: Int!, $text: String!) {
    modifyGuestBook(id: $id, text: $text) {
      id
      text
    }
  }
`

interface Props {
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>
  id: number
}

export default function ModifyGuestBook({ setIsModify, id }: Props) {
  const [text, setText] = useState<string>('')
  const [modifyMutation] = useMutation(MODIFY, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })
  const clickClose = () => {
    setIsModify((prev) => !prev)
  }

  const inputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }
  const clickModify = async () => {
    await modifyMutation({
      variables: {
        id,
        text,
      },
    })
    setText('')
    alert('수정되었습니다.')
    clickClose()
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-10 h-screen w-full bg-black/70">
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white">
        <div>
          <p className="py-5 text-center">방명록 수정</p>
          <textarea
            onChange={inputText}
            value={text}
            className="min-w-[400px] resize-none py-1 pl-5 focus:outline-none"
            placeholder="방명록을 수정하세요"
          />
        </div>
        <div className="flex justify-center space-x-3 py-3">
          <button
            onClick={clickClose}
            className="rounded-md border bg-gray-500 px-5 py-1 text-white"
          >
            닫기
          </button>
          <button
            onClick={clickModify}
            className="rounded-md border bg-origin px-5 py-1 text-white"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  )
}
