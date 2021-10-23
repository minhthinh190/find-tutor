import { authService } from '~/firebase/auth'
import { bookingAPI } from './booking'

const signUserIn = (email, password) => {
  return authService.signUserIn(email, password)
    .then((res) => {
      const { uid, email } = res.user
      localStorage.setItem('uid', uid)

      return { uid, email }
    })
}

const signUserUp = (email, password) => {
  return authService.signUserUp(email, password)
    .then((res) => {
      const { uid, email } = res.user
      localStorage.setItem('uid', uid)

      return { uid, email }
    })
    .then (async ({ uid, email }) => {
      await bookingAPI.createBookingCounter(email)
      return { uid, email }
    })
}

const signUserOut = () => {
  return authService.signUserOut()
    .then(() => {
      localStorage.removeItem('uid')
    })
}

export const authAPI = {
  signUserIn,
  signUserUp,
  signUserOut
}
