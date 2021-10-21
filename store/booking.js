export const state = () => ({
  list: null
})

export const getters = {
  numberOfBookings: (state) => {
    return state.list.length
  } 
}

export const mutations = {
  setList (state, list) {
    state.list = list
  }
}

export const actions = {}
