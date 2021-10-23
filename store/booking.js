export const state = () => ({
  list: null
})

export const getters = {
  numberOfBookings: (state) => {
    return state.list.length
  },

  bookingList: (state) => {
    return state.list
  }
}

export const mutations = {
  setList (state, list) {
    state.list = list
  }
}

export const actions = {
  getBookingList ({ commit }) {
    
  }
}
