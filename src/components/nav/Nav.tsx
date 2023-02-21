import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loginModal, loginState, signupModal } from '../../common/Atom'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import Menu from './Menu'

const CURRENTUSER = gql`
  query currentUser {
    currentUser {
      nickname
      email
      role
      thumbnail_url
    }
  }
`

export default function Nav() {
  const [isMenu, setIsMenu] = useState<boolean>(false)
  const isLoginModal = useRecoilValue(loginModal)
  const isSignupModal = useRecoilValue(signupModal)
  const current = useRecoilValue(loginState)
  const setCurrentUser = useSetRecoilState(loginState)
  const setLoginModal = useSetRecoilState(loginModal)
  const clickLogin = () => {
    setLoginModal(true)
  }

  const [currentUser, { data, refetch, error }] = useLazyQuery(CURRENTUSER, {
    fetchPolicy: 'network-only',
    context : {
      headers : {
        Authorization : localStorage.getItem('token')
      }
    }
  })

  useEffect(() => {
    if(localStorage.getItem('token')){
      if(error){
        localStorage.removeItem('token')
        setCurrentUser({
          __typename: '',
          nickname: '',
          email: '',
          role: '',
        })
      }
      setCurrentUser(data?.currentUser)
      refetch()
    }
    
      
  }, [data, error])


  const clickProfile = () => {
    setIsMenu((prev) => !prev)
  }

  const logout = async () => {
    localStorage.removeItem('token')
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
    setIsMenu(false)
  }

  return (
    <div>
      <div className="fixed z-20 flex h-16 w-full items-center justify-between border-b bg-origin px-5 shadow-md">
        <Link to="/" className="text-2xl font-normal text-gray-300">
          성수의 블로그
        </Link>
        {current?.email === '' ? (
          <button
            onClick={clickLogin}
            className="rounded-full bg-white px-2 py-1 text-origin"
          >
            로그인
          </button>
        ) : (
          <button
            className="flex items-center space-x-2"
            onClick={clickProfile}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-400">
              <img
                className="h-11 w-11 rounded-full bg-white"
                alt=""
                src={data?.currentUser?.thumbnail_url}
              />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        )}
        {isLoginModal && <Login currentUser={currentUser} />}
        {isSignupModal && <SignUp />}
      </div>
      {isMenu && <Menu logout={logout} setIsMenu={setIsMenu} />}
    </div>
  )
}
