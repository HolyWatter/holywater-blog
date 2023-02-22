import { gql, useMutation } from '@apollo/client'


export function reAuth() {
  fetch('http://localhost:4000/reAuth', { method: 'POST' })
}
