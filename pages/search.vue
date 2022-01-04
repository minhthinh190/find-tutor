<template>
  <v-container
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <!-- Filters -->
    <v-row class="mx-md-16 mt-4">
      <v-col
        cols="3"
        class="pr-12 py-0"
      >
        <v-select
          v-model="query.subject"
          outlined
          dense
          hide-details
          label="Môn học"
          color="teal lighten-1"
          :items="subjects"
          class="v-input--custom"
        ></v-select>
      </v-col>

      <!-- Search Input -->
      <v-col
        cols="6"
        class="pl-5 pr-0 py-0"
      >
        <v-text-field
          v-model="queryInput"
          outlined
          dense
          hide-details
          single-line
          color="teal lighten-1"
          prepend-inner-icon="mdi-magnify"
          label="Tìm theo tên hoặc mã gia sư"
          class="v-input--custom"
          @keyup.enter="queryTutorsByQueryStr"
        ></v-text-field>
      </v-col>

      <v-col
        cols="3"
        class="px-0 py-0"
      >
        <div class="d-flex align-center justify-end result-quantity">
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="black"
            :size="25"
            :width="3"
          ></v-progress-circular>

          <p v-else class="ma-0">{{ tutorQuantity }} kết quả</p>
        </div>
      </v-col>
    </v-row>

    <!-- Tutor List -->
    <v-row class="mx-md-16">
      <!-- Sub Filters -->
      <v-col
        cols="3"
        class="pl-0 pr-8"
      >
        <v-container fluid class="pa-0">
          <v-expansion-panels tile flat accordion multiple>
            <!-- Gender -->
            <v-expansion-panel>
              <v-expansion-panel-header class="px-3">
                <h3>Giới tính</h3>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-checkbox
                  v-model="query.gender"
                  hide-details
                  label="Nam"
                  value="male"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  v-model="query.gender"
                  hide-details
                  label="Nữ"
                  value="female"
                  color="teal lighten-1"
                  class="ma-0"
                ></v-checkbox>
              </v-expansion-panel-content>

              <v-divider class="mx-3"/>
            </v-expansion-panel>

            <!-- Current Job -->
            <v-expansion-panel>
              <v-expansion-panel-header class="px-3">
                <h3>Nghề nghiệp</h3>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-checkbox
                  v-model="query.currentJob"
                  hide-details
                  label="Sinh viên"
                  value="student"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  v-model="query.currentJob"
                  hide-details
                  label="Đã tốt nghiệp"
                  value="graduated"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  v-model="query.currentJob"
                  hide-details
                  label="Giáo viên"
                  value="teacher"
                  color="teal lighten-1"
                  class="ma-0"
                ></v-checkbox>
              </v-expansion-panel-content>

              <v-divider class="mx-3"/>
            </v-expansion-panel>

            <!-- Achievement -->
            <v-expansion-panel>
              <v-expansion-panel-header class="px-3">
                <h3>Đặc điểm nổi bật</h3>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-checkbox
                  v-model="query.achievement"
                  hide-details
                  label="Thủ khoa đại học"
                  value="Thủ khoa đại học"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  v-model="query.achievement"
                  hide-details
                  label="Học sinh giỏi Quốc gia"
                  value="Học sinh giỏi Quốc gia"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  v-model="query.achievement"
                  hide-details
                  label="Học sinh giỏi Tỉnh/TP"
                  value="Học sinh giỏi Tỉnh/TP"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  v-model="query.achievement"
                  hide-details
                  label="Huy chương quốc tế"
                  value="Huy chương quốc tế"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  v-model="query.achievement"
                  hide-details
                  label="Học bổng"
                  value="Học bổng"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  v-model="query.achievement"
                  hide-details
                  label="Du học sinh"
                  value="Du học sinh"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  v-model="query.achievement"
                  hide-details
                  label="Học sinh THPT chuyên"
                  value="Học sinh trường THPT chuyên"
                  color="teal lighten-1"
                  class="ma-0"
                ></v-checkbox>
              </v-expansion-panel-content>
              
              <v-divider class="mx-3"/>
            </v-expansion-panel>

            <!-- Ratings -->
            <v-expansion-panel>
              <v-expansion-panel-header class="px-3">
                <h3>Đánh giá</h3>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-radio-group hide-details class="ma-0">
                  <div class="mb-2 d-flex align-end">
                    <v-radio
                      color="teal lighten-1"
                      class="ma-0"
                    ></v-radio>

                    <v-rating
                      small
                      dense
                      half-increments
                      readonly
                      background-color="yellow darken-3"
                      color="yellow darken-3"
                      :value="4.5"
                      class="mr-1"
                    ></v-rating>

                    <p class="ma-0 rating-score-label">&#8805; 4.5</p>
                  </div>

                  <div class="mb-2 d-flex align-end">
                    <v-radio
                      color="teal lighten-1"
                      class="ma-0"
                    ></v-radio>

                    <v-rating
                      small
                      dense
                      half-increments
                      readonly
                      background-color="yellow darken-3"
                      color="yellow darken-3"
                      :value="4"
                      class="mr-1"
                    ></v-rating>

                    <p class="ma-0 rating-score-label">&#8805; 4.0</p>
                  </div>

                  <div class="mb-2 d-flex align-end">
                    <v-radio
                      color="teal lighten-1"
                      class="ma-0"
                    ></v-radio>

                    <v-rating
                      small
                      dense
                      half-increments
                      readonly
                      background-color="yellow darken-3"
                      color="yellow darken-3"
                      :value="3.5"
                      class="mr-1"
                    ></v-rating>

                    <p class="ma-0 rating-score-label">&#8805; 3.5</p>
                  </div>

                  <div class="mb-2 d-flex align-end">
                    <v-radio
                      color="teal lighten-1"
                      class="ma-0"
                    ></v-radio>

                    <v-rating
                      small
                      dense
                      half-increments
                      readonly
                      background-color="yellow darken-3"
                      color="yellow darken-3"
                      :value="3"
                      class="mr-1"
                    ></v-rating>

                    <p class="ma-0 rating-score-label">&#8805; 3.0</p>
                  </div>
                </v-radio-group>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </v-col>

      <!-- Tutor List Container -->
      <v-col cols="9" class="mt-6 pl-2 pr-0 py-0">
        <!-- Loader -->
        <v-container v-if="isLoading" fluid>
          <v-row>
            <v-col class="pr-0">
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

        <!-- Tutor List -->
        <v-container v-else fluid>
          <!-- Tutor Card -->
          <v-row
            v-for="(tutor, index) in tutors[page - 1]"
            :key="index"
          >
            <v-col class="pr-0 py-0">
              <nuxt-link
                :to="{
                  name: 'tutor-id',
                  params: { id: tutor.id, email: tutor.email }
                }"
                class="link"
              >
                <div class="py-3 tutor-card">
                  <v-row>
                    <!-- Tutor Avatar -->
                    <v-col cols="3">
                      <v-img
                        height="250"
                        class=""
                        :src="tutor.avatar"
                      ></v-img>
                    </v-col>

                    <!-- Tutor Info -->
                    <v-col cols="9">
                      <!-- Service Short Description -->
                      <v-container fluid>
                        <v-row>
                          <v-col cols="10" class="pa-0">
                            <p class="ma-0 service-title">
                              <strong>{{ generateTutorTitle(tutor.fee) }}</strong>
                            </p>
                          </v-col>

                          <v-col cols="2" class="pa-0">
                            <p class="ma-0 text-right">
                              <strong>{{ tutor.id }}</strong>
                            </p>
                          </v-col>
                        </v-row>
                      </v-container>

                      <v-spacer class="mb-2"/>

                      <!-- Name -->
                      <p class="ma-0">
                        <strong>{{ tutor.name }}</strong>
                      </p>

                      <!-- DoB & Location -->
                      <div class="d-flex">
                        <div class="d-flex mr-4">
                          <v-icon small class="mr-2">
                            mdi-calendar-range
                          </v-icon>
                          <p class="ma-0 text--secondary">
                            {{ tutor.birthDate + '/' + tutor.birthMonth + '/' + tutor.birthYear }}
                          </p>
                        </div>

                        <div class="d-flex">
                          <v-icon small class="mr-2">
                            mdi-map-marker
                          </v-icon>
                          <p class="ma-0 text--secondary">
                            {{ tutor.hometown }}
                          </p>
                        </div>
                      </div>

                      <v-spacer class="mb-2"/>  

                      <!-- Self Introduction -->
                      <p class="tutor-introduction ma-0">
                        {{ shortenTutorDesc(tutor.selfIntroduction) }}
                      </p>

                      <v-spacer class="mb-2"/>

                      <!-- Ratings -->
                      <div class="d-flex align-center">
                        <p class="my-0 mr-2 rating-score">
                          <strong>4.9</strong>
                        </p>

                        <v-rating
                          small
                          dense
                          half-increments
                          readonly
                          :value="4.5"
                          background-color="yellow darken-3"
                          color="yellow darken-3"
                          class="mr-2"
                        ></v-rating>

                        <p class="ma-0 rating-quantity">
                          ({{ Math.floor(Math.random() * 50) + 1 }})
                        </p>
                      </div>

                      <!-- Achievement -->
                      <div class="mt-2 d-flex">
                        <div
                          v-for="(achievement, index) in tutor.achievement"
                          :key="index"
                          class="mr-2 achievement-label"
                        >
                          {{ achievement }}
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </nuxt-link>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-spacer class="mb-16"/>

    <!-- Pagination -->
    <v-row v-if="!isLoading" class="mx-md-16">
      <v-col>
        <v-pagination
          v-model="page"
          color="teal darken-1"
          :length="tutors.length"
          class="v-pagination--custom"
        ></v-pagination>
      </v-col>
    </v-row>

    <!-- space above footer -->
    <v-spacer class="my-16"/>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AppBar from '~/components/AppBar'

export default {
  middleware: 'auth',
  layout: 'appbar',
  components: {
    AppBar
  },
  data () {
    return {
      isLoading: false,
      page: 1,
      subjects: [
        'Tất cả',
        'Toán',
        'Vật lý',
        'Hóa học',
        'Sinh học',
        'Ngữ văn',
        'Tiếng Anh',
        'IELTS',
        'TOEIC'
      ],
      queryInput: '',
      query: {
        subject: '',
        gender: [],
        currentJob: [],
        achievement: []
      }
    }
  },
  computed: {
    ...mapGetters({
      tutors: 'tutor/paginatedTutors',
      tutorQuantity: 'tutor/tutorQuantity'
    })
  },
  watch: {
    query: {
      handler () {
        this.queryTutorsByFilter();
      },
      deep: true
    }
  },
  async mounted () {
    await this.getTutors()
  },
  methods: {
    async getTutors () {
      this.isLoading = true
      // get all tutors
      await this.$store.dispatch('tutor/getTutors')
      // paginate tutor list
      this.$store.dispatch('tutor/paginateTutorList')
      this.isLoading = false
    },

    async queryTutorsByQueryStr () {
      this.isLoading = true
      // format query string
      const queryInput = this.formatQueryStr(this.queryInput)
      // query tutors
      await this.$store.dispatch('tutor/queryTutorsByInput', queryInput)
      // paginate tutor list
      this.$store.dispatch('tutor/paginateTutorList')
      this.isLoading = false
    },

    async queryTutorsByFilter () {
      this.isLoading = true
      await this.$store.dispatch('tutor/queryTutorsByFilter', this.query)
      this.$store.dispatch('tutor/paginateTutorList')
      this.isLoading = false
    },

    generateTutorTitle (feeData) {
      // get subjects from tutor
      let subjects = []

      feeData.forEach((item) => {
        subjects.push(item.subject)
      })
      subjects = [...new Set(subjects)]
      subjects.pop()

      // create introduction title for tutor card
      let title = ''

      subjects.forEach((subject) => {
        // check last subject or not
        if (subject !== subjects.slice(-1).pop()) {
          title = title + subject + ', '
        } else {
          title = title + subject
        }
      })
      title = "Gia sư chuyên dạy kèm môn " + title

      return title
    },

    formatQueryStr (queryStr) {
      let formattedQueryStr = queryStr
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')

      return formattedQueryStr
    },

    shortenTutorDesc (desc) {
      const threshold = 450
      let shortDesc = ''

      if (desc.length <= threshold) {
        shortDesc = desc
      } else {
        for (let i = 0; i< threshold; i++) {
          shortDesc = shortDesc + desc[i]
        }
        shortDesc = shortDesc + '...'
      }

      return shortDesc
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
.search-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
}
.white-border {
  border: 6px solid white;
}
.v-expansion-panel-content::v-deep .v-expansion-panel-content__wrap {
  padding-left: 8px;
  padding-right: 8px;
}
.link {
  text-decoration: none;
  color: black;
}
.tutor-card {
  border-bottom: 1px solid #BDBDBD;
}
.service-title {
  color: #00BFA5;
  font-size: 20px;
}
.tutor-introduction {
  font-size: 14px;
}
.rating-score-label {
  font-size: 13px;
}
.rating-score {
  color: #D84315;
}
.rating-quantity {
  font-size: 11px;
}
.achievement-label {
  width: fit-content;
  font-size: 13px;
  font-weight: bold;
  background: #64B5F6;
  color: #263238;
  padding: 2px 6px;
}
.v-pagination::v-deep {
  box-shadow: none;
}
.v-input--custom {
  border-radius: 0;
}
.v-skeleton-loader--custom {
  border-radius: 0;
}
.result-quantity {
  height: 100%;
  font-weight: bold;
  color: #757575;
}
/* Temporary */
.img-placeholder {
  background: #E0E0E0;
}
</style>

<style scoped>
::v-deep .v-pagination__item {
  border: 1px solid #BDBDBD;
  border-radius: 0;
  box-shadow: none;
}
::v-deep .v-pagination__navigation {
  border-radius: 0;
  box-shadow: none;
}
</style>
