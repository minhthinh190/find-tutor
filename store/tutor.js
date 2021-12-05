import { tutorAPI } from '~/api/tutor'

export const state = () => ({
  applyingTutors: [],
  tutorProfile: null
})

export const getters = {}

export const mutations = {
  setTutorProfile (state, tutorProfile) {
    state.tutorProfile = tutorProfile
  },

  setApplyingTutors (state, applyingTutors) {
    state.applyingTutors = applyingTutors
  }
}

export const actions = {
  async getApplyingTutors ({ commit }, applyingTutorEmails) {
    const applyingTutors = await tutorAPI.getApplyingTutors(applyingTutorEmails)
    commit('setApplyingTutors', applyingTutors)
  },

  async getTutorProfile ({ commit }, tutorEmail) {
    const tutorProfile = await tutorAPI.getTutorProfile(tutorEmail)
    commit('setTutorProfile', tutorProfile)
  }
}
