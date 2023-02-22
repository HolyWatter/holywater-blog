import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useMutation,
} from '@apollo/client'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { loginState } from '../../../common/Atom'
import { CommentType } from '../../../common/interface'
import DeleteModal from '../../Modal/DeleteModal'
import ModifyModal from '../../Modal/ModifyModal'
import DeleteAndModifyBtn from '../DeleteAndModifyBtn'

interface Props {
  comment: CommentType
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}

const DELETE = gql`
  mutation deletePostingComment($id: Int!){
    deletePostingComment(id :$id){
      id
    }
  }
`
const Modify = gql`
  mutation modifyPostingComment($id:Int! $text:String!){
    modifyPostingComment(id :$id text:$text){
      id
      text
    }
  }
`

export default function PostingComments({ comment, refetch }: Props) {
  const currentUser = useRecoilValue(loginState)
  const [isDeleteComment, setIsDeleteComment] = useState<boolean>(false)
  const [isModifyComment, setIsModifyComment] = useState<boolean>(false)
  const [modifyText, setModifyText] = useState<string>("")

  const [deleteMutation] = useMutation(DELETE)
  const [modifyMutation] = useMutation(Modify)

  const clickDelete = () => {
    setIsDeleteComment((prev) => !prev)
  }
  const clickModify = () => {
    setIsModifyComment((prev) => !prev)
    setModifyText("")
  }

  const clickConfirmDelete = async () => {
    await deleteMutation({
      variables: { id: comment.id },
    })
    alert('삭제되었습니다.')
    refetch()
  }

  const clickConfirmModify = async () =>{
    await modifyMutation({
      variables :{
        id : comment.id,
        text : modifyText
      }
    })
    alert("수정되었습니다.")
  }

  return (
    <div key={comment.id} className="flex w-full space-x-3">
      <p className="break-keep font-semibold">{comment.writer.nickname}</p>
      <div className="flex w-full items-end justify-between">
        <p className="text-gray-700">{comment.text}</p>
        {comment.writer.nickname === currentUser?.nickname && (
          <DeleteAndModifyBtn
            clickModify={clickModify}
            clickDelete={clickDelete}
          />
        )}
      </div>
      {isDeleteComment && (
        <DeleteModal message="댓글"clickClose={clickDelete} clickConfirm={clickConfirmDelete} />
      )}
      {isModifyComment && 
        <ModifyModal value={modifyText} setFunction={setModifyText} message="댓글" clickClose={clickModify} clickConfirm={clickConfirmModify} />}
    </div>
  )
}
