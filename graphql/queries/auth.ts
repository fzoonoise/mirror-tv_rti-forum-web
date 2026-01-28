import { gql } from '@apollo/client'

export const GET_AUTHENTICATED_MEMBER = gql`
  query AuthenticatedMember {
    authenticatedMember {
      id
      firebaseId
      customId
      name
      nickname
      email
    }
  }
`
