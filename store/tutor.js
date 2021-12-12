import { tutorAPI } from '~/api/tutor'

export const state = () => ({
  perPage: 5,
  tutors: [],
  paginatedTutors: [],
  applyingTutors: [],
  tutorProfile: {}
})

export const getters = {
  paginatedTutors: (state) => {
    return state.paginatedTutors
  }
}

export const mutations = {
  setTutorProfile (state, tutorProfile) {
    state.tutorProfile = tutorProfile
  },

  setApplyingTutors (state, applyingTutors) {
    state.applyingTutors = applyingTutors
  },

  setPaginatedTutors (state, paginatedTutors) {
    state.paginatedTutors = paginatedTutors
  },

  setTutors (state, tutors) {
    state.tutors = tutors
  }
}

export const actions = {
  paginateTutorList ({ state, commit }) {
    const paginatedTutorList = state.tutors.reduce((resultArr, item, index) => {
      const pageIndex = Math.floor(index / state.perPage)
      if (!resultArr[pageIndex]) {
        resultArr[pageIndex] = []
      }
      resultArr[pageIndex].push(item)

      return resultArr
    }, [])
    commit('setPaginatedTutors', paginatedTutorList)
  },

  async queryTutors ({ commit }, queryObj) {
    const tutors = await tutorAPI.queryTutors(queryObj)
    commit('setTutors', tutors)
  },

  async getTutors ({ commit }) {
    const tutors = await tutorAPI.getAllTutors()
    commit('setTutors', tutors)
  },

  async getApplyingTutors ({ commit }, applyingTutorEmails) {
    const applyingTutors = await tutorAPI.getApplyingTutors(applyingTutorEmails)
    commit('setApplyingTutors', applyingTutors)
  },

  async getTutorProfile ({ commit }, tutorEmail) {
    const tutorProfile = await tutorAPI.getTutor(tutorEmail)
    commit('setTutorProfile', tutorProfile)
  }
}
