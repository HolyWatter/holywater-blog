export interface SignUpInfo {
  email: string
  password: string
  nickname: string
  user_name: string
}

export interface PostingType {
  author: {
    id: number
    nickname: string
  }
  created: string
  id: number
  title: string
  text: string
  img: string[] | null
  comments: CommentType[]
}

export interface CommentType {
  id: number
  text: string
  writer: {
    nickname: string
  }
}
