interface Props {
  logout: () => Promise<void>
}

export default function Menu({ logout }: Props) {
  return (
    <div className="absolute top-[64px] right-[20px] w-[170px] bg-origin flex flex-col space-y-4 items-start py-5 z-10 pl-3 rounded-md text-gray-200">
      <button>내활동</button>
      <button
        className=""
        onClick={logout}
      >
        로그아웃
      </button>
    </div>
  )
}
