import { bookingAPI } from '~/api/booking'

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
  async getBookingList ({ commit, rootState }) {
    const userEmail = rootState.user.email
    const bookingList = await bookingAPI.getBookingList(userEmail)
    commit('setList', bookingList)
  },

  async findBooking ({ commit, rootState }, { property, value }) {
    const userEmail = rootState.user.email
    const bookingList = await bookingAPI.queryBookingByProperty(userEmail, property, value)
    commit('setList', bookingList)
  }
}
