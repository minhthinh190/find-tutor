<template>
  <div>
    <v-app-bar
      color="white"
      elevation="1"
      flat
      class="px-lg-10"
    >
      <v-app-bar-title class="text-no-wrap">
        <nuxt-link to="/" class="home-link app-title">
          Find Tutors
        </nuxt-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="d-none d-sm-flex mr-1">
        <nuxt-link
          v-for="(item, index) in navigation"
          :key="index"
          :to="item.link"
          class="mx-3 font-weight-bold nav"
        >
          <v-icon color="black">{{ item.icon }}</v-icon>
        </nuxt-link>
      </div>

      <v-menu offset-y left>
        <!-- Menu button -->
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            v-bind="attrs"
            v-on="on"
            color="black"
          ></v-app-bar-nav-icon>
        </template>

        <!-- Popup menu -->
        <v-card width="220">
          <v-list dense nav>
            <v-list-item-group>
              <v-list-item
                v-for="(item, index) in menu"
                :key="index"
                @click="invokeMenuAction(item.action)"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navigation: [
        { icon: 'mdi-home', link: '/' },
        { icon: 'mdi-magnify', link: '/search' }
      ],
      menu: [
        { title: 'Danh sách yêu cầu', icon: 'mdi-book-education', action: 'goToBookingList' },
        { title: 'Thông báo', icon: 'mdi-bell', action: '' },
        { title: 'Tài khoản của tôi', icon: 'mdi-account', action: '' },
        { title: 'Đăng xuất', icon: 'mdi-logout', action: 'signOut' }
      ]
    }
  },
  methods: {
    invokeMenuAction (action) {
      this[action]()
    },
    goToBookingList () {
      this.$router.push({ name: 'bookings' })
    },
    signOut () {
      this.$store.dispatch('user/signOut')
        .then(() => {
          $nuxt.$router.push({ name: 'signin' })
        })
        .catch(err => {
          console.log('Sign out error:', err)
        })
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px solid red;
}
.app-title {
  color: #00897B;
}
.home-link {
  text-decoration: none;
  font-weight: bold;
}
.nav {
  color: white;
  text-decoration: none;
}
</style>
