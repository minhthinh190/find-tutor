import { auth } from '~/firebase/config.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export const state = () => ({
  authUser: null
})

export const getters = {
  authUser: state => state.authUser
}

export const mutations = {
  setAuthUser (state, authUser) {
    state.authUser = authUser
  }
}

export const actions = {
  signIn (context, { email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const { uid, email } = userCredential.user
        context.commit('setAuthUser', { uid, email })
        $nuxt.$router.push({ name: 'index' })
      })
      .catch(err => {
        console.log('Sign in error:', err)
      })
  },

  signUp (context, { email, password }) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        $nuxt.$router.push({ name: 'signin' })
      })
      .catch(err => {
        console.log('Sign up error:', err)
      })
  },

  signOut (context) {
    signOut(auth)
      .then(() => {
        context.commit('setAuthUser', null)
        $nuxt.$router.push({ name: 'signin' })
      })
      .catch(err => {
        console.log('Sign out error:', err)
      })
  }
}
