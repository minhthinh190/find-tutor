<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card class="pa-6" outlined>
          <v-card-title class="justify-center mb-4">
            <h3>Đăng ký</h3>
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
                class="v-input--custom"
              ></v-text-field>

              <v-spacer class="py-1" />

              <!--
              <v-text-field
                v-model="username"
                label="Username"
                color="teal accent-4"
                dense
                outlined
                :rules="usernameRules"
              ></v-text-field>
              -->

              <v-text-field
                v-model="password"
                label="Mật khẩu"
                color="teal accent-4"
                dense
                outlined
                :type="isPwShowed ? 'text' : 'password'"
                :append-icon="isPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                class="v-input--custom"
                @click:append="isPwShowed = !isPwShowed"
              ></v-text-field>

              <v-spacer class="py-1" />

              <v-text-field
                label="Nhập lại mật khẩu"
                ref="confirmPassword"
                color="teal accent-4"
                dense
                outlined
                :type="isCfPwShowed ? 'text' : 'password'"
                :append-icon="isCfPwShowed ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="confirmPasswordRules"
                class="v-input--custom"
                @click:append="isCfPwShowed = !isCfPwShowed"
                @keyup.enter="signUp"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-row class="px-2 py-0">
              <v-col cols="12" sm=12 md="12" lg="12" align="center">
                <v-btn
                  color="teal darken-1"
                  tile
                  depressed
                  block
                  :loading="isSigningUp"
                  class="py-5 text-capitalize white--text"
                  @click="signUp"
                >
                  Đăng ký
                </v-btn>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="12" align="center" class="pb-0">
                <p>
                  Đã có tài khoản?
                  <nuxt-link to="/signin" class="link">
                    Đăng nhập
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
      ],
      isSigningUp: false
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
        this.isSigningUp = true

        this.$store.dispatch('user/signUp', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          $nuxt.$router.push({ name: 'index' })
          this.isSigningUp = false
        })
        .catch(err => {
          this.isSigningUp = false
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
.container {
  height: 95vh;
}
.link {
  text-decoration: none;
  color: #00BFA5;
}
.link:hover {
  filter: brightness(70%);
}
.v-input--custom {
  border-radius: 0;
}
</style>
