import { gql } from '@apollo/client'

export const CURRENTUSER = gql`
  query currentUser {
    currentUser {
      email
      nickname
      role
    }
  }
`
