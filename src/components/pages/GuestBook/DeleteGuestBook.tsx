import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useMutation,
} from '@apollo/client'
import React, { useState } from 'react'

const DELETE = gql`
  mutation deleteGueshBook($id: Int!) {
    deleteGuestBook(id: $id) {
      id
      text
    }
  }
`

interface Props {
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>
  id: number
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}

export default function DeleteGuestBook({ setIsDelete, id, refetch }: Props) {
  const [deleteMutation] = useMutation(DELETE, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })

  const clickClose = () => {
    setIsDelete((prev) => !prev)
  }

  const clickDelete = async () => {
    await deleteMutation({
      variables: {
        id,
      },
    })
    alert('삭제되었습니다.')
    clickClose()
    refetch()
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 z-10 h-screen w-full bg-black/70">
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white">
        <div>
          <p className="py-5 text-center">방명록 삭제</p>
        </div>
        <p className="whitespace-nowrap py-5 px-10 text-gray-500">
          정말로 삭제하겠습니까.....?
        </p>
        <div className="flex justify-center space-x-3 py-3">
          <button
            onClick={clickClose}
            className="rounded-md border bg-gray-500 px-5 py-1 text-white"
          >
            닫기
          </button>
          <button
            onClick={clickDelete}
            className="rounded-md border bg-origin px-5 py-1 text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
