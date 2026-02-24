import { type FirebaseApp, initializeApp } from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@/config/environment-variables'

let firebaseApp: FirebaseApp | undefined
let auth: Auth | undefined

export function getFirebaseApp(): FirebaseApp {
  if (!firebaseApp) {
    if (!FIREBASE_API_KEY || !FIREBASE_PROJECT_ID) {
      throw new Error(
        'Firebase configuration is missing. Please set NEXT_PUBLIC_FIREBASE_* environment variables.'
      )
    }

    firebaseApp = initializeApp({
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
      appId: FIREBASE_APP_ID,
    })
  }

  return firebaseApp
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    const app = getFirebaseApp()
    auth = getAuth(app)
  }

  return auth
}
