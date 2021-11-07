<template>
  <v-container
    v-if="booking"
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <v-row class="mb-4 box">
      <h2>
        {{ capitalizeFirstLetter(booking.subject) }}
      </h2>
    </v-row>

    <v-row class="mb-4 box">
      <v-container>
        <v-row>
          <v-col>
            <v-chip
              v-if="booking.status === 'waiting'"
              label
              dark
              color="grey darken-1"
            >
              <span class="font-weight-bold">
                {{ capitalizeFirstLetter(booking.status) }}
              </span>
            </v-chip>

            <v-chip
              v-if="booking.status === 'finished'"
              label
              dark
              color="success"
            >
              <span class="font-weight-bold">
                {{ capitalizeFirstLetter(booking.status) }}
              </span>
            </v-chip>

            <v-chip
              v-if="booking.status === 'on-going'"
              label
              dark
              color="blue darken-2"
            >
              <span class="font-weight-bold">
                {{ capitalizeFirstLetter(booking.status) }}
              </span>
            </v-chip>
          </v-col>

          <v-col>
            <p>{{ booking.createdDate }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <v-row class="mb-4 box">
      <v-container>
        <v-row>
          <v-col>
            <p>
              <span class="font-weight-bold">
                Format:
              </span>
              {{ booking.format }}
            </p>
          </v-col>

          <v-col>
            <p>
              <span class="font-weight-bold">
                Address:
              </span>
              {{ booking.address }}
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <p>
              <span class="font-weight-bold">
                Sessions per week:
              </span>
              {{ booking.perWeek }}
            </p>
          </v-col>

          <v-col>
            <p>
              <span class="font-weight-bold">
                Duration:
              </span>
              {{ booking.duration }} mins
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <p>
              <span class="font-weight-bold">
                Time:
              </span>
              {{ booking.time }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <v-row class="mb-4 box">
      <v-container class="box">
        <v-row>
          <h4>Description</h4>
        </v-row>

        <v-row>
          <p>{{ booking.description }}</p>
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
  computed: {
    bookingId () {
      return this.$route.params.id
    },
    ...mapState({
      booking: state => state.booking.booking
    }),
  },
  created () {
    const id = this.bookingId
    this.$store.dispatch('booking/getBookingById', { id })
  },
  methods: {
    capitalizeFirstLetter (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px solid red;
}
.col {
  border: 1px solid blue;
  padding: 0;
}
</style>
