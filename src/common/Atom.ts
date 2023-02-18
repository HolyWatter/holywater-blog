import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: {
    __typename: '', nickname: '', email: '', role: ''
  },
})

export const loginModal = atom({
  key: 'loginModal',
  default: false,
})

export const signupModal = atom({
  key: 'signupModal',
  default: false,
})
