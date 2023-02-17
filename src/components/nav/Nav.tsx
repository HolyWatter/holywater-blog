import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loginModal, loginState, signupModal } from '../../common/Atom'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'

const CURRENTUSER = gql`
  query currentUser {
    currentUser {
      nickname
      email
      role
    }
  }
`

export default function Nav() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const isLoginModal = useRecoilValue(loginModal)
  const isSignupModal = useRecoilValue(signupModal)
  const current = useRecoilValue(loginState)
  const setCurrentUser = useSetRecoilState(loginState)
  const setLoginModal = useSetRecoilState(loginModal)
  const clickLogin = () => {
    setLoginModal(true)
  }

  const [currentUser, { data, loading, refetch }] = useLazyQuery(CURRENTUSER)

  useEffect(() => {
    if (isLoginModal || isSignupModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoginModal, isSignupModal])

  useEffect(() => {
    setCurrentUser(data?.currentUser)
  }, [data])

  const logout = async () => {
    setIsLogin(false)
    await localStorage.removeItem('token')
    alert('로그아웃되었습니다.')
    await currentUser({
      context: {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
      fetchPolicy: 'network-only',
    })
    setCurrentUser({
      __typename: '',
      nickname: '',
      email: '',
      role: '',
    })
  }

  return (
    <div className="fixed z-10 flex h-16 w-full items-center justify-between border-b bg-origin px-5 shadow-md">
      <Link to="/" className="text-2xl font-normal text-gray-300">
        성수의 블로그
      </Link>
      {!isLogin ? (
        <button
          onClick={clickLogin}
          className="rounded-full bg-white px-2 py-1 text-origin"
        >
          로그인
        </button>
      ) : (
        <button
          className="rounded-full bg-white px-2 py-1 text-origin"
          onClick={logout}
        >
          로그아웃
        </button>
      )}
      {isLoginModal && (
        <Login currentUser={currentUser} setIsLogin={setIsLogin} />
      )}
      {isSignupModal && <SignUp />}
    </div>
  )
}
