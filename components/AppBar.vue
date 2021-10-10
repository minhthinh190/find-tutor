<template>
  <div>
    <v-app-bar
      color="teal lighten-1"
      dark
      class="px-10"
    >
      <v-app-bar-title>
        App Title
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y left>
        <!-- Menu button -->
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            v-bind="attrs"
            v-on="on"
            class="box"
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
    }
  }
}
</script>
