import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '~/firebase/config.js'

export const state = () => ({
  userCredential: null
})

export const getters = {
  userCredential: state => state.userCredential
}

export const mutations = {
  setUserCredential (state, data) {
    state.userCredential = data
  }
}

export const actions = {
  signIn (context, { email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        context.commit('setUserCredential', userCredential.user)
        console.log('Sign in successful!')
      })
      .catch(error => {
        console.log(error)
      })
  },

  signUp (context, { email, password }) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        context.commit('setUserCredential', userCredential.user)
        console.log('Sign up successful!')
      })
      .catch(error => {
        console.log(error)
      })
  }
}
