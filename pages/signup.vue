<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card class="pa-6" outlined tile>
          <v-card-title class="justify-center">
            <h3>Sign Up</h3>
          </v-card-title>

          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                color="teal lighten-1"
                :rules="emailRules"
              ></v-text-field>

              <!--
              <v-text-field
                v-model="username"
                label="Username"
                color="teal lighten-1"
                :rules="usernameRules"
              ></v-text-field>
              -->

              <v-text-field
                v-model="password"
                label="Password"
                color="teal lighten-1"
                :type="isPwShowed ? 'text' : 'password'"
                :append-icon="isPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                @click:append="isPwShowed = !isPwShowed"
              ></v-text-field>

              <v-text-field
                label="Confirm Password"
                ref="confirmPassword"
                color="teal lighten-1"
                :type="isCfPwShowed ? 'text' : 'password'"
                :append-icon="isCfPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="confirmPasswordRules"
                @click:append="isCfPwShowed = !isCfPwShowed"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-row class="px-2 py-0">
              <v-col cols="12" sm=12 md="12" lg="12" align="center">
                <v-btn
                  color="teal lighten-1"
                  depressed
                  block
                  tile
                  class="text-capitalize white--text"
                  @click="signUp"
                >
                  Sign Up
                </v-btn>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12" align="center" class="pb-0">
                <p>
                  Already have an account?
                  <nuxt-link to="/signin" class="link">
                    Sign in
                  </nuxt-link>
                </p>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import regex from '~/util/regex.js'
import msg from '~/util/message.js'

export default {
  data () {
    return {
      email: '',
      emailRules: [
        val => !!val.trim() || msg.auth.emailRequired,
        val => (val.trim() && regex.email.test(val)) || msg.auth.invalidEmailFormat
      ],
      /*
      username: '',
      usernameRules: [
        val => !!val.trim() || msg.auth.nameRequired,
        val => (val.trim() && val.length >=3 && val.length <= 40) || msg.auth.invalidNameLength,
        val => (val.trim() && regex.username.test(val)) || msg.auth.invalidNameFormat
      ],
      */
      password: '',
      isPwShowed: false,
      passwordRules: [
        val => !!val || msg.auth.pwRequired,
        val => (val && val.length > 6) || msg.auth.invalidPwLength
      ],
      confirmPassword: '',
      isCfPwShowed: false,
      confirmPasswordRules: [
        val => !!val || msg.auth.confirmPwRequired,
        val => (val && val.length > 6) || msg.auth.invalidPwLength,
        val => (val && val === this.password) || msg.auth.pwNotMatch
      ]
    }
  },
  watch: {
    password () {
      this.$refs.confirmPassword.validate()
    }
  },
  methods: {
    signUp () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('auth/signUp', {
          email: this.email,
          password: this.password
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  height: 95vh;
}
.link {
  text-decoration: none;
  color: #26A69A;
}
.link:hover {
  color: #00796B;
}
</style>
