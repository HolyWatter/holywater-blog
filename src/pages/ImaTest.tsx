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
  const [url, setUrl] = useState<any>()

  const selectImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = Object.values(e.target.files as any)
    let file
    let newArr: any = []
    console.log(fileArr)
    for (let i in fileArr) {
      file = fileArr[i]
      const reader = new FileReader()
      reader.readAsDataURL(file as any)
      reader.onloadend = (finishedEvent) => {
      const { currentTarget } = finishedEvent
        newArr[i] = (currentTarget as any).result
        setImg([ ...newArr])
      }
    }

  }

  console.log(img)

  const [mutaionFn] = useMutation(UPLOADIMG, {
    context: { heaers: { 'keep-alive': 'true' } },
  })
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
