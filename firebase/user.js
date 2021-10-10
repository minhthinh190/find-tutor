import { auth } from '~/firebase/config.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

const signUserIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

const signUserUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

const signUserOut = () => {
  return signOut(auth)
}

export const userService = {
  signUserIn,
  signUserUp,
  signUserOut
}
