<template>
  <v-container
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <!-- Search Bar -->
    <div class="py-5 elevation-1 search-container">
      <div class="d-flex align-center search-bar">
        <v-text-field
          outlined
          dense
          hide-details
          prepend-inner-icon="mdi-magnify"
          color="teal lighten-1"
          placeholder="Tìm kiếm theo tên hoặc mã gia sư"
        ></v-text-field>

        <v-btn
          depressed
          color="teal darken-1"
          class="ml-1 py-5 white--text"
          @click="queryTutors"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>

    <v-spacer class="mt-14"/>

    <!--
    <v-row
      justify="space-between"
      class="mx-md-16"
    >
      <v-col
        cols="12"
        class=""
      >
        <div>
          <h1 class="pb-2">
            Lorem ipsum dolor sit amet
          </h1>
          <p>
            Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum.
          </p>
        </div>
      </v-col>
    </v-row>
    -->

    <v-spacer class="mb-4"/>

    <!-- Filters -->
    <v-row class="mx-md-16">
      <v-col
        cols="2"
        class="py-0"
      >
        <v-select
          label="Môn học"
          color="teal lighten-1"
          :items="subjects"
        ></v-select>
      </v-col>

      <!--
      <v-col
        cols="1"
        class="py-0"
      >
        <v-select
          label="Level"
          color="teal lighten-1"
          :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
        ></v-select>
      </v-col>
      -->
    </v-row>

    <!-- Tutor List -->
    <v-row class="mx-md-16">
      <!-- Sub Filters -->
      <v-col
        cols="2"
        class="px-0"
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
                  label="Học sinh giỏi QG"
                  value="Học sinh giỏi Quốc gia"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  v-model="query.achievement"
                  hide-details
                  label="Học sinh giỏi T/TP"
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
                  <!-- 4.5 & up -->
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

                  <!-- 4.0 & up -->
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

                  <!-- 3.5 & up -->
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

                  <!-- 3.0 & up -->
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

      <!-- Tutor List -->
      <v-col
        cols="10"
        class="pl-6 pr-0 py-0"
      >
        <v-container fluid>
          <!-- Tutor Card -->
          <v-row
            v-for="(tutor, index) in tutors[page - 1]"
            :key="index"
          >
            <v-col class="pr-0 py-0">
              <div class="py-3 tutor-card">
                <v-row>
                  <!-- Tutor Avatar -->
                  <v-col cols="3">
                    <v-img
                      height="250"
                      :src="tutor.avatar"
                      class=""
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
                        <p class="ma-0">
                          {{ tutor.birthDate + '/' + tutor.birthMonth + '/' + tutor.birthYear }}
                        </p>
                      </div>

                      <div class="d-flex">
                        <v-icon small class="mr-2">
                          mdi-map-marker
                        </v-icon>
                        <p class="ma-0">
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
                        ( {{ Math.floor(Math.random() * 50) + 1 }} )
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
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-spacer class="mb-16"/>

    <!-- Pagination -->
    <v-row class="mx-md-16">
      <v-col>
        <v-pagination
          v-model="page"
          color="teal darken-1"
          :length="tutors.length"
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
      page: 1,
      subjects: [
        'Toán',
        'Vật lý',
        'Hóa học',
        'Sinh học',
        'Ngữ văn',
        'Tiếng Anh',
        'IELTS',
        'TOEIC'
      ],
      query: {
        gender: [],
        currentJob: [],
        achievement: []
      }
    }
  },
  computed: {
    ...mapGetters({
      tutors: 'tutor/paginatedTutors'
    })
  },
  async mounted () {
    await this.getTutors()
  },
  methods: {
    async getTutors () {
      await this.$store.dispatch('tutor/getTutors')
      this.$store.dispatch('tutor/paginateTutorList')
    },
    async queryTutors () {
      console.log('fetching...')
      await this.$store.dispatch('tutor/queryTutors', this.query)
      this.$store.dispatch('tutor/paginateTutorList')
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
.search-bar {
  width: 50%;
  margin: auto;
}
.white-border {
  border: 6px solid white;
}
.v-expansion-panel-content::v-deep .v-expansion-panel-content__wrap {
  padding-left: 8px;
  padding-right: 8px;
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
/* Temporary */
.img-placeholder {
  background: #E0E0E0;
}
</style>
