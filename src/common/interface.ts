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
  tag: {
    id: number
    tag: string
  }[]
  text: string
  img: {
    id: number
    location: string
  }[]
  comments: CommentType[]
}

export interface CommentType {
  id: number
  text: string
  writer: {
    nickname: string
  }
}


export interface Contents{
  title : string
  text : string
}