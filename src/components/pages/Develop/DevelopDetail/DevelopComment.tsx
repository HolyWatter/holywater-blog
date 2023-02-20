import { useRecoilValue } from 'recoil'
import { loginState } from '../../../../common/Atom'
import { CommentType } from '../../../../common/interface'
import DeleteAndModifyBtn from '../../DeleteAndModifyBtn'

interface Props {
  comment: CommentType
}
export default function DevelopComment({ comment }: Props) {
  const currentUser = useRecoilValue(loginState)
  return (
    <div className="border-b py-5">
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-gray-500">
          {comment.writer.nickname}
        </p>
        {currentUser?.nickname === comment.writer.nickname && (
          <DeleteAndModifyBtn />
        )}
      </div>
      <p>{comment.text}</p>
    </div>
  )
}
