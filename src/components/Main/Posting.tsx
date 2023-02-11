import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { PostingType } from '../../common/interface'

interface Props {
  posting: PostingType
}

const ADDCOMMENT = gql`
  mutation addPostingComment($text: String!, $postingId: Int!) {
    addPostingComment(text: $text, postingId: $postingId) {
      text
      id
    }
  }
`

export default function Posting({ posting }: Props) {
  const [comment, setComment] = useState('')
  const date = new Date(posting.created)
  const timeFormat = new Intl.DateTimeFormat('KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
  const inputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }
  const [addComment, { data }] = useMutation(ADDCOMMENT, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })

  const submitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addComment({
      variables: {
        text: comment,
        postingId: posting.id,
      },
    })
    setComment('')
    console.log(data)
  }

  return (
    <div className="my-5 w-[400px] rounded-md border">
      <div className="flex flex-col justify-center space-y-3 py-2 pl-3">
        <p>{posting.author.nickname}</p>
        <p className="text-xs text-gray-500">{timeFormat}</p>
      </div>
      <div className="border-b"></div>
      <div className="py-3 pl-3">
        <div className="flex items-center space-x-5">
          <p>{posting.author.nickname}</p>
          <p className="text-[16px]">{posting.title}</p>
        </div>
        <p>{posting.text}</p>
      </div>
      <div className="border-b" />
      <div className="flex flex-col py-3 pl-3">
        {posting.comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <p className="font-semibold">{comment.writer.nickname}</p>
            <p className="text-gray-700">{comment.text}</p>
          </div>
        ))}
      </div>
      <form className="flex w-full" onSubmit={submitComment}>
        <input
          onChange={inputComment}
          value={comment}
          placeholder="댓글을 입력하세요"
          className="w-[85%] rounded-md py-1 pl-3"
        />
        <button className="w-[15%] rounded-md bg-origin py-1 px-2 font-light text-white">
          입력
        </button>
      </form>
    </div>
  )
}
