import { config } from '~/firebase/config'
import { initializeApp } from '@firebase/app'

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs
} from 'firebase/firestore'

initializeApp(config)

const db = getFirestore()
const _rootCollection = 'tutor'

// Private API
const getAllTutorDocs = async () => {
  const tutorDocs = []
  const querySnapshot = await getDocs(
    collection(db, _rootCollection)
  )
  querySnapshot.forEach((doc) => {
    if (doc.id !== 'management') {
      tutorDocs.push(doc.id)
    }
  })
  return tutorDocs
}

// Public API
const getTutor = async (tutorDoc) => {
  const docRef = doc(db, _rootCollection, tutorDoc)
  const res = await getDoc(docRef)
  const tutor = res.data()

  return tutor
}

const getAllTutors = async () => {
  let allTutors = []
  const allTutorDocs = await getAllTutorDocs()

  for (const tutorDoc of allTutorDocs) {
    const tutor = await getTutor(tutorDoc)
    allTutors = [...allTutors, tutor]
  }
  return allTutors
}

const getApplyingTutors = async (tutorDocs) => {
  let applyingTutors = []

  for (const tutorDoc of tutorDocs) {
    const tutorProfile = await getTutorProfile(tutorDoc)
    applyingTutors.push(tutorProfile)
  }
  return applyingTutors
}

export const tutorAPI = {
  getTutor,
  getAllTutors,
  getApplyingTutors
}
