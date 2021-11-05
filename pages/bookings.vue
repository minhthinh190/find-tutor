<template>
  <v-container
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <v-row class="mb-4 px-md-16">
      <p class="text-h5 ma-0">
        {{ currentFilter }}
      </p>

      <v-spacer />

      <v-menu
        offset-y
        left
        rounded="0"
      >
        <!-- Filter button -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            depressed
            class="px-3"
          >
            <v-icon color="grey darken-2">
              mdi-format-list-bulleted-square
            </v-icon>

            <v-divider
              vertical
              class="mx-2"
            />

            <v-icon color="grey darken-2">
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>

        <!-- Filter list -->
        <v-list>
          <v-list-item
            v-for="item in filters"
            :key="item"
            link
            class="px-6"
            @click="selectItem(item)"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>

    <v-row
      v-if="bookingList === null || !bookingList.length"
      class="px-md-16"
    >
      <v-container fluid>
        <h2 class="text-center">
          You don't have any request.
        </h2>
      </v-container>
    </v-row>

    <v-row
      v-else
      class="px-md-16"
    >
      <v-container
        v-for="(item, index) in bookingList"
        :key="index"
        fluid
      >
        <v-row>
          <v-col
            cols="12"
            class="px-0"
          >
            <v-card elevation="0">
              <v-card-title>
                <nuxt-link
                  :to="{ name: 'booking-id', params: { id: item.id } }"
                  class="link"
                >
                  {{ capitalizeFirstLetter(item.subject) }}
                </nuxt-link>

                <v-spacer />

                <p class="ma-0 subtitle-1 text--disabled">
                  {{ item.createdDate }}
                </p>
              </v-card-title>

              <v-card-subtitle>
                Tutor:
                <nuxt-link
                  v-for="(tutor, index) in item.tutors"
                  :key="index"
                  to=""
                  class="link"
                >
                  {{ tutor }}
                  <span
                    v-if="index !== item.tutors.length - 1"
                    class="comma"
                  >
                    ,&nbsp;
                  </span>
                </nuxt-link>
              </v-card-subtitle>

              <v-card-text class="font-weight-bold">
                {{ capitalizeFirstLetter(item.status) }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',
  layout: 'appbar',
  data () {
    return {
      filters: ['All', 'Finished', 'On-going', 'Waiting'],
      currentFilter: 'All'
    }
  },
  computed: {
    ...mapState({
      bookingList: state => state.booking.list
    })
  },
  watch: {
    currentFilter () {
      this.filterBookings()
    }
  },
  created () {
    this.$store.dispatch('booking/getBookings')
  },
  methods: {
    filterBookings () {
      const property = 'status'
      const value = this.currentFilter.toLowerCase()

      if (value === 'all') {
        this.$store.dispatch('booking/getBookings')
      } else {
        this.$store.dispatch('booking/getBookingsByStatus', { property, value })
      }
    },

    selectItem (item) {
      this.currentFilter = item
    },

    capitalizeFirstLetter (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
}
</script>

<style scoped>
.root-container {
  background: #F5F5F5;
}
.link {
  text-decoration: none;
  color: #00BFA5;
}
.link:hover {
  filter: brightness(70%);
}
.comma {
  color: black;
}
</style>
