<template>
  <v-container
    fluid
    class="py-7 pa-sm-16 root-container"
  >
    <v-row class="mb-16 px-md-16">
      <!-- Personal Info -->
      <v-col cols="3">
        <v-container fluid>
          <v-row>
            <v-col class="pa-0">
              <v-img
                contain
                height="250"
                class="mx-auto img-placeholder"
              ></v-img>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <v-row>
            <v-col class="pa-0">
              <v-card flat tile class="pb-3">
                <v-card-title>{{ tutor.name }}</v-card-title>

                <v-card-subtitle class="py-1">
                  <v-icon small class="mr-1">mdi-calendar-range</v-icon>
                  {{ tutor.birthDate + '/' + tutor.birthMonth + '/' + tutor.birthYear}}
                </v-card-subtitle>

                <v-card-subtitle class="py-1">
                  <v-icon small class="mr-1">mdi-map-marker</v-icon>
                  {{ tutor.hometown }}
                </v-card-subtitle>

                <v-card-subtitle class="py-1">
                  <v-icon small class="mr-1">mdi-phone</v-icon>
                  {{ tutor.phone }}
                </v-card-subtitle>

                <v-card-subtitle class="py-1">
                  <v-icon small class="mr-1">mdi-email</v-icon>
                  {{ tutor.email }}
                </v-card-subtitle>

                <v-spacer class="my-2"/>

                <v-card-actions class="px-4">
                  <v-btn
                    depressed
                    block
                    color="teal darken-1"
                    class="text-capitalize white--text"
                  >
                    Book
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Experience & Services -->
      <v-col cols="9">
        <v-container fluid>
          <!-- Tutor ID -->
          <v-row>
            <v-col class="pa-0">
              <v-sheet
                color="white"
                height="50"
                class="px-4 py-3"
              >
                <p>
                  <span class="font-weight-bold">
                    Tutor ID:&nbsp;
                  </span>
                  <span class="tutor-id">{{ tutor.id }}</span>
                </p>
              </v-sheet>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Job & Education -->
          <v-row>
            <v-col class="pa-0">
              <v-card flat tile>
                <v-card-text>
                  <p class="ma-0">
                    <span class="custom-card-title">Current Job:</span>
                    <span class="ml-1 custom-card-text">
                      {{ tutor.currentJob }}
                    </span>
                  </p>
                  <v-spacer class="my-1"/>
                  <p class="ma-0">
                    <span class="custom-card-title">School:</span>
                    <span class="ml-1 custom-card-text">{{ tutor.school }}</span>
                  </p>
                  <v-spacer class="my-1"/>
                  <p class="ma-0">
                    <span class="custom-card-title">Faculty/Class:</span>
                    <span class="ml-1 custom-card-text">{{ tutor.faculty }}</span>
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Tutor Description -->
          <v-row>
            <v-col class="pa-0">
              <v-card flat tile>
                <v-card-title class="pt-3 pb-0 custom-card-title">
                  Self Introduction
                </v-card-title>
                <v-card-text class="">
                  {{ tutor.selfIntroduction }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Tutor Achievement -->
          <v-row>
            <v-col class="pa-0">
              <v-card flat tile>
                <v-card-title class="pt-3 pb-2 custom-card-title">Achievement</v-card-title>
                <v-card-text>
                  <v-chip
                    label
                    color="blue darken-1"
                    text-color="white"
                    class="mr-1 mb-1 px-5"
                  >
                    {{ tutor.achievement }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Fee Table -->
          <v-row>
            <v-col class="pa-0">
              <v-card flat tile>
                <v-card-title class="pt-3 pb-0 custom-card-title">
                  Fee Table
                </v-card-title>
                <v-data-table
                  :headers="feeTableHeaders"
                  :items="feeTableData"
                  hide-default-footer
                ></v-data-table>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Timetable -->
          <v-row>
            <v-col class="pa-0">
              <v-card flat tile>
                <v-card-title class="pt-3 pb-0 custom-card-title">
                  Timetable
                </v-card-title>
                <v-data-table
                  :headers="timetableHeaders"
                  :items="tutor.freeTime"
                  hide-default-footer
                >
                  <template v-slot:[`item.morning`]="{ item }">
                    <v-checkbox
                      v-model="item.morning"
                      color="teal accent-4"
                      hide-details
                      readonly
                      class="ma-0"
                    ></v-checkbox>
                  </template>
                  <template v-slot:[`item.afternoon`]="{ item }">
                    <v-checkbox
                      v-model="item.afternoon"
                      color="teal accent-4"
                      hide-details
                      readonly
                      class="ma-0"
                    ></v-checkbox>
                  </template>
                  <template v-slot:[`item.evening`]="{ item }">
                    <v-checkbox
                      v-model="item.evening"
                      color="teal accent-4"
                      hide-details
                      readonly
                      class="ma-0"
                    ></v-checkbox>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <!-- Format -->
          <v-row>
            <v-col class="pa-0">
              <v-sheet
                color="white"
                height="50"
                class="px-4 py-3"
              >
                <p>
                  <span class="font-weight-bold">
                    Format:&nbsp;
                  </span>
                  {{ displayTeachingFormat(tutor.format) }}
                </p>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',
  layout: 'appbar',
  data () {
    return {
      feeTableHeaders: [
        { text: 'Subject', value: 'subject', align: '', sortable: false },
        { text: 'Level', value: 'level', align: '', sortable: false },
        { text: 'Fee/session (VND)', value: 'fee', align: '', sortable: false }
      ],
      timetableHeaders: [
        { text: 'Weekday', value: 'weekday', align: '', sortable: false },
        { text: 'Morning', value: 'morning', align: '', sortable: false },
        { text: 'Afternoon', value: 'afternoon', align: '', sortable: false },
        { text: 'Evening', value: 'evening', align: '', sortable: false }
      ],
      feeTableData: [],
    }
  },
  computed: {
    tutorId () {
      return this.$route.params.id
    },
    tutorEmail () {
      return this.$route.params.email
    },
    ...mapState({
      tutor: state => state.tutor.tutorProfile
    })
  },
  async mounted () {
    await this.$store.dispatch('tutor/getTutorProfile', this.tutorEmail)
    this.generateFeeTableData()
  },
  methods: {
    displayTeachingFormat (value) {
      let format = ''
      switch (value) {
        case 'both':
          format = 'Offline & Online'
          break
        case 'offline':
          format = 'Offline'
          break
        case 'online':
          format = 'Online'
      }
      return format
    },
    generateFeeTableData () {
      this.tutor.fee.forEach((item) => {
        if (item.subject !== '') {
          this.feeTableData.push(
            {
              subject: item.subject,
              level: item.level.reduce((prevLevel, currentLevel) => {
                return prevLevel.toString() + ', ' + currentLevel.toString()
              }),
              fee: item.fee
            }
          )
        }
      })
    }
  }
}
</script>

<style>
.img-placeholder {
  background: #E0E0E0;
}
.tutor-id {
  color: #00BFA5;
  font-weight: bold;
  font-size: 18px;
}
.custom-card-title {
  font-size: 16px;
  font-weight: bold;
  color: black;
}
.custom-card-text {
  font-size: 16px;
  color: black;
}
</style>
