import { Link } from 'react-router-dom'

interface Props {
  logout: () => Promise<void>
  setIsMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Menu({ logout, setIsMenu }: Props) {
  return (
    <div className="absolute top-[64px] right-[20px] z-10 flex w-[170px] flex-col items-start space-y-4 rounded-md bg-origin py-5 pl-3 text-gray-200">
      <Link to="/mypage" onClick={() => setIsMenu((prev) => !prev)}>
        내활동
      </Link>
      <button className="" onClick={logout}>
        로그아웃
      </button>
    </div>
  )
}
