import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Posting from '../../components/pages/Main/Posting'
import { PostingType } from '../../common/interface'
import AddPost from '../../components/pages/Main/AddPost'
import { useRecoilValue } from 'recoil'
import { loginState } from '../../common/Atom'

const GETPOSTING = gql`
  query AllPosting {
    AllPosting {
      id
      created
      title
      text
      img {
        id
        location
      }
      text
      tag {
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
  const currentUser = useRecoilValue(loginState)

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

  useEffect(() => {
    refetch()
  }, [data])

  return (
    <div className="">
      <div className="flex flex-col items-center">
        {!loading &&
          data.AllPosting.map((posting: PostingType) => (
            <Posting key={posting.id} posting={posting} refetch={refetch} />
          ))}
      </div>
      {isPosting && <AddPost setIsPosting={setIsPosting} refetch={refetch} />}
      {currentUser?.role === 'creator' && (
        <button
          className="fixed bottom-10 right-[10%] z-10 flex h-12 w-12 items-center justify-center rounded-full bg-origin"
          onClick={clickAddPost}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
