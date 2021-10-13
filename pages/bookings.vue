<template>
  <v-container class="py-7 pa-sm-14">
    <v-row class="">
      <p class="text-h5 ma-0">
        All
      </p>

      <v-spacer />

      <v-btn depressed>
        Filter
        <v-icon
          color="grey darken-2"
          class="ml-2"
        >
          mdi-format-list-bulleted-square
        </v-icon>
      </v-btn>
    </v-row>

    <v-row class="mt-10">
      <v-container
        v-for="(item, index) in bookingList"
        :key="index"
      >
        <v-row>
          <v-col cols="12" class="px-0">
            <v-card outlined>
              <v-card-title>
                {{ item.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ item.subtitle }}
              </v-card-subtitle>

              <v-card-actions>
                <v-spacer />
                <v-btn depressed>
                  Click
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'appbar',
  data () {
    return {
      bookingList: [
        { title: 'Booking title', subtitle: 'This is the booking subtitle' },
        { title: 'Booking title', subtitle: 'This is the booking subtitle' },
        { title: 'Booking title', subtitle: 'This is the booking subtitle' },
        { title: 'Booking title', subtitle: 'This is the booking subtitle' },
        { title: 'Booking title', subtitle: 'This is the booking subtitle' }
      ]
    }
  }
}
</script>

<style scoped>
.big-box {
  border: 1px solid blue;
}
.box {
  border: 1px solid red;
}
.inside-box {
  border: 1px solid limegreen;
}
</style>
