import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore'

const db = getFirestore()

const writeDataToDoc = (collection, docID, data) => {
  const docRef = doc(db, collection, docID)
  return setDoc(docRef, data)
}

const writeDataToSubDoc = (collection, docID, subCollection, subDocID, data) => {
  const docRef = doc(db, collection, docID, subCollection, subDocID)
  return setDoc(docRef, data)
}

const fetchData = (collection, docID) => {
  return getDoc(doc(db, collection, docID))
}

export const dbService = {
  writeDataToDoc,
  writeDataToSubDoc,
  fetchData
}
