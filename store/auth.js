import { userService } from '~/firebase/user'

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
    userService.signUserIn(email, password)
      .then(userCredential => {
        const { uid, email } = userCredential.user
        context.commit('setUser', { uid, email })
      })
      .then(() => {
        $nuxt.$router.push({ name: 'index' })
      })
      .catch(err => {
        console.log('Sign in error:', err)
      })
  },

  signUp (context, { email, password }) {
    userService.signUserUp(email, password)
      .then(userCredential => {
        const { uid, email } = userCredential.user
        context.commit('setUser', { uid, email })
      })
      .then(() => {
        $nuxt.$router.push({ name: 'index' })
      })
      .catch(err => {
        console.log('Sign up error:', err)
      })
  },

  signOut (context) {
    userService.signUserOut()
      .then(() => {
        context.commit('setUser', null)
      })
      .then(() => {
        $nuxt.$router.push({ name: 'signin' })
      })
      .catch(err => {
        console.log('Sign out error:', err)
      })
  }
}
