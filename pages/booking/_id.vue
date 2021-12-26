<template>
  <v-container
    v-if="booking"
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <v-row class="mb-16 px-md-16">
      <v-col
        cols="12"
        md="3"
        class="pr-md-6 pa-0"
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
        class="pa-0"
      >
        <!-- Loader -->
        <v-container v-if="isLoading" fluid>
          <v-row>
            <v-col class="pl-3">
              <v-skeleton-loader
                type="heading"
              ></v-skeleton-loader>

              <v-spacer class="my-6"/>

              <div
                v-for="n in 2"
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

        <!-- Booking Details-->
        <v-container v-else fluid>
          <v-row class="mb-1">
            <v-col cols="6" class="pl-3">
              <div
                class="px-2 py-1 status-label"
                :class="{
                  'status-label--waiting': booking.status === 'waiting',
                  'status-label--on-going': booking.status === 'on-going',
                  'status-label--finished': booking.status === 'finished'
                }" 
              >
                {{ translateStatus(booking.status) }}
              </div>
            </v-col>

            <v-col cols="6">
              <div class="mt-1">
                <p class="ma-0 text-right subtitle-2 created-date">
                  Ngày tạo: {{ booking.createdDate }}
                </p>
              </div>
            </v-col>
          </v-row>

          <!-- Tutor List -->
          <v-row v-if="getAcceptedTutorEmails().length" class="mb-4">
            <v-col cols="12" class="pl-3">
              <v-card flat tile outlined>
                <v-card-text>
                  <p class="ma-0">
                    <span class="font-weight-bold black--text custom-card-text">
                      Gia sư:&nbsp;
                    </span>

                    <nuxt-link
                      v-for="(tutor, index) in booking.tutors"
                      :key="index"
                      to=""
                      class="link"
                    >
                      {{ tutor.email }}
                      <span
                        v-if="index !== booking.tutors.length - 1"
                        class="comma"
                      >
                        ,&nbsp;
                      </span>
                    </nuxt-link>
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Format & Time -->
          <v-row class="mb-4">
            <v-col cols="12" class="pl-3">
              <v-data-table
                hide-default-footer
                :headers="headers"
                :items="generateDetailsTableData()"
                class="v-table--custom"
              ></v-data-table>
            </v-col>
          </v-row>

          <!-- Description -->
          <v-row class="mb-4">
            <v-col cols="12" class="pl-3">
              <v-card flat tile outlined>
                <div class="px-4 pt-4 pb-0">
                  <p class="ma-0 font-weight-bold custom-card-text">
                    Mô tả
                  </p>
                </div>

                <v-card-text class="pt-2">
                  {{ booking.description }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Address -->
          <v-row class="mb-4">
            <v-col cols="12" class="pl-3">
              <v-card flat tile outlined>
                <v-card-text>
                  <p class="ma-0">
                    <span class="font-weight-bold black--text custom-card-text">
                      Địa chỉ:&nbsp;
                    </span>
                    {{ booking.address }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Contact -->
          <v-row class="mb-8">
            <v-col cols="12" class="pl-3">
              <v-card flat tile outlined>
                <v-card-text>
                  <p class="ma-0">
                    <span class="font-weight-bold black--text custom-card-text">
                      Liên hệ:&nbsp;
                    </span>
                    {{ booking.contact }}
                  </p>  
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Applying Tutor List -->
          <v-row v-if="applyingTutors.length" class="mb-16">
            <v-col cols="12" class="mb-1 pl-3">
              <h3>Danh sách gia sư ứng tuyển</h3>
            </v-col>

            <v-col
              v-for="(tutor, index) in applyingTutors"
              :key="index"
              cols="12"
              lg="3"
              md="4"
              class="pr-0"
            >
              <v-card flat tile outlined>
                <v-card-subtitle class="px-3 pt-3 pb-2">
                  <p class="ma-0">
                    <strong>{{ tutor.id }}</strong>
                  </p>
                </v-card-subtitle>

                <v-img
                  height="150"
                  :src="tutor.avatar"
                  class="mx-3"
                ></v-img>
                
                <v-card-text class="px-3">
                  <p class="ma-0 tutor-name">
                    <strong>{{ tutor.name }}</strong>
                  </p>
                  <v-spacer class="mb-1"/>
                  <p class="ma-0">
                    <strong>Ngày sinh: </strong>
                    {{ tutor.birthDate + '/' + tutor.birthMonth + '/' + tutor.birthYear }}
                  </p>
                  <v-spacer class="mb-1"/>
                  <p class="ma-0">
                    <strong>Quê quán: </strong>
                    {{ tutor.hometown }}
                  </p>
                </v-card-text>

                <v-card-actions class="px-3 pb-3">
                  <v-btn
                    tile
                    depressed
                    class="text-capitalize"
                    @click="rejectTutor(tutor)"
                  >
                    Từ chối
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    tile
                    depressed
                    color="teal darken-1"
                    class="text-capitalize white--text"
                    @click.stop="isDialogShowed = true; selectedTutor = tutor.email"
                  >
                    Chấp nhận
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <!-- Tutor Acceptance Confirm Dialog -->
    <confirm-dialog
      :isDialogShowed="isDialogShowed"
      :isConfirming="isHiring"
      v-on:close-dialog="isDialogShowed = false"
      v-on:confirm="hireTutor"
    >
      <template #dialogTitle>
        Xác nhận thuê gia sư
      </template>

      <template #dialogContent>
        Đồng ý thuê gia sư này?
      </template>

      <template #confirmBtnText>
        Đồng ý
      </template>

      <template #cancelBtnText>
        Hủy
      </template>
    </confirm-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { bookingAPI } from '~/api/booking'
import ConfirmDialog from '~/components/ConfirmDialog'

export default {
  middleware: 'auth',
  layout: 'appbar',
  components: {
    ConfirmDialog
  },
  data () {
    return {
      isLoading: false,
      isDialogShowed: false,
      isHiring: false,
      headers: [
        { text: 'Môn học', value: 'subject', align: 'start', sortable: false },
        { text: 'Hình thức', value: 'format', align: 'start', sortable: false },
        { text: 'Thời gian', value: 'time', align: 'start', sortable: false },
        { text: 'Số buổi/tuần', value: 'perWeek', align: 'start', sortable: false },
        { text: 'Thời lượng', value: 'duration', align: 'start', sortable: false }
      ],
      selectedTutor: null
    }
  },
  computed: {
    bookingId () {
      return this.$route.params.id
    },
    ...mapState({
      userEmail: state => state.user.email,
      booking: state => state.booking.booking,
      applyingTutors: state => state.tutor.applyingTutors
    }),
  },
  async created () {
    this.isLoading = true
    const id = this.bookingId
    await this.$store.dispatch('booking/getBookingById', { id })
    await this.getApplyingTutorsData()
    this.isLoading = false
  },
  methods: {
    translateStatus (status) {
      let vnStatus = null

      switch (status) {
        case 'waiting':
          vnStatus = 'Đang chờ'
          break
        case 'on-going':
          vnStatus = 'Đang tiến hành'
          break
        case 'finished':
          vnStatus = 'Hoàn tất'
          break
      }

      return vnStatus
    },
    capitalizeFirstLetter (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    generateDetailsTableData () {
      const data = [
        {
          subject: this.capitalizeFirstLetter(this.booking.subject),
          format: this.booking.format,
          time: this.booking.time,
          perWeek: this.booking.perWeek,
          duration: this.booking.duration + ' (phút)'
        }
      ]
      return data
    },
    getApplyingTutorEmails () {
      let applyingTutorEmails = []

      this.booking.tutors.forEach((tutor) => {
        if (tutor.status === 'applying') {
          applyingTutorEmails.push(tutor.email)
        }
      })
      return applyingTutorEmails
    },
    getAcceptedTutorEmails () {
      let acceptedTutorEmails = []

      this.booking.tutors.forEach((tutor) => {
        if (tutor.status === 'accepted') {
          acceptedTutorEmails.push(tutor.email)
        }
      })
      return acceptedTutorEmails
    },
    getApplyingTutorsData () {
      const applyingTutorEmails = this.getApplyingTutorEmails()
      this.$store.dispatch(
        'tutor/getApplyingTutors', applyingTutorEmails
      )
    },
    async hireTutor () {
      this.isHiring = true

      const bookingId = this.bookingId.toString()
      const tutors = [
        { email: this.selectedTutor, status: 'accepted' }
      ]

      await bookingAPI.updateBookingTutorData(
        this.userEmail,
        bookingId,
        tutors
      )
        .then(async () => {
          const id = this.bookingId
          await this.$store.dispatch('booking/getBookingById', { id })
          await this.getApplyingTutorsData()

          this.isHiring = false
          this.isDialogShowed = false
        })
        .catch((err) => {
          this.isHiring = false
          this.isDialogShowed = false
          this.showNotification(err.code, 'error')
        })

      await bookingAPI.updateBookingStatus(
        this.userEmail,
        bookingId,
        'on-going'
      )
    },
    async rejectTutor (tutor) {
      let tutors = []
      const bookingId = this.bookingId.toString()

      this.booking.tutors.forEach((element) => {
        if (element.email !== tutor.email) {
          tutors.push(element)
        }
      })
      await bookingAPI.updateBookingTutorData(
        this.userEmail,
        bookingId,
        tutors
      )
        .then(async () => {
          const id = this.bookingId
          await this.$store.dispatch('booking/getBookingById', { id })
          await this.getApplyingTutorsData()
        })
        .catch((err) => {
          this.showNotification(err.code, 'error')
        })
    },
    //
    showNotification (message, color) {
      this.$store.dispatch('notification/showNotification', {
        message,
        color
      })
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px solid red;
}
.col {
  padding: 0;
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
.created-date {
  font-weight: normal;
  color: #757575;
}
.tutor-name {
  font-size: 16px;
  color: #00BFA5;
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
.custom-card-text {
  font-size: 16px;
}
.v-skeleton-loader--custom {
  border-radius: 0;
}
</style>

<style>
.v-table--custom {
  border: 1px solid #E0E0E0;
  border-radius: 0;
}
.v-table--custom thead tr {
  background: white;
}
.v-table--custom thead th {
  font-size: 15px !important;
  color: #000000 !important;
}
.v-table--custom tbody tr {
  background: white;
}
.v-table--custom tbody tr:hover {
  background: transparent !important;
}
</style>
