import { useRecoilValue } from 'recoil'
import { loginState } from '../../../common/Atom'
import { CommentType } from '../../../common/interface'
import DeleteAndModifyBtn from '../DeleteAndModifyBtn'

interface Props {
  comment: CommentType
}

export default function PostingComments({ comment }: Props) {
  const currentUser = useRecoilValue(loginState)
  return (
    <div key={comment.id} className="flex w-full space-x-3">
      <p className="break-keep font-semibold">{comment.writer.nickname}</p>
      <div className="flex w-full items-end justify-between">
        <p className="text-gray-700">{comment.text}</p>
        {comment.writer.nickname === currentUser?.nickname && (
          <DeleteAndModifyBtn />
        )}
      </div>
    </div>
  )
}
