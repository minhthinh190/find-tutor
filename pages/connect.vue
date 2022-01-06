<template>
  <v-container
    fluid
    class="px-sm-16 pb-sm-16 root-container"
  >
    <v-row
      justify="center"
      class="px-md-16"
    >
      <v-col cols="12" sm="12" md="6">
        <v-form ref="form">
          <v-sheet class="px-12 py-9">
            <p class="text-h5 mb-7 form-title">
              <strong>Đăng ký tìm gia sư</strong>
            </p>

            <v-text-field
              v-model="subject"
              label="Môn học"
              color="teal accent-4"
              outlined
              dense
              :rules="inputRules"
              class="v-input--custom"
            ></v-text-field>

            <v-select
              v-model="format"
              label="Hình thức học"
              color="teal accent-4"
              outlined
              dense
              :items="formatOptions"
              :rules="inputRules"
              class="v-input--custom"
            ></v-select>

            <v-text-field
              v-model="address"
              label="Địa chỉ"
              color="teal accent-4"
              outlined
              dense
              :rules="inputRules"
              class="v-input--custom"
            ></v-text-field>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="perWeek"
                  label="Số buổi"
                  type="number"
                  color="teal accent-4"
                  outlined
                  dense
                  hide-spin-buttons
                  :rules="inputRules"
                  class="v-input--custom"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  v-model="duration"
                  label="Thời lượng 1 ca học (phút)"
                  type="number"
                  color="teal accent-4"
                  outlined
                  dense
                  hide-spin-buttons
                  :rules="inputRules"
                  class="v-input--custom"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="time"
              label="Thời gian"
              type="time"
              color="teal accent-4"
              outlined
              dense
              :rules="inputRules"
              class="v-input--custom"
            ></v-text-field>

            <v-text-field
              v-model="contact"
              label="Số điện thoại"
              color="teal accent-4"
              outlined
              dense
              :rules="inputRules"
              class="v-input--custom"
            ></v-text-field>

            <v-textarea
              v-model="description"
              label="Mô tả"
              color="teal accent-4"
              outlined
              dense
              rows="4"
              no-resize
              class="v-input--custom"
            ></v-textarea>

            <v-row>
              <v-spacer />

              <v-col class="text-right">
                <v-btn
                  color="teal darken-1"
                  tile
                  depressed
                  :loading="isSending"
                  class="pa-5 white--text"
                  @click="submit"
                >
                  Đăng ký ngay
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </v-form>
      </v-col>
    </v-row>

    <v-spacer class="my-16"/>
  </v-container>
</template>

<script>
import msg from '~/util/message'
import { bookingAPI } from '~/api/booking'
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  layout: 'appbar',
  data () {
    return {
      isSending: false,
      inputRules: [
        val => !!val || msg.form.inputRequired
      ],
      formatOptions: ['Offline', 'Online'],
      subject: null,
      format: null,
      address: null,
      perWeek: null,
      duration: null,
      time: null,
      contact: null,
      description: null
    }
  },
  computed: {
    ...mapGetters('user', {
      userEmail: 'userEmail'
    })
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.isSending = true

        const bookingData = {
          email: this.userEmail,
          subject: this.subject.toLowerCase(),
          format: this.format,
          address: this.address,
          perWeek: this.perWeek,
          duration: this.duration,
          time: this.time,
          contact: this.contact,
          description: this.description,
          tutors: [],
          status: 'waiting',
          createdDate: new Date().toLocaleDateString()
        }

        bookingAPI.createNewBooking(this.userEmail, bookingData)
          .then(() => {
            this.isSending = false
            this.showNotification('Đã gửi yêu cầu!', 'teal darken-1')
            this.$refs.form.reset()
          })
          .catch((err) => {
            this.isSending = false
            this.showNotification(err, 'error')
          })
      }
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
.form-title {
  color: #757575;
}
.v-input--custom {
  border-radius: 0;
}
</style>
