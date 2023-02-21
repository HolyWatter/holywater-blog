import { ApolloQueryResult, gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { loginState } from '../../../../common/Atom'
import { CommentType } from '../../../../common/interface'
import DeleteAndModifyBtn from '../../DeleteAndModifyBtn'
import DeleteModal from '../../../Modal/DeleteModal'
import ModifyModal from '../../../Modal/ModifyModal'

interface Props {
  comment: CommentType
  refetch: (
    variables?:
      | Partial<{
          id: number
        }>
      | undefined
  ) => Promise<ApolloQueryResult<any>>
}

const DELETE = gql`
  mutation deleteMarkdownComment($id: Int!) {
    deleteMarkdownComment(id: $id) {
      id
    }
  }
`
const MODIFY = gql`
  mutation modifyMarkdownComment($id: Int!, $text: String!) {
    modifyMarkdownComment(id: $id, text: $text) {
      id
      text
    }
  }
`

export default function DevelopComment({ comment, refetch }: Props) {
  const [isDeleteComment, setIsDeleteComment] = useState<boolean>(false)
  const [isModify, setIsModify] = useState<boolean>(false)
  const [modifyText, setModifyText] = useState<string>('')
  const currentUser = useRecoilValue(loginState)
  const [deleteMutation, deleteRes] = useMutation(DELETE, {
    context: {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  })
  const [modifyMutation, modifyRes] = useMutation(MODIFY, {
    context: {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  })
  const clickDelete = () => {
    setIsDeleteComment((prev) => !prev)
  }
  const clickModify = () => {
    setIsModify((prev) => !prev)
    setModifyText("")
  }

  useEffect(() => {
    if (deleteRes.data) {
      alert('댓글이 삭제되었습니다.')
      refetch()
    }
  }, [deleteRes])

  const clickDeleteConfirm = async () => {
    await deleteMutation({
      variables: {
        id: comment.id,
      },
    })
    clickDelete()
  }
  const clickModifyConfirm = async () => {
    await modifyMutation({
      variables: {
        id: comment.id,
        text: modifyText,
      },
    })
    clickModify();
    alert("수정되었습니다.")
  }

  return (
    <div className="border-b py-5">
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-gray-500">
          {comment.writer.nickname}
        </p>
        {currentUser?.nickname === comment.writer.nickname && (
          <DeleteAndModifyBtn
            clickModify={clickModify}
            clickDelete={clickDelete}
          />
        )}
      </div>
      <p>{comment.text}</p>
      {isDeleteComment && (
        <DeleteModal
          message="댓글"
          clickClose={clickDelete}
          clickConfirm={clickDeleteConfirm}
        />
      )}
      {isModify && <ModifyModal value={modifyText} setFunction={setModifyText} message="댓글" clickClose={clickModify} clickConfirm={clickModifyConfirm}/>}
    </div>
  )
}
