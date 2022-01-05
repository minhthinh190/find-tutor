<template>
  <v-dialog
    v-model="isDialogShowed"
    scrollable
    width="650"
    @click:outside="$emit('close-dialog')"
  >
    <v-card flat tile class="px-3 v-card--custom">
      <v-card-title class="px-4">
        <h4>Đánh giá gia sư</h4>
      </v-card-title>

      <v-card-text class="px-4">
        <v-container fluid class="px-0">
          <div
            v-for="(tutor, index) in tutors"
            :key="index"
            class="mb-3"
          >
            <v-row>
              <v-col cols="12">
                <div class="d-flex align-center">
                  <v-avatar
                    color="grey lighten-2"
                    class="mr-3"
                  >
                    <img :src="tutor.avatar"/>
                  </v-avatar>
                  <h3>{{ tutor.name }}</h3>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="py-0 text-center">
                <v-rating
                  v-model="tutor.newRatingScore"
                  half-increments
                  background-color="yellow darken-3"
                  color="yellow darken-3"
                  size="40"
                ></v-rating>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="tutor.newReview"
                  outlined
                  no-resize
                  rows="3"
                  color="teal accent-4"
                  label="Nhận xét gia sư"
                  class="v-input--custom"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>
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
          Hủy
        </v-btn>

        <v-spacer />

        <v-btn
          tile
          depressed
          color="teal darken-1"
          class="px-3 text-capitalize white--text"
          @click="sendRatings"
        >
          Gửi đánh giá
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { tutorAPI } from '~/api/tutor'

export default {
  props: {
    isDialogShowed: {
      type: Boolean,
      required: true
    },
    isConfirming: {
      type: Boolean,
      required: true
    },
    tutorIds: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      tutors: []
    }
  },
  watch: {
    isDialogShowed (val) {
      if (val === true) {
        this.getTutorData()
      }
      if (val === false) {
        this.tutors = []
      }
    }
  },
  methods: {
    async getTutorData () {
      for (const tutor of this.tutorIds) {
        if (tutor.status === 'accepted') {
          const tutorData = await tutorAPI.getTutor(tutor.email)
          this.tutors.push({
            ...tutorData,
            newRatingScore: 0,
            newReview: ''
          })
        }
      }
    },

    sendRatings () {
      console.log('tutors:', this.tutors)
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px solid red;
}
.link {
  text-decoration: none;
}
.v-input--custom {
  border-radius: 0;
}
</style>
