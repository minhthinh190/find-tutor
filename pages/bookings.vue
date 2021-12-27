<template>
  <v-container
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <v-row class="mb-16 px-md-16">
      <v-col
        cols="12"
        md="3"
        class="pr-md-3 pa-0"
      >
        <v-container
          fluid
          class="pa-0"
        >
          <v-card-title class="px-0 pt-0 pb-4">
            <v-avatar
              color="grey lighten-2"
            ></v-avatar>

            <h4 class="ml-3">Username</h4>
          </v-card-title>
          
          <div class="px-4 py-2 nav-item">
            <v-icon class="mr-3">
              mdi-account
            </v-icon>

            <nuxt-link to="" class="nav-link">
              Tài khoản của tôi
            </nuxt-link>
          </div>

          <div class="px-4 py-2 nav-item">
            <v-icon class="mr-3">
              mdi-bell
            </v-icon>

            <nuxt-link to="" class="nav-link">
              Thông báo
            </nuxt-link>
          </div>
        </v-container>
      </v-col>

      <v-col
        cols="12"
        md="9"
        class="pl-md-6 pa-0"
      >
        <!-- Filter -->
        <v-tabs
          v-model="currentFilter"
          fixed-tabs
          color="teal darken-1"
          class="mb-4"
        >
          <v-tab
            v-for="item in vnFilters"
            :key="item"
            class="text-capitalize"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <!-- Loader -->
        <v-container v-if="isLoading" fluid class="py-0">
          <v-row>
            <v-col class="px-0">
              <div
                v-for="n in 3"
                :key="n"
              >
                <v-skeleton-loader
                  type="card"
                  class="v-skeleton-loader--custom"
                ></v-skeleton-loader>
                <v-spacer class="my-6"/>
              </div>
            </v-col>
          </v-row>
        </v-container>

        <v-container
          v-if="bookingList === null || !bookingList.length"
          fluid
          class="py-0"
        >
          <v-row>
            <v-col
              cols="12"
              class="px-0"
            >
              <v-card
                elevation="0"
                class="py-6"
              >
                <v-card-title class="py-16">
                  <v-row
                    justify="center"
                    class="py-10"
                  >
                    <v-col
                      cols="12"
                      class="d-flex justify-center"
                    >  
                      <img
                        src="~/assets/images/books.jpg"
                        class="image"
                      />
                    </v-col>

                    Bạn chưa có yêu cầu nào.
                  </v-row>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Booking List -->
        <div v-if="!isLoading" class="mb-16 pb-16">
          <v-container
            v-for="(item, index) in bookingList"
            :key="index"
            fluid
            class="mb-2 py-0"
          >
            <v-row>
              <v-col
                cols="12"
                class="px-0"
              >
                <v-card flat tile outlined>
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
                    Gia sư:
                    <nuxt-link
                      v-for="(tutor, index) in item.tutors"
                      :key="index"
                      :to="{
                        name: 'tutor-id',
                        params: { id: tutor.id, email: tutor.email }
                      }"
                      class="link"
                    >
                      {{ tutor.status === 'accepted' ? tutor.name : null }}
                      <span
                        v-if="index !== item.tutors.length - 1"
                        class="comma"
                      >
                        ,&nbsp;
                      </span>
                    </nuxt-link>
                  </v-card-subtitle>

                  <v-card-text
                    class="ml-4 mb-4 px-2 py-0 font-weight-bold status-label"
                    :class="{
                      'status-label--waiting': item.status === 'waiting',
                      'status-label--on-going': item.status === 'on-going',
                      'status-label--finished': item.status === 'finished'
                    }"
                  >
                    {{ translateBookingStatus(item.status) }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
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
      isLoading: false,
      vnFilters: ['Tất cả', 'Hoàn tất', 'Đang tiến hành', 'Đang chờ'],
      filters: ['All', 'Finished', 'On-going', 'Waiting'],
      currentFilter: 0
    }
  },
  computed: {
    ...mapState({
      bookingList: state => state.booking.list
    })
  },
  watch: {
    currentFilter (val) {
      this.filterBookings(val)
    }
  },
  async mounted () {
    this.isLoading = true

    // get booking list
    await this.$store.dispatch('booking/getBookings')

    this.isLoading = false
  },
  methods: {
    async filterBookings (optionId) {
      this.isLoading = true
      const property = 'status'
      const value = this.filters[optionId].toLowerCase()

      if (value === 'all') {
        await this.$store.dispatch('booking/getBookings')
        this.isLoading = false
      } else {
        await this.$store.dispatch('booking/getBookingsByStatus', {
          property,
          value
        })
        this.isLoading = false
      }
    },

    selectItem (item) {
      this.currentFilter = item
    },

    translateBookingStatus (originalStatus) {
      let status = ''

      switch (originalStatus) {
        case 'waiting':
          status = 'Đang chờ'
          break
        case 'on-going':
          status = 'Đang tiến hành'
          break
        case 'finished':
          status = 'Hoàn tất'
          break
      }

      return status
    },

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
.nav-item:hover {
  cursor: pointer;
  background: #EEEEEE;
}
.nav-item:hover .nav-link {
  color: black;
}
.nav-link {
  color: #757575;
  text-decoration: none;
}
.image {
  width: 150px;
}
.status-label {
  width: fit-content;
  font-size: 13px;
  font-weight: bold;
  color: #263238;
}
.status-label--waiting {
  background: #E57373;
}
.status-label--on-going {
  background: #E6EE9C;
}
.status-label--finished {
  background: #80CBC4;
}
.v-skeleton-loader--custom {
  border-radius: 0;
}
</style>
