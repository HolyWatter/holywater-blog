import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useMutation,
} from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { loginState } from '../../../common/Atom'
import { User } from '../../../common/interface'

interface Props {
  setIsModifyProfile: React.Dispatch<React.SetStateAction<boolean>>
  userInfo: User
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}

const DELETEUSER = gql`
  mutation deleteUserInfo($email: String!) {
    deleteUserInfo(email: $email) {
      id
    }
  }
`

export default function ModifyProfile({
  setIsModifyProfile,
  userInfo,
  refetch,
}: Props) {
  const [email, setEmail] = useState<string>('')
  const clickClose = () => {
    setIsModifyProfile((prev) => !prev)
  }
  const setCurrentUser = useSetRecoilState(loginState)
  const navigate = useNavigate()
  const [deleteMutation, { data, error }] = useMutation(DELETEUSER, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })

  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const clickDelete = async () => {
    if (userInfo.email !== email) {
      alert('정보가 일치하지 않습니다.')
    }
    await deleteMutation({
      variables: {
        email,
      },
    })
    if (data === undefined) {
      alert('정상적으로 탈퇴되었습니다.')
      setCurrentUser({
        __typename: '',
        nickname: '',
        email: '',
        role: '',
      })
      navigate('/')
    }
  }

  return (
    <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-black/70">
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md border bg-white">
        <p className="px-3 py-2">회원 탈퇴</p>
        <div className="border-b" />
        <div className="px-10 py-5 text-center text-gray-400">
          <p className="">회원 탈퇴시 모든 정보가 사라집니다.</p>
          <p>정말로 삭제를 원하시면 아래에 이메일 주소를 입력해주세요.</p>
          <input
            onChange={inputEmail}
            value={email}
            className="my-5 w-full rounded-md border bg-origin py-2 pl-3 focus:outline-none "
          />
        </div>
        <div className="flex justify-center space-x-4 py-3">
          <button
            className="rounded-md border bg-gray-600 px-5 py-1 text-white"
            onClick={clickClose}
          >
            닫기
          </button>
          <button
            onClick={clickDelete}
            className="rounded-md border bg-origin px-5 py-1 text-white"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  )
}
