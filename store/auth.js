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
    userService.signUserIn(email, password)
      .then(userCredential => {
        const { uid, email } = userCredential.user
        context.commit('setUser', { uid, email })
        return uid
      })
      .then(uid => {
        localStorage.setItem('uid', uid)
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
        return uid
      })
      .then(uid => {
        localStorage.setItem('uid', uid)
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
        localStorage.removeItem('uid')
        $nuxt.$router.push({ name: 'signin' })
      })
      .catch(err => {
        console.log('Sign out error:', err)
      })
  }
}
