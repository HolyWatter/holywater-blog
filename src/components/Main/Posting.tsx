import { PostingType } from '../../common/interface'
import Markdown from '../Markdown/Markdow'

interface Props {
  posting: PostingType
}

export default function Posting({ posting }: Props) {
  const date = new Date(posting.created)
  const timeFormat = new Intl.DateTimeFormat('KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
  return (
    <div className="my-5 w-[400px] rounded-md border">
      <div className="flex flex-col justify-center space-y-3 py-2 pl-3">
        <p>{posting.author.nickname}</p>
        <p className="text-xs text-gray-500">{timeFormat}</p>
      </div>
      <div className="border-b"></div>
      <div className="py-3 pl-3">
        <div className="flex items-center space-x-5">
          <p>{posting.author.nickname}</p>
          <p className="text-[16px]">{posting.title}</p>
        </div>
        <p>{posting.text}</p>
      </div>
    </div>
  )
}
