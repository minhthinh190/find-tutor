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
                class="mx-auto box"
              ></v-img>
            </v-col>
          </v-row>

          <v-spacer class="my-8"/>

          <v-row>
            <v-col class="pa-0">
              <v-card flat tile class="pb-3">
                <v-card-title>Aleksandra Sunny</v-card-title>

                <v-card-subtitle class="py-1">
                  <v-icon small class="mr-1">mdi-calendar-range</v-icon>
                  10/10/1990
                </v-card-subtitle>

                <v-card-subtitle class="py-1">
                  <v-icon small class="mr-1">mdi-map-marker</v-icon>
                  San Francisco
                </v-card-subtitle>

                <v-card-subtitle class="py-1">
                  <v-icon small class="mr-1">mdi-phone</v-icon>
                  19001000
                </v-card-subtitle>

                <v-card-subtitle class="py-1">
                  <v-icon small class="mr-1">mdi-email</v-icon>
                  tutor@email.com
                </v-card-subtitle>

                <v-spacer class="my-2"/>

                <v-card-actions class="px-4">
                  <v-btn
                    depressed
                    block
                    color="teal darken-1"
                    class="text-capitalize white--text"
                  >
                    Click
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
                  <span class="tutor-id">1035</span>
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
                    <span class="ml-1 custom-card-text">Student</span>
                  </p>
                  <v-spacer class="my-1"/>
                  <p class="ma-0">
                    <span class="custom-card-title">School:</span>
                    <span class="ml-1 custom-card-text">Dai hoc Khoa hoc Xa hoi va Nhan van - DHQG TPHCM</span>
                  </p>
                  <v-spacer class="my-1"/>
                  <p class="ma-0">
                    <span class="custom-card-title">Faculty/Class:</span>
                    <span class="ml-1 custom-card-text">Quan he Quoc te</span>
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
                  Description
                </v-card-title>
                <v-card-text class="">
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.<br>
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.<br>
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.<br>
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.<br>
                  Lorem ipsum dolor sit amet.
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
                    class="mr-1 mb-1"
                  >
                    Achievement 1
                  </v-chip>
                  <v-chip
                    label
                    color="blue darken-1"
                    text-color="white"
                    class="mr-1 mb-1"
                  >
                    Achievement 2
                  </v-chip>
                  <v-chip
                    label
                    color="blue darken-1"
                    text-color="white"
                    class="mr-1 mb-1"
                  >
                    Achievement 3
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
                  :items="timetableData"
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
                  Online, Offline
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
      // fake fee table data
      feeTableData: [
        { subject: 'Math', level: '10, 11, 12', fee: '120,000' },
        { subject: 'Physics', level: '10, 11, 12', fee: '120,000' },
        { subject: 'Chemistry', level: '10, 11, 12', fee: '120,000' },
        { subject: 'Biology', level: '10, 11, 12', fee: '120,000' }
      ],
      // fake timetable data
      timetableData: [
        { weekday: 'Monday', morning: false, afternoon: false, evening: true },
        { weekday: 'Tuesday', morning: false, afternoon: false, evening: true },
        { weekday: 'Wednesday', morning: false, afternoon: false, evening: true },
        { weekday: 'Thursday', morning: false, afternoon: false, evening: true },
        { weekday: 'Friday', morning: false, afternoon: false, evening: true },
        { weekday: 'Saturday', morning: true, afternoon: true, evening: true },
        { weekday: 'Sunday', morning: true, afternoon: true, evening: true }
      ]
    }
  }
}
</script>

<style>
.box {
  border: 1px solid red;
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
