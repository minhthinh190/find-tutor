<template>
  <v-container
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

            <h4 class="ml-3">
              {{ userEmail.substr(0, userEmail.indexOf('@')) }}
            </h4>
          </v-card-title>
          
          <div class="py-2 nav-item">
            <v-icon class="mr-2">
              mdi-account
            </v-icon>

            <nuxt-link to="/my-account" class="nav-link">
              Tài khoản của tôi
            </nuxt-link>
          </div>

          <!--
          <div class="py-2 nav-item">
            <v-icon class="mr-2">
              mdi-bell
            </v-icon>

            <nuxt-link to="" class="nav-link">
              Thông báo
            </nuxt-link>
          </div>
          -->
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
            <v-col>
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
            <v-col cols="6">
              <div
                class="px-2 py-1 status-label"
                :class="{
                  'status-label--responding': booking.status === 'responding',
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

          <!-- Confirming Tutor -->
          <v-row v-if="booking.status === 'responding'" class="mb-4">
            <v-col cols="12">
              <v-card flat tile outlined>
                <v-card-text>
                  <p class="ma-0">
                    <span class="font-weight-bold black--text custom-card-text">
                      Đã liên hệ gia sư:&nbsp;
                    </span>

                    <nuxt-link
                      :to="{
                        name: 'tutor-id',
                        params: {
                          id: contactedTutor.id,
                          email: contactedTutor.email
                        }
                      }"
                      class="link"
                    >
                      {{ contactedTutor.name }}
                    </nuxt-link>
                  </p>  
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Tutor List -->
          <v-row v-if="getAcceptedTutorEmails().length" class="mb-4">
            <v-col cols="12">
              <v-card flat tile outlined>
                <v-card-text>
                  <p class="ma-0">
                    <span class="font-weight-bold black--text custom-card-text">
                      Gia sư:&nbsp;
                    </span>

                    <nuxt-link
                      v-for="(tutor, index) in acceptedTutors"
                      :key="index"
                      :to="{
                        name: 'tutor-id',
                        params: { id: tutor.id, email: tutor.email }
                      }"
                      class="link"
                    >
                      {{ tutor.name }}
                      <span
                        v-if="index !== acceptedTutors.length - 1"
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
            <v-col cols="12">
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
            <v-col cols="12">
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
            <v-col cols="12">
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
            <v-col cols="12">
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

          <!-- Finish Button -->
          <v-row
            v-if="booking.status === 'on-going'"
            class="mb-8"
          >
            <v-col cols="12" class="text-right">
              <v-btn
                tile
                depressed
                color="teal darken-1"
                class="white--text text-capitalize"
                :loading="isFinishing"
                @click="finishSession"
              >
                Hoàn thành
              </v-btn>
            </v-col>
          </v-row>

          <!-- Cancel Contact Button -->
          <v-row
            v-if="booking.status === 'responding'"
            class="mb-8"
          >
            <v-col cols="12" class="text-right">
              <v-btn
                tile
                depressed
                color="teal darken-1"
                class="white--text text-capitalize"
                :loading="isContactCanceling"
                @click="cancelSendingRequest"
              >
                Hủy liên hệ
              </v-btn>
            </v-col>
          </v-row>

          <!-- Rate & Review Button -->
          <v-row
            v-if="booking.status === 'finished'"
            class="mb-8"
          >
            <v-col cols="12" class="text-right">
              <v-btn
                tile
                depressed
                color="teal darken-1"
                class="white--text text-capitalize"
                @click.stop="isRatingDialogShowed = true"
              >
                Đánh giá gia sư
              </v-btn>
            </v-col>
          </v-row>

          <!-- Applying Tutor List -->
          <v-row v-if="applyingTutors.length" class="mb-16">
            <v-col cols="12" class="mb-1">
              <h3>Danh sách gia sư ứng tuyển</h3>
            </v-col>

            <v-col
              v-for="(tutor, index) in applyingTutors"
              :key="index"
              cols="12"
              lg="3"
              md="4"
              class="mr-4 px-0"
            >
              <v-card flat tile outlined>
                <v-card-subtitle class="px-3 pt-3 pb-2">
                  <p class="ma-0">
                    <strong>{{ tutor.id }}</strong>
                  </p>
                </v-card-subtitle>

                <nuxt-link
                  :to="{
                    name: 'tutor-id',
                    params: { id: tutor.id, email: tutor.email }
                  }"
                  class="link"
                >
                  <v-img
                    height="150"
                    :src="tutor.avatar"
                    class="mx-3"
                  ></v-img>
                </nuxt-link>
                
                <v-card-text class="px-3">
                  <p class="ma-0 tutor-name">
                    <nuxt-link
                      :to="{
                        name: 'tutor-id',
                        params: { id: tutor.id, email: tutor.email }
                      }"
                      class="link"
                    >
                      <strong>{{ tutor.name }}</strong>
                    </nuxt-link>
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
                    :loading="isRejecting"
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
                    @click.stop="isDialogShowed = true; selectedTutor = { email: tutor.email, id: tutor.id, name: tutor.name }"
                  >
                    Chấp nhận
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mb-16"></v-row>
          <v-row class="mb-10"></v-row>
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

    <!-- Review & Ratings Dialog -->
    <rating-dialog
      :isDialogShowed="isRatingDialogShowed"
      :reviewer="userEmail"
      :tutorIds="booking.tutors.length ? booking.tutors : []"
      v-on:close-dialog="isRatingDialogShowed = false"
    ></rating-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { bookingAPI } from '~/api/booking'
import { tutorAPI } from '~/api/tutor'
import { classAPI } from '~/api/class'
import ConfirmDialog from '~/components/ConfirmDialog'
import RatingDialog from '~/components/RatingDialog'

export default {
  middleware: 'auth',
  layout: 'appbar',
  components: {
    ConfirmDialog,
    RatingDialog
  },
  data () {
    return {
      isLoading: false,
      isDialogShowed: false,
      isRatingDialogShowed: false,
      isHiring: false,
      isRejecting: false,
      isFinishing: false,
      isContactCanceling: false,
      headers: [
        { text: 'Môn học', value: 'subject', align: 'start', sortable: false },
        { text: 'Hình thức', value: 'format', align: 'start', sortable: false },
        { text: 'Thời gian', value: 'time', align: 'start', sortable: false },
        { text: 'Số buổi/tuần', value: 'perWeek', align: 'start', sortable: false },
        { text: 'Thời lượng', value: 'duration', align: 'start', sortable: false }
      ],
      contactedTutor: null,
      acceptedTutors: [],
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
    
    // get booking data
    await this.$store.dispatch('booking/getBookingById', { id })
    
    // get accepted tutor list
    const acceptedTutorEmails = this.getAcceptedTutorEmails()
    acceptedTutorEmails.forEach(async (email) => {
      const tutor = await tutorAPI.getTutor(email)
      this.acceptedTutors.push(tutor)
    })

    // get contacted tutor if existed
    this.getContactedTutor()

    // get applying tutor list
    await this.getApplyingTutorsData()

    this.isLoading = false
  },
  methods: {
    translateStatus (status) {
      let vnStatus = null

      switch (status) {
        case 'responding':
          vnStatus = 'Chờ gia sư phản hồi'
          break
        case 'waiting':
          vnStatus = 'Chưa có gia sư'
          break
        case 'on-going':
          vnStatus = 'Đang tiến hành'
          break
        case 'finished':
          vnStatus = 'Hoàn thành'
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

    getContactedTutor () {
      this.booking.tutors.forEach((tutor) => {
        if (tutor.status === 'confirming') {
          this.contactedTutor = tutor
        }
      })
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
        {
          email: this.selectedTutor.email,
          id: this.selectedTutor.id,
          name: this.selectedTutor.name,
          status: 'accepted'
        }
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

      await classAPI.updateClassStatus(
        this.selectedTutor.email,
        this.bookingId,
        'on-going'
      )

      $nuxt.$router.push({ name: 'bookings' })
    },

    async rejectTutor (tutor) {
      this.isRejecting = true

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
          this.isRejecting = false
          this.showNotification(err.code, 'error')
        })

      await classAPI.rejectClass(tutor.email, this.bookingId)

      this.isRejecting = false
    },

    async finishSession () {
      this.isFinishing = true
      const bookingId = this.bookingId.toString()

      await bookingAPI.updateBookingStatus(
        this.userEmail,
        bookingId,
        'finished'
      )

      for (const tutor of this.acceptedTutors) {
        await classAPI.updateClassStatus(
          tutor.email,
          this.bookingId,
          'finished'
        ) 
      }

      $nuxt.$router.push({ name: 'bookings' })
      this.isFinishing = false
    },

    async cancelSendingRequest () {
      this.isContactCanceling = true
      
      let tutors = []
      const bookingId = this.bookingId.toString()

      this.booking.tutors.forEach((element) => {
        if (element.email !== this.contactedTutor.email) {
          tutors.push(element)
        }
      })

      await bookingAPI.updateBookingStatus(
        this.userEmail,
        bookingId,
        'waiting'
      )

      await bookingAPI.updateBookingTutorData(
        this.userEmail,
        bookingId,
        tutors
      )

      await classAPI.rejectClass(
        this.contactedTutor.email,
        this.bookingId
      )

      $nuxt.$router.push({ name: 'bookings' })
      this.isContactCanceling = false
    },

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
}
.nav-item:hover .nav-link {
  color: black;
}
.nav-link {
  color: #757575;
  text-decoration: none;
}
.link {
  text-decoration: none;
  color: #00BFA5;
}
.link:hover {
  filter: brightness(70%);
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
