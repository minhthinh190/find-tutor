export default function ({ store, redirect }) {
  const isAuthenticated = store.state.auth.user.id ? true : false

  if (!isAuthenticated) {
    redirect({ name: 'signin' })
  }
}
