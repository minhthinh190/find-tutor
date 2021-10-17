import { dbService } from "~/firebase/database"

export const state = () => ({
  list: null
})

export const mutations = {
  setList (state, list) {
    state.list = list
  }
}

export const actions = {
  sendBookingRequest (context, request) {
    const destination = {
      collection: 'user',
      docID: 'johndoe2@email.com',
      subCollection: 'bookings',
      subDocID: '3'
    }
    return dbService.writeDataToSubDoc(
      destination.collection,
      destination.docID,
      destination.subCollection,
      destination.subDocID,
      request
    )
  }
}
