<template>
  <div>
    <AppBar />
    <p>Welcome! {{ user.email }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppBar from '~/components/AppBar'

export default {
  middleware: 'auth',
  components: {
    AppBar
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  }
}
</script>
