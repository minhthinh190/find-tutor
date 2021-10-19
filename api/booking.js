import { dbService } from "~/firebase/database"

const rootCollection = 'user'
const userDoc = 'johndoe2@email.com'
const collection = 'bookings'

const getBookingIdCount = async () => {
  const res = await dbService.getDataInDoc(rootCollection, userDoc)
  const bookingIdCount = res.data().bookingIdCount
  return bookingIdCount
}

const getNumberOfBookings = async () => {
  const res = await dbService.getDataInDoc(rootCollection, userDoc)
  const bookingCount = res.data().bookingCount
  return bookingCount
}

const updateNumberOfBookings = async () => {
  const numberOfBookings = await getNumberOfBookings()

  dbService.updateDataInDoc(rootCollection, userDoc, {
    bookingCount: numberOfBookings + 1
  })
}

const updateBookingIdCount = async () => {
  const bookingIdCount = await getBookingIdCount()

  dbService.updateDataInDoc(rootCollection, userDoc, {
    bookingIdCount: bookingIdCount + 1
  })
}

const createNewBooking = async (bookingData) => {
  let currentBookingId = await getBookingIdCount()
  currentBookingId += 1

  return dbService.addDataToSubDoc(
    rootCollection,
    userDoc,
    collection,
    currentBookingId.toString(),
    bookingData
  )
    .then(async () => {
      await updateBookingIdCount()
      await updateNumberOfBookings()
    })
}

export const bookingAPI = {
  getNumberOfBookings,
  createNewBooking
}
