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
          placeholder="Search for tutors by name, ID, school"
        ></v-text-field>

        <v-btn
          depressed
          color="teal darken-1"
          class="ml-1 py-5 white--text"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>

    <v-spacer class="mt-14"/>

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

    <v-spacer class="mb-4"/>

    <!-- Filters -->
    <v-row class="mx-md-16">
      <v-col
        cols="2"
        class="py-0"
      >
        <v-select
          label="Subject"
          color="teal lighten-1"
          :items="['Math', 'Physics', 'Chemistry']"
        ></v-select>
      </v-col>

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
                <h3>Gender</h3>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-checkbox
                  hide-details
                  label="Male"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  hide-details
                  label="Female"
                  color="teal lighten-1"
                  class="ma-0"
                ></v-checkbox>
              </v-expansion-panel-content>

              <v-divider class="mx-3"/>
            </v-expansion-panel>

            <!-- Current Job -->
            <v-expansion-panel>
              <v-expansion-panel-header class="px-3">
                <h3>Current Job</h3>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-checkbox
                  hide-details
                  label="Student"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  hide-details
                  label="Graduated"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  hide-details
                  color="teal lighten-1"
                  label="Teacher"
                  class="ma-0"
                ></v-checkbox>
              </v-expansion-panel-content>

              <v-divider class="mx-3"/>
            </v-expansion-panel>

            <!-- Achievement -->
            <v-expansion-panel>
              <v-expansion-panel-header class="px-3">
                <h3>Achievement</h3>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-checkbox
                  hide-details
                  label="Thủ khoa đại học"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  hide-details
                  label="Học sinh giỏi QG"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  hide-details
                  label="Học sinh giỏi T/TP"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  hide-details
                  label="Huy chương quốc tế"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  hide-details
                  label="Học bổng"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  hide-details
                  label="Du học sinh"
                  color="teal lighten-1"
                  class="mx-0 mt-0 mb-2"
                ></v-checkbox>

                <v-checkbox
                  hide-details
                  label="Học sinh THPT chuyên"
                  color="teal lighten-1"
                  class="ma-0"
                ></v-checkbox>
              </v-expansion-panel-content>
              
              <v-divider class="mx-3"/>
            </v-expansion-panel>

            <!-- Ratings -->
            <v-expansion-panel>
              <v-expansion-panel-header class="px-3">
                <h3>Ratings</h3>
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
                      value="4.5"
                      class="mr-1"
                    ></v-rating>

                    <p class="ma-0 rating-score-label">4.5 & up</p>
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
                      value="4"
                      class="mr-1"
                    ></v-rating>

                    <p class="ma-0 rating-score-label">4.0 & up</p>
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
                      value="3.5"
                      class="mr-1"
                    ></v-rating>

                    <p class="ma-0 rating-score-label">3.5 & up</p>
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
                      value="3"
                      class="mr-1"
                    ></v-rating>

                    <p class="ma-0 rating-score-label">3.0 & up</p>
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
            v-for="n in 5"
            :key="n"
          >
            <v-col class="pr-0 py-0">
              <div class="py-3 tutor-card">
                <v-row>
                  <!-- Tutor Avatar -->
                  <v-col cols="3">
                    <v-img
                      height="250"
                      class="img-placeholder"
                    ></v-img>
                  </v-col>

                  <!-- Tutor Info -->
                  <v-col cols="9">
                    <!-- Service Short Description -->
                    <v-container fluid>
                      <v-row>
                        <v-col cols="10" class="pa-0">
                          <p class="ma-0 service-title">
                            <strong>Lorem ipsum dolor sit amet</strong>
                          </p>
                        </v-col>

                        <v-col cols="2" class="pa-0">
                          <p class="ma-0 text-right">
                            <strong>1320</strong>
                          </p>
                        </v-col>
                      </v-row>
                    </v-container>

                    <v-spacer class="mb-2"/>

                    <!-- Name -->
                    <p class="ma-0">
                      <strong>John Connor</strong>
                    </p>

                    <!-- DoB & Location -->
                    <div class="d-flex">
                      <div class="d-flex mr-4">
                        <v-icon small class="mr-2">
                          mdi-calendar-range
                        </v-icon>
                        <p class="ma-0">
                          20/02/1995
                        </p>
                      </div>

                      <div class="d-flex">
                        <v-icon small class="mr-2">
                          mdi-map-marker
                        </v-icon>
                        <p class="ma-0">
                          Los Angeles
                        </p>
                      </div>
                    </div>

                    <v-spacer class="mb-2"/>  

                    <!-- Self Introduction -->
                    <p class="tutor-introduction ma-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur dolor iure cumque deleniti eos sequi, quia ducimus expedita et illum corrupti sed quam eaque officiis. Officiis eos eligendi at earum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur dolor iure cumque deleniti eos sequi, quia ducimus expedita et illum corrupti sed quam eaque officiis. Officiis eos eligendi at earum.
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
                        value="4.5"
                        background-color="yellow darken-3"
                        color="yellow darken-3"
                        class="mr-2"
                      ></v-rating>

                      <p class="ma-0 rating-quantity">(150)</p>
                    </div>

                    <!-- Achievement -->
                    <div class="mt-2 d-flex">
                      <div class="achievement-label">
                        Thủ khoa
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
          :length="5"
        ></v-pagination>
      </v-col>
    </v-row>

    <!-- space above footer -->
    <v-spacer class="my-16"/>
  </v-container>
</template>

<script>
import AppBar from '~/components/AppBar'

export default {
  middleware: 'auth',
  layout: 'appbar',
  components: {
    AppBar
  },
  data () {
    return {
      page: 1
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
