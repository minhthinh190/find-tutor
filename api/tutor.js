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
  if (!arr.length) {
    return true
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (obj.id === arr[i].id) {
        return true
      }
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

const queryTutorsById = async (tutorId) => {
  const queryRef = collection(db, _rootCollection)
  const q = query(
    queryRef,
    where('id', '==', parseInt(tutorId))
  )

  const querySnapshot = await getDocs(q)
  const tutors = []

  querySnapshot.forEach((doc) => {
    tutors.push(doc.data())
  })
  return tutors
}

const queryTutorsByName = async (tutorName) => {
  const queryRef = collection(db, _rootCollection)
  const q = query(
    queryRef,
    where('name', '>=', tutorName),
    where('name', '<=', tutorName + '\uf8ff')
  )

  const querySnapshot = await getDocs(q)
  const tutors = []

  querySnapshot.forEach((doc) => {
    tutors.push(doc.data())
  })
  return tutors
}

const queryTutorsBySubject = async (subjectData) => {
  let subject = subjectData.toLowerCase()
  let tutors = []
  const queryRef = collection(db, _rootCollection)

  if (subject === 'tất cả') {
    tutors = await getAllTutors()
  } else {
    const q = query(queryRef, where('subjects', 'array-contains-any', [subject]))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      tutors.push(doc.data())
    })
  }
  return tutors
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
  console.log('achievement arr:', achievementArr)
  //
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

const queryTutorsByInput = async (queryStr) => {
  let tutors = []
  if (isNaN(parseInt(queryStr))) {
    tutors = await queryTutorsByName(queryStr)
  } else {
    tutors = await queryTutorsById(queryStr)
  }
  return tutors
}

const queryTutorsByFilter = async (queryObj) => {
  let result = []

  let tutorsBySubject = []
  let tutorsByGender = []
  let tutorsByCurrentJob = []
  let tutorsByAchievement = []

  if ([queryObj.subject].length) {
    tutorsBySubject = await queryTutorsBySubject(queryObj.subject)
  }
  if (queryObj.gender.length) {
    tutorsByGender = await queryTutorsByGender(queryObj.gender)
  }
  if (queryObj.currentJob.length) {
    tutorsByCurrentJob = await queryTutorsByCurrentJob(queryObj.currentJob)
  }
  if (queryObj.achievement.length) {
    tutorsByAchievement = await queryTutorsByAchievement(queryObj.achievement)
  }
  if (
    !queryObj.gender.length &&
    !queryObj.currentJob.length &&
    !queryObj.achievement.length
  ) {
    // let tutors = await getAllTutors()
    return tutorsBySubject
  }

  // merge into 1 array and remove duplicates
  let tutors = [
    ...tutorsBySubject,
    ...tutorsByGender,
    ...tutorsByCurrentJob,
    ...tutorsByAchievement
  ]
  tutors = [...new Map(tutors.map(item => [item['id'], item])).values()]

  // check tutor existence
  tutors.forEach((tutor) => {
    let matchingScore = 0

    if (isIncluded(tutor, tutorsBySubject)) {
      matchingScore++
    }
    if (isIncluded(tutor, tutorsByGender)) {
      matchingScore++
    }
    if (isIncluded(tutor, tutorsByCurrentJob)) {
      matchingScore++
    }
    if (isIncluded(tutor, tutorsByAchievement)) {
      matchingScore++
    }
    if (matchingScore === 4) {
      result.push(tutor)
    }
  })

  return result
}

export const tutorAPI = {
  getTutor,
  getAllTutors,
  getApplyingTutors,
  queryTutorsByFilter,
  queryTutorsByInput
}
