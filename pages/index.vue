<template>
  <div>
    <AppBar />
  </div>
</template>

<script>
import AppBar from '~/components/AppBar'

export default {
  middleware: 'auth',
  components: {
    AppBar
  }
}
</script>
