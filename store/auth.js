import { userService } from '~/firebase/user'

const userId = localStorage.getItem('uid')

export const state = () => ({
  user: userId ? userId : null
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
    return userService.signUserIn(email, password)
      .then(userCredential => {
        const { uid, email } = userCredential.user
        context.commit('setUser', { uid, email })
        return uid
      })
  },

  signUp (context, { email, password }) {
    return userService.signUserUp(email, password)
      .then(userCredential => {
        const { uid, email } = userCredential.user
        context.commit('setUser', { uid, email })
        return uid
      })
  },

  signOut (context) {
    return userService.signUserOut()
      .then(() => {
        context.commit('setUser', null)
      })
  }
}
