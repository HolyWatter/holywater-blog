import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useMutation,
} from '@apollo/client'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { loginState } from '../../../common/Atom'
import { GuestBookType } from '../../../common/interface'
import DeleteAndModifyBtn from '../DeleteAndModifyBtn'
import DeleteModal from '../../Modal/DeleteModal'
import ModifyModal from '../../Modal/ModifyModal'

interface Props {
  item: GuestBookType
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}
const DELETE = gql`
  mutation deleteGueshBook($id: Int!) {
    deleteGuestBook(id: $id) {
      id
      text
    }
  }
`

const MODIFY = gql`
  mutation modifyGueshBook($id: Int!, $text: String!) {
    modifyGuestBook(id: $id, text: $text) {
      id
      text
    }
  }
`

export default function GuestBookItem({ item, refetch }: Props) {
  const [isModify, setIsModify] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [modifyText, setModifyText] = useState<string>('')
  const currentUser = useRecoilValue(loginState)
  const [deleteMutation, deleteRes] = useMutation(DELETE, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })
  const [modifyMutation, modifyRes] = useMutation(MODIFY, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })

  useEffect(() => {
    if (deleteRes.data) {
      alert('방명록이 삭제되었습니다.')
      refetch()
    }
  }, [deleteRes])

  const clickModify = () => {
    setIsModify((prev) => !prev)
    setModifyText("")
  }

  const clickDelete = () => {
    setIsDelete((prev) => !prev)
  }

  const confirmDelete = async () => {
    deleteMutation({
      variables: {
        id: item.id,
      },
    })
    clickDelete()
  }

  const confirmModify = async () => {
    modifyMutation({
      variables: {
        id: item.id,
        text: modifyText,
      },
    })
    alert("수정되었습니다.")
    clickModify();
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
      {isModify && <ModifyModal value={modifyText} setFunction={setModifyText} clickClose={clickModify} clickConfirm={confirmModify} message="방명록" />}
      {isDelete && (
        <DeleteModal
          clickClose={clickDelete}
          clickConfirm={confirmDelete}
          message="방명록"
        />
      )}
    </div>
  )
}
