import { config } from '~/firebase/config'
import { initializeApp } from '@firebase/app'

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore'

initializeApp(config)

const db = getFirestore()
const _rootCollection = 'tutor'

// Check existence function
const isIncluded = (obj, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (obj.id === arr[i].id) {
      return true
    }
  }
  return false
}

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

const queryTutorsByGender = async (genderArr) => {
  const queryRef = collection(db, _rootCollection)
  const q = query(queryRef, where('gender', 'in', genderArr))

  const querySnapshot = await getDocs(q)
  const tutors = []

  querySnapshot.forEach((doc) => {
    tutors.push(doc.data())
  })
  return tutors
}

const queryTutorsByCurrentJob = async (currentJobArr) => {
  const queryRef = collection(db, _rootCollection)
  const q = query(queryRef, where('currentJob', 'in', currentJobArr))

  const querySnapshot = await getDocs(q)
  const tutors = []

  querySnapshot.forEach((doc) => {
    tutors.push(doc.data())
  })
  return tutors
}

const queryTutorsByAchievement = async (achievementArr) => {
  const queryRef = collection(db, _rootCollection)
  const q = query(
    queryRef,
    where('achievement', 'array-contains-any', achievementArr)
  )

  const querySnapshot = await getDocs(q)
  const tutors = []

  querySnapshot.forEach((doc) => {
    tutors.push(doc.data())
  })
  return tutors
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
    const tutorProfile = await getTutor(tutorDoc)
    applyingTutors.push(tutorProfile)
  }
  return applyingTutors
}

const queryTutors = async (queryObj) => {
  let result = []

  let tutorsByGender = []
  let tutorsByCurrentJob = []
  let tutorsByAchievement = []

  if (queryObj.gender.length) {
    tutorsByGender = await queryTutorsByGender(queryObj.gender)
  }
  if (queryObj.currentJob.length) {
    tutorsByCurrentJob = await queryTutorsByCurrentJob(queryObj.currentJob)
  }
  if (queryObj.achievement.length) {
    tutorsByAchievement = await queryTutorsByAchievement(queryObj.achievement)
  }

  // merge into 1 array and remove duplicates
  let tutors = [...tutorsByGender, ...tutorsByCurrentJob, ...tutorsByAchievement]
  tutors = [...new Map(tutors.map(item => [item['id'], item])).values()]

  // check tutor existence
  tutors.forEach((tutor) => {
    /*
    console.log('tutor name:', tutor.name)
    console.log('gender:', isIncluded(tutor, tutorsByGender))
    console.log('current job:', isIncluded(tutor, tutorsByCurrentJob))
    console.log('achievement:', isIncluded(tutor, tutorsByAchievement))
    console.log('')
    */
    if (
      isIncluded(tutor, tutorsByGender) &&
      isIncluded(tutor, tutorsByCurrentJob) &&
      isIncluded(tutor, tutorsByAchievement)
    ) {
      result.push(tutor)
    }
  })
  // console.log('result:', result)

  return result
}

export const tutorAPI = {
  getTutor,
  getAllTutors,
  getApplyingTutors,
  queryTutors
}
