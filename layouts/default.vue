<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>

    <v-snackbar
      v-model="isNotiShowed"
      :color="notiColor"
      text
    >
      {{ notiMessage }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    notiMessage: state => state.notification.message,
    notiColor: state => state.notification.color,
    isNotiShowed: state => state.notification.isShowed
  })
}
</script>

