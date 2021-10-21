import { authAPI } from '~/api/auth'

const userId = localStorage.getItem('uid')

export const state = () => ({
  user: {
    id: userId ? userId : null,
    email: null
  }
})

export const getters = {
  userId: (state) => {
    return state.user.id
  },

  userEmail: (state) => {
    return state.user.email
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  signIn ({ commit }, { email, password }) {
    return authAPI.signUserIn(email, password)
      .then(({ uid, email}) => {
        commit('setUser', { id: uid, email })
      })
  },

  signUp ({ commit }, { email, password }) {
    return authAPI.signUserUp(email, password)
      .then(({ uid, email }) => {
        commit('setUser', { id: uid, email })
      })
  },

  signOut ({ commit }) {
    return authAPI.signUserOut()
      .then(() => {
        commit('setUser', null)
      })
  }
}
