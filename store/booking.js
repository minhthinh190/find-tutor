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
      subDocID: '9'
    }
    return dbService.addDataToSubDoc(
      destination.collection,
      destination.docID,
      destination.subCollection,
      destination.subDocID,
      request
    )
  },

  async updateBookingListLength () {
    let bookingCount = null

    const destination = {
      collection: 'user',
      docID: 'johndoe2@email.com'
    }
    await dbService.getDataInDoc(destination.collection, destination.docID)
      .then((docSnap) => {
        bookingCount = docSnap.data().bookingCount
      })
      .catch((err) => {
        console.log(err)
      })

    dbService.updateDataInDoc(
      destination.collection,
      destination.docID,
      { bookingCount: bookingCount + 1 }
    )
  }
}
