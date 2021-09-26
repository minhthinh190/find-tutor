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
  middleware: 'auth',
  data () {
    return {
      menu: [
        { title: 'Profile', icon: 'mdi-account-circle' },
        { title: 'Starred', icon: 'mdi-star' },
        { title: 'Recent', icon: 'mdi-history' },
        { title: 'Account Settings', icon: 'mdi-cog' },
        { title: 'Sign Out', icon: 'mdi-logout' }
      ]
    }
  }
}
</script>
