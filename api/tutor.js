import { config } from '~/firebase/config'
import { initializeApp } from '@firebase/app'

import {
  getFirestore,
  doc,
  getDoc
} from 'firebase/firestore'

initializeApp(config)

const db = getFirestore()
const _rootCollection = 'tutor'

const getTutorProfile = async (tutorDoc) => {
  const docRef = doc(db, _rootCollection, tutorDoc)
  const res = await getDoc(docRef)
  const tutorProfile = res.data()

  return tutorProfile
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
  getTutorProfile,
  getApplyingTutors
}
