"use client";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

/** Sign in - Sign out Functions */
export const googleSignIn = async () => {
  let user = undefined;
  await signInWithPopup(auth, provider)
    .then((result) => {
      if (result.user.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
        user = result.user;
      }
    })
    .catch(() => {});
  return !!user;
};

export const signInWithCredential = async (email, password) => {
  let success = false;
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      success = true;
    })
    .catch((e) => {
      console.log(e.message);
    });
  return success;
};

export const googleSignOut = async () => {
  await signOut(auth)
    .then(() => {})
    .catch((e) => {
      console.log(e);
    });
};
