<template>
  <v-container class="py-7 pa-sm-14">
    <v-row
      justify="center"
      class="py-5"
    >
      <h1>Lorem ipsum dolor sit amet</h1>
    </v-row>

    <v-row
      justify="center"
      class="py-4"
    >
      <nuxt-link
        to="/connect"
        class="link"
      >
        <v-btn
          color="green darken-1"
          depressed
          class="pa-5 white--text"
        >
          Let's Connect
        </v-btn>
      </nuxt-link>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from '~/components/AppBar'

export default {
  middleware: 'auth',
  layout: 'appbar',
  components: {
    AppBar
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
}
</style>
