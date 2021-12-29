<template>
  <v-dialog
    v-model="isDialogShowed"
    width="650"
    @click:outside="$emit('close-dialog')"
  >
    <v-card flat tile class="px-3">
      <v-card-title class="px-4">
        <h4>
          <slot name="dialogTitle">Dialog Title</slot>
        </h4>
      </v-card-title>

      <v-card-text class="px-4">
        <v-container fluid class="px-0 py-4 booking-list">
          <!-- Loader -->
          <div v-if="isLoading">
            <v-skeleton-loader
              v-for="n in 3"
              :key="n"
              type="card"
              class="mb-4 booking-option-loader"
            ></v-skeleton-loader>
          </div>

          <div
            v-else-if="!bookingList.length"
            class="text-center"
          >
            <p>Bạn không có yêu cầu nào</p>

            <nuxt-link to="/connect" class="link">
              <v-btn
                tile
                depressed
                outlined
                color="teal darken-1"
                class="pl-3 pr-5 white--text text-capitalize"
              >
                <v-icon class="mr-2">mdi-plus</v-icon>
                Tạo yêu cầu
              </v-btn>
            </nuxt-link>
          </div>

          <!-- Waiting Booking List -->
          <v-list-item-group v-else>
            <!-- Booking Card -->
            <v-radio-group v-model="selectedBooking">
              <v-list-item
                v-for="(booking, index) in bookingList"
                :key="index"
                class="mb-4 pa-0"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action class="mr-4">
                    <v-radio
                      color="teal accent-4"
                      :value="booking.id"
                      :input-value="active"
                    ></v-radio>
                  </v-list-item-action>

                  <v-list-item-content class="px-3 booking-card">
                    <v-card-subtitle class="d-flex pa-0">
                      <p class="ma-0 booking-title">
                        {{ formatSubjectName(booking.subject) }}
                      </p>
                      <v-spacer />
                      <p class="ma-0 text--disabled">{{ booking.createdDate }}</p>
                    </v-card-subtitle>

                    <v-spacer class="mb-1"/>

                    <div>
                      <div
                        class="pa-1 status-label"
                        :class="{
                          'status-label--responding': booking.status === 'responding',
                          'status-label--waiting': booking.status === 'waiting',
                          'status-label--on-going': booking.status === 'on-going',
                          'status-label--finished': booking.status === 'finished'
                        }"
                      >
                        {{ translateBookingStatus(booking.status) }}
                      </div>
                    </div>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-radio-group>
          </v-list-item-group>
        </v-container>
      </v-card-text>

      <v-divider class="mx-4"/>

      <v-card-actions>
        <v-btn
          tile
          depressed
          class="px-3 text-capitalize"
          @click="$emit('close-dialog')"
        >
          <slot name="cancelBtnText">Cancel</slot>
        </v-btn>

        <v-spacer />

        <v-btn
          tile
          depressed
          color="teal darken-1"
          class="px-3 text-capitalize white--text"
          :disabled="!bookingList.length"
          :loading="isConfirming"
          @click="$emit('confirm', selectedBooking)"
        >
          <slot name="confirmBtnText">Confirm</slot>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    isDialogShowed: {
      type: Boolean,
      required: true
    },
    isConfirming: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      selectedBooking: ''
    }
  },
  computed: {
    ...mapState({
      bookingList: state => state.booking.list
    })
  },
  watch: {
    isDialogShowed (val) {
      if (val === true) {
        this.getWaitingBookings()
      }
      if (val === false) {
        this.selectedBooking = ''
      }
    }
  },
  methods: {
    async getWaitingBookings () {
      this.isLoading = true
      const property = 'status'
      const value = 'waiting'

      await this.$store.dispatch('booking/getBookingsByStatus', {
        property,
        value
      })
      this.isLoading = false
    },

    formatSubjectName (subjectName) {
      let formattedSubjectName = subjectName
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')

      return formattedSubjectName
    },

    translateBookingStatus (originalStatus) {
      let status = ''

      switch (originalStatus) {
        case 'responding':
          status = 'Chờ gia sư phản hồi'
          break
        case 'waiting':
          status = 'Chưa có gia sư'
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
  }
}
</script>

<style scoped>
.box {
  border: 1px solid red;
}
/*
.booking-list {
  overflow: hidden;
}
*/
.link {
  text-decoration: none;
}
.booking-card {
  border: 1px solid #BDBDBD;
}
.booking-title {
  font-weight: bold;
  font-size: 16px;
  color: #00BFA5;
}
.status-label {
  width: fit-content;
  font-size: 11px;
  font-weight: bold;
  color: #263238;
}
.status-label--responding {
  background: #FFF59D;
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
.booking-option-loader {
  height: 75px;
  border-radius: 0;
}
</style>
