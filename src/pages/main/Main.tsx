import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Posting from '../../components/pages/Main/Posting'
import { PostingType } from '../../common/interface'
import AddPost from '../../components/pages/Main/AddPost'

const GETPOSTING = gql`
  query AllPosting {
    AllPosting {
      id
      created
      title
      text
      img{
        id
        location
      }
      text
      tag{
        id
        tag
      }
      author {
        id
        nickname
      }
      comments {
        id
        text
        writer {
          nickname
        }
      }
    }
  }
`


export default function Main() {
  const [isPosting, setIsPosting] = useState<boolean>(false)

  const clickAddPost = () => {
    setIsPosting((prev) => !prev)
  }
  const { data, loading, refetch } = useQuery(GETPOSTING)

  useEffect(() => {
    if (isPosting) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isPosting])

  return (
    <div className="">
      <div className="flex flex-col items-center">
        {!loading &&
          data.AllPosting.map((posting: PostingType) => (
            <Posting key={posting.id} posting={posting} refetch={refetch} />
          ))}
      </div>
      <button
        onClick={clickAddPost}
        className="fixed bottom-5 right-[10%] flex h-12 w-12 items-center justify-center rounded-full bg-origin text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-9 w-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      {isPosting && <AddPost setIsPosting={setIsPosting} refetch={refetch} />}
    </div>
  )
}
