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

  useEffect(()=>{
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
      {currentUser?.role=== 'creator' && (
        <button className="fixed bottom-10 right-10 z-10" onClick={clickAddPost}> asd</button>
      )}
    </div>
  )
}
