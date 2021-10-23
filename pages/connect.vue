<template>
  <v-container class="py-7 pa-sm-14">
    <v-row justify="space-between">
      <v-col
        cols="12"
        sm="12"
        md="6"
      >
        <div>
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>
            Duis a varius urna. Duis et cursus erat, vel euismod magna. Etiam rhoncus cursus porta, vivamus sit amet tortor pretium.
          </p>
          <p>
            Lorem a urna duis et erat vel etiam curus rhoncus.
          </p>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="5"
      >
        <v-form ref="form">
          <p class="text-h5">
            Fill out the form
          </p>

          <v-text-field
            v-model="subject"
            label="Subject"
            color="green darken-1"
            dense
            outlined
            :rules="inputRules"
          ></v-text-field>

          <v-autocomplete
            v-model="format"
            label="Format"
            outlined
            dense
            color="green darken-1"
            :items="formatOptions"
            :rules="inputRules"
          ></v-autocomplete>

          <v-text-field
            v-model="address"
            label="Address"
            color="green darken-1"
            dense
            outlined
            :rules="inputRules"
          ></v-text-field>

          <v-text-field
            v-model="contact"
            label="Contact"
            color="green darken-1"
            dense
            outlined
            :rules="inputRules"
          ></v-text-field>

          <v-textarea
            v-model="description"
            label="Description"
            color="green darken-1"
            outlined
            rows="4"
            no-resize
          ></v-textarea>

          <v-row>
            <v-spacer />

            <v-col class="text-right">
              <v-btn
                color="green darken-1"
                depressed
                class="pa-5 white--text"
                @click="submit"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
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
      inputRules: [
        val => !!val || msg.form.inputRequired
      ],
      formatOptions: ['Offline', 'Online'],
      subject: null,
      format: null,
      address: null,
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
        const bookingData = {
          subject: this.subject,
          format: this.format,
          address: this.address,
          contact: this.contact,
          description: this.description
        }

        bookingAPI.createNewBooking(this.userEmail, bookingData)
          .then(() => {
            this.showNotification('Your request sent!', 'success')
          })
          .catch((err) => {
            console.log(err)
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
