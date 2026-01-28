import { gql } from '@apollo/client'

export const AUTHENTICATE_MEMBER_WITH_FIREBASE = gql`
  mutation AuthenticateMemberWithFirebase(
    $data: AuthenticateMemberWithFirebaseInput!
  ) {
    authenticateMemberWithFirebase(data: $data) {
      sessionToken
      expiresAt
      member {
        id
        firebaseId
        customId
        name
        nickname
        email
      }
    }
  }
`
