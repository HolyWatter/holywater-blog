import { CommentType } from '../../common/interface'
interface Props {
  comment: CommentType
}
export default function DevelopComment({ comment }: Props) {
  return (
    <div className="border-b py-5">
      <p className="text-lg font-semibold text-gray-500">
        {comment.writer.nickname}
      </p>
      <p>{comment.text}</p>
    </div>
  )
}
