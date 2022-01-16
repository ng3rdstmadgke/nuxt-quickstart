<template>
  <v-alert v-model="alert" dismissible v-bind:type="type">{{ message }}</v-alert>
</template>

<script>
export default {
  props: {
    type: String,
    message: String
  },
  data() {
    return {
      alert: false,
    }
  },
  methods: {
    open() {
      this.alert = true
    },
    close() {
      this.alert = false
    },
  }
}
</script>