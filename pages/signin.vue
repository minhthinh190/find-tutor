<template>
  <v-container fluid class="box">
    <v-row>
      <v-col cols="5" class="box"></v-col>

      <v-col cols="7" class="pa-16 box">
        <v-card elevation="0" class="mx-16 pa-16">
          <v-card-title class="justify-center mb-4">
            <h3>Sign In</h3>
          </v-card-title>

          <v-card-text class="px-10 py-0">
            <v-form ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                color="teal accent-4"
                dense
                outlined
              ></v-text-field>

              <v-spacer class="py-0"/>

              <v-text-field
                v-model="password"
                label="Password"
                :rules="passwordRules"
                :type="isPwShowed ? 'text' : 'password'"
                :append-icon="isPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
                color="teal accent-4"
                dense
                outlined
                @click:append="isPwShowed = !isPwShowed"
                @keyup.enter="signIn"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-row class="px-8">
              <v-col cols="12">
                <v-btn
                  color="teal darken-1"
                  depressed
                  block
                  class="py-5 text-capitalize white--text"
                  @click="signIn"
                >
                  Sign In
                </v-btn>
              </v-col>

              <v-col cols="12" class="py-1 text-center">
                <nuxt-link to="" class="link">
                  Forgot your password?
                </nuxt-link>
              </v-col>

              <v-col cols="12">
                <p class="ma-0 text-center">
                  Don't have an account?
                  <nuxt-link to="/signup" class="link">
                    Sign up
                  </nuxt-link>
                </p>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!--
    <v-row justify="center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card class="pa-6" outlined>
          <v-card-title class="justify-center mb-4">
            <h3>Sign In</h3>
          </v-card-title>

          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                color="teal accent-4"
                dense
                outlined
                :rules="emailRules"
              ></v-text-field>

              <v-spacer class="py-1" />

              <v-text-field
                v-model="password"
                label="Password"
                color="teal accent-4"
                dense
                outlined
                :type="isPwShowed ? 'text' : 'password'"
                :append-icon="isPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                class="pb-0 mb-0"
                @click:append="isPwShowed = !isPwShowed"
                @keyup.enter="signIn"
              ></v-text-field>

              <nuxt-link to="" class="link">
                Forgot your password?
              </nuxt-link>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-row class="px-2 py-0">
              <v-col cols="12" sm=12 md="12" lg="12" align="center">
                <v-btn
                  color="teal darken-1"
                  depressed
                  block
                  class="py-5 text-capitalize white--text"
                  @click="signIn"
                >
                  Sign In
                </v-btn>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12" align="center" class="pb-0">
                <p>
                  Don't have an account?
                  <nuxt-link to="/signup" class="link">
                    Sign up
                  </nuxt-link>
                </p>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    -->
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
      password: '',
      isPwShowed: false,
      passwordRules: [
        val => !!val || msg.auth.pwRequired,
        val => (val && val.length > 6) || msg.auth.invalidPwLength
      ]
    }
  },
  methods: {
    signIn () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('user/signIn', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          $nuxt.$router.push({ name: 'index' })
        })
        .catch(err => {
          this.showNotification(err.code, 'error')
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
.box {
  border: 1px solid red;
}
.container {
  height: 100vh;
}
.link {
  text-decoration: none;
  color: #00BFA5;
}
.link:hover {
  filter: brightness(70%);
}
</style>
