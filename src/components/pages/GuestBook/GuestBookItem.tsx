import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { loginState } from '../../../common/Atom'
import { GuestBookType } from '../../../common/interface'
import DeleteAndModifyBtn from '../DeleteAndModifyBtn'
import DeleteGuestBook from './DeleteGuestBook'
import ModifyGuestBook from './ModifyGuestBook'

interface Props {
  item: GuestBookType
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}

export default function GuestBookItem({ item, refetch }: Props) {
  const [isModify, setIsModify] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const currentUser = useRecoilValue(loginState)

  const clickModify = () => {
    setIsModify(true)
  }

  const clickDelete = () => {
    setIsDelete(true)
  }

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
            <DeleteAndModifyBtn
              clickModify={clickModify}
              clickDelete={clickDelete}
            />
          )}
        </div>
        <p className="overflow-y-auto text-gray-600">{item.text}</p>
      </div>
      {isModify && <ModifyGuestBook setIsModify={setIsModify} id={item.id} />}
      {isDelete && <DeleteGuestBook setIsDelete={setIsDelete} id={item.id} refetch={refetch} />}
    </div>
  )
}
