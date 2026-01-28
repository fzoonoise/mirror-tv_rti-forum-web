import { gql } from '@apollo/client'

export const MEMBER_FIELDS = gql`
  fragment MemberFields on Member {
    id
    firebaseId
    customId
    name
    nickname
    email
  }
`
