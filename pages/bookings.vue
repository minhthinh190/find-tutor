<template>
  <v-container class="py-7 pa-sm-14">
    <v-row class="mb-4">
      <p class="text-h5 ma-0">
        {{ currentFilter }}
      </p>

      <v-spacer />

      <v-menu
        offset-y
        left
        rounded="0"
      >
        <!-- Filter button -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            depressed
            class="px-3"
          >
            <v-icon color="grey darken-2">
              mdi-format-list-bulleted-square
            </v-icon>

            <v-divider
              vertical
              class="mx-2"
            />

            <v-icon color="grey darken-2">
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>

        <!-- Filter list -->
        <v-list>
          <v-list-item
            v-for="item in filters"
            :key="item"
            link
            class="px-6"
            @click="selectItem(item)"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>

    <v-row>
      <v-container
        v-for="(item, index) in bookingList"
        :key="index"
      >
        <v-row>
          <v-col cols="12" class="px-0">
            <v-card outlined>
              <v-card-title>
                <nuxt-link
                  to=""
                  class="request-link"
                >
                  {{ item.title }}
                </nuxt-link>

                <v-spacer />

                <p class="ma-0 subtitle-1">
                  {{ item.createdDate }}
                </p>
              </v-card-title>

              <v-card-subtitle>
                Tutor:
                <nuxt-link
                  to=""
                  class="link"
                >
                  {{ item.tutor }}
                </nuxt-link>
              </v-card-subtitle>

              <v-card-text class="font-weight-bold">
                {{ item.status }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'appbar',
  data () {
    return {
      filters: ['All', 'Finished', 'On-going', 'Waiting'],
      bookingList: [
        { title: 'Request title', tutor: "this is tutor's name", status: 'Waiting', createdDate: '14/10/2021' },
        { title: 'Request title', tutor: "this is tutor's name", status: 'On-going', createdDate: '06/09/2021' },
        { title: 'Request title', tutor: "this is tutor's name", status: 'Finished', createdDate: '22/06/2021' },
        { title: 'Request title', tutor: "this is tutor's name", status: 'Finished', createdDate: '30/03/2021' },
        { title: 'Request title', tutor: "this is tutor's name", status: 'Finished', createdDate: '15/11/2020' },
        { title: 'Request title', tutor: "this is tutor's name", status: 'Finished', createdDate: '15/03/2019' }
      ],
      currentFilter: 'All'
    }
  },
  methods: {
    selectItem (item) {
      this.currentFilter = item
    }
  }
}
</script>

<style scoped>
.big-box {
  border: 1px solid blue;
}
.box {
  border: 1px solid red;
}
.inside-box {
  border: 1px solid limegreen;
}
.request-link {
  text-decoration: none;
  color: black;
}
.link {
  text-decoration: none;
  color: #66BB6A;
}
.link:hover {
  color: #43A047;
}
</style>
