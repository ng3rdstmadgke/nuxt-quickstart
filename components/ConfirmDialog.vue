<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <v-card>
      <v-card-title>
        <span class="headline">{{title}}</span>
      </v-card-title>
      <v-card-text>
        {{message}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="dialog-Button" @click="cancel">Cancel</v-btn>
        <v-btn color="error" class="dialog-Button" @click="confirm">{{buttonMessage}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
    buttonMessage: String
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    open() {
      this.dialog = true
    },
    cancel() {
      this.dialog = false
    },
    confirm() {
      this.dialog = false
      this.$emit('confirm')
    },
  },
}
</script>

<style scoped>
.dialog-Button {
  font-weight: bold;
}
</style>