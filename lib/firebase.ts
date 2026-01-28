import { type FirebaseApp, initializeApp } from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'

import { env } from './env'
let firebaseApp: FirebaseApp | undefined
let auth: Auth | undefined

export function getFirebaseApp(): FirebaseApp {
  if (!firebaseApp) {
    // Only initialize if Firebase config is provided
    if (
      env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    ) {
      const firebaseConfig = {
        apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
      }

      firebaseApp = initializeApp(firebaseConfig)
    } else {
      throw new Error(
        'Firebase configuration is missing. Please set NEXT_PUBLIC_FIREBASE_* environment variables.'
      )
    }
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
