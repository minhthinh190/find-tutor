<template>
  <v-container
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <v-row class="mb-16 px-md-16">
      <!-- Personal Info -->
      <v-col cols="3">
        <!-- Loader -->
        <v-container v-if="isLoading" fluid>
          <v-row>
            <v-col class="pa-0">
              <v-skeleton-loader
                type="card"
                class="v-skeleton-loader--custom"
              ></v-skeleton-loader>

              <v-skeleton-loader
                type="card-heading"
                class="v-skeleton-loader--custom"
              ></v-skeleton-loader>

              <v-skeleton-loader
                type="card-heading"
                class="v-skeleton-loader--custom"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-else fluid>
          <v-row>
            <v-col class="pa-0">
              <v-img
                contain
                height="250"
                :src="tutor.avatar"
                class="mx-auto img-placeholder"
              ></v-img>
            </v-col>
          </v-row>

          <v-spacer class="my-4"/>

          <v-row>
            <v-col class="pa-0">
              <v-card flat tile class="pb-3">
                <v-card-title class="mb-3 px-0">
                  {{ tutor.name }}
                </v-card-title>

                <v-card-subtitle class="px-0 py-1">
                  <v-icon small class="mr-1">mdi-calendar-range</v-icon>
                  {{ tutor.birthDate + '/' + tutor.birthMonth + '/' + tutor.birthYear}}
                </v-card-subtitle>

                <v-card-subtitle class="px-0 py-1">
                  <v-icon small class="mr-1">mdi-map-marker</v-icon>
                  {{ tutor.hometown }}
                </v-card-subtitle>

                <v-card-subtitle class="px-0 py-1">
                  <v-icon small class="mr-1">mdi-phone</v-icon>
                  {{ tutor.phone }}
                </v-card-subtitle>

                <v-card-subtitle class="px-0 py-1">
                  <v-icon small class="mr-1">mdi-email</v-icon>
                  {{ tutor.email }}
                </v-card-subtitle>

                <v-spacer class="my-2"/>

                <v-card-actions class="px-0">
                  <v-btn
                    tile
                    depressed
                    block
                    color="teal darken-1"
                    class="text-capitalize white--text"
                    @click.stop="isDialogShowed = true;"
                  >
                    Thuê gia sư
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Experience & Services -->
      <v-col cols="9" class="pl-8">
        <!-- Loader -->
        <v-container v-if="isLoading" fluid>
          <v-row>
            <v-col class="px-0 py-0">
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

        <v-container v-else fluid>
          <!-- Tutor ID -->
          <v-row>
            <v-col class="pa-0">
              <v-card flat tile outlined>
                <v-card-text>
                  <p class="ma-0">
                    <span class="font-weight-bold black--text custom-card-title">
                      Mã gia sư:&nbsp;
                    </span>
                    <span class="tutor-id">{{ tutor.id }}</span>
                  </p>  
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Job & Education -->
          <v-row>
            <v-col class="pa-0">
              <v-card flat tile outlined>
                <v-card-text>
                  <p class="ma-0">
                    <span class="custom-card-title">Nghề nghiệp:</span>
                    <span class="ml-1">
                      {{ translateCurrentJob(tutor.currentJob) }}
                    </span>
                  </p>
                  <v-spacer class="my-1"/>
                  <p class="ma-0">
                    <span class="custom-card-title">Trường:</span>
                    <span class="ml-1">{{ tutor.school }}</span>
                  </p>
                  <v-spacer class="my-1"/>
                  <p class="ma-0">
                    <span class="custom-card-title">Khoa/Lớp:</span>
                    <span class="ml-1">{{ tutor.faculty }}</span>
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Tutor Description -->
          <v-row>
            <v-col class="pa-0">
              <v-card flat tile outlined>
                <v-card-title class="pt-3 pb-0 custom-card-title">
                  Tự giới thiệu
                </v-card-title>
                <v-card-text class="">
                  {{ tutor.selfIntroduction }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Tutor Achievement -->
          <v-row v-if="tutor.achievement.length">
            <v-col class="pa-0">
              <v-card flat tile outlined>
                <v-card-title class="pt-3 pb-2 custom-card-title">
                  Đặc điểm nổi bật
                </v-card-title>
                <v-card-text>
                  <div class="d-flex">
                    <div
                      v-for="(achievement, index) in tutor.achievement"
                      :key="index"
                      class="mr-2 px-2 achievement-label"
                    >
                      {{ achievement }}
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Fee Table -->
          <v-row>
            <v-col class="pa-0">
              <v-card flat tile>
                <v-card-title class="mb-2 pt-3 pb-0 custom-card-title">
                  Bảng học phí
                </v-card-title>
                <v-data-table
                  hide-default-footer
                  :headers="feeTableHeaders"
                  :items="feeTableData"
                  class="v-table--custom"
                ></v-data-table>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Timetable -->
          <v-row>
            <v-col class="pa-0">
              <v-card flat tile>
                <v-card-title class="mb-2 pt-3 pb-0 custom-card-title">
                  Thời gian rảnh
                </v-card-title>
                <v-data-table
                  hide-default-footer
                  :headers="timetableHeaders"
                  :items="tutor.freeTime"
                  class="v-table--custom"
                >
                  <template v-slot:[`item.morning`]="{ item }">
                    <v-checkbox
                      v-model="item.morning"
                      color="teal accent-4"
                      hide-details
                      readonly
                      class="ma-0"
                    ></v-checkbox>
                  </template>

                  <template v-slot:[`item.afternoon`]="{ item }">
                    <v-checkbox
                      v-model="item.afternoon"
                      color="teal accent-4"
                      hide-details
                      readonly
                      class="ma-0"
                    ></v-checkbox>
                  </template>

                  <template v-slot:[`item.evening`]="{ item }">
                    <v-checkbox
                      v-model="item.evening"
                      color="teal accent-4"
                      hide-details
                      readonly
                      class="ma-0"
                    ></v-checkbox>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Format -->
          <v-row class="mb-16">
            <v-col class="pa-0">
              <v-card flat tile outlined>
                <v-card-text>
                  <p class="ma-0">
                    <span class="font-weight-bold black--text custom-card-title">
                      Nhận dạy theo hình thức:&nbsp;
                    </span>
                    {{ displayTeachingFormat(tutor.format) }}
                  </p>  
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Ratings & Review -->
          <v-row class="mb-16">
            <v-col cols="12" class="px-0 pt-0">
              <v-card-title class="pa-0 font-weight-bold">
                Đánh giá
              </v-card-title>
            </v-col>

            <v-col
              v-if="!tutor.ratingScore.length && !tutor.review.length"
              cols="12"
              class="px-0"
            >
              <div class="pa-16 text-center">
                <img
                  src="~/assets/images/books.jpg"
                  class="image"
                />
                <p>Chưa có đánh giá</p>
              </div>
            </v-col>

            <v-col v-else class="pa-0">
              <div
                v-for="(item, index) in ratingData"
                :key="index"
                class="mb-12"
              > 
                <div class="d-flex align-center">
                  <v-avatar
                    class="mr-3"
                  >
                    <v-img class="img-placeholder"/>
                  </v-avatar>

                  <div>
                    <p class="ml-1 mr-0 my-0 font-weight-bold">
                      {{ item.reviewer.substr(0, item.reviewer.indexOf('@')) }}
                    </p>
                    <v-rating
                      dense
                      half-increments
                      readonly
                      :value="item.score"
                      background-color="yellow darken-3"
                      color="yellow darken-3"
                    ></v-rating>
                  </div>
                </div>

                <div class="ml-16 mt-4">
                  {{ item.content }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <!-- Choosing Booking Dialog -->
    <booking-option-dialog
      :isDialogShowed="isDialogShowed"
      :isConfirming="isRequestSending"
      v-on:close-dialog="isDialogShowed = false"
      v-on:confirm="sendRequestToTutor"
    >
      <template #dialogTitle>
        Lựa chọn yêu cầu của bạn
      </template>

      <!--
      <template #dialogContent>
        Đồng ý thuê gia sư này?
      </template>
      -->

      <template #confirmBtnText>
        Xác nhận
      </template>

      <template #cancelBtnText>
        Hủy
      </template>
    </booking-option-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { bookingAPI } from '~/api/booking'
import { tutorAPI } from '~/api/tutor'
import BookingOptionDialog from '~/components/BookingOptionDialog'

export default {
  middleware: 'auth',
  layout: 'appbar',
  components: {
    BookingOptionDialog
  },
  data () {
    return {
      isLoading: false,
      isDialogShowed: false,
      isRequestSending: false,
      feeTableHeaders: [
        { text: 'Môn học', value: 'subject', align: '', sortable: false },
        { text: 'Lớp', value: 'level', align: '', sortable: false },
        { text: 'Học phí/buổi', value: 'fee', align: '', sortable: false }
      ],
      timetableHeaders: [
        { text: 'Ngày trong tuần', value: 'weekday', align: '', sortable: false },
        { text: 'Sáng', value: 'morning', align: '', sortable: false },
        { text: 'Chiều', value: 'afternoon', align: '', sortable: false },
        { text: 'Tối', value: 'evening', align: '', sortable: false }
      ],
      feeTableData: [],
      ratingDataArr: []
    }
  },
  computed: {
    tutorEmail () {
      return this.$route.params.email
    },
    ...mapState({
      tutor: state => state.tutor.tutorProfile,
      userEmail: state => state.user.email
    })
  },
  async created () {
    this.isLoading = true
    await this.$store.dispatch('tutor/getTutorProfile', this.tutorEmail)
    this.generateFeeTableData()
    this.generateRatingData()
    this.isLoading = false
  },
  methods: {
    translateCurrentJob (value) {
      let currentJob = ''
      switch (value) {
        case 'student':
          currentJob = 'Sinh viên'
          break
        case 'graduated':
          currentJob = 'Đã tốt nghiệp'
          break
        case 'teacher':
          currentJob = 'Giáo viên'
          break
      }
      return currentJob
    },

    displayTeachingFormat (value) {
      let format = ''
      switch (value) {
        case 'both':
          format = 'Offline & Online'
          break
        case 'offline':
          format = 'Offline'
          break
        case 'online':
          format = 'Online'
      }
      return format
    },

    generateFeeTableData () {
      if (this.tutor.fee.length) {
        this.tutor.fee.forEach((item) => {
          if (item.subject !== '') {
            this.feeTableData.push(
              {
                subject: item.subject,
                level: item.level.length ? item.level.reduce((prevLevel, currentLevel) => {
                  return prevLevel.toString() + ', ' + currentLevel.toString()
                }) : '',
                fee: item.fee
              }
            )
          }
        })
      }
    },

    generateRatingData () {
      let ratingDataObj = {}

      this.tutor.ratingScore.forEach((item) => {
        ratingDataObj[item.reviewer] = {
          reviewer: item.reviewer,
          score: item.score,
          content: ''
        }
      })
      this.tutor.review.forEach((item) => {
        if (ratingDataObj[item.reviewer]) {
          ratingDataObj[item.reviewer].content = item.content
        } else {
          ratingDataObj[item.reviewer] = { ...item, score: null }
        }
      })
      this.ratingData = Object.values(ratingDataObj)
    },

    async sendRequestToTutor (selectedBooking) {
      this.isRequestSending = true
      
      const bookingId = selectedBooking.toString()

      const tutor = {
        email: this.tutor.email,
        id: this.tutor.id,
        name: this.tutor.name,
        status: 'confirming'
      }

      await bookingAPI.addConfirmingTutorToBookingTutors(
        this.userEmail,
        bookingId,
        tutor
      )
        .then(async () => {
          this.isDialogShowed = false
          this.isRequestSending = false

          await bookingAPI.updateBookingStatus(
            this.userEmail,
            bookingId,
            'responding'
          )
        })
        .catch((err) => {
          this.isRequestSending = false
          this.showNotification(err.code, 'error')
        })
      
      await tutorAPI.addClass(
        tutor.email,
        {
          contact: this.userEmail,
          id: selectedBooking,
          status: 'responding'
        }
      )
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

<style>
.box {
  border: 1px solid red;
}
.img-placeholder {
  background: #E0E0E0;
}
.tutor-id {
  color: #00BFA5;
  font-weight: bold;
  font-size: 18px;
}
.custom-card-title {
  font-size: 16px;
  font-weight: bold;
  color: black;
}
.custom-card-text {
  font-size: 16px;
}
.achievement-label {
  width: fit-content;
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 13px;
  font-weight: bold;
  color: #263238;
  background: #64B5F6;
}
.v-skeleton-loader--custom {
  border-radius: 0;
}
.image {
  width: 150px;
}
</style>
