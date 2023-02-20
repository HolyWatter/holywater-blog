import { useRecoilValue } from 'recoil'
import { loginState } from '../../../common/Atom'
import { GuestBookType } from '../../../common/interface'
import DeleteAndModifyBtn from '../DeleteAndModifyBtn'

interface Props {
  item: GuestBookType
}

export default function GuestBookItem({ item }: Props) {
  const currentUser = useRecoilValue(loginState)
  return (
    <div className="mt-7 flex h-[180px] rounded-md border">
      <img
        className="h-[180px] w-[150px] rounded-md"
        alt="user_profile"
        src={item.writer.thumbnail_url}
      />
      <div className="flex w-full flex-col px-2 pl-3 pt-3 font-semibold text-gray-800">
        <div className="flex w-full justify-between">
          <p>{item.writer.nickname}</p>
          {item.writer.nickname === currentUser?.nickname && (
            <DeleteAndModifyBtn />
          )}
        </div>
        <p className="overflow-y-auto text-gray-600">{item.text}</p>
      </div>
    </div>
  )
}
