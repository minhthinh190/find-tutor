export default function ({ store, redirect }) {
  const isAuthenticated = store.state.auth.authUser ? true : false

  if (!isAuthenticated) {
    redirect({ name: 'signin' })
  }
}
