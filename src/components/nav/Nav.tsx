import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loginModal, signupModal } from '../../common/Atom'
import Login from '../auth/Login'
import SignUp from '../auth/SignUp'

export default function Nav() {
  const isLoginModal = useRecoilValue(loginModal)
  const isSignupModal = useRecoilValue(signupModal)
  const setLoginModal = useSetRecoilState(loginModal)
  const clickLogin = () => {
    setLoginModal(true)
  }

  useEffect(() => {
    if (isLoginModal || isSignupModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoginModal, isSignupModal])

  return (
    <div className="fixed flex h-16 w-full items-center justify-between border-b bg-origin px-5 shadow-md">
      <Link to="/" className="text-2xl font-normal text-gray-300">
        성수의 블로그
      </Link>
      <button
        onClick={clickLogin}
        className="rounded-full bg-white px-2 py-1 text-origin"
      >
        로그인
      </button>
      {isLoginModal && <Login />}
      {isSignupModal && <SignUp />}
    </div>
  )
}
