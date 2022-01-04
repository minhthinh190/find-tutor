<template>
  <v-container
    fluid
    class="px-sm-16 pb-sm-16 root-container"
  >
    <v-row
      justify="space-between"
      class="mb-16 px-md-16"
    >
      <v-col
        cols="12"
        sm="12"
        md="6"
        class="mb-16 pr-md-10"
      >
        <div class="d-flex flex-column justify-center intro-container">
          <h1 class="pb-4">
            Tìm kiếm gia sư dễ dàng, nhanh chóng
          </h1>
          <p class="pb-4">
            Tìm kiếm gia sư dạy kèm tại nhà hoặc online phù hợp với nhu cầu của bạn.
          </p>

          <nuxt-link
            to="/connect"
            class="link"
          >
            <v-btn
              depressed
              tile
              color="teal darken-1"
              class="pa-5 white--text"
            >
              Tìm gia sư
            </v-btn>
          </nuxt-link>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="6"
        class="mb-16 pl-md-10"
      >
        <div>
          <img
            src="~/assets/images/cover_image.jpg"
            alt="cover image"
            class="cover-image"
          />
        </div>
      </v-col>
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
.box {
  border: 1px solid red;
}
.link {
  text-decoration: none;
}
.intro-container {
  height: 100%;
}
.cover-image {
  width: 100%;
}
</style>
