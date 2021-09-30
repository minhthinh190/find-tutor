export default function ({ store, redirect }) {
  const isAuthenticated = store.state.auth.userCredential ? true : false

  if (!isAuthenticated) {
    console.log('hello:', isAuthenticated)
    redirect({ name: 'signin' })
  }
}
