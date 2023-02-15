import { PostingType } from '../../../common/interface'
import { Link } from 'react-router-dom'
interface Props {
  posting: PostingType
}

export default function MarkdownPosting({ posting }: Props) {
  const date = new Date(posting.created)
  const timeFormat = new Intl.DateTimeFormat('KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)

  return (
    <Link to={`/develop/${posting.id}`} key={posting.id}>
      <div className="mt-10 space-y-5 border-b-2 py-3 px-4">
        <p className="text-3xl font-normal text-gray-700">{posting.title}</p>
        <div className="flex justify-between sm-m:flex-col">
          <div className="flex items-center space-x-3">
            <p className="text-lg">{posting.author.nickname}</p>
            <p className="text-gray-500">{timeFormat}</p>
          </div>
          <p>{posting.comments.length} 개의 댓글</p>
        </div>
      </div>
    </Link>
  )
}
