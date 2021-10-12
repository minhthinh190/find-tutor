<template>
  <div>
    <v-app-bar
      color="white"
      flat
      class="px-lg-10"
    >
      <v-app-bar-title>
        <nuxt-link to="/" class="home-link">
          App Title
        </nuxt-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="d-none d-sm-flex mr-6">
        <nuxt-link
          v-for="(item, index) in navigation"
          :key="index"
          to=""
          class="mx-4 font-weight-bold link"
        >
          {{ item.title }}
        </nuxt-link>
      </div>

      <v-menu offset-y left>
        <!-- Menu button -->
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            v-bind="attrs"
            v-on="on"
          ></v-app-bar-nav-icon>
        </template>

        <!-- Popup menu -->
        <v-card width="220">
          <v-list dense nav class="">
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
        { title: 'Page 1', link: '' },
        { title: 'Page 2', link: '' },
        { title: 'Page 3', link: '' },
        { title: 'Page 4', link: '' }
      ],
      menu: [
        { title: 'Profile', icon: 'mdi-account-circle', action: '' },
        { title: 'Starred', icon: 'mdi-star', action: '' },
        { title: 'Recent', icon: 'mdi-history', action: '' },
        { title: 'Account Settings', icon: 'mdi-cog', action: '' },
        { title: 'Sign Out', icon: 'mdi-logout', action: 'signOut' }
      ]
    }
  },
  methods: {
    invokeMenuAction (action) {
      this[action]()
    },
    signOut () {
      this.$store.dispatch('auth/signOut')
        .then(() => {
          localStorage.removeItem('uid')
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
.home-link {
  color: black;
  text-decoration: none;
  font-weight: bold;
}
.link {
  color: #9E9E9E;
  text-decoration: none;
}
.link:hover {
  color: black;
}
</style>
