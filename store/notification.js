export const state = () => ({
  message: null,
  color: null,
  isShowed: false
})

export const mutations = {
  setNotification (state, data) {
    state.message = data.message
    state.color = data.color
    state.isShowed = true
  },

  removeNotification (state) {
    state.isShowed = false
  }
}

export const actions = {
  showNotification (context, data) {
    context.commit('setNotification', data)
  },

  hideNotification (context) {
    context.commit('removeNotification')
  }
}
