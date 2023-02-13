import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

const UPLOADIMG = gql`
  mutation uploadTest($file: [Upload]!) {
    uploadTest(file: $file) {
      location
    }
  }
`

export default function ImaTest() {
  const [img, setImg] = useState<any>()
  const selectImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = Object.values(e.target.files as any)
    let arr: string[] = []
    console.log(image)
    image.map((item: any) => {
      const reader = new FileReader()
      reader.readAsDataURL(item)
      reader.onloadend = (finishedEvent) => {
        const { result } = finishedEvent.currentTarget as any
        arr.push(result)
        return arr
      }
      return arr
    })
    console.log(arr)
  }
  console.log(img)

  const [mutaionFn] = useMutation(UPLOADIMG)
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutaionFn({
      variables: {
        file: img,
      },
    })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input onChange={selectImg} type="file" multiple={true} />
        <button>제출</button>
      </form>
      {/* <img src={img} /> */}
    </div>
  )
}
