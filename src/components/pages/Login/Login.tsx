import {
  ApolloQueryResult,
  gql,
  LazyQueryExecFunction,
  OperationVariables,
  useMutation,
} from '@apollo/client'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { loginModal, signupModal } from '../../../common/Atom'
import LoginForm from './LoginForm'

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      acessToken
      loginUser {
        id
        nickname
      }
      message
    }
  }
`

interface Props {
  currentUser: LazyQueryExecFunction<any, OperationVariables>
}

export default function Login({ currentUser }: Props) {
  const setLoginModal = useSetRecoilState(loginModal)
  const setSignupModal = useSetRecoilState(signupModal)
  

  const [info, setInfo] = useState({
    email: '',
    password: '',
  })

  const [login, { error, data }] = useMutation(LOGIN)

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
    if (data?.login.message) {
      localStorage.setItem('token', data.login.acessToken)
      alert(data.login.message)
      setLoginModal((prev) => !prev)
      currentUser({
        context: {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
        fetchPolicy: "network-only",
      })
    }
  }, [error, data])


  const inputInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInfo({
      ...info,
      [name]: value,
    })
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login({ variables: info })
  }

  const closeModal = () => {
    setLoginModal((prev: boolean) => !prev)
  }

  const clickSignUp = () => {
    closeModal()
    setSignupModal(true)
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 h-screen w-full bg-black/70">
      <div className="absolute top-[50%] left-[50%] flex translate-y-[-50%] translate-x-[-50%] flex-col items-center rounded-sm border bg-white py-10 px-10">
        <button
          onClick={closeModal}
          className="absolute top-2 right-3 text-gray-600"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p className="py-5 text-3xl font-semibold">성수의 블로그 로그인</p>
        <p className="py-5 text-sm text-gray-500">
          회원가입 및 로그인하시면 간단한 댓글작성 및 방명록작성이 가능합니다
        </p>
        <LoginForm submitForm={submitForm} info={info} inputInfo={inputInfo} />
        <div className="flex items-center space-x-4">
          <p className="text-md">아직 회원이 아니신가요?</p>
          <button
            className="text-sm text-blue-500 underline"
            onClick={clickSignUp}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}
