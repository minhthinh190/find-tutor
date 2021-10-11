<template>
  <v-container class="py-7 pa-sm-16">
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="6"
        class="px-sm-16 px-md-12 px-lg-16"
      >
        <div>
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>
            Duis a varius urna. Duis et cursus erat, vel euismod magna. Etiam rhoncus cursus porta. Vivamus sit amet tortor pretium.
          </p>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="6"
        class="px-sm-16 px-md-12 px-lg-16"
      >
        <v-form ref="form">
          <p class="text-h5">
            Fill out the form
          </p>

          <v-text-field
            label="Subject"
            color="green darken-1"
            dense
            outlined
            :rules="inputRules"
          ></v-text-field>

          <v-text-field
            label="Address"
            color="green darken-1"
            dense
            outlined
            :rules="inputRules"
          ></v-text-field>

          <v-text-field
            label="Contact"
            color="green darken-1"
            dense
            outlined
            :rules="inputRules"
          ></v-text-field>

          <v-text-field
            label="Format"
            color="green darken-1"
            dense
            outlined
            :rules="inputRules"
          ></v-text-field>

          <v-textarea
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
import msg from '~/util/message.js'

export default {
  middleware: 'auth',
  layout: 'appbar',
  data () {
    return {
      inputRules: [
        val => !!val || msg.form.inputRequired
      ]
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        console.log('Submit')
      }
    }
  }
}
</script>
