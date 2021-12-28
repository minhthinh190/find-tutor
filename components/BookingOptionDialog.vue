<template>
  <v-dialog
    v-model="isDialogShowed"
    width="650"
    @click:outside="$emit('close-dialog')"
  >
    <v-card flat tile class="px-3">
      <v-card-title class="px-4">
        <h4>
          <slot name="dialogTitle">Dialog Title</slot>
        </h4>
      </v-card-title>

      <v-card-text class="px-4">
        <v-container fluid class="px-0 py-4 booking-list">
          <!-- Waiting Booking List -->
          <v-list-item-group>
            <!-- Booking Card -->
            <v-list-item
              v-for="n in 7"
              :key="n"
              class="mb-4 pa-0"
            >
              <template v-slot:default="{ active }">
                <v-list-item-action class="mr-4">
                  <v-checkbox
                    color="teal accent-4"
                    :input-value="active"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content class="px-3 booking-card">
                  <v-card-subtitle class="d-flex pa-0">
                    <p class="ma-0 booking-title">Toán</p>
                    <v-spacer />
                    <p class="ma-0 text--disabled">28/12/2021</p>
                  </v-card-subtitle>

                  <v-spacer class="mb-1"/>

                  <div>
                    <div class="pa-1 status-label status-label--waiting">
                      Chưa có gia sư
                    </div>
                  </div>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
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
          <slot name="cancelBtnText">Cancel</slot>
        </v-btn>

        <v-spacer />

        <v-btn
          tile
          depressed
          color="teal darken-1"
          class="px-3 text-capitalize white--text"
          :loading="isConfirming"
          @click="$emit('confirm')"
        >
          <slot name="confirmBtnText">Confirm</slot>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isDialogShowed: {
      type: Boolean,
      required: true
    },
    isConfirming: {
      type: Boolean,
      required: true
    }
  }  
}
</script>

<style scoped>
.box {
  border: 1px solid red;
}
.booking-list {
  overflow: hidden;
}
.booking-card {
  border: 1px solid #BDBDBD;
}
.booking-title {
  font-weight: bold;
  font-size: 16px;
  color: #00BFA5;
}
.status-label {
  width: fit-content;
  font-size: 13px;
  font-weight: bold;
  color: #263238;
}
.status-label--waiting {
  background: #E57373;
}
</style>
