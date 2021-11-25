import { initializeApp } from 'firebase/app'
import { config } from '~/firebase/config'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore'

initializeApp(config)

const db = getFirestore()
const _rootCollection = 'user'
const _collection = 'bookings'

// Private API
const getAppRequestIdCount = async () => {
  const docRef = doc(db, _rootCollection, 'management')
  const res = await getDoc(docRef)
  const appRequestIdCount = res.data().requestIdCounter

  return appRequestIdCount
}

const increaseAppRequestIdCount = async () => {
  const appRequestIdCount = await getAppRequestIdCount()
  const docRef = doc(db, _rootCollection, 'management')

  updateDoc(docRef, {
    requestIdCounter: appRequestIdCount + 1
  })
}

const getBookingIdCount = async (userDoc) => {
  const docRef = doc(db, _rootCollection, userDoc)
  const res = await getDoc(docRef)
  const bookingIdCount = res.data().bookingIdCount

  return bookingIdCount
}

const updateNumberOfBookings = async (userDoc) => {
  const numberOfBookings = await getNumberOfBookings(userDoc)
  const docRef = doc(db, _rootCollection, userDoc)

  updateDoc(docRef, {
    bookingCount: numberOfBookings + 1
  })
}

const updateBookingIdCount = async (userDoc) => {
  const bookingIdCount = await getBookingIdCount(userDoc)
  const docRef = doc(db, _rootCollection, userDoc)

  updateDoc(docRef, {
    bookingIdCount: bookingIdCount + 1
  })
}

// Public API
const createBookingCounter = async (userDoc) => {
  const docRef = doc(db, _rootCollection, userDoc)
  await setDoc(docRef, {
    bookingCount: 0,
    bookingIdCount: 0
  })
}

const createNewBooking = async (userDoc, bookingData) => {
  const appWideId = await getAppRequestIdCount()
  const currentBookingId = await getBookingIdCount(userDoc)
  const newBookingId = currentBookingId + 1

  const docRef = doc(db, _rootCollection, userDoc, _collection, newBookingId.toString())

  return setDoc(docRef, { id: appWideId + 1, ...bookingData })
    .then(async () => {
      await updateBookingIdCount(userDoc)
      await updateNumberOfBookings(userDoc)
      await increaseAppRequestIdCount()
    })
}

const getBookingList = async (userDoc) => {
  const querySnapshot = await getDocs(
    collection(db, _rootCollection, userDoc, _collection)
  )
  const bookingList = []

  querySnapshot.forEach((doc) => {
    bookingList.push(doc.data())
  })
  return bookingList
}

const getNumberOfBookings = async (userDoc) => {
  const docRef = doc(db, _rootCollection, userDoc)
  const res = await getDoc(docRef)
  const bookingCount = res.data().bookingCount

  return bookingCount
}

const queryBookingByProperty = async (userDoc, property, value) => {
  const queryRef = collection(db, _rootCollection, userDoc, _collection)
  const q = query(queryRef, where(property, '==', value))

  const querySnapshot = await getDocs(q)
  const bookingList = []

  querySnapshot.forEach((doc) => {
    bookingList.push(doc.data())
  })
  return bookingList
}

export const bookingAPI = {
  createBookingCounter,
  createNewBooking,
  getBookingList,
  getNumberOfBookings,
  queryBookingByProperty
}
