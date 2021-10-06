import { auth } from '~/firebase/config.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export const state = () => ({
  user: null
})

export const getters = {
  user: state => state.user
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  signIn (context, { email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const { uid, email } = userCredential.user
        context.commit('setUser', { uid, email })
        $nuxt.$router.push({ name: 'index' })
      })
      .catch(err => {
        console.log('Sign in error:', err)
      })
  },

  signUp (context, { email, password }) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const { uid, email } = userCredential.user
        context.commit('setUser', { uid, email })
        $nuxt.$router.push({ name: 'index' })
      })
      .catch(err => {
        console.log('Sign up error:', err)
      })
  },

  signOut (context) {
    signOut(auth)
      .then(() => {
        context.commit('setUser', null)
        $nuxt.$router.push({ name: 'signin' })
      })
      .catch(err => {
        console.log('Sign out error:', err)
      })
  }
}
