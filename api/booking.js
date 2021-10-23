import { dbService } from "~/firebase/database"

const _rootCollection = 'user'
const _collection = 'bookings'

const createBookingCounter = async (userDoc) => {
  await dbService.addDataToDoc(_rootCollection, userDoc, {
    bookingCount: 0,
    bookingIdCount: 0
  })
}

const createNewBooking = async (userDoc, bookingData) => {
  let currentBookingId = await getBookingIdCount(userDoc)
  currentBookingId++

  return dbService.addDataToSubDoc(
    _rootCollection,
    userDoc,
    _collection,
    currentBookingId.toString(),
    bookingData
  )
    .then(async () => {
      await updateBookingIdCount(userDoc)
      await updateNumberOfBookings(userDoc)
    })
},

///
const getBookingList = async (userDoc) => {}
///

const getBookingIdCount = async (userDoc) => {
  const res = await dbService.getDataInDoc(_rootCollection, userDoc)
  const bookingIdCount = res.data().bookingIdCount
  return bookingIdCount
}

const getNumberOfBookings = async (userDoc) => {
  const res = await dbService.getDataInDoc(_rootCollection, userDoc)
  const bookingCount = res.data().bookingCount
  return bookingCount
}

const updateNumberOfBookings = async (userDoc) => {
  const numberOfBookings = await getNumberOfBookings(userDoc)

  dbService.updateDataInDoc(_rootCollection, userDoc, {
    bookingCount: numberOfBookings + 1
  })
}

const updateBookingIdCount = async (userDoc) => {
  const bookingIdCount = await getBookingIdCount(userDoc)

  dbService.updateDataInDoc(_rootCollection, userDoc, {
    bookingIdCount: bookingIdCount + 1
  })
}

export const bookingAPI = {
  createBookingCounter,
  createNewBooking,
  getNumberOfBookings
}
